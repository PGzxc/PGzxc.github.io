---
title: Android硬件开发之——蓝牙技术
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 蓝牙技术
abbrlink: f758bcf7
date: 2018-03-01 23:26:33
---
# 前言 
本文主要讲述Android硬件开发蓝牙相关技术，内容包含：  

- 蓝牙简介
- 打开和关闭蓝牙设备
- 搜索蓝牙设备

<!--more-->

# 蓝牙技术 

## 蓝牙简介
蓝牙（Bluetooth）是一种短距离的无线通信技术标准。这个名子来源于10世纪丹麦国王Harald Blatand，英文名子是Harold Bluetooth。在无线行业协会组织人员的讨论后，有人认为用Blatand国王的名字命名这种无线技术是再好不过了，这是因为Blatand国王将挪威、瑞典和丹麦统一起来，这就如同这项技术将统一无线通信领域一样。至此，蓝牙的名字也就这样定了下来。   

蓝牙协议分为4层，即核心协议层、电缆替代协议层、电话控制协议层和采纳的其它协议层。这4种协议中最重要的是核心协议。蓝牙的核心协议包括基带、链路管理、逻辑链路控制和适应协议四部分。其中链路管理（LMP）负责蓝牙组件间连接的建立。逻辑链路控制与适应协议（L2CAP）位于基带协议层上，属于数据链路层，是一个为高层传输和应用层协议屏蔽基带协议的适配协议。
## 打开和关闭蓝牙设备  
### 第1种打开蓝牙的方式  
第一种打开蓝牙的方式会弹出对话框，等待用户确认 

	Intent enableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
	startActivityForResult(enableIntent, 1);

### 第2种打开蓝牙的方式    

必须设置权限

	<uses-permission android:name="android.permission.BLUETOOTH" />
	<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

	BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter()
	adapter.enable();
	adapter.disable();
# 蓝牙数据传输 

- 蓝牙数据传输
- 蓝牙的UUID

## 蓝牙数据传输
通过蓝牙传输数据与Socket类似。在网络中使用Socket和ServerSocket控制客户端和服务端的数据读写。而蓝牙通讯也由客户端和服务端Socket来完成。蓝牙客户端Socket是BluetoothSocket，蓝牙服务端Socket是BluetoothServerSocket。这两个类都在android.bluetooth包中。

无论是BluetoothSocket，还是BluetoothServerSocket，都需要一个UUID（全局唯一标识符,Universally Unique Identifier）.格式如下：
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
UUID的格式被分成5段，其中中间3段的字符数相同，都是4，第1段是8个字符，最后一段是12个字符。所以UUID实际上是一个8-4-4-4-12的字符串。
UUID相当于Socket的端口，而蓝牙地址相当于Socket的IP。  

## 蓝牙的UUID

两个蓝牙设备进行连接时需要使用同一个UUID。但很多读者可能发现，有很多型号的手机（可能是非Android系统的手机）之间使用了不同的程序也可以使用蓝牙进行通讯。从表面上看，它们之间几乎不可能使用同一个UUID。

实际上，UUID和TCP的端口一样，也有一些默认的值。例如，将蓝牙模拟成串口的服务就使用了一个标准的UUID：
00001101-0000-1000-8000-00805F9B34FB。除此之外，还有很多标准的UUID，如下面就是两个标准的UUID。

- 信息同步服务：00001104-0000-1000-8000-00805F9B34FB
- 文件传输服务：00001106-0000-1000-8000-00805F9B34FB


# 实例 
参考代码： [BluetoothSearch][1]  
效果图：  
![][2] 


[1]: https://github.com/PGzxc/BluetoothSearch
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/bluetooth-search.png




