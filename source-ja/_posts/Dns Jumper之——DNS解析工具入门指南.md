---
title: Dns Jumper之——DNS解析工具入门指南
categories:
  - 工具
  - DNS Jumper
tags:
  - DNS Jumper
abbrlink: 46eb3abc
date: 2025-03-23 08:01:16
---
## 一 概述

* 软件介绍
* 软件下载及安装
* 软件使用

<!--more-->

## 二 软件介绍

* DNS Jumper 是一款免费的 DNS 配置工具，旨在帮助用户快速选择和切换不同的 DNS 服务器。
* DNS（Domain Name System）是互联网的"电话簿"，负责将域名（如 www.baidu.com）解析为 IP 地址。
* DNS Jumper 允许用户轻松选择、测试和配置 DNS 服务器，以提高上网速度、稳定性和安全性
* DNS Jumper目前最新版本为V2.3

## 三 软件下载及安装

### 3.1 下载地址

1.官网下载地址：https://www.dnsjumper.org/download-for-windows

2.社区下载地址：https://www.sordum.org/7952/dns-jumper-v2-3/

### 3.2 安装(双击安装完成后如下图)

![][1]

## 四  软件使用

### 4.1 查看自带DNS服务器列表

1-点击`选择一个DNS服务器`右侧的设置图标
![][2]

2-弹出的窗口，选择`DNS列表`项，查看DNS列表下自带的DNS服务器

![][3]

### 4.2 添加/删除DNS服务器(以添加为例)

1-在DNS列表下方，依次输入DNS服务器名称及两个DNS服务器地址

```
名称：114DNS 
首选地址：114.114.114.114 
备用地址：114.114.115.115
```

图示

![][4]

2-添加后效果图如下

![][5]

### 4.3 DNS测速

1-点击右侧的`最快DNS`按钮

![][6]

2-弹出窗口，点击下方的`开始DNS测试`

![][7]

3-稍等片刻，显示测试结果

![][8]

### 4.4 应用DNS服务器

1-主界面，选择一个DNS服务器列表中选择一个(本文选择Google DNS)

![][9]

2-点击右侧的`应用DNS`添加应用

![][10]

3-本机的DNS已添加修改(与DNS Jumper相同)

![][11]

### 4.5 恢复默认设置

1-点击`选择网络适配器`右侧的星星

![][12]

2-弹窗窗口，选择`恢复NDS`

![][13]

3-本机的DNS服务器恢复默认值(自动)

![][14]

## 五  使用DNS能做什么

* 无需VNP能访问Github或Gradle等资源网站
* 提高上网体验和防范网络威胁

## 六 参考

* [博客园—DNS Jumper v2.3 是什么？](https://www.cnblogs.com/suv789/p/18565260)
* [Dns Jumper v2.3](Dns Jumper v2.3)
* [知乎—公共DNS哪家强？](https://www.zhihu.com/question/32229915/answer/86849882962)
* 



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-home-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-setting-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-list-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-add-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-addview-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-fastjump-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-fasttest-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-fastresult-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-applychoice-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-apply-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-applydif-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-rexing-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-restore-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dnsjumper-1-redefault-14.png