---
title: IOS开发之——手势解锁-圆的连线(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: f21e4847
date: 2021-02-25 22:20:05
---
## 一 概述

* 手指在屏幕上滑动时，确定经过的圆点，保存到集合中
* 已经过的圆集合中第一个点作为划线的起始点
* 按照圆集合中的顺序将圆连接起来
* 设置连线的颜色及半径

<!--more-->

## 二 功能实现

### 2.1 功能代码(LockView.m)

#### 圆的集合

```
@interface LockView()
@property (nonatomic,strong) NSMutableArray *btns;
@end
- (NSMutableArray *)btns
{
    if (_btns==nil) {
        _btns=[NSMutableArray array];
    }
    return _btns;
}
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
     [_btns addObject:btn];
}
- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
 [_btns addObject:btn];
}
```

#### 起点及线绘制及特性

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    UIBezierPath *path=[UIBezierPath bezierPath];
    for (int i=0; i<self.btns.count; i++) {
        UIButton *btn=_btns[i];
        if (i==0) {
            [path moveToPoint:btn.center];
        }else{
            [path addLineToPoint:btn.center];
        }  
    }
    //所有选中按钮之间都连线
    //连接多余的那条线
    //[path addLineToPoint:_moveP];
    [[UIColor greenColor]set];
    path.lineWidth=8;
    path.lineJoinStyle=kCGLineCapRound;
    //渲染到视图
    [path stroke];
}
```

#### 重绘

```
- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
		//重绘
    [self setNeedsDisplay];
}
```

## 三 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-unlock-touch-yuan-line.gif