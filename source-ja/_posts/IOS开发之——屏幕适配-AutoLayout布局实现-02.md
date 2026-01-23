---
title: IOS开发之——屏幕适配-AutoLayout布局实现(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 屏幕适配
abbrlink: 98301c90
date: 2022-03-27 21:38:43
---
## 一 概述

* 关于AutoLayout的几个概念
* 通过布局实现屏幕适配

<!--more-->

## 二 关于AutoLayout的几个概念

### 2.1 什么是Autolayout

* Autolayout是一种“自动布局”技术，专门用来布局UI界面的
* 苹果官方也推荐开发者尽量使用Autolayout来布局UI界面
* Autolayout能很轻松地解决屏幕适配的问题

### 2.2 为什么推出Autolayout

#### Autoresizing

* 在Autolayout之前，有Autoresizing可以作屏幕适配，但局限性较大，有些任务根本无法完成
* 相比之下，Autolayout的功能比Autoresizing强大很多

#### Autolayout的2个核心概念

* 参照
* 约束

### 2.3 Autolayout的警告和错误

#### 警告![][1]

* 控件的frame不匹配所添加的约束, 比如：约束控件的宽度为100, 而控件现在的宽度是110

#### 错误![][2]
* 缺乏必要的约束, 比如:只约束了宽度和高度, 没有约束具体的位置
* 两个约束冲突, 比如:1个约束控件的宽度为100, 1个约束控件的宽度为110

## 三 通过布局实现屏幕适配

### 3.1 Autolayout说明

#### 对其方式

![][3]

说明：

* Leading Edges：左对齐(选中多个View时有效)
* Trailing Edges：右对齐(选中多个View时有效)
* Top Edges：上对齐(选中多个View时有效)
* Bottom Edges：下对齐(选中多个View时有效)
* Horizontal Centers：水平居中对齐(选中多个View时有效)
* Vertical Centers：垂直居中对齐(选中多个View时有效)
* First Baselines：基准线对齐(选中多个View时有效)
* Horizontally in Container：水平居中
* Vertically in Container：垂直居中

#### 约束方式设置

![][4]

说明：

* 上方的数字用于设置上下左右的边距(与临近的View)
* Width,Height：分别设置View的宽度和高度
* Equal Widths：等宽(多个View时生效)
* Equal Heights：等高(多个View时生效)
* Aspect Ration：宽高比

### 3.2 布局逻辑

![][5]



#### 蓝色View

![][6]

说明：

* 选中蓝色View，在Storyboard中选中约束，分别设置上左右边距及高度
* 上边距相当于设置了y
* 左边距相当于设置了x
* 右边距，根据计算结果，相当于设置了宽度
* Height:50，设置了高度

#### 黄色View

![][7]

说明：同时选择蓝、黄View，设置右对齐

![][8]

说明：同时选中蓝、黄View，设置同宽、等高

![][9]

说明：单独选中黄色View，设置上边距

![][10]

说明：选中黄色View，将Mutiplier设置为0.5，意思为：黄色View的宽度=蓝色View的宽度*0.5+0




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-waring.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-error.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-align-explain.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-margin-explain.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-storyboard-view.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-storyboard-blue.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-storyboard-yellow-align.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-storyboard-yellow-equals.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-storyboard-yellow-top.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-02-autolayout-storyboard-yellow-width.png