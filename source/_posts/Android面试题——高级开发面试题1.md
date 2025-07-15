---
title: Android面试题——高级开发面试题1
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 779441fe
date: 2022-11-30 21:53:01
---
## 一 面试题概述

1. 请简单的分析一下Android系统启动流程的原理？
2. App启动状态有哪几种，各自的启动流程是怎么样的？
3. 当项目中遇到黑白屏问题，你有什么好的解决方案？
4. 如何查看方法内的耗时时间与方法分析？
5. 介绍一下AMS加载Applicaton流程？<!--more-->
6. 启动过程中有那几个问题需要处理？
7. WMS管理UI的流程对启动优化的意义什么？

## 二 面试题解答

### 2.1 请简单的分析一下Android系统启动流程的原理？

1-过程简化分析：

```
1、BootLoader：接通电源后，Boot ROM加载BootLoader到RAM

2、Linux kernel：Linux内核负责初始化各种软硬件环境，加载驱动程序，挂载根文件系统等

3、init进程：在init进程中，挂载虚拟文件系统、启动property服务、当然更重要的是包括了启动的各种系统服务：
serviceManager、adbd、mediasever、zygote、bootanmation等。

4、zygote进程：zygote进程是Android系统最重要的进程之一。
后续Android中的应用进程都是由zygote进程fork出来的。
因此，zygote是Android系统所有应用进程的父进程

5、systemServer进程：SystemServer进程，被称为系统服务进程，属于Android framework层的源码实现，
通过android studio打开SystemServer.java，能够看到其中声明了大量的android的系统服务

6、launcher的启动：就是laucher程序的启动的入口函数

7、BootAnimation退出：Launcher启动完成之后，开机动画会进行出，
这样给用户的体验就是开机后，就直接进入到桌面了
```

2-启动架构图：
![][1]

### 2.2 App启动状态有哪几种，各自的启动流程是怎么样的？

#### 2.2.1 APP启动状态

```
1、冷启动：App进程创建
2、热启动：Activity已创建，从后台到前台
3、温启动：App进程存在，但Activity结束
```

#### 2.2.2 各自启动流程

**1-冷启动**

```
系统不存在App进程（APP首次启动或APP被完全杀死）时启动APP，此时，APP的启动将经历两个阶段：

一、第一阶段：

* 加载并启动app;
* app启动后，第一时间为app显示一个空白的window；
* 创建app进程

二、第二阶段：

* 系统一旦创建了app进程，app进程就要负责做以下的任务：

创建app对象

* 启动主进程ActivityThread；
* 创建MainActivity；
* 渲染视图；
* 执行onLayout；
* 执行onDraw
* 完成第一次绘制后，把mainActivity替换已经展示的BackgroundWindow，即空白window。
```

**2-热启动**

```
* 当我们按了Home键或其它情况app被切换到后台，再次启动app的过程。
* 热启动时，系统将activity带回前台。如果应用程序的所有activity存在内存中，则应用程序可以避免重复对象初始化、渲染、绘制操作
* 如果由于内存不足导致对象被回收，则需要在热启动时重建对象，此时与冷启动时将界面显示到手机屏幕上一样。
```

**3-温启动**

```
温启动包含了冷启动的一些操作，由于app进程依然在，温启动只执行冷启动的第二阶段，这代表着它比热启动有更多的开销。

温启动有很多场景，例如：

* 用户按连续按返回退出了app，然后重新启动app；
* 由于系统收回了app的内存，然后重新启动app。
```

### 2.3 当项目中遇到黑白屏问题，你有什么好的解决方案？

#### 2.3.1 为什么会有黑白屏

```
在桌面点击应用图标后，在app进程没有创建的情况下，需要时间创建app进程，初始化资源，
以及启动首页Activity的（这里讨论的首页是指AndroidManifest里面标志的启动页），
这就意味点击图标不能马上看到启动页。

为了不让用户有卡顿的感觉，谷歌有了Preview Window，在启动页没有绘制完成时，
会先初始化一个Window，我们通常看到的黑屏或白屏，就是这个预览窗口。
```

