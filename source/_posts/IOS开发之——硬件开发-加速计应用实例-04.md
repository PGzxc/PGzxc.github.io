---
title: IOS开发之——硬件开发-加速计应用实例(04)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 硬件
abbrlink: 39fa6325
date: 2022-04-08 09:17:23
---
## 一 概述

加速计的作用 ：用于 检测设备的运动(比如摇晃)。本文介绍相关的两个示例

* 控制小球的移动 
* 摇一摇

<!--more-->

## 二 控制小球的移动 

### 2.1 项目描述

* Storyboard上事先放置一个Ball
* 随着手机的移动，小球随着上下左右移动 
* 超出边界检测(上下左右边界 )，放置到上下左右边界处

### 2.2 代码

#### 项目代码 

```
#import "ViewController.h"
#import <CoreMotion/CoreMotion.h>
#import "UIView+Extension.h"

@interface ViewController ()
//小球
@property (strong, nonatomic) IBOutlet UIView *imageBall;
//保存速度
@property(nonatomic,assign) CGPoint velocity;
@property(nonatomic,strong) CMMotionManager *mgr;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
   [self push];
}

//-push方式采集
-(void)push
{
    //1-创建CoreMotion管理者
    //CMMotionManager *mgr=[[CMMotionManager alloc]init];
    self.mgr=[[CMMotionManager alloc]init];
    //2-判断加速计 是否可用
    if (self.mgr.isAccelerometerActive) {
        //3-设置采样时间
        self.mgr.accelerometerUpdateInterval=1/30.0;
        
        //4-开始采样
        [self.mgr startAccelerometerUpdatesToQueue:[NSOperationQueue mainQueue] withHandler:^(CMAccelerometerData * _Nullable accelerometerData, NSError * _Nullable error) {
            //这个block是采集到数据时就会调用
            if (error) return;
            CMAcceleration acceleration=accelerometerData.acceleration;
            NSLog(@"x=%f,y=%f,z=%f",acceleration.x,acceleration.y,acceleration.z);
            //移动速度
            _velocity.x+=acceleration.x;
            _velocity.y-=acceleration.y;
            
            //移动距离
            self.imageBall.x+=_velocity.x;
            self.imageBall.y+=_velocity.y;
            
            //边界检测
            if (self.imageBall.x<=0) {
                //矫正小球当前的位置
                self.imageBall.x=0;
                //超出了屏幕的左边
                _velocity.x*=-0.5;
            }
            if (self.imageBall.y<=0) {
                //矫正小球当前的位置
                self.imageBall.y=0;
                //超出屏幕的顶部
                _velocity.y*=-0.5;
            }
            if (CGRectGetMaxY(self.imageBall.frame)>=self.view.height) {
                //矫正小球当前的位置
                self.imageBall.y=self.view.height-self.imageBall.height;
                //超出屏幕的底部
                _velocity.y*=-0.5;
            }
            if (CGRectGetMaxX(self.imageBall.frame)>=self.view.width) {
                //矫正小球当前的位置
                self.imageBall.x=self.view.width-self.imageBall.width;
                //超出屏幕的右边
                _velocity.x*=-0.5;
            }
        }];
        
    }else{
        NSLog(@"加速计不可用");
    }
}
@end
```

#### UIView+Extension.h

```
#import <UIKit/UIKit.h>

@interface UIView (Extension)
@property (nonatomic, assign) CGFloat x;
@property (nonatomic, assign) CGFloat y;
@property (nonatomic, assign) CGFloat maxX;
@property (nonatomic, assign) CGFloat maxY;
@property (nonatomic, assign) CGFloat centerX;
@property (nonatomic, assign) CGFloat centerY;
@property (nonatomic, assign) CGFloat width;
@property (nonatomic, assign) CGFloat height;
@property (nonatomic, assign) CGSize size;
@end
```

#### UIView+Extension.m

```
#import "UIView+Extension.h"

@implementation UIView (Extension)

- (void)setX:(CGFloat)x
{
    CGRect frame = self.frame;
    frame.origin.x = x;
    self.frame = frame;
}

- (CGFloat)x
{
    return self.frame.origin.x;
}

- (void)setMaxX:(CGFloat)maxX
{
    self.x = maxX - self.width;
}


- (CGFloat)maxX
{
    return CGRectGetMaxX(self.frame);
}

- (void)setMaxY:(CGFloat)maxY
{
    self.y = maxY - self.height;
}

- (CGFloat)maxY
{
    return CGRectGetMaxY(self.frame);
}

- (void)setY:(CGFloat)y
{
    CGRect frame = self.frame;
    frame.origin.y = y;
    self.frame = frame;
}

- (CGFloat)y
{
    return self.frame.origin.y;
}

- (void)setCenterX:(CGFloat)centerX
{
    CGPoint center = self.center;
    center.x = centerX;
    self.center = center;
}

- (CGFloat)centerX
{
    return self.center.x;
}

- (void)setCenterY:(CGFloat)centerY
{
    CGPoint center = self.center;
    center.y = centerY;
    self.center = center;
}

- (CGFloat)centerY
{
    return self.center.y;
}

- (void)setWidth:(CGFloat)width
{
    CGRect frame = self.frame;
    frame.size.width = width;
    self.frame = frame;
}

- (CGFloat)width
{
    return self.frame.size.width;
}

- (void)setHeight:(CGFloat)height
{
    CGRect frame = self.frame;
    frame.size.height = height;
    self.frame = frame;
}

- (CGFloat)height
{
    return self.frame.size.height;
}

- (void)setSize:(CGSize)size
{
//    self.width = size.width;
//    self.height = size.height;
    CGRect frame = self.frame;
    frame.size = size;
    self.frame = frame;
}

- (CGSize)size
{
    return self.frame.size;
}

@end
```

### 2.3 预览

暂无设备，自行测试

## 三摇一摇

### 3.1 说明

* 在AppDelegate中重写：motionBegan(摇晃开始)、motionEnded(摇晃结束)、motionCancelled(摇晃取消)相关方法
* 安装到手机中，晃动手机，查看方法的执行结果

### 3.2 代码

```
#import "AppDelegate.h"

@interface AppDelegate ()
@end
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    return YES;
}

#pragma mark -摇一摇
//摇一摇开始
-(void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event
{
    NSLog(@"%s",__func__);
    
}
//摇一摇结束
-(void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event
{
    NSLog(@"%s",__func__);
}
//摇一摇取消
-(void)motionCancelled:(UIEventSubtype)motion withEvent:(UIEvent *)event
{
    NSLog(@"%s",__func__);
}
@end
```


