---
title: Flutter开发之——动画-物理动画(65)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: beda902d
date: 2021-04-30 16:11:05
---
## 一 概述

* Tween动画：给出动画的起始值和结束值，Flutter计算出动画过程
* 物理动画：不确定结束值，根据起始条件(如初速度，摩檫力，初始位置进行动画模拟)
* 物理动画是由Simulation类提供物理引擎模拟，Simulation是个抽象类，定义了必须属性和方法

<!--more-->

## 二 Simulation

### 2.1 Simulation

```
abstract class Simulation {
   double x(double time);
   double dx(double time);
   bool isDone(double time);
  }
```

说明：

* x：当前时间计算出的位置
* dx：当前时间计算出的速度
* isDone：当前时间动画是否已经完成

### 2.2 常用Simulation类

|           类名            |       说明       |
| :-----------------------: | :--------------: |
| BouncingScrollSimulation  | 边界滚动物理引擎 |
| BoundedFrictionSimulation | 边界摩擦模拟引擎 |
|     ClampedSimulation     |   区间模拟引擎   |
| ClampingScrollSimulation  | 区间滚动模拟引擎 |
|    FrictionSimulation     |   摩擦模拟引擎   |
|     GravitySimulation     |   下落模拟引擎   |
|  ScrollSpringSimulation   |   弹簧滚动模拟   |
|     SpringSimulation      |     弹簧模拟     |

![][1]

## 三 示例(ClampingScrollSimulation)

### 3.1 代码

```
 class _MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin //TickerProviderStateMixin

 double value=0;
 var clampSimulation=ClampingScrollSimulation(position: 200, velocity: 1);
 Ticker tic;

  @override
  void initState() {
    super.initState();
    tic=createTicker((elapsed) {
      if (!clampSimulation.isDone(elapsed.inMicroseconds/1000)) {
        setState(() {
          value=clampSimulation.x(elapsed.inMicroseconds/1000);
        });
      }
    });
  }
 //动画设置
 Center(
        child: GestureDetector(
            onTap: () {if (!tic.isActive) {tic.start();}},
            child: Container(
              height: 100,
              width: 100,
              color: Colors.red,
              margin: EdgeInsets.only(left: value),
              alignment: Alignment.center,
              child: Text('点我开始动画',),
            ),
          ),
        )
```

### 3.2 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-simulation-imple.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-simulation-sample.gif