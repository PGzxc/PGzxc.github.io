---
title: IOS开发之——动画-隐式动画(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 2c89d88b
date: 2021-05-06 09:44:04
---
## 一 概述

* CALayer隐式动画
* CALayer隐式动画的事务操作

<!--more-->

## 二 隐式动画

### 2.1 根层

* 每一个UIView内部都默认关联着一个CALayer，我们可用称这个Layer为Root Layer(根层)
* 所有的非Root Layer，也就是手动创建CALayer对象，都存在着隐式动画

### 2.2 什么是隐式动画

* 当对非Root Layer的部分属性进行修改时，默认会自动产生一些动画效果
* 而这些属性称为Animatable Properties(可动画属性)

### 2.3 几个常见的Animatable Properties

* Bounds：用于设置CALayer的宽度和高度。修改这个属性会产生缩放动画
* backgroundColor：用于设置CALayer的背景色。修改这个属性会产生背景色的渐变动画
* Position：用于设置CALayer的位置。修改这个属性会产生平移动画

## 三 隐式动画的事务操作

可以通过动画事务[CATransaction]关闭默认的隐式动画效果

```
[CATransaction begin];
[CATransaction setDisableActions:YES];
self.myview.layer.position=CGPointMake(10,10);
[CATransaction commit];
```

## 四 示例

### 4.1 代码

```
#import "ViewController.h"

@interface ViewController ()

@property (nonatomic,weak) CALayer *layer;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    CALayer *layer=[CALayer layer];
    _layer=layer;
    //设置尺寸
    layer.bounds=CGRectMake(0, 0, 100, 100);
    //颜色
    layer.backgroundColor=[UIColor redColor].CGColor;
    [self.view.layer addSublayer:layer];
    
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    UITouch *touch=[touches anyObject];
    CGPoint pos=[touch locationInView:self.view];
    //开启事务
    [CATransaction begin];
    //取消隐式动画
    [CATransaction setDisableActions:YES];
    _layer.borderWidth=arc4random_uniform(5)+1;
    CGFloat r=arc4random_uniform(256)/255.0;
    CGFloat g=arc4random_uniform(256)/255.0;
    CGFloat b=arc4random_uniform(256)/255.0;
    _layer.backgroundColor=[UIColor colorWithRed:r green:g blue:b alpha:1].CGColor;
    _layer.cornerRadius=arc4random_uniform(50);
    _layer.position=pos;
    //_layer.position=CGPointMake(100, 100);
    //提交事务
    [CATransaction commit];
}

@end
```

### 4.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-calayer-implicit-animal.gif