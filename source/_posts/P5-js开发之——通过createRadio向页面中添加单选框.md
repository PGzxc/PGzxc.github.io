---
title: P5.js开发之——通过createRadio向页面中添加单选框
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 654769b4
date: 2022-01-18 13:30:43
---
## 一 概述

* createRadio语法介绍
* 示例—Radio单选框

<!--more-->

## 二 createRadio语法介绍

### 2.1 语法

```
createRadio(containerElement, [name])
```

```
createRadio(name)
```

```
createRadio()
```

### 2.2 说明

* 向页面中添加单选框按钮
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

|       参数       |                  说明                  |
| :--------------: | :------------------------------------: |
| containerElement | 一个容器 HTML 元素，可以是 div 或 span |
|       name       |         每个输入元素的名称参数         |

#### 返回值

p5.Element

## 三 示例

### 3.1 实例一

#### 代码

```
let radio;

function setup() {

  radio=createRadio();
  radio.option("black");
  radio.option("white");
  radio.option("gray");
  radio.style("width","60px");
  textAlign(CENTER);
  fill(255,0,0);
  
}

function draw() {
  let val = radio.value();
  background(val);
  text(val, width / 2, height / 2);

}
```

#### 效果图

![][1]

###  3.2 示例二

#### 代码

```
let radio;

function setup() {

  radio = createRadio();
  radio.option(1, 'apple');
  radio.option(2, 'bread');
  radio.option(3, 'juice');
  radio.style('width', '30px');
  textAlign(CENTER);
}

function draw() {

  background(200);
  let val = radio.value();
  if (val) {
    text('item cost is $' + val, width / 2, height / 2);
  }

}
```

#### 效果图
![][2]

## 四 参考
* [P5.js官方文档—createRadio](https://p5js.org/zh-Hans/reference/#/p5/createRadio)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createradio-sample1.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createradio-sample2.gif