---
title: Flutter开发之——单组件布局容器-OverflowBox(25)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: cc91935a
date: 2021-04-06 17:38:35
---
## 一 概述

OverflowBox是一个允许子控件超出父控件大小范围的单组件布局容器

<!--more-->

## 二 OverflowBox

### 2.1 构造方法

```
const OverflowBox({
    Key? key,
    this.alignment = Alignment.center,
    this.minWidth,
    this.maxWidth,
    this.minHeight,
    this.maxHeight,
    Widget? child,
  }) : super(key: key, child: child);
```

### 2.2 属性说明

|   属性    |   说明   |     取值      |
| :-------: | :------: | :-----------: |
| alignment | 对齐方式 | Alignment对象 |
| minWidth  | 最小宽度 |    double     |
| maxWidth  | 最大宽度 |    double     |
| minHeight | 最小高度 |    double     |
| maxHeight | 最大高度 |    double     |

## 三 示例

### 3.1 代码

```
Container(
  color: Colors.green,
  width: 200.0,
  height: 200.0,
  padding: const EdgeInsets.all(5.0),
  child: OverflowBox(
    alignment: Alignment.topLeft,
    maxWidth: 300.0,
    maxHeight: 500.0,
    child: Container(
      color: Color(0x33FF00FF),
      width: 400.0,
      height: 400.0,
    ),
  ),
)
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-overflowBox.png