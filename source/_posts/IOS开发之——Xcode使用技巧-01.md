---
title: IOS开发之——Xcode使用技巧(01)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - Xcode
abbrlink: '29628088'
date: 2022-03-31 08:54:15
---
## 一 概述

* Xcode Behaviors
* 设备管理和模拟器
* 更改app的显示名称和identifier

<!--more-->

## 二 Xcode Behaviors

### 2.1 Xcode Behaviors能做什么

* 当执行Build(编译)、Testing(测试)、Running(运行)、Search(搜索)等时，可以执行一些特定的操作
* 上述操作执行：Starts(开始)、Success(成功)、Fails(失败)等时，可以让Xcode播放声音、打开新的标签页、显示导航等等

### 2.2 如何打开Xcode Behaviors

| 方法一 | 方法二 |
| :----: | :----: |
| ![][1] | ![][2] |

### 2.3 如何设置

以Build(编译)为例：Starts(开始)时，Play sound(设置播放音效)，Show(设置显示内容)

![][3]

## 三 设备管理和模拟器

### 3.1 说明

* 此项用于管理Xcode中的设备和模拟器
* 查看现有的设备列表
* 添加和删除设备及模拟器

### 3.2 如何打开

在展开的设备下拉框中选中`Add Additional Simulators..`

![][4]

### 3.3 如何添加和删除模拟器

|  删除  |  添加  |
| :----: | :----: |
| ![][5] | ![][6] |

说明：

* 删除时，在要删除的模拟器上右键——>选中Delete
* 添加模拟器时，点击底部的`+`，在弹出的窗口中选择要添加的设备

## 四 更改app的显示名称和identifier

依次点击：TARGETS——>General——>Display Name(显示名称)和Bundle Identifier

![][7]






[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-01-behavior-editor.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-01-behavior-preference.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-01-behavior-setting.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-01-devices-list.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-01-devices-delete.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-01-devices-add.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-01-name-identifier.png