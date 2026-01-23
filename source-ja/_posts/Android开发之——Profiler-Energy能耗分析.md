---
title: Android开发之——Profiler-Energy能耗分析
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 3bdb4134
date: 2021-08-15 19:11:18
---
## 一 Profiler-Energy能做什么

* 能好性能剖析器可以帮助你了解应用在哪里用了不必要的电量
* 能耗性能剖析器会监控 CPU、网络无线装置和 GPS 传感器的使用情况，并直观地显示其中每个组件消耗的电量。能耗性能剖析器还会显示可能会影响耗电量的系统事件（唤醒锁定、闹钟、作业和位置信息请求）的发生次数。
* 能耗性能剖析器并不会直接测量耗电量，而是使用一种模型来估算设备上每项资源的耗电量

<!--more-->

## 二 Profiler-Energy概述

### 2.1 如何打开Profiler-Energy

* 依次选择 **View > Tool Windows > Profiler** 或点击工具栏中的 **Profile** 图标
  ![][1]

* 点击 Energy 时间轴中的任意位置以打开能耗性能剖析器
  ![][2]

### 2.2 图示说明

#### 采样结束后的效果图
![][3]

#### 采样标识说明

1. **“Event”时间轴**：显示应用中的 Activity 在其生命周期内不断转换而经历各种不同状态的过程
2. **“Energy”时间轴**：显示应用的估算耗电量。(纵坐标高度)
3. **“System”时间轴**：显示可能会影响耗电量的系统事件

## 三 检查系统事件：唤醒锁定、作业和闹钟

### 3.1 唤醒锁定、作业和闹钟

* **唤醒锁定**：也叫屏幕常亮，是一种机制，可在设备进入休眠模式时使 CPU 或屏幕保持开启状态。例如，播放视频的应用可以使用唤醒锁定，以便在用户未与设备交互时使屏幕保持开启状态
* **闹钟**：后台任务，多长时间后促发某段代码执行
* **作业Job**：在指定条件下（例如恢复网络连接时）执行相关操作。您可以使用 `JobBuilder` 创建作业，并使用 `JobScheduler` 对这些作业进行调度

### 3.2 如何根据能耗刨析器锁定代码位置

![][4]

图示说明：

1. 如需打开 **System Event** 窗格并显示唤醒锁定等事件的详细信息，请在 **Energy** 时间轴中选择一个时间范围
2. 如需打开 **Wake Lock Details** 窗格并显示特定唤醒锁定的详细信息，请在 **System Event** 窗格中选择该唤醒锁定
3. 如需打开代码编辑器并跳转到唤醒锁定的源代码，请在 **Wake Lock Details** 窗格中双击调用堆栈顶部的调用方法条目
4. 用于获取唤醒锁定的调用会在源代码编辑器中突出显示

## 四 参考

* [使用能耗性能剖析器检查耗电量](https://developer.android.google.cn/studio/profile/energy-profiler)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-energy-all.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-energy-clickin.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-energy-sample-point.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-energy-position.png