---
title: Android开发之——Android系统架构与系统源码目录
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 系统架构
abbrlink: 34c1b827
date: 2018-01-11 08:57:00
---
# 前言  
本文分为两部分讲解，Android系统架构与系统源码目录  

## Android系统架构
Android系统架构分为五层，从上到下依次是应用层、应用框架层、系统运行库、硬件抽象层和Linux内核层。  
![][1]  
<!--more-->  
## 各层分析 
### 应用层 
系统内置的应用程序以及非系统级的应用程序都是属于应用层。负责与用户进行直接交互，通常都是Java进行开发的。  
### 应用框架层(Java FrameWork)  
应用框架层为开发人员提供了可以开发应用程序所需要的API，我们平常开发应用程序都是调用的这一层所提供的API，当然也包括系统的应用。这一层的是由Java代码编写的，可以称为Java Framework。下面来看这一层所提供的主要组件。 
![][6] 
### 系统运行库层(Native)
系统运行库分为两部分，分别是C/C++程序库和Android运行时库。下面分别来介绍它们。 
#### C/C++程序库
C/C++程序库能被Android系统中的不同组件所使用的，并通过应用程序框架为开发者提供服务，主要的C/C++程序库如下：  
![][7]
#### Android运行时库
运行时库又分为核心库和ART(5.0系统之后，Dalvik虚拟机被ART取代)。核心库提供了java语言核心库的大多数功能，这样开发者可以使用java语言来编写Android应用。相较于jvm，dalvik虚拟机是专门为移动设备定制的，允许在有限的内存中同时运行多个虚拟机的实例，并且每一个Dalvik应用作为一个独立的Linux进程执行。独立的进程可以防止在虚拟机崩溃的时候所有程序都被关闭。而替代Dalvik虚拟机的ART的机制与Dalvik不同。在Dalvik下，应用程序每次运行的时候，字节码都需要通过即时编译器转换为机器码，这会拖慢应用程序的运行效率，而在AR环境下，应用程序在第一次安装的时候，字节码会预先编译成机器码，使其成为真正的本地应用。  

### 硬件抽象层(HAL)  
硬件抽象层是位于操作系统内核与硬件电路之间的接口层，其目的在于将硬件抽象化，为了保护硬件厂商的知识产权，它隐藏了特定平台的硬件接口细节，为操作系统提供虚拟硬件平台，使其具有硬件无关性，可在多种平台上进行移植。 从软硬件测试的角度来看，软硬件的测试工作都可分别基于硬件抽象层来完成，使得软硬件测试工作的并行进行成为可能。通俗来讲，就是将控制硬件的动作放在硬件抽象层中。
### Linux内核层  
Android 的核心系统服务基于Linux 内核，在此基础上添加了部分Android专用的驱动。系统的安全性、内存管理、进程管理、网络协议栈和驱动模型等都依赖于该内核。 
Android系统的五层架构就讲到这，了解以上的知识对以后分析系统源码有很大的帮助。  
## Android系统源码目录  
我们要先了解Android系统源码目录，为后期源码学习打下基础。关于源码的阅读，你可以访问[http://androidxref.com/][2]来阅读系统源码。当然，最好是将源码下载下来。下载源码可以使用清华大学开源软件镜像站提供的Android 镜像：[https://mirrors.tuna.tsinghua.edu.cn/help/AOSP/][3] 。如果觉得麻烦也可以查找国内的网盘进行下载，推荐使用该百度网盘地址下载：[http://pan.baidu.com/s/1ngsZs][4]，它提供了多个Android版本的的源码下载。  
## 整体结构  
各个版本的源码目录基本是类似，如果是编译后的源码目录会多增加一个out文件夹，用来存储编译产生的文件。Android7.0的根目录结构说明如下表所示。  
  
![][8] 
![][9]
![][10]

从表可以看出，系统源码分类清晰，并且内容庞大且复杂。接下来分析packages中的内容，也就是应用层部分。  
### 应用层部分 
应用层位于整个Android系统的最上层，开发者开发的应用程序以及系统内置的应用程序都是在应用层。源码根目录中的packages目录对应着系统应用层。它的目录结构如表所示。    

![][11]

从目录结构可以发现，packages目录存放着系统核心应用程序、第三方的应用程序和输入法等等，这些应用都是运行在系统应用层的，因此packages目录对应着系统的应用层。  
### 应用框架层部分  
应用框架层是系统的核心部分，一方面向上提供接口给应用层调用，另一方面向下与C/C++程序库以及硬件抽象层等进行衔接。 应用框架层的主要实现代码在/frameworks/base和/frameworks/av目录下，其中/frameworks/base目录结构如表所示。     

![][12]

### C/C++程序库部分
系统运行库层（Native)中的 C/C++程序库的类型繁多，功能强大，C/C++程序库并不完全在一个目录中，这里给出几个常用且比较重要的C/C++程序库所在的目录位置。     

![][13]

讲完 C/C++程序库部分，剩下的部分我们在表3已经给出：Android运行时库的代码放在art/目录中。硬件抽象层的代码在hardware/目录中，这一部分是手机厂商改动最大的一部分，根据手机终端所采用的硬件平台会有不同的实现。  

参考：  
[Android系统架构与系统源码目录][5]

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-system.png
[2]: http://androidxref.com/
[3]: https://mirrors.tuna.tsinghua.edu.cn/help/AOSP/ 
[4]: http://pan.baidu.com/s/1ngsZs  
[5]: http://blog.csdn.net/itachi85/article/details/54695046 

[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-activity.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-native.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-c1.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-c2.png 
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-c3.png 
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-package.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/images/master/blog-imagesm/android-framework.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-c++.png