---
title: Flutter开发之——动画-Nima(72)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: fdca263
date: 2021-05-08 17:26:05
---
## 一 概述

* Nima是基于SKIA进行渲染的2D矢量动画工具
* Nima的使用操作与Flare基本相同
* Nima的文件解压后包含`.nma.bytes`文件和`.png`图片文件，使用时指定`.nma.bytes`文件名

<!--more-->

## 二 Nima

### 2.1 仓库地址

[Nima-Flutter](https://github.com/2d-inc/Nima-Flutter)：https://github.com/2d-inc/Nima-Flutter

### 2.2 插件地址

[nima 1.0.5](https://pub.dev/packages/nima)：https://pub.dev/packages/nima

### 2.3 插件安装与卸载

#### 插件安装

打开CMD终端，执行如下指令(自动添加pubspec.yaml依赖)

```
flutter pub add nima
```

#### 插件卸载

CDM终端模式，执行如下指令(pubspec.yaml依赖被删除)

```
flutter pub remove nima
```

## 三 Nima素材(与Flare相同)

### 3.1 素材资源

[https://flare.rive.app/](https://flare.rive.app/)
![][1]

从右上角处，下拉列表选择Flare文件
![][2]

### 3.2 素材下载

* 在Nima动画详情页，点击`OPEN IN  NIMA`

  ![][3]
  
* 进入到详情页后，切换到`ANIMATE(animate)`选项卡，查看动作名称，及相应的动画(wave,fly)

  ![][4]
  
* 点击底部的输出按钮，将此动画输出(解压后是myrobot.nma.bytes和myrobot.png，同时放到assets目录下)

  ![][5]

## 四 示例

### 4.1 添加Nima依赖(assets下所有文件)

```
 assets:
     - images/
     - assets/
```

### 4.2 示例

```
//从wave,fly中选择一个
String _animationName = "wave";

body: Column(
        	children: [
            Flexible(child: NimaActor("assets/myrobot.nma.bytes", alignment:Alignment.center, fit:BoxFit.contain, animation: _animationName,)),
            Row(
              mainAxisAlignment:MainAxisAlignment.center,
              children: [
              RaisedButton(child: Text("wave"),onPressed: (){setState(() {_animationName="wave";});}),
              RaisedButton(child: Text("fly"),onPressed: (){setState(() {_animationName="fly";});})
            ],)
          ],
        )
```

### 4.3 效果图
![][6]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-nima-resource-web.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-nima-resource-select.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-nima-open-nima.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-nima-animate-options.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-nima-engine-export.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-nima-animate-result.gif