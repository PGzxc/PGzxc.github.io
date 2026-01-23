---
title: Mac系统开发之——终端Termius
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: a7a9df76
date: 2024-12-24 09:58:59
---
## 一 概述

* Termius下载及安装
* Termius使用

<!--more-->

## 二 Termius下载及安装

### 2.1 Termius下载

https://www.termius.com

### 2.2 Termius安装

注册安装完成后，如下图

![][1]

## 三 Termius使用

### 3.1 创建Host

1-选择`Create Host`

![][2]

2-添加Host连接信息

![][3]

3-连接状态(成功)

![][4]

### 3.2 操作

1-arp指令

```
ASUS-ZXC@RT-AC1750_B1-5088:/tmp/home/root# arp
? (192.168.1.4) at 2a:56:8f:38:83:91 [ether]  on br0
? (192.168.1.10) at <incomplete>  on br0
? (192.168.1.1) at 10:9f:47:d2:e4:8d [ether]  on br0
? (192.168.1.5) at <incomplete>  on br0
? (192.168.1.3) at 90:09:d0:02:1b:06 [ether]  on br0
? (192.168.1.12) at 04:7c:16:1f:62:cc [ether]  on br0
? (192.168.1.9) at <incomplete>  on br0
? (192.168.1.6) at <incomplete>  on br0
? (192.168.1.7) at 6a:51:91:a5:ba:41 [ether]  on br0
? (192.168.1.11) at <incomplete>  on br0
? (192.168.1.14) at ea:93:d0:f8:1e:87 [ether]  on br0
ASUS-ZXC@RT-AC1750_B1-5088:/tmp/home/root# 
```

2-ip

```
ASUS-ZXC@RT-AC1750_B1-5088:/tmp/home/root# ip addr
1: lo: <LOOPBACK,MULTICAST,UP,LOWER_UP> mtu 16436 qdisc noqueue state UNKNOWN 
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 brd 127.255.255.255 scope host lo
    inet 127.0.1.1/8 brd 127.255.255.255 scope host secondary lo:0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UNKNOWN qlen 1000
    link/ether d4:5d:64:2e:50:88 brd ff:ff:ff:ff:ff:ff
3: dpsta: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN 
    link/ether 00:00:00:00:00:00 brd ff:ff:ff:ff:ff:ff
4: eth1: <BROADCAST,MULTICAST,ALLMULTI,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UNKNOWN qlen 1000
    link/ether d4:5d:64:2e:50:89 brd ff:ff:ff:ff:ff:ff
5: eth2: <BROADCAST,MULTICAST,ALLMULTI,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UNKNOWN qlen 1000
    link/ether d4:5d:64:2e:50:8c brd ff:ff:ff:ff:ff:ff
6: vlan1@eth0: <BROADCAST,MULTICAST,ALLMULTI,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP 
    link/ether d4:5d:64:2e:50:88 brd ff:ff:ff:ff:ff:ff
7: vlan2@eth0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN 
    link/ether d4:5d:64:2e:50:88 brd ff:ff:ff:ff:ff:ff
8: br0: <BROADCAST,MULTICAST,ALLMULTI,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN 
    link/ether d4:5d:64:2e:50:88 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.2/24 brd 192.168.1.255 scope global br0
9: wl0.1: <BROADCAST,MULTICAST,ALLMULTI,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UNKNOWN qlen 1000
    link/ether d4:5d:64:2e:50:89 brd ff:ff:ff:ff:ff:ff
10: wl1.1: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN qlen 1000
    link/ether d4:5d:64:2e:50:8c brd ff:ff:ff:ff:ff:ff
```

3-绑定IP和Mad

```
arp -s 192.168.1.13 00:00:C0:39:32:F8
```

## 四 参考

* [Termius](https://www.termius.com)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-termius-install-view-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-termius-host-choice-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-termius-host-info-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-termius-host-login-4.png