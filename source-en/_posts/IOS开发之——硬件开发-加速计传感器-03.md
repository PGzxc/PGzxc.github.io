---
title: IOS开发之——硬件开发-加速计传感器(03)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 硬件
abbrlink: bf91b12c
date: 2022-04-07 08:59:07
---
## 一 概述

* 加速计的原理
* 加速计的程序开发
* UIAccelerometer在程序中使用示例

<!--more-->

## 二 加速计的原理

### 2.1 原理

检测设备在X、Y、Z轴上的加速度(哪个方向有力的作用，哪个方向 运动了)，根据加速度数值，就可以判断出在各个方向上的作用力度

![][1]

###  2.2 各个轴上的数值

![][2]

## 三 加速计的程序开发

### 3.1 开发中使用到的类 

* UIAccelerometer：IOS5.0 已经过时 ，不在支持
* CoreMotion framework：加速计使用到的类 ，替代UIAccelerometer

### 3.2 Core Motion获取数据的两种方式
![][3]

* push:实时采集所有数据（采集频率高）
* pull:在有需要的时候，再主动去采集数据

## 四 UIAccelerometer在程序中使用示例

### 4.1 push方式 

```
@interface ViewController ()
@property(nonatomic,strong) CMMotionManager *mgr;
@end
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
   [self push];
}

-(void)push
{
    //1-创建CoreMotion管理者
    //CMMotionManager *mgr=[[CMMotionManager alloc]init];
    self.mgr=[[CMMotionManager alloc]init];
    //2-判断加速计 是否可用
    if (self.mgr.isAccelerometerActive) {
       
        //isAccelerometerActive 是否正在 采集
        //accelerometerData:采集到的数据
        //startAccelerometerUpdates:pull
        //startAccelerometerUpdatesToQueue:push
        //stopAccelerometerUpdates:停止采集
        //accelerometerUpdateInterval：采样时间
        
        //3-设置采样时间
        self.mgr.accelerometerUpdateInterval=1/30.0;
        
        //4-开始采样
        [self.mgr startAccelerometerUpdatesToQueue:[NSOperationQueue mainQueue] withHandler:^(CMAccelerometerData * _Nullable accelerometerData, NSError * _Nullable error) {
            //这个block是采集到数据时就会调用
            if (error) return;
            CMAcceleration acceleration=accelerometerData.acceleration;
            NSLog(@"x=%f,y=%f,z=%f",acceleration.x,acceleration.y,acceleration.z);
        }];
        
    }else{
        NSLog(@"加速计不可用");
    }
}
```

### 4.2 pull方式

```
@interface ViewController ()
@property(nonatomic,strong) CMMotionManager *mgr;
@end
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
   [self pull];
}
//pull方式
-(void)pull
{
    //1-创建CoreMotion管理者
    //CMMotionManager *mgr=[[CMMotionManager alloc]init];
    self.mgr=[[CMMotionManager alloc]init];
    //2-判断加速计 是否可用
    if (self.mgr.isAccelerometerActive) {
       
        //isAccelerometerActive 是否正在 采集
        //accelerometerData:采集到的数据
        //startAccelerometerUpdates:pull
        //startAccelerometerUpdatesToQueue:push
        //stopAccelerometerUpdates:停止采集
        //accelerometerUpdateInterval：采样时间
        
        //3-开始采样
        [self.mgr startAccelerometerUpdates];
        
    }else{
        NSLog(@"加速计不可用");
    }
    
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    CMAcceleration acceleration=self.mgr.accelerometerData.acceleration;
    NSLog(@"x=%f,y=%f,z=%f",acceleration.x,acceleration.y,acceleration.z);
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-device-03-acceler-graph.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-device-03-xyz-value.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-device-03-coremotion-twoway.png