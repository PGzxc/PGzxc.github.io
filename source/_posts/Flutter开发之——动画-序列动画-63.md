---
title: Flutter开发之——动画-序列动画(63)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e12bc55a
date: 2021-04-29 17:43:55
---
## 一 应用场景

* 某个组件执行一个序列动画，执行时长为5s
* 前面一半时长先进行颜色变化，后面一半时长进行大小变化

<!--more-->

## 二  使用Tween动画实现

### 2.1 代码

```
  AnimationController _animationController;
  Animation _colorAnimation;
  Animation _sizeAnimation;
  
    @override
  void initState() {
    super.initState();

    _animationController=AnimationController(vsync: this,duration: Duration(seconds: 5));
    _colorAnimation=ColorTween(begin: Colors.red,end: Colors.blue).animate(CurvedAnimation(parent: _animationController, curve: Interval(0.0,0.5)));
    _sizeAnimation=Tween(begin: 100.0,end: 300.0).animate(CurvedAnimation(parent: _animationController, curve: Interval(0.5,1.0)));

  }
  //执行动画的对象
 Center(
        child: GestureDetector(
            onTap: () {_animationController.forward();},
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

### 2.2 说明

* Flutter编程中,会经常用到".."的语法糖，表示链式调用，不用在方法中返回调用主体
* Interval(0.0,0.5)：表示动画的执行区间

### 2.3 效果图

![][1]

## 三 使用TweenSequence实现

### 3.1 TweenSequence

```
 TweenSequence(List<TweenSequenceItem<T>> items)
 
 const TweenSequenceItem({
    required this.tween,
    required this.weight,
  })
```

* TweenSequence中存放的是TweenSequenceItem数组
* TweenSequenceItem由Tween和weight组成

### 3.2 代码

```
  AnimationController _animationController;
  Animation _animation;
  
    @override
  void initState() {
    super.initState();

    _animationController=AnimationController(vsync: this,duration: Duration(seconds: 5));
    _animation=TweenSequence([
      TweenSequenceItem(tween: Tween(begin: 100.0,end: 200.0).chain(CurveTween(curve: Curves.ease)), weight: 2),
      TweenSequenceItem(tween: ConstantTween(400.0), weight: 1),
      TweenSequenceItem(tween: Tween(begin: 200.0,end: 300.0), weight: 2)
    ]).animate(_animationController);

  }
  
 Center(
        child: GestureDetector(
            onTap: () {_animationController.forward();},
            child: Container(
              height: _animation.value,
              width: _animation.value,
              color: Colors.red,
              alignment: Alignment.center,
              child: Text('点我开始动画',),
            ),
          ),
        ) 
```

### 3.3 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-tween-sequence-interval.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter_tween_sequence_item.gif