---
title: NAS入门之——My Cloud EX2+中继路由接入网络访问(7)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
abbrlink: ec8321cc
date: 2021-12-19 00:05:24
---
## 一 中继网络接入示意图
![][1]

<!--more-->

## 二 接入中出现的问题

### 2.1 官方接入及访问示例

```
http://mycloud.com/setup
```

![][2]

### 2.2 访问出现异常
![][3]

## 三 解决办法

### 3.1 通过中继路由器，查看接入中继路由器的NAS的ip地址(192.168.1.4)
![][4]

### 3.2 通过中继路由器中设备的ip访问

```
http://192.168.1.4
```
![][5]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-net-connect.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-guanfang-director.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-guanfang-director-error.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-zhongji-device-list-nas.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-zhongji-web-info.png