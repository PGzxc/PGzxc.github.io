---
title: IOS开发之——使用Sideloadly给ipa签名并安装
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 1c86e79e
date: 2025-09-15 08:32:22
---
## 一 概述

```
本文介绍：
 - Mac系统安装Sideloadly软件
 - 使用Sideloadly软件给ipa签名并安装到设备
```

<!--more-->

## 二 使用前准备

```
1.Mac电脑/Windows电脑(本文选择Mac电脑)
2.Apple ID账户
3.Sideloadly
4.ipa软件(待安装软件)
```

## 三 Sideloadly软件下载

### 3.1 下载地址

```
https://sideloadly.io/#download
```

### 3.2 安装Sideloadly

```
双击后，将Sideloadly拖动到Applications
```

### 3.3 隐私与安全性点击同意

```
隐私与安全性——>安全性——>同意
```

## 四 安装应用

### 4.1 初始打开界面

![][1]

### 4.2 配置三个信息

```
1、设备：第一次需要通过数据线链接
2、Apple ID账户(密码点击Start按钮后输入)
3、ipa软件(点击IPA添加)
```

图示

![][2]

### 4.3 高级选项

```
点击Advanced Options，弹出高级选项界面(自行修改):
 -修改App名字
 -修改app版本
 -修改app Bundle ID
```

图示

![][3]

### 4.4 点击Start按钮，输入密码

图示

![][4]

### 4.5 开始安装IPA

| 1-安装进度 | 2-安装完成 |
| :--------: | :--------: |
|   ![][5]   |   ![][6]   |

## 五 额外配置

### 5.1 注册SideLoadly账号

```
注意：执行之后
Device和Apple ID已保存
```

![][7]

### 5.2 自动刷新续签

```
Sideloadly 自动续签可以通过有线和无线两种方式
-有线方式：通过 USB 线自动续签比较简单
-无线方式：手机和运行 Sideloadly 的电脑必须连接同一个 WiFi
```

图示

![][8]

## 六  参考

* [SideLoadly官网](https://sideloadly.io/#download)
* [别人分享—Sideloadly使用教程](https://sssis.me/sideloadly.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sideloadly-1-open-view-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sideloadly-1-run-config-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sideloadly-1-run-config-advance-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sideloadly-1-password-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sideloadly-1-progress-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sideloadly-1-done-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sideloadly-1-login-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sideloadly-1-refresh-8.png