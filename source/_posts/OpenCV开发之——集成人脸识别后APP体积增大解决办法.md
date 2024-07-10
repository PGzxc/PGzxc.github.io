---
title: OpenCV开发之——集成人脸识别后APP体积增大解决办法
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: 9e92dedd
date: 2021-07-16 15:01:15
---
## 一 现象

* 原有项目(导入人脸检测和人脸识别前)，打包体积不到10M
* 导入人脸检测和人脸识别后，打包体积竟然700M左右

![][1]

<!--more-->

## 二 问题分析(体积增大来自哪里)

### 2.1 opencv官方示例打包(10M左右)

![][2]

### 2.2 apk包分析(Build——>Analyze APK)

#### 2.2.1 opencv官方apk分析

影响apk大小的主要是lib下arm64-v8a

![][3]

#### 2.2.2 导入(opencv和javacpp及javacv)

影响apk大小的因素：org包及lib下各种ABI

![][4]

### 2.3 分析结果

javacv-platform和javacpp-platform将各平台的依赖都添加了进来

![][5]


## 三 解决办法(去除其他平台依赖)

### 3.1 保留人脸检测(opencv和人脸识别),替换platform为指定ABI

**依赖**

```
//人脸检测
implementation project(':opencv')
//人脸识别
implementation 'org.bytedeco:javacv:1.5.5' //javac
implementation group: 'org.bytedeco', name: 'openblas', version: '0.3.13-1.5.5', classifier: 'android-arm64'
implementation group: 'org.bytedeco', name: 'opencv', version: '4.5.1-1.5.5', classifier: 'android-arm64'
```

**打包后结果** 

```
arm64-v8a-release.apk：37.4M
```

### 3.2 只保留人脸检测(opencv)，将本地人脸识别去掉，结果放云端识别结果返回

**依赖**

```
//人脸检测
implementation project(':opencv')
//人脸识别处理
implementation 'org.bytedeco:javacv:1.5.5' //javac
```

**打包后结果**

```
arm64-v8a-release.apk：16.2M
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-package-release-size-big.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-sample-list-size.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-facedetect-apk-analyze.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-import-opencv-javacpp-analyze.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-javacpp-platform-imported.png