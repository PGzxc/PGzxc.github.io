---
title: P5.js开发之——颜色及变化(6)
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 8e1aef07
date: 2021-10-28 17:11:38
---
## 一 概述

* 用于设置颜色的color方法
* 对color进行颜色三原色提取的red(红)、green(绿)、blue(蓝)及alpha(透明度)
* 对color进行hue(色调)、brightness(亮度)、saturation(饱和度)及lightness(光度)提取
* 对color进行lerpColor(混合)

<!--more-->

## 二  color(设置颜色)

### 2.1 color的格式

|            语法            |                            示例                            |       说明       |
| :------------------------: | :--------------------------------------------------------: | :--------------: |
|    color(gray, [alpha])    |                         color(65)                          | 0-255之间的数值  |
| color(v1, v2, v3, [alpha]) |                     color(255, 204, 0)                     |  红绿蓝(透明度)  |
|        color(value)        | color('magenta')<br>color('#0f0')<br>color('rgb(0,0,255)') |    颜色字符串    |
|       color(values)        |                    color([255,0,0,100])                    |     颜色数组     |
|        color(color)        |           let c=color(255,0,0);let c2=color(c);            | 给color赋值color |

参数说明：

|  参数  |   类型   |                 说明                 |
| :----: | :------: | :----------------------------------: |
|  gray  |   数字   |       一个定义白与黑之间的数值       |
| alpha  |   数字   |     透明度值（默认为 0 至 255）      |
|   v1   |   数字   |  红彩值或色调值，需在被定义的范围内  |
|   v2   |   数字   | 绿彩值或饱和度值，需在被定义的范围内 |
|   v3   |   数字   |  蓝彩值或亮度值，需在被定义的范围内  |
| value  |  字符串  |              颜色字符串              |
| values | 数字数组 |   一个有红、绿、蓝及透明度值的数组   |
| color  | p5.Color |                                      |

### 2.2 示例

#### 代码

```
function draw()
{
    let c = color([255,0,0,100]);//设置颜色
    fill(c);//填充颜色
    rect(15, 20, 35, 60);//绘制图形
  }
```

#### 效果图
![][1]

## 三 color三原色及透明度提取

### 3.1 说明

| 方法  |     用法     |               说明               |
| :---: | :----------: | :------------------------------: |
|  red  |  red(color)  | 从颜色或像素数组中提取`红色彩值` |
| green | green(color) | 从颜色或像素数组中提取`绿色彩值` |
| blue  | blue(color)  | 从颜色或像素数组中提取`蓝色彩值` |
| alpha | alpha(color) | 从颜色或像素数组中提取`透明度值` |

### 3.2 示例(red为例)

#### 代码

```
function draw()
{
  let c = color(255, 204, 0); // 定义颜色值c
  fill(c); // 填充颜色
  rect(15, 20, 35, 60); // 绘制左侧区域
  
  let redValue = red(c); // 获取c中红色
  fill(redValue, 0, 0); // 用获取的红色填充(红,绿,蓝)
  rect(50, 20, 35, 60); // 绘制右侧区域
}  
```

#### 效果图
![][2]

## 四 hue(色调)、brightness(亮度)、saturation(饱和度)及lightness(光度)

### 4.1 说明

|    方法    |       用法        |                说明                 |
| :--------: | :---------------: | :---------------------------------: |
|    hue     |    hue(color)     |    从颜色或像素数组中提取色调值     |
| brightness | brightness(color) | 从颜色或像素数组中提取 HSB 的亮度值 |
| saturation | saturation(color) |   从颜色或像素数组中提取饱和度值    |
| lightness  | lightness(color)  | 从颜色或像素数组中提取 HSL 的光度值 |

### 4.2 示例

#### 代码

```
function draw()
{
  let c = color(156, 100, 50, 1);
  fill(c);
  rect(15, 20, 35, 60);
  let value = lightness(c); // Sets 'value' to 50
  fill(value);
  rect(50, 20, 35, 60);
  
}  
```

#### 效果图
![][3]

## 五 颜色混合(lerpColor)

### 5.1 用法说明lerpColor(c1, c2, amt)

| 参数 |        示例         |                  说明                  |
| :--: | :-----------------: | :------------------------------------: |
|  c1  | color(218, 165, 32) |            从这颜色开始插入            |
|  c2  |     color(100)      |            在这颜色结束插入            |
| amt  |         0.5         | 两个值之间插入的量，介于 0 和 1 的数字 |

### 5.2 示例

#### 代码

```
function draw()
{
  let from = color(218, 165, 32);//混合颜色开始
  let to = color(72, 61, 139); //混合颜色结束

  let interA = lerpColor(from, to, 0.33); //混合颜色A
  let interB = lerpColor(from, to, 0.66); //混合颜色B

  fill(from);
  rect(10, 20, 20, 60); //单独绘制颜色开始

  fill(interA);
  rect(30, 20, 20, 60); //单独绘制混合颜色A

  fill(interB);
  rect(50, 20, 20, 60); //单独绘制混合颜色B

  fill(to);
  rect(70, 20, 20, 60); //单独绘制颜色结束
 
} 
```

#### 效果图
![][4]

## 六 参考
* [参考文献——颜色](https://p5js.org/zh-Hans/reference/#group-Color)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-color-sample-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-color-red-get-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-color-light-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-color-lerpColor-view.png