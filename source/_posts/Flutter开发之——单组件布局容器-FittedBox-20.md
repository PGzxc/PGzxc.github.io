---
title: Flutter开发之——单组件布局容器-FittedBox(20)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: bb052659
date: 2021-04-06 11:17:24
---
## 一 概述

当子组件的宽高比和父组件的宽高比不一样时，我们等比拉伸或者填充父组件，这时我们可以使用FittedBox

<!--more-->

## 二 FittedBox

### 2.1 构造方法

```
const FittedBox({
    Key? key,
    this.fit = BoxFit.contain,
    this.alignment = Alignment.center,
    this.clipBehavior = Clip.none,
    Widget? child,
  }) : assert(fit != null),
       assert(alignment != null),
       assert(clipBehavior != null),
       super(key: key, child: child);
```

### 2.2 属性说明

|   属性    |       说明       |     取值      |
| :-------: | :--------------: | :-----------: |
|    fit    | 填充父控件的方式 |  BoxFit对象   |
| alignment | 子控件的对齐方式 | Alignment对象 |
|   child   |      子控件      |  Widget对象   |

#### fit取值说明

|   取值    |                             说明                             |
| :-------: | :----------------------------------------------------------: |
|   fill    |                  填充父组件，宽高比发生变化                  |
|  contain  |               等比拉伸，但子控件不能超出父控件               |
|   cover   |                尽可能的小，等比拉伸充满父控件                |
| fitWidth  |                    等比拉伸，宽充满父控件                    |
| fitHeight |                    等比拉伸，高充满父控件                    |
|   none    |       认子控件居中，不做拉伸处理，超出父控件的部分裁剪       |
| scaleDown | 在子控件为Image且缩小的情况和`contain`一样，否则和`none`一样 |

## 三 示例

### 3.1 代码

```
body:Container(
        color: Colors.green,
        width: 200,
        height: 200,
        child: FittedBox(
          alignment:Alignment.topLeft ,
        fit: BoxFit.scaleDown,
          child: Container(
            color: Colors.red,
            width: 80,
            height: 50,
          ),
        ),
      )
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-fitttedbox-sample.png