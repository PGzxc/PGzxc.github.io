---
title: P5.js开发之——日期和时间(9)
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: dc20f4a7
date: 2021-11-30 10:34:14
---
## 一 概述

|  No  |   函数   |          说明          |
| :--: | :------: | :--------------------: |
|  1   |  year()  |     当时日期的年数     |
|  2   | month()  |     当时日期的月数     |
|  3   |  day()   |     当天的日期天数     |
|  4   |  hour()  |    当时时间的小时数    |
|  5   | minute() |    当时时间的分钟数    |
|  6   | second() |     当时时间的秒数     |
|  7   | millis() | 自程序开始以来的毫秒数 |

<!--more-->

## 二 示例

### 2.1 代码

```
function setup() {
  createCanvas(500, 500);
}

function draw() {


  let y=year();
  text('当前时间-year：'+y, 10, 10);

  let mon=month();
  text('当前时间-month：'+mon, 10, 25);

  let d=day();
  text('当前时间-day：'+d, 10, 40);

  let h=hour();
  text('当前时间-hour：'+h, 10, 55);

  let m=minute();
  text('当前时间-minute：'+m, 10, 70);

  let sec=second();
  text('当前时间-second：'+sec, 10, 85);

  let millisecond=millis();
  text('当前时间-millisecond：'+millisecond, 10, 100);


}
```

### 2.2 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5-js-day-time.png