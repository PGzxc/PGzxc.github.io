---
title: NAS入门之——My Cloud EX2网页登录及注销(8)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
abbrlink: 94f8c0db
date: 2024-04-25 10:28:07
---
##  一  说明

本文章包含以下内容

* 网页登录
* 网盘映射
* 网页注销

<!--more-->

## 二 网页登录

### 2.1 在浏览器中输入以下内容

```
1-http://mycloud.com/setup //注册页面
2-https://os5.mycloud.com/setup //设备选择页面
3-http://mycloudex2ultra/  //ex2跳转页面
```

### 2.2 到如下页面登录

![][1]

## 三 网盘映射

### 3.1 官网根据设备查找西部网盘对应的Name

网址：https://support-en.wd.com/app/answers/detailweb/a_id/25436/h/p2#subject2

```
My Cloud EX2 Ultra	\\MYCLOUDEX2ULTRA
```

![][2]

### 3.2 打开导航，输入`\\MYCLOUDEX2ULTRA`

![][3]

## 四 网页注销

![][4]

说明：

* 休眠：对应其他nas的关机
* 注销：退出当前账户登录

## 五 参考

1. [Map Drive by Name](https://support-en.wd.com/app/answers/detailweb/a_id/25436/h/p2#subject2)
2. [Welcome to My Cloud](https://os5.mycloud.com/setup)
3. [官网](https://www.mycloud.com/#/)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-my-cloud-ex2-web-login.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nax-my-cloud-ex2-device-name.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-my-cloud-ex2-naivgator-in.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-my-cloud-ex2-power-off.png