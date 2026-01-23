---
title: IOS开发之——图像绘制-基本线条(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 9d3888a8
date: 2020-12-29 09:03:28
---
## 一 什么是Quartz2D

* Quartz 2D是一个二维绘图引擎，同时支持iOS和Mac系统
* Quartz 2D能完成的工作：
  * 绘制图形：线条\三角形\矩形\园\弧等
  * 绘制文字
  * 绘制\生成图片(图像)
  * 读取\生成PDF
  * 截图\裁剪图片
  * 自定义UI控件

<!--more-->

## 二 Quart 2D实例

Quart 2D能做很多强大的事情，例如：

* 裁剪图片：圆形裁剪
* 涂鸦\画板
* 手势解锁

## 三 Quart 2D 在iOS开发中的价值

* 为了便于搭建美观的UI界面，iOS提供了UIKit框架，里面有各种各样的UI控件

  - UILabel：显示文字
  - UIImageView：显示图片
  - UIButton：同时显示图片和文字(能点击)


* 利用UIKit框架提供的控件，拼拼凑凑，能搭建和实现一些简单、常见的UI界面
* 但是，有些UI界面及其复杂、而且比较个性化，用普通的UI控件无法实现，这时可以利用Quart2D技术将控件内部的结构画出来，自定义控件的样子
* 其实，iOS中大部分控件的内容都是通过Quart2D画出来的
* 因此，Quart2D在iOS开发中很重的一个价值是：自定义view(自定义UI控件)

## 四 图形上下文

* 图形上下文(Graphics Context)：是一个CGContextRef类型的数据
* 图形上下文的作用：
  - 保存绘图信息、绘图状态
  - 决定绘制的输出目标(绘制到什么地方去?)(输出目标可以是PDF文件、Bitmap或者显示器的窗口上)
* 相同的一套绘图序列，指定不同的Graphics Context，就可以将相同的图像绘制到不同的目标上
* Quart2D提供了以下几种类型的Graphics Context
  - Bitmap Graphics Context
  - PDF Graphics Context
  - Windows Graphics Context
  - Layer Graphics Context
  - Printer Graphics Context

## 五 自定义UI控件

如何利用Quart2D自定义UI控件？

### 5.1 如何利用Quart2D绘制东西到view上

* 首先，得有图形上下文，因为它能保存绘图信息，并且决定着绘制到什么地方去
* 其次，那个图形上下文必须跟view相关联，才能将内容绘制到view上面

### 5.2 自定义UI控件的步骤

* 新建一个类，继承自UIView
* 实现-(void)drawRect:(CGRect)rect方法，然后在这个方法中，可以
  - 取得跟当前view相关联的图形上下文
  - 绘制相应的图形内容，绘制时产生的线条称为路径。路径由一个或多个直线或曲线组成
  - 利用图形上下文将绘制的所有内容渲染显示到view上面

## 六 实例

### 6.1 画折线

#### 思路

* 获取上下文
* 设置绘图信息(拼接路径)
* 将路径添加到上下文
* 把上下文渲染到视图

#### 代码

```
- (void)drawRect:(CGRect)rect {
   // NSLog(@"%@",NSStringFromCGRect(rect));
   //1.获取上下文
    //CGContextRef CG CoreGraphics Ref引用
    //目前学的上下文都跟UIGraphics有关，以后想直接获取上下文，直接敲一个UIGraphics
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    //2.设置绘图信息(拼接路径)
    UIBezierPath *path=[UIBezierPath bezierPath];
    //设置起点
    [path moveToPoint:CGPointMake(10, 10)];
    //添加一条线到某个点
    [path addLineToPoint:CGPointMake(125, 125)];
    [path addLineToPoint:CGPointMake(240, 10)];
    //3.将路径添加到上下文,直接把UIKit的路径转换成CoreGraphics，CG开头就能转
    CGContextAddPath(ctx, path.CGPath);
    //4.把上下文渲染到视图,stroke描边
    CGContextStrokePath(ctx);  
}  
```

#### 效果图

![][1]
### 6.2 设置交叉线及颜色和线宽

#### 代码

```
- (void)drawRect:(CGRect)rect {

    //1.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    //设置起点
    UIBezierPath *path=[UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(10,125)];
    //添加一条线到某个点
    [path addLineToPoint:CGPointMake(230, 125)];
    //设置起点
    //[path moveToPoint:CGPointMake(10,10)];
    //添加一条线到某个点
    //[path addLineToPoint:CGPointMake(125,100)];
    
    UIBezierPath *path1=[UIBezierPath bezierPath];
    [path1 moveToPoint:CGPointMake(10, 10)];
    [path1 addLineToPoint:CGPointMake(125, 100)];
    
    
    //3.把路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    CGContextAddPath(ctx,path1.CGPath);
    //设置绘图状态
    //设置线宽
    CGContextSetLineWidth(ctx, 10);
    CGContextSetLineCap(ctx, kCGLineCapRound);
    [[UIColor redColor]set];
     
    //4.渲染上下文到视图
    CGContextStrokePath(ctx);  
}
```

#### 效果图
![][2]
### 6.3 画曲线
#### 代码

```
- (void)drawRect:(CGRect)rect {
    //1.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    //2拼接路径
    UIBezierPath *path=[UIBezierPath bezierPath];
    CGPoint startP=CGPointMake(10, 125);
    CGPoint endP=CGPointMake(240, 125);
    CGPoint controlP=CGPointMake(125,0);
    [path moveToPoint:startP];
    [path addQuadCurveToPoint:endP controlPoint:controlP];
    //3.把路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    //4.渲染上下文到视图
    CGContextStrokePath(ctx);
    
}
```

#### 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-quart2d-drawn-line.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-quart2d-line-color-width.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-quart2d-draw-quxian.png

