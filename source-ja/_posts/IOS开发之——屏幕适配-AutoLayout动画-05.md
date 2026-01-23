---
title: IOS开发之——屏幕适配-AutoLayout动画(05)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 屏幕适配
abbrlink: 604f080a
date: 2022-03-30 08:30:24
---
## 一 概述

* 通过参数传值设置AutoLayout的边距
* AutoLayout动画示例

<!--more-->

## 二 通过参数传值设置AutoLayout的边距

### 2.1 修改前

```
NSArray *blueViewConsH= [NSLayoutConstraint constraintsWithVisualFormat:@"H:|-20-[blueView]-20-|" options:0 metrics:nil views:@{@"blueView":blueView}];
[self.view addConstraints:blueViewConsH];
```

### 2.2 设置margin参数

```
int margin=20;
//水平方向-设置蓝色View距离左边和右边20间距，设置X和宽度
NSArray *blueViewConsH= [NSLayoutConstraint constraintsWithVisualFormat:@"H:|-margin-[blueView]-margin-|" options:0 metrics:@{@"margin":@(margin)} views:@{@"blueView":blueView}];
[self.view addConstraints:blueViewConsH];
```

说明：

* constraintsWithVisualFormat中设置使用margin参数
* metrics中为margin赋值
* 显示效果相同

## 三 AutoLayout动画示例

### 3.1 布局文件

Autolayout约束说明：

* 设置宽高都为80
* 设置距离左边距0，距离上边距50
* 代码中获取左边距leftCons，上边就topCons

### 3.2 代码

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *leftCons;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *topCons;

@end

@implementation ViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //1.修改约束值
    self.leftCons.constant+=100;
    self.topCons.constant+=100;
    
    //2.让View上的约束执行动画
    [UIView animateWithDuration:5 animations:^{
        [self.view layoutIfNeeded];
    }];
}
@end
```

### 3.3 效果图
![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-05-autolayout-view.gif