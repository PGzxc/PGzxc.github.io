---
title: Flutter开发之——CustomPaint(53)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: ddf3d4a5
date: 2021-04-21 16:47:46
---
## 一  概述

* CustomPaint：创建自定义画板时的扩展类
* CustomPaint可以实现很多酷炫的动画和效果

<!--more-->

## 二 CustomPaint

### 2.1 构造函数

```
const CustomPaint({
    Key? key,
    this.painter,
    this.foregroundPainter,
    this.size = Size.zero,
    this.isComplex = false,
    this.willChange = false,
    Widget? child,
  })
```

### 2.2 常用属性说明

|  属性   |       说明       |     取值      |
| :-----: | :--------------: | :-----------: |
| painter | 绘制自定义的效果 | CustomPainter |

自定义CustomPainter需要重写两个方法

```
class DefineCustomPainter extends CustomPainter{
  @override
  void paint(Canvas canvas, Size size) {
    // TODO: implement paint
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    // TODO: implement shouldRepaint
    throw UnimplementedError();
  }
}
```

其中：

* paint方法：绘制自定义的效果
* shouldRepaint：在当前实例和旧实例属性不一致时返回true

## 三 示例——绘制斜线

### 3.1 代码

自定义View部分

```
class DefineCustomPainter extends CustomPainter{
  Paint _paint = Paint()
    ..color = Colors.red
    ..strokeWidth = 3;
  @override
  void paint(Canvas canvas, Size size) {
    canvas.drawLine(Offset(0, 0),Offset(size.width, size.height), _paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
     return true;
  }
}
```

调用部分

```
CustomPaint(painter: DefineCustomPainter(),child: Container(width: 100,height: 100,),)
```

### 3.2 效果图
![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-customPaint-sample.png