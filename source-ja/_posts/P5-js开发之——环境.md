---
title: P5.js开发之——环境
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 45b07964
date: 2022-02-09 16:30:47
---
## 一 概述

P5.js开发环境主要包含下面的内容：

* 描述信息
* 属性及常量
* 操作及功能

<!--more-->

## 二 描述信息

### 2.1 元素列表

|  No  |      属性       |         说明         |
| :--: | :-------------: | :------------------: |
|  1   |    describe     | 描述执行的方法或内容 |
|  2   | describeElement | 描述执行的方法或内容 |
|  3   |   textOutput    |   描述屏幕画布内容   |
|  4   |   gridOutput    |     描述画布布局     |

### 2.2 示例

```
describe('pink square with red heart in the bottom right corner');
background('pink');
fill('red');
noStroke();
ellipse(67, 67, 20, 20);
ellipse(83, 67, 20, 20);
triangle(91, 73, 75, 95, 59, 73);
```

![][1]

## 三 属性及常量

### 3.1 元素列表

|  No  |     属性      |                说明                |
| :--: | :-----------: | :--------------------------------: |
|  1   |   deltaTime   | 前一帧开始与当前帧开始之间的时间差 |
|  2   |    focused    |         窗口是否获得“焦点”         |
|  3   | displayWidth  |            整个屏幕宽度            |
|  4   | displayHeight |            整个屏幕高度            |
|  5   |  windowWidth  |            窗口内部宽度            |
|  6   | windowHeight  |            窗口内部高度            |
|  7   |     width     |              画布宽度              |
|  8   |    height     |              画布高度              |

### 3.2 示例

```
function setup() {
  createCanvas(displayWidth, displayHeight);
  background(100);
}
```

## 四 操作及功能

### 4.1 元素列表

|  No  |       属性       |                 说明                 |
| :--: | :--------------: | :----------------------------------: |
|  1   |     print()      |             输出到控制台             |
|  2   |     cursor()     |      鼠标成预定的符号或一个图像      |
|  3   |   frameRate()    |                 帧率                 |
|  4   |    noCursor()    |               隐藏鼠标               |
|  5   | windowResized()  |           窗口缩放时被调用           |
|  6   |   fullscreen()   |     依该参数而定该绘图是否是全屏     |
|  7   |  pixelDensity()  | 定义像素缩放值，用于高像素密度显示器 |
|  8   | displayDensity() | 返回正在运行该绘图的显示器的像素密度 |
|  9   |     getURL()     |            返回当下的网址            |
|  10  |   getURLPath()   |       返回当下的网址的路径数组       |
|  11  |  getURLParams()  |               网址参数               |

### 4.2 示例

```
function draw() {
  let x = 10;
  print('The value of x is ' + x);
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-environment-describe-sample.png