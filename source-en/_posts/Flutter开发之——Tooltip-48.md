---
title: Flutter开发之——Tooltip(48)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 415ddbc0
date: 2021-04-20 16:29:28
---
## 一 概述

* Tooltip是一个消息提示组件
* 当用户点击或者长按时显示提示，在屏幕阅读器能够使它语音化，这有助于示例障碍人士阅读

<!--more-->

## 二 Tooltip

### 2.1 构造函数

```
 const Tooltip({
    Key? key,
    required this.message,
    this.height,
    this.padding,
    this.margin,
    this.verticalOffset,
    this.preferBelow,
    this.excludeFromSemantics,
    this.decoration,
    this.textStyle,
    this.waitDuration,
    this.showDuration,
    this.child,
  })
```

### 2.2 常用属性说明

|     属性     |        说明        |   取值    |
| :----------: | :----------------: | :-------: |
|   message    | 长按时展示文本内容 |  String   |
|    child     |       子控件       |  Widget   |
|    height    |   展现消息的高度   |  double   |
|  textStyle   |   展现消息的样式   | TextStyle |
| waitDuration |      等待时长      | Duration  |
| showDuration |      展示时长      | Duration  |

## 三 示例

### 3.1 代码

```
Tooltip(
        message: '打印',
        verticalOffset: 2,
        waitDuration: Duration(seconds: 5),
        showDuration: Duration(seconds: 2),
        padding: EdgeInsets.all(2.0),
        margin: EdgeInsets.all(5.0),
        textStyle: TextStyle(color: Colors.blue),
        decoration: BoxDecoration(color: Colors.red),
        child: Icon(Icons.print),
        )
```

### 3.2 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-tooltip-sample.gif