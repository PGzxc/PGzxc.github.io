---
title: IOS开发之——图形绘制-文字和图像(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: f7ef6bab
date: 2021-01-05 09:03:52
---
## 一 概述

* 自定义图形，绘制文字
* 自定义图形，绘制图像

<!--more-->

## 二 绘制文字

### 2.1 代码文件

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    NSString *text=@"hello world";
    CGRect textFrame=CGRectMake(0, 0, 250, 250);
    NSDictionary *dict=@{
        NSFontAttributeName:[UIFont systemFontOfSize:40],
        NSForegroundColorAttributeName:[UIColor redColor],
        NSStrokeWidthAttributeName:@10
    };
    //UIRectFill(textFrame);
    //[text drawInRect:textFrame withAttributes:dict];
    [text drawAtPoint:CGPointZero withAttributes:dict];
    
}
```

### 2.2 代码说明

* UIRectFill：绘制矩形区域
* `text drawInRect`：绘制文字时，会自动换行
* `text drawAtPoint`：绘制文字时，不会自动换行

### 2.3 效果图

![][1]

## 三 绘制图像

### 3.1 一般绘制

#### 代码

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    UIImage *image=[UIImage imageNamed:@"dog"];
    [image drawAtPoint:CGPointZero];
    //[image drawInRect:CGRectMake(0, 0, 100, 100)];
 }   
```

#### 效果图
![][2]

### 3.2 平铺和裁剪
#### 代码

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    UIRectClip(CGRectMake(0, 0, 100, 100)); //裁剪大小
    UIImage *pImage=[UIImage imageNamed:@"dog"];
    [pImage drawAsPatternInRect:rect]; 
}
```

#### 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-text.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-image-normal.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-image-cut.png

