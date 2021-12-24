---
title: OpenCV开发之——页面效果处理(2)
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: 6a37fbd0
date: 2021-08-02 16:29:41
---
## 一 概述

本文介绍人脸识别中的页面处理

* 识别成功后的识别框显示与隐藏
* 识别成功后的识别框大小调整
* 识别成功后的图像截取

<!--more-->

## 二 识别成功后的识别框显示与隐藏

### 2.1 识别框显示代码

```
for (int i = 0; i < facesArray.length; i++){
      Imgproc.rectangle(mRgba, facesArray[i].tl(), facesArray[i].br(), FACE_RECT_COLOR, 3);
}
```

### 2.2 识别框隐藏

```
for (int i = 0; i < facesArray.length; i++){
      //Imgproc.rectangle(mRgba, facesArray[i].tl(), facesArray[i].br(), FACE_RECT_COLOR, 3);
}
```

## 三 识别成功后的识别框大小调整

### 3.1 调整前

```
val facesArray = faces.toArray()
```

### 3.2 调整后

```
val faceList = faces.toArray().flatMap {
            listOf(it.apply {
                it.x = it.x - 70
                it.y = it.y - 70
                it.width = it.width + 70
                it.height = it.height + 70
            })
        }
for (rect in faceList) {
        Imgproc.rectangle(mRgba, rect.tl(), rect.br(), FACE_RECT_COLOR, 3)
}        
```

说明：

* x坐标轴：向左移动70
* y坐标轴：向上移动70
* 宽度：增加70
* 高度：增加70

## 四 识别成功后的图像截取

### 4.1 截取识别框区域

```
  public static boolean saveImage(Mat image, Rect rect) {
        // 原图置灰
        Mat grayMat = new Mat();
        //Imgproc.cvtColor(image, grayMat, Imgproc.COLOR_BGR2GRAY);//灰度照片
        Imgproc.cvtColor(image, grayMat, Imgproc.COLORMAP_JET);//彩色照片
        // 把检测到的人脸重新定义大小后保存成文件
        Mat sub = grayMat.submat(rect);
        Mat mat = new Mat();
        Size size = new Size(500, 500);
        Imgproc.resize(sub, mat, size);
        return Imgcodecs.imwrite(getRecFileName(), mat);

    }
```

### 4.2 截取整个屏幕区域

```
    public static boolean saveImage(Mat image, Rect rect) {
      return Imgcodecs.imwrite(getRecFileName(), image);
    }
```

