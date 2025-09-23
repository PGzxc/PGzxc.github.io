---
title: Android面试题——高频面试题之原理类(4)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: '12720327'
date: 2025-09-22 16:25:30
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二 面试要求和面试题

### 2.1 面试要求(技术点提取)

```
1.多线程编程与通信：asynctask,coroutine等
2.Android消息机制：handler,looper,messagequeue
3.Android ui事件传递(事件分发机制)
4.View绘制流程(测量,布局，绘制等原理)
5.进程间通信(ipc)
6.ndk/jni技术
7.android room，lifecycle等相关框架及原理
```

## 三 面试题解答(仅供参考)

### 3.1 多线程编程与通信：asynctask,coroutine等

面试知识点

```
Android多线程是面试热点，考察异步处理避免UI阻塞的能力。
常见场景包括网络请求、IO操作。
招聘要求强调Coroutine在Kotlin项目中的应用，AsyncTask虽过时但仍需了解其局限
```

1、Android中实现多线程的方法有哪些？

```
Thread：直接继承或实现 Runnable，管理复杂。
Handler：消息机制，线程间通信。
AsyncTask：过时，简化后台任务，易内存泄漏。
Executor：线程池（如 ThreadPoolExecutor），高效管理线程。
Kotlin Coroutine：轻量级，推荐用于现代开发，支持挂起/恢复。

区别：Coroutine 高效、简洁，减少回调地狱；Thread/AsyncTask 管理复杂。
```

2、AsyncTask的原理和使用注意事项？

```
1、原理：
基于 Handler + 线程池，doInBackground() 执行后台任务，onPostExecute() 更新 UI。

2、注意：
-已废弃，易引发内存泄漏（Activity 销毁未取消）。
-不适合长任务（可能导致 ANR）。
-推荐替代：Coroutine 或 RxJava。
```

3、Kotlin Coroutine在Android中的应用和优势？

```
1、应用：
简化异步编程（如网络请求、IO），用 suspend 函数以同步风格写异步逻辑。

2、优势：
轻量，挂起不阻塞线程。
支持取消、异常处理，减少回调地狱。
示例：viewModelScope.launch { apiCall() }。
```

4、协程与传统线程的区别？

```
协程用户级，开销小（可运行数千个），基于线程但不绑定
```

### 3.2 Android消息机制：handler,looper,messagequeue

面试知识点

```
这是核心原理题，考察线程通信。
招聘中常问内存泄漏和ANR相关，互联网分享强调源码分析
```

1、Handler/Looper/MessageQueue 三者关系？

```
MessageQueue：单链表存储 Message，管理消息队列。
Looper：轮询 MessageQueue，分发消息给 Handler。
Handler：发送（sendMessage）和处理（handleMessage）消息
```

2、子线程中能否直接使用 Handler？(子线程 Handler)

```
默认没有 Looper，需要调用 Looper.prepare() 和 Looper.loop() 才能使用 Handler。
```

3、MessageQueue 是阻塞还是轮询？(MessageQueue 机制)

```
使用 epoll/阻塞机制，无消息时休眠，新消息唤醒。
```

4、Handler的运行机制是什么？

```
Handler 发送 Message 到 MessageQueue。
Looper 轮询 MessageQueue，分发至 Handler.handleMessage()。
主线程默认有 Looper（由 ActivityThread 初始化），子线程需手动创建。
```

5、为什么主线程Looper.loop()不会导致ANR？

```
Looper.loop() 空闲时阻塞（nativePollOnce()）。
系统事件（如触摸）插入 Message，唤醒处理。
ANR 因单次 Message 处理超 5s，非 loop 本身
```

6、Handler内存泄漏原因及解决？

```
1、原因：
非静态 Handler 持有 Activity 引用，延迟消息未处理导致无法 GC。

2、解决：
使用静态内部类 + WeakReference。
onDestroy() 调用 removeCallbacksAndMessages(null)
```

7、Message的复用机制？

```
通过 Message.obtain() 从池获取，处理后 recycle() 回收，减少 GC 提高性能
```

### 3.3 Android ui事件传递(事件分发机制)

面试知识点

```
高频题，考察自定义View和冲突解决。招聘中常问源码级细节
```

1、事件分发机制的三个方法

|          方法           |             作用             |        返回值影响         |
| :---------------------: | :--------------------------: | :-----------------------: |
|  dispatchTouchEvent()   |  分发事件，从Activity到View  | true:消费；false:向上回传 |
| onInterceptTouchEvent() | ViewGroup拦截事件(默认false) |    true:拦截，自行处理    |
|     onTouchEvent()      |       处理事件(点击等)       |  true:消费；false:不处理  |

2、Touch 事件分发机制？

```
1、流程：Activity → Window → DecorView → ViewGroup → 子 View。
-dispatchTouchEvent() 分发事件。
-ViewGroup 可通过 onInterceptTouchEvent() 拦截。
-子 View 调用 onTouchEvent() 处理。

2、优先级：onTouchListener > onTouchEvent > onClickListener.
3、消费规则：事件消费后停止，未消费向上回传。
```

3、如何解决View事件冲突？

```
外部拦截：父 View 在 onInterceptTouchEvent() 动态拦截（如 ViewPager vs ListView）。
内部拦截：子 View 调用 requestDisallowInterceptTouchEvent(true) 禁止父拦截
示例：ViewPager与ListView冲突，用外部拦截。
```

4、MotionEvent是什么？事件类型？

```
封装触摸事件（如 ACTION_DOWN/UP/MOVE），提供 getX()/getY() 获取坐标，
支持多点触控（getPointerCount()）
```

5、onInterceptTouchEvent 和 onTouchEvent 区别？(事件优先级)

