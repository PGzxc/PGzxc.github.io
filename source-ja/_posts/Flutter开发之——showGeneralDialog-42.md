---
title: Flutter开发之——showGeneralDialog(42)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: f2806d25
date: 2021-04-16 17:17:03
---
## 一 概述

* showGeneralDialog：用于自定义提示框
* 当执行点击事件时，执行`showGeneralDialog`，pageBuilder返回用户自定义试图

<!--more-->

## 二 showGeneralDialog

### 2.1 源代码

```
Future<T?> showGeneralDialog<T extends Object?>({
  required BuildContext context,
  required RoutePageBuilder pageBuilder,
  bool barrierDismissible = false,
  String? barrierLabel,
  Color barrierColor = const Color(0x80000000),
  Duration transitionDuration = const Duration(milliseconds: 200),
  RouteTransitionsBuilder? transitionBuilder,
  bool useRootNavigator = true,
  RouteSettings? routeSettings,
})
```

### 2.2 常用属性说明

|        属性        |         说明         |          取值           |
| :----------------: | :------------------: | :---------------------: |
|    pageBuilder     |    自定义参数页面    |    RoutePageBuilder     |
| barrierDismissible | 是否可以点击背景关闭 |          bool           |
|    barrierColor    |       背景颜色       |          Color          |
| transitionDuration |       动画时长       |        Duration         |
| transitionBuilder  |     构建进出动画     | RouteTransitionsBuilder |

## 三 示例

### 代码

```
RaisedButton(
              child: Text("showGeneralDialog"),
              onPressed: () {
                  showGeneralDialog(
                      context: context,
                      barrierColor: Colors.black.withOpacity(.5),
                      barrierDismissible: true,
                      barrierLabel: '',
                      transitionDuration: Duration(milliseconds: 200),
                      transitionBuilder: (BuildContext context,
                          Animation<double> animation,
                          Animation<double> secondaryAnimation,
                          Widget child) {
                        return ScaleTransition(scale: animation, child: child);
                      },
                      pageBuilder: (BuildContext context,
                          Animation<double> animation,
                          Animation<double> secondaryAnimation) {
                        return Center(
                          child: Container(
                            height: 300,
                            width: 250,
                            color: Colors.lightGreenAccent,
                          ),
                        );
                      });
                })
```

### 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showGeneralDialog-sample.gif