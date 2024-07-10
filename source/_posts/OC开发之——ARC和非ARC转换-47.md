---
title: OC开发之——ARC和非ARC转换(47)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 8d83ef7a
date: 2020-04-17 23:15:42
---
## 一 概述

* 非ARC部分文件使用ARC
* 非ARC项目转换成ARC项目
* ARC项目部分文件使用非ARC

<!--more-->

## 二 查看项目是否是ARC项目

* 点击项目名称，右侧默认切换到PROJECT下的Basic标签

  ![][1]
  
* 切换到Customized标签，在右侧输入框中输入`ARC`，查看Objective-C Automatic Reference Counting 右侧是Yes(ARC)还是No(非ARC)

  ![][2]

## 三 将非ARC项目部分文件支持ARC(如Status.m)

* 选中TARGETS，同时将标签切换到Build Phases选项卡

  ![][3]
  
* 在Build Phases选项卡下找到`Compile Sources`将其展开，可以看到所有的.m文件

  ![][4]
  
* 在要支持ARC的.m文件上回车，在输入框中输入`-f-objc-arc`回车确认

  ![][5]

## 四 非ARC项目转换为ARC项目

* 依次点击：Xcode——>Edit——>Convert——>To Object-C ARC

  ![][6]

## 五 ARC项目上部分文件支持非ARC

* 同理，在要转换的文件上右键，输入`-fno-objc-arc`回车确认
  ![][7]
  




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-arc-project-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-arc-project-yes-or-no.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-target-buildphases-choice.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-target-buildphases-source-open.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-target-buildphases-m-fobjc-arc.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-edit-covert-to-arc.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-target-buildphases-arc-support-noarc.png