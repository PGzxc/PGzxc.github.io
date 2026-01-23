---
title: IOS开发之——画板-线的粗细及颜色变化(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: a4eeea5f
date: 2021-04-06 10:01:06
---
## 一 概述

* 画板——改变线的粗细
* 画板——添加颜色变化

<!--more-->

## 二 画板——改变线的粗细

### 2.1 功能描述

* PaintView中定义画板中线宽的变量width
* 给绘制View添加线宽变化功能valueChange
* PaintView中当绘制开始时，设置要绘制线的宽度

### 2.2 功能代码

#### PaintView.h

```
@property (nonatomic,assign) CGFloat width;
```

#### ViewController.m

```
- (IBAction)valueChange:(UISlider *)sender
{
    _paintView.width=sender.value;
}
```

#### PaintView.m

```
- (void)awakeFromNib
{
    _width=2;
}
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //创建路径
    UIBezierPath *path=[UIBezierPath bezierPath];
    path.lineWidth=_width;
    _path=path;
    [self.paths addObject:path];
    //获取触摸点
    CGPoint pos=[self pointWithTouches:touches];
    //确定起点
    [path moveToPoint:pos];
}
```

### 2.3 效果图

![][1]

## 三 画板——添加颜色变化

### 3.1 功能描述

* 自定义PaintPath(继承UIBezierPath，用于添加绘制时颜色)
* PaintPath添加绘制时的方法，用于确定绘制时的线宽，颜色，粗细，起点
* 绘制时，拿出颜色值设置

### 3.2 功能代码

#### PaintPath.m

```
#import "PaintPath.h"
@implementation PaintPath

+ (instancetype)paintPathWidthLineWidth:(CGFloat)width color:(UIColor *)color startPoint:(CGPoint)startPoint
{
    PaintPath *path=[[self alloc]init];
    path.lineWidth=width;
    path.color=color;
    [path moveToPoint:startPoint];
    return  path;
}
@end
```

#### PaintView.m

```
//确定起点
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //获取触摸点
    CGPoint pos=[self pointWithTouches:touches];
    //创建路径
    PaintPath *path=[PaintPath paintPathWidthLineWidth:_width color:_color startPoint:pos];
   
    _path=path;
    [self.paths addObject:path];
}

- (void)drawRect:(CGRect)rect {
    // Drawing code
    
    for (PaintPath *path in self.paths) {
    
        [path.color set];
        [path stroke];
    }
}
```

### 3.3 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-board-line-width.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-board-line-color.gif