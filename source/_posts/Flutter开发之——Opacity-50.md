---
title: Flutter开发之——Opacity(50)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: a319e916
date: 2021-04-20 17:38:39
---
## 一 概述

* Opacity组件用来控制其子控件的透明度
* 通过opacity属性设置透明度比例
* 取值范围为0~1，取值为0时为完全透明，取值为1时，完全不透明

<!--more-->

## 二 Opacity

### 2.1 构造函数

```
const Opacity({
    Key? key,
    required this.opacity,
    this.alwaysIncludeSemantics = false,
    Widget? child,
  })
```

## 三 示例

### 3.1 示例1

#### 代码

```
Opacity(opacity: 0.5,child: Image.asset("images/flutter.png"),),
```

#### 效果图

![][1]

### 3.2 示例2

#### 代码

```
 bool click = false;
 AnimatedOpacity(
              onEnd: () {setState(() {click = !click;});},
              duration: Duration(seconds: 3),
              opacity: click ? 1 : .1,
              child: Container(
                child: Image.asset("images/flutter.png"),
              ),
            )
```

#### 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-opacity-image.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-opacity-ani-sample.gif