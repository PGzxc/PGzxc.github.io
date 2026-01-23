---
title: Flutter开发之——动画—Tween(60)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 15f35fb8
date: 2021-04-29 13:32:49
---
## 一 概述

* Tween动画，又叫补间动画
* Tween有两个关键帧，begin起始帧，end结束帧，补间动画在begin和end之间插入补帧完成动画效果
* 常见的Tween动画有：ColorTween、SizeTween、RectTween、IntTween、StepTween、ConstantTween、CurveTween

<!--more-->

## 二 Tween

### 2.1 说明

* Tween是将值变化的过程进行了封装(封装了begin起始值和end结束值)
* 将之前通过setState刷新获取到的值转换为动画的值来完成显示

### 2.2 构造函数

```
Tween({
    this.begin,
    this.end,
  });
```
### 2.3 更换为Tween后对比
#### 使用Tween之前

```
//定义变化量
double _size = 100;
//变化量作用对象
Container(
          height: _size,
          width: _size,
          color: Colors.blue,
          alignment: Alignment.center,
          child: Text('点我变大'),
		)
//变化量的修改		
  @override
  void initState() {
    super.initState();
     setState(() {
    	_size = 100+100*_controller.value;
  });
  }		
```

#### 使用Tween之后

```
Animation<double> animation;//变化过程动画变量
//动画控制器
_controller =  AnimationController(
        vsync: this,
        lowerBound: 0,
        upperBound: 1,
        duration: Duration(milliseconds: 1000),
    )
//动画开始和结束值    
animation=Tween<double>(begin: 100,end: 300).animate(_controller);
 //作用对象
 Container(
      		height: animation.value,
            width: animation.value,
            color: Colors.red,
            alignment: Alignment.center,
            child: Text("点我变大"),
          )
```

## 三 示例

### 3.1 将上节动画使用Tween替换之后(Tween用于int,float类型变换)

#### 代码

```
 AnimationController _controller;
 Animation<double> _animation;

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
          _controller.reverse();
        }else if(status == AnimationStatus.dismissed){
          _controller.forward();
        }
      });
    animation=Tween<double>(begin: 100,end: 300).animate(_controller);
  }
  //作用对象
  Center(
        child: GestureDetector(
          onTap: (){_controller.forward();},
          child: Container(
            height: animation.value,
            width: animation.value,
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

#### 效果图

![][1]

### 3.2 ColorTween(ColorTween用于Color类型变换)

#### 代码

```
//变量定义
AnimationController _controller;
 Animation<Color> animationColor;
 
 //动画监听
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
          _controller.reverse();
        }else if(status == AnimationStatus.dismissed){
          _controller.forward();
        }
      });
    animationColor=ColorTween(begin: Colors.red,end: Colors.blue).animate(_controller); 
  }
  //作用对象
  Center(
        child: GestureDetector(
          onTap: (){_controller.forward();},
          child: Container(
            height: 200,
            width: 200,
            color: animationColor.value,
            alignment: Alignment.center,
            child: Text("点我执行动画"),
          ),
        ),
        )
```

#### 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-tween-replace-old.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-colortween-sample.gif