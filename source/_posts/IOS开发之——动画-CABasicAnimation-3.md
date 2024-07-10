---
title: IOS开发之——动画-CABasicAnimation(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: '440951e2'
date: 2021-06-01 10:09:41
---
## 一 概述

* Core Animation：核心动画简介
* 核心动画的开发步骤
* 核心动画示例

<!--more-->

## 二 核心动画简介

* Core Animation，中文翻译为核心动画，它是一组非常强大的动画处理API，使用它能做出非常绚丽的动画效果，而且往往是事半功倍。也就是说，使用少量代码就可以实现非常强大的功能
* Core Animation可以用在Mac OS和IOS平台
* Core Animation的动画执行过程都是在后台操作的，不会阻塞主线程
* 要注意的是，Core Animation是直接作用在CALayer上的，并非UIView
* 如果是xcode5之前的版本，使用它需要添加QuartzCore.framework和引入对应的框架<QuartzCore/QuartzCore.h>

## 三 开发步骤

1. 使用它需要先添加QuartzCore.framework框架和引入主头文件<QuartzCore/QuartzCore.h>
2. 初始化一个CAAnimation对象，并设置一些动画相关属性
3. 通过调用CALayer的addAnimation:forKey方法增加CAAnimation对象到CALayer中，这样就能开始执行动画了
4. 通过调用CALayer的removeAnimationForKey方法可以停止CALayer中的动画

## 四 CAAnimation继承结构

注意：图中的黑色虚线代表“继承”某个类，红色虚线代表“遵守”某个协议

![][1]

说明：

* CAAnimation遵守CAMediaTiming，可以给动画设置执行时长
* CAAnimationGroup：动画组(可以执行一系列动画)
* CABasicAnimation：单一组动画(formValue toValue)
* CAKeyframeAnimation：多组动画

## 五 示例

### 5.1 位移动画

代码

```
@property (nonatomic,weak) CALayer *layer;

- (void)viewDidLoad {
    [super viewDidLoad];

    CALayer *layer=[CALayer layer];
    layer.position=CGPointMake(100, 100);
    layer.bounds=CGRectMake(0, 0, 100, 100);
    layer.backgroundColor=[UIColor redColor].CGColor;
    [self.view.layer addSublayer:layer];
    _layer=layer;
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self position];
}
-(void)position
{
    //创建动画对象
    CABasicAnimation *animation=[CABasicAnimation animation];
    //设置动画的属性
    animation.keyPath=@"position";
    //设置属性改变的值
    animation.toValue=[NSValue valueWithCGPoint:CGPointMake(200, 200)];
    //设置动画时长
    //animation.duration=2;
    //取消反弹
    //动画执行完毕之后，不要把动画移除
    animation.removedOnCompletion=NO;
    //保持最新的位置
    animation.fillMode=kCAFillModeForwards;
    
    //给图层添加动画
    [_layer addAnimation:animation forKey:nil];
}
```

效果图
![][2]

### 5.2 旋转动画

代码

```
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self transform];
}
-(void)transform
{
    //创建动画对象
    CABasicAnimation *animation=[CABasicAnimation animation];
    //设置动画的属性
    animation.keyPath=@"transform";
    //设置属性改变的值
    animation.toValue=[NSValue valueWithCATransform3D:CATransform3DMakeRotation(M_PI, 1, 0, 0)];
    //设置动画时长
    animation.duration=1;
    //取消反弹
    //动画执行完毕之后，不要把动画移除
    animation.removedOnCompletion=NO;
    //保持最新的位置
    animation.fillMode=kCAFillModeForwards;
    animation.repeatCount=MAXFLOAT;
    //给图层添加动画
    [_layer addAnimation:animation forKey:nil];
}
```

效果图
![][3]

其他(属性设置)

```
 animation.keyPath=@"transform.rotation";
 animation.toValue=@M_PI;
```

### 5.3 缩放动画

代码

```
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self transform];
}
-(void)transform
{
    //创建动画对象
    CABasicAnimation *animation=[CABasicAnimation animation];
    //设置动画的属性
    animation.keyPath=@"transform.scale";
    //设置属性改变的值
    animation.toValue=@0.5;
    //设置动画时长
    animation.duration=1;
    //取消反弹
    //动画执行完毕之后，不要把动画移除
    animation.removedOnCompletion=NO;
    //保持最新的位置
    animation.fillMode=kCAFillModeForwards;
    animation.repeatCount=MAXFLOAT;
    //给图层添加动画
    [_layer addAnimation:animation forKey:nil];
}
```

效果图
![][4]

其他(将图片替换为心，制作心跳动画)

代码

```
layer.contents=(id)[UIImage imageNamed:@"jump"].CGImage;
```

效果图

![][5]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caanimation-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-animation-position.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-animation-rotate.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-animation-scale.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-animation-jupm.gif

