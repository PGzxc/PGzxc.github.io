---
title: Android开发之——Advanced profiling is unavable for the selected process
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Profiler
abbrlink: 10f4129f
date: 2018-03-17 09:59:28
---

# 前言 
Android Studio从3.0版本新增了许多功能，例如：Android Profiler (其中包含了： CPU Profiler、Memory Profiler、Network Profiler )，使用之前，先检查Profiler的配置是否正确，否则你可能无法使用此功能。 

接下来，我们将讲解如何配置Profiler  

<!--more-->

# 问题 
本文主要分以下两个问题进行讲解，如果开发中按此配置仍无法解决，欢迎留言

- Device not support 
- Advanced profiling is unavable for the selected process

## Device not support 
### 硬件支持
Android Profiler要求设备的版本必须大于android 5.0(Api 21)，否则无法使用此功能。
### 问题描述
如下图，当设备版本低于API21时，会出现如图现象
![][1] 
### 解决办法
使用大于android 5.0(API21)的设备


## Advanced profiling is unavable for the selected process

### 问题描述 
当问题一解决后，你可能遇到这样的问题“Advanced profiling is unavable for the selected process”   

![][2]  

### 解决办法 
当出现上图问题时，我们可从以下几方面解决  

- Enable advanced profiling
- 配置编译版本和目标版本  
#### Enable advanced profiling
依次打开 Run->Edit Configurations->Android app->app->profling 勾选如下图复选框
![][3]  
#### 配置编译版本和目标版本 
按照如下图，将编译版本和目标版本改为API26以下(包含API26)
![][4]
![][5] 
#### 同步项目 
![][6]  
### 结果 
![][7]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-profiler-devices.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-profiler-advnced-profiling.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-profiler-profiling-enable.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-profiler-api-1.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-profiler-api2.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-profiler-sync.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-profiler-well.png