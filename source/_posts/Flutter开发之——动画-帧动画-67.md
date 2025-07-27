---
title: Flutter开发之——动画-帧动画(67)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 2b697dcb
date: 2021-05-06 14:21:46
---
## 一 概述

* 帧动画：一帧一帧静态图像快速播放形成的动画称为帧动画
* Flutter中帧动画在实现时，通过Tween动画(begin,end)获取到的静态图像设置Image来实现的

<!--more-->

## 二 添加图片资源

### 2.1 素材

![][1]![][2]![][3]![][4]![][5]![][6]

### 2.2 添加素材依赖

* 在项目根目录下创建images文件夹，将素材图片copy到images文件夹下

* 在pubspec.yarm文件夹中添加图片素材路径

  ```
    assets:
       - images/img_1.jpg
       - images/img_2.jpg
       - images/img_3.jpg
       - images/img_4.jpg
       - images/img_5.jpg
       - images/img_6.jpg
  ```

* 执行右上角的`Pub get`

## 三 实现说明

### 3.1 图片帧和动画关联起来

```
Tween<double>(begin: 0,end: images.length.toDouble())
```

### 3.2 将获取到的值(第几帧图片)给Image组件显示

```
Center(child: Image.asset(images[animation.value.toInt()]),)
```

## 四 示例

### 4.1 代码

```
  //帧动画
  Animation<double> animation;
  AnimationController controller;
  //素材列表
  List<String> images=["images/img_1.jpg","images/img_2.jpg","images/img_3.jpg","images/img_4.jpg","images/img_5.jpg","images/img_6.jpg"];
  
  @override
  void initState() {
    super.initState();
    controller=AnimationController(vsync: this,duration:Duration(milliseconds: 700) );
    animation=Tween<double>(begin: 0,end: images.length.toDouble()).animate(controller);
    controller.forward();
    animation.addStatusListener((status) {
      if (status==AnimationStatus.completed) {controller.forward(from: 0);} //循环执行动画
    });
  }
  //显示
 body:Center(child: Image.asset(images[animation.value.toInt()]),), 
```

### 4.2 效果图
![][7]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-frame-img_1.jpg
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-frame-img_2.jpg
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-frame-img_3.jpg
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-frame-img_4.jpg
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-frame-img_5.jpg
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-frame-img_6.jpg
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-frame-animal.gif