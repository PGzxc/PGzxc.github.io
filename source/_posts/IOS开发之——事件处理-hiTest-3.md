---
title: IOS开发之——事件处理-hiTest(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: b9a6a08
date: 2020-12-14 09:09:13
---
## 一 概述

* hiTest方法的介绍
* hiTest底层实现原理
* hiTest练习

<!--more-->

## 二 hiTest方法的介绍

### 2.1 hiTest方法介绍

```
- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
```

### 2.2 何时调用

当事件传递给一个控件的时候就会调用

### 2.3 调用过程

* 看窗口是否能接收，如果不能return nil;自己不能接收事件，也不能处理事件，而且也不能把事件传递给子控件
* 判断点在不在窗口上，如果点在窗口上，意味着窗口满足合适的view

### 2.4 作用

寻找最合适的view

## 三  hiTest底层实现原理

### 3.1 坐标系转换关系

* 判断点在不在方法调用者的坐标系上(point：是方法调用者的坐标系上的点)

![][1]
### 3.2 底层实现原理

```
- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
{
    if (self.userInteractionEnabled==NO||self.hidden==YES||self.alpha<=0.01) {
        return nil;
    }
    if (![self pointInside:point withEvent:event]) {
        return nil;
    }
    int count=self.subviews.count;
    for (int i=count-1; i>=0; i--) {
        UIView *childView=self.subviews[i];
        //转换坐标系
        CGPoint childPoint=[self convertPoint:point toView:childView];
       UIView *fitView= [childView hitTest:childPoint withEvent:event];
        if (fitView) {
            return fitView;
        }
    }
    return  self;
}
```

## 四 hiTest练习

### 4.1 界面
![][2]
### 4.2 要求

* 界面上有一个Button，Button上方有一个GreenView布局
* 点击Button时，Button响应请求
* 点击Button上方的GreenView时，Button响应请求
* 点击GreenView上的其他区域时，GreenView响应请求

### 4.3 代码逻辑

#### GreenView.h

```
@interface GreenView : UIView
@property (nonatomic,weak) IBOutlet UIButton *button;
@end
```

#### GreenView.m

```
#import "GreenView.h"

@implementation GreenView

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    NSLog(@"%s",__func__);
}

-(UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
{

    //把自己的点转换为按钮坐标系上的点
    CGPoint buttonPoint=[self convertPoint:point toView:_button];
    if ([_button pointInside:buttonPoint withEvent:event]) {
        return nil;
    }
    return  [super hitTest:point withEvent:event];
}
- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent *)event
{
    CGPoint buttonPoint=[self convertPoint:point toView:_button];
    if ([_button pointInside:buttonPoint withEvent:event]) {
        return NO;
    }
    return  [super pointInside:point withEvent:event];
}
@end
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-point-convert-relate.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-hitest-exercise-view.png