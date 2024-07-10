---
title: IOS开发之——屏幕适配- VFL语言(04)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 屏幕适配
abbrlink: 1f45968c
date: 2022-03-29 08:58:02
---
## 一 概述

* 什么是VFL
* VFL如何使用
* VFL用法说明
* VFL示例

<!--more-->

## 二 什么是VFL

* VFL全称是Visual Format Language，翻译过来是“可视化格式语言”
* VFL是苹果公司为了简化Autolayout的编码而推出的抽象语言
* VFL描述的界面如下所示

![][1]

## 三 VFL如何使用

### 3.1 VFL约束使用过程

* 使用代码创建布局View
* 给View设置`View.translatesAutoresizingMaskIntoConstraints=NO`
* 设置约束`(NSArray *)constraintsWithVisualFormat`
* 添加约束`[self.view addConstraints:ViewConsV]`

### 3.2 方法说明

```
+ (NSArray *)constraintsWithVisualFormat:(NSString *)format options:(NSLayoutFormatOptions)opts metrics:(NSDictionary *)metrics views:(NSDictionary *)views;
```

说明：

* opts ：约束类型(一般可以传0)
* metrics ：VFL语句中用到的具体数值
* views ：VFL语句中用到的控件

## 四 VFL用法说明

### 4.1 用法一

```
H:[cancelButton(72)]-12-[acceptButton(50)]
```

canelButton宽72，acceptButton宽50，它们之间间距12

### 4.2 用法二

```
H:[wideView(>=60@700)]
```

wideView宽度大于等于60point，该约束条件优先级为700（优先级最大值为1000，优先级越高的约束越先被满足）

### 4.3 用法三

```
V:[redBox]-[yellowBox(==redBox)]
```

竖直方向上，先有一个redBox，其下方紧接一个高度等于redBox高度的yellowBox

### 4.4 用法四

```
H:|-10-[Find]-[FindNext]-[FindField(>=20)]-|
```

水平方向上，Find距离父view左边缘默认间隔宽度，之后是FindNext距离Find间隔默认宽度；再之后是宽度不小于20的FindField，它和FindNext以及父view右边缘的间距都是默认宽度。（竖线“|” 表示superview的边缘）

## 五 VFL示例

### 5.1 代码

```
#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    //1-添加两个控件到父空间上
    //1.1-蓝色View
    UIView *blueView=[[UIView alloc]init];
    blueView.backgroundColor=[UIColor blueColor];
    [self.view addSubview:blueView];
    blueView.translatesAutoresizingMaskIntoConstraints=NO;
    
    //1.2-红色View
    UIView *redView=[[UIView alloc]init];
    redView.backgroundColor=[UIColor redColor];
    [self.view addSubview:redView];
    redView.translatesAutoresizingMaskIntoConstraints=NO;
    
    //2-添加VF约束
    //Format:VF语句
    //options：条件
    //metrics：VF语句中用到的变量
    //views：VF语句中用到的控件
    
    //水平方向-设置蓝色View距离左边和右边20间距，设置X和宽度
    NSArray *blueViewConsH= [NSLayoutConstraint constraintsWithVisualFormat:@"H:|-20-[blueView]-20-|" options:0 metrics:nil views:@{@"blueView":blueView}];
    [self.view addConstraints:blueViewConsH];
    
    //垂直方向-设置蓝色View距离顶部有20间距并且高为50，设置y和高度
    //红色View距离蓝色View有20间距，并且高度与蓝色View相同：相当于Y和高度
    //并且设置红色View和蓝色View右对齐
    NSArray *blueViewConsV= [NSLayoutConstraint constraintsWithVisualFormat:@"V:|-20-[blueView(50)]-20-[redView(==blueView)]" options:NSLayoutFormatAlignAllRight metrics:nil views:@{@"blueView":blueView,@"redView":redView}];
    [self.view addConstraints:blueViewConsV];
    
    //设置红色View和蓝色View高度相同：宽度，X
    //VFL语句中，不支持乘除法
//    NSArray *redViewConsH=[NSLayoutConstraint constraintsWithVisualFormat:@"H:[redView(==blueView)]" options:0 metrics:nil views:@{@"blueView":blueView,@"redView":redView}];
//    [self.view addConstraints:redViewConsH];
    
    NSLayoutConstraint *redViewConsW=[NSLayoutConstraint constraintWithItem:redView attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:blueView attribute:NSLayoutAttributeWidth multiplier:0.5 constant:0];
    [self.view addConstraint:redViewConsW];
}
@end
```

### 5.2 效果图

|  竖屏  |  横屏  |
| :----: | :----: |
| ![][2] | ![][3] |




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-04-vfl-ui.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-04-vfl-vertical.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-04-vfl-horizon.png