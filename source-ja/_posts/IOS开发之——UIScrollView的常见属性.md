---
title: IOS开发之——UIScrollView的常见属性
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: ad0302fd
date: 2020-05-09 23:34:15
---
## 一 概述

本文介绍UIScrollView的常见属性

* CGPoint contentOffset：这个属性用来表示UIScrollView滚动的位置
* CGSize contentSize：这个属性用来表示UIScrollView内容的尺寸，滚动范围(能滚多远)
* UIEdgeInsets contentInset：这个属性能够在UIScrollVIew的四周增加额外的滚动区域
* BOOL bounces：设置UIScrollView是否需要弹簧效果
* BOOL scrollEnabled：设置UIScrollView能否滚动 
* BOOL showsHorizontalScrollIndicator：是否显示水平滚动条
* BOOL showsVerticalScrollIndicator：是否显示垂直滚动条

<!--more-->

![][1]

## 二 代码

### 2.1 OC模式下

```
  self.scrollView.contentInset=UIEdgeInsetsMake( 20,  20,  20, 20);
  self.scrollView.showsHorizontalScrollIndicator=NO;
  self.scrollView.showsVerticalScrollIndicator=NO;
  self.scrollView.contentOffset=CGPointMake(100, 100);
  self.scrollView.bounces=NO;
```

### 2.2 Swift模式下

```
  scrollView.contentInset=UIEdgeInsets.init(top: 20, left: 20, bottom:20, right: 20);
  scrollView.showsVerticalScrollIndicator=false;
  scrollView.showsHorizontalScrollIndicator=false;
  scrollView.contentOffset=CGPoint.init(x: 100, y: 100);
  scrollView.bounces=false;
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uiscrollview-property.png