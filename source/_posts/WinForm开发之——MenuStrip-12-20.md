---
title: 'WinForm开发之——MenuStrip(12.20)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: '22e02407'
date: 2020-07-30 21:19:05
---
## 一 概述

MenuStrip是Windows窗体中的菜单栏控件，直接按住MenuStrip不放，将其拖到Windows窗体中即可

<!--more-->

## 二 实例 <font size=5>在Windows窗体中创建MenuStrip菜单</font>

### 2.1 页面布局

* 将MenuStrip控件拖拽到Windows窗体中

  ![][1]

### 2.2 MenuStrip菜单添加

* 完成MenuStrip控件的添加后，在Windows窗体设计页面中就能看到"请在此处输入"选项，直接单击它，然后输入菜单的名称，例如："文件"、“编辑”、“视图”等

* 此外，添加了一级菜单后还能添加二级菜单，例如，为"文件"菜单添加"新建"、“打开”、“关闭”等二级菜单，如下图所示，模拟一个文件菜单(包括二级菜单)和编辑菜单

  ![][2]

### 2.3 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-menustrip-drag-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-menustrip-edit.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-menustrip-view.gif