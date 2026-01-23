---
title: IOS开发之——工具-查看运行软件沙盒环境
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 901b68a8
date: 2020-07-09 22:47:26
---
## 一 什么是沙盒

* 每个iOS应用都有自己的应用沙盒(应用沙盒就是应用的文件夹)，与其他文件系统隔离。应用必须待在自己的沙盒里，其他应用不能访问该沙盒。
* 沙盒中有编译后的app应用文件和数据存储文件(如Documents,tmp,Caches,Preference)

<!--more-->

## 二 如何访问沙盒环境

* 为了访问应用沙盒，可以直接定位到模拟器应用沙盒位置或者借助于第三方工具快速查找到应用沙盒位置
* Xcode 11.5版本下，模拟器应用沙盒位置是：`/Users/x xx/Library/Developer/CoreSimulator/Devices`
* 第三方快速定位沙盒的工具有：[SimPholders](https://simpholders.com)(收费)，[simsim](https://github.com/dsmelov/simsim)(免费)，[OpenSim](https://github.com/luosheng/OpenSim)(免费)

## 三 直接访问如何查看沙盒文件

* 点击访达：前往——>个人——>资源库(Library)——>Developer——>CoreSimulator——Devices

  ![][1]
  
* 查找`data/Containers/Bundle/Application/xxx(随机数)/xxx.app

  ![][2]
  
* 查看数据存放位置：`data/Containers/Data/Application`

  ![][3]

## 四 第三方工具

### 4.1 SimPholders(10天试用期)

* 进入[SimPholders](https://simpholders.com)官网后，点击Free Trail进行试用下载

  ![][4]

* 运行程序后，点击工具栏上方的SimPholders，选择要打开的应用

  ![][5]

### 4.2  simsim

* 进入[simsim Releases](https://github.com/dsmelov/simsim/releases)页面，进行下载，解压后双击安装

  ![][6]
  
* 找到工具栏上的simsim图标，选择应用，在Finder打开

  ![][7]

### 4.3 OpenSim

* 进入[OpenSim Release](https://github.com/luosheng/OpenSim/releases)页面，进行下载，解压后双击运行

  ![][8]
  
* 找到工具栏上的Opensim图标，选择应用，在Finder打开

  ![][9]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-shahe-direct-devices-lists.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-shahe-direct-app-find.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-shahe-direct-data-folder.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-shahe-simpholders-try-download.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-shahe-simpholders-open.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-shahe-simsim-download.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-shahe-simsim-open.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-shahe-opensim-download.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-shahe-opensim-open.png