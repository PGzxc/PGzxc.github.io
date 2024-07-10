---
title: OpenCV开发之——官方Samples介绍
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: '96329992'
date: 2021-07-09 10:17:49
---
## 一 概述

* 官方samples下包含8个示例：15-puzzle、camera-calibration、color-blob-detection、face-detection、image-manipulations、tutorial-1-camerapreview、tutorial-2-mixedprocessing、tutorial-3-cameracontrol
* 介绍8个示例项目的使用及效果

<!--more-->

## 二 示例介绍

### 2.1 15-puzzle(Puzzle15Processor.java介绍)

```
It converts the image from Camera into the shuffled image
```

#### 2.1.1 作用

* 将摄像头采集到的图像截取15个片段图片显示在多个显示框中
* 点击第16个(不透明)框可将上一个替换
* 右上角：Show/hide title numbers——>显示或隐藏数字
* 右上角：Start new game——>界面重新组合布局

#### 2.1.2 效果
![][1]

### 2.2 camera-calibration(CameraCalibrationActivity.java)

```
// This sample is based on "Camera calibration With OpenCV" tutorial:
// https://docs.opencv.org/3.4/d4/d94/tutorial_camera_calibration.html
//
// It uses standard OpenCV asymmetric circles grid pattern 11x4:
// https://github.com/opencv/opencv/blob/3.4/doc/acircles_pattern.png
// The results are the camera matrix and 5 distortion coefficients.
//
// Tap on highlighted pattern to capture pattern corners for calibration.
// Move pattern along the whole screen and capture data.
//
// When you've captured necessary amount of pattern corners (usually ~20 are enough),
// press "Calibrate" button for performing camera calibration.
```

#### 2.2.1 作用

* 非对称圆网格模式11x4图案对角点识别
* 识别成功后，点击识别出的图像`Captured`后面数字会增加
* 确定数字后，点击`Calibrate`校准，查看校准结果
* 确定数字后——>右上角——>Preview mode，可以选择模式

#### 2.2.2 效果图

**acircles_pattern图**
![][2]
**识别结果**

![][3]

### 2.3 color-blob-detection

#### 2.3.1 说明

* 色块检测
* 运行后，未进行色块检测
* 点击屏幕后，开始色块检测，屏幕上显示检测到的色块区域

#### 2.3.2 效果图
![][4]

### 2.4 face-detection

#### 2.4.1 说明

* 人脸识别功能
* 识别出人脸特征后，使用方框框住

#### 2.4.2 效果图
![][5]

### 2.5 image-manipulations(图像处理)

#### 2.5.1 说明(右上角——>选择)

* Preview GRBA：预览GRBA
* Histograms：色块直方图
* Canny：Canny边界效果
* Sepia：发黄的旧照片效果
* Sobel：索贝尔算子边界效果
* Zoom：局部图像放大显示
* Pixelize：马赛克效果
* Posterize：色彩分离

#### 2.5.2 效果图
![][6]

### 2.6 tutorial-1-camerapreview

#### 2.6.1 说明

通过`opencv:show_fps="true"`展示预览时的帧率
#### 2.6.2 效果图
![][7]

### 2.7 tutorial-2-mixedprocessing(混合效果)

#### 2.7.1 说明(右上角——>选择模式)

* Preview RGBA：RGBA预览模式
* Preview GRAY：灰度模式
* Canny：Canny边界效果
* Find features：查找特征量

#### 2.7.2 效果图

![][8]

### 2.8 tutorial-3-cameracontrol(相机定制效果)

#### 2.8.1 说明(右上角——>更多)

* Color Effect：选择颜色效果
* Resolution：相机大小尺寸

#### 2.8.2 效果
![][9]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-15-puzzle.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-acircles_pattern.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-camera-calibration.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-color-blob-detection.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-face-detection.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-image-manipulations.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-fps-show.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-mixed-processing.gif
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-camera-controler.gif
