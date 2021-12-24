---
title: P5.js开发之——数学和三角函数(8)
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: b3a89b3d
date: 2021-11-30 10:31:16
---
## 一 概述

本文介绍P5.js中常见的

* 数学计算公式
* 三角函数计算公式

<!--more-->

## 二 数学计算公式

### 2.1 计算公式列表

|  No  |                           公式                           |                       说明                       |
| :--: | :------------------------------------------------------: | :----------------------------------------------: |
|  1   |                          abs(n)                          |               计算一个数字的绝对值               |
|  2   |                         ceil(n)                          |          最靠近并大于或等于参数值的整数          |
|  3   |                 constrain(n, low, high)                  |           一个数字于最低值与最高值之间           |
|  4   |               dist(x1, y1, z1, x2, y2, z2)               |                  两点之间的距离                  |
|  5   |                          exp(n)                          |                       e^n                        |
|  6   |                         floor(n)                         |          最靠近并小于或等于参数值的整数          |
|  7   |                  lerp(start, stop, amt)                  |   一个介于两个数字之间所定义的插值量位置的数字   |
|  8   |                        mag(a, b)                         |           计算一个向量的大小（或长度）           |
|  9   | map(value, start1, stop1, start2, stop2, [withinBounds]) |       从一个范围内映射一个数字去另一个范围       |
|  10  |                       max(n0, n1)                        |             找出一系列数字中最大的值             |
|  11  |                       min(n0, n1)                        |             找出一系列数字中最小的值             |
|  12  |                 norm(value, start, stop)                 | 将一个数字由一个范围标准化成介于 0 及 1 之间的值 |
|  13  |                        pow(n, e)                         |          执行幂运算，映射到 Math.pow()           |
|  14  |                   round(n, [decimals])                   |             计算最靠近 n 参数的整数              |
|  15  |                          sq(n)                           |          平方一个数字（将数字乘于自己）          |
|  16  |                         sqrt(n)                          |               计算一个数字的平方根               |
|  17  |                        fract(num)                        |                计算数字的小数部分                |

### 2.2 示例

```
function draw() {
 let x=abs(-3);
 text(x, 10, 10);
}
```

## 三 三角函数

### 3.1 三角函数公式

|  No  |       公式       |                        说明                        |
| :--: | :--------------: | :------------------------------------------------: |
|  1   |   acos(value)    |        cos() 的反值，将返回一个值的反余弦值        |
|  2   |   asin(value)    |        sin() 的反值，将返回一个值的反正弦值        |
|  3   |   atan(value)    |        tan() 的反值，将返回一个值的反正切值        |
|  4   |   atan2(y, x)    |                   该点的反正切值                   |
|  5   |    cos(angle)    |                计算一个角度的余弦值                |
|  6   |    sin(angle)    |                计算一个角度的正弦值                |
|  7   |    tan(angle)    |                计算一个角度的正切值                |
|  8   | degrees(radians) |          将一个弧度值转换成其相对的角度值          |
|  9   | radians(degrees) |                由角度转换成弧度的值                |
|  10  | angleMode(mode)  | 定义当时 p5 的角度模式。默认模式为 RADIANS（弧度） |

### 3.2 示例

```
function draw() {
  let a = PI / 2.0;
  let s = sin(a);
  let as = asin(s);
  text(s, 10, 10);
  text(as, 10, 30);

  let c=cos(a);
  let ac=acos(a);
  text(c, 10, 50);
  text(ac, 10, 70);
}
```

## 四 参考

* [P5.js—参考文献](https://p5js.org/zh-Hans/reference/)