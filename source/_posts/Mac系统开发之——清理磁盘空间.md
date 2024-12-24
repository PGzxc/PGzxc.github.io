---
title: Mac系统开发之——清理磁盘空间
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: dc8a15a3
date: 2021-01-25 09:30:07
---
## 一 概述

* Mac使用一段时间后，尤其是安装过软件开发工具(Xcode)和视频软件(腾讯视频等)，磁盘空间被大量占用
* 使用一般的磁盘清理软件又无法清除
* 本文介绍使用第三方磁盘整理软件，清理磁盘空间

<!--more-->

## 二 Disk Inventory X

### 2.1 软件下载地址

[Disk Inventory X下载地址][11]：http://www.derlien.com

### 2.2 软件安装及介绍

Disk Inventory X下载后，将Disk Inventory X.app拖放到应用程序下

![][1]

依次点击：系统偏好设置—>安全与隐私—>通用—>允许以下位置下载到App

```
App Store和被认可的开发者
```

### 2.3 软件使用

选择要进行磁盘分析的磁盘

![][2]

磁盘选定后，打开Open Volume，会进行磁盘扫描分析

![][3]

磁盘扫描完成后，打开磁盘文件夹大小排序

![][4]

## 三 磁盘清理

### 3.1 开发工具清理(xcode)

#### 3.1.1 Cache文件

```
~/Library/Developer/CoreSimulator/Caches
```

该目录存放模拟器的缓存数据，例如`dyld`等，占用空间也会达到十几G
![][5]
#### 3.1.2 Devices(设备)

Devices下是设备对应文件夹(对于不常用的设备，可以尝试删除)
![][6]

### 3.2 视频软件清理(腾讯视频为例)

磁盘清理内容

* ts文件
* log文件
* Caches文件

删除缓存的ts文件(或者log文件)
![][7]

## 四 参考

* [How to Free Disk Space on MacBook used for Development](https://pawelurbanek.com/macos-free-disk-space)
* [日常开发中，Xcode用了一段时间后，硬盘空间吃紧](https://www.jianshu.com/p/9b4d8616b51f)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-disk-inventory-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-disk-inventory-choice-disk.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-disk-inventory-fenxi.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-disk-inventory-folder-open.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-disk-xcode-library-cache.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-disk-device-folder-relate.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-disk-inventory-folder-tx-ts.png

[11]:http://www.derlien.com

