---
title: P5.js开发之——通过createFileInput向页面中添加文件选择按钮
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 4e77d82f
date: 2022-01-18 15:17:56
---
## 一 概述

* createFileInput语法介绍
* 示例—通过文件选择按钮选择图片文件并显示图片文件

<!--more-->

## 二 createFileInput语法介绍

### 2.1 语法

```
createFileInput(callback, [multiple])
```

### 2.2 说明

* 添加一个文件选择按钮
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

|   参数   |          说明          |
| :------: | :--------------------: |
| callback |  文件加载时的回调函数  |
| multiple | 可选，允许选择多个文件 |

#### 返回值

p5.Element

## 三 示例

### 3.1 代码

```
let input;
let img;

function setup() {
  input = createFileInput(handleFile);
  input.position(0, 0);
}

function draw() {
  background(255);
  if (img) {
    image(img, 0, 0, width, height);
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}
```

### 3.2 效果图

![][1]

## 四 参考
* [P5.js官方文档—createFileInput](https://p5js.org/zh-Hans/reference/#/p5/createFileInput)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createFileInput-sample1.gif