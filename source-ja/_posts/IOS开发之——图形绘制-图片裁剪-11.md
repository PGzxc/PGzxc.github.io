---
title: IOS开发之——图形绘制-图片裁剪(11)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 32a1cbf4
date: 2021-01-19 09:59:52
---
## 一 概述

本文介绍对图片进行裁剪操作：

* 裁剪图片成圆形图片
* 裁剪图片成带边框的原型图片

<!--more-->

## 二 原理

### 2.1 圆形图片的裁剪原理

* 绘制旧图片
* 依据就图片的尺寸，绘制圆，使得圆与图片正切(半径等于图片的宽度)
* 裁剪后的图片就是圆形图片

### 2.2 带边框图片的裁剪原理

* 绘制旧图片
* 依次绘制2个圆，使得小圆与图片正切，大图等于小圆+圆环*2
* 裁剪后的图片就是带边框的裁剪图片

## 三 裁剪图片成圆形图片

### 3.1 功能代码

```
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //1.加载旧的图片
    UIImage *oldImage=[UIImage imageNamed:@"阿狸头像"];
    //2.开启上下文
    UIGraphicsBeginImageContextWithOptions(oldImage.size, NO, 0.0);
    //3.画圆：正切于上下文
    UIBezierPath *path=[UIBezierPath bezierPathWithOvalInRect:CGRectMake(0, 0, oldImage.size.width, oldImage.size.height)];
    //4.设置裁剪区域
    [path addClip];
    //5.画图片
    [oldImage drawAtPoint:CGPointZero];
    //6.生成一个新的图片
    UIImage *newImage=UIGraphicsGetImageFromCurrentImageContext();
    //7.关闭上下文
    UIGraphicsEndImageContext();
    _imageView.image=newImage;  
}
```

### 3.2 圆形效果图

![][1]

## 四 裁剪图片成带边框的原型图片

### 4.1 功能代码

```
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //圆环的宽度
    CGFloat borderW=10;
    //加载旧的图片
    UIImage *oldImage=[UIImage imageNamed:@"阿狸头像"];
    //新的图片尺寸
    CGFloat imageW=oldImage.size.width+2*borderW;
    CGFloat imageH=oldImage.size.height+2*borderW;
    
    //设置新的图片尺寸
    CGFloat circleW=imageW>imageH?imageH:imageW;
    //开启上下文
    UIGraphicsBeginImageContextWithOptions(CGSizeMake(circleW, circleW), NO, 0.0);
    //画大圆
    UIBezierPath *path=[UIBezierPath bezierPathWithOvalInRect:CGRectMake(0, 0, circleW, circleW)];
    //获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    CGContextAddPath(ctx, path.CGPath);
    //渲染
    CGContextFillPath(ctx);
    CGRect clipR=CGRectMake(borderW, borderW, oldImage.size.width, oldImage.size.height);
    //画圆：正切于旧图片的圆
    UIBezierPath *clipPath=[UIBezierPath bezierPathWithOvalInRect:clipR];
    //设置裁剪区域
    [clipPath addClip];
    //画图片
    [oldImage drawAtPoint:CGPointMake(borderW, borderW)];
    //获取新的图片
    UIImage *newImage=UIGraphicsGetImageFromCurrentImageContext();
    //关闭上下文
    UIGraphicsEndImageContext();

    _imageView.image=newImage;  
}
```

### 4.2 圆环效果图
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-cut-circle-image.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-cut-circle-circle-image.png

