---
title: Android面试题——公司面试题1
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
  - 公司面试题
abbrlink: f2ec1a04
date: 2025-07-09 17:35:37
---
## 一 概述

```
1.你是从什么时候开始使用flutter
2.项目中有没有用到自定义View
3.用过多线程吗
4.多线程下获取信息后统一上传有什么解决方案
5.handler机制
6.A线程和B线程同时发送消息，Handler内部是怎么识别是来自于A还是B
7.对项目做过什么优化
8.做过什么适配吗
```

<!--more-->

## 二 面试题解答

### 2.1 你是从什么时候开始使用flutter

```
面试官可能要了解你的flutter开发经验和项目经验，简单回答学了多少年，做了几个项目就好。

比如：
我从 2020 年开始使用 Flutter
做过几个项目，比如xxx，积累了在状态管理、性能优化等方面的经验
```

### 2.2 项目中有没有用到自定义View

```
1-复杂的组合布局
2-自定义View，比如进度条、图表控件；
自定义时主要重写了onMeasure 和 onDraw 方法，确保性能与适配性。
```

### 2.3 用过多线程吗

```
1、多线程
在项目中通过 Thread、Runnable、AsyncTask（已废弃）、
HandlerThread、ExecutorService 等方式实现多线程

2、线程池

2.1-FixedThreadPool
-固定数量线程的线程池，适合负载较稳定的后台任务
-Executors.newFixedThreadPool(int nThreads)

2.2-CachedThreadPool
-可缓存的线程池，线程数量不固定，空闲线程会被复用
-Executors.newCachedThreadPool()

2.3-SingleThreadExecutor
-单线程池，所有任务顺序执行
-Executors.newSingleThreadExecutor()

2.4-ScheduledThreadPool
-支持定时任务和周期性任务执行
-Executors.newScheduledThreadPool(int corePoolSize)
```

### 2.4 多线程下获取信息后统一上传有什么解决方案

```
一、理论
1、Java 中可以用：
-CountDownLatch：等待多个线程完成后统一上传
-ConcurrentLinkedQueue：线程安全收集数据
-ExecutorService + Future：收集结果后统一处理上传

2、Kotlin 中可以用：
-coroutine + async/await：并发获取信息，使用 awaitAll 统一上传
-Channel 或 Flow：收集数据后集中处理上传操作


二、示例
2.1-Java 方案：
使用 CountDownLatch 或 Future + ExecutorService 等方式等待所有子线程完成，再统一上传。
例如：

CountDownLatch latch = new CountDownLatch(taskCount);
for (...) {
    executor.execute(() -> {
        // 获取信息
        latch.countDown();
    });
}
latch.await();
// 统一上传

2.2-Kotlin 方案：
使用协程 async + awaitAll 实现并发处理后统一上传：
val results = coroutineScope {
    list.map {
        async {
            // 获取信息
        }
    }.awaitAll()
}
// 统一上传 results
```

### 2.5 handler机制

```
1、说明
Handler 机制是 Android 实现线程间通信的方式，
主要由 Handler、Message、MessageQueue 和 Looper 组成。

子线程将消息发送到主线程的消息队列，
由主线程的Looper轮询处理，Handler接收消息并在主线程中更新 UI。

2、调用过程
Handler 机制通过 Handler 发送 Message 到 MessageQueue，由 Looper 轮询取出并回调处理。

-Handler：发送/处理消息
-Message：消息载体
-MessageQueue：消息队列
-Looper：不断循环读取消息并分发给对应 Handler
```

### 2.6 A线程和B线程同时发送消息，Handler内部是怎么识别是来自于A还是B

```
1、说明
Handler 默认不区分消息来自哪个线程，所有消息进入同一个 MessageQueue。
如需识别消息来源，可在发送时自定义 Message 字段，
可以在发送的 Message 里通过 what、arg1/arg2 或 obj 自定义字段标记线程来源，
Handler 收到消息后根据这些字段判断。


2、例如：

Message msg = handler.obtainMessage();
msg.obj = "from A thread"; // 或 msg.arg1 = 1;
handler.sendMessage(msg);
```

### 2.7 对项目做过什么优化

```
1、性能优化：采用异步加载和内存缓存，减少主线程阻塞，提升流畅度。
2、内存优化：防止内存泄漏（解绑监听、弱引用），合理管理资源。
3、网络优化：合并请求、开启数据压缩和缓存，降低流量和延迟。
4、启动优化：拆分初始化流程，懒加载按需加载，缩短冷启动时间。
5、APK提交优化：使用 ProGuard 混淆减小体积，优化资源文件，提升安装速度。
```

### 2.8 做过什么适配吗

```
1、屏幕适配（使用ConstraintLayout、dp单位、多分辨率资源）、
2、系统版本适配（兼容不同Android版本API）、
3、机型适配（处理不同厂商定制差异）
```

