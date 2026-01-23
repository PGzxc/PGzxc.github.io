---
title: Flutter开发之——单组件布局容器-Offstage(24)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: f27af541
date: 2021-04-06 17:09:29
---
## 一 概述

* Offstage在实际开发中是一个使用的非常多的容器
* 通过设置Offstage的offstage属性，来控制组件是否显示

<!--more-->

## 二 Offstage

### 2.1 构造方法

```
const Offstage({ Key? key, this.offstage = true, Widget? child })
  : assert(offstage != null),
   super(key: key, child: child);
```

### 2.2 属性说明

* 当offstage为true，控件隐藏； 当offstage为false，控件显示

## 三 示例

### 3.1 代码

```
body:Column(
        children: <Widget>[
          Offstage(offstage: _isOff, child:TextButton(onPressed: () {}, child: Text("Offstage"))),
          OutlinedButton(child: Text(_isOff?'显示':'隐藏'),
            onPressed: () {setState(() {_isOff = !_isOff;});},)
        ],
      )
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-offstage-sample.gif