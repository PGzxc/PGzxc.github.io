---
title: P5.js开发之——设置
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 168352ca
date: 2022-02-14 17:13:45
---
## 一 概述

* 背景颜色相关(background/clear/clolorMode)
* 填充相关(fill/noFill)
* 描边相关(stroke/noStroke)
* 擦除画布相关(erase/noErase)

<!--more-->

## 二 背景颜色相关(background/clear/clolorMode)

### 2.1 属性说明

|  No  |    属性    |                   说明                    |
| :--: | :--------: | :---------------------------------------: |
|  1   | background |                  背景色                   |
|  2   |   clear    |          清除图形缓冲区内的像素           |
|  3   | colorMode  | colorMode() 改变 p5.js 解读颜色资料的方式 |

### 2.2 示例

#### 代码

```
let value=51;
function setup() {
  background(value);
}
function mouseClicked()
{
  clear();
  colorMode(HSB, 100);
  background('red');
}
```

#### 效果图
![][1]

## 三  填充相关(fill/noFill)

### 3.1 属性说明

|  No  |  属性  |   说明   |
| :--: | :----: | :------: |
|  1   |  fill  | 填充颜色 |
|  2   | noFill | 禁用填充 |

### 3.2 示例

#### 代码

```
function setup() {
  createCanvas(displayWidth, displayHeight);
  fill(51);
  rect(20, 20, 60, 60);
}

function mouseClicked()
{
  noFill();
  rect(30, 30, 80, 80);
}
```

#### 效果图
![][2]

## 四 描边相关(stroke/noStroke)

### 4.1 属性说明

|  No  |   属性   |   说明   |
| :--: | :------: | :------: |
|  1   |  stroke  |   描边   |
|  2   | noStroke | 禁用描边 |

### 4.2 示例

#### 代码

```
function setup() {
  createCanvas(displayWidth, displayHeight);
  background(200);

}

function draw() {
  strokeWeight(4);
  stroke(51);
  rect(20, 20, 60, 60);
}

function mouseClicked()
{
  
  noStroke();
  rect(80, 80,60, 60);

}
```

#### 效果图
![][3]

## 五 擦除画布相关(erase/noErase)

### 5.1 属性说明

|  No  |  属性   |   说明   |
| :--: | :-----: | :------: |
|  1   |  erase  | 擦除绘图 |
|  2   | noErase | 取消擦除 |

### 5.2 示例

#### 代码

```
function setup() {
  createCanvas(displayWidth, displayHeight);
  background(200);

}

function draw() {
  fill(250, 100, 100);
  rect(20, 20, 60, 60);
  erase();
}

function mouseClicked()
{
  
  ellipse(25, 30, 30);
  noErase();

}
```

#### 效果图
![][4]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-setting-background-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-setting-fill-sample.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-setting-stroke-sample.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-setting-erase-sample.gif