---
title: Flutter开发之——单组件布局容器-SizeBox(26)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: a5b8f0e6
date: 2021-04-07 12:42:38
---
## 一 概述

* SizedBox是具有固定宽高的组件，直接指定具体的宽高
* SizedBox中子控件的大小收到父控件的约束

<!--more-->

## 二 SizeBox

### 2.1 构造方法

```
const SizedBox({ Key? key, this.width, this.height, Widget? child })
    : super(key: key, child: child);
```

### 2.2 属性说明

|  属性  |  说明  |  取值  |
| :----: | :----: | :----: |
| width  |   宽   | double |
| height |   高   | double |
| child  | 子控件 | Widget |

## 三 示例

### 3.1 代码

```
SizedBox(
        width: 200,
        height: 200,
        child: Container(width: 100, height: 400, color: Colors.brown,),
      )
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter_sizebox_sample.png