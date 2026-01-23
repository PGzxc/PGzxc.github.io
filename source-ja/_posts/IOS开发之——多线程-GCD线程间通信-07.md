---
title: IOS开发之——多线程- GCD线程间通信(07)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 95f1f301
date: 2022-02-23 08:49:17
---
## 一 概述

* 之前讲述过子线程下载完成后通过performSelectorOnMainThread将结果发送到主线程显示
* 本例介绍GCD方式实现线程间通信

<!--more-->

## 二 GCD线程间通信过程

* 在touchesBegan点击事件中通过dispatch_sync开启线程下载图片
* 将图片链接包装成NSURL
* NSData dataWithContentsOfURL将url转换为NSData
* [UIImage imageWithData:data];将data转换为UIImage
*  dispatch_async发送到主线程显示图片

## 三 示例

### 3.1 代码

```
#define GlobalQueue   dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0)
#define MainQueue   dispatch_get_main_queue()
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIButton *button;

@end

@implementation ViewController

//需要设置按钮的image和backgroundImage，建议先把按钮类型改为custom，才能保证设置成功
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    dispatch_sync(GlobalQueue, ^{
        //1-子线程下载图片
        NSURL *url=[NSURL URLWithString:@"https://img1.baidu.com/it/u=2519912129,4264910682&fm=253&fmt=auto&app=138&f=JPEG"];
        NSData *data=[NSData dataWithContentsOfURL:url];
        UIImage *image=[UIImage imageWithData:data];
        //2-回到主线程设置图片
        dispatch_async(MainQueue, ^{
            [self.button setImage:image forState:UIControlStateNormal];
        });
    });
}
@end
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-gcd-thread-commit.gif