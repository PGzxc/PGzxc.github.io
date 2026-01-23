---
title: Android面试题——掘金-三方框架之RXJava(5.7)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: a4c5dd95
date: 2025-04-07 10:35:27
---
## 一 概述

```
以下是关于 RxJava 在 Android 面试中的常见问题及答案整理，
涵盖核心概念、线程切换、操作符、背压处理等重点内容，
适用于项目总结、面试答题复习。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 RxJava 是什么？适用于哪些场景？

```
1.概念
RxJava 是一个基于响应式编程的异步事件处理库，核心思想是 通过链式操作处理异步数据流。

2.适用场景：
-多线程切换（子线程网络请求、主线程 UI 更新）
-数据流操作（如 list 转换、过滤）
-异步事件组合（多个请求合并/顺序执行）
-防抖节流、轮询任务
-替代回调地狱（Callback Hell）
```

### 2.2 RxJava 的基本组成有哪些？

|    组件    |                 作用说明                 |
| :--------: | :--------------------------------------: |
| Observable |             被观察者，事件源             |
|  Observer  |           观察者，接收事件响应           |
| Subscriber |    Observer 的子类，具备取消订阅能力     |
| Disposable |           用于管理订阅生命周期           |
| Scheduler  |    线程调度器，决定在哪个线程执行任务    |
|  Operator  | 操作符，用于对事件流进行变换、过滤等操作 |

### 2.3 Observable 和 Flowable 区别？

|    特性    |    Observable     |           Flowable           |
| :--------: | :---------------: | :--------------------------: |
|  背压处理  |     ❌ 不支持      |    ✅ 支持（Backpressure）    |
| 用于数据量 |    数据量可控     | 数据量大、不可控（如无限流） |
|  使用场景  | 常规 UI、异步场景 | 高频输入、文件读取、长连接等 |

### 2.4 怎么实现线程切换？

```
Observable.just("网络请求")
    .subscribeOn(Schedulers.io())           // 设置事件发射线程
    .observeOn(AndroidSchedulers.mainThread()) // 设置事件消费线程
    .subscribe { result -> 
        // UI 更新
    }
```

### 2.5 常用的操作符有哪些？举例说明？

1-表格

|  操作符  |             示例             |
| :------: | :--------------------------: |
|   map    |         转换数据类型         |
| flatMap  |        展平异步事件流        |
|   zip    |     多个 Observable 合并     |
|  filter  |     过滤不符合条件的数据     |
| debounce | 防抖操作（延迟一段时间触发） |
|  concat  |   串联执行多个 Observable    |
|  retry   |          出错后重试          |
| interval |           定时任务           |
| distinct |             去重             |

2-例：flatMap 合并多个网络请求

```
getUser()
    .flatMap { user -> getPosts(user.id) }
    .subscribe { posts -> show(posts) }
```

### 2.6 RxJava 如何避免内存泄漏？

```
1.概念
-使用 Disposable 控制订阅生命周期；
-在 onDestroy() 中调用 dispose()；
-配合 CompositeDisposable 统一管理多个订阅；
-或结合 Lifecycle 使用 RxLifecycle、AutoDispose 等库自动释放。

2.示例
val disposable = Observable.just("a")
    .subscribe { ... }

// 页面销毁时
disposable.dispose()
```

### 2.7 如何实现两个接口请求并发执行，两个都完成后处理结果？

```
 1.使用 zip
 2.示例
 Observable.zip(
    api.getUser(),
    api.getPosts(),
    BiFunction<User, Posts, Pair<User, Posts>> { user, posts ->
        user to posts
    }
).subscribe { (user, posts) -> 
    // 同时处理 user 和 posts
}
```

### 2.8 RxJava 如何处理异常？

```
1.概念
-使用 onErrorResumeNext()、onErrorReturn() 捕获异常；
-或 retry() 设置重试次数；

2.示例
observable
    .onErrorReturn { e -> defaultValue }
    .subscribe(...)
```

### 2.9  背压（Backpressure）是什么？RxJava 怎么处理？

1-概念

```
背压是指 事件发射速度大于消费速度 时造成的内存压力甚至崩溃。
RxJava2 提供 Flowable 来解决背压问题，支持策略：
Flowable.create(..., BackpressureStrategy.BUFFER)
```

2-表格

| 策略名  |               说明                |
| :-----: | :-------------------------------: |
| BUFFER  |    缓存所有发射项（可能 OOM）     |
|  DROP   |         舍弃多余的发射项          |
| LATEST  |           仅保留最新项            |
|  ERROR  | 抛出 MissingBackpressureException |
| MISSING |     不处理，交由下游自己处理      |

### 2.10 如何实现点击事件的防抖（debounce）？

```
RxView.clicks(button)
    .debounce(300, TimeUnit.MILLISECONDS)
    .subscribe {
        // 防抖后的点击响应
    }
```

### 2.11 RxJava 如何和 Retrofit 结合？

```
interface Api {
    @GET("user")
    fun getUser(): Observable<User>
}
api.getUser()
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe { user -> ... }
```

### 2.12 CompositeDisposable 和 Disposable 有什么区别？

```
1.概念
-Disposable：单个订阅管理；
-CompositeDisposable：多个 Disposable 集合管理。

2.示例
val composite = CompositeDisposable()
val d1 = api.getUser().subscribe()
val d2 = api.getPosts().subscribe()

composite.addAll(d1, d2)

// 页面销毁时
composite.clear()
```

### 2.13 RxJava 常见的内存泄漏场景？

```
-持有上下文对象（Activity/Fragment）但未取消订阅；
-未正确释放订阅；
-不当使用 Schedulers.io() 导致线程堆积；
-多个事件链未控制线程切换/释放资源。
```

### 2.14 RxJava 与 Coroutine 对比？

|   特性   |   RxJava   |    Kotlin Coroutine    |
| :------: | :--------: | :--------------------: |
| 学习曲线 |   较陡峭   |        简洁自然        |
| 线程切换 | Schedulers |      withContext       |
| 背压处理 |  Flowable  |  Flow（配合 buffer）   |
|  可读性  |  链式回调  | 顺序结构（更接近同步） |
| 官方支持 |   三方库   |      Kotlin 官方       |

### 2.15 RxJava 中 cold 和 hot observable 有什么区别？

```
-Cold Observable：每个订阅都会从头开始发射（如 Observable.just()）；
-Hot Observable：多个订阅共享同一个数据源（如 LiveData、Subject）
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)