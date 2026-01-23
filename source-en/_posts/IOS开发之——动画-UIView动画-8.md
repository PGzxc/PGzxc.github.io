---
title: IOS开发之——动画-UIView动画(8)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 7efaa3fc
date: 2021-06-03 12:27:08
---
## 一 概述

* UIView通过transitionWithView执行动画
* transitionWithView动画分为单视图和双视图动画

<!--more-->

## 二 UIView动画

### 2.1 单视图动画

```
+ (void)transitionWithView:(UIView *)view duration:(NSTimeInterval)duration options:(UIViewAnimationOptions)options animations:(void (^)(void))animations completion:(void (^)(BOOL finished))completion;
```

参数说明：

* duration：动画的持续时间
* view：需要进行转场动画的视图
* options：转场动画的类型
* animations：将改变视图属性的代码放在这个block中
* completion：动画结束后，会自动调用这个block

### 2.2 双视图

```
+ (void)transitionFromView:(UIView *)fromView toView:(UIView *)toView duration:(NSTimeInterval)duration options:(UIViewAnimationOptions)options completion:(void (^)(BOOL finished))completion;
```

参数说明：

* duration：动画的持续时间
* options：转场动画的类型
* animations：将改变视图属性的代码放在这个block中
* completion：动画结束后，会自动调用这个block

## 三 示例-UIView动画函数实现转场动画

### 3.1 代码

```
@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIImageView *imageView;
@property (nonatomic,assign)int index;
@end

- (void)viewDidLoad {
    [super viewDidLoad];
    _index=1;
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    _index++;
    if (_index==4) {
        _index=1;
    }
    NSString *fileName=[NSString stringWithFormat:@"%d",_index];
    _imageView.image=[UIImage imageNamed:fileName];
    
    [UIView transitionWithView:_imageView duration:0.5 options:UIViewAnimationOptionTransitionCurlUp animations:nil completion:nil];
}
```

### 3.2 效果图

![][1]
### 3.3 说明

* 给整个页面添加UIVIew动画，传值为self.view


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uiview-animal-sample.gif