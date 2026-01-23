---
title: IOS开发之——多线程-线程间通信(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 9a24588
date: 2022-02-22 09:02:46
---
## 一 概述

* 线程间通信概念
* 线程间通信常用方法
* 线程间通信示例——子线程下载主线程显示

<!--more-->

## 二 线程间通信概念

### 2.1 什么叫做线程间通信

在1个进程中，线程往往不是独立存在的，多个线程之间需要经常进行通信

### 2.2 线程间通信的体现

* 1个线程传递数据给另一个线程
* 在1个线程中执行特定任务后，转到另1个线程继续执行任务

## 三 线程间通信常用方法

```
-(void)performSelectorOnMainThread:(SEL)aSelector withObject:(id)arg waitUntilDone:(BOOl)wait;
-(void)performSelector:(SEL)aSelector onThread:(NSThread*)thr withObject:(id)arg waitUntilDone:(BOOL)wait;
```

## 四 线程间通信示例——子线程下载主线程显示

### 4.1 过程描述

* 将网络图片地址包装成URL
* 将包含图片的URL转换成二进制数据NSData
* 设置图片
* 回到主线程，刷新UI界面

### 4.2 代码

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIImageView *imageView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self performSelectorInBackground:@selector(download) withObject:nil];
}
//下载图片
-(void)download{
    NSLog(@"download----%@",[NSThread currentThread]);
    //1.图片地址
    NSString *urlString=@"https://img1.baidu.com/it/u=2519912129,4264910682&fm=253&fmt=auto&app=138&f=JPEG";
    NSURL *url=[NSURL URLWithString:urlString];
    //2.根据地址下载图片的二进制数据
    NSLog(@"---begin");
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSLog(@"---end");
    //3.设置图片
    UIImage *image=[UIImage imageWithData:data];
    //4.回到主线程，刷新ui界面
    //self.imageView.image=image;
    //[self performSelectorOnMainThread:@selector(downloadFinished:) withObject:image waitUntilDone:YES];
    //[self performSelector:@selector(downloadFinished:) onThread:[NSThread mainThread] withObject:image waitUntilDone:YES];
    [self.imageView performSelectorOnMainThread:@selector(setImage:) withObject:image waitUntilDone:NO];
}
-(void)downloadFinished:(UIImage *)image{
    self.imageView.image=image;
    NSLog(@"downloadFinished----%@",[NSThread currentThread]);
}
@end
```

### 4.3 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-thread-communite-sample.gif