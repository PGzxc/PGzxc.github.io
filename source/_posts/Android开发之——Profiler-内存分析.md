---
title: Android开发之——Profiler-内存分析
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: '95e02168'
date: 2021-08-13 17:44:41
---
## 一 Profiler-内存分析能做什么

* Profiler-内存分析可帮助您识别可能会导致应用卡顿、冻结甚至崩溃的内存泄漏和内存抖动
* 它显示一个应用内存使用量的实时图表，让您可以捕获堆转储、强制执行垃圾回收以及跟踪内存分配

<!--more-->

## 二 Profiler-内存分析概述

### 2.1 如何打开内存分析剖析器

* 依次选择 **View > Tool Windows > Profiler** 或点击工具栏中的 Profile图标

  ![][1]
  
* 点击 MEMORY 时间轴上的任意位置以打开内存性能分析器

  ![][2]
  
### 2.2 内存性能分析器概览
####  内存性能分析图
当您首次打开内存性能分析器时，您将看到一条表示应用内存使用量的详细时间轴，并可使用各种工具强制执行垃圾回收、捕获堆转储以及记录内存分配
![][3]

#### 内存性能分析图说明

1. 用于强制执行垃圾回收事件的按钮
2. 用于[捕获堆转储](https://developer.android.google.cn/studio/profile/memory-profiler#capture-heap-dump)的按钮
3. 用于指定性能分析器多久捕获一次内存分配的下拉菜单
4. 用于缩放时间轴的按钮
5. 用于跳转到实时内存数据的按钮
6. 事件时间轴，显示活动状态、用户输入事件和屏幕旋转事件
7. 内存使用量时间轴，它会显示以下内容
   - 一个堆叠图表，显示每个内存类别当前使用多少内存，如左侧的 y 轴以及顶部的彩色键所示
   - 一条虚线，表示分配的对象数，如右侧的 y 轴所示
   - 每个垃圾回收事件的图标

#### 内存计算方式
您在内存性能分析器顶部看到的数字
![][4]

内存计数中的类别如下

* **Java**：从 Java 或 Kotlin 代码分配的对象的内存
* **Native**：从 C 或 C++ 代码分配的对象的内存
* **Graphics**：图形缓冲区队列为向屏幕显示像素（包括 GL 表面、GL 纹理等等）所使用的内存
* **Stack**：您的应用中的原生堆栈和 Java 堆栈使用的内存。这通常与您的应用运行多少线程有关
* **Code**：您的应用用于处理代码和资源（如 dex 字节码、经过优化或编译的 dex 代码、.so 库和字体）的内存
* **Others**：您的应用使用的系统不确定如何分类的内存
* **Allocated**：您的应用分配的 Java/Kotlin 对象数。此数字没有计入 C 或 C++ 中分配的对象

## 三 内存捕获信息说明

### 3.1 内存捕获类型
![][5]

### 3.2 内存选项说明

* 捕获堆转储(Capture heap dump)：查看应用程序中在特定时间点使用内存的对象
* 记录Native分配(Record native allocations)：查看每个C/C++对象在一段时间内是如何分配的
* 记录java/kotlin分配(Record java/kotlin allocations)：查看在一段时间内如何分配每个java/kotlin对象

## 四 查看内存分配

### 4.1 捕获堆转储(Capture heap dump)方式查看内存分配

####  捕获堆转储

选择`Capture heap dump`，并点击`Record`按钮，开始捕获，捕获完成后，点击Stop，进行分析
![][6]

#### 捕获结果检查

捕获的结果

![][7]

检查分配记录步骤：

1. 点击 **Class Name** 列标题以按字母顺序排序。然后，点击一个类名称。此时下侧将出现 **Instance View** 窗格，显示该类的每个实例
2. 在 **Instance View** 窗格中，点击一个实例。此时下方将出现 **References** 标签页，显示该实例被分配到何处以及在哪个线程中。
3. 在 **References** 标签页中，右键点击任意行并选择 **Jump to Source**，以在编辑器中打开该代码

#### 菜单查看说明

![][8]

菜单-检查的堆：

* **default heap**：当系统未指定堆时
* **image heap**：系统启动映像，包含启动期间预加载的类。此处的分配确保绝不会移动或消失
* **zygote heap**：写时复制堆，其中的应用进程是从 Android 系统中派生的
* **app heap**：您的应用在其中分配内存的主堆
* **JNI heap**：显示 Java 原生接口 (JNI) 引用被分配和释放到什么位置的堆

菜单-分配：

* **Arrange by class**：根据类名称对所有分配进行分组。这是默认值
* **Arrange by package**：根据软件包名称对所有分配进行分组
* **Arrange by callstack**：将所有分配分组到其对应的调用堆栈

### 4.2 捕获Native方式查看内存分配

#### 捕获Native
![][9]

#### native结果数据
![][10]

结果信息说明：

* **Allocations**：在选定时间段内通过 `malloc()` 或 `new` 运算符分配的对象数
* **Deallocations**：在选定时间段内通过 `free()` 或 `delete` 运算符解除分配的对象数
* **Allocations Size**：在选定时间段内所有分配的总大小（以字节为单位）
* **Deallocations Size**：在选定时间段内所有已释放内存的总大小（以字节为单位）
* **Total Count**：**Allocations** 列中的值减去 **Deallocations** 列中的值所得的结果
* **Remaining Size**：**Allocations Size** 列中的值减去 **Deallocations Size** 列中的值所得的结果

### 4.3 捕获java/kotlin方式查看内存分配

#### 捕获java/kotlin
![][11]

####  Allocation Tracking下拉菜单说明

* **Full**：捕获内存中的所有对象分配。这是 Android Studio 3.2 及更低版本中的默认行为
* **Sampled**：定期对内存中的对象分配情况进行采样。
* **Off**：停止跟踪应用的内存分配

## 五 堆转储文件导入和导出

### 5.1  堆转储文件导出

在Sessions列表中，点击会话条目右侧的 **Export method trace** 或 **Export system trace** 按钮
![][12]

### 5.2  堆转储文件导入

**Sessions** 窗格中点击 **Start new profiler session** 图标"+"，然后选择 **Load from file**
![][13]

## 六 内存性能分析器中的泄漏检测

### 6.1 检查内存泄漏

捕获堆转储(Capture heap dump)检测期间操作设备，完成后点击Stop按钮，检测结束后，显示有内存泄漏及内存泄漏的数目
![][14]

### 6.2 如何查看内存泄漏的位置

* 双击内存泄漏的位置，显示内存泄漏的列表
  ![][15]
* 点击列表中其中一个，显示实例对象
  ![][16]
* 点击实例对象，显示详细信息
  ![][17]
* 切换到References选项卡，并点击`show nearest GC root only`
  ![][18]
* 右键选择`jump to source`
  ![][19]
* 跳转到源码，可以看到是thread引起的内存泄漏
  ![][20]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-all-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-click-open.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-profiler-callouts.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-profiler-number.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-record-type.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-trace.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-heap-dump.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-trace-menu.gif
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-native-trace.gif
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-native-allocate.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-java-trace.gif
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-export.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-import.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-leak.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-leak-list.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-leak-instance.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-leak-details.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-leak-reference.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-leak-jumpsource.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-memory-leak-jumpsource-info.png