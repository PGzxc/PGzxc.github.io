---
title: P5.js开发之——通过createP向页面中添加p5.Element元素
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 9f81061c
date: 2022-01-17 09:07:41
---
## 一 概述

* createP语法介绍
* createP示例

<!--more-->

## 二 createP语法介绍

### 2.1 语法

```
createP([html])
```

### 2.2 说明

* 创建一个段落(Paragraph)
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

|               参数                |   返回值   |
| :-------------------------------: | :--------: |
| 创建段落(Paragraph)时默认的字符串 | p5.Element |

## 三 示例

### 3.1 实例一

#### 代码(分开使用)

```
function setup() {

  let p = createP('this is some text');
  p.style('font-size', '16px');
  p.position(10, 0);

}
```

#### 效果图
![][1]

### 3.2 示例二(级联使用)

#### 代码

```
function setup() {

  let p = createP('this is some text')
  .style('font-size', '16px')
  .position(10, 0)
  .html("createP补充",true);

}
```

#### 效果图
![][2]



## 四 参考

* [P5官方文档—createP](https://p5js.org/zh-Hans/reference/#/p5/createP)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createp-sample1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createp-sample2.png