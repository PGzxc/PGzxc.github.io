---
title: Android面试题——高级开发面试题一
categories:
  - 面试相关
  - Android面试
tags:
  - Android面试
abbrlink: 779441fe
date: 2022-11-30 21:53:01
---
## 一 面试题概述

1. 请简单的分析一下Android系统启动流程的原理？
2. App启动状态有哪几种，各自的启动流程是怎么样的？
3. 当项目中遇到黑白屏问题，你有什么好的解决方案？
4. 如何查看方法内的耗时时间与方法分析？
5. 介绍一下AMS加载Applicaton流程？
6. 启动过程中有那几个问题需要处理？
7. WMS管理UI的流程对启动优化的意义什么？

<!--more-->

## 二 面试题解答

### 2.1 请简单的分析一下Android系统启动流程的原理？

过程简化分析：

* **BootLoader**：接通电源后，Boot ROM加载BootLoader到RAM
* **Linux kernel**：Linux内核负责初始化各种软硬件环境，加载驱动程序，挂载根文件系统等
* **init进程**：在init进程中，挂载虚拟文件系统、启动property服务、当然更重要的是包括了启动的各种系统服务：serviceManager、adbd、mediasever、zygote、bootanmation等。
* **zygote进程**：zygote进程是Android系统最重要的进程之一。后续Android中的应用进程都是由zygote进程fork出来的。因此，zygote是Android系统所有应用进程的父进程
* **systemServer进程**：SystemServer进程，被称为系统服务进程，属于Android framework层的源码实现，通过android studio打开SystemServer.java，能够看到其中声明了大量的android的系统服务
* **launcher的启动**：就是laucher程序的启动的入口函数
* **BootAnimation退出**：Launcher启动完成之后，开机动画会进行出，这样给用户的体验就是开机后，就直接进入到桌面了

启动架构图：
![][1]

### 2.2 App启动状态有哪几种，各自的启动流程是怎么样的？

#### APP启动状态

* 冷启动：App进程创建
* 热启动：Activity已创建，从后台到前台
* 温启动：App进程存在，但Activity结束

#### 各自启动流程

**冷启动**

系统不存在App进程（APP首次启动或APP被完全杀死）时启动APP，此时，APP的启动将经历两个阶段：

第一阶段：

* 加载并启动app;
* app启动后，第一时间为app显示一个空白的window；
* 创建app进程

第二阶段：

* 系统一旦创建了app进程，app进程就要负责做以下的任务：

创建app对象

* 启动主进程ActivityThread；
* 创建MainActivity；
* 渲染视图；
* 执行onLayout；
* 执行onDraw
* 完成第一次绘制后，把mainActivity替换已经展示的BackgroundWindow，即空白window。

**热启动**

* 当我们按了Home键或其它情况app被切换到后台，再次启动app的过程。
* 热启动时，系统将activity带回前台。如果应用程序的所有activity存在内存中，则应用程序可以避免重复对象初始化、渲染、绘制操作
* 如果由于内存不足导致对象被回收，则需要在热启动时重建对象，此时与冷启动时将界面显示到手机屏幕上一样。

**温启动**

温启动包含了冷启动的一些操作，由于app进程依然在，温启动只执行冷启动的第二阶段，这代表着它比热启动有更多的开销。

温启动有很多场景，例如：

* 用户按连续按返回退出了app，然后重新启动app；
* 由于系统收回了app的内存，然后重新启动app。

### 2.3 当项目中遇到黑白屏问题，你有什么好的解决方案？

#### 为什么会有黑白屏

在桌面点击应用图标后，在app进程没有创建的情况下，需要时间创建app进程，初始化资源，以及启动首页Activity的（这里讨论的首页是指AndroidManifest里面标志的启动页），这就意味点击图标不能马上看到启动页。为了不让用户有卡顿的感觉，谷歌有了Preview Window，在启动页没有绘制完成时，会先初始化一个Window，我们通常看到的黑屏或白屏，就是这个预览窗口。

#### 怎么知道是黑屏还是白屏？

查看这个AppTheme,找到`name="android:windowBackground"`这个属性，查看属性下的内容，就能知道是黑屏还是白屏，这个属性就是设置预览窗口的背景。

#### 如何解决黑白屏

1. theme下面的`android:windowIsTranslucent`属性
2. 启动activity的theme设置启动图片

### 2.4 如何查看方法内的耗时时间与方法分析？

借助于Android自带的分析工具：

* Traceview
* systrace

### 2.5 介绍一下AMS加载Applicaton流程？

AMS: ActivityManagerService

AMS是Android中最核心的服务，主要负责系统中四大组件的启动、切换、调度及应用进程的管理和调度等工作，其职责与操作系统中的进程管理和调度模块相类似，因此它在Android中非常重要。

ActivityManagerService启动

* 创建AMS对象
* 调用ams.setSystemProcess
* 调用ams.installSystemProviders
* 调用ams.systemReady

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




[1]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-android/android-interview-system-start-process.png
[2]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-android/android-interview-start-progress.png
[3]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-android/android-interview-asm-ui.png

