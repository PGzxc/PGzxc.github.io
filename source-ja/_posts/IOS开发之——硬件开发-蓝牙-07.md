---
title: IOS开发之——硬件开发-蓝牙(07)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 硬件
abbrlink: deb3c9d8
date: 2022-04-12 22:21:56
---
## 一 概述

* 点击设备列表连接设备
* 设备连接情况说明
* 设备连接成功后扫描Service服务
* Service服务获取之后获取CBCharacteristic特征值

<!--more-->

## 二 点击设备列表连接设备

### 2.1 设置UITableView delegate

![][1]

### 2.2 实现Cell点击方法didSelectRowAtIndexPath

```
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    //NSLog(@"1111111-----%ld",indexPath.row);
    CBPeripheral *peripheral=self.peripherals[indexPath.row];
    self.cbPeripheral = peripheral;
    NSLog(@"开始连接设备");
    [self.centralManager connectPeripheral:peripheral options:nil];
}
```

## 三 设备连接情况说明

self.centralManager connectPeripheral连接设备后，有三种情况回调：连接失败，连接断开，连接成功

### 3.1 连接失败didFailToConnectPeripheral

```
//1-连接失败
/**
 @param central 中心管理者
 @param peripheral 连接失败的设备
 @param error 错误信息

 */
-(void)centralManager:(CBCentralManager *)central didFailToConnectPeripheral:(CBPeripheral *)peripheral error:(NSError *)error
{
    NSLog(@"连接失败--%@",error);   
}
```

### 3.2 连接断开didDisconnectPeripheral

```
//2-断开连接
/**
 @param central 中心管理者
 @param peripheral 连接断开的设备
 @param error 错误信息
 
 */
-(void)centralManager:(CBCentralManager *)central didDisconnectPeripheral:(CBPeripheral *)peripheral error:(NSError *)error
{
    NSLog(@"连接断开--%@",error);
}
```

### 3.3 连接成功didConnectPeripheral

```
/**
 @param central 中心管理者
 @param peripheral 连接成功的设备
 */
//3-间接成功
-(void)centralManager:(CBCentralManager *)central didConnectPeripheral:(CBPeripheral *)peripheral
{
    NSLog(@"连接成功-%@",peripheral);
}
```

### 3.4 设备连接示例

| 连接失败 | 连接成功 |
| :------: | :------: |
|  ![][2]  |  ![][3]  |

## 四 设备连接成功后扫描Service服务

### 4.1 在上步3.3连接成功进行服务扫描，并添加CBPeripheralDelegate代理

```
-(void)centralManager:(CBCentralManager *)central didConnectPeripheral:(CBPeripheral *)peripheral
{
    NSLog(@"连接成功-%@",peripheral);
    //设置设备的代理
    peripheral.delegate=self;
    [peripheral discoverServices:nil];
}
```

### 4.2 扫描发现服务回调

```
/**
 扫描到服务
 @param peripheral 服务对应的设备
 @param error 扫描错误信息
 */
-(void)peripheral:(CBPeripheral *)peripheral didDiscoverServices:(NSError *)error
{
    //遍历所有的服务
    for(CBService *service in peripheral.services)
    {
        NSLog(@"服务:%@",service.UUID.UUIDString);
        //获取对应的服务-根据服务区扫描特征值
        [peripheral discoverCharacteristics:nil forService:service];
    }
}
```

### 4.3 服务信息打印

```
2022-04-12 22:05:49.493678+0800 CoreBlueTooth[43804:2898149] 开始连接设备
2022-04-12 22:05:50.013514+0800 CoreBlueTooth[43804:2898149] 连接成功-<CBPeripheral: 0x282904000, identifier = 0B652640-8B85-3575-52CF-1A4A7B747BD2, name = zxc, mtu = 23, state = connected>
2022-04-12 22:05:50.402412+0800 CoreBlueTooth[43804:2898149] 服务:D0611E78-BBB4-4591-A5F8-487910AE4366
2022-04-12 22:05:50.402674+0800 CoreBlueTooth[43804:2898149] 服务:9FA480E0-4967-4542-9390-D343DC5D04AE
2022-04-12 22:05:50.402817+0800 CoreBlueTooth[43804:2898149] 服务:180A
```

## 五 Service服务获取之后获取CBCharacteristic特征值

### 5.1 在4.2服务便利时扫描CBCharacterister特征值

```
-(void)peripheral:(CBPeripheral *)peripheral didDiscoverServices:(NSError *)error
{
    //遍历所有的服务
    for(CBService *service in peripheral.services)
    {
        NSLog(@"服务:%@",service.UUID.UUIDString);
        //获取对应的服务-根据服务区扫描特征值
        [peripheral discoverCharacteristics:nil forService:service];
    }
}
```

### 4.2 遍历所有的特征值

```
/**
 扫描到对应的特征
 
 @param peripheral 设备
 @param service 特征对应的服务
 @param error 错误信息
 */
-(void)peripheral:(CBPeripheral *)peripheral didDiscoverCharacteristicsForService:(CBService *)service error:(NSError *)error
{
    //遍历所有的特征值
    for(CBCharacteristic *characteristic in service.characteristics)
    {
        NSLog(@"特征值:%@",characteristic.UUID.UUIDString);
    }
}
```

### 4.3 CBCharacterister特征值打印

```
2022-04-12 22:08:34.016638+0800 CoreBlueTooth[43822:2899692] 开始连接设备
2022-04-12 22:08:34.476154+0800 CoreBlueTooth[43822:2899692] 连接成功-<CBPeripheral: 0x280f7cd20, identifier = 0B652640-8B85-3575-52CF-1A4A7B747BD2, name = zxc, mtu = 23, state = connected>
2022-04-12 22:08:34.863536+0800 CoreBlueTooth[43822:2899692] 服务:D0611E78-BBB4-4591-A5F8-487910AE4366
2022-04-12 22:08:34.864019+0800 CoreBlueTooth[43822:2899692] 服务:9FA480E0-4967-4542-9390-D343DC5D04AE
2022-04-12 22:08:34.864378+0800 CoreBlueTooth[43822:2899692] 服务:180A
2022-04-12 22:08:34.983210+0800 CoreBlueTooth[43822:2899692] 特征值:8667556C-9A37-4C91-84ED-54EE27D90049
2022-04-12 22:08:35.103962+0800 CoreBlueTooth[43822:2899692] 特征值:AF0BADB1-5B99-43CD-917A-A77BC549E3CC
2022-04-12 22:08:35.162979+0800 CoreBlueTooth[43822:2899692] 特征值:2A29
2022-04-12 22:08:35.163207+0800 CoreBlueTooth[43822:2899692] 特征值:2A24
```

说明：扫描到特征值就可以读写数据了

## 五 参考

* [Github-Bluetooth4.0](https://github.com/CherishJoyBy/Bluetooth4.0Demo)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-07-tableview-delegate.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-07-connect-fail.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-devices-07-connect-sucess.png