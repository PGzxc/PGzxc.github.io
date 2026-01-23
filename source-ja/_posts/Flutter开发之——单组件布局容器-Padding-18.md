---
title: Flutter开发之——单组件布局容器-Padding(18)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: bf64b325
date: 2021-04-02 16:53:33
---
## 一 概述

* Padding只有一个子组件，是单组件布局容器
* Padding自带padding属性

<!--more-->

## 二 Padding容器介绍

### 2.1 Padding构造

```
const Padding({
    Key? key,
    required this.padding,
    Widget? child,
  }) : assert(padding != null),
       super(key: key, child: child);
```

### 2.2 属性介绍

|  属性   |  说明  |      取值      |
| :-----: | :----: | :------------: |
| padding | 内边距 | EdgeInsets对象 |
|  child  | 子组件 |   Widget对象   |

#### child取值说明：

* 可以取值Text，TextButton，Container等

#### padding取值说明：
![][1]


## 三 示例

### 3.1 代码示例

```
Padding(padding: EdgeInsets.all(20),child: Text("Padding"),),
Padding(padding: EdgeInsets.only(left: 5, right: 5, top: 5, bottom: 5), child: Text('Padding-only'),),
Padding(padding: EdgeInsets.symmetric(vertical: 5,horizontal: 5),child:TextButton(onPressed: () {}, child: Text("Padding-TextButton")),),
```

### 3.2 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-padding-property-method.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-padding-sample.png