---
title: IOS开发之——硬件开发-蓝牙(06)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 硬件
abbrlink: c7a8f899
date: 2022-04-11 21:50:38
---
## 一 概述

本文介绍通过CoreBluetooth进行蓝牙操作的示例，包含

* 项目界面介绍
* 蓝牙权限授予
* 功能开发(蓝牙扫描、停止扫描、清空设备)

<!--more-->

## 二 项目界面介绍

![][1]

说明：

* 上面是个UITableView，蓝牙扫描到设备时，显示在列表中
* 开始扫描：点击此按钮，执行开始扫描按钮
* 停止扫描：点击此按钮，停止蓝牙扫描
* 清空设备：点击此按钮，停止蓝牙扫描，并清空UITableView列表

## 三 蓝牙权限授予

### 3.1 点击info.plist，点击`+`号添加蓝牙权限
![][2]
### 3.2 添加蓝牙权限后的视图

![][3]

## 四 功能开发(蓝牙扫描、停止扫描、清空设备)

### 4.1 数据初始化

```
#import "ViewController.h"
#import <CoreBluetooth/CoreBluetooth.h>

@interface ViewController ()<UITableViewDataSource,CBCentralManagerDelegate>

@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property(nonatomic,strong) NSMutableArray *peripherals; //外设
@property(nonatomic,strong) CBCentralManager *centralManager; //中心设备
@property (nonatomic, assign) CBManagerState peripheralState; // 蓝牙状态
@property (nonatomic, strong) CBPeripheral *cbPeripheral; // 扫描到的设备

@end

@implementation ViewController

-(NSMutableArray *)peripherals
{
    if (!_peripherals) {
        _peripherals= [NSMutableArray array];
    }
    return _peripherals;
}
- (CBCentralManager *)centralManager
{
    if (!_centralManager)
    {
        _centralManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
    }
    return _centralManager;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self centralManager];
}
```

### 4.2 蓝牙扫描

```
//扫描设备按钮
- (IBAction)scanForPeripherals:(UIButton *)sender
{
    [self.centralManager stopScan];
    NSLog(@"扫描设备");
    if (self.peripheralState ==  CBManagerStatePoweredOn)
    {
        [self.centralManager scanForPeripheralsWithServices:nil options:nil];
    }
}
```

### 4.3 停止扫描

```
//停止设备扫描按钮
- (IBAction)stopForPeripherals:(UIButton *)sender
{
    [self.centralManager stopScan];
}
```

### 4.4 清空设备

```
//清空设备按钮
- (IBAction)clearPeripherals:(UIButton *)sender
{
    NSLog(@"清空设备");
    [self.peripherals removeAllObjects];
    [self.tableView reloadData];
}
```

### 4.5 与蓝牙扫描相关

```
#pragma mark-CBCentralManagerDelegate
//发现外设
-(void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral advertisementData:(NSDictionary<NSString *,id> *)advertisementData RSSI:(NSNumber *)RSSI
{
    NSLog(@"111--%s",__func__);
    //保存扫瞄到的外部设备
    //判断如果数组中不包含当前扫描到的外部设备才保存
    if (![self.peripherals containsObject:peripheral]) {
        [self.peripherals addObject:peripheral];
        [self.tableView reloadData];
    }
}
- (void)centralManagerDidUpdateState:(nonnull CBCentralManager *)central {
    NSLog(@"222-%s",__func__);
    self.peripheralState = central.state;
    switch ([central state])
        {
            case CBManagerStateUnsupported:
                NSLog(@"蓝牙不可用");
                break;
            case CBManagerStateUnauthorized:
                NSLog(@"未授权");
                break;
            case CBManagerStatePoweredOff:
                NSLog(@"蓝牙未打开");
                break;
            case CBManagerStatePoweredOn:
                NSLog(@"蓝牙已打开");
                break;
            case CBManagerStateUnknown:
                NSLog(@"状态未知");
                break;
            default:
                NSLog(@"不明情况了");
                break;
        }
}
```

### 4.6 UITableView数据展示

```
#pragma tableView方法
//每个section有多少cell
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.peripherals.count;
}
// 告诉表格控件，每个cell的数据
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:nil];
    if (self.peripherals.count>0) {
        CBPeripheral *peripheral=self.peripherals[indexPath.row];
        cell.textLabel.text=[NSString stringWithFormat:@"%@",peripheral];
    }
    return cell;
}
```

### 4.7 效果图
![][4]






[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-06-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-06-info-bluetooth-usage.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-06-info-bluetooth-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-06-corebluetooth-preview.gif