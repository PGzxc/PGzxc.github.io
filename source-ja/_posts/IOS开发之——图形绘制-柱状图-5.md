---
title: IOS开发之——图形绘制-柱状图(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: ad1556e9
date: 2021-01-04 09:14:01
---
## 一 概述

* 按照1:1:2的份额划分区域(25:25:50)
* 分别计算3个柱状图的高度(h)，宽度(w)，横坐标(x)，及纵坐标(y)
* 绘制柱状图，并给柱状图设置不同的颜色
* 点击视图，柱状图切换颜色

<!--more-->

## 二 逻辑功能说明
![][1]

```
H=viewH*25/100.0
w=viewW/(2*count-1)
x=2*w*i
y=viewH-H
```

## 三 功能实现

### 3.1 代码

#### BarView

```
#import "BarView.h"
#import "UIColor+RandomColor.h"
@implementation BarView
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
    NSArray *data=@[@25,@25,@50];
    int count=data.count;
    CGFloat w=rect.size.width/(2*count-1);
    CGFloat h=0;
    CGFloat x=0;
    CGFloat y=0;
    CGFloat viewH=rect.size.height;
    //1.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    for (int i=0;i<count;i++) {
        h=viewH*[data[i]intValue]/100.0;
        x=2*w*i;
        y=viewH-h;
        //2.拼接路径
        UIBezierPath *path=[UIBezierPath bezierPathWithRect:CGRectMake(x, y, w, h)];
        //3.添加路径到上下文
        CGContextAddPath(ctx,path.CGPath);
        [[UIColor randomColor]set];
        //4.渲染
        CGContextFillPath(ctx);
    }
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self setNeedsDisplay];
}
@end
```

#### UIColor+RandomColor

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



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-bar-explain.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-bar.gif