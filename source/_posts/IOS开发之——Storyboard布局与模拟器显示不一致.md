---
title: IOS开发之——Storyboard布局与模拟器显示不一致
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: a0d2d1
date: 2021-10-22 23:30:52
---
## 一 现象描述

Main.storybboard中放置好组件后，运行到模拟器上，布局文件和模拟器显示不一致

![][1]
<!--more-->

## 二 原因分析

Storyboard中模拟器和模拟器设备类型不一致

* Storyboard中：Iphone SE(2nd generation)
* 模拟器：Iphone 13 Pro Max

## 三 如何修改(布局文件和模拟器显示一致)

### 3.1 模拟器设备选择

Main.storyboard页面底部，在设备列表中选择布局预览设备

![][2]

### 3.2 模拟器设备选择

Main.storyboard页面顶部，在设备列表中选择运行模拟器设备

![][3]

### 3.3 效果图

Storyboard布局文件和模拟器显示效果一致

![][4]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-simulator-diff.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-choice-device.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-monitor-choose.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-monitor-equal.png
