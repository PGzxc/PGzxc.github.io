---
title: IOS开发之——动画-CAKeyPathAnimtaion(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: '75065907'
date: 2021-06-01 10:16:03
---
## 一 概述

* view代替layer图层演示动画
* value动画
* path动画

<!--more-->

## 二 view代替layer图层演示动画

Main.storyboard中添加UiView

## 三 value动画

### 3.1 代码(anim.values)

```
    CAKeyframeAnimation *anim=[CAKeyframeAnimation animation];
    //设置动画属性
    anim.keyPath=@"position";
    NSValue *v1=[NSValue valueWithCGPoint:CGPointZero];
    NSValue *v2=[NSValue valueWithCGPoint:CGPointMake(160, 160)];
    NSValue *v3=[NSValue valueWithCGPoint:CGPointMake(270, 0)];
    
    anim.values=@[v1,v2,v3];
    anim.duration=2;
    [_redView.layer addAnimation:anim forKey:nil];
```

### 3.2 效果图

![][1]

## 四 path动画

### 4.1 代码

```
   CAKeyframeAnimation *anim=[CAKeyframeAnimation animation];
    //设置动画属性
    anim.keyPath=@"position";
    UIBezierPath *path=[UIBezierPath bezierPathWithOvalInRect:CGRectMake(0, 0, 200, 200)];
    
    anim.path=path.CGPath;
    anim.duration=0.5;
    //取消反弹
    anim.removedOnCompletion=NO;
    anim.fillMode=kCAFillModeForwards;
    anim.repeatCount=MAXFLOAT;
    [_redView.layer addAnimation:anim forKey:nil];
```

### 4.2 效果图

![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-cabaseanimation-value.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-cabaseanimation-path.gif