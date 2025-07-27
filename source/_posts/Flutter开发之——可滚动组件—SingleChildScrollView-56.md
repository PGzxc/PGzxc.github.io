---
title: Flutter开发之——可滚动组件—SingleChildScrollView(56)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 50a2492a
date: 2021-04-22 15:22:09
---
## 一 概述

* SingleChildScrollView：是一个只能包含单个组件的滚动组件
* SingleChildScrollView常跟Column/Row组合使用

<!--more-->

## 二 SingleChildScrollView

### 2.1 构造函数

```
const SingleChildScrollView({
    Key? key,
    this.scrollDirection = Axis.vertical,
    this.reverse = false,
    this.padding,
    bool? primary,
    this.physics,
    this.controller,
    this.child,
    this.dragStartBehavior = DragStartBehavior.start,
    this.clipBehavior = Clip.hardEdge,
    this.restorationId,
  })
```

### 2.2 常用属性说明

|      属性       |       说明       |     取值      |
| :-------------: | :--------------: | :-----------: |
| scrollDirection |     滚动方向     |   Axis枚举    |
|     reverse     | 是否反转滚动方向 |     bool      |
|     physics     |   滚动物理特性   | ScrollPhysics |

## 三 示例

### 3.1 代码

```
SingleChildScrollView(
            scrollDirection: Axis.vertical,
            padding: EdgeInsets.all(10),
            child: Column(
            children: List.generate(50, (index) {
              return Container(
                alignment: Alignment.center,
                height: 80,
                child: Text("$index"),
                color: Colors.primaries[index % Colors.primaries.length],
              );
            }).toList(),
          ),
        )
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-singleChildScrollView-sample.gif