---
title: IOS开发之——图形绘制-绘制雪花(8)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: dc93d260
date: 2021-01-07 09:02:27
---
## 一 概述

本文通过自定义View，实现下雪的效果

* 刚开始时，雪花位于屏幕原点(左上角)
* 每隔0.1s，雪花的高度增加5向下移动
* 到达屏幕底部时，重新回到屏幕原点(左上角)

<!--more-->

## 二 功能实现

### 2.1 设置雪花移动的高度

```
@interface MyView ()
@property (nonatomic,assign) CGFloat snowY;
@end
```

### 2.2 绘制雪花降落时的偏移

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    _snowY+=5;
    UIImage *image=[UIImage imageNamed:@"雪花"];
    [image drawAtPoint:CGPointMake(0, _snowY)];
    //[image drawAtPoint:CGPointZero];
    if (_snowY>=520) {
        _snowY=0;
    }
}
```

### 2.3 视图加载后间隔0.1s绘制图形

#### 2.3.1 定时功能绘制

##### 代码

```
[NSTimer scheduledTimerWithTimeInterval:0.1 target:self selector:@selector(setNeedsDisplay) userInfo:nil repeats:YES];
```

##### 效果图(有卡顿)

![][1]

#### 2.3.2 屏幕刷新时绘制
##### 代码

```
- (void)awakeFromNib
{
 	//屏幕刷新的时候调用
	CADisplayLink *link=[CADisplayLink displayLinkWithTarget:self selector:@selector(setNeedsDisplay)];
	[link addToRunLoop:[NSRunLoop mainRunLoop] forMode:NSDefaultRunLoopMode];
       
}
```

##### 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-snowflake-timer.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-snowflake-refresh.gif