---
title: Flutter开发之——ClipPath(52)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 7bbe8e68
date: 2021-04-21 15:43:08
---
## 一 概述

本文介绍Flutter中的裁剪组件

* 已有的裁剪组件：ClipRect，ClipRRect，ClipOval，ClipPath.shape
* 自定义裁剪：CustomClipper

<!--more-->

## 二 裁剪组件

### 2.1 ClipRect—裁剪矩形区域

#### 裁剪组件(basic.dart)

* CustomPaint
* CustomSingleChildLayout
* CustomMultiChildLayout
* Align
* Center
* OverflowBox
* SizedOverflowBox

#### 构造函数

```
const ClipRect({ Key? key, this.clipper, this.clipBehavior = Clip.hardEdge, Widget? child })
```

#### 属性说明

|     属性      |     说明     |         取值         |
| :-----------: | :----------: | :------------------: |
|    clipper    | 定义裁剪规则 | CustomClipper\<Rect> |
| clipBehavior① |   裁剪方式   |       Clip枚举       |
|     child     |  被裁剪组件  |        Widget        |

##### clipBehavior①

|          属性          |             说明             |
| :--------------------: | :--------------------------: |
|          none          |      不裁剪，系统默认值      |
|        hardEdge        |      裁剪但不应用抗锯齿      |
|       antiAlias        |        裁剪而且抗锯齿        |
| antiAliasWithSaveLayer | 裁剪、抗锯齿而且有一个缓冲区 |

#### 示例(heightFactor裁剪高度百分比)

代码

```
ClipRect(child: Center(
              heightFactor: 0.6,
              child: Container(color: Colors.grey,child: Image.asset("images/flutter.png"),width: 150,height: 150,),
            ),),
```

裁剪前效果图

![][1]
裁剪后效果图
![][2]

### 2.2 ClipRRect-圆角裁剪

####  构造函数

```
 const ClipRRect({
    Key? key,
    this.borderRadius = BorderRadius.zero,
    this.clipper,
    this.clipBehavior = Clip.antiAlias,
    Widget? child,
  }) 
```

#### 属性说明

* borderRadius：默认圆角半径是0，没有裁剪

#### 示例

代码

```
ClipRRect(borderRadius: BorderRadius.circular(20), child: Image.asset("images/rabbit.jpg",width: 150,height: 150,)),
```

效果图
![][3]

### 2.3 ClipOval—椭圆裁剪

#### 构造函数

```
  const ClipOval({Key? key, this.clipper, this.clipBehavior = Clip.antiAlias, Widget? child})
```

#### 说明

* 如果父组件为正方形，切出来是圆形
* 如果父组件为长方形，切出来是椭圆形

#### 示例

代码

```
ClipOval( child: Image.asset("images/rabbit.jpg",width: 200,height: 150,fit: BoxFit.cover)),
```

效果图
![][4]

### 2.4 ClipPath.shape—路径裁剪

#### 说明

* 不直接使用ClipPath构造函数，而调用ClipPath.shape进行路径裁剪
* `shape`参数是ShapeBorder类型，系统已经定义了很多形状

|          属性          |   说明   |
| :--------------------: | :------: |
| RoundedRectangleBorder | 圆角矩形 |
|     StadiumBorder      |  足球形  |
| BeveledRectangleBorder | 斜角矩形 |

#### 示例

代码

```
 ClipPath.shape(
              shape: StadiumBorder(),
              child: Container(height: 150, width: 250, child: Image.asset('images/rabbit.jpg', fit: BoxFit.cover,),
              ),
            )
```

效果图
![][5]

## 三 自定义裁剪—CustomClipper

### 3.1 说明

* CustomClipper不是组件，是一个抽象类
* `clipper`属性对应的就是CustomClipper，需要用户自己定义

#### 3.2 自定义CustomClipper(三角形)

```
class TrianglePath extends CustomClipper<Path>{
  @override
  Path getClip(Size size) {
    var path = Path();
    path.moveTo(size.width/2, 0);
    path.lineTo(0, size.height);
    path.lineTo(size.width, size.height);
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) {
    return true;
  }
}
```

### 3.3 示例(使用TrianglePath)

代码

```
ClipPath(
         clipper: TrianglePath(),
         child: Container(height: 150, width: 250, child: Image.asset('images/rabbit.jpg',fit: BoxFit.cover,),),
         ),
```

效果图
![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-clip-before-flutter.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-cliprect-sample.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-clipRRect-sample.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-clipOval-sample.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-clipPath-shape-sample.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-customClipper-sample.png