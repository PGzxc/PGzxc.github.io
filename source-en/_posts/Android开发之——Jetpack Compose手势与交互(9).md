---
title: Android开发之——Jetpack Compose手势与交互(9)
categories:
  - 开发
  - D-移动开发
  - Android
abbrlink: f6febe19
date: 2022-11-14 09:04:50
tags:
---
## 一 概述

* Compose手势
* Compose交互

<!--more-->

## 二 Compose手势

### 2.1 常用手势

* clickable :点击
* scrollable : 滚动
* draggable :拖动
* swipeable :滑动
* transformable :多点触控：平移、缩放、旋转

### 2.2 不常用手势

* PointerInputScope.detectTapGestures
* PointerInputScope.detectDragGestures

## 三 Compose交互

### 3.1 Interaction互动

* 轻触按钮-PressInteraction.Press
* 松开按钮-PressInteraction.Release
* 拖动到按钮范围外-PressInteraction.Cancel

### 3.2 互动状态

* collectIsPressedAsState()
* collectIsFocusedAsState()
* collectIsDraggedAsState()
* collectIsHoveredAsState()

## 四 思维导图
![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/Jetpack-Compose-09.png

