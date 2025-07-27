---
title: Flutter开发之——动画-自定义动画(64)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 118b39ac
date: 2021-04-30 11:24:09
---
## 一 为什么要进行自定义动画

* 当系统提供的动画不满足业务需求时，就需要我们自己进行自定义动画
* 通过自定义动画，可以提高自定义组件的能力

<!--more-->

## 二 自定义动画过程

1. 继承StatefulWidget ，完成动画界面的绘制
2. `setState` 中动画执行及状态监听并刷新UI
3.  `dispose`释放资源

## 三 示例

### 3.1 代码

```
//入口位置
Future<void> main() async {
  runApp(Home());
}
class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(body: Center(child: AnimationDemo(),),),
    );
  }
}
//自定义动画
class AnimationDemo extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AnimationDemo();
}

class _AnimationDemo extends State<AnimationDemo> with SingleTickerProviderStateMixin {
  AnimationController _animationController;
  Animation _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(duration: Duration(seconds: 2), vsync: this);
    _animation = Tween(begin: .5, end: .1).animate(_animationController);
    _animationController.forward();  //开始动画
  }

  @override
  Widget build(BuildContext context) {
    return  ScaleTransition(
      scale: _animation,
      child: Container(height: 200, width: 200, color: Colors.red,),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }
}
```

### 3.2 效果图
![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-tween-define-sample.gif