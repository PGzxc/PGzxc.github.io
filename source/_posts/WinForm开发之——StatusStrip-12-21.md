---
title: 'WinForm开发之——StatusStrip(12.21)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 318f4c3e
date: 2020-07-30 21:20:59
---
## 一 概述

在Windows窗体应用程序中，状态栏菜单(StatusStrip)用于在界面中给用户一些提示，例如登录到一个系统后，在状态栏上显示登录人的用户名、系统时间等信息

<!--more-->

## 二 StatusStrip操作

* 在工具箱中找到StatusStrip控件，拖放到Windows窗体中

  ![][1]
  
* 单击上图所示界面中新添加的状态栏控件，则会显示下图中的下拉菜单，其中包括标签控件(StatusLabel)、进度条(ProgressBar)、拉下列表按钮(DropDownButton)、分割按钮(SplitButton)

  ![][2]
  
* 给其中的标签控件设置Text属性，ProgressBar设置Value等

  ![][3]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-statusstrip-drag.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-status-items.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-statustrip-value-set.png
