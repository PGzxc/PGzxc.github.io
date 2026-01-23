---
title: IOS开发之——图形绘制-图片水印(10)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: eee4461c
date: 2021-01-11 08:44:33
---
## 一 概述

* 绘制图形上下文
* 绘制图片
* 绘制水印文字
* 根据绘制上下文，将图片和水印文字生成绘制水印图片

<!--more-->

## 二 功能开发

```
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //开启上下文
    //size新的图片大小
    //opaque： YES 不透明 NO 透明
    UIImage *oldImage=[UIImage imageNamed:@"img"];
    
    UIGraphicsBeginImageContextWithOptions(oldImage.size, NO, 0.0);
    [oldImage drawAtPoint:CGPointZero];
    NSString *text=@"图片水印！";
    NSDictionary *dict=@{
        NSFontAttributeName:[UIFont systemFontOfSize:15],
        NSForegroundColorAttributeName:[UIColor redColor]
        
    };
    
    [text drawAtPoint:CGPointMake(10, 10) withAttributes:dict];
    //获取新的图片
    UIImage *newImage=UIGraphicsGetImageFromCurrentImageContext();
    //关闭上下文
    UIGraphicsEndImageContext();
    _imageView.image=newImage;
    
    //保存图片到桌面
    //把图片转换成png格式的二进制
    NSData *data = UIImagePNGRepresentation(newImage);
    [data writeToFile:@"/Users/zxc/Desktop/newImage.png" atomically:YES];
    
}
```

## 三 效果图

### 绘制前

![][1]
### 绘制后
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-watermark-img.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-watermater-after.png