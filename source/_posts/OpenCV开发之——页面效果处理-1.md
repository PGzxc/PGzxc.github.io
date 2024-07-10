---
title: OpenCV开发之——页面效果处理(1)
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: 411aa813
date: 2021-08-02 16:27:52
---
## 一 概述

本文介绍人脸识别中的页面处理

* 后置摄像头置换为前置摄像头
* 人脸识别区域
* 人脸识别时的动画效果

<!--more-->

## 二 OpenCV默认的效果

### 2.1 效果图

![][1]

### 2.2 说明

* 默认使用后置摄像头
* 使用整个页面作为识别区域
* 检测到人脸头像时，人脸处出现识别框

## 三 后置摄像头置换为前置摄像头

### 3.1 代码

```
mOpenCvCameraView.setCameraIndex(CameraBridgeViewBase.CAMERA_ID_FRONT);
```
### 3.2 摄像头参数
```
public static final int CAMERA_ID_BACK = 99;
public static final int CAMERA_ID_FRONT = 98;
```

## 四 人脸识别区域

### 4.1 实现说明

* 将JavaCameraView外层包括一层父View
* 重新父View中的dispatchDraw（canvas)，重新绘制JavaCameraView
* 根据需要将JavaCameraView绘制圆形或椭圆

### 4.2 代码

#### 4.2.1 CircleViewGroup

```
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Path;
import android.util.AttributeSet;
import android.widget.FrameLayout;

public class CircleViewGroup extends FrameLayout {
    private float radio = 0;

    public CircleViewGroup(Context context) {
        super(context);
    }

    public CircleViewGroup(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public CircleViewGroup(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void dispatchDraw(Canvas canvas) {
        Path path = new Path();
        int verticalCenter    =  getHeight() / 2;
        int horizontalCenter  =  getWidth() / 2;
        radio=getWidth() / 3.5f;
        path.addCircle(horizontalCenter, verticalCenter, radio, Path.Direction.CW);
        canvas.clipPath(path);
        super.dispatchDraw(canvas);
    }

    @Override
    public boolean shouldDelayChildPressedState() {
        return false;
    }
}
```

#### 4.2.2 RoundRectViewGroup

```
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Path;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.widget.FrameLayout;

public class RoundRectViewGroup extends FrameLayout {
    private float radio = 0;

    public RoundRectViewGroup(Context context) {
        super(context);
    }

    public RoundRectViewGroup(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public RoundRectViewGroup(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void dispatchDraw(Canvas canvas) {
        Path path = new Path();
        radio=getWidth() / 3.5f;
        path.addRoundRect(
                new RectF(0, 0, getWidth(), getHeight())
                , new float[]{radio, radio, radio, radio, radio, radio, radio, radio}
                , Path.Direction.CW);
        canvas.clipPath(path);

        super.dispatchDraw(canvas);
    }

    @Override
    public boolean shouldDelayChildPressedState() {
        return false;
    }
}
```

### 4.3 布局文件

```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <org.opencv.samples.view.CircleViewGroup
        android:layout_width="630dp"
        android:layout_centerInParent="true"
        android:layout_height="630dp">

        <org.opencv.android.JavaCameraView
            android:id="@+id/fd_activity_surface_view"
            android:layout_width="fill_parent"
            android:layout_height="fill_parent" />
    </org.opencv.samples.view.CircleViewGroup>
</RelativeLayout>
```

### 4.4 效果图

| 圆形效果 | 矩形效果 |
| :------: | :------: |
|  ![][2]  |  ![][3]   |

## 五 人脸识别时的动画效果

### 5.1 说明

* 圆形区域的外层增加一层旋转动画
* 使用Lottie动画，作为旋转动画
* Lottie跟JavaCameraView同处于相对布局中

### 5.2 布局图

```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <RelativeLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:gravity="center">

        <org.opencv.samples.view.CircleViewGroup
            android:layout_width="630dp"
            android:layout_height="630dp"
            android:layout_centerInParent="true">

            <org.opencv.android.JavaCameraView
                android:id="@+id/fd_activity_surface_view"
                android:layout_width="600dp"
                android:layout_height="600dp"
                android:layout_centerInParent="true" />

        </org.opencv.samples.view.CircleViewGroup>

        <com.airbnb.lottie.LottieAnimationView
            android:id="@+id/animation_view"
            android:layout_width="400dp"
            android:layout_height="400dp"
            android:layout_centerInParent="true"
            app:lottie_autoPlay="true"
            app:lottie_fileName="anim/ring-rotate.json"
            app:lottie_loop="true" />
    </RelativeLayout>
</RelativeLayout>
```

### 5.3 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-default-samples.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-circle-effect.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-round-effect.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-ring-circle-view.gif