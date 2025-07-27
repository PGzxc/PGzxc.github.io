---
title: Flutter开发之——单组件布局容器-Align和Center(19)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 6b7ada6
date: 2021-04-02 17:35:12
---
## 概述

* Align和Center都是控制子控件位置的单组件布局容器
* Align是Center的父控件，有多种位置设置方式
* Center是一种特殊的Align，对齐方式设置为(`alignment = Alignment.center`)

<!--more-->

## 二 Align

### 2.1 构造方法

```
const Align({
    Key? key,
    this.alignment = Alignment.center,
    this.widthFactor,
    this.heightFactor,
    Widget? child,
  }) 
```

### 2.2 属性说明

|   属性    |      说明      |     取值      |
| :-------: | :------------: | :-----------: |
| alignment | 子控件对齐方式 | Alignment对象 |
|   child   |     子控件     |    Widget     |

#### alignment对齐方式说明

```
 /// The top left corner.
  static const Alignment topLeft = Alignment(-1.0, -1.0); //左上

  /// The center point along the top edge.
  static const Alignment topCenter = Alignment(0.0, -1.0);//上中

  /// The top right corner.
  static const Alignment topRight = Alignment(1.0, -1.0); //右上

  /// The center point along the left edge.
  static const Alignment centerLeft = Alignment(-1.0, 0.0); //中左

  /// The center point, both horizontally and vertically.
  static const Alignment center = Alignment(0.0, 0.0); //正中

  /// The center point along the right edge.
  static const Alignment centerRight = Alignment(1.0, 0.0); //中右

  /// The bottom left corner.
  static const Alignment bottomLeft = Alignment(-1.0, 1.0);//下左

  /// The center point along the bottom edge.
  static const Alignment bottomCenter = Alignment(0.0, 1.0); //下中

  /// The bottom right corner.
  static const Alignment bottomRight = Alignment(1.0, 1.0); //下右
```

### 2.3 示例

#### Align代码

```
body: Align(child: Text("Align"),alignment: Alignment.centerLeft,),
```

#### Align效果图

![][1]

## 三 Center

### 3.1 构造方法

```
class Center extends Align {
  /// Creates a widget that centers its child.
  const Center({ Key? key, double? widthFactor, double? heightFactor, Widget? child })
    : super(key: key, widthFactor: widthFactor, heightFactor: heightFactor, child: child);
}
```

### 3.2 属性说明

| 属性  |  说明  |  取值  |
| :---: | :----: | :----: |
| child | 子控件 | Widget |

### 3.3 示例

#### Center代码

```
body: Center(child:Text("Center")),
```

#### Center效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-align-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-center-sample.png