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

在安装Flutter以及项目开发的过程中可能遇到各种各样的问题，本文加以记录并保持更新

<!--more-->

## 二 安装及配置过程中

### 2.1 flutter doctor——网络问题

由于国内访问Fluter有时可能会受到限制，在安装Fluter时，可能会出现如下问题：

* BITS Transfer 这是一个后台智能传输服务(BITS)的文件传输
* CHecking Dart SDK version...
* Ruilding pub upgrade..

#### 现象

| BITS Transfer | Dart SDK&Runing pub upgrade |
| :-----------: | --------------------------- |
|    ![][1]     | ![][2]                      |

####  原因

在国内访问Flutter有时可能会受到限制

#### 解决办法(windows下)

配置

Flutter官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中

```
PUB_HOSTED_URL=https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```
![][3]

配置后安装效果图
![][4]

### 2.2 flutter doctor——jre

#### 现象
![][5]
#### 原因

Android Studio的安装目录中"没有jre文件夹或jre下文件不完整"

#### 解决办法

将**JDK文件**丢到**Android Studio安装目录**的"jre"文件夹中即可


## 三 项目开发中



## 四 参考
[入门: 在Windows上搭建Flutter开发环境](https://flutterchina.club/setup-windows/)


[1]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-bits-transfer.png
[2]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-running-pub-update.png
[3]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-running-pub-update.png
[4]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-proxy-config-after.png
[5]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-doctor-bundle-java-error.png
