---
title: OpenCV开发之——运行官方提供的示例
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: e272a37b
date: 2021-07-06 17:52:53
---
## 一 概述

* OpenCV项目地址
* OpenCV下载
* OpenCV项目导入并运行

<!--more-->

## 二 OpenCV项目地址

* [Github地址-opencv](https://github.com/opencv/opencv)
* [OpenCV官网地址](https://opencv.org/)

## 三 OpenCV下载

### 3.1 从OpenCV官网下载

* 进入[OpenCV官网地址](https://opencv.org/)，点击`Library`——>Release

  ![][1]

* 从Release页面中选择要下载的版本和平台

  ![][2]
  
* 选择平台(Android)后，跳转到https://sourceforge.net/下载页面

  ![][3]

### 3.2 Github项目地址下载

* 进入[Github-opencv](https://github.com/opencv/opencv)地址，选择右侧的 Release链接

  ![][4]
  
* Release页面中选择要下载的版本和平台
 ![][5]

## 三 OpenCV项目导入并运行

### 3.1 解压

```
-samples
-sdk
```

* samples：android项目示例
* sdk：opencv sdk

### 3.2 samples和sdk文件夹一起copy

* 依次点击：File——>Project Structure——>SDK Location，选择`NDK`路径

  ![][6]
  
* 项目编译完成后如图所示

  ![][7]

### 3.3 项目说明(setting.gradle)

```
def opencvsdk='../'
include ':opencv'
project(':opencv').projectDir = new File(opencvsdk + '/sdk')
```

* opencvsdk：'../'与samples上一级sdk目录位置(若单独copy samples，此处需要修改)

### 3.4 效果图
![][8]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv_website.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-release-choice.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-sourceforge-download.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-github-website.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-github-android-choice.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-ndk-location.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-commond-project-build.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-sample-face-detection.png