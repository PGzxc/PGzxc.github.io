---
title: Flutter开发之——基本组件-Image设置形状(8)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 8ec11a03
date: 2021-02-23 16:06:13
---
## 一 概述

* Image 是不支持圆角、矩形和阴影的，目前可以通过使用 CircleAvatar 和 Container 实现
* CircleAvatar 是个状态组件，只需要传入backgroundImage即可将图片渲染成圆角形状
* Container 是个容器，通过decoration分别指定image和shape，指定渲染的图片和形状

<!--more-->

## 二 图片配置(Image.asset)

将`rabbit.jpg`添加到images文件夹下，并配置pubspec.yaml(间隔两个字符)

![][1]

```
flutter:
  assets:
     - images/flutter.png
     - images/rabbit.jpg
```

配置完成后，点击`pubspec.yaml`右上角的`Pub get`指令

## 三 CircleAvatar 

### 3.1 代码

```
Image(image: AssetImage("images/rabbit.jpg"),width: 200,height: 200,),
CircleAvatar(backgroundImage: AssetImage("images/rabbit.jpg"),radius: 100,),
```

注：Image是默认图片

### 3.2 效果图
![][2]

## 四  Container 

### 4.1 圆形

```
new Container(
    width: 200.0,
    height: 200.0,
    margin: const EdgeInsets.all(20.0),
    decoration: new BoxDecoration(
    backgroundBlendMode: BlendMode.hue,
    color: Colors.white,
    image: new DecorationImage(image: AssetImage("images/rabbit.jpg"), fit: BoxFit.cover, ),
    shape: BoxShape.circle),              // <-- 这里需要设置为 rectangle,
),
```

### 4.2 矩形

```
Container(
  width: 200.0,
  height: 200.0,
  margin: const EdgeInsets.all(20.0),
  decoration: new BoxDecoration(
  backgroundBlendMode: BlendMode.clear,
  color: Colors.white,
  image: new DecorationImage(
  image: AssetImage("images/rabbit.jpg"),
  fit: BoxFit.cover,),
  shape: BoxShape.rectangle,// <-- 这里需要设置为 rectangle
  borderRadius: new BorderRadius.all(
     const Radius.circular(
				20.0), // <-- rectangle 时，BorderRadius 才有效
           ),
    ),
 )
```

### 2.3 效果图
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-image-shape-pubspec.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-image-shape-circleavatar.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-image-shape-container.png