---
title: IOS开发之——画板-照片(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: a6e62eec
date: 2021-04-11 22:47:48
---
## 一 概述

* 从相册选择照片
* 将照片传递给HandleImageView，并处理图片的手势操作(捏合，缩放等)
* 手势处理后，长按图片，截屏后，可对图片进行操作

<!--more-->

## 二 功能实现

#### 2.1 HandleImageView-接收图片，并进行手势识别处理

#### HandleImageView.h

```
#import <UIKit/UIKit.h>
typedef void(^HandleImageViewBlock) (UIImage *image);

@interface HandleImageView : UIView
@property (nonatomic,strong) UIImage *image;
@property (nonatomic,copy) HandleImageViewBlock block;

@end
```

#### HandleImageView.m

```
#import "HandleImageView.h"
#import "UIImage+Tool.h"

@interface HandleImageView()<UIGestureRecognizerDelegate>
@property (nonatomic,weak) UIImageView *imageView;
@end

@implementation HandleImageView

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        //添加UIImageView
        [self addImageView];
        //添加手势
        [self addGestureRecognizers];
    }
    return self;
}
-(void)addGestureRecognizers
{
    //1.长按
    UILongPressGestureRecognizer *longPress=[[UILongPressGestureRecognizer alloc]initWithTarget:self action:@selector(longPress:)];
    [_imageView addGestureRecognizer:longPress];
    [self addPinch];
    [self addRotation];
}
//长按方法
-(void)longPress:(UILongPressGestureRecognizer *)longPress
{
    if(longPress.state==UIGestureRecognizerStateEnded)
    {
        [UIView animateWithDuration:0.5 animations:^{
            _imageView.alpha=0.3;
        } completion:^(BOOL finished) {
            [UIView animateWithDuration:0.5 animations:^{
                _imageView.alpha=1;
            } completion:^(BOOL finished) {
                //1.截屏
                UIImage *newImage=[UIImage imageWithCaptureView:self];
                //2.把图片传给控制器
                _block(newImage);
                //3.把自己移除父控制器
                [self removeFromSuperview];
            }];
        }];
    }
}
#pragma mark-捏合
-(void)addPinch
{
    UIPinchGestureRecognizer *pinch=[[UIPinchGestureRecognizer alloc]initWithTarget:self action:@selector(pinch:)];
    // 设置代理的原因：想要同时支持多个手势
     pinch.delegate = self;
     [_imageView addGestureRecognizer:pinch];
}
-(void)pinch:(UIPinchGestureRecognizer *)pinch
{
    _imageView.transform=CGAffineTransformScale(_imageView.transform, pinch.scale, pinch.scale);
    //复位
    pinch.scale=1;
}
// Simultaneous:同时
// 默认是不支持多个手势
// 当你使用一个手势的时候就会调用
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer
{
    return YES;
}
- (void)addRotation
{
    // rotation
    UIRotationGestureRecognizer *rotation = [[UIRotationGestureRecognizer alloc] initWithTarget:self action:@selector(rotation:)];
    rotation.delegate = self;
    [_imageView addGestureRecognizer:rotation];
}

- (void)rotation:(UIRotationGestureRecognizer *)rotation
{

    //    _imagView.transform = CGAffineTransformMakeRotation(rotation.rotation);
    _imageView.transform = CGAffineTransformRotate(_imageView.transform, rotation.rotation);
    
    // 复位
    rotation.rotation = 0;
}
-(void)setImage:(UIImage *)image
{
    _image=image;
    _imageView.image=image;
}

-(void)addImageView
{
    UIImageView *imageView=[[UIImageView alloc]initWithFrame:self.bounds];
    imageView.userInteractionEnabled=YES;
    _imageView=imageView;
    [self addSubview:imageView];
}
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
@end
```

### 2.2 PaintView.m-将HandleImageView后的图片传递给ViewController

```
-(void)setImage:(UIImage *)image
{
    _image=image;
    [self.paths addObject:image];
    [self setNeedsDisplay];
}
```

### 2.3 ViewController.m-选择照片

```
//选择照片
- (IBAction)selectPicture:(UIBarButtonItem *)sender
{
    //去用户的相册
    UIImagePickerController *picker=[[UIImagePickerController alloc]init];
    //数据源
    picker.sourceType=UIImagePickerControllerSourceTypeSavedPhotosAlbum;
    picker.delegate=self;
    [self presentViewController:picker animated:YES completion:nil];
    
}
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<UIImagePickerControllerInfoKey,id> *)info
{
    NSLog(@"%@",info);
    UIImage *image=info[UIImagePickerControllerOriginalImage];
    HandleImageView *handImageView=[[HandleImageView alloc]initWithFrame:self.paintView.frame];
    handImageView.block = ^(UIImage * _Nonnull image) {
        _paintView.image=image;
    };
    handImageView.image=image;
    [self.view addSubview:handImageView];
    [self dismissViewControllerAnimated:YES completion:nil];
}
```

### 2.4 效果图

说明：按住Option按键，屏幕上出现2个触摸点时，可进行手势操作

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-photo-sample.gif