---
title: IOS开发之——动画-图标抖动(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 225fd2eb
date: 2021-06-02 09:22:37
---
## 一 概述

* 模仿删除应用时的图标抖动
* 页面上添加图片，勾选属性User Interaction Enabled，给图片设置长按事件，并执行抖动动画
* 图标抖动时，先往左旋转5度，再向右旋转5度，再向左旋转5度恢复原位置，再重新开始

<!--more-->

## 二 过程

### 2.1 Main.storyboard中添加动画，并设置User Interaction Enabled

```
User Interaction Enabled
```

### 2.2 定义旋转角度

```
#define angle2radian(x) ((x)/180.0*M_PI)
```

### 2.3 长按事件

```
UILongPressGestureRecognizer *longPress=[[UILongPressGestureRecognizer alloc]initWithTarget:self action:@selector(longPress:)];

-(void)longPress:(UILongPressGestureRecognizer *)longPress
{
    if (longPress.state==UIGestureRecognizerStateBegan) {
        CAKeyframeAnimation *anim=[CAKeyframeAnimation animation];
        anim.keyPath=@"transform.rotation";
        anim.values=@[@(angle2radian(-5)),@(angle2radian(5)),@(angle2radian(-5))];
        anim.repeatCount=MAXFLOAT;
        anim.duration=0.5;
        [_imageView.layer addAnimation:anim forKey:nil];
    }
}
```

### 2.4 ImageView添加长按事件

```
[_imageView addGestureRecognizer:longPress];
```

### 2.5 代码

```
- (void)viewDidLoad {
    [super viewDidLoad];
    UILongPressGestureRecognizer *longPress=[[UILongPressGestureRecognizer alloc]initWithTarget:self action:@selector(longPress:)];
    [_imageView addGestureRecognizer:longPress];
    
}
-(void)longPress:(UILongPressGestureRecognizer *)longPress
{
    if (longPress.state==UIGestureRecognizerStateBegan) {
        CAKeyframeAnimation *anim=[CAKeyframeAnimation animation];
        anim.keyPath=@"transform.rotation";
        anim.values=@[@(angle2radian(-5)),@(angle2radian(5)),@(angle2radian(-5))];
        anim.repeatCount=MAXFLOAT;
        anim.duration=0.5;
        [_imageView.layer addAnimation:anim forKey:nil];
    }
}
```

### 2.6 效果图

![][1]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-animal-shake.gif