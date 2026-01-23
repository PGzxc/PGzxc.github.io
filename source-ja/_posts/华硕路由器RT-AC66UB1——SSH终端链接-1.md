---
title: 华硕路由器RT-AC66UB1——SSH终端链接(1)
categories:
  - 硬件
  - 华硕
  - RT-AC66UB1
tags:
  - RT-AC66UB1
abbrlink: 55425b5c
date: 2025-07-27 11:12:17
---
## 一 概述

* 工具列表
* 路由器启用SSH服务
* MobaXterm通过SSH连接路由器
* 指令查看相关信息

<!--more-->

## 二 工具列表

* 硬件(路由器)：RT-AC66UB1
* 软件(SSH终端)：MobaXterm 
* 操作环境：Win11

## 三 路由器启用SSH服务

### 3.1 登录路由器，依次点击：系统管理—>系统设置—>服务—>启用SSH

![][1]

### 3.2 打开SSH并设置端口号

![][2]

## 四 MobaXterm通过SSH连接路由器

### 4.1 MobaXterm通过SSH连接(输入IP+端口)

![][3]

### 4.2 登录成功后界面

![][4]

## 五 指令查看相关信息

### 5.1 系统架构

```
1、输入指令
uname -a

2、显示
Linux RT-AC1750_B1-5088 2.6.36.4brcmarm #1 
SMP PREEMPT Wed Feb 19 14:26:19 CST 2025 armv7l ASUSWRT
```

### 5.2 磁盘信息

```
1、指令
df -h

2、显示信息

Filesystem                Size      Used Available Use% Mounted on
rootfs                   41.1M     41.1M         0 100% /
/dev/root                41.1M     41.1M         0 100% /
devtmpfs                124.8M         0    124.8M   0% /dev
tmpfs                   124.9M    876.0K    124.0M   1% /tmp
/dev/mtdblock4           62.8M      1.9M     60.9M   3% /jffs
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-device/asus-1-ssh-default-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-device/asus-1-ssh-open-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-device/asus-1-router-login-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-device/asus-1-router-ssh-4.png