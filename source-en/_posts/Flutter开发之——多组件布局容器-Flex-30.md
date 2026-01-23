---
title: Flutter开发之——多组件布局容器-Flex(30)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: ade3274c
date: 2021-04-09 10:43:02
---
## 一 概述

* Flex是Row和Column的父控件，也是多组件布局容器
* Flex通过`direction`属性控制控制`水平方向`显示还是`垂直方向`显示

<!--more-->

## 二 Flex

### 2.1 构造方法

```
Flex({
    Key? key,
    required this.direction,
    this.mainAxisAlignment = MainAxisAlignment.start,
    this.mainAxisSize = MainAxisSize.max,
    this.crossAxisAlignment = CrossAxisAlignment.center,
    this.textDirection,
    this.verticalDirection = VerticalDirection.down,
    this.textBaseline, // NO DEFAULT: we don't know what the text's baseline should be
    this.clipBehavior = Clip.none,
    List<Widget> children = const <Widget>[],
  })
```

### 2.2 属性说明

|        属性        |      说明      |          取值          |
| :----------------: | :------------: | :--------------------: |
|     direction      |  主轴布局方向  |        Axis对象        |
| mainAxisAlignment  |  主轴对齐方式  | MainAxisAlignment对象  |
|    mainAxisSize    |    主轴尺寸    |    MainAxisSize对象    |
| crossAxisAlignment | 交叉轴对齐方式 | CrossAxisAlignment对象 |
|   textDirection    |    布局方向    |   TextDirection对象    |

## 三 示例

### 3.1 代码

```
Flex(
      direction: Axis.horizontal,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      mainAxisSize: MainAxisSize.min,
      children: [
            Container(width: 80, height: 80, color: Colors.red,),
            Container(width: 100, height: 100, color: Colors.orange,),
            Container(width: 110, height: 110, color: Colors.blue,),
           	],
      )
```

### 3.2 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flex-sample.png