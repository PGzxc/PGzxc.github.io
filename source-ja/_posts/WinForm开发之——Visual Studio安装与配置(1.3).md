---
title: 'WinForm开发之——Visual Studio安装与配置(1.3)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: b600d284
date: 2020-07-07 22:51:21
---
## 一 概述

C#的开发工具是Visual Studio，Visual Studio 2019是一款便于学习和使用的开发工具，并且提供了大量的帮助文档供用户参考。本文介绍Visual Studio 2019的安装及安装中的配置

<!--more-->

## 二 材料

* Windows 7(64位)
* [.NET Framework(4.8)][11]
* [Visual Studio 2019(社区版)][12]

## 三 安装过程

* 双击Visual Studio 2019进行安装(下载启动所需文件)

  ![][1]
  
* 下载完成后，进入如图所示组件选择与安装页面

  ![][2]

* 选择`安装位置`选项卡，设置visual studio2019的安装位置(如果C盘空间不足，建议安装到其他盘符)

  ![][3]
  
* 选择`工作负载`选项卡，选择开发C#所需的组件:`.NET桌面开发`和`通用Windows平台开发`

  ![][4]

## 四  C盘文件映射到其他盘符

Visual Studio 2019会把一些文件默认安装到C盘，如果C盘空间不足，可能出现安装不了的情况，这时该如何处理呢？可以通过mklink /j将C盘文件映射到其他盘符空间

* mklink /j  ：创建目录连接点 

* 把C盘dotnet映射到D盘：

  ```
  mklink /J  C:\Program Files (x86)\dotnet  D:\SoftWare\Visual Studio\dotnet
  ```
  
* 把C盘Microsoft SDKs映射到D盘：

  ```
  mklink /J  C:\Program Files (x86)\Microsoft SDKs  D:\SoftWare\Visual Studio\Microsoft SDKs
  ```

## 五 启动与配置

* visual studio启动后，选择以后再说

  ![][5]
  
* 选择主题

  ![][6]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio-getfile.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio2019-component-install.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio2019-install-part.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio2019-net-component.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio2019-start-install.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio2019-theme-config.png



[11]:https://dotnet.microsoft.com/download
[12]:https://visualstudio.microsoft.com/zh-hans/vs/