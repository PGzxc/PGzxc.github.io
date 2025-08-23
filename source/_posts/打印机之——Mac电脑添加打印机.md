---
title: 打印机之——Mac电脑添加打印机
categories:
  - 硬件
  - 打印机
tags:
  - 打印机
abbrlink: 59258ba4
date: 2021-10-23 13:36:30
---
## 一 概述

本文介绍Mac系统下，为电脑添加打印机，涉及以下功能：

* 串口打印：通过usb数据线串口连接打印机(usb串口线+mac电脑实现打印)
* Wi-Fi打印：第一次通过usb数据线连接电脑，为打印机添加无线设置，以后，mac通过Wi-Fi打印

<!--more-->

## 二 原料

* Mac电脑
* 打印机(佳能G3800)
* G3800软件驱动包
* WI-FI网络(串口打印不需要)

## 三 串口打印

### 3.1 硬件连接

用`type-c`扩展接口，连接打印机
![][1]

### 3.2 添加打印机

#### 添加打印机过程

依次点击：系统便好设置——>打印机与扫描仪，打开打印机和扫描仪添加页面
![][2]
点击左侧的`+`号，添加打印机
![][3]

#### 连接打印机前后界面对比

打印机没有连接电脑前
![][4]

打印机连接电脑后(列表显示打印机及连接类型-usb)

![][5]

#### 打印机添加

选中列表中的打印机，点击底部的添加按钮
![][6]
添加后的打印机及状态，显示在`打印机与扫描仪`列表中
![][7]

### 3.3 打印

选中要打印的照片或文件：文件——>打印，进行打印了

## 四 WI-FI打印(软件支持)

### 4.1 为打印机设置网络

官方软件(Canon Quick Menu)——>网路设置，打开网络设置对话框
![][8]
网络工具，检测连接的打印机
![][9]
点击配置，选择连接到的Wi-Fi
![][10]
连接好Wi-Fi后，显示管理员密码
![][11]
管理员密码是产品序列号，请查看打印机的序列号
![][12]

### 4.2 mac添加Wi-Fi打印机(将usb串口断开)

mac——>扫描仪与打印机——>`+`号，添加打印机，查看打印机列表
![][13]
点击其中一个进行连接，连接完成后，显示已连接打印机(usb串口已脱机)
![][14]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-device-connect-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-print-scanner.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-setting-add-button.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-connect-list-none.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-connect-list-device-usb.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-connect-list-device-usb-add.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-print-usb-on-list.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-software-net-settings.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-software-net-tools-device.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-software-net-tools-connect.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-software-net-tools-admin-password.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-printer-serial-no.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-connect-wifi-list.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-tools/printer-mac-wifi-device-add.png