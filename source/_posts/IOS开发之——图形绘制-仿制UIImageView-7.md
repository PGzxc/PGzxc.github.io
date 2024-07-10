---
title: IOS开发之——图形绘制-仿制UIImageView(7)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 1b7041db
date: 2021-01-05 09:06:03
---
## 一 概述

* 自定义UIImageView，实现设置图片并显示
* 点击图片，切换到另一张显示

<!--more-->

## 二 自定义UIImageView，实现设置图片并显示

### 2.1 一般图片的显示设置

```
UIImageView *imgV=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 200, 200)];
imgV.image=[UIImage imageNamed:@"dog"];
[self.view addSubview:imgV];
```

### 2.2 自定义UIImageView

#### MyImageView.h

```
@interface MyImageView : UIView
@property (nonatomic,strong) UIImage *image;
@end
```

#### MyImageView.m

```
#import "MyImageView.h"
@implementation MyImageView
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
    [_image drawInRect:rect];
}
- (void)setImage:(UIImage *)image
{
    _image=image;
    [self setNeedsDisplay];
}
@end
```

#### 加载图片

```
- (void)viewDidLoad {
    [super viewDidLoad]; 
    MyImageView *imgV=[[MyImageView alloc]initWithFrame:CGRectMake(0, 0, 200, 200)];
    imgV.image=[UIImage imageNamed:@"dog"];
    [self.view addSubview:imgV];
    _imgV=imgV;   
}
```

## 三 点击图片，切换到另一张显示

```
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    _imgV.image=[UIImage imageNamed:@"dog2"];
}
```

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-define-uiimageview.gif