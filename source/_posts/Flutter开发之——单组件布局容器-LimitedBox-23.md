---
title: Flutter开发之——单组件布局容器-LimitedBox(23)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: a9aae47b
date: 2021-04-06 16:35:26
---
## 一 说明

* 当LimitedBox本身的尺寸没有限制时，其才可以通过设置maxWidth和maxHeight属性类限制子组件的最大尺寸
* 当LimitedBox的父组件受到约束，此时LimitedBox将不会做任何操作，我们可以认为没有这个组件

<!--more-->

## 二 示例

### 2.1 代码

```
body:Container(
        height: 200,
        width: 200,
        color: Colors.orange,
        child: LimitedBox(
          maxHeight: 50,
          maxWidth: 100,
          child: Container(color: Colors.green,),
        ),
      )
```

### 2.2 效果图
![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-limited-box-sample.png