---
title: P5.js开发之——通过createA向页面中添加超链接
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 756f30fb
date: 2022-01-18 08:54:00
---
## 一 概述

* createA语法介绍
* 示例—添加超链接

<!--more-->

## 二 createA语法介绍

### 2.1 语法

```
createA(href, html, [target])
```

### 2.2 说明

* 在页面中添加超链接
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

|  参数  |                     说明                     |
| :----: | :------------------------------------------: |
|  href  |                  超链接地址                  |
|  html  |                超链接文字描述                |
| target | 超链接打开方式(_blank, _self, _parent, _top) |

#### 返回值

p5.Element

## 三 示例—添加超链接

### 3.1 代码

```
function setup() {
  let a = createA('http://www.baidu.com', '这是一个超链接', "_blank");
  a.position(0, 0);

}
```

### 3.2 效果图

![][1]

## 四 参考
* [P5官方文档—createA](https://p5js.org/zh-Hans/reference/#/p5/createA)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createa-sample.png