---
title: Flutter开发之——多组件布局容器-Stack和IndexedStack及Positioned(32)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 6762a48
date: 2021-04-09 16:11:02
---
## 一 概述

* Stack组件时Flutter中用来进行绝对布局的一个容器组件(Stack组件可以将子组件叠加显示，根据子组件的顺利依次向上叠加)
*  IndexedStack是Stack的子类，Stack是将所有的子组件叠加显示，而IndexedStack只显示指定的子组件
* Positioned组件通常会作为Stack组件的子组件使用，可以设置绝对的位置和尺寸

<!--more-->

## 二 Stack

### 2.1 说明

* Stack未设置fit和alignment属性时，子控件的位置和大小是不确定的

### 2.2 示例

#### 代码

```
Stack(
      alignment: Alignment.topLeft,
      children: <Widget>[
          Container(height: 200, width: 200, color: Colors.red,),
          Container(height: 150, width: 150, color: Colors.orange,),
          Container(height: 100, width: 100, color: Colors.blue,)
          ],
     )
```

#### 效果图(绘制顺序)

![][1]
## 三 IndexedStack

### 3.1 说明

* IndexedStack是Stack的子类，Stack是将所有的子组件叠加显示，而IndexedStack只显示指定的子组件
* 通过index指定要显示的子组件

### 3.2 示例

#### 代码

```
IndexedStack(
          index: 1,
          children: <Widget>[
            Container(height: 200, width: 200, color: Colors.red,),
            Positioned(
              left: 10,
              top: 10,
              height: 100,
              width: 100,
              child: Container(color: Colors.green,),
            )
          ],
        )
```

#### 效果图
![][2]
## 四 Positioned

### 4.1 说明

* Positioned是单组件容器，跟Stack组合起来使用
* Positioned用于确定在Stack容器中的位置

###  4.2 示例

#### 代码

```
Stack(
      children: <Widget>[
            Container(height: 200, width: 200, color: Colors.red,),
            Positioned(
              left: 10,
              top: 10,
              height: 100,
              width: 100,
              child: Container(color: Colors.green,),
            )
          ],
	)
```

#### 效果图
![][3]

### 4.3 说明

* 当子控件超出了容器的大小时，通过`overflow`属性，确定是否裁剪



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-stack-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-indexedstack-sample.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-stack-positioned-sample.png
