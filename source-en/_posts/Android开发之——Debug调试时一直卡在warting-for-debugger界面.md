---
title: Android开发之——Debug调试时一直卡在warting for debugger界面
abbrlink: dd5cd306
date: 2021-03-26 15:34:51
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
---

## 一 现象

Debug调试app时，一直卡在如图所示界面

![][1]

<!--more-->
## 二 解决办法

依次点击：Run——>Attach Debugger to Android Process
![][2]
在Choose Process对话框中，选择要调试的应用
![][3]

## 三 Choose Process对话框中无法选择应用
### 3.1 提示信息

```
warning:debug info can bu unavailable.please chose other application using ADB:Monitor,DDMS,Eclipse
```
![][4]

### 3.2 解决办法

打开终端，执行如下指令

```
adb kill-server
```
## 四 其他解决办法

### 4.1 gradle.gradle中配置debugTypes

```
debug {debuggable true }
```

### 4.2 AndroidManifest.xml中application标签添加

```
 android:debuggable="true"
```

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-waiting.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-run-attach-debugger.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-choose-process.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-process-warning.png
