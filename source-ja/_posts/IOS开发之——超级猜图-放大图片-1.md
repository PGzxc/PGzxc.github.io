---
title: IOS开发之——超级猜图-放大图片(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: '54904007'
date: 2020-06-17 23:40:49
---
## 一 概述
本文要实现超级猜图程序，包含以下功能：
* 根据图片猜名字，猜对了金币增加进入下一题，猜错了金币减少，并且名字变红
* 提示：提示当前题目的第一个字
* 大图：放大图片，点击其他位置缩小图片
* 下一题：跳过当前题目

<!--more-->

![][1]

## 二 功能演示(大图)
* 点击大图按钮，图片放大，背景变暗
* 点击其他部分，图片缩小到原来大小
![][2]

## 三 代码实现

### 3.1 ViewController.m

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIButton *iconButton;
@property (nonatomic,strong) UIButton *cover;
@end
@implementation ViewController

- (UIButton *)cover
{
    if (_cover==nil) {

        _cover=[[UIButton alloc]initWithFrame:self.view.bounds];
        _cover.backgroundColor=[UIColor colorWithWhite:0.0 alpha:0.5];
        [self.view addSubview:_cover];
        _cover.alpha=0.0;
        [_cover addTarget:self action:@selector(smallImage:) forControlEvents:UIControlEventTouchUpInside];
    }
    return _cover;
}
//放大图片
- (IBAction)bigImage:(UIButton *)sender
{
    //1.添加蒙版(遮罩)
    [self cover];
    //2.将图像按钮放到最前面
    [self.view bringSubviewToFront:self.iconButton];
    //3.动画放大图像按钮
    CGFloat w=self.view.bounds.size.width;
    CGFloat h=w;
    CGFloat y=(self.view.bounds.size.height-h)*0.5;
    [UIView animateWithDuration:1.0f animations:^{
         self.iconButton.frame=CGRectMake(0,y, w, h);
        self.cover.alpha=1.0;
    }];
}

//缩小图片
-(void)smallImage:(UIButton *)cover
{
    //将图像恢复初始位置
    [UIView animateWithDuration:1.0 animations:^{
        self.iconButton.frame=CGRectMake(112, 160, 150, 150);
        cover.alpha=0.0;
    } completion:^(BOOL finished) {
        //删除cover
       //[cover removeFromSuperview];
    }];   
}

@end
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-chaoji-caitu.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-chaoji-caitu-bigimage.gif
