---
title: 'WinForm开发之——ToolStrip(10.22)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 98d815f7
date: 2020-07-30 21:22:21
---
## 一 概述

在C# WinForm开发中添加工具栏(ToolStrip)和添加菜单栏类似，在工具箱中将ToolStrip控件直接拖到Windows窗体中即可  

<!--more-->

## 二 ToolStrip操作

* 从工具箱拖拽ToolStrip控件到Windows窗体后，如下图所示(在添加了ToolStrip控件之后，它只是一个工具条，上面并没有控件，所以它不能影响一些事件，从而没有功能)

  ![][1]
  
* 我们可以把它理解成一个占位符，就像是占着一个区域的位置，然后在其上面再添加按钮

  ![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-toolstrip-drag.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-toolstrip-view.png
