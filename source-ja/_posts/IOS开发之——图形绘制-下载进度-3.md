---
title: IOS开发之——图形绘制-下载进度(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 74bc3e00
date: 2020-12-31 08:45:57
---
## 一 概述

本文介绍拖动Slider时，通过自定义View

* Label显示当前的Slider的数字大小
* Progress显示Sliderder的弧度

<!--more-->

## 二 绘制进度

### 2.1 自定义ProgressView

#### 设置要改变的值progress(ProgressView.h)

```
@interface ProgressView : UIView
@property (nonatomic,assign) CGFloat progress;
@end
```

#### Label和弧度显示

```
#import "ProgressView.h"
@interface ProgressView ()
@property (nonatomic,weak) UILabel *label;
@end
@implementation ProgressView

- (UILabel *)label
{
    if (_label==nil) {
        UILabel *label=[[UILabel alloc]initWithFrame:CGRectMake(0, 0, 100, 100)];
        label.textAlignment=NSTextAlignmentCenter;
        [self addSubview: label];
        _label=label;
    }
    return  _label;
}
- (void)setProgress:(CGFloat)progress
{
    _progress=progress;
    self.label.text=[NSString stringWithFormat:@"%.2f%%",progress*100];
    [self setNeedsDisplay];
}

// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
    //1.获取上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    //2.拼接路径
    CGPoint center=CGPointMake(50, 50);
    CGFloat radius=50-2;
    CGFloat startA=-M_PI_2;
    CGFloat endA=-M_PI_2+_progress*M_PI*2;
    UIBezierPath *path=[UIBezierPath bezierPathWithArcCenter:center radius:radius startAngle:startA endAngle:endA clockwise:YES];
    //3.把路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    //4.把上下文渲染到视图
    CGContextStrokePath(ctx);
}
@end
```

### 2.2 ViewController中设置Slider改变

```
#import "ViewController.h"
#import "ProgressView.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet ProgressView *progressView;
@end

@implementation ViewController
- (IBAction)valueChange:(UISlider *)sender
{
    _progressView.progress=sender.value;
    NSLog(@"%f",sender.value);
}
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
@end
```

## 三 效果图

![][1]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-down-progress.gif