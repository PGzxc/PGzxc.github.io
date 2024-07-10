---
title: IOS开发之——屏幕适配-Autoresizing(01)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 屏幕适配
abbrlink: 7ce33129
date: 2022-03-26 23:30:15
---
## 一 概述

* 什么是Autoresizing布局
* 通过布局实现Autoresizing布局
* 通过代码实现Autoresizing布局

<!--more-->

## 二 Autoresizing布局

### 2.1 什么是Autoresizing

* Autoresizing是iOS中传统的界面自动布局方式
* 通过它，当父视图frame变换时，子视图会自动的做出相应的调整

### 2.2 Autoresizing布局介绍

![][1]

View中参数说明：

* x：选中View的X坐标
* y：选中View的Y坐标
* Width：选中View的宽度
* Height：选中View的高度

Autoresizing说明：

* 上面横杠(实线)：与父视图的上边距位置固定
* 右边横杠(实线)：与父试图的右边距位置固定
* 下边横杠(实线)：与父视图的下边距位置固定
* 左边横杠(实线)：与父视图的左边距位置固定
* 左右箭头(中间)：左右缩放
* 上下箭头(中间)：上下缩放

Autoresizing右边视图说明：

* 动态显示视图设置后的显示效果
* 把鼠标放在Autoresizing图框区域，视图会动态显示

## 三 通过布局实现Autoresizing布局

### 3.1 布局说明

* 父布局是红色View，包含两个子View，分别位于左上角和右下角，随屏幕缩放
* 子View1，位于父View左上角，随着屏幕缩放
* 子View2，位于父View右下角，随着屏幕缩放

### 3.2 布局中设置

父布局(红色View)：设置上边距固定、左边距固定、上下/左右缩放箭头

![][2]

子View1(左上角)：设置上边距固定、左边距固定、上下/左右缩放箭头

![][3]

子View2(右下角)：设置下边距固定、右边距固定、上下/左右缩放箭头

![][4]

### 3.3 效果图(2手机+平板)
![][5]

## 四 通过代码实现Autoresizing布局
### 4.1通过代码使用Autoresizing

#### UIView两个属性

```
// 默认为YES
@property(nonatomic) BOOL autoresizesSubviews;
// 默认为UIViewAutoresizingNone
@property(nonatomic) UIViewAutoresizing autoresizingMask;
```

说明：

* `autoresizesSubviews`属性用于标识当自身的`bounds`发生改变时是否自动调整子视图的布局;
* `autoresizingMask`属性用于标识当父视图的`bounds`发生改变时如何自动调整自身的布局

#### autoresizingMask属性的取值

```
UIViewAutoresizingNone                 = 0,      不执行任何调整
UIViewAutoresizingFlexibleLeftMargin   = 1 << 0, 自动调整与父视图的左边距
UIViewAutoresizingFlexibleWidth        = 1 << 1, 自动调整自身的宽度
UIViewAutoresizingFlexibleRightMargin  = 1 << 2, 自动调整与父视图的右边距
UIViewAutoresizingFlexibleTopMargin    = 1 << 3, 自动调整与父视图的上边距
UIViewAutoresizingFlexibleHeight       = 1 << 4, 自动调整自身的高度
UIViewAutoresizingFlexibleBottomMargin = 1 << 5, 自动调整与父视图的下边距
```

### 4.2 代码

```
- (void)viewDidLoad {
    [super viewDidLoad];
    
    UIView * parentView = [[UIView alloc]initWithFrame:CGRectMake(20, 40, 200, 200)];
    parentView.backgroundColor=[UIColor redColor];
    parentView.autoresizingMask=UIViewAutoresizingFlexibleRightMargin|UIViewAutoresizingFlexibleBottomMargin;
    parentView.autoresizingMask=UIViewAutoresizingFlexibleWidth;
    
    UIView * view1 = [[UIView alloc]initWithFrame:CGRectMake(0, 0, 50, 50)];
    view1.backgroundColor=[UIColor blueColor];
    view1.autoresizingMask=UIViewAutoresizingFlexibleRightMargin|UIViewAutoresizingFlexibleBottomMargin;
    view1.autoresizingMask=UIViewAutoresizingFlexibleWidth;
    
    [parentView addSubview:view1];
    
    UIView * view2 = [[UIView alloc]initWithFrame:CGRectMake(150, 150, 50, 50)];
    view2.backgroundColor=[UIColor greenColor];
    view2.autoresizingMask=UIViewAutoresizingFlexibleLeftMargin|UIViewAutoresizingFlexibleTopMargin;
    view2.autoresizingMask=UIViewAutoresizingFlexibleWidth;
    [parentView addSubview:view2];
         
    [self.view addSubview:parentView];  
}
```

### 4.3 效果图

|  竖屏  |  横屏  |
| :----: | :----: |
| ![][6] | ![][7] |



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-01-autoresizing-explain.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-01-board-father.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-01-board-son-view1.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-01-board-son-view2.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-01-board-effect.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios//ios-screen-adapter-01-code-view1.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios//ios-screen-adapter-01-code-view2.png

