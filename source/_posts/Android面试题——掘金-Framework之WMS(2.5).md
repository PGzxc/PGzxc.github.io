---
title: Android面试题——掘金-Framework之WMS(2.5)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 323bf344
date: 2025-04-04 11:47:09
---
## 一 概述

```
WMS（WindowManagerService）是 Android Framework 中的核心服务，
主要负责 窗口管理、屏幕渲染、焦点控制、动画特效 等。
以下是 WMS 相关的高频面试题及解析：
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 WMS（WindowManagerService）是什么？

```
WMS 是 Android 系统的窗口管理服务，运行在 SystemServer 进程 中，主要功能：
1.窗口管理（窗口创建、销毁、层级管理）。
2.焦点管理（哪个窗口获取焦点）。
3.屏幕渲染（SurfaceFlinger 结合 WMS 进行合成）。
4.屏幕旋转（控制屏幕方向）。
5.动画特效（窗口切换动画）。
6.多窗口管理（分屏、多任务、悬浮窗）。
7.输入事件分发（处理触摸和按键事件）。
```

### 2.2 WMS 是如何启动的？

```
WMS 在 SystemServer 启动时初始化，关键流程：

1.SystemServer 进程启动
入口：com.android.server.SystemServer#main()
2.创建 WindowManagerService
SystemServiceManager.startService(WindowManagerService.class)
3.初始化 Display、Input 设备
4.注册到 AMS，等待窗口请求
5.创建默认窗口（System UI/Launcher）
```

### 2.3 Activity 启动时，WMS 如何创建窗口？

```
1.当 startActivity() 触发后，AMS 需要 WMS 创建窗口：
-AMS 调用 WMS，请求创建窗口。
-WMS 分配 Surface（SurfaceControl）。
-通知 SurfaceFlinger 进行合成。
-渲染完成后，窗口可见。

2.核心方法：
-WMS.addWindow()
-WMS.relayoutWindow()
-SurfaceFlinger.createLayer()
```

### 2.4 WMS 如何管理窗口层级？

```
1.WMS 采用 Z-Order 层级 进行管理：
1.1应用窗口（应用层）
普通 Activity（TYPE_APPLICATION）。

1.2 系统窗口（系统层）
状态栏（TYPE_STATUS_BAR）、导航栏（TYPE_NAVIGATION_BAR）。

1.3浮动窗口（悬浮层）
Toast（TYPE_TOAST）、Dialog（TYPE_APPLICATION_OVERLAY）。

2.窗口层级控制
WindowManager.LayoutParams params = new WindowManager.LayoutParams();
params.type = WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY;
```

### 2.5 WMS 如何管理焦点窗口？

```
1.WMS 通过 InputDispatcher 处理输入焦点：
-WMS 记录当前焦点窗口（mCurrentFocus）。
-应用窗口请求焦点，调用 requestFocus()。
-WMS 调用 InputDispatcher 分发输入事件。
-焦点窗口处理输入事件（触摸/按键）。

2.核心方法：
-WMS.updateFocusedWindowLocked()
-InputDispatcher.dispatchOnce()
```

### 2.6 WMS 如何处理屏幕旋转？

```
1.当用户旋转设备，系统需要调整窗口方向：
-SensorManager 监听重力感应。
-AMS 调用 WMS setRotationLocked() 计算新方向。
-WMS 调整 Surface 方向，调用 SurfaceFlinger.setOrientation()。
-通知应用 onConfigurationChanged() 适配 UI。

2.核心方法：
-WMS.setRotation()
-SurfaceFlinger.setTransform()
```

### 2.7  WMS 如何控制窗口动画？

```
1.窗口动画通过 WindowManager.LayoutParams 设定
1.1 Activity 切换动画
overridePendingTransition(R.anim.enter, R.anim.exit);
1.2 系统窗口动画
-打开窗口：ActivityOptions.makeCustomAnimation()
-关闭窗口：WMS.applyExitAnimationLocked()

2.动画由 SurfaceFlinger 处理：
-WindowAnimation.loadAnimation()
-SurfaceControl.setAlpha()
-Choreographer.scheduleFrame()
```

### 2.8 WMS 如何支持多窗口（分屏模式）？

```
WMS 通过 Task 栈 控制分屏：

1.多窗口模式:WMS.setTaskSplitScreenMode()
2.悬浮窗口（Freeform 模式）:LayoutParams.FLAG_SHOW_WHEN_LOCKED
3.手势操作:拖拽分屏 触发 WMS.resizeTask()
```

### 2.9 WMS 如何管理输入事件？

```
输入事件由 InputManagerService（IMS） 处理：

1.触摸/按键事件 → InputReader
2.传递到 InputDispatcher
3.匹配焦点窗口，转发给 WMS
4.WMS 调用 deliverInputEvent() 分发给应用
```

### 2.10 WMS 和 SurfaceFlinger 的关系？

```
1.WMS 管理窗口，SurfaceFlinger 合成屏幕：
1.1 WMS 负责窗口创建、销毁、Z-Order 管理。
1.2 SurfaceFlinger 负责最终合成：
 -接收 SurfaceControl。
 -调度 GPU 进行合成。
 -渲染到屏幕。

2.核心 API：
-SurfaceControl.setLayer()
-SurfaceFlinger.setTransaction()
```

### 2.11 总结

```
WMS 是 Android 窗口管理的核心服务，面试常考点：

1.窗口管理机制
2.Activity 启动时的窗口创建
3.窗口层级（Z-Order）
4.焦点管理
5.屏幕旋转
6.窗口动画
7.多窗口/分屏
8.输入事件处理
9.WMS 和 SurfaceFlinger 关系
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)