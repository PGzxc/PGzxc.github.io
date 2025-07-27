---
title: Flutter开发之——Placeholder(16)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e2fd5852
date: 2021-03-25 11:17:03
---
## 一 概述

```
- Placeholder是一个占位符空间，用于当没有准备好构建组件时，使用placeholder进行占位
- 应用场景：
网络数据请求的时间段内，需要渲染组件的地方使用placeholder占位符，
当网络请求完成后，再将占位符替换为真实的组件
```

<!--more-->

## 二 Placeholder介绍

### 2.1 构造方法

```
const Placeholder({
    Key? key,
    this.color = const Color(0xFF455A64), // Blue Grey 700
    this.strokeWidth = 2.0,
    this.fallbackWidth = 400.0,
    this.fallbackHeight = 400.0,
  }) : super(key: key);
```

### 2.2 属性说明

|      属性      |                      说明                       |   取值    |
| :------------: | :---------------------------------------------: | :-------: |
|     color      |              绘制placeholder的颜色              | Color对象 |
|  strokeWidth   |                 placeholder线宽                 |  double   |
| fallbackWidth  | placeholder的宽度(因为宽不是无限的，充满父控件) |  double   |
| fallbackHeight |                placeholder的高度                |  double   |

## 三 示例

### 3.1 示例代码

```
Text("PlaceHolder没有设置属性："),
Container(height: 100,width: 200,child: Placeholder(),), //placeholder没有设置属性
Text("PlaceHolder设置了属性："),
Container(width: 200,height: 200,
          child: Placeholder(color: Colors.blue,strokeWidth: 10.0,fallbackWidth: 10,fallbackHeight: 200,),) ////placeholder设置了属性
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-placeholder-sample.png