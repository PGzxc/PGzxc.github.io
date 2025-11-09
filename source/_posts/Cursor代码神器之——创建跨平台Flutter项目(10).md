---
title: Cursor代码神器之——创建跨平台Flutter项目(10)
categories:
  - 开发
  - Q-AI
  - 开发助力    
  - Cursor
tags:
  - Cursor
abbrlink: ac80c50e
date: 2025-01-06 09:37:52
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

### 2.1 开发环境

* 系统：Windows 11 专业版 23H2
* 工具：VSVode+Intellij+Cursor
* 开发语言：Dart

### 2.2 flutter相关信息

```
C:\Users\83422>flutter --version
Flutter 3.27.1 • channel stable • https://github.com/flutter/flutter.git
Framework • revision 17025dd882 (12 days ago) • 2024-12-17 03:23:09 +0900
Engine • revision cb4b5fff73
Tools • Dart 3.6.0 • DevTools 2.40.2


flutter doctor

Flutter assets will be downloaded from https://storage.flutter-io.cn. Make sure you trust this source!
Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel stable, 3.27.1, on Microsoft Windows [版本 10.0.22631.4602], locale zh-CN)
[√] Windows Version (Installed version of Windows is version 10 or higher)
[√] Android toolchain - develop for Android devices (Android SDK version 34.0.0)
[√] Chrome - develop for the web
[√] Visual Studio - develop Windows apps (Visual Studio Community 2022 17.11.4)
[√] Android Studio (version 2024.2)
[√] IntelliJ IDEA Ultimate Edition (version 2024.1)
[√] Connected device (3 available)
[√] Network resources

• No issues found!
```

## 三 实现步骤

* 使用Intellij创建flutter项目
* 使用Cursor打开并运行to-do项目
* 明确要使用到的开发语言：dart
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
帮我生成一个flutter to-do项目
```

## 五 生成项目

### 5.1 Intellij创建flutter项目

1-依次点击：File—New—>Project

![][1]

2-创建完成后，项目目录结构

![][2]

### 5.2 使用Cursor改造此项目

1-Cursor打开Intellij创建的项目

![][3]

2-输入关键词，改造Flutter项目(点击Accept接收代码)

```
我已创建一个flutter默认项目，基于此环境帮我生成一个flutter to-do项目
```

图示

![][4]

### 5.3 问题解决

将生成lib目录替换lib/main

![][5]


## 六 运行并查看项目

1-选择chrome，运行到Web端

![][6]

2-运行效果图

![][7]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-10-flutter-create-project-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-10-flutter-struct-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-10-flutter-cursor-open-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-10-flutter-cursor-create-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-10-flutter-cursor-move-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-10-flutter-cursor-chrome-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-10-flutter-cursor-chrome-view-7.png


