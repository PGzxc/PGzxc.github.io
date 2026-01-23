---
title: IOS开发之——图形绘制-矩形操作(9)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: fe260278
date: 2021-01-07 09:14:13
---
## 一 概述

本文介绍自定义View矩形操作：

* 矩形平移
* 矩形旋转
* 矩形缩放

<!--more-->

## 二 原始矩形

### 2.1 代码

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    //1.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    //2.拼接路径
    UIBezierPath *path=[UIBezierPath bezierPathWithOvalInRect:CGRectMake(-50, -100, 150, 200)];
    //3.把路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    [[UIColor yellowColor]set];
    //4.渲染
    CGContextFillPath(ctx);
}
```

### 2.2 原始矩形图

![][1]
## 三 矩形操作

矩形操作说明：你的路径一定放在矩形操作之后

### 3.1 矩形平移

#### 代码

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    //1.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    CGContextTranslateCTM(ctx, 50, 100);
    //2.拼接路径
    UIBezierPath *path=[UIBezierPath bezierPathWithOvalInRect:CGRectMake(-50, -100, 150, 200)];
    //3.把路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    [[UIColor yellowColor]set];
    //4.渲染
    CGContextFillPath(ctx);
}
```

#### 平移后效果图
![][2]
### 3.2 旋转操作

#### 代码

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    //1.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    CGContextTranslateCTM(ctx, 50, 100);
    CGContextRotateCTM(ctx, M_PI_4);
    //2.拼接路径
    UIBezierPath *path=[UIBezierPath bezierPathWithOvalInRect:CGRectMake(-50, -100, 150, 200)];
    //3.把路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    [[UIColor yellowColor]set];
    //4.渲染
    CGContextFillPath(ctx);
}
```

#### 旋转后效果图
![][3]

### 3.3 矩形缩放
#### 代码

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    //1.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    CGContextTranslateCTM(ctx, 50, 100);
    CGContextRotateCTM(ctx, M_PI_4);
    CGContextScaleCTM(ctx, 0.5, 1.2);
    //2.拼接路径
    UIBezierPath *path=[UIBezierPath bezierPathWithOvalInRect:CGRectMake(-50, -100, 150, 200)];
    //3.把路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    [[UIColor yellowColor]set];
    //4.渲染
    CGContextFillPath(ctx);
}
```

#### 缩放后效果图
![][4]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-rectangle-normal.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-rectangle-trans-after.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-rectangle-rotate-after.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-rectangle-scale-after.png

