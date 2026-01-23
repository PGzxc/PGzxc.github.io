---
title: Flutter开发之——动画-AnimationController(59)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 259d1233
date: 2021-04-29 09:54:30
---
## 一 概述

* Tween动画控制器，能够根据区间值，执行时间执行相应的动画效果
* 控制动画的启动、停止，还可以获取动画的运行状态
* 创建AnimationController时，需要传入duration(动画时长)，lowerBound(区间左值)，upperBound(区间右值)

<!--more-->

## 二 AnimationController

### 2.1 构造函数

```
 AnimationController({
    double? value,
    this.duration,
    this.reverseDuration,
    this.debugLabel,
    this.lowerBound = 0.0,
    this.upperBound = 1.0,
    this.animationBehavior = AnimationBehavior.normal,
    required TickerProvider vsync,
  })
```

### 2.2 常用属性说明

|      属性       |              说明              |      取值      |
| :-------------: | :----------------------------: | :------------: |
|      value      | 当前动画的取值(默认lowerBound) |     double     |
|    duration     |          动画执行时长          |    Duration    |
| reverseDuration |          反向动画时长          |    Duration    |
|   lowerBound    |           变化前的值           |     double     |
|   upperBound    |           变化后的值           |     double     |
|     vsync①      |       界面扩展通知触发器       | TickerProvider |

#### vsync①说明

* vsync：TickerProvider(抽象类)，用于接收动画变化过程中的通知，类似于接口回调
* 用户在使用时可以选择`TickerProviderStateMixin`或`SingleTickerProviderStateMixin`
* 混入`mixins`时，使用关键字`with`(其他关键字有`extends`，`with`，`implements`)，即具备某种特性
* 单个 AnimationController 的时候使用 `SingleTickerProviderStateMixin`
* 多个 AnimationController 使用 `TickerProviderStateMixin`

### 2.3 常用方法

|    方法     |                说明                 |
| :---------: | :---------------------------------: |
|   forward   |      动画开始执行，类似于start      |
|   reverse   |            动画反向执行             |
|  unbounded  | 创建没有上下限的AnimationController |
|    reset    |         value = lowerBound;         |
|  animateTo  |              正向动画               |
| animateBack |              反向动画               |
|   repeat    |             周期性执行              |
|    fling    |              弹性动画               |
|    stop     |              停止动画               |
|   dispose   |              释放资源               |

### 2.4 动画的状态(AnimationStatus)

|   取值    |       说明       |
| :-------: | :--------------: |
| dismissed | 动画停止在开始处 |
|  forward  |   正向运行动画   |
|  reverse  |   反向运行动画   |
| completed |     动画停止     |

## 三 示例

### 3.1 代码

```
class _MyHomePageState extends State<MyHomePage> with SingleTickerProvider特性StateMixin  //具备TickerProvider特性

//定义动画初始值
AnimationController _controller;
double _size = 100;

//动画监听
  @override
  void initState() {
    super.initState();
    _controller =  AnimationController(
        vsync: this,
        duration: Duration(milliseconds: 500),
        lowerBound: 100,
        upperBound: 200)
      ..addStatusListener((AnimationStatus status) {
        if(status == AnimationStatus.completed){
          _controller.reverse();
        }else if(status == AnimationStatus.dismissed){
          _controller.forward();
        }
      })
      ..addListener(() {
        setState(() {
          _size = _controller.value;
        });
      });
  }
//body
 Center(
        child: GestureDetector(
          onTap: (){_controller.forward();},
          child: Container(
            height: _size,
            width: _size,
            color: Colors.blue,
            alignment: Alignment.center,
            child: Text("点我，开始动画"),
          ),
        ),
        )
//释放资源        
@override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }        
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-animationController-sample.gif