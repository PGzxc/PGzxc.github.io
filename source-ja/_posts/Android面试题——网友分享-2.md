---
title: Android面试题——网友分享(2)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: '9091685'
date: 2025-09-17 08:12:43
---
## 一 概述

```
本文分享：
 - 网友提供：外包面试题合集
 - 高频面试题
```

<!--more-->

## 二 面试题

```
1.String 、StringBuffer、StringBuilder(3家都问了)
2.协程和线程区别
3.协程原理
4.协程的异常传递和处理方式
5.Binder原理，怎么保证安全性的
6.aidl原理
7.Handler原理
8.handlersend消息  消息是怎么被加入messgqueue中的
9.Handler中looper只能有一个吗
10.Handler同步屏障
11.app启动步骤
12.java实现线程同步的方式
13.synchronized 原理
14.volatile原理
15.Retrofit原理
16.内存泄漏怎么查
17.android 匿名类会导致内存泄漏吗
18.强引用 弱引用 软引用的区别
19.线程安全和不安全
20.怎么创建线程池
21.如何分析oom和anr
22.如何分析trace文件
23.事件分发那3个方法, 拦截事件是哪个方法，返回true是拦截 还是false
24.String a = new String("a")创建了几个对象
25.jvm内存模型
```

## 三 面试题解答(仅供参考)

### 3.1 String 、StringBuffer、StringBuilder

```
String：不可变对象，每次修改都会创建新对象。
StringBuffer：可变，线程安全（方法带 synchronized），速度慢。
StringBuilder：可变，线程不安全，但速度快。
```

### 3.2 协程和线程区别

```
线程：操作系统调度，创建/切换开销大。
协程：运行在用户态，挂起/恢复只在框架层处理，轻量高效。
```

### 3.3 协程原理

```
编译器把 suspend 函数改造成状态机。
挂起点保存上下文，恢复时从断点继续。
最终还是跑在线程上，由调度器分发。
```

### 3.4 协程的异常传递和处理方式

```
默认会往父协程传播，直到 CoroutineScope
SupervisorJob：子任务挂了不影响其他。
捕获方式：try/catch 或 CoroutineExceptionHandler
```

### 3.5 Binder原理，怎么保证安全性的

```
Binder 是 Android 进程间通信（IPC）的机制，基于内核 /dev/binder 驱动。
客户端调用 → Proxy → 内核 Binder 驱动 → Stub → 服务端。
安全性靠：UID/PID 校验、权限检查、Binder token 验证。
```

### 3.6 aidl原理

```
编译 .aidl 文件生成 Java 接口和 Stub、Proxy 类。
Stub 运行在服务端，Proxy 在客户端，底层通过 Binder 通信。
```

### 3.7 Handler原理

```
Handler 负责发消息。
MessageQueue 维护消息队列。
Looper 死循环取消息，再交给 Handler 处理
```

### 3.8 handlersend消息  消息是怎么被加入messgqueue中的

```
sendMessage → enqueueMessage → 把 Message 按时间顺序插入队列（单链表）
```

### 3.9 Handler中looper只能有一个吗

```
每个线程只能有一个 Looper。
主线程默认有，子线程需要手动 Looper.prepare()
```

### 3.10 Handler同步屏障

```
一种特殊消息，target=null。
插入后队列只处理异步消息。
典型场景：UI 绘制优先。
```

### 3.11 app启动步骤

```
点击图标 → AMS 通知 Zygote。
Zygote fork 新进程。
创建 Application，执行 onCreate。
启动 Activity，执行生命周期
```

### 3.12 java实现线程同步的方式

```
synchronized、volatile
Lock/ReentrantLock、ReadWriteLock
Atomic 原子类
wait/notify
并发容器（ConcurrentHashMap）
```

### 3.13 synchronized 原理

```
底层是对象监视器（Monitor）
对应 JVM 指令 monitorenter/monitorexit。
JVM 会做锁优化：偏向锁 → 轻量级锁 → 重量级锁
```

### 3.14 volatile原理

```
保证 可见性（修改立刻刷新到主内存）。
保证 有序性（禁止指令重排）。
不保证原子性（如 ++ 操作仍需加锁）
```

### 3.15 Retrofit原理

```
动态代理生成接口实现类。
通过 OkHttp 发送网络请求。
结合 ConverterFactory 解析数据。
结合 CallAdapterFactory 实现协程/ RxJava 支持
```

### 3.16 内存泄漏怎么查

```
工具：AS Profiler、MAT、LeakCanary。
方法：heap dump → 分析 GC root → 定位未释放引用。
常见场景：Handler 内部类、静态变量持有 Context、未关闭的资源。
```

### 3.17 android 匿名类会导致内存泄漏吗

```
匿名内部类会持有外部类引用。
若生命周期过长（如后台线程持有 Activity），可能导致泄漏。
解决：静态内部类 + 弱引用
```

### 3.18 强引用 弱引用 软引用的区别

```
强引用：不会回收。
软引用：内存不足时会回收（常用于缓存）。
弱引用：GC 一发现就回收，常用于避免泄漏
```

### 3.19 线程安全和不安全

```
线程安全：并发下不会出错（ConcurrentHashMap、CopyOnWriteArrayList）
线程不安全：并发下可能数据错乱（ArrayList、HashMap）
解决：锁、原子类、并发容器。
```

### 3.20 怎么创建线程池

```
用 ThreadPoolExecutor：核心线程数、最大线程数、队列、拒绝策略都可配置。
Executors 提供快捷方法，但可能 OOM（如 newFixedThreadPool）
```

### 3.21 如何分析oom和anr

```
OOM：看 logcat，dump 堆，找内存泄漏或大对象。
ANR：分析 /data/anr/traces.txt，主线程是否卡在 I/O 或锁
```

### 3.22 如何分析trace文件

```
打开 traces.txt，找到 main 线程。
看是否卡在 I/O、死循环、锁竞争。
```

### 3.23 事件分发那3个方法, 拦截事件是哪个方法，返回true是拦截 还是false

```
dispatchTouchEvent → onInterceptTouchEvent → onTouchEvent。
拦截事件在 onInterceptTouchEvent。
返回 true 表示拦截，false 不拦截。
```

### 3.24 String a = new String("a")创建了几个对象

```
创建 2 个对象：常量池的 "a" + new 出来的对象。
```

### 3.25 jvm内存模型

```
堆：对象实例。
方法区（元空间）：类信息、常量池、静态变量。
虚拟机栈：方法调用、局部变量。
本地方法栈：native 方法调用。
程序计数器：记录线程执行位置
```

