---
title: Flutter开发之——安装中出现的问题及解决办法
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: '25598276'
date: 2021-01-11 10:34:23
---
## 一 概述

由于国内访问Fluter有时可能会受到限制，在安装Fluter时，可能会出现如下问题：

* BITS Transfer 这是一个后台智能传输服务(BITS)的文件传输
* CHecking Dart SDK version...
* Ruilding pub upgrade..

<!--more-->

## 二 现象

### 2.1 BITS Transfer
![][1]
### 2.2 Dart SDK&Runing pub upgrade
![][2]
## 三 原因

在国内访问Flutter有时可能会受到限制

## 四 解决办法(windows下)

### 4.1 配置

Flutter官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中

```
PUB_HOSTED_URL=https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```
![][3]

### 4.2 配置后安装效果图
![][4]
## 五 参考
[入门: 在Windows上搭建Flutter开发环境](https://flutterchina.club/setup-windows/)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-flutter/flutter-bits-transfer.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-flutter/flutter-running-pub-update.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-flutter/flutter-running-pub-update.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN@master/blog-flutter/flutter-proxy-config-after.png
