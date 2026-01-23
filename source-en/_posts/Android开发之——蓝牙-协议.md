---
title: Android开发之——蓝牙-协议
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: db54373a
date: 2021-12-14 16:43:41
---
## 一 概述

* 传统蓝牙和低功耗蓝牙
* 蓝牙进行通信的四大必需任务
* 关键俗语和概念
* Android 应用可通过 Bluetooth API 执行的操作

<!--more-->

## 二 传统蓝牙和低功耗蓝牙

### 2.1 经典蓝牙模块(BT)

* 泛指支持蓝牙协议在4.0以下的模块
* 一般用于数据量比较大的传输，比如：语音、音乐、较高数据量传输等
* 经典蓝牙模块可再细分为：**传统蓝牙模块**和**高速蓝牙模块**
* 传统蓝牙模块：在2004年推出，主要代表是支持蓝牙2.1协议的模块，在智能手机爆发的时期得到广泛支持。
* 高速蓝牙模块：在2009年推出，速率提高到约24Mbps，是传统蓝牙模块的8倍，可以轻松用于录像机至高清电视、PC至PMP、UMPC至打印机之间的资料传输

### 2.2 低功耗蓝牙(BLE)

* BLE：是指支持蓝牙协议4.0或更高的模块，也称为BLE模块(Bluetooth Low EnergyModule)
* 最大特点是成本和功耗的降低，应用于实时性要求比较高，但是数据速率比较低的产品。如：遥控类的(鼠标、键盘)、传感设备的数据发送(心跳带、血压计、温度传感器)等

## 三 蓝牙进行通信的四大必需任务

* 设置蓝牙
* 查找局部区域内的配对设备或可用设备
* 连接设备
* 以及在设备之间传输数据

## 四 关键俗语和概念

### 4.1  BLE 关键术语和概念

#### 通用属性配置文件 (GATT)

* Generic Attribute Profile (GATT)：通用属性配置文件
* GATT 配置文件是一种通用规范
* 内容针对在 BLE 链路上发送和接收称为“属性”的简短数据片段
* 目前所有低功耗应用配置文件均以 GATT 为基础

#### 属性协议 (ATT)

* Attribute Protocol (ATT)：属性协议
* 属性协议 (ATT) 是 GATT 的构建基础，二者的关系也被称为 GATT/ATT
* ATT 经过优化，可在 BLE 设备上运行
* 每个属性均由通用唯一标识符 (UUID) 进行唯一标识，UUID是用于对信息进行唯一标识的字符串 ID 的 128 位标准化格式
* 由 ATT 传输的*属性*采用*特征*和*服务*格式

#### **特征** (Characteristic)

* 特征包含一个值和 0 至多个描述特征值的描述符
* 特征理解为类型，后者与类类似

#### **描述符** (Descriptor)

* 描述符是描述特征值的已定义属性
* 例如，描述符可指定人类可读的描述、特征值的可接受范围或特定于特征值的度量单位。

#### **Service** 

* 服务是一系列特征
* 例如，您可能拥有名为“心率监测器”的服务，其中包括“心率测量”等特征
* 您可以在 [bluetooth.org](https://www.bluetooth.org/en-us/specification/adopted-specifications) 上找到基于 GATT 的现有配置文件和服务的列表

### 4.2 角色和职责

中央与外围。这适用于 BLE 连接本身。担任中央角色的设备进行扫描、寻找广播；外围设备发出广播
GATT 服务器与 GATT 客户端。这确定两个设备建立连接后如何相互通信。

#### 中心设备

* 中心设备相对比较强大，用来连接其他外围设备
* 例如：手机等

#### 外围设备

* 这一般就是非常小或者简单的低功耗设备
* 用来提供数据，并连接到一个更加相对强大的中心设备
* 例如：小米手环

#### GATT 服务器

* 中心设备与外围设备建立连接后，开始相互传送GATT数据
* 中心设备如手机，就是GATT服务器

#### GATT 客户端

* 中心设备与外围设备建立连接后，开始相互传送GATT数据
* 外围设备如小米手环就是GATT客户端

## 五 Android 应用可通过 Bluetooth API 执行的操作

* 扫描其他蓝牙设备
* 查询本地蓝牙适配器的配对蓝牙设备
* 建立 RFCOMM 通道
* 通过服务发现连接到其他设备
* 与其他设备进行双向数据传输
* 管理多个连接

## 六 参考

* [Google官方文档—蓝牙概览](https://developer.android.google.cn/guide/topics/connectivity/bluetooth)
* [Google官方文档—蓝牙低功耗概览](https://developer.android.google.cn/guide/topics/connectivity/bluetooth-le#kotlin)
* [CSDN—蓝牙【GATT】协议介绍](https://blog.csdn.net/u013378580/article/details/52891462)
* [CSDN—Android BLE设备蓝牙通信框架BluetoothKit](https://blog.csdn.net/dingjikerbo/article/details/52351723)
* [CSDN-Android蓝牙BLE](https://blog.csdn.net/liu_chujie/article/details/81004887)
* [CSDN—android蓝牙入门知识和优秀蓝牙第三方库BluetoothKit的使用](https://blog.csdn.net/liu_chujie/article/details/81003506)