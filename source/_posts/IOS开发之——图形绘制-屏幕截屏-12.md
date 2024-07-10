---
title: IOS开发之——图形绘制-屏幕截屏(12)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 2b3f95c3
date: 2021-01-21 09:38:57
---
## 一 概述

* 在IOS界面上绘制图形
* 获取iOS图层渲染
* 将渲染后的图层截屏(转化流数据保存到电脑桌面上)

<!--more-->

## 二 功能实现

### 2.1 代码功能

```
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //1.开启上下文
    UIGraphicsBeginImageContextWithOptions(self.view.bounds.size, NO, 0.0);
    //2.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    //3.渲染控制器view的图层到上下文，图层只能渲染不能用draw
    [self.view.layer renderInContext:ctx];
    //4.获取截屏图片
    UIImage *newImage=UIGraphicsGetImageFromCurrentImageContext();
    //5.关闭上下文
    UIGraphicsEndImageContext();
    //6.将截图保存到桌面
    NSData *data=UIImagePNGRepresentation(newImage);
    [data writeToFile:@"/Users/zxc/Desktop/cut.png" atomically:YES];  
}
```

### 2.2 截屏效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-screen-cut-view.png