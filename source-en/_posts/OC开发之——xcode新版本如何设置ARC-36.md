---
title: OC开发之——xcode新版本如何设置ARC(36)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: cc899b77
date: 2020-04-11 23:14:23
---
## 一 概述

在刚刚开始学习OC开发时，最好不要开启ARC(Automatic Reference Counting)，这样有助于学习内存管理，但是对于刚刚接触xcode的朋友可能会发现，当你使用最新版本的xcode时，敲入release,retain,retainCount时，没有了代码提示，且运行时会报错。这是因为系统默认使用了自动内存管理，下面介绍如何设置这个ARC(Automatic Reference Counting)

<!--more-->

## 二 设置步骤

### 2.1 找到xcode中ARC设置位置

* 新建项目后，点击项目名字位置(右侧会显示项目的配置信息，默认时General选项卡)
  ![][1]
* 切换到`Build Settings`选项卡，在搜索选项卡中搜索“language”或者“ARC”
	![][2]

### 2.2 Xcode设置使用或不使用ARC

* Apple Clang-Language-Objective-C 位置处
* Objective-C Automactic Reference Counting 为Yes(默认)，可以使用ARC
* Objective-C Automactic Reference Counting 为No，就可以自动内存管理了(代码有提示)
	![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-arc-project-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-arc-buildsettings-search.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-arc-buildsettings-setting.png

