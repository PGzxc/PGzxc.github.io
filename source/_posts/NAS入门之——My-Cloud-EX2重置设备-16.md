---
title: NAS入门之——My Cloud EX2重置设备(16)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2 Ultra
abbrlink: b4be193b
date: 2024-12-13 10:55:33
---
## 一 概述

* 因何操作无法访问NAS
* 重置设备重新设置

<!--more-->

## 二 因何操作无法访问NAS

### 2.1 原因

```
网络服务 DHCP设置了Google DNS
```

### 2.2 步骤(不要进行此操作)

1、登录后，点击：设置—>网络—>网络服务—>IPV4网络—>DHCP

![][1]

2、点击DHCP后，点击Google Public DNS并应用

![][2]

### 2.3 结果

```
重启后，无法查找到NAS设备
```

## 三 重置设备重新设置

### 3.1 重置前说明

```
1-硬盘数据不会丢失
2-登录密码会丢失，跳转到登录页面后，用户名admin，密码不需要设置点击后修改
3-网络模式恢复默认值
```

### 3.2 找到设备的重置按钮

根据自己的设备找到重置按钮，如下图，长按5秒左右

![][3]

### 3.3 登录后设置新密码

```
登录后，用户名admin，不需要设置密码，点击登录，需要设置新密码
```

## 四 参考

* [My Cloud OS 5: 如何重置My Cloud OS 5 设备](https://support-cn.wd.com/app/answers/detailweb/a_id/31874/initiator/user)




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-net-dhcp-1.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-net-dns-google-2.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-device-reset-btn-3.png
