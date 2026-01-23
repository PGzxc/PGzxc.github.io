---
title: P5.js开发之——通过createSelect向页面中添加下拉框
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 4306806d
date: 2022-01-18 11:18:52
---
## 一 概述

* createSelect语法介绍
* 示例—下拉选择框示例

<!--more-->

## 二 createSelect语法介绍

### 2.1 语法

```
createSelect([multiple])
```

```
createSelect(existing)
```

### 2.2 说明

* 在页面中添加下拉选择框
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

|   参数   |           说明            |
| :------: | :-----------------------: |
| multiple | Boolean：下拉菜单展开显示 |
| existing |       DOM 选择元素        |

### 2.4 方法

* option(name, [value])：下拉框的选择项
* value()：将返回当前选择的选项
* selected()：将返回当前下拉元素
* selected(value)：页面首次加载时默认选择给定选项
* disable()：将整个下拉元素标记为禁用
* disable(value)：将给定选项标记为禁用

## 三 示例

### 3.1 实例一

#### 代码

```
let sel;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  background(200);
  sel = createSelect();
  sel.position(10, 10);
  sel.style("font-size","40px");
  sel.option('pear');
  sel.option('kiwi');
  sel.option('grape');
  sel.selected('kiwi');
  sel.changed(mySelectEvent);
}

function mySelectEvent() {
  let item = sel.value();
  background(200);
  text('It is a ' + item + '!', 200, 30);
}
```

#### 效果图
![][1]

### 3.2 示例二

#### 代码

```
let sel;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  background(200);
  sel = createSelect();
  sel.position(10, 10);
  sel.style("font-size","40px");
  sel.option('oil');
  sel.option('milk');
  sel.option('bread');
  sel.disable('milk');
}
```

#### 效果图
![][2]

## 四  参考

* [P5.js官方文档—createSelect](https://p5js.org/zh-Hans/reference/#/p5/createSelect)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createselect-sample1.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createselect-sample2.gif