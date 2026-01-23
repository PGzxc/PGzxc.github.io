---
title: Flutter开发之——动画-Gif动画(68)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 41e6351c
date: 2021-05-06 15:11:29
---
## 一 概述

* Image组件支持加载GIF图片
* GIF本身是一种动态的图片，其中定义了每一帧的播放时长和动画的总时长

<!--more-->

## 二 添加GIF

### 2.1 素材

![][1]

### 2.2 添加GIF

* 将素材添加到images文件夹中

* 在pubspec.yarm文件夹中添加图片素材路径

  ```
    assets:
       - images/flutter-cat.gif
  ```

* 执行右上角的`Pub get`

## 三 示例

### 3.1 代码

```
body:Center(child: Image.asset("images/flutter-cat.gif"),),
```

### 3.2 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-gif-cat.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-animal-gif.gif