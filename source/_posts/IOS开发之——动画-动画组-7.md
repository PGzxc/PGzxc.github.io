---
title: IOS开发之——动画-动画组(7)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: a1775e68
date: 2021-06-03 12:23:16
---
## 一 概述

* 动画组概念
* 动画组属性
* 动画组-示例

<!--more-->

## 二 动画组概念

* 用CAAnimationGroup表示动画组
* 动画组中保存一组动画对象，位移动画，缩放动画，旋转动画等
* 将CAAnimationGroup加入到Layer层后，组中左右动画对象可以同时并发运行

## 三 动画组属性

* Animations：用来保存一组动画对象的NSArray
* Duration：动画组的执行时长
* 默认情况下，一组动画对象是同时运行的，也可以通过设置动画对象的beginTime属性来更改动画的开始时间

## 四 示例—点击页面执行位置/旋转/缩放动画

### 4.1 代码

```
@property (weak, nonatomic) IBOutlet UIView *redView;

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    CABasicAnimation *rotation=[CABasicAnimation animation];
    rotation.keyPath=@"transform.rotation";
    rotation.toValue=@M_PI_2;
    
    CABasicAnimation *position=[CABasicAnimation animation];
    position.keyPath=@"position";
    position.toValue=[NSValue valueWithCGPoint:CGPointMake(100, 250)];
    
    CABasicAnimation *scale=[CABasicAnimation animation];
    scale.keyPath=@"transform.scale";
    scale.toValue=@0.2;
    
    CAAnimationGroup *group=[CAAnimationGroup animation];
    group.animations=@[rotation,position,scale];
    group.duration=2;
    
    //取消反弹
    group.removedOnCompletion=NO;
    group.fillMode=kCAFillModeForwards;
    
    [_redView.layer addAnimation:group forKey:nil];
    
}
```

### 4.2 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-anim-group-sample.gif