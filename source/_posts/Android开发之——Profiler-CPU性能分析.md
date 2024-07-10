---
title: Android开发之——Profiler-CPU性能分析
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 8f3990cd
date: 2021-08-12 22:02:12
---
## 一 Profiler-CPU能做什么

* 优化应用的 CPU 使用率能带来诸多好处，如提供更快、更顺畅的用户体验，以及延长设备电池续航时间
* 可以使用 CPU 性能剖析器在与应用交互时实时检查应用的 CPU 使用率和线程活动，也可以检查记录的方法跟踪数据、函数跟踪数据和系统跟踪数据的详情

<!--more-->

## 二 CPU 性能剖析器概览

### 2.1 如何打开CPU性能剖析器

* 依次选择 **View > Tool Windows > Profiler** 或点击工具栏中的 Profile图标 ![img][00]
  ![][1]
* 点击 CPU 时间轴上的任意位置以打开 CPU 性能剖析器
  ![][2]

### 2.2  CPU 性能剖析器说明

#### CPU剖析图

![][3]

#### 剖析图说明

1. **事件时间轴**：显示应用中的 Activity 在其生命周期内不断转换经历各种不同状态的过程，并指示用户与设备的交互，包括屏幕旋转事件
2. **CPU 时间轴**：显示应用的实时 CPU 使用率（以占总可用 CPU 时间的百分比表示）以及应用当前使用的线程总数
3. **线程活动时间轴**：列出属于应用进程的每个线程，并使用下面列出的颜色在时间轴上指示它们的活动
   - **绿色**：表示线程处于活动状态或准备使用 CPU。也就是说，线程处于正在运行或可运行状态
   - **黄色**：表示线程处于活动状态，但它正在等待一项 I/O 操作（如磁盘或网络 I/O），然后才能完成它的工作
   - **灰色**：表示线程正在休眠且没有消耗任何 CPU 时间。 当线程需要访问尚不可用的资源时，就会出现这种情况

## 三 CPU捕获信息说明

### 3.1 捕获信息
![][4]

### 3.2 捕获说明

* **对 Java 方法采样**：在应用的 Java 代码执行期间，频繁捕获应用的调用堆栈。分析器会比较捕获的数据集，以推导与应用的 Java 代码执行有关的时间和资源使用信息
* **跟踪 Java 方法**：在运行时检测应用，从而在每个方法调用开始和结束时记录一个时间戳。系统会收集并比较这些时间戳，以生成方法跟踪数据，包括时间信息和 CPU 使用率
* **对 C/C++ 函数采样**：捕获应用的原生线程的采样跟踪数据
* **跟踪系统调用**：捕获非常翔实的细节，以便您检查应用与系统资源的交互情况

## 四 记录跟踪数据

### 4.1 记录跟踪数据(跟踪java方法为例)

* 选择记录跟踪数据类型，点击Record按钮开始记录

  ![][5]
* 记录采样一段时间后，点击Stop，停止记录跟踪
  ![][6]
* 停止后，进行结果数据分析
  ![][7]

### 4.2 记录跟踪结果

#### 记录跟踪结果图

![][8]

#### 说明

1. **选定范围**：确定需在跟踪数据窗格中检查所记录时间的哪一部分
2. **“Interaction”部分**：沿着时间轴显示用户互动和应用生命周期事件
3. **“Threads”部分**：沿时间轴针对每一个线程显示线程状态活动（例如运行、休眠等）和**调用图表**
4. **“Analysis”窗格**：显示您选择的时间范围和线程/方法调用的跟踪数据
5. **“Analysis”窗格标签页**：选择如何显示跟踪数据详细信息
6. **"Time reference"菜单**：选择以下选项之一，以确定如何测量每次调用的时间信息(**Wall clock time**和**Thread time**)
7. **Filter**：按函数、方法、类或软件包名称过滤跟踪数据

## 五 导入导出数据

### 5.1 导出数据

* 在Sessions列表中，点击会话条目右侧的 **Export method trace** 或 **Export system trace** 按钮

  ![][9]
* 浏览到需保存文件的目标位置，指定文件名，然后点击 OK
  ![][10]


### 5.2 导入数据

* **Sessions** 窗格中点击 **Start new profiler session** 图标 ![img][01]，然后选择 **Load from file**

  ![][11]
* Load from file后的效果如图
  ![][12]

## 六 检查跟踪数据

### 6.1 **Analysis** 窗格

**Analysis** 窗格中查看 **Flame Chart**、**Top Down**、**Bottom Up** 和 **Events** 标签页

![][13]

各个内容说明：

* **Flame Chart** 标签页提供一个倒置的调用图表，用来汇总完全相同的调用堆栈
* **Top Down** 标签显示一个调用列表，在该列表中展开方法或函数节点会显示它的被调用方
* **Top Down** 标签提供以下信息来帮助说明在每个调用上所花的 CPU 时间
* **Events**表格列出了当前所选线程中的所有调用

### 6.2 CPU 核心-CPU cores

除了 CPU 调度数据外，系统轨迹还包括按核心记录的 CPU 频率。它可以显示每个核心上的活动数量

![][14]

### 6.3 帧渲染时间轴(Display)

您可以检查应用在主线程和 `RenderThread` 上渲染每个帧所用的时间，以调查造成界面卡顿和帧速率低的瓶颈

记录轨迹后，在 **Display** 部分的 **Frames** 时间轴下查找有关每个帧的信息，如图所示(每个用时超过 16 毫秒的帧都以红色显示)

![][15]

Display”部分的详细视图
![][16]

Display 部分中显示的跟踪记录如下

* **Frames**：在绘制帧时。长帧（大于 16 毫秒）显示为红色
* **SurfaceFlinger**：在 [SurfaceFlinger](https://source.android.google.cn/devices/graphics/surfaceflinger-windowmanager?hl=zh_cn#surfaceflinger) 处理帧缓冲区时。SurfaceFlinger 是负责发送要显示的缓冲区的系统进程
* **VSYNC**：同步显示流水线的[信号](https://source.android.google.cn/devices/graphics/implement-vsync?hl=zh_cn)。错过 VSYNC 的帧将产生额外的输入延迟。这在高刷新率显示器上尤为重要
* **BufferQueue**：有多少帧缓冲区排队等待 SurfaceFlinger 使用

### 6.4 进程内存 (RSS)
对于部署到搭载 Android 9 或更高版本的设备的应用，Process Memory (RSS) 部分会显示该应用当前使用的物理内存量
![][17]

RSS各部分说明：

* **Total**：这是您的进程当前使用的物理内存总量
* **Allocated**：此计数器跟踪进程的正常内存分配目前占用了多少物理内存
* **File Mappings**：此计数器会跟踪进程用于文件映射的物理内存量，也就是说，通过内存管理器从文件映射至内存区域的内存
* **Shared**：此计数器跟踪在此进程和系统中其他进程之间共享的内存所用的物理内存量

## 七 参考

* [使用 CPU 性能剖析器检查 CPU 活动](https://developer.android.google.cn/studio/profile/cpu-profiler?hl=zh_cn)



[00]:https://developer.android.google.cn/studio/images/buttons/toolbar-android-profiler_dark.png?hl=zh_cn
[01]:https://developer.android.google.cn/studio/images/buttons/ic_plus.png?hl=zh_cn
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-run-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-open.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-explain.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-record-type.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-java-record.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-java-stop.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-analysis.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-sample-java-methods.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-export.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-export-position.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-import.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-cpu-import-view.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-analysis-dialog.gif
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-system-trace-cpu-cores.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-system-trace-render-thread.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-system-trace-buffer-queue.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-system-trace-process-memory.png