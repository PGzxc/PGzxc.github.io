---
title: Dart开发之——环境配置
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - 环境配置
abbrlink: 6f2a7b27
date: 2018-05-29 16:35:24
---
# 前言
Dart是一门小众语言，可用于开发服务器，Web应用，移动应用和游戏开发，目前尚不稳定，无法用于实际项目的开发。   

<!--more-->

# Dart简介
Dart可用于开发服务器，Web应用，移动应用和游戏开发
## 服务器
Dart可以做独立的服务器，还是挺靠谱的
## Web应用
1. Dart可以取代Javascrip，使前端开发更高效，更方便
2. 因为Dart也可以做服务器，所以开发Web项目只需要 Dart + Html5 + Css3 就搞定了
3. 最大的的缺点就是目前只有Chromium浏览器支持Dart，其他浏览器都不支持，但可以通过转换成JS文件来解决

## 移动应用
Flutter，一个Dart框架，可以用于开发Android与IOS应用，目前处于实验阶段
## 游戏开发
StageXL，一个Dart框架，用来开发2D游戏的，目前处于实验阶段

# 环境配置(Windows为例)
## 下载SDK
### 打开[官网地址][0] ，点击如图所示的安装选项 
![][1]    
### 在下载页面选择相应的SDK
说明：    

1. Flutter  SDK:移动端
2. Web SDK：Web页面
3. Dart VM：本文所需的安装环境   

![][2]
### 选择安装方式
![][3]
### 选择版本
版本分为稳定版和测试版，本文以稳定版为例  
![][4]


## 安装
### 安装步骤
1. 下载完成后，双击运行
![][5]  
2. 一直下一步(可能需要翻墙)
![][6]
### 添加环境变量 
![][7]
### 验证是否配置成功
打开CMD，输入 dart --version   

![][8]

# 第一个Dart文件
## 创建hello.dart文件
![][9]
## 打开CMD，运行文件
![][10] 


[0]: https://www.dartlang.org/
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dart-web.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dart-vm.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dart-win.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dart-download.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/setup.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/setup-continue.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dart-path.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dart-version.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dart-file.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dart-file-run.png
