---
title: React Native开发之——组件Image(12)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件Image
abbrlink: b34dfb8e
date: 2018-03-05 12:40:09
---
## 一 概述
```
在ReactNative中Image是用于显示图片的组件，和开发Android的时候ImageView控件相同的效果。
它可以用来显示网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。
恰当的使用Image组件能更形象更直观的向用户传达信息。

本文主要讲述以下内容：  

- 从本地装载图片
- 从网络装载图片
- 从App中装载图片
- 从SD卡装载图片
```

<!--more-->

## 二 Image组件

### 2.1 从本地装载图像

1、概念

```
从本地装载图像，使用关键字'require'，在项目目录下新建images文件夹用于存放图片资源。
```

2、图示

| 1-代码 | 2-效果 |
| :----: | :----: |
| ![][1] | ![][2] |

### 2.2 从网络装载图像

1、概念

```
从本地装载图像，使用关键字'uri',uri后面跟着图片资源的网络路径
```

2、图示

| 1-代码 | 2-效果 |
| :----: | :----: |
| ![][3] | ![][4] |

### 2.3 从App中装载图像

1、概念

```
从App中装载图片， 当然图片要存在res的drawable目录或assets目录下，记住uri对应的图片名称是不包含后缀的。

这样图片能够被正确加载并且显示出来。
```

2、图示

| 1-clean指令 | 1-代码 | 2-效果 |
| :---------: | :----: | :----: |
|   ![][5]    | ![][6] | ![][7] |

### 2.4 从SD卡加载图片 

1、概念

```
加载手机存储卡上的图片资源，其方式也很简单，假设我现在要加载sdcard根目录下的hzw.jpg。
对应的代码如下
<Image style={{width:100,height:100}} source={{uri:'file:///sdcard/hzw.png'}}/>
```

2、图示

| 1-路径 | 2-代码 | 3-效果  |
| :----: | :----: | :-----: |
| ![][8] | ![][9] | ![][10] |

## 三 参考
参考： [RN_Image][11]

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-local.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-local-look.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-uri-code.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-uri-look.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-app-clean.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-app-code.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-app-look.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-sdcard-dir.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-sdcard-code.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-image-sdcard-look.png
[11]: https://github.com/PGzxc/RN_Image