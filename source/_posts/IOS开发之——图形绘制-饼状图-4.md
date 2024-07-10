---
title: IOS开发之——图形绘制-饼状图(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 94c2437d
date: 2021-01-04 09:11:28
---
## 一 概述

* 按照1:1:2的份额划分圆形
* 开始角度为0度，旋转角度为份额2π(360度)，结束角度为开始角度+旋转角度
* 给每分饼状图设置不同的颜色
* 点击图形，饼状图切换颜色

<!--more-->

## 二 饼状图划分

![][1]

```
startA=0;
angle=25/100.0*M_PI*2;
endA=startA=angle;
```

## 三 功能开发

### 3.1 代码

#### pieView

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    NSArray *data=@[@25,@25,@50];
    //1.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    CGPoint center=CGPointMake(125, 125);
    CGFloat radius=120;
    CGFloat startA=0;
    CGFloat angle=0;
    CGFloat endA=0;
    
    for (NSNumber *number in data) {
        //2.拼接路径
        startA=endA;
        angle=number.intValue/100.0*M_PI*2;
        endA=startA+angle;
        
        UIBezierPath *path=[UIBezierPath bezierPathWithArcCenter:center radius:radius startAngle:startA endAngle:endA clockwise:YES];
        [path addLineToPoint:center];
        [[UIColor randomColor]set];
        //3.把路径添加到上下文
        CGContextAddPath(ctx, path.CGPath);
        //4.渲染
        CGContextFillPath(ctx);
    }
}
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self setNeedsDisplay];
}
```

#### UIColor+RandomColor(随机颜色工具)

```
#import "UIColor+RandomColor.h"

@implementation UIColor (RandomColor)
+(UIColor *)randomColor
{
    CGFloat r=arc4random_uniform(256)/255.0;
    CGFloat g=arc4random_uniform(256)/255.0;
    CGFloat b=arc4random_uniform(256)/255.0;
    return  [UIColor colorWithRed:r green:g blue:b alpha:1];
    
}
@end
```

### 3.2 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-bing-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-bing-preview.gif