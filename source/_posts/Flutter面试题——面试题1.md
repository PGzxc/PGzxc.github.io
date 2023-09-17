---
title: Flutter面试题——面试题1
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: 8c888035
date: 2022-10-26 17:19:46
---
## 一 面试题知识点

* Flutter种Widget视图的生命周期
* Flutter中的三棵树
* Flutter动画
* Flutter中手势操作
* Flutter绘制(签名/画笔)
* 有无做过手绘相关的项目
* Flutter中使用Opengl

<!--more-->

## 二 面试题解答

### 2.1 Flutter种Widget视图的生命周期

flutter中widget主要分为 StatelessWidget 和 StatefulWidget 两种 二者生命周期不太一样

#### StatelessWidget(无状态)

生命周期只有 **build**

#### StatefulWidget (有状态)

需要持有状态 State，这里面包含了一系列生命周期方法

|         名称          |                             描述                             | 调用次数  |
| :-------------------: | :----------------------------------------------------------: | :-------: |
|      createState      | createState 是 StatefulWidget 里创建 State 的方法，当要创建新的 StatefulWidget 的时候，会立即执行 createState，而且只执行一次 |    1次    |
|       initState       | initState 是 StatefulWidget 创建完后调用的第一个方法，而且只执行一次，类似于 Android 的 onCreate、iOS 的 viewDidLoad()，所以在这里 View 并没有渲染，但是这时 StatefulWidget 已经被加载到渲染树里了，这时 StatefulWidget 的 mount的值会变为 true，直到 dispose调用的时候才会变为 false。可以在 initState里做一些初始化的操作。 |    1次    |
| didChangeDependencies | 1、当 StatefulWidget 第一次创建的时候，didChangeDependencies方法会在 initState方法之后立即调用，之后当 StatefulWidget 刷新的时候，就不会调用了，<br/>2、或者你的 StatefulWidget 依赖的 InheritedWidget 发生变化之后，didChangeDependencies才会调用，所以 didChangeDependencies有可能会被调用多次。<br/> | 1次或多次 |
|         build         | 在 StatefulWidget 第一次创建的时候，build方法会在 didChangeDependencies方法之后立即调用，另外一种会调用 build方法的场景是，每当 UI 需要重新渲染的时候(setState触发)，build都会被调用，所以 build会被多次调用，然后 返回要渲染的 Widget。千万不要在 build里做除了创建 Widget 之外的操作，因为这个会影响 UI 的渲染效率 |   多次    |
|    didUpdateWidget    | 祖先节点rebuild widget时调用，当组件改变状态时就会调用,<br/>需要注意的是，涉及到controller的变更，需要在这个函数中移除老的**controller**的监听，并创建新**controller**的监听。 | 1次或多次 |
|      deactivate       | 要将 State 对象从渲染树中移除的时候，就会调用 **deactivate**生命周期，这标志着 StatefulWidget 将要销毁，但是有时候 State 不会被销毁，而是重新插入到渲染树种 | 1次或多次 |
|        dispose        | 当 View 不需要再显示，从渲染树中移除的时候，State 就会永久的从渲染树中移除，就会调用 **dispose**生命周期，这时候就可以在 **dispose**里做一些取消监听、动画的操作，和 **initState**是相反的 |    1次    |

![][1]

### 2.2 Flutter中的三棵树

[Flutter](https://so.csdn.net/so/search?q=Flutter&spm=1001.2101.3001.7020) 中存在 `Widget` 、 `Element` 、`RenderObject` 三棵树，其中 **`Widget`与 `Element` 是一对多的关系** ，**`Element` 与 `RenderObject` 是一一对应的关系**。

 三棵树介绍：

* Widget是用户界面的一部分,并且是不可变的。
* Element是在树中特定位置Widget的实例。
* RenderObject是渲染树中的一个对象，它的层次结构是渲染库的核心。

### 2.3 Flutter动画

#### Flutter动画

* AnimationController动画
* Tween动画，又叫补间动画
* Curve动画
* TweenSequence序列动画
* 自定义动画
* Simulation物理动画
* AnimatedList列表动画
* 帧动画
* Gif动画
* Hero过度动画

#### 第三方动画
* Lottie
* Flare
* Nima
* Rive

### 2.4 Flutter中手势操作

Flutter中手势识别组件

* GestureDetector
* Ink/InkWell
* Listener

### 2.5 Flutter绘制(签名/画笔)

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

### 2.6 有无做过手绘相关的项目

结合2.5说明

### 2.7 Flutter中使用Opengl

pub.dev中opengle类库

* [opengl][02]
* [flutter_gl][03]




[00]:https://www.jianshu.com/p/ccff28f23f57
[01]:http://laomengit.com/guide/widgets/DrawingBoard.html
[02]:https://pub.dev/packages/opengl
[03]:https://pub.dev/packages/flutter_gl
[1]:https://raw.githubusercontent.com/PGzxc/CDN/master/blog-interview/flutter-01-widget-life.webp