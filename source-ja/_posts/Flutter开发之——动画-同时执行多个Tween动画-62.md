---
title: Flutter开发之——动画-同时执行多个Tween动画(62)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: c8b36731
date: 2021-04-29 16:43:36
---
## 一 概述

* 一个AnimationController ，只需要一个SingleTickerProviderStateMixin 
* 需要有多个AnimationController 时，需要修改为**TickerProviderStateMixin**

<!--more-->

## 二 AnimationController 、 Tween 、Curve

### 2.1 AnimationController 、 Tween

AnimationController调用Tween

```
_animation = _controller.drive(Tween(begin: 100.0, end: 200.0)
```

Tween调用AnimationController

```
  _animation = Tween(begin: 100.0, end: 200.0).animate(_controller);
```

### 2.2 加入Curve后

AnimationController调用Tween

```
_animation = _controller.drive(CurveTween(curve: Curves.linear)).drive(Tween(begin: 100.0, end: 200.0)
```

Tween调用AnimationController

```
_animation = Tween(begin: 100.0, end: 200.0)
    .chain(CurveTween(curve: Curves.linear))
    .animate(_controller);
```

## 三  示例

### 3.1 代码

```
  class _MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin
  
  AnimationController _sizeController;
  AnimationController _colorController;
  Animation<double> _sizeAnimation;
  Animation<Color> _colorAnimation;
  
   @override
  void initState() {
    super.initState();

    _sizeController =
    AnimationController(vsync: this, duration: Duration(milliseconds: 2000))
      ..addListener(() {
        setState(() {});
      });

    _sizeAnimation = _sizeController
        .drive(CurveTween(curve: Curves.linear))
        .drive(Tween(begin: 100.0, end: 200.0));

    _colorController =
    AnimationController(vsync: this, duration: Duration(milliseconds: 1000))
      ..addListener(() {
        setState(() {});
      });

    _colorAnimation = _colorController
        .drive(CurveTween(curve: Curves.bounceIn))
        .drive(ColorTween(begin: Colors.blue, end: Colors.red));
  } 
  
 Center(
          child: GestureDetector(
            onTap: () {
              _sizeController.forward();
              _colorController.forward();
            },
            child: Container(
              height: _sizeAnimation.value,
              width: _sizeAnimation.value,
              color: _colorAnimation.value,
              alignment: Alignment.center,
              child: Text('点我开始动画',),
            ),
          ),
        ) 
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter_tween_sequence.gif