```
onTouchListener > onTouchEvent > onClickListener。且返回 true 会消费事件
```

### 3.4 View绘制流程(测量,布局，绘制等原理)

面试知识点

```
考察UI渲染优化，招聘要求结合性能（如OverDraw）。
互联网分享常提布局层级和卡顿原因。
```

1、View的测量、布局、绘制原理？

```
测量（onMeasure）：根据 MeasureSpec（父约束 + LayoutParams）计算 View 大小。
布局（onLayout）：ViewGroup 遍历子 View，调用 child.layout() 确定位置。
绘制（onDraw）：使用 Canvas 渲染内容（背景、子 View 等）。
```

2、View的绘制流程？

```
1、触发：requestLayout() 或 invalidate()。

2、流程：
-measure：递归计算大小。
-layout：设置位置（setFrame()）。
-draw：渲染背景、内容、子 View。

3、自定义 View 需重写 onDraw()。
```

3、UI渲染流程和优化点？

```
1、渲染流程：
setContentView() 加载 DecorView，PhoneWindow 管理，VSync 触发 Choreographer 调度。

2、优化：
-使用 ConstraintLayout 减少嵌套。
-移除不必要背景，避免 OverDraw。
-开启硬件加速（setLayerType）。
-避免 onDraw 中耗时操作
```

4、UI卡顿的原因及解决？

```
1、原因：
主线程耗时操作（网络、IO）、复杂布局、过度绘制。

2、解决：
-使用 Coroutine 异步处理。
-工具分析：Trace、LayoutInspector。
-简化 View 树，合并布局。
```

5、requestLayout 和 invalidate 的区别？

```
requestLayout：触发完整流程（measure/layout/draw）。
invalidate：仅触发重绘（draw）。
```

### 3.5 进程间通信(ipc)

面试知识点

```
考察跨进程场景，如多进程App。
招聘要求懂Binder原理，互联网分享强调AIDL
```

1、IPC(Inter-Process Communication)

```
指在不同进程之间进行数据交换和通信
```

2、Android中的IPC方式

```
Bundle：通过 Intent 传递简单数据，适合 Activity/Service。
文件共享：读写文件，简单但并发问题。
ContentProvider：跨应用数据共享，基于 Binder。
Messenger：基于 Handler，串行通信，简单但不支持并发。
AIDL：复杂数据类型，支持并发通信。
Socket：跨设备/进程通信。
Broadcast：跨进程广播，效率较低。
```

3、Binder机制？

```
1、原理：
C/S 架构，基于内核内存映射，Client 通过 Proxy 调用 Server 的 Stub。

2、优势：
高效、安全（权限检查）。

3、AIDL：
生成 Stub/Proxy，定义 IPC 接口。
```

4、AIDL的使用和作用？

```
1、步骤：
-创建 .aidl 文件，编译生成 Java 类。
-Server 实现 Stub，Client 用 asInterface() 绑定。


2、作用：
跨进程方法调用（如 Service 通信）
```

### 3.6 ndk/jni技术

1、NDK/JNI是什么？

```
1、DK（Native Development Kit）：
是一套工具集，允许开发者使用C/C++语言编写部分代码，并将其打包成.so动态库。

2、JNI（Java Native Interface）：
Java 与 C/C++ 的接口规范，支持双向调用
```

2、JNI是什么？如何使用NDK？

```
1、步骤：
-声明 native 方法。
-使用 javah 生成头文件。
-实现 C/C++ 函数。
-System.loadLibrary() 加载 .so。


2、场景：
音视频处理（FFmpeg）、高性能计算、硬件访问。
```

### 3.7 android room，lifecycle等相关框架及原理

面试考点

```
考察重点：Jetpack 组件在现代架构中的作用与实现原理  
聚焦：数据持久化、生命周期管理、线程安全、避免内存泄漏
```

1、什么是 Android Room？它的作用与原理？

```
1、作用：
SQLite 抽象层，简化数据库操作，支持编译期 SQL 校验。

2、核心组件：
@Entity：定义表结构。
@Dao：定义 CRUD 操作。
@Database：数据库持有者。


3、原理：
注解处理器生成 SQL 实现类，支持 Coroutine/Flow/LiveData。
```

2、Room 如何处理迁移与线程安全？

```
1、迁移：
通过 Migration 类定义 schema 变化，生产环境避免 fallbackToDestructiveMigration。

2、线程安全：
使用 @Transaction 保证一致性，异步执行避免主线程 ANR。
```

3、Lifecycle 如何感知组件生命周期？

```
1、原理：
-ReportFragment 或 LifecycleRegistry 捕获 Activity/Fragment 生命周期。
-分发事件给 LifecycleObserver（通过 @OnLifecycleEvent）。


2、作用：
解耦业务逻辑与生命周期，避免内存泄漏。
```

4、Lifecycle 与 ViewModel

```
Lifecycle：事件驱动状态机，分发生命周期事件。
ViewModel：存储 UI 数据，存活于配置变化（如屏幕旋转）。
结合：通过 viewModelScope + Lifecycle 确保数据加载在正确状态，防止泄漏
```

5、Lifecycle 的实现机制

```
1、目的：
解耦业务逻辑与 Activity/Fragment 生命周期，避免资源泄漏。

2、核心类：
-LifecycleOwner（生命周期拥有者，如 Activity/Fragment）
-LifecycleObserver（观察者，通过注解 @OnLifecycleEvent 监听事件）

3、机制：
ReportFragment 注入 → 捕获系统生命周期 → 转发给 Lifecycle → 通知观察者。

4、优势：
开发者无需手写生命周期方法，专注业务逻辑（如在 onStart 注册，在 onStop 释放）。
```
