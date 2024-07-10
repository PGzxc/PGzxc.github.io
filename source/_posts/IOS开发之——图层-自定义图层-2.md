---
title: IOS开发之——图层-自定义图层(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: cf9d5176
date: 2021-05-06 09:23:48
---
## 一 概述

* 介绍CALayer的一些概念
* 自定义图层示例

<!--more-->

## 二 概念
### 2.1 CALayer注意事项

* UIKit框架只能在IOS中使用
* QuartzCore框架和CoreGraphics框架可以在IOS和Mac OS上使用
* UIColor，UIImage是定义在UIKit框架中的
* UIImageRef，CGColorRef是定义在QuartzCore中的

### 2.2 UIView和CALayer的选择

* 通过CALayer就能做出跟UIView一样的界面效果

#### 即然CALayer和UIView都能实现相同的显示效果，那究竟该如何选择谁好？

* 其实，对比CALayer，UIView多了一个事件处理的功能。也就是说，CALayer不能处理用户的触摸事件，而UIView可以
* 所以，如果显示出来的东西需要跟用户进行交互的话，用UIView；如果不需要跟用户进行交互，用UIView或者CALayer都可以
* 当然，CALayer的性能会高一些，因为它少了事件处理的功能，更加轻量级

## 三 示例

### 3.1 代码

```
    //创建一个图层
    CALayer *layer=[CALayer layer];
    //设置尺寸
    layer.bounds=CGRectMake(0, 0, 100, 100);
    //设置位置
    layer.position=CGPointMake(100, 100);
    //设置颜色
    layer.backgroundColor=[UIColor redColor].CGColor;
    //设置内容
    layer.contents=(__bridge id _Nullable)([UIImage imageNamed:@"阿狸头像"].CGImage);
    [self.view.layer addSublayer:layer];
```

### 3.2 效果图

![][1]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-calayer-define.png