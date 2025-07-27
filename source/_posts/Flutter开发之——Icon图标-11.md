---
title: Flutter开发之——Icon图标(11)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: b8ebcf7d
date: 2021-03-02 13:33:59
---
## 一 概述

* Icon是支持material design的一系列图标
* Icon类似于iconfont即字体图标，它是将图标做成字体文件，然后通过指定不同的字符显示不同图片

<!--more-->

## 二 Icon说明

### 2.1 说明

```
在字体文件中，每一个字符都对应一个位码，而每一个位码对应一个显示字形，
不同的字体就是指字形不同，即字符对应的字形是不同的。
而在iconfont中，只是将位码对应的字形做成了图标，所以不同的字符最终就会渲染成不同的图标
```

### 2.2 icon与Image相比的优势

1. 体积小：可以减小安装包大小。
2. 矢量的：iconfont都是矢量图标，放大不会影响其清晰度。
3. 可以应用文本样式：可以像文本一样改变字体图标的颜色、大小对齐等。
4. 可以通过TextSpan和文本混用。

## 三 Icon如何使用

### 3.1 使用Material Design字体图标

Flutter默认包含了一套Material Design的字体图标，在`pubspec.yaml`文件中的配置如下

```
flutter:
  uses-material-design: true
```

### 3.2 Icon单独作为图标使用

```
Icon(Icons.favorite, color: Colors.pink, size: 24.0, semanticLabel: 'Text to announce in accessibility modes',),
Icon(Icons.audiotrack, color: Colors.green, size: 30.0,),
Icon(Icons.beach_access, color: Colors.blue, size: 36.0,),
```

### 3.3 Icon作为图标字体使用

```
String icons = "字符串："+"\uf396" + " \uE000" + " \uE90D";
Text(icons, style: TextStyle(
                fontFamily: "MaterialIcons",
                fontSize: 24.0,
                color: Colors.green),
          )
```

#### 说明：

```
static const IconData favorite = IconData(0xe721, fontFamily: 'MaterialIcons')
```

* Icons.favorite对应的16进制字符编码为`0xe721`
* ``\u`后面链接的是16进制Unicode编码，用于将16进制编码转换成中文、英文字母、标点符号、特殊特号等字符串

| 转换前 | 转换后 |
| :----: | :----: |
| 0xf396 | \uf396 |
| 0xe000 | \ue000 |
| 0xe90d | \ue90d |

### 3.4 效果图

![][1]

## 四 参考
* [Unicode与中文互转 16进制Unicode编码转换、还原](http://www.msxindl.com/tools/unicode16.asp)

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-icon-text-icon.png