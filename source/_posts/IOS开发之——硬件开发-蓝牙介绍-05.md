---
title: IOS开发之——硬件开发-蓝牙介绍(05)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 硬件
abbrlink: 2097b488
date: 2022-04-10 21:00:48
---
## 一 概述

* IOS开发中蓝牙的实现方案
* CoreBluetooth核心结构图和基本常识
* CoreBluetooth开发步骤

<!--more-->

## 二 IOS开发中蓝牙的实现方案

IOS中提供了4个框架用于实现蓝牙连接

### 2.1 GameKit.framework（用法简单-已过时）

只能用于iOS设备之间的连接，多用于游戏（比如五子棋对战），从iOS7开始过期

### 2.2 MultipeerConnectivity.framework

只能用于iOS设备之间的连接，从iOS7开始引入，主要用于文件共享（仅限于沙盒的文件）

### 2.3 ExternalAccessory.framework

可用于第三方蓝牙设备交互，但是蓝牙设备必须经过苹果MFi认证（国内较少）

### 2.4 CoreBluetooth.framework（主流）

* 可用于第三方蓝牙设备交互，必须要支持蓝牙4.0
* 硬件至少是4s，系统至少是iOS6
* 蓝牙4.0以低功耗著称，一般也叫BLE（Bluetooth Low Energy）
* 目前应用比较多的案例：运动手坏、嵌入式设备、智能家居

## 三 CoreBluetooth核心结构图和基本常识

### 3.1 CoreBluetooth核心结构图

![][1]

### 3.2 CoreBluetooth基础知识

* 每个蓝牙4.0设备都是通过服务（Service）和特征（Characteristic）来展示自己的
* 一个设备必然包含一个或多个服务，每个服务下面又包含若干个特征
* 特征是与外界交互的最小单位。比如说，一台蓝牙4.0设备，用特征A来描述自己的出厂信息，用特征B来收发数据
* 服务和特征都是用UUID来唯一标识的，通过UUID就能区别不同的服务和特征
* 设备里面各个服务(service)和特征(characteristic)的功能，均由蓝牙设备硬件厂商提供，比如哪些是用来交互(读写)，哪些可获取模块信息(只读)等

## 四 CoreBluetooth开发步骤

* 建立中心设备
* 扫描外设（Discover Peripheral）
* 连接外设(Connect Peripheral)
* 扫描外设中的服务和特征(Discover Services And Characteristics)
* 利用特征与外设做数据交互(Explore And Interact)
* 断开连接(Disconnect)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-device-05-bluetooth-core-struct.png