#### 2.3.2 怎么知道是黑屏还是白屏？

```
查看这个AppTheme,找到`name="android:windowBackground"`这个属性，
查看属性下的内容，就能知道是黑屏还是白屏，这个属性就是设置预览窗口的背景。
```

#### 2.3.3 如何解决黑白屏

```
1. theme下面的`android:windowIsTranslucent`属性
2. 启动activity的theme设置启动图片
```

### 2.4 如何查看方法内的耗时时间与方法分析？

借助于Android自带的分析工具：

#### 1-Traceview

```
Android Traceview是Android开发中的性能分析工具，
它可以用来分析Android应用程序的性能，特别是在CPU和内存方面。
Traceview提供了一个可视化的界面，可以查看应用程序在运行过程中各个方法的调用情况、执行时间、CPU占用率等信息。

使用Traceview进行性能分析通常包括以下步骤：

1-收集跟踪数据：通过在应用程序中插入跟踪代码或者使用命令行工具，收集应用程序的运行数据。
2-导出跟踪数据：将收集到的跟踪数据导出到Traceview格式文件。
3-打开Traceview：使用Android Studio或者其他兼容的工具打开Traceview文件。
4-分析跟踪数据：在Traceview中，你可以查看方法调用树、方法执行时间、CPU占用率等信息，来了解应用程序的性能瓶颈。
5-优化性能：根据分析结果，进行相应的性能优化，比如减少方法调用次数、优化算法、减少内存占用等。

Traceview是Android开发中非常有用的工具，可以帮助开发者找出应用程序的性能问题，
并进行相应的优化，提高应用程序的性能和用户体验
```

#### 2-systrace

```
Systrace是Android开发中用于系统级性能分析的工具，
它能够提供更全面的性能数据，包括CPU、内存、GPU、电源等方面的信息。
Systrace通过在设备上运行并收集数据，然后将数据可视化呈现，帮助开发者分析应用程序和系统之间的交互和性能问题。

使用Systrace进行性能分析通常包括以下步骤：

1-准备环境：确保你的开发环境已经设置好，包括连接到要分析的Android设备或模拟器，并且已经安装了必要的开发工具。
2-收集跟踪数据：运行Systrace工具，收集设备上的性能数据。
你可以通过命令行工具或者Android Studio中的"Android Profiler"工具来启动Systrace。
3-导出跟踪数据：将收集到的性能数据导出到Systrace格式文件。
4-打开Systrace：使用Chrome浏览器打开Systrace文件。
5-分析跟踪数据：在Systrace中，你可以查看各个系统组件和进程之间的交互情况、
CPU、内存、GPU等资源的使用情况，以及应用程序的执行时间线等信息。
6-优化性能：根据分析结果，进行相应的性能优化，比如减少CPU和内存的占用、优化GPU渲染、降低功耗等。

Systrace是一种强大的性能分析工具，可以帮助开发者发现应用程序和系统的性能问题，
并进行相应的优化，提高应用程序的性能和用户体验
```

### 2.5 介绍一下AMS加载Applicaton流程？

1-AMS

```
AMS: ActivityManagerService

AMS是Android中最核心的服务，主要负责系统中四大组件的启动、切换、调度及应用进程的管理和调度等工作，
其职责与操作系统中的进程管理和调度模块相类似，因此它在Android中非常重要。
```

2-流程介绍

```
在Android系统中，AMS（ActivityManagerService） 负责管理应用的生命周期，包括Application的加载过程。
当应用进程启动时，AMS 需要通过 zygote 进程创建新的应用进程，并在合适的时机初始化 Application。
整个流程大致如下

AMS 加载 Application 的完整流程

1 启动应用进程
当用户点击某个应用，系统会调用 startActivity()，如果该应用尚未启动，AMS 会执行以下步骤：

1.1 检查是否已有应用进程
-AMS 通过 ProcessRecord 记录应用进程信息，检查应用进程是否已存在。
-如果进程不存在，则需要创建新的应用进程

1.2 创建应用进程
-AMS 调用 startProcessLocked() 通过 Process.start() 启动进程。
-Zygote 进程（孵化器进程）通过 fork() 复制自身，生成新的应用进程

1.3 应用进程启动后，进入 ActivityThread
-zygote 进程 fork 出新的应用进程后，会执行 app_main.cpp，
并调用 RuntimeInit.main()，最终进入 ActivityThread.main()。
-ActivityThread.main() 会启动应用的主线程 Looper，并等待 AMS 发送 attachApplication() 指令。


2 进程启动后，AMS 通知应用 Attach

2.1 AMS 通过 attachApplication() 连接进程
进程启动后，AMS 会通过 ApplicationThread（应用进程端的 Binder）回调 attachApplication()，
告诉 ActivityThread 进程已经准备好。

2.2 ActivityThread 处理 attachApplication()
-ActivityThread.handleBindApplication() 负责初始化 Application，并加载 Application 类。

-handleBindApplication() 解析 AndroidManifest.xml，
找到 Application 的 name 属性，并通过 类加载器反射创建 Application。

3. Application 初始化
3.1 创建 Application 实例
-ActivityThread 通过 Instrumentation.newApplication() 反射创建 Application 实例。

3.2 调用 Application.attach()
Application.attach() 连接系统，提供 Context，设置 LoadedApk，并绑定 AMS。

3.3 调用 Application.onCreate()
-Instrumentation.callApplicationOnCreate() 调用 Application.onCreate()，
用户可以在 onCreate() 中做全局初始化，如 SDK 初始化、数据库初始化 等

总结流程
-用户点击应用，AMS 发现应用未启动，调用 startProcessLocked() 启动进程。
-zygote 进程 fork 出新的应用进程，执行 ActivityThread.main()，进入 Looper 循环。
-AMS 通过 attachApplication() 通知 ActivityThread 进程已就绪。
-ActivityThread.handleBindApplication() 反射创建 Application 并调用 onCreate()。


总结
AMS 主要负责进程管理，当应用进程启动后，
它会通知 ActivityThread 进行 Application 的创建和初始化，并最终调用 onCreate()，完成应用的加载
```

### 2.6 启动过程中有那几个问题需要处理？
![][2]

### 2.7 WMS管理UI的流程对启动优化的意义什么？

WMS窗口管理
![][3]


## 三 参考

* [CSDN—Android系统启动流程分析][00]
* [CSDN—App三种启动场景：冷启动、热启动、温启动][01]
* [简书—启动速度与执行效率优化项目实战（二）：启动黑白屏解决][02]
* [微信公众号—让你的Android应用快速定位耗时方法][03]
* [简书—详解AMS启动流程][04]
* [简书—Android之AMS介绍][05]
* [知乎—Framework之简单上手AMS启动流程][06]
* [简书—Android App启动优化][07]
* [Android 的窗口管理系统 (View, Canvas, WindowManager)][08]
* [简书—Android WMS窗口管理][09]
* [简书—Android WMS窗口管理(二)][10]
* [简书—Android WMS（一）-窗口管理][11]



[00]:https://blog.csdn.net/hymking/article/details/121441762
[01]:https://blog.csdn.net/qq_41661800/article/details/124147862
[02]:https://www.jianshu.com/p/6cece0a59e86
[03]:https://mp.weixin.qq.com/s?__biz=MzA5MzI3NjE2MA==&mid=2650248284&idx=1&sn=13398efa3396a48192e5745df797fad3&chksm=88636533bf14ec25a3bf0beb1da2fc8c9732e8ebb300f9723c8a6962ed92186766f25cabd33a&scene=27
[04]:https://www.jianshu.com/p/d4789631748a
[05]:https://www.jianshu.com/p/b4c0afd80ca0
[06]:https://zhuanlan.zhihu.com/p/535043127
[07]:https://www.jianshu.com/p/6e972a1a27e3
[08]:http://t.zoukankan.com/feng9exe-p-5716127.html
[09]:https://www.jianshu.com/p/e00898609874
[10]:https://www.jianshu.com/p/b415c02b9976
[11]:https://www.jianshu.com/p/3b5b6f2469d8




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-system-start-process.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-start-progress.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-interview-asm-ui.png

