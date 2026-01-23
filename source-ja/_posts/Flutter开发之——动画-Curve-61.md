---
title: Flutter开发之——动画-Curve(61)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: cbc8da57
date: 2021-04-29 15:06:15
---
## 一 概述

* Curve在Flutter中指动画执行曲线，并不是指动画变化轨迹，而是指负责控制动画变化的速率
* 动画变化速率指：动画变化过程中均匀变化，加速(先慢后快)，减速(先快后慢)等的动画动作
* 在曲线变化时的类有：CurvedAnimation或者CurveTween

<!--more-->

## 二 Curve

### 2.1 如何使用Curve

#### 第一种 (chain)

```
Tween(begin: 100.0, end: 200.0).chain(CurveTween(curve: Curves.bounceIn)).animate(_controller)
```

#### 第二种 (animate(CurvedAnimation))

```
curvedAnimation=CurvedAnimation(parent: _controller, curve: Curves.bounceInOut);
animationCurve= Tween(begin: 100.0, end: 200.0).animate(curvedAnimation);
```

### 2.2 Curves种类(curves.dart-A collection of common animation curves)

```
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_bounce_in.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_bounce_in_out.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_bounce_out.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_decelerate.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_sine.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_quad.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_cubic.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_quart.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_quint.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_expo.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_circ.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_back.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_sine.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_quad.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_cubic.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_quart.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_quint.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_expo.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_circ.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_back.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_sine.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_quad.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_cubic.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_quart.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_quint.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_expo.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_circ.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_back.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_elastic_in.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_elastic_in_out.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_elastic_out.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_fast_out_slow_in.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_slow_middle.mp4}
/// {@animation 464 192 https://flutter.github.io/assets-for-api-docs/assets/animation/curve_linear.mp4}
```

|        属性         |  动画  |
| :-----------------: | :----: |
| curve_decelerate | ![decelerate][1] |
| curve_ease | ![ease][2] |

## 三 示例

### 3.1 代码

```
 AnimationController _controller;
 Animation<double> animationCurve;
 
 @override
 void initState() {
    super.initState();
     _controller =  AnimationController(
        vsync: this,
        lowerBound: 0,
        upperBound: 1,
        duration: Duration(milliseconds: 1000),
    )
      ..addStatusListener((AnimationStatus status) {
        if(status == AnimationStatus.completed){
          //_controller.reverse();
        }else if(status == AnimationStatus.dismissed){
          _controller.forward();
        }
      });
    animationCurve= Tween(begin: 100.0, end: 200.0).chain(CurveTween(curve: Curves.bounceIn)).animate(_controller);
  }
 
 Center(
        child: GestureDetector(
          onTap: (){_controller.forward();},
          child: Container(
            height: animationCurve.value,
            width: animationCurve.value,
            color: Colors.red,
            alignment: Alignment.center,
            child: Text("点我执行动画"),
          ),
        ),
        ) 
        
 @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }       
```

### 3.2 效果图

![][3]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter_curves_decelerate.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter_curves_ease.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter_curves_sample.gif