---
title: IOS开发之——设置APP图标、名字、启动页
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: f7e64624
date: 2020-06-27 23:29:10
---
## 一 概述

本文介绍给APP进行一些基本配置

* APP图标
* 名字
* 启动页

<!--more-->

## 二 APP图标设置

* 依次点击：Xcode——>应用——>Assets.xcassets——>找到AppIcon

* 如果没有，则创建AppIcon

  ![][1]

* 将图标拖放到AppIcon下

  ![][2]



## 三 App名字设置

* 找到应用下info.plist，找到Bundle name，修改对应的Value值

  ![][3]

## 四 设置App启动图标

* 删除默认设置的LaunchScreen.storyboard
* 在Assets.xcassets下新建`New IOS Launch Image`
* App Icons and Launch Images下的Launch Screen File设置为启动Image



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-chaoji-caitu-appicon-create.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-chaoji-caitu-icon-setting.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-chaoji-caitu-bundlename-modify.png