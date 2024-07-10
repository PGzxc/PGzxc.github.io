---
title: P5.js开发之——2D图形绘制(4)
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: c7c778
date: 2021-10-13 16:04:56
---
## 一 概述

本文介绍通过P5.js绘制常见的2D形状

| 编号 |  图形  |    函数    |
| :--: | :----: | :--------: |
|  1   |  弧形  |   arc()    |
|  2   | 椭圆形 | ellipse()  |
|  3   |   圆   |  circle()  |
|  4   |  直线  |   line()   |
|  5   |   点   |  point()   |
|  6   | 四角形 |   quad()   |
|  7   |  方形  |   rect()   |
|  8   |  方形  |  square()  |
|  9   | 三角形 | triangle() |

<!--more-->

## 二 项目创建

### 2.1 通过VSCode插件创建P5.js项目

```
index.html
sketch.js
```

### 2.2  新建libs文件夹，并将p5.js 复制到libs目录下，并添加引用(index.html)

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>p5demo</title>
    <script src="./libs/p5.js"></script>
</head>
<body>
	<script src="sketch.js"></script>
</body>
</html>
```

## 三 2D图形绘制—代码复制到draw函数

### 3.1 [弧形—arc()][00]

#### 代码及预览
![][1]

#### 参数及说明

```
arc(x, y, w, h, start, stop, [mode], [detail])
```

|  参数  |                           说明                            |
| :----: | :-------------------------------------------------------: |
|   x    |                数字：弧形的椭圆形的 x 坐标                |
|   y    |                数字：弧形的椭圆形的 y 坐标                |
|   w    |                 数字：弧形的椭圆形的宽度                  |
|   h    |                 数字：弧形的椭圆形的高度                  |
| start  |             数字：弧形开始的角度，用弧度定义              |
|  stop  |             数字：弧形结束的角度，用弧度定义              |
|  mode  | 常数：可选参数用以定义弧形的画法，可用 CHORD、PIE 或 OPEN |
| detail |                 数字：WebGL模式的可选参数                 |

### 3.2 [椭圆形—ellipse()][01]

#### 代码及预览
![][2]

#### 参数及说明

```
ellipse(x, y, w, [h])
ellipse(x, y, w, h, [detail])
```

|  参数  |           说明           |
| :----: | :----------------------: |
|   x    |  数字：椭圆形的 x 坐标   |
|   y    |  数字：椭圆形的 y 坐标   |
|   w    |    数字：椭圆形的宽度    |
|   h    |    数字：椭圆形的高度    |
| detail | 整数：椭圆形的径向扇区数 |

### 3.3 [圆—circle()][02]

#### 代码及预览
![][3]

#### 参数及说明

```
circle(x, y, d)
```

| 参数 |       说明        |
| :--: | :---------------: |
|  x   | 数字：圆的 x 坐标 |
|  y   | 数字：圆的 y 坐标 |
|  d   |  数字：圆的直径   |

### 3.4 [直线—line()][03]

#### 代码及预览

![][4]
#### 参数及说明

```
line(x1, y1, x2, y2)
line(x1, y1, z1, x2, y2, z2)
```

| 参数 |          说明           |
| :--: | :---------------------: |
|  x1  | 数字：第一个点的 x 坐标 |
|  y1  | 数字：第一个点的 y 坐标 |
|  x2  | 数字：第二个点的 x 坐标 |
|  y2  | 数字：第二个点的 y坐标  |
|  z1  | 数字：第一个点的z 坐标  |
|  z2  | 数字：第二个点的 z 坐标 |

### 3.5 [点—point()][04]

#### 代码及预览
![][5]

#### 参数及说明

```
point(x, y, [z])
```

| 参数 |              说明               |
| :--: | :-----------------------------: |
|  x   |          数字：x 坐标           |
|  y   |          数字：y 坐标           |
|  z   | 数字：z 坐标（用于 WEBGL 模式） |

### 3.6 [四角形—quad()][05]

####  代码及预览
![][6]

#### 参数及说明

```
quad(x1, y1, x2, y2, x3, y3, x4, y4, [detailX], [detailY])
quad(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, [detailX], [detailY])
```

| 参数 |          说明           |
| :--: | :---------------------: |
|  x1  | 数字：第一个点的 x 坐标 |
|  y1  | 数字：第一个点的 y 坐标 |
|  x2  | 数字：第二个点的 x 坐标 |
|  y2  | 数字：第二个点的 y坐标  |
|  x3  | 数字：第三个点的 x 坐标 |
|  y3  | 数字：第三个点的 y 坐标 |
|  x4  | 数字：第四个点的 x 坐标 |
|  y4  | 数字：第四个点的 y 坐标 |
|  z1  | 数字：第一个点的 z 坐标 |
|  z2  | 数字：第二个点的 z 坐标 |
|  z3  | 数字：第三个点的 z 坐标 |
|  z4  | 数字：第四个点的 z 坐标 |

### 3.7 [方形—rect()][06]

#### 代码及预览
![][7]

#### 参数及说明

```
rect(x, y, w, [h], [tl], [tr], [br], [bl])
rect(x, y, w, h, [detailX], [detailY])
```

|  参数   |             说明             |
| :-----: | :--------------------------: |
|    x    |     数字：方形的 x 坐标      |
|    y    |     数字：方形的 y 坐标      |
|    w    |       数字：方形的宽度       |
|    h    |       数字：方形的高度       |
|   tl    | 数字：可选性左上角拐角半径值 |
|   tr    | 数字：可选性右上角拐角半径值 |
|   br    | 数字：可选性右下角拐角半径值 |
|   bl    | 数字：可选性左下角拐角半径值 |
| detailX |       整数：x 方向段数       |
| detailY |       整数：y 方向段数       |

### 3.8 [方形—square()][07]
#### 代码及预览
![][8]

#### 参数及说明

```
square(x, y, s, [tl], [tr], [br], [bl])
```

| 参数 |             说明             |
| :--: | :--------------------------: |
|  x   |     数字：方形的 x 坐标      |
|  y   |     数字：方形的 y 坐标      |
|  s   |      数字：方形的 尺寸       |
|  tl  | 数字：可选性左上角拐角半径值 |
|  tr  | 数字：可选性右上角拐角半径值 |
|  br  | 数字：可选性右下角拐角半径值 |
|  bl  | 数字：可选性左下角拐角半径值 |

### 3.9 [三角形—triangle()][08]
#### 代码及预览
![][9]

#### 参数及说明

```
triangle(x1, y1, x2, y2, x3, y3)
```

| 参数 |          说明           |
| :--: | :---------------------: |
|  x1  | 数字：第一个点的 x 坐标 |
|  y1  | 数字：第一个点的 y 坐标 |
|  x2  | 数字：第二个点的 x 坐标 |
|  y2  | 数字：第二个点的 y 坐标 |
|  x3  | 数字：第三个点的 x 坐标 |
|  y3  | 数字：第三个点的 y 坐标 |

## 四 参考

* [P5.js—参考文献](https://p5js.org/zh-Hans/reference/)

[00]:https://p5js.org/zh-Hans/reference/#/p5/arc
[01]:https://p5js.org/zh-Hans/reference/#/p5/ellipse
[02]:https://p5js.org/zh-Hans/reference/#/p5/circle
[03]:https://p5js.org/zh-Hans/reference/#/p5/line
[04]:https://p5js.org/zh-Hans/reference/#/p5/point
[05]:https://p5js.org/zh-Hans/reference/#/p5/quad
[06]:https://p5js.org/zh-Hans/reference/#/p5/rect
[07]:https://p5js.org/zh-Hans/reference/#/p5/square
[08]:https://p5js.org/zh-Hans/reference/#/p5/triangle


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-2d-arc.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-2d-ellipse.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-2d-circle.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-2d-line.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-2d-point.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-2d-quad.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-2d-rect.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-2d-square.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-2d-triangle.png