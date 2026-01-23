---
title: Flutter开发之——多组件布局容器-Wrap(33)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 3949d4fa
date: 2021-04-09 17:33:38
---
## 一 概述

* Wrap是多组件布局容器，可以为子控件进行水平或者垂直方向布局
* 当Wrap空间用完时，Wrap会自动换行，也是常说的流式布局

<!--more-->

## 二  Wrap

### 2.1 构造方法

```
Wrap({
    Key? key,
    this.direction = Axis.horizontal,
    this.alignment = WrapAlignment.start,
    this.spacing = 0.0,
    this.runAlignment = WrapAlignment.start,
    this.runSpacing = 0.0,
    this.crossAxisAlignment = WrapCrossAlignment.start,
    this.textDirection,
    this.verticalDirection = VerticalDirection.down,
    this.clipBehavior = Clip.none,
    List<Widget> children = const <Widget>[],
  }) : assert(clipBehavior != null), super(key: key, children: children);
```

### 2.2 属性介绍

|        属性        |                 说明                 |          取值          |
| :----------------: | :----------------------------------: | :--------------------: |
|     direction      |               布局方向               |        Axis对象        |
|     alignment      |             主轴对齐方式             |   WrapAlignment对象    |
|      spacing       | 主轴方向和交叉轴方向子控件之间的间隙 |         double         |
|    runAlignment    |     主轴垂直方向每一行的对齐方式     |   WrapAlignment对象    |
|     runSpacing     | 主轴方向和交叉轴方向子控件之间的间隙 |         double         |
| crossAxisAlignment |            交叉轴对齐方式            | WrapCrossAlignment对象 |
|   textDirection    |        主轴方向上子控件的方向        |   TextDirection对象    |
| verticalDirection  |       交叉轴方向上子控件的方向       | VerticalDirection对象  |

## 三 示例

### 3.1 Wrap子控件

#### 代码

```
Wrap(
      children: List.generate(10, (i) {
        double w = 50.0 + 10 * i;
        return Container(
          color: Colors.primaries[i],
          height: 50,
          width: w,
		  child: Text('$i'),
        );
      }),
    )

```

#### 效果图
![][1]
### 3.2 Wrap布局方向

`direction`属性控制布局方向，默认为水平方向，设置方向为垂直代码如下：

#### 代码(相同部分见示例一)

```
Wrap(
	direction: Axis.vertical,
	...
)
```

#### 效果图
![][2]

### 3.3 对齐方式-alignment(主轴)

#### 代码(相同部分见示例一)

```
Wrap(
	alignment: WrapAlignment.spaceBetween,
	...
)
```

#### 效果图
![][3]

### 3.4 对齐方式-crossAxisAlignment(交叉轴)

#### 代码(宽高不一样)

```
Wrap(
      spacing: 5,
      runSpacing: 3,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: List.generate(10, (i) {
        double w = 50.0 + 10 * i;
        double h = 50.0 + 5 * i;
        return Container(
          color: Colors.primaries[i],
          height: h,
          alignment: Alignment.center,
          width: w,
          child: Text('$i'),
        );
      }),
    )
```

#### 效果图
![][4]

### 3.5主轴方向上对齐方式-runAlignment

#### 代码(相同部分见示例一)

```
Wrap(
	runAlignment: WrapAlignment.spaceEvenly,
	...
)
```

#### 效果图
![][5]
### 3.6 间隔-spacing和runSpacing

#### 代码(相同部分见示例一)

```
Wrap(
	spacing: 5,
    runSpacing: 2,
	...
)
```

#### 效果图
![][6]

### 3.7 textDirection

#### 代码

```
Wrap(
	textDirection: TextDirection.rtl,
	...
)
```

#### 效果图
![][7]
### 3.8 verticalDirection

#### 代码

```
Wrap(
	verticalDirection: VerticalDirection.up,
	...
)
```

#### 效果图
![][8]

##  四 参考

* [老孟Flutter-Wrap](http://laomengit.com/flutter/widgets/Wrap.html)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-wrap-normal-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-wrap-direction-sample.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-wrap-aligment-sample.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-wrap-crossaxisalignment-sample.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-wrap-runAlignment-sample.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-wrap-spacing-runSpacing.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-wrap-textDirection.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-wrap-verticalDirection.png