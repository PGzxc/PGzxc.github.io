---
title: P5.js开发之——通过createDiv向页面中添加对象
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 3783fc77
date: 2022-01-13 14:12:51
---
## 一 概述

* createDiv语法介绍
* createDiv示例

<!--more-->

## 二 createDiv语法介绍

### 2.1 语法

```
createDiv([html])
```

### 2.2 参数及返回值

|         参数          |   返回值   |
| :-------------------: | :--------: |
| 创建div时默认的字符串 | p5.Element |

## 三 示例

### 3.1 示例一

#### 代码

```
function setup() {
  let div = createDiv('createDiv');
  div.style('font-size', '16px');
  div.position(10, 0)
}
```

#### 效果图
![][1]

### 3.2 示例2
#### 代码

```
function setup() {
  let div2 = createDiv("DIV中内容")
            .style('font-size', '32px')
            .style('color', 'red')
            .style('top', '200px')
            .mousePressed(() => {
                console.log("mousePress");
            })
            .center()
          .html("文章内容", true);
}
```

#### 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-creatediv-sample1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-creatediv-sample2.png