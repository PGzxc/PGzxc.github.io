---
title: NAS入门之——My Cloud EX2未入网的路由器局域网组网(6)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
abbrlink: ce44e24c
date: 2021-10-18 22:40:00
tags:
---
## 一 概述

* 路由器(未接入网络)+NAS(My Cloud Ex2)，组成局域网络
* PC端(Windows端+Mac端)局域网访问NAS
* 移动端访问NAS

<!--more-->

## 二 设备清单

* 路由器(华硕RT-AC1750 B1 1750M 双频全千兆)
* NAS(西部数据My Cloud EX2)
* Windows电脑(windows 10)
* Mac电脑(MacOS Big Sur 11.6)

## 三 路由器+NAS 组成局域网

### 3.1 设备连接

My Cloud EX2 通过网线连接到路由器的其中一个~W~Lan口上

![][1]
注：注意WLan口和Lan口的区别
![][2]

### 3.2 查看路由器端接入设备情况
![][3]

### 3.3 用Windows端ping局域网内的NAS(ping通)

![][4]

## 四 PC端(Windows端+Mac端)局域网访问NAS(接入路由网络)

### 4.1 Windows端访问NAS

#### 添加My Cloud EX2 的网络路径

```
如：My Cloud EX2 Ultra 的网络路径为：\\MYCLOUDEX2ULTRA
```

#### 查看网络位置下的硬盘
![][5]

### 4.2  Mac端访问NAS

#### 获取网络设备

```
访达——>网络——>从网络设备列表中选取相应的网络设备(如My Cloud EX2 Ultra)
```

#### 查看网络位置下的硬盘
![][6]

## 五 移动端访问NAS

西部数据的App为`My Cloud`，打开后显示，暂不支持离线访问
![][7]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloud-route-nas-connect.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloud-route-lan-wlan.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloud-route-device-connect.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloud-windos-ping-nas.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloud-windows-web-position.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloud-mac-web-position.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloud-phone-state.png

