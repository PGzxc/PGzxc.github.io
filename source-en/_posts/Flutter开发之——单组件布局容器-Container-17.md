---
title: Flutter开发之——单组件布局容器-Container(17)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: d8d4691c
date: 2021-04-02 15:16:11
---
## 一 单组件容器介绍

* 容器组件的作用就是作为其他组件的容器，提供布局支持
* 单组件布局容器是指容器内只可以由一个子组件，通常用来控制子组件的位置、尺寸和形状等
* Flutter中单组件容器有：Container、Padding、Center、Align、FittedBox、AspectRation、ConstrainedBox、InstrinsicHeight与InstrinsicWidth、LimitedBox、Offsetage、OverflowBox、SizeBox及Transform

<!--more-->

## 二 Container

### 2.1 Container介绍

*  Container是最常用的单容器控件，只包含一个子控件
* Container可以装饰和定位子控件，例如设置背景颜色、形状等

### 2.2 Container构造方法

```
Container({
    Key? key,
    this.alignment,
    this.padding,
    this.color,
    this.decoration,
    this.foregroundDecoration,
    double? width,
    double? height,
    BoxConstraints? constraints,
    this.margin,
    this.transform,
    this.transformAlignment,
    this.child,
    this.clipBehavior = Clip.none,
  }) 
```

### 2.3 常用属性

|        属性名        |                说明                 |          取值          |
| :------------------: | :---------------------------------: | :--------------------: |
|      alignment       |        设置子控件的对齐方式         | AlignmentGeometry对象  |
|       padding        |          设置容器的内边距           | EdgeInsetsGeometry对象 |
|        color         |           容器的背景颜色            |       Color对象        |
|      decoration      | 容器的修饰属性(不能与Color通知设置) |     Decoration对象     |
| foregroundDecoration |              前景修饰               |     Decoration对象     |
|        width         |              容器宽度               |       double对象       |
|        height        |              容器高度               |       double对象       |
|     constraints      |            子组件的约束             |   BoxConstraints对象   |
|        margin        |            容器的外边距             | EdgeInsetsGeometry对象 |
|      transform       |     容器变换属性(旋转、缩放等)      |      Matrix4对象       |
|  transformAlignment  |          容器变换对齐方式           | AlignmentGeometry对象  |
|        child         |               子组件                |       Widget对象       |

## 三 示例

### 3.1 文字

#### 只有子控件，没有任何参数

```
Container(child: Text('文字',style:TextStyle(fontSize: 26),),)
```
![][1]

#### 设置背景色

```
Container(
           color: Colors.blue,
           child: Text('文字',style:TextStyle(fontSize: 26) ,),),
```
![][2]

#### padding和margin

```
Container(
            color: Colors.blue,
            child: Text('文字',style:TextStyle(fontSize: 26) ,),
            padding: EdgeInsets.all(20),
            margin: EdgeInsets.all(30),
          )
```
![][3]

####  Decoration 装饰(背景)

```
Container(
            child: Text('文字',style:TextStyle(fontSize: 26) ,),
            padding: EdgeInsets.symmetric(horizontal: 10),
            decoration: BoxDecoration(
                shape: BoxShape.rectangle,
                borderRadius: BorderRadius.all(Radius.circular(20)),
                color: Colors.blue
            ),
          ),
```
![][4]

#### Decoration 装饰(边框)

```
Container(
            child: Text('文字',style:TextStyle(fontSize: 26) ,),
            padding: EdgeInsets.symmetric(horizontal: 10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: Colors.blue,
                width: 2,
              ),
            ),
          ),
```
![][5]
#### transform 变换

```
Container(
            child: Text('文字',style:TextStyle(fontSize: 26) ,),
            transform: Matrix4.skewX(10),
          ),
```
![][6]

### 3.2 图片

#### 圆角图片

```
Container(
            height: 200,
            width: 200,
            decoration: BoxDecoration(
              image:  DecorationImage(
                image: AssetImage("images/flutter.png"),
                fit: BoxFit.cover,
              ),
              border: Border.all(
                color: Colors.blue,
                width: 2,
              ),
              borderRadius: BorderRadius.circular(12),
            ),
          ),
```
![][7]

#### 圆形图片

```
Container(
            height: 200,
            width: 200,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage("images/flutter.png"),
                fit: BoxFit.cover,
              ),
              border: Border.all(
                color: Colors.blue,
                width: 2,
              ),
              shape: BoxShape.circle,
            ),
          ),
```
![][8]

### 3.3 综合示例

```
 Container(
            transform: Matrix4.rotationZ(-0.5),
            child: Text("容器的内容部分"),
            //color: Colors.blue,
            width: 300,
            height: 35,
            clipBehavior: Clip.none,
            constraints: BoxConstraints(minWidth: 0,maxWidth: 100,minHeight: 0,maxHeight: 100),
            decoration:BoxDecoration(color: Colors.red,image: DecorationImage(image: AssetImage("images/flutter.png")),
            border: Border(top: BorderSide(color: Colors.lightGreenAccent,width: 4,style: BorderStyle.solid)),
            borderRadius:  BorderRadius.all(Radius.elliptical(3, 4)),
              boxShadow: [
                BoxShadow(color: Colors.lightGreenAccent,offset: Offset(20,20)),
                BoxShadow(color: Colors.brown,offset: Offset(-20,-20))
              ],
              gradient: LinearGradient(
                colors: [
                  Colors.lightBlue,
                  Colors.orange
                ],
                stops: [
                  0,0.5
                ]
              ),
                shape: BoxShape.rectangle
            ) ,
          )
```
![][9]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-container-text-only.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-container-text-background.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-container-text-padding-margin.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-container-text-decoration.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-container-text-decoration-border.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-container-text-transform.png

[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-container-image-retangle.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-container-image-circle.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-container-mixed-sample.png