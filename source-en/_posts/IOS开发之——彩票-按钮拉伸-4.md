---
title: IOS开发之——彩票-按钮拉伸(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 24150c3c
date: 2022-02-07 09:46:15
---
## 一 概述

* UIImageView背景图片拉伸设置
* UIButton背景图片拉伸设置

<!--more-->

## 二 拉伸Strecthing属性说明

### 2.1 拉伸属性

![][1]

### 2.2 说明

* x：左边多少不被拉伸(如：左边一半不被拉伸0.5)
* y：顶部多少不被拉伸(如：顶部一半不被拉伸0.5)
* Width：宽度拉伸多少像素(比如：拉伸一个像素0.0001,通常写为0)
* Height：高度拉伸多少像素(比如：拉伸一个像素0.0001,通常写为0)

## 三 UIImageView背景图片拉伸设置

### 3.1 给UIImageView设置图片拉伸

* Content Model：Scale To Fill
* Stretching：x(0.5),y(0.5),Width(0),Height(0)

### 3.2 效果图
![][2]

## 四 UIButton背景图片拉伸设置

### 4.1 在Storyboard中设置Stretching(无效)
![][3]

### 4.2 通过代码设置Stretching(有效)

#### 自定义给Button拉伸的UIImage

```
#import "UIImage+Tools.h"

@implementation UIImage (Tools)

+(instancetype)imageWithResizabelImageName:(NSString *)imageName
{
    //设置Button的背景图片
    UIImage *image=[UIImage imageNamed:imageName];
    image= [image stretchableImageWithLeftCapWidth:image.size.width*0.5 topCapHeight:image.size.height*0.5];
    return image;
}
@end
```

#### 给Button设置拉伸图片

```
[_loginButton setBackgroundImage:[UIImage imageWithResizabelImageName:@"RedButton"] forState:UIControlStateNormal];

 [_loginButton setBackgroundImage:[UIImage imageWithResizabelImageName:@"RedButtonPressed"] forState:UIControlStateHighlighted];
```

### 4.3 效果图
![][4]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-stretching-property.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-stretching-image-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-stretching-image-storyboard.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-stretching-image-code.png