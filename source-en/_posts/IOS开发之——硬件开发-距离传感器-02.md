---
title: IOS开发之——硬件开发-距离传感器(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 硬件
abbrlink: 20a77042
date: 2022-04-06 08:43:09
---
## 一 概述

* 距离传感器的支持设备
* 距离传感器的开发步骤
* 距离传感器示例

<!--more-->

## 二 距离传感器的支持设备

### 2.1 查询设备详情

|  Ipad  | Iphone |
| :----: | :----: |
| ![][1] | ![][2] |

说明：

* Ipad不支持距离传感器
* iPhone支持距离传感器

### 2.2 通过代码获取

```
[UIDevice currentDevice].proximityMonitoringEnabled=YES;
NSLog(@"环境传感器=%d",[UIDevice currentDevice].proximityMonitoringEnabled);
```

说明：设置proximityMonitoringEnabled=YES后，获取传感器的值是否为True(1)

## 三 距离传感器的开发步骤

* 开启距离传感器(注意，默认情况距离传感器时关闭的)
* 当监控到有物体靠近设备时系统会发出通知
* 当物体靠近和离开时，检查传感器的结果
* 应用结束时，移除监听

## 四 距离传感器示例

```
#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    //1-开启距离传感器(注意，默认情况距离传感器时关闭的)
    [UIDevice currentDevice].proximityMonitoringEnabled=YES;
    
    NSLog(@"环境传感器=%d",[UIDevice currentDevice].proximityMonitoringEnabled);
    
    //2-当监控到有物体靠近设备时系统会发出通知
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(ProximityStateDidChange:) name:UIDeviceProximityStateDidChangeNotification object:nil];
    
}
-(void)dealloc
{
    [[NSNotificationCenter defaultCenter]removeObserver:self];
}

-(void)ProximityStateDidChange:(NSNotification *)note
{
    if ([UIDevice currentDevice].proximityState) {
        NSLog(@"物体接近");
    }else{
        NSLog(@"物体离开");
    }
}
@end
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-device-02-ipad-sensor.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-device-02-iphone-sensor.png