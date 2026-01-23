---
title: Dart开发之——IDE工具介绍
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: ab51e99b
date: 2021-01-20 17:39:00
---
## 一 概述

为了便于快速开发dart，本文介绍几款Dart开发IDE

* Intellij&Android Studio
* VS Code

<!--more-->

## 二 Intellij&Android Studio

### 2.1 说明

* Android Studio是基于IntelliJ IDEA开发的安卓开发工具
* 给IDE工具安装Flutter和Dart插件，可以进行Dart开发

### 2.2 插件安装(Intellij为例)

依次点击：File—>Settings—>Plugins—>搜索如下插件

  ```
  Flutter:快速构建Flutter项目插件
  Dart:快速构建Dart项目插件
  Flutter Enhancement Suite:Flutter增强套件
  ```
![][1]
### 2.3 新建测试Demo

依次点击：File—>New—>Project，打开项目创建对话框

  ```
  左侧：选择Dart选项卡
  Dart SDK Path:选择Dart SDK路径
  Generate sample content:默认不勾选(勾选会生成多余文件)
  ```
![][2]
输入创建项目名称
![][3]
添加Demo.dart
![][4]
右键，运行项目
![][5]
## 三 VS Code

### 3.1 插件安装

打开VS Code商店，搜索`flutter`，`dart`插件
![][6]

###  新建Dart项目

VS Code打开Dart项目文件夹，并新建`demo.dart`文件
![][7]

点击`Run`运行项目，查看结果输出
![][8]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-intellij-plugin-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-intellij-dart-project-create.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-intellij-create-project-demo.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-intellij-demo-code.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-intellij-code-run.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-vscode-plugin-dart-search.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-vscode-project-create.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-vscode-ide-code-run.png
