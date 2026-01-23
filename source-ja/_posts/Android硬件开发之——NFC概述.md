---
title: Android硬件开发之——NFC概述
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - NFC概述
abbrlink: dac1b518
date: 2018-02-28 17:39:19
---
# 前言  
本文主要讲述与NFC相关的知识点，内容包含：  

- 什么是NFC
- NFC的3种工作模式
- NFC、蓝牙和红外之间的差异
- NFC技术的未来前景

<!--more-->   

# NFC概述 

## 什么是NFC  
NFC（Near Field Communication，近场通信），是一种数据传输技术。但与Wi-Fi、蓝牙、红外线等数据传输技术的一个主要差异就是有效距离一般不能超过4厘米。   

## NFC支持如下3种工作模式  
- 读卡器模式（Reader/writer mode）
- 仿真卡模式(Card Emulation Mode)
- 点对点模式（P2P mode）

### 读卡器模式（Reader/writer mode）
读卡器模式本质上就是通过NFC设备（例如支持NFC的Android手机）从带有NFC芯片的标签、贴纸、报纸、明信片、名片等媒介读取信息，或将数据写到这些媒介中。目前市场上很常见，而且很便宜的有NFC标签产品，以及更简易的NFC贴纸。  
![][1]    
![][2]    
### 仿真卡模式(Card Emulation Mode)  
仿真卡模式就是将支持NFC的手机或其它电子设备当成借记卡、信用卡、公交卡、门禁卡等IC卡使用。基本原理是将相应IC卡中的信息（支付凭证）封装成数据包存储在支持NFC的手机中 。在使用时还需要一个NFC射频器（相当于刷传统IC卡时使用的刷卡器）。将手机靠近NFC射频器，手机就会接收到NFC射频器发过来的信号，在通过一系列复杂的验证后，将IC卡的相应信息传入NFC射频器，最后这些IC卡数据会传入NFC射频器连接的电脑，并进行相应的处理（如电子转帐、开门等操作）。如果一切顺利，就成功完成了一次“刷手机”的动作。
  
### 点对点模式（P2P mode）
该模式与蓝牙、红外差不多，可以用于不同NFC设备之间进行数据交换，只是NFC的点对点模式有效距离更短（不能超过4厘米），而且传输建立速度要比红外和蓝牙技术快很多，传输速度比红外块得多，如过双方都使用Android4.2，NFC会直接利用蓝牙传输。这种技术被称为Android Beam。所以使用Android Beam传输数据的两部设备不再限于4厘米之内。
     
点对点模式的典型应用是两部支持NFC的手机或平板电脑实现数据的点对点传输，例如，下载音乐、交换图片或同步设备地址薄。因此，通过NFC，多个设备如数字相机，PDA，计算机，手机之间，都可以快速连接，并交换资料或者服务。
  

## NFC、蓝牙和红外之间的差异  
![][3]  
## NFC技术的未来前景  

- 电子标签识别
- 刷手机
- 点对点付款
- 身份识别
- 信息纪录



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-tag.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-sticker.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-bluetooth-diff.png
