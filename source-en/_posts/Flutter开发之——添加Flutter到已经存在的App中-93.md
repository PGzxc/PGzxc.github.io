---
title: Flutter开发之——添加Flutter到已经存在的App中(93)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: ff284a0a
date: 2021-07-17 23:11:50
---
## 一 概述

* 原生应用具有跨平台框架不具备的优势
* Flutter优秀的路由，动画，ui设计可以快速完成项目开发
* 在已有的原生项目的基础上，导入Flutter，进行混合开发更具优势

<!--more-->

## 二 原生+Flutter混合开发限制

* 每个应用一次只能集成一个Flutter实例到应用程序中，不支持多个Flutter库打包
* Android上添加应用程序的插件基于[FlutterPlugin][11]，不支持[FlutterPlugin][11]的插件，可能会发生意想不到的结果
* 从v1.17开始，Flutter模块仅支持Android上的AndroidX应用程序

## 三 原生添加Flutter支持

### 3.1 Android
#### 过程
![][1]
#### 特点

* 原生项目通过Gradle脚本完成Flutter SDK添加，自动构建和Flutter模块导入
* [FlutterEngine][12]是可以在Android应用程序中运行Dart代码的容器，也是单个Flutter执行环境
* 原生项目使用Java和kotlin开发语言，Flutter使用Dart开发语言
* Flutter模块可以使用[Flutter插件](https://pub.dev/flutter)与平台交互
* 支持Flutter Debug调试时热加载

### 3.2 IOS
#### 过程
![][2]

#### 特点

* 通过Xcode开发工具和CocoaPods管理工具，完成Flutter SDK添加，自动构建和Flutter模块导入
* 将Flutter模块添加到[iOS框架中][13]，就可以使用Flutter进行开发工作
* [FlutterEngine][14]通过[FlutterViewController][15]完成Flutter的启动和管理
* 原生系统使用Object-C和Swift开发语言，Flutter模块使用Dart开发语言
* Flutter模块可以使用[Flutter插件](https://pub.dev/flutter)与平台交互
* 支持Flutter Debug调试时热加载



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-add-support-preview.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-add-overview.gif

[11]:https://api.flutter.dev/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[12]:https://api.flutter.dev/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[13]:https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html
[14]:https://api.flutter.dev/objcdoc/Classes/FlutterEngine.html
[15]:https://api.flutter.dev/objcdoc/Classes/FlutterViewController.html
