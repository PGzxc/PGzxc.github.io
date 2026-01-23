---
title: P5.js开发之——通过createCapture向页面中添加捕获摄像头
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: b7c84d6a
date: 2022-01-19 21:25:14
---
## 一 概述

* createCapture语法概述
* 示例—捕获摄像头并显示
* createCapture需要设置有摄像头

<!--more-->

## 二 createCapture语法概述

### 2.1 语法

```
createCapture(type, [callback])
```

### 2.2 说明

* 捕获摄像头
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

|   参数   |           说明           |
| :------: | :----------------------: |
|   type   | VIDEO(视频)、AUDIO(音频) |
| callback |     加载后的回调函数     |

#### 返回值

视频捕获 [p5.Element](https://p5js.org/zh-Hans/reference/#/p5.Element) 

## 三 示例

### 3.1 代码(sketch.js)

```
let capture;

function setup() {
  createCanvas(500, 500);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, 0, 0, width, width * capture.height / capture.width);
  filter(INVERT);
}
```

### 3.2 效果图

![][1]

### 3.3  说明

* image中设置显示的图片，位置及大小
* filter(INVERT)：照片反色，去掉后就是真是颜色

## 四 参考
* [P5.js官方文档—createCapture](https://p5js.org/zh-Hans/reference/#/p5/createCapture)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createCapture-sample1.png