---
title: Flutter开发之——DecoratedBox(51)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: da40c19d
date: 2021-04-21 11:24:37
---
## 一 概述

* DecoratedBox是一个装饰类组件
* decoration属性可以设置子控件的形状，背景颜色，圆角半径等

<!--more-->

## 二 DecoratedBox

### 2.1 构造函数

```
 const DecoratedBox({
    Key? key,
    required this.decoration,
    this.position = DecorationPosition.background,
    Widget? child,
  })
```

### 2.2 常用属性说明

|    属性    |     说明     |           取值            |
| :--------: | :----------: | :-----------------------: |
| decoration |   装饰属性   | Decoration(BoxDecoration) |
|   child    | 要装饰的组件 |          Widget           |

## 三 示例

### 3.1 示例1——装饰文本效果

#### 代码

```
DecoratedBox(
             decoration: BoxDecoration(
                shape: BoxShape.rectangle,
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.red, width: 2,),
              ),
              child: Container(margin: EdgeInsets.all(8),child: Text('文本装饰效果',),),
            )
```

#### 效果图
![][1]

### 3.2 示例2-矩形图片

#### 代码

```
DecoratedBox(
            decoration: BoxDecoration(
                image:  DecorationImage(image: AssetImage("images/flutter.png"), fit: BoxFit.cover,),
                border: Border.all(color: Colors.blue, width: 2,),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Container(height: 200, width: 200,),
            )
```

#### 效果图
![][2]

### 2.3 示例3-圆形图片

#### 代码

```
DecoratedBox(
             decoration: BoxDecoration(
                image:  DecorationImage(image: AssetImage("images/flutter.png"), fit: BoxFit.cover,),
                border: Border.all(color: Colors.blue, width: 2,),
                shape: BoxShape.circle,
              ),
              child: Container(height: 200, width: 200,),
            )
```

#### 效果图
![][3]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-decoratedbox-text-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-decoratedbox-rectangle-sample.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-decoratedbox-circle-sample.png

