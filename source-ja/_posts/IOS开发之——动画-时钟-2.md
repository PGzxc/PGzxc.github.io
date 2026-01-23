---
title: IOS开发之——动画-时钟(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 9e484f2b
date: 2021-05-06 09:55:39
---
## 一 概述

* 添加一个时针视图，然后通过CALayer创建秒针，分针，时针
* 创建一个定时器，每个1s更新一些时钟视图

<!--more-->

## 二 CALayer创建秒针，分针，时针

### 2.1 秒针

* 计算出时钟ImageView的大小(宽度和高度)
* 创建秒针CALayer
* 设置秒针的锚点(anchorPoint)，位置(position)，尺寸(长度)，颜色

### 2.2 分针

* 计算出时钟ImageView的大小(宽度和高度)
* 创建分针CALayer
* 设置分针的锚点(anchorPoint)，位置(position)，尺寸(长度)，颜色

### 2.1 时针

* 计算出时钟ImageView的大小(宽度和高度)
* 创建时针CALayer
* 设置时针的锚点(anchorPoint)，位置(position)，尺寸(长度)，颜色

## 三 更新时间

* 获取日历对象，并根据日历对象获取NSDateComponents
* 根据NSDateComponents分别获取秒数/分数/小时数
* 再根据当前的秒数/分数/小时数和每秒/每分/每小时的选择角度，计算出应偏移的度数
* CATransform3DMakeRotation执行旋转

## 四 示例

### 4.1 代码

```
#import "ViewController.h"
//每秒秒针转6度
#define perSecendA 6 //360/60
//每分钟分针转6度
#define perMinuteA 6 //360/60
//每小时时针转多少度
#define perHourA  30 //360/12
//每分钟时针转6度
#define perMinuteHourA 0.5 //30/60
 

#define angle2radian(x) ((x)/180.0 * M_PI)
@interface ViewController ()
{
    CALayer *_second;
    CALayer *_minute;
    CALayer *_hour;
}
@property (weak, nonatomic) IBOutlet UIImageView *clockView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    //1-添加秒针
    [self addSecond];
    //2-添加分针
    [self addMinute];
    //3-添加时针
    [self addHour];
 
    //创建定时器
    [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(update) userInfo:nil repeats:YES];
    [self update];
    
}
//添加时针
-(void)addHour
{
    CGFloat imageW=_clockView.bounds.size.width;
    CGFloat imageH=_clockView.bounds.size.height;
    
   //1.添加分针
    CALayer *hour=[CALayer layer];
    //2.添加锚点
    hour.anchorPoint=CGPointMake(0.5, 1);
    //3.设置位置
    hour.position=CGPointMake(imageW*0.5, imageH*0.5);
    //4.设置尺寸
    hour.bounds=CGRectMake(0, 0, 4, imageH*0.5-50);
    //5.设置背景色
    hour.backgroundColor=[UIColor blackColor].CGColor;
    hour.cornerRadius=5;
    
    //6.添加到图层上
    [_clockView.layer addSublayer:hour];
    _hour=hour;
    
}
//添加分针
-(void)addMinute
{
    CGFloat imageW=_clockView.bounds.size.width;
    CGFloat imageH=_clockView.bounds.size.height;
    
   //1.添加分针
    CALayer *minute=[CALayer layer];
    //2.添加锚点
    minute.anchorPoint=CGPointMake(0.5, 1);
    //3.设置位置
    minute.position=CGPointMake(imageW*0.5, imageH*0.5);
    //4.设置尺寸
    minute.bounds=CGRectMake(0, 0, 2, imageH*0.5-30);
    //5.设置背景色
    minute.backgroundColor=[UIColor blackColor].CGColor;
    
    
    //6.添加到图层上
    [_clockView.layer addSublayer:minute];
    _minute=minute;
}

//添加秒针
-(void)addSecond
{
    CGFloat imageW=_clockView.bounds.size.width;
    CGFloat imageH=_clockView.bounds.size.height;
    
   //1.添加秒针
    CALayer *second=[CALayer layer];
    //2.添加锚点
    second.anchorPoint=CGPointMake(0.5, 1);
    //3.设置位置
    second.position=CGPointMake(imageW*0.5, imageH*0.5);
    //4.设置尺寸
    second.bounds=CGRectMake(0, 0, 1, imageH*0.5-20);
    //5.设置背景色
    second.backgroundColor=[UIColor redColor].CGColor;
    
    //6.添加到图层上
    [_clockView.layer addSublayer:second];
    _second=second;
}
-(void)update
{
    
    //获取秒数
    //获取日历对象
    NSCalendar *calendar=[NSCalendar currentCalendar];
    NSDateComponents *compoents=[calendar components:NSCalendarUnitSecond|NSCalendarUnitMinute|NSCalendarUnitHour fromDate:[NSDate date]];
    //获取秒数
    CGFloat sec=compoents.second;
    //获取分钟
    CGFloat minute=compoents.minute;
    //获取小时
    CGFloat hour=compoents.hour;
    
    //算出秒针旋转多少
    CGFloat secondA=sec*perSecendA;
    //算出分针旋转多少
    CGFloat minuteA=minute*perMinuteA;
    //算出时针旋转多少
    CGFloat hourA=hour*perHourA;
    hourA+=minute*perMinuteHourA;
    
    //旋转秒针
    _second.transform=CATransform3DMakeRotation(angle2radian(secondA),  0, 0, 1);
    //旋转分针
    _minute.transform=CATransform3DMakeRotation(angle2radian(minuteA),  0, 0, 1);
    //旋转时针
    _hour.transform=CATransform3DMakeRotation(angle2radian(hourA),  0, 0, 1);
}
@end
```

### 4.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-calayer-click.gif