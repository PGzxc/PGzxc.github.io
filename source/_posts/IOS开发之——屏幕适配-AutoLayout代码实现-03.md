---
title: IOS开发之——屏幕适配-AutoLayout代码实现(03)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 屏幕适配
abbrlink: c53565f9
date: 2022-03-28 07:17:29
---
## 一 概述

* 用代码实现AutoLayout的步骤过程
* AutoLayout约束规则
* AutoLayout约束示例

<!--more-->

## 二 用代码实现AutoLayout的过程

### 2.1 实现AutoLayout的过程

* 通过代码创建要进行AutoLayout约束的View
* View.translatesAutoresizingMaskIntoConstraints=**NO**;
* 根据逻辑添加约束方法：constraintWithItem:(id)view1 attribute:(NSLayoutAttribute)attr1....
* 添加约束对象到相应的view上

### 2.2 方法说明

#### 创建约束对象的常用方法

```
+(id)constraintWithItem:(id)view1 attribute:(NSLayoutAttribute)attr1 relatedBy:(NSLayoutRelation)relation toItem:(id)view2 attribute:(NSLayoutAttribute)attr2 multiplier:(CGFloat)multiplier constant:(CGFloat)c;
```

说明：

* view1 ：要约束的控件
* attr1 ：约束的类型（做怎样的约束）
* relation ：与参照控件之间的关系
* view2 ：参照的控件
* attr2 ：约束的类型（做怎样的约束）
* multiplier ：乘数
* c ：常量

自动布局有个核心公式：obj1.property1 =（obj2.property2 * multiplier）+ constant value

#### 添加约束对象到相应的view上

```
- (void)addConstraint:(NSLayoutConstraint *)constraint;
- (void)addConstraints:(NSArray *)constraints;
```

#### 注意点

* 要先禁止autoresizing功能，设置view的下面属性为NO view.translatesAutoresizingMaskIntoConstraints = NO;
* 添加约束之前，一定要保证相关控件都已经在各自的父控件上
* 不用再给view设置frame

## 三 AutoLayout约束规则

在创建约束之后，需要将其添加到作用的view上

在添加时要注意目标view需要遵循以下规则：

### 3.1 对于两个同层级view之间的约束关系，添加到它们的父view上

![][1]

### 3.2 对于两个不同层级view之间的约束关系，添加到他们最近的共同父view上

![][2]

### 3.3 对于有层次关系的两个view之间的约束关系，添加到层次较高的父view上

![][3]

## 四 AutoLayout约束示例

### 4.1 代码

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
    
    //2-添加约束

    /*
     * @Item:==first item，需要约束的条件
     * @attribute：需要设置的约束
     * @relatedBy==relation,等于
     * @toItem=second item,被参考的控件
     * @attribute：需要设置的约束
     * @multiplier：乘以
     * @constant：加上
     */
    //2.1 添加蓝色View距离父控件左边距固定为20--蓝色View的左边等于父控件的左边*1.0+20
    NSLayoutConstraint *blueViewLeft= [NSLayoutConstraint constraintWithItem:blueView attribute:NSLayoutAttributeLeft relatedBy:NSLayoutRelationEqual toItem:self.view attribute:NSLayoutAttributeLeft multiplier:1.0 constant:20];
    [self.view addConstraint:blueViewLeft];
    
    //2.2 添加蓝色View距离父控件右边距固定为20,--蓝色View的右边等于父控件的右边*1.0-20
    NSLayoutConstraint *blueViewRight= [NSLayoutConstraint constraintWithItem:blueView attribute:NSLayoutAttributeRight relatedBy:NSLayoutRelationEqual toItem:self.view attribute:NSLayoutAttributeRight multiplier:1.0 constant:-20];
    [self.view addConstraint:blueViewRight];
    
    //2.3 添加蓝色View距离父控件上边距固定为20，--蓝色View的上边等于父控件的上边*1.0+20
    NSLayoutConstraint *blueViewTop= [NSLayoutConstraint constraintWithItem:blueView attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:self.view attribute:NSLayoutAttributeTop multiplier:1.0 constant:20];
    [self.view addConstraint:blueViewTop];
    
    //2.4 添加蓝色View高度为50，--蓝色View的高度等于50
    NSLayoutConstraint *blueViewHeight= [NSLayoutConstraint constraintWithItem:blueView attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeHeight multiplier:1.0 constant:50];
    [self.view addConstraint:blueViewHeight];
    
    //3-设置红色View
    //3.1 红色View的高度和蓝色View的高度一样 高度--红色View的高度等于红色View的高度
    NSLayoutConstraint *redViewHeight= [NSLayoutConstraint constraintWithItem:redView attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:blueView attribute:NSLayoutAttributeHeight multiplier:1.0 constant:0];
    [self.view addConstraint:redViewHeight];
    
    //3.2 红色的右边和蓝色的右边对齐 x-红色View的右边等于红色View的右边
    NSLayoutConstraint *redViewRight= [NSLayoutConstraint constraintWithItem:redView attribute:NSLayoutAttributeRight relatedBy:NSLayoutRelationEqual toItem:blueView attribute:NSLayoutAttributeRight multiplier:1.0 constant:0];
    [self.view addConstraint:redViewRight];
    //3.3 红色的顶部和蓝色的地步距离固定 y-红色View的顶部等于红色View的底部+20
    NSLayoutConstraint *redViewTop= [NSLayoutConstraint constraintWithItem:redView attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:blueView attribute:NSLayoutAttributeBottom multiplier:1.0 constant:20];
    [self.view addConstraint:redViewTop];
    //3.4 红色的宽度等于蓝色宽度的一般 宽度-红色View的宽度等于红色View的宽度*0.5
    NSLayoutConstraint *redViewWidth= [NSLayoutConstraint constraintWithItem:redView attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:blueView attribute:NSLayoutAttributeWidth multiplier:0.5 constant:0];
    [self.view addConstraint:redViewWidth];
       
}
@end
```

### 4.2 效果图

|  竖屏  |  横屏  |
| :----: | :----: |
| ![][4] | ![][5] |




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-03-rule-01.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-03-rule-02.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-03-rule-03.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-03-view-vertical.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-adapter-03-view-horizon.png