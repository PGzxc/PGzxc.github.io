---
title: IOS开发之——图片的动画
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: de9adc42
date: 2020-05-15 23:39:54
---
## 一 概述

本文介绍与图片相关的动画：

* 位移动画：上下左右移动
* 缩放动画：放大与缩小
* 旋转动画：正旋转与反选择

<!--more-->

## 二 效果图

![][1]
## 三 代码

### 3.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIButton *iconButton;
@property (nonatomic,assign) CGFloat delta;

@end
typedef enum
{
    moveDirTop=11,
    moveDirLeft=12,
    moveDirBottom=13,
    moveDirRight=14
    
}moveDirect;
#define moveDelta 20;
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (IBAction)zoomWithFrame:(UIButton *)button
{
    CGRect frame=self.iconButton.frame;
    if(button.tag)
    {
        frame.size.width+=20;
        frame.size.height+=20;
        NSLog(@"放大");
    }else{
        frame.size.width-=20;
        frame.size.height-=20;
         NSLog(@"缩小");
    }
    self.iconButton.frame=frame;
}
//缩放按钮功能
- (IBAction)zoom:(UIButton *)button
{
    CGFloat scale=(button.tag)?1.2:0.8;
    self.iconButton.transform=CGAffineTransformScale(self.iconButton.transform, scale, scale);

}
//旋转按钮功能
- (IBAction)rotate:(UIButton *)button
{
    CGFloat angle=(button.tag)? -M_PI_4 : M_PI_4;
    self.iconButton.transform=CGAffineTransformRotate(self.iconButton.transform, angle);
}


- (IBAction)move:(UIButton *)button
{
    CGFloat dx=0,dy=0;
    switch (button.tag) {
        case moveDirTop:
            dy=-20;
            break;
            case moveDirLeft:
            dx=-20;
            break;
            case moveDirBottom:
           dy=20;
            break;
            case moveDirRight:
           dx=20;
            break;
        default:
            break;
    }
    self.iconButton.transform=CGAffineTransformTranslate(self.iconButton.transform, dx, dy);
  
}
- (IBAction)demo:(UIButton *)button
{
   CGRect frame= self.iconButton.frame;
    switch (button.tag) {
        case moveDirTop:
            frame.origin.y-=moveDelta;
            break;
            case moveDirLeft:
            frame.origin.x-=moveDelta;
            break;
            case moveDirBottom:
            frame.origin.y+=moveDelta;
            break;
            case moveDirRight:
            frame.origin.x+=moveDelta;
            break;
        default:
            break;
    }
    self.iconButton.frame=frame;
}
@end
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-animal-move-suofang.gif