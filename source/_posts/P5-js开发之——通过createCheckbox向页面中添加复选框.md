---
title: P5.js开发之——通过createCheckbox向页面中添加复选框
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: e6275493
date: 2022-01-18 10:35:11
---
## 一 概述

* createCheckbox语法介绍
* 示例—checkbox演示及信息打印

<!--more-->

## 二 createCheckbox语法介绍

### 2.1 语法

```
createCheckbox([label], [value])
```

### 2.2 说明

* 在页面中添加复选框
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

| 参数  |           说明           |
| :---: | :----------------------: |
| label |     checkbox显示文字     |
| value | checkbox默认值(是否选中) |

#### 返回值

p5.Element

#### 方法

changed：选中、不选中时调用

## 三 示例

### 3.1 代码

```
let checkbox;

function setup() {

  createCanvas(windowWidth, windowHeight);
  checkbox = createCheckbox("checkbox",true);
  checkbox.position(10,10);
  checkbox.style("padding-left","20px");
  checkbox.style("padding-right","20px");
  checkbox.style("padding-top","10px");
  checkbox.style("padding-bottom","10px");
  checkbox.style("font-size","30px");

  checkbox.changed(myCheckedEvent);

}

function myCheckedEvent() {
  if (this.checked()) {
    console.log('Checking!');
  } else {
    console.log('Unchecking!');
  }
}
```

### 3.2 效果图

![][1]

## 四 示例

* [P5.js官方文档—createCheckbox](https://p5js.org/zh-Hans/reference/#/p5/createCheckbox)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createcheckbox-sample.gif