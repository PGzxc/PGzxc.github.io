---
title: P5.js开发之——借助p5.shape插件库绘制2D形状(5)
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 5f6b0336
date: 2021-10-15 09:44:28
---
## 一 概述

本文介绍借助于p5.shape库，绘制一些简单的几何形状，效果图如下：
![][1]

<!--more-->

## 二 项目介绍

### 2.1 项目地址

[p5.shape.js](https://github.com/gaba5/p5.shape.js)

### 2.2 如何使用

```
p5.shape:lib依赖文件,通过script导入
example:示例文件,类似于sketch.js
省略:index.html和p5.js
```

![][2]

## 三 p5.shape示例
### 3.1 创建p5.js项目(vscode-p5 Project Create插件)
```
将p5.shape:放到libs目录下,并在index.html中通过script导入
将example中内容,替换到sketch.js
```

![][3]

### 3.2 p5.shape绘制集合形状

| 编号 |   函数   |    图形    |
| :--: | :------: | :--------: |
|  1   |  center  |     圆     |
|  2   |   pent   |   5边形    |
|  3   | hexagon  |   6边形    |
|  4   |   tri    |   三角形   |
|  5   |   hept   |   7边形    |
|  6   |   octo   |   8边形    |
|  7   |   nona   |   9边形    |
|  8   |  heart   |  8边心♥形  |
|  9   |   deca   |   10边形   |
|  10  |   trap   |    梯形    |
|  11  | rightTri | 直角三角形 |

### 3.3 代码说明

```
    //1-页面整体设置
    textSize(15) //字体大小
    background(245);//背景颜色
   
   
    //2-中心圆
    fill(55,150,250)//填充颜色
    center(5)//中心园
    text('center(size)',width/2-20,height/2+15) //中心圆底部文字


     //3-5边形
     pent(250,220,65,1) //5边形绘制
     text('pent(x,y,size,lineT)',200,270)  //5边形底部文字


    //4-6边形
     hexagon(100,200,50,1) //6边形绘制
     text('hexagon(x,y,size,lineT)',35,275)  //6边形底部文字


    //5-三角形
    tri(100,60,50,1) //三角形绘制
    text('tri(x,y,size,lineT)',50,125) //三角形底部文字

    //6-7边形
     hept(100,400,50,1) //7边形绘制
     text('hept(x,y,size,lineT)',50,450) //7边形底部文字

    //7-8边形
    octo(270,430,60,1) //8边形绘制
    text('octo(x,y,size.lineT)',200,480) //8边形底部文字

    //8-9边形
    nona(450,450,50,1) //9边形绘制
    text('nona(x,y,size,lineT)',400,500) //9边形底部文字

   //9-8边心♥形
    fill(255,10,200) //心形填充颜色
    heart(550,95,50,1) //心形绘制
    text('heart(x,y,size,lineT)',500,170) //心形底部文字

   //10-10边形
    fill(55,150,250)//填充颜色
    deca(550,300,55,1) //形状绘制
    text("deca(x,y,size,lineT)",490,350) //底部文字

     //11-梯形
    trap(400,150,100,1) //梯形绘制
    text("trap(x,y,size,lineT)",340,220) //梯形底部文字

    //12-直角三角形
    rightTri(270,70,60,1) //三角形绘制
    text("rightTri(x,y,size,lineT)",210,120)//三角形底部文字
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-p5shape-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-p5-shape-github.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-p5shape-vscode-project.png