---
title: Flutter开发之——单组件布局容器-AspectRatio(21)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 8cf62c52
date: 2021-04-06 13:33:43
---
## 一 概述

AspectRation组件用来创建宽高比固定的容器

<!--more-->

## 二 AspectRatio

### 2.1 构造方法

```
const AspectRatio({
    Key? key,
    required this.aspectRatio,
    Widget? child,
  }) : assert(aspectRatio != null),
       assert(aspectRatio > 0.0),
       // can't test isFinite because that's not a constant expression
       super(key: key, child: child);
```

### 2.2 属性介绍

|    属性     |   说明   |    取值    |
| :---------: | :------: | :--------: |
|    child    |  子组件  | Widget对象 |
| aspectRatio | 宽高比例 |   double   |

## 三 示例

### 3.1 宽高比0.5

#### 代码

```
body: AspectRatio(
          child: Container(color: Colors.orange,),
          aspectRatio: 0.5,
        )
```

#### 效果图
![][1]
### 3.2 宽高比2

#### 代码

```
body: AspectRatio(
          child: Container(color: Colors.orange,),
          aspectRatio: 2,
        )
```

#### 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-aspect-ration-05.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-aspect-ration-2.png