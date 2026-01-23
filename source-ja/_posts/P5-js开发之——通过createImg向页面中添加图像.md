---
title: P5.js开发之——通过createImg向页面中添加图像
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: ddcc9755
date: 2022-01-17 17:02:59
---
## 一 概述

* createImg语法介绍
* 示例—添加本地图形和网络图像

<!--more-->

## 二 createImg语法介绍

### 2.1 语法

```
createImg(src, alt, crossOrigin, [successCallback])
```

### 2.2 说明

* 添加图像(本地图像和网络图像)
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

|      参数       |                 说明                 |
| :-------------: | :----------------------------------: |
|       src       |               图片路径               |
|       alt       | 指定图像不能正常显示后显示的替换文本 |
|   crossOrigin   |             跨域访问图像             |
| successCallback |           图片成功加载回调           |

## 三 示例

### 3.1 本地图像

#### 代码

```
function setup() {
  let img = createImg(
    'assets/fruit.png',
    '水果'
  );
  img.position(0, -10);
}
```

说明：图片位于跟index.html同一目录下

#### 效果图

![][1]

### 3.2 网络图像

#### 代码

```
function setup() {

  let img = createImg(
    'https://p5js.org/assets/img/asterisk-01.png',
    '官方图片地址'
  )
  .position(100, 100);

}
```

#### 效果图
![][2]

## 四 参考

* [P5.js官方文档](https://p5js.org/zh-Hans/reference/#/p5/createImg)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createimg-img-local.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createimg-img-network.png