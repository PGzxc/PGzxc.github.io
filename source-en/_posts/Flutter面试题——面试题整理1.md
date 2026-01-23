---
title: Flutter面试题——面试题整理1
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: 8c888035
date: 2022-10-26 17:19:46
---
## 一 面试题知识点

1. Flutter动画
2. Flutter中手势操作
3. Flutter绘制(签名/画笔)
4. 有无做过手绘相关的项目
5. Flutter中使用Opengl

<!--more-->

## 二 面试题解答


### 2.1 Flutter动画

```
1.Flutter动画

AnimationController动画
Tween动画，又叫补间动画
Curve动画
TweenSequence序列动画
自定义动画
Simulation物理动画
AnimatedList列表动画
帧动画
Gif动画
Hero过度动画

2.第三方动画

Lottie
Flare
Nima
Rive
```

### 2.2 Flutter中手势操作

```
Flutter中手势识别组件

-GestureDetector
-Ink/InkWell
-Listener
```

### 2.3 Flutter绘制(签名/画笔)

#### [绘制API][00]

```
/// 画布状态相关

void save() native 'Canvas_save';
void saveLayer(Rect? bounds, Paint paint)
void restore() native 'Canvas_restore';
int getSaveCount() native 'Canvas_getSaveCount';

/// 画布变换相关
void translate(double dx, double dy) native 'Canvas_translate';
void scale(double sx, [double? sy]) => _scale(sx, sy ?? sx);
void rotate(double radians) native 'Canvas_rotate';
void skew(double sx, double sy) native 'Canvas_skew';
void transform(Float64List matrix4)

/// 画布裁剪相关
void clipRect(Rect rect, { ClipOp clipOp = ClipOp.intersect, bool doAntiAlias = true })
void clipRRect(RRect rrect, {bool doAntiAlias = true})
void clipPath(Path path, {bool doAntiAlias = true})

/// 线
void drawLine(Offset p1, Offset p2, Paint paint)

///矩形
void drawRect(Rect rect, Paint paint) 
void drawRRect(RRect rrect, Paint paint)
void drawDRRect(RRect outer, RRect inner, Paint paint)

///圆相关
void drawOval(Rect rect, Paint paint)
void drawCircle(Offset c, double radius, Paint paint)
void drawArc(Rect rect, double startAngle, double sweepAngle, bool useCenter, Paint paint)

///图片
void drawImage(Image image, Offset offset, Paint paint)
void drawImageRect(Image image, Rect src, Rect dst, Paint paint)
void drawImageNine(Image image, Rect center, Rect dst, Paint paint)
void drawPicture(Picture picture)
void drawAtlas(Image atlas,List<RSTransform> transforms,List<Rect> rects,List<Color>? colors,BlendMode? blendMode,Rect? cullRect,Paint paint)
 void drawRawAtlas(Image atlas,Float32List rstTransforms,Float32List rects,Int32List? colors,BlendMode? blendMode,Rect? cullRect,Paint paint) 

///文字
void drawParagraph(Paragraph paragraph, Offset offset) 

///点
void drawPoints(PointMode pointMode, List<Offset> points, Paint paint)
void drawRawPoints(PointMode pointMode, Float32List points, Paint paint)
void drawVertices(Vertices vertices, BlendMode blendMode, Paint paint)

/// 其他
void drawColor(Color color, BlendMode blendMode) 
void drawPaint(Paint paint)
void drawPath(Path path, Paint paint)
void drawShadow(Path path, Color color, double elevation, bool transparentOccluder)
```

#### [绘制示例-画板][01]

```
class DrawingBoardPainter extends CustomPainter {
  final List<List<Offset>> path;

  DrawingBoardPainter(this.path);

  Paint _paint = Paint()
    ..color = Colors.red
    ..style = PaintingStyle.stroke
    ..strokeWidth = 3;

  @override
  void paint(Canvas canvas, Size size) {
    path.forEach((list) {
      Path _path = Path();
      for (int i = 0; i < list.length; i++) {
        if (i == 0) {
          _path.moveTo(list[i].dx, list[i].dy);
        } else {
          _path.lineTo(list[i].dx, list[i].dy);
        }
      }
      canvas.drawPath( _path, _paint);
    });
  }

  @override
  bool shouldRepaint(DrawingBoardPainter oldDelegate) {
    return true;
  }
}
```

### 2.4 有无做过手绘相关的项目

结合2.5说明

```
Flutter 是一个用于构建跨平台移动应用的框架，它提供了丰富的 UI 组件和工具，但是在直接支持手绘方面相对有限。
然而，你可以使用 Flutter 来构建与手绘相关的项目，例如绘画应用或涂色应用。
你可以利用 Flutter 提供的绘图功能（如 CustomPainter）来实现手绘的功能，
同时结合手势检测库（如 GestureDetector）来捕获用户的手绘动作。

同时，Flutter 社区也有一些第三方库和插件，可以帮助你更轻松地实现手绘相关的功能。
在 GitHub 等开源平台上搜索相关的插件或库，可能会找到适合你项目需求的工具。

总的来说，虽然 Flutter 没有直接的手绘支持，但你可以利用其强大的绘图和手势检测功能来实现手绘应用
```

### 2.5 Flutter中使用Opengl

pub.dev中opengle类库

* [opengl][02]
* [flutter_gl][03]




[00]:https://www.jianshu.com/p/ccff28f23f57
[01]:http://laomengit.com/guide/widgets/DrawingBoard.html
[02]:https://pub.dev/packages/opengl
[03]:https://pub.dev/packages/flutter_gl
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-interview-01-widget-life.png