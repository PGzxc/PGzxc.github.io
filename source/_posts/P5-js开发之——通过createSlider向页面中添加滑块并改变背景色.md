---
title: P5.js开发之——通过createSlider向页面中添加滑块并改变背景色
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 51d0a72b
date: 2022-01-18 09:37:41
---
## 一 概述

* createSlider语法介绍
* 示例—通过createSlider添加滑块，并改变背景色

<!--more-->

## 二 createSlider语法介绍

### 2.1 语法

```
createSlider(min, max, [value], [step])
```

### 2.2 说明

* 在页面中添加滑块
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

| 参数  |                           说明                            |
| :---: | :-------------------------------------------------------: |
|  min  |                       数字：最小值                        |
|  max  |                       数字：最大值                        |
| value |                          默认值                           |
| step  | 滑块步长（如果 step为 0，滑块将从最小值连续移动到最大值） |

#### 返回值

p5.Element

## 三 示例

### 3.1 示例一

#### 代码

```
let slider;

function setup() {

  createCanvas(400, 400);
  
  slider = createSlider(0, 255, 100);
  slider.position(10, 10);
  slider.style("width", "80px");

}

function draw() {
  let val = slider.value();
  background(val);

}
```

#### 效果图
![][1]

### 3.2 实例二
#### 代码

```
let slider;

function setup() {

  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);
  slider = createSlider(0, 360, 60, 40);
  slider.position(10, 10);
  slider.style('width', '80px');

}

function draw() {
  let val = slider.value();
  background(val, 100, 100, 1);

}

```

#### 效果图
![][2]

## 四 参考
* [P5官方文档—createSlider](https://p5js.org/zh-Hans/reference/#/p5/createSlider)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createslider-sample1.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createslider-sample2.gif