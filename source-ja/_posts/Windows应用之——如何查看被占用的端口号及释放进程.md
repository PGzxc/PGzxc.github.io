---
title: Windows应用之——如何查看被占用的端口号及释放进程
categories:
  - 系统
  - Windows
tags:
  - 端口占用
abbrlink: 48bca679
date: 2019-12-26 21:31:18
---
## 一 现象
你可能遇到这样的情况，执行某项指令时显示“error The port 1337 is already used by another application”，这样的情况下如何查看被占用的端口号和释放应用呢？这就是本节将要解决的问题。 
![][1]
<!--more-->

## 二 查看被占用的端口号

### 2.1 netstat工具介绍

* Netstat是[控制台](https://baike.baidu.com/item/控制台)命令,是一个监控TCP/IP网络的非常有用的工具，它可以显示[路由表](https://baike.baidu.com/item/路由表/2707408)、实际的[网络](https://baike.baidu.com/item/网络)连接以及每一个网络接口设备的状态信息。Netstat用于显示与IP、[TCP](https://baike.baidu.com/item/TCP)、[UDP](https://baike.baidu.com/item/UDP)和[ICMP](https://baike.baidu.com/item/ICMP)协议相关的统计数据，一般用于检验本机各[端口](https://baike.baidu.com/item/端口/103505)的网络连接情况

### 2.2 使用netstat查看被占用的端口号

* 打开终端，输入下面的指令，查询与端口号对应的进程PID

  ```
  netstat -aon | findstr "1337"
  ```
  ![][2]

* 根据进程PID，查询对应的应用 

  ```
  tasklist | findstr "5056"
  ```

  ![][3]

## 三 关闭暂用的资源，释放端口

* 打开windows任务管理器，切换到进程选项卡
![][4]

* 右键关闭占用端口的应用
![][5]
  


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-port-in-used.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-netstat-find-pid.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-tasklist-find-application.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-manager-open.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-manager-close-port.png