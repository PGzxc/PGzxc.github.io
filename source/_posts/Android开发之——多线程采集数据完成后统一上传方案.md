---
title: Android开发之——多线程采集数据完成后统一上传方案
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: '2225e625'
date: 2025-07-10 08:36:01
---
## 一 实现方案

* Java语言—CountDownLatch实现方案
* Java语言—Future + ExecutorService实现方案
* Java语言—ConcurrentLinkedQueue + Future + ExecutorService实现方案
* Kotlin语言(安卓环境)—async + awaitAll

<!--more-->

## 二 Java语言—CountDownLatch实现方案

### 2.1 概念介绍

```
一 、 ExecutorService 简要介绍
ExecutorService 是 Java 提供的线程池接口，用于管理和调度多个线程的执行。

常用实现如：
-newFixedThreadPool(n)：固定大小线程池
-newCachedThreadPool()：可动态扩展线程池
-newSingleThreadExecutor()：单线程执行器

可通过 submit() 或 execute() 提交任务，支持返回 Future 获取结果，提高多线程管理效率。

二、CountDownLatch 简要介绍
CountDownLatch 是一种同步辅助类，用于等待一组线程执行完毕后再继续。

原理：
设置一个计数器，每个线程执行完调用 countDown()，主线程调用 await() 阻塞，
直到计数器为 0 再继续执行。

适用于多线程并发处理后统一汇总或操作的场景。
```

### 2.2 示例

```
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.*;

public static void main(String[] args) throws ExecutionException, InterruptedException {

    ExecutorService executor = Executors.newFixedThreadPool(4);
    CountDownLatch latch = new CountDownLatch(5);
    List<String> resultList = Collections.synchronizedList(new ArrayList<>()); 
    //Collections.synchronizedList(new ArrayList<>()) 这样的写法是为了让 ArrayList 变为线程安全的集合

    for (int i = 0; i < 5; i++) {
        executor.execute(() -> { //向线程池提交一个任务（Runnable 对象）并执行
            // 模拟获取数据
            resultList.add("data");
            latch.countDown();//将 CountDownLatch 的计数器减1
        });
    }

    latch.await(); // 等待所有任务完成
    upload(resultList);// 模拟上传
    executor.shutdown(); //用于优雅地关闭线程池
}
private static void upload(List<String> resultList) {
    // 模拟上传
    System.out.println("统一上传");
}
```

示例中使用到的方法说明

```
1、Collections.synchronizedList(new ArrayList<>()) 这样的写法是为了让 ArrayList 变为线程安全的集合
2、executor.execute(() -> { }）//向线程池提交一个任务（Runnable 对象）并执行
3、latch.countDown();//将 CountDownLatch 的计数器减1
4、latch.await(); // 计数器归零、等待所有任务完成
5、executor.shutdown(); //用于优雅地关闭线程池
```

## 三 Java语言—Future + ExecutorService实现方案

### 3.1 概念介绍

```
一、 ExecutorService 简要介绍
ExecutorService 是 Java 的线程池接口，用于管理并发任务的执行。
它可以重复利用线程，避免频繁创建销毁，提高性能。

常用方法：
-submit()：提交任务，可返回 Future
-execute()：提交无返回值任务
-shutdown()：关闭线程池

二、Future 简要介绍

Future 表示异步任务的结果。
通过 ExecutorService.submit() 提交任务后返回 Future 对象，

可用于：
-get()：获取任务结果（阻塞）
-isDone()：判断是否完成
-cancel()：取消任务

适用于获取多线程执行结果或等待所有任务完成后统一处理。
```

### 3.2 示例

```
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.*;

public static void main(String[] args) throws ExecutionException, InterruptedException {

    ExecutorService executor = Executors.newFixedThreadPool(4);
    List<Callable<String>> tasks = new ArrayList<>();

    for (int i = 0; i < 5; i++) {
        tasks.add(() -> {
            // 模拟获取数据
            return "data";
        });
    }

    List<Future<String>> futures = executor.invokeAll(tasks);
    List<String> resultList = new ArrayList<>();
    for (Future<String> future : futures) {
        resultList.add(future.get());
    }

    upload(resultList);
    executor.shutdown();
}
private static void upload(List<String> resultList) {
    // 模拟上传
    System.out.println("统一上传");
}
```

示例中使用到的方法说明

```
1、List<Callable<String>> tasks中Callable,配合线程池获取结果,
线程池的submit(Callable<T>) 方法会返回 Future<T>，用于异步获取结果

2、executor.invokeAll(tasks)：接收一个 Callable 任务集合，返回一个 Future 列表
```

## 四 Java语言—ConcurrentLinkedQueue + Future + ExecutorService实现方案

### 4.1 概念介绍

```
一、ConcurrentLinkedQueue
-是线程安全的无界队列，基于链表实现。
-支持高并发读写操作，不需要加锁。
-适用于多个线程同时向队列中添加或读取数据的场景。

二、Future
-表示异步任务的结果，由 ExecutorService.submit() 返回。
-可通过 future.get() 获取执行结果（阻塞等待），或用 isDone() 判断是否完成。
-适合在多线程任务中获取单个任务的返回值。

三、ExecutorService
-是 Java 提供的线程池接口，用于管理和复用线程资源。
-提供 submit()、execute() 方法执行任务，避免手动创建线程。
-支持关闭（shutdown()）和批量提交（如 invokeAll()）等功能。
-常见实现：FixedThreadPool、CachedThreadPool、ScheduledThreadPool 等。

四、组合使用场景
使用 ExecutorService 提交任务 → 返回多个 Future → 
将结果存入 ConcurrentLinkedQueue → 最后统一处理。
```

### 4.2 示例

```
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.*;

public static void main(String[] args) throws ExecutionException, InterruptedException {

    ExecutorService executor = Executors.newFixedThreadPool(4);
    ConcurrentLinkedQueue<String> results = new ConcurrentLinkedQueue<>();
    List<Future<?>> futures = new ArrayList<>();

    for (int i = 0; i < 5; i++) {
        futures.add(executor.submit(() -> {
            // 模拟采集
            results.add("data");
        }));
    }

    // 等待所有任务完成
    for (Future<?> f : futures) f.get();

   // 统一上传
    upload(results);

}

private static void upload(ConcurrentLinkedQueue<String> results) {
    System.out.println("统一上传");
}
```

示例中使用到的方法说明

```
1、results = new ConcurrentLinkedQueue<>(); //创建了一个线程安全的无界队列
2、f.get() //Future 接口的核心方法，用于获取异步任务的执行结果
```

## 五 Kotlin语言(安卓环境)—async + awaitAll

### 5.1 概念介绍

```
1、CoroutineScope
-协程作用域接口，用于启动和管理协程。
-支持结构化并发，推荐搭配 lifecycleScope、viewModelScope 使用，能自动取消协程。
-示例：CoroutineScope(Dispatchers.IO).launch { ... }

2、GlobalScope
-全局作用域，协程生命周期与应用进程一致。
-启动的协程不会自动取消，不建议用于 UI 层或需要管理生命周期的场景。
-示例：GlobalScope.launch { ... }

3、async
-启动一个返回值的协程，返回 Deferred（类似 Java 的 Future）。
-可并发执行多个任务，后续用 await() 获取结果。
-示例：val deferred = async { fetchData() }

4、awaitAll
-批量等待多个 Deferred 执行完成，返回所有结果。
-常与 async 一起使用并发采集数据。
-示例：val results = listOf(d1, d2).awaitAll()

5、runBlocking
-启动一个阻塞当前线程的协程，直到协程完成。
-常用于测试或 main() 函数中，不建议在 UI 中使用。
-示例：runBlocking { launch { ... } }

6、总结一句话：
CoroutineScope 用于管理协程，
GlobalScope 是全局协程，
async/awaitAll 适合并发获取结果，
runBlocking 用于阻塞式启动协程（如测试）。
```

### 5.2示例

```
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking

fun main() {
    val results = mutableListOf<String>()
    val list = listOf(1, 2, 3, 4, 5)

    val deferred = list.map {
        GlobalScope.async {
            // 模拟采集
            "data_$it"
        }
    }

    runBlocking {
        val collected = deferred.awaitAll()
        results.addAll(collected)
        upload(results)
    }

}

private fun CoroutineScope.upload(results: MutableList<String>) {
   print("统一上传")
}
```

