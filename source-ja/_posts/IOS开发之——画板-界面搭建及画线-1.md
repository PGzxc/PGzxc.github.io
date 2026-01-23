---
title: IOS开发之——画板-界面搭建及画线(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: bbf3280c
date: 2021-04-06 09:50:05
---
## 一 概述

* 画板—界面布局搭建
* 画板—画线功能实现

<!--more-->

## 二 界面布局

### 2.1 ToolBar布局

* 首先拖入ToolBar(只有一个BarButtonItem)修改为清屏
* 依次复制BarButtonItem撤销，橡皮擦，照片和保存
* 在照片和保存BarButtonItem之间放入Flexible Space，将其隔开

![][1]

### 2.2 底部按钮界面

* 拖入View，并设置backgroundcolor，依次设置view的左右距离和高度
* 拖入Horizontal Slider，并设置距离左右的距离和高度
* 拖入红绿蓝三个按钮，对于红按钮设置其距离左边的距离20和高度30；对于绿色按钮按住Control指向红色按钮，设置`Horizontal Spacing`，`Center Vertically`，`Equal Widths`和`Equal Heights`，蓝色按钮同理

![][2]
### 2.3 设置中间部分View

* 根据ToolBar的y和高度设置中间View的起点y
* 根据底部的y设置中间View的高度
![][3]

## 三 画线功能

### 3.1 功能描述

* 自定义绘制图形的PaintView
* touchesBegin开始时，确定绘制的起点
* touchesMoved时，确定绘制的终点
* 定义绘制线的数组paths，当绘制开始时加入到paths数组中，drawRect时，执行path的stroke方法将线条绘制出来

### 3.2 功能代码

```
//
//  PaintView.m
//  画板-2
//
//  Created by zxc on 2021/4/5.
//

#import "PaintView.h"

@interface PaintView()

@property (nonatomic,strong) UIBezierPath *path;
@property (nonatomic,strong) NSMutableArray *paths;
@end

@implementation PaintView


-(NSMutableArray *)paths
{
    if (_paths==nil) {
        _paths=[NSMutableArray array];
    }
    return  _paths;
}

//确定起点
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //创建路径
    UIBezierPath *path=[UIBezierPath bezierPath];
    _path=path;
    [self.paths addObject:path];
    //获取触摸点
    CGPoint pos=[self pointWithTouches:touches];
    //确定起点
    [path moveToPoint:pos];
}

-(CGPoint)pointWithTouches:(NSSet *)touches
{
    UITouch *touch=[touches anyObject];
    return [touch locationInView:self];
}
//确定终点
- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //获取触摸点
    CGPoint pos=[self pointWithTouches:touches];
    [_path addLineToPoint:pos];
    //重绘
    [self setNeedsDisplay];
    
}

// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
    
    for (UIBezierPath *path in self.paths) {
        [path stroke];
    }
}

@end
```

### 3.3 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-line-toolbar-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-line-bottom-button-align.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-line-layout-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-line-func-view.gif

