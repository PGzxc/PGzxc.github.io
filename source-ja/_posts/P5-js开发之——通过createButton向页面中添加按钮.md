---
title: P5.js开发之——通过createButton向页面中添加按钮
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: b39ac3c
date: 2022-01-18 10:02:32
---
## 一 概述

* createButton语法介绍
* 示例—添加按钮和点击事件

<!--more-->

## 二 createButton语法介绍

### 2.1 语法

```
createButton(label, [value])
```

### 2.2 说明

* 在页面中添加按钮
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

| 参数  |        说明         |
| :---: | :-----------------: |
| label |    按钮文字描述     |
| value | 按钮的value值(可选) |

#### 返回值

p5.Element

## 三 示例—添加按钮和点击事件

### 3.1 代码

```
let button;

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(0);
  button = createButton("按钮");
  button.style("padding-left","20px");
  button.style("padding-right","20px");
  button.style("padding-top","10px");
  button.style("padding-bottom","10px");
  button.style("font-size","30px");
  button.center();
  button.mousePressed(changeBG);

}
function changeBG() {
  let val = random(255);
  background(val);
}
```

### 3.2 效果图

![][1]

## 四 参考
* [P5官方文档—createButton](https://p5js.org/zh-Hans/reference/#/p5/createButton)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createbutton-sample.gif