---
title: Emby流媒体之——服务器端Windows破解(3)
categories:
  - 开发
  - J-NAS
  - Emby
tags:
  - Emby
abbrlink: 856f053a
date: 2024-08-27 09:08:19
---
## 一 概述

* Emby破解方式
* Emby是否破解了
* 下载Emby破解文件
* Emby破解

<!--more-->

## 二 Emby破解方式

解锁的方式其实分两类，一种是改客户端，一种是改服务端。最终原理一样，都是搭建仿冒认证服务器，让客户端访问到伪服务器从而获取授权信息

* 改客户端：有了伪服务器的前提下（关键词「搭建 EMBY 伪验证服务」），通过修改 hosts 文件的方式将 mb3admin.com 的 IP 解析到伪服务器，同时伪服务器和客户端都需要安装自签名证书。
* 改服务端：修改服务端源文件，将默认的认证服务器 mb3admin.com 地址直接改成自建或别人提供的伪服务器，这样就不需要在每个客户端安装自签名证书了

## 三 Emby是否破解了

1-进入Emby控制台，点击如图图标(当前版本4.8.8.0，破解时用)

![][1]

2-切换到`Emby Premiere`页面后，查看是否破解
![][2]

## 四 下载Emby破解文件

本文使用大佬提供的破解文件，替换原有文件

1-进入如下网盘，下载对应版本

```
https://act.jiawei.xin:10086/tmp/?dir=emby
```

图示

![][3]

2-进入对应版本目录后，根据平台选择下载文件

![][4]

## 五 Emby破解

1-解压文件后覆盖原有文件(先退出Emby)

![][5]

2-启动后查看破解状态

![][6]

## 六 参考

* [学习 Emby Server 解锁及优化](https://hgl2.com/2023/unlock-emby/)
* [网盘-下载](https://act.jiawei.xin:10086/tmp/?dir=emby)
* [重新学习并解锁emby](https://blog.jiawei.xin/?p=469)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-3-main-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-3-premiere-page-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-3-pan-version-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-3-pan-download-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-3-premiere-move-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-3-premiere-active-6.png