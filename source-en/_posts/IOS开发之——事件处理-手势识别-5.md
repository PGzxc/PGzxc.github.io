---
title: IOS开发之——事件处理-手势识别(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 6ecde33
date: 2020-12-17 08:49:43
---
## 一 概述

* 监听触控事件的做法
* 手势识别器——UIGestureRecognizer
* 手势识别示例  

<!--more-->

## 二 监听触摸事件的做法

### 2.1 如果想监听一个view上面的触摸事件，之前的做法是

* 自定义一个view
* 实现view的touches方法，在方法内部实现具体的处理代码

### 2.2 通过touches方法监听view触摸事件，有很明显的几个缺点
* 必须得自定义view
* 由于是在view内部的touches方法中监听触摸事件，因此默认情况下，无法让其他外界对象监听view的触摸事件
* 不容易区分用户的具体手势行为

### 2.3 手势识别功能

IOS3.2之后，苹果推出了手势识别功能(Guesture Recognizer)，在触摸事件处理方面，大大简化了开发者的开发难度

## 三 手势识别器——UIGestureRecognizer
### 3.1手势识别器介绍
* 为了完成手势识别，必须借助手势识别器——UIGestureRecognizer
* 利用UIGestureRecognizer，能轻松识别用户在某个view上面做的一些常见手势

### 3.2 手势识别器的常见行为

UIGestureRecognizer是一个抽象类，定义了所有手势的基本行为，使用它的子类才能处理具体的手势

* UITapGestureRecognizer：敲击
* UIPinchGestureRecognizer：捏合，用于缩放
* UIPanGestureRecognizer：拖拽
* UISwipeGestureRecognizer：轻扫
* UIRotationGestureRecognizer：旋转
* UILongPressGestureRecognizer：长按

## 四 手势识别示例  

### 4.1 UITapGestureRecognizer

#### 手势

```
 UITapGestureRecognizer *tap=[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(tap:)];
 
  //点按多少次才能触发
  tap.numberOfTapsRequired=2;
  //必须多少个手指触摸才能触发手势
  //tap.numberOfTouchesRequired=2;
  tap.delegate=self;
  [_imageView addGestureRecognizer:tap];
```

#### 说明

* tap.numberOfTapsRequired：点击多少次才能触发
* tap.numberOfTouchesRequired：多少手势触发

#### 方法

```
-(void)tap:(UITapGestureRecognizer *)tap
{
    NSLog(@"tap");
}
```

### 4.2 UILongPressGestureRecognizer

#### 手势

```
 UILongPressGestureRecognizer *longPress=[[UILongPressGestureRecognizer alloc]initWithTarget:self action:@selector(longPress:)];
 [_imageView addGestureRecognizer:longPress];
```

#### 方法

```
-(void)longPress:(UILongPressGestureRecognizer *)longPress
{
    if (longPress.state==UIGestureRecognizerStateBegan) {
        NSLog(@"longPress");
    }
}
```

### 4.3 UISwipeGestureRecognizer

#### 手势

```
//swip 一个手势只能识别一个方向
UISwipeGestureRecognizer *swipe=[[UISwipeGestureRecognizer alloc]initWithTarget:self action:@selector(swip:)];
swipe.direction=UISwipeGestureRecognizerDirectionRight;
[_imageView addGestureRecognizer:swipe];
```

#### 方法

```
-(void)swip:(UISwipeGestureRecognizer *)swipe
{
    NSLog(@"swipe");
}
```

### 4.4 UIRotationGestureRecognizer

#### 添加手势

```
 UIRotationGestureRecognizer *rotation=[[UIRotationGestureRecognizer alloc]initWithTarget:self action:@selector(rotation:)];
 [_imageView addGestureRecognizer:rotation];
```

#### 方法

```
-(void)rotation:(UIRotationGestureRecognizer *)rotation
{
    NSLog(@"%f",rotation.rotation);
    //_imageView.transform=CGAffineTransformMakeRotation(rotation.rotation);
    _imageView.transform=CGAffineTransformRotate(_imageView.transform, rotation.rotation);
    rotation.delegate=self;
    rotation.rotation=0;
}
```

### 4.5 UIPinchGestureRecognizer

#### 手势

```
 UIPinchGestureRecognizer *pinch=[[UIPinchGestureRecognizer alloc]initWithTarget:self action:@selector(pinch:)];
 [_imageView addGestureRecognizer:pinch];
 pinch.delegate=self;
 [self addRotation];
```

#### 方法

```
-(void)pinch:(UIPinchGestureRecognizer *)pinch
{
    _imageView.transform=CGAffineTransformScale(_imageView.transform, pinch.scale, pinch.scale);
    //复位
    pinch.scale=1;
}
```

### 4.6 UIPanGestureRecognizer

#### 手势

```
UIPanGestureRecognizer *pan=[[UIPanGestureRecognizer alloc]initWithTarget:self action:@selector(pan:)];
[_imageView addGestureRecognizer:pan];
```

#### 方法

```
-(void)pan:(UIPanGestureRecognizer *)pan
{
    CGPoint trans=[pan translationInView:_imageView];
    _imageView.transform=CGAffineTransformTranslate(_imageView.transform, trans.x, trans.y);
    //复位
    [pan setTranslation:CGPointZero inView:_imageView];
    NSLog(@"%@",NSStringFromCGPoint(trans));
}
```

