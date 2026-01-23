---
title: Flutter开发之——单组件布局容器-Transform(27)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 68c404aa
date: 2021-04-08 14:38:27
---
## 一 概述

* Transform是对容器进行坐标变换的单组件布局容器
* Transform中常见的变换操作有：translate(平移)，rotate(旋转)，scale(缩放)

<!--more-->

## 二 Transform

### 2.1 构造方法

```
const Transform({
    Key? key,
    required this.transform,
    this.origin,
    this.alignment,
    this.transformHitTests = true,
    Widget? child,
  }) : assert(transform != null),
       super(key: key, child: child);
```

### 2.2 Transform类方法

#### translate

```
Transform.translate({
    Key? key,
    required Offset offset,
    this.transformHitTests = true,
    Widget? child,
  }) : transform = Matrix4.translationValues(offset.dx, offset.dy, 0.0),
       origin = null,
       alignment = null,
       super(key: key, child: child);
```

#### rotate

```
Transform.rotate({
    Key? key,
    required double angle,
    this.origin,
    this.alignment = Alignment.center,
    this.transformHitTests = true,
    Widget? child,
  }) : transform = Matrix4.rotationZ(angle),
       super(key: key, child: child);
```

#### scale

```
Transform.scale({
    Key? key,
    required double scale,
    this.origin,
    this.alignment = Alignment.center,
    this.transformHitTests = true,
    Widget? child,
  }) : transform = Matrix4.diagonal3Values(scale, scale, 1.0),
       super(key: key, child: child);
```

## 三 示例

### 3.1 构造方法

#### 代码

```
Transform(
            transform: Matrix4.rotationZ(0.5),
            origin: Offset(0,0),
            alignment: Alignment.center,
            child: Container(width: 100,height: 100,color: Colors.red,),
          )
```

#### 效果图

![][1]

### 3.2 类方法

#### 代码

```
Transform.rotate(
            angle: 12.0,
            child: Container(
              padding: const EdgeInsets.all(8.0),
              color: const Color(0xFFE8581C),
              child: const Text('Apartment for rent!'),
            ),
          )
```

#### 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter_transform_construct_sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-transform-rotate-sample.png