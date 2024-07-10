---
title: P5.js开发之——通过createColorPicker向页面中添加颜色拾取器
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: ccfda67e
date: 2022-01-18 14:08:48
---
## 一 概述

* createColorPicker语法介绍
* 示例—创建颜色拾取器

<!--more-->

## 二 createColorPicker语法介绍

### 2.1 语法

```
createColorPicker([value])
```

### 2.2 说明

* 创建一个颜色拾取器
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

value：元素的默认颜色

#### 返回值

p5.Element

## 三 示例


### 3.1 代码

```
let colorPicker;

function setup() {

  createCanvas(100, 100);
  colorPicker = createColorPicker("#ed225d");
  colorPicker.position(0, height + 5);

}

function draw() {
  background(colorPicker.color());
}
```

### 3.2 效果图

![][1]

## 四 参考
* [P5.js官方文档—createColorPicker](https://p5js.org/zh-Hans/reference/#/p5/createColorPicker)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createColorPicker-sample1.gif