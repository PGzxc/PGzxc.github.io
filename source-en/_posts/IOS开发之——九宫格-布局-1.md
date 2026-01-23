---
title: IOS开发之——九宫格-布局(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 478ea30b
date: 2020-05-28 22:51:58
---
## 一 概述

本文介绍在OC代码中实现九宫格布局

<!--more-->

## 二 效果图

![][1]

## 三 代码
### 3.1 OC模式下(ViewController.m)

```
#import "ViewController.h"
//九宫格常量
#define kAppViewW 80 //宽
#define kAppViewH 90 //高
#define kColCount 3 //列
#define kStartY 20

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //九宫格界面
    CGFloat marginX=(self.view.bounds.size.width-kColCount*kAppViewW)/(kColCount+1);
    CGFloat marginY=10;
    
    for (int i=0; i<10; i++) {
        //行
        // 0，1，2 ->0
        //3,4,5->1
        int row=i/kColCount;
        //列
        //0,3,6->0
        //1,4,7->1
        //2,5,8->2
        int col=i%kColCount;
        CGFloat x=marginX+col*(marginX+kAppViewW);
        CGFloat y=kStartY+ marginY+row*(marginY+kAppViewH);
        
        UIView *appView=[[UIView alloc]initWithFrame:CGRectMake(x, y, kAppViewW, kAppViewH)];
        appView.backgroundColor=[UIColor redColor];
        [self.view addSubview:appView];
    }
}
@end
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-jiugongge-view.png