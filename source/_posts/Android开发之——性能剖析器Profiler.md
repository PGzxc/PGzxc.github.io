---
title: Android开发之——性能剖析器Profiler
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: ae4435ad
date: 2021-08-12 21:54:55
---
## 一 Profiler是什么

* Android Studio 3.0 及更高版本中的 Android Profiler 取代了 Android Monitor 工具
* Android Profiler 工具可提供实时数据，帮助您了解应用的 CPU、内存、网络和电池资源使用情况

<!--more-->

## 二 如何打开Android Profiler

### 2.1 使用Android Studio开发工具时

#### 依次选择： View > Tool Windows > Profiler

![][1]

#### 点击工具栏中的Profile 图标 ![img][0]

![][2]

### 2.2 不打开Android studio，单独运行性能分析器

* 确保性能分析器当前未在 Android Studio 中运行

* 转到安装目录，然后转到 `bin` 目录

  ```
  Windows/Linux：<studio-installation-folder>/bin
  
  macOS：<studio-installation-folder>/Contents/bin
  ```

* 以Mac为例打开profiler的目录
  ![][3]
* 运行profiler.sh后，打开性能分析器窗口
  ![][4]

## 三 将app运行后使用Profiler分析

### 3.1 工具栏中的Profile 图标 ![img][0]
运行到设备后，点击Profiler，显示性能分析

![][5]

### 3.2 选择调试设备和应用

* 点击底部的Profiler，打开Profiler窗口
  ![][6]
* 在打开的Profiler窗口中，点击Sessions右侧的“+”，依次选择设备和应用
  ![][7]
* 应用运行到设备后，显示信息
  ![][8]

## 四 Profiler窗口信息说明

### 4.1 窗口

![][9]

### 4.2 窗口说明

1. Android Profiler 显示当前正在分析的进程和设备
2. 在 **Sessions** 窗格中，选择要查看的会话，或启动一个新的分析会话
3. 使用缩放按钮控制要查看的时间轴范围，或使用 **Attach to live** 按钮跳转到实时更新
4. 事件时间轴显示与用户输入相关的事件，包括键盘活动、音量控制变化和屏幕旋转
5. 共享时间轴视图，包括 CPU、内存、网络和耗电量图表

## 五 Sessions会话

### 5.1 开始会话

* 如需启动一个新的会话，请点击 **Start a new profiling session** ![img][01] 按钮，然后从出现的下拉菜单中选择一个应用进程

* 当前活跃会话使用绿色圆点标注

  ![][10]

### 5.2 结束/停止会话

* 在当前活跃的Session上右键，选择`End Session`或者点击“+”号右侧的Stop按钮

  ![][11]




[0]:https://developer.android.google.cn/studio/images/buttons/toolbar-android-profiler.png?hl=zh_cn
[01]:https://developer.android.google.cn/studio/images/buttons/ic_plus.png?hl=zh_cn
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-as-view-open.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-as-profilericon-open.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-as-contents-profilersh.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-as-profilericon-open.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-tools-run.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-bottom-profiler.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-device-app-select.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-bottom-run.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-callouts.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-session-active.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-session-stop.png

