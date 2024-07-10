---
title: IOS开发之——图层-Position和AnchorPoint(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: d8122fce
date: 2021-05-06 09:32:07
---
## 一 概述

* CAlayer中position和anchorPoint属性说明
* position和anchorPoint示意图

<!--more-->

## 二 position和anchorPoint属性说明

CALayer中有2个非常重要的属性：position和anchorPoint

### @property CGPoint position

* 用来设置CALayer在父层中的位置
* 以父层的左上角为原点(0,0)

### @property CGPoint anchorPoint

* 称为“定位点”，“锚点”
* 决定着CALayer身上的哪个点会在position属性所指的位置
* 以自己的左上角为原点(0,0)
* 它的x,y取值范围都是0～1，默认值为(0.5,0.5)，意味着在layer的中间

## 三 示意图

### 3.1 anchorPoint在坐标系中的示意图

![][1]

### 3.2 将红色图层添加到绿色图层上时示意图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-anchorPoint-xy.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-anchorPoint-add-uiview.png