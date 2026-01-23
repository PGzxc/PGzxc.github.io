---
title: Emby流媒体之——服务器端西部数据NAS(6)
categories:
  - 开发
  - J-NAS
  - Emby
tags:
  - Emby
abbrlink: 85ae498e
date: 2024-08-30 07:44:58
---
## 一 概述

* 设备软硬件介绍
* emyb for WD下载
* WD安装Emby
* 配置Emby

<!--more-->

## 二 设备软硬件介绍

1-软硬件环境介绍

* 硬件：WD My Cloud EX2 Ultra
* 固件：5.28.105

2-图示

![][1]

## 三 emyb for WD下载

1-打开emby官网，切换到下载标签

```
https://emby.media/download.html
```

2-Emby Server—>NAS—>Western Digital（OS5）

![][2]

3-选择对应WD NAS版本下载(emby-server-western_digital_ex2_ultra_os5_4.8.8.0_arm.bin)

![][3]

## 四 WD安装Emby

1-登录西部NAS，切换到应用选项

![][4]

2-点击`手动安装应用`，选择下载的emby

![][5]

3-安装完成后，`已安装的的应用`显示已安装emby

![][6]

## 五 配置Emby

1-点击`Emby Server`中的`配置`按钮

![][7]

2-在打开的网页中初始化emby后页面如图

![][8]


## 六 参考


* [emby官网-NAS-WD](https://emby.media/download.html)
* [知乎—群晖nas如何安装emby](https://zhuanlan.zhihu.com/p/622800596)


[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-6-wd-version-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-6-wd-download-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-6-wd-download-choice-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-6-wd-app-page-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-6-wd-app-install-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-6-wd-app-install-finish-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-6-wd-server-config-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-6-wd-server-webui-8.png