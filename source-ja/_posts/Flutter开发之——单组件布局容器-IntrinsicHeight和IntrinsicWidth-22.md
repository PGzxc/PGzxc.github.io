---
title: Flutter开发之——单组件布局容器-IntrinsicHeight和IntrinsicWidth(22)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 392110c5
date: 2021-04-06 15:53:39
---
## 一 概述

* IntrinsicHeight组件会根据子组件自身的高度扩展高度
* IntrinsicWidth组件会根据子组件自身的宽度扩展宽度

<!--more-->

## 二 IntrinsicHeight

### 2.1 构造方法

```
const IntrinsicHeight({ Key? key, Widget? child }) : super(key: key, child: child);
```

### 2.3 示例

#### 2.3.1 未使用IntrinsicHeight

代码

```
body:Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            new Container(color: Colors.blue, width: 100.0),
            new Container(color: Colors.red, width: 50.0,height: 50.0,),
            new Container(color: Colors.yellow, width: 150.0),
          ],
        ),
```

效果图
![][1]
#### 2.3.2 使用IntrinsicHeight
代码

```
body:IntrinsicHeight(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            new Container(color: Colors.blue, width: 100.0),
            new Container(color: Colors.red, width: 50.0,height: 50.0,),
            new Container(color: Colors.yellow, width: 150.0),
          ],
        ),
      )
```

效果图
![][2]

## 三 IntrinsicWidth

### 3.1 构造方法

```
const IntrinsicWidth({ Key? key, this.stepWidth, this.stepHeight, Widget? child })
    : assert(stepWidth == null || stepWidth >= 0.0),
      assert(stepHeight == null || stepHeight >= 0.0),
      super(key: key, child: child);
```

### 3.2 属性说明

|    属性    | 说明 |  取值  |
| :--------: | :--: | :----: |
| stepWidth  |      | double |
| stepHeight |      | double |

* 当stepWidth不是null的时候，child的宽度将会是stepWidth的倍数，当stepWidth值比child最小宽度小的时候，这个值不起作用
* 当stepWidth为null的时候，child的宽度是child的最小宽度
* 当stepHeight不为null的时候，效果跟stepWidth相同
* 当stepHeight为null的时候，高度取最大高度
![][3]

### 3.3 示例

#### 代码

```
IntrinsicWidth(
  stepHeight: 450.0,
  stepWidth: 300.0,
  child: Column(
    children: <Widget>[
      new Container(color: Colors.blue, height: 100.0),
      new Container(color: Colors.red, width: 150.0, height: 100.0),
      new Container(color: Colors.yellow,height: 150.0,),
    ],
  ),
)

```

#### 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intrinsicheight-no.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intrinsicheight-has.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intrinsic-width-property.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-instrinsic-width-sample.png