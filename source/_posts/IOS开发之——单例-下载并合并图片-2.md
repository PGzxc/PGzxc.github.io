---
title: IOS开发之——单例-下载并合并图片(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 单例
abbrlink: 4a3613d3
date: 2022-02-24 09:10:53
---
## 一 概述

* 下载合并图片——串行方式
* 下载合并图片——并行方式
* 下载合并图片——队列组

<!--more-->

## 二 过程

两张图片均为网络图片，下面是过程

* 分别下载2张图片：大图片、LOGO
* 合并2张图片
* 显示到一个ImageView身上

## 三 下载合并图片——串行方式

```
- (void)test1
{
    // 异步下载
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        // 1.下载第1张
        NSURL *url1 = [NSURL URLWithString:@"http://g.hiphotos.baidu.com/image/pic/item/f2deb48f8c5494ee460de6182ff5e0fe99257e80.jpg"];
        NSData *data1 = [NSData dataWithContentsOfURL:url1];
        UIImage *image1 = [UIImage imageWithData:data1];
        
        // 2.下载第2张
        NSURL *url2 = [NSURL URLWithString:@"http://su.bdimg.com/static/superplus/img/logo_white_ee663702.png"];
        NSData *data2 = [NSData dataWithContentsOfURL:url2];
        UIImage *image2 = [UIImage imageWithData:data2];
        
        // 3.合并图片
        // 开启一个位图上下文
        UIGraphicsBeginImageContextWithOptions(image1.size, NO, 0.0);
        
        // 绘制第1张图片
        CGFloat image1W = image1.size.width;
        CGFloat image1H = image1.size.height;
        [image1 drawInRect:CGRectMake(0, 0, image1W, image1H)];
        
        // 绘制第2张图片
        CGFloat image2W = image2.size.width * 0.5;
        CGFloat image2H = image2.size.height * 0.5;
        CGFloat image2Y = image1H - image2H;
        [image2 drawInRect:CGRectMake(0, image2Y, image2W, image2H)];
        
        // 得到上下文中的图片
        UIImage *fullImage = UIGraphicsGetImageFromCurrentImageContext();
        
        // 结束上下文
        UIGraphicsEndImageContext();
        
        // 4.回到主线程显示图片
        dispatch_async(dispatch_get_main_queue(), ^{
            self.imageView.image = fullImage;
        });
    });
}
```

## 四 下载合并图片——并行方式

```
@interface HMViewController ()
@property (weak, nonatomic) IBOutlet UIImageView *imageView;
@property (nonatomic, strong) UIImage *image1;
@property (nonatomic, strong) UIImage *image2;
@end

- (void)test2
{
    // 异步下载
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        // 1.下载第1张
        NSURL *url1 = [NSURL URLWithString:@"http://g.hiphotos.baidu.com/image/pic/item/f2deb48f8c5494ee460de6182ff5e0fe99257e80.jpg"];
        NSData *data1 = [NSData dataWithContentsOfURL:url1];
        self.image1 = [UIImage imageWithData:data1];
        
        [self bindImages];
    });
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        // 2.下载第2张
        NSURL *url2 = [NSURL URLWithString:@"http://su.bdimg.com/static/superplus/img/logo_white_ee663702.png"];
        NSData *data2 = [NSData dataWithContentsOfURL:url2];
        self.image2 = [UIImage imageWithData:data2];
        
        [self bindImages];
    });
}

- (void)bindImages
{
    if (self.image1 == nil || self.image2 == nil) return;
    
    // 3.合并图片
    // 开启一个位图上下文
    UIGraphicsBeginImageContextWithOptions(self.image1.size, NO, 0.0);
    
    // 绘制第1张图片
    CGFloat image1W = self.image1.size.width;
    CGFloat image1H = self.image1.size.height;
    [self.image1 drawInRect:CGRectMake(0, 0, image1W, image1H)];
    
    // 绘制第2张图片
    CGFloat image2W = self.image2.size.width * 0.5;
    CGFloat image2H = self.image2.size.height * 0.5;
    CGFloat image2Y = image1H - image2H;
    [self.image2 drawInRect:CGRectMake(0, image2Y, image2W, image2H)];
    
    // 得到上下文中的图片
    UIImage *fullImage = UIGraphicsGetImageFromCurrentImageContext();
    
    // 结束上下文
    UIGraphicsEndImageContext();
    
    // 4.回到主线程显示图片
    dispatch_async(dispatch_get_main_queue(), ^{
        self.imageView.image = fullImage;
    });
}
```

## 五 下载合并图片——队列组

```
- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    // 1.队列组
    dispatch_group_t group = dispatch_group_create();
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    
    // 2.下载图片1
    __block UIImage *image1 = nil;
    dispatch_group_async(group, queue, ^{
        NSURL *url1 = [NSURL URLWithString:@"http://g.hiphotos.baidu.com/image/pic/item/f2deb48f8c5494ee460de6182ff5e0fe99257e80.jpg"];
        NSData *data1 = [NSData dataWithContentsOfURL:url1];
        image1 = [UIImage imageWithData:data1];
    });
    
    // 3.下载图片2
    __block UIImage *image2 = nil;
    dispatch_group_async(group, queue, ^{
        NSURL *url2 = [NSURL URLWithString:@"http://su.bdimg.com/static/superplus/img/logo_white_ee663702.png"];
        NSData *data2 = [NSData dataWithContentsOfURL:url2];
        image2 = [UIImage imageWithData:data2];
    });
    
    // 4.合并图片 (保证执行完组里面的所有任务之后，再执行notify函数里面的block)
    dispatch_group_notify(group, queue, ^{
        // 开启一个位图上下文
        UIGraphicsBeginImageContextWithOptions(image1.size, NO, 0.0);
        
        // 绘制第1张图片
        CGFloat image1W = image1.size.width;
        CGFloat image1H = image1.size.height;
        [image1 drawInRect:CGRectMake(0, 0, image1W, image1H)];
        
        // 绘制第2张图片
        CGFloat image2W = image2.size.width * 0.5;
        CGFloat image2H = image2.size.height * 0.5;
        CGFloat image2Y = image1H - image2H;
        [image2 drawInRect:CGRectMake(0, image2Y, image2W, image2H)];
        
        // 得到上下文中的图片
        UIImage *fullImage = UIGraphicsGetImageFromCurrentImageContext();
        
        // 结束上下文
        UIGraphicsEndImageContext();
        
        // 5.回到主线程显示图片
        dispatch_async(dispatch_get_main_queue(), ^{
            self.imageView.image = fullImage;
        });
    });
}
```

## 六 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-image-download-cover.gif