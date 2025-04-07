---
title: Android面试题——掘金-性能优化之崩溃、异常捕获(4.7)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: a38e82c7
date: 2025-04-07 10:09:00
---
## 一 概述

```
崩溃与异常捕获相关面试题及详解
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 如何有效捕获应用中的异常，避免应用崩溃？

```
在 Android 中，应用崩溃主要是由于未处理的异常。为了避免应用崩溃，可以使用以下几种方法：

1.全局异常捕获： 使用 Thread.setDefaultUncaughtExceptionHandler() 捕获未被处理的异常。

Thread.setDefaultUncaughtExceptionHandler((thread, throwable) -> {
    // 可以在此保存错误日志、上传崩溃报告
    Log.e("UncaughtException", throwable.getMessage());
});

2.try-catch 语句： 
对可能发生异常的代码块使用 try-catch 捕获异常。
特别是网络请求、文件 IO、数据库操作等容易出错的地方
try {
    // 可能抛出异常的代码
} catch (Exception e) {
    // 异常处理
    Log.e("Error", e.getMessage());
}
3.自定义异常处理： 
自定义一些常见异常的处理方式（如空指针、数组越界、网络异常等），
并通过日志记录、用户提示、上报等方式进行处理。
```

### 2.2 如何收集和分析 Android 应用的崩溃日志？

```
1.Logcat：
通过 Logcat 记录应用的日志，可以在发生崩溃时获取堆栈信息。
利用 Log.e() 输出错误日志。
Log.e("TAG", "Exception", throwable);

2.Crashlytics： 
使用 Firebase Crashlytics 可以自动捕获崩溃日志，
并上传到 Firebase 控制台，帮助开发者分析崩溃原因。

3.Bugly： 
腾讯 Bugly 也提供崩溃捕获和日志分析功能。
集成和使用方法与 Crashlytics 类似。
```

### 2.3 什么是 ANR（Application Not Responding）？如何避免 ANR？

```
1.什么是ANR
ANR 是指应用在主线程阻塞超过 5 秒钟，导致系统提示用户应用无响应。

2.常见的 ANR 原因有：
-主线程执行了耗时操作（如网络请求、数据库操作、文件 IO）。
-异常的 UI 操作，如无限的布局重绘。

3.如何避免 ANR：

3.1不要在主线程执行耗时操作，包括：
-网络请求：使用 AsyncTask、ExecutorService、Coroutine 或 WorkManager。
-数据库操作：使用 Room 或 SQLite 的异步操作。
-文件读写：异步处理文件操作。

3.2 使用 Handler 或 AsyncTask 在非主线程处理后台任务。
3.3 定时检测主线程状态：通过 Looper.myLooper() 监控主线程状态，发现异常立即处理。
3.4 合理使用广播和 Service，避免不必要的全局广播、Service 或前台服务在主线程阻塞。
3.5 使用 StrictMode 检测阻塞操作：开启 StrictMode 可以捕获一些主线程的异常操作。
```

### 2.4 如何避免应用崩溃后的重复提交崩溃日志？

```
在应用崩溃时，确保崩溃报告仅上传一次，避免重复上传数据。
可以通过使用本地数据库或 SharedPreferences 存储崩溃状态，确保每次崩溃只报告一次。

使用 Crashlytics 或 Bugly 等 SDK 时，它们会自动处理重复报告的机制。
你只需要保证在首次崩溃后能及时上传
```

### 2.5 如何在 Android 中实现自定义异常类型？

```
 1-自定义异常类可以继承 Exception 或 RuntimeException，并根据需要提供更多的构造函数或方法。
 public class MyCustomException extends Exception {
    public MyCustomException(String message) {
        super(message);
    }

    public MyCustomException(String message, Throwable cause) {
        super(message, cause);
    }
}
2-在需要的地方抛出自定义异常，并进行捕获和处理。
 try {
    // 可能抛出自定义异常的代码
    throw new MyCustomException("Something went wrong!");
} catch (MyCustomException e) {
    Log.e("MyApp", "Custom error: " + e.getMessage());
}
```

### 2.6 如何避免内存泄漏导致的崩溃？

```
内存泄漏是 Android 应用中常见的崩溃原因，尤其是在频繁创建和销毁对象时。
以下是避免内存泄漏的策略：

1.避免持有 Activity/Context 的引用：
-避免在 Activity 或 Fragment 的静态变量中持有 Context 引用。
-使用 getApplicationContext() 来代替 Activity 或 Fragment 的 Context，
避免因上下文生命周期导致的内存泄漏。

2.使用 WeakReference：
对于不需要持有强引用的对象，可以使用 WeakReference，它会在垃圾回收时自动清除对象引用。

3.清理注册的监听器：
在 onDestroy() 中及时移除对 BroadcastReceiver、View 的监听器，避免造成内存泄漏。

4.使用 LeakCanary 检查内存泄漏：
LeakCanary 是一个专门检测内存泄漏的库。
通过集成 LeakCanary 可以帮助开发者检测并修复内存泄漏问题。
```

### 2.7 如何处理网络请求中的异常，避免应用崩溃？

```
网络请求中可能会发生多种异常（如网络超时、服务器错误、JSON 解析错误等）。
为了避免这些异常导致应用崩溃：

1.使用 try-catch 语句 捕获网络请求中的异常：
2.使用 Retrofit、OkHttp 等库的默认错误处理机制，确保异常不会导致崩溃
```

### 2.8 如何避免 Java 中的空指针异常？

```
-使用 Optional 类来避免空指针异常。
-使用 @NonNull 和 @Nullable 注解标记方法参数、返回值。
-使用 Objects.requireNonNull() 来检查空值。
-对于集合、对象等，使用 null 安全检查
```

### 2.9 崩溃与异常捕获面试技巧（项目经验回答模板）

```
在我参与的项目中，我们使用 Firebase Crashlytics 实现了崩溃日志的实时上传和分析，
帮助我们及时发现和解决崩溃问题。
对于常见的异常（如网络异常、空指针等），
我们通过全局异常捕获机制进行了处理，并确保应用在崩溃时能够优雅地退出。
此外，我们还使用 LeakCanary 来检测并修复内存泄漏问题，有效减少了由于资源未释放导致的崩溃。
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)