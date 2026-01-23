---
title: NET多平台应用开发之——Windows上开发环境搭建(1)
categories:
  - 开发
  - F-跨平台
  - .NET MAUI
tags:
  - .NET MAUI
abbrlink: daeb2546
date: 2023-08-01 09:03:53
---
## 一 开发环境

* Windows 11专业版 22H2
* Microsoft Visual Studio Community 2022 (64 位)  版本 17.6.5
* Android SDK
* 真机或者模拟器

<!--more-->

## 二  软件下载及安装

### 2.1  Visual Studio 2022下载

[Visual Studio官网下载地址](https://visualstudio.microsoft.com/zh-hans/)

### 2.2 安装.NET 跨平台开发工具包

已安装情况下，选择：工具——>获取工具和功能，弹出安装界面选择`.NET Multi-platform App UI development`
![][01]

## 三 创建.NET MAUI项目

1-点击`文件`——>新建——>项目，弹出新建项目对话框，选择`.NET MAUI Blazor应用`

![][02]

2-配置项目信息(项目名称、存储位置)
![][03]

3-选择项目框架

![][04]

## 四 运行项目

运行前，请打开`开发人员模式`

![][05]

### 4.1 运行到window桌面

1-选择运行平台

![][06]

2-运行后效果

![][07]

### 4.2 运行到Android

1-选择运行平台

![][08]

2-运行后效果

![][09]
## 五 项目结构及编辑

### 5.1 项目结构

如下图所示：

依赖项：

* net7.0-android33.0：安卓平台依赖
* net7.0-ios：iOS平台依赖
* net7.0-maccatalyst：mac平台依赖
* net7.0-windows10.0.19041.0：Windows平台依赖

Platforms(平台)：

* Android、IOS、MacCatalyst、Tizen、Windows各个平台

Resources：

* AppIcon：图标
* Fonts：字体
* https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net：图片
* Raw：文本、音视频等文件
* Splash：启动文件
* Styles：样式文件

![][10]

### 5.2 项目编辑

1-布局文件(MainPage.xaml)

![][11]

2-代码逻辑(MainPage.xaml.cs)

![][12]


## 五 参考

* [Visual Studio官网下载地址](https://visualstudio.microsoft.com/zh-hans/)
* [.NET MAUI Tutorial - Build your first multi-platform app in C#](https://dotnet.microsoft.com/en-us/learn/maui/first-app-tutorial/intro)
* [.NET 多平台应用 UI 文档](https://learn.microsoft.com/zh-cn/dotnet/maui/?WT.mc_id=dotnet-35129-website)
* [什么是 .NET MAUI？](https://learn.microsoft.com/zh-cn/dotnet/maui/what-is-maui)


[01]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-install-choice-01.png
[02]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-create-maui-app-01.png
[03]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-create-app-config-01.png
[04]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-create-app-struct-01.png
[05]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-pravacy-open-01.png
[06]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-run-windows-config-01.png
[07]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-run-windows-view-01.png
[08]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-run-android-config-01.png
[09]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-run-android-view-01.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-project-struct-01.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-layout-view-01.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-net/net-maui-code-view-01.png