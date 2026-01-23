---
title: Windows应用之——RocketDock之无法拖放图标到dock栏
categories:
  - 系统
  - Windows
tags:
  - Windows
abbrlink: e16866ca
date: 2021-04-08 13:23:35
---
## 一 现象

Windows10环境下，将桌面上的快捷图标无法拖放到dock栏

![][1]

<!--more-->

## 二 原因及解决办法

### 2.1 原因

* 给RocketDock兼容性选项设置了`以管理员身份运行此程序`
* 此系统环境下，RocketDock不兼容

### 2.2 解决办法

* 在设备管理器中将RocketDock关闭
![][2]
* 找到RocketDock，右键—>属性—兼容性，去掉`以管理员身份运行程序`
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-rocketdock-move-unable.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-rocketdock-manager-close.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-rocketdock-compatible-move.png