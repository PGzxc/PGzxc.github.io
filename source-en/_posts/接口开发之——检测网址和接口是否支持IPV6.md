---
title: 接口开发之——检测网址和接口是否支持IPV6
categories:
  - 开发
  - G-后端开发
  - 接口
tags:
  - IPV6
abbrlink: e047050f
date: 2020-10-04 22:23:19
---
## 一 概述
有些应用市场(比如应用宝)在上传app时，需要提供接口是否支持IPv6，那么
* 什么是IPv6
* IPv4与IPv6的区别
* 如何判断网站和接口是否支持IPv6

![][1]

<!--more-->
## 二 IPv4与IPv6的区别

|        描述        |                      IPv4                      |                       IPv6                       |
| :----------------: | :--------------------------------------------: | :----------------------------------------------: |
| 地址协议(地址长度) |                  32位(4字节)                   |                  128位(16字节)                   |
| 数据包(数据包碎片) |   协议的数据包碎片由转发路由器和发送主机完成   |         协议的数据包碎片仅有发送主机完成         |
|      DNS记录       |       指针(PRT)记录，IN-ADDR.ARPA NDS域        |          指针(PRT)记录，IP6.ARPA NDS域           |
|    地址解析协议    | 地址解析协议(ARP)可用于将IPV4地址映射到Mac地址 | 地址解析协议(ARP)被邻居发现协议(NDP)对功能所取代 |
|   身份验证和加密   |                     不提供                     |                提供身份验证和加密                |

## 三 如何检测网址和接口是否支持IPv6

### 3.1 检测地址

[http://ipv6-test.com/validate.php][12]

### 3.2 检测方法

* 支持IPv6

  ![][2]
  
* 不支持IPv6

  ![][3]


## 四 参考
* [IPv4与IPv6之间的区别是什么][11]
* [阿里云服务器以及CDN支持IPV6的方法][13]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ipv6-support.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ipv6-test-pass.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ipv6-test-fail.png

[11]:https://www.php.cn/windows-413502.html
[12]:http://ipv6-test.com/validate.php
[13]:https://blog.csdn.net/ei__nino/article/details/71331717