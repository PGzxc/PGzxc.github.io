---
title: IOS开发之——TOM猫
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 9f6ad617
date: 2020-05-20 22:37:16
---
## 一 概述

本文介绍TOM的简单开发示例，涉及到的知识点：

* 点击某个区域或按钮执行动画
* 多图及大图加载时的内存分配与释放

<!--more-->

## 二 效果图

![][1]

## 三 布局
* View中有UIImageView(要执行动画)和UIButton(鸟)和UIButton(头部)
* 其中UIButton(鸟)中设置的text为eat(与要执行的动画开始名字相同)和tag(30与动画个数相同)
* 其中UIButton(头部)中设置的text为knockout(与要执行的动画开始名字相同)和tag(81与动画个数相同)


## 四 代码

### 四.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIImageView *tom;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
- (IBAction)tomAction:(UIButton *)sender
{
    [self tomAnimationWithName:sender.currentTitle count:sender.tag];
}
- (void)tomAnimationWithName:(NSString *)name count:(NSInteger)count
{
    if([self.tom isAnimating]) return;
    NSMutableArray *arrayM=[NSMutableArray array];
    for (int i=0; i<count; i++) {
        NSString *imageName=[NSString stringWithFormat:@"%@_%02d.jpg",name,i];
        UIImage *image=[UIImage imageNamed:imageName];
        //NSString *path=[[NSBundle mainBundle] pathForResource:imageName ofType:nil];
        //UIImage *image=[UIImage imageWithContentsOfFile:path];
        [arrayM addObject:image];
    }
    //设置动画
    self.tom.animationImages=arrayM;
    //设置重复次数
    self.tom.animationRepeatCount=1;
    //设置动画时长
    self.tom.animationDuration=self.tom.animationImages.count*0.075;
    //开始动画
    [self.tom startAnimating];
    //ji结束后释放内存
    [self.tom performSelector:@selector(setAnimationImages:) withObject:nil afterDelay:self.tom.animationDuration];
}
@end

```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tom-cat-animal.gif