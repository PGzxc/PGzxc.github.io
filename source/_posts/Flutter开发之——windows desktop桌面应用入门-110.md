---
title: Flutter开发之——windows desktop桌面应用入门(110)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: cb030a1e
date: 2021-12-10 16:58:52
---
## 一 概述

* Windows-desktop材料
* 创建Windows-desktop过程
* visual studio 2019打开flutter-windows

<!--more-->

## 二 Windows-desktop材料

* 开发电脑：Windows 10
* flutter：2.5.3
* Dart:2.14.4
* Visual Studio 2019
* Intellij 

## 三 创建Windows-desktop过程

### 3.1 安装Visual Studio2019,并添加桌面开发环境

在桌面应用和移动应用中勾选需要的开发程式：

* .NET桌面开发
* C++桌面开发
* 通用Windows平台开发(C#)

![][0]

### 3.2 项目添加桌面应用支持

#### 项目创建对比

* 指令执行前：未执行指令前，只能创建android、ios、web项目，无法创建desktop项目
* 指令执行后：可以创建android、ios、web、Windows、linux、macos项目

| 执行前 | 执行后 |
| :----: | :----: |
| ![][1] | ![][2] |
| ![][4] | ![][3] |

#### 创建指令

```
 flutter config --enable-windows-desktop
 flutter config --enable-macos-desktop
 flutter config --enable-linux-desktop
```

说明：

* 项目下打开终端Terminal，执行终端创建指令
* 重启工具后，desktop项目对应的按钮可选
* 重启后，恢复到默认项目创建状态

#### 查看Flutter支持devices

输入如下指令

```
flutter devices
```

输出结果

```
4 connected devices:

BAH3 W09 (mobile) • TFMNU20624108581 • android-arm64  • Android 10 (API 29)
Windows (desktop) • windows          • windows-x64    • Microsoft Windows [Version 10.0.19043.1348]
Chrome (web)      • chrome           • web-javascript • Google Chrome 96.0.4664.45
Edge (web)        • edge             • web-javascript • Microsoft Edge 96.0.1054.43
```

Windows (desktop)：说明支持desktop桌面开发

### 3.3 运行desktop项目

在设备列表中选择Windows desktop
![][5]

运行后的效果图
![][6]

编译生成的windows desktop文件位置

```
flutter项目\build\windows\runner\Debug&Release
```

![][7]

## 四  visual studio 2019打开flutter-windows

Visual Studio 2019：文件——>打开——>文件夹(flutter windows)

![][8]

## 五 参考
* [Flutter官网-Desktop support for Flutter](https://docs.flutter.dev/desktop)


[0]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-desktop-visual-studio-support.png
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-desktop-intellij-project-platform-type.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-desktop-intellij-project-platform-types.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-desktop-project-platform-file.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-desktop-project-platform-files.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-desktop-run-windows-select.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-desktop-run-project-preview.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-desktop-run-project-windows-files.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-desktop-visual-studio2019-view.png