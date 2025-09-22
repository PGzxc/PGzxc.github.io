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

## 二 面试要求和面试题(后续类似不再详述)

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
主要包括：
Thread（直接继承或实现Runnable）、
Handler（消息机制处理异步）、
AsyncTask（简化后台任务，但已废弃）、
Executor（线程池管理，如ThreadPoolExecutor）、
Coroutine（Kotlin轻量级协程，推荐用于现代开发）。

区别在于Thread简单但管理复杂，Coroutine更高效，支持挂起不阻塞线程。
```

2、AsyncTask的原理和使用注意事项？

```
AsyncTask是Handler的轻量级封装，用于UI线程与后台线程通信。
原理：doInBackground()在子线程执行耗时任务，onPostExecute()在UI线程更新结果。
内部使用线程池（串行或并行）。

注意：
-已废弃（内存泄漏风险），建议用Coroutine或RxJava替代；
-不可用于长任务，避免ANR。
```

3、Kotlin Coroutine在Android中的应用和优势？

```
Coroutine是轻量级线程，用于简化异步代码，如网络请求（suspend函数）。
优势：用同步风格写异步逻辑（如launch{}启动协程），不阻塞线程，支持取消和异常处理。
示例：在ViewModel中使用viewModelScope.launch{}处理API调用。
相比线程，Coroutine更高效，减少回调地狱。
```

4、协程与传统线程的区别？

```
线程是系统级资源，开销大（栈空间1MB）；
协程是用户级，轻量（开销小，可成千上万）。
协程基于线程运行，支持挂起/恢复，不阻塞线程。
Android中，协程常用于并发，但需注意线程安全（如使用Mutex互斥锁）。
```

### 3.2 Android消息机制：handler,looper,messagequeue

面试知识点

```
这是核心原理题，考察线程通信。
招聘中常问内存泄漏和ANR相关，互联网分享强调源码分析
```

1、Handler/Looper/MessageQueue 三者关系？

```
MessageQueue：消息队列，存储 Message，内部用单链表维护。
Looper：循环器，负责不断从 MessageQueue 取出消息，分发给对应 Handler。
Handler：消息分发器，负责发送消息（sendMessage）和处理消息（handleMessage）。
```

2、子线程中能否直接使用 Handler？(子线程 Handler)

```
默认没有 Looper，需要调用 Looper.prepare() 和 Looper.loop() 才能使用 Handler。
```

3、MessageQueue 是阻塞还是轮询？(MessageQueue 机制)

```
采用 epoll/阻塞机制（当没有消息时休眠，有新消息唤醒）。
```

4、Handler的运行机制是什么？

```
Handler用于线程间通信，发送Message到MessageQueue。
Looper轮询MessageQueue，取出Message分发回Handler的handleMessage()处理。
主线程默认有Looper，非主线程需手动Looper.prepare()和loop()。
```

5、Looper和MessageQueue的作用及关系？

```
MessageQueue是单链表存储Message；
Looper从Queue中轮询Message（loop()方法无限循环），并dispatch给Handler。

关系：
Handler持有Queue引用，Looper管理Queue。
主线程Looper由ActivityThread初始化，避免阻塞UI。
```

6、为什么主线程Looper.loop()不会导致ANR？

```
Looper.loop()在主线程运行，但MessageQueue为空时会阻塞（nativePollOnce()），等待新Message。
系统事件（如触摸）通过InputManagerService插入Message，唤醒Looper处理。
ANR发生在Message处理超时（如5s），而非loop本身
```

7、Handler内存泄漏原因及解决？

```
1、原因：
Handler持有Activity引用，非静态Handler导致Activity无法GC。

2、解决：
用静态内部类+WeakReference持有Activity；
或在onDestroy()移除消息（removeCallbacksAndMessages(null)）。
```

8、Message的复用机制？

```
1、复用机制
Message通过obtain()从池中获取，避免频繁new。
发送后入Queue，处理完回收到池（recycle()）。

2、好处：减少GC，提高性能
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
事件分发流程：Activity → Window → DecorView → ViewGroup(父容器) → 子 View。

dispatchTouchEvent：分发事件。
onInterceptTouchEvent：父容器是否拦截事件。
onTouchEvent：View 自身是否消费事件。


事件从Activity.dispatchTouchEvent()开始，
下传到ViewGroup（可onInterceptTouchEvent()拦截），
再到View.onTouchEvent()。

消费后停止；未消费向上回传。
顺序：onTouchListener > onTouchEvent > onClickListener。
```

3、如何解决View事件冲突？

```
外部拦截：父View onInterceptTouchEvent()动态拦截（如滑动冲突）。
内部拦截：子View requestDisallowInterceptTouchEvent(true)请求父不拦截。
示例：ViewPager与ListView冲突，用外部拦截。
```

4、MotionEvent是什么？事件类型？

```
MotionEvent封装触摸事件，如ACTION_DOWN/UP/MOVE。getX()/getY()获取坐标。
用于多点触控（getPointerCount()）
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
测量（onMeasure）：计算View大小，根据MeasureSpec（父View约束+自身LayoutParams）。
布局（onLayout）：确定位置，ViewGroup遍历子View调用child.layout()。
绘制（onDraw）：Canvas渲染内容。

流程从DecorView开始，自顶向下
```

2、View的绘制流程详解？

```
从requestLayout()或invalidate()触发。
measure：递归计算大小；
layout：设置位置（setFrame()）；
draw：背景、内容、子View、滚动条。

自定义View需重写onDraw()
```

3、UI渲染流程和优化点？

```
从Activity的setContentView()加载DecorView，PhoneWindow管理Window。
渲染：VSync信号触发，Choreographer调度measure/layout/draw。
优化：减少布局嵌套（用ConstraintLayout）、避免OverDraw（移除不必要背景）、使用硬件加速
```

4、UI卡顿的原因及解决？

```
1、原因：
主线程耗时操作（如网络IO）、过度绘制、复杂布局。

2、解决：
异步任务用Coroutine；
Trace工具分析；
简化View树，合并布局
```

5、优化点

```
避免频繁 requestLayout。
使用 Canvas.save/restore 控制绘制范围。
开启硬件加速（如 setLayerType）。
避免在 onDraw 中执行耗时操作。
```

6、requestLayout 和 invalidate 的区别？

```
requestLayout：触发布局流程（measure/layout/draw）。
invalidate：仅触发重绘（draw）
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
1、Bundle(主流)：
通过Intent传递数据。仅适用于少量、简单的数据传递，且只能用于Activity、Service等组件间的通信。

2、文件共享：
通过读写同一份文件进行通信。简单但不高效，可能存在并发问题。

3、ContentProvider：
用于不同应用间的数据共享。底层是Binder机制，是Android推荐的跨应用数据共享方式。

4、Messenger：基于Handler和Message实现，通过队列进行通信，一次只能发送一个Message，是串行通信。

5、AIDL（Android Interface Definition Language）：
Android接口定义语言，用于定义Service和客户端的接口。它可以处理复杂的数据类型，实现多线程并发通信。

6、Socket：网络套接字，可以实现不同设备或同一设备不同进程间的通信。

7、Broadcast（跨进程广播）
```

3、Binder机制原理？

```
Binder是C/S架构，基于驱动实现跨进程。
流程：Client通过Proxy调用Server的Stub，内核映射内存。
优势：高效、安全（权限检查）。
AIDL生成Stub/Proxy。
```

4、AIDL的使用和作用？

```
AIDL定义接口，实现IPC。
步骤：创建.aidl文件，编译生成Java类；Server实现Stub，Client用asInterface()绑定。
作用：跨进程方法调用，如Service通信。
```

### 3.6 ndk/jni技术

1、NDK/JNI是什么？

```
1、DK（Native Development Kit）：
是一套工具集，允许开发者使用C/C++语言编写部分代码，并将其打包成.so动态库。

2、JNI（Java Native Interface）：
是Java语言调用本地C/C++代码的接口。
它定义了一套规范，让Java代码能够调用C/C++函数，反之亦然。
```

2、JNI是什么？如何使用NDK？

```
JNI是Java调用C/C++的接口。
NDK是工具集，编译本地代码。

步骤：声明native方法，javah生成头文件，实现C函数，System.loadLibrary()加载so。

应用：性能优化（如音视频）、硬件访问。
```

3、应用场景

```
高性能计算、音视频处理（FFmpeg）、调用第三方 C/C++ 库。
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
Room 是 SQLite 的抽象层，简化数据库操作，支持编译期 SQL 校验，避免手写 SQL 出错。

2、核心组件：
-Entity → 定义表结构
-DAO → 定义 CRUD 操作
-Database → 数据库持有者

3、原理：
-基于 编译时注解处理器 生成底层 SQL 实现类，保证类型安全；
-支持 Coroutines/Flow、LiveData 做异步数据流。
```

2、Room 的工作原理

```
1、抽象层：
封装 SQLite API，开发者只需定义接口。

2、注解处理器：
编译期生成 DAO 实现类与 SQL 语句。

3、线程管理：
禁止主线程访问数据库，避免 ANR（可选 allowMainThreadQueries，但生产不推荐）。

4、响应式更新：
结合 LiveData/Flow，在数据更新时自动通知 UI。
```

3、Room 如何处理迁移与线程安全？

```
1、迁移：
通过 Migration 类定义 schema 变化。
开发期可用 fallbackToDestructiveMigration，但生产环境需避免丢数据。

1、线程安全：
通过事务（@Transaction）和注解查询保证一致性；异步执行避免阻塞。
```

4、Lifecycle 如何感知组件生命周期？

```
通过在 Activity/Fragment 注入 ReportFragment 或 LifecycleRegistry，拦截生命周期回调。

回调再分发给 LifecycleObserver，实现观察者模式，组件与生命周期解耦，避免内存泄漏。
```

5、Lifecycle 的原理及与 ViewModel 的结合

```
1、状态机模型：
生命周期事件（ON_CREATE → ON_DESTROY）由 LifecycleOwner 驱动。

2、原理：
事件分发机制 → 生命周期回调 → 分发给观察者。

3、与 ViewModel 结合：
-ViewModel 持有 UI 数据，不随配置变化（如旋转）销毁。
-Lifecycle 确保在合适状态才触发数据加载，防止内存泄漏。
```

6、Lifecycle 的实现机制

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
