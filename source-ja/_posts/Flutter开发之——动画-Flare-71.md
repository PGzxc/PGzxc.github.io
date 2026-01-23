---
title: Flutter开发之——动画-Flare(71)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 5435951f
date: 2021-05-08 16:21:42
---
## 一 概述

* Flare是2Dimensions推出的一款专门用来为Flutter设计动画的工具。
* Flare与Flutter类似，后缀名为`.flr`，导出Flare动画文件可供开发者使用
* Flare已被Rive所取代，目前已停止更新，仅接收issues和bug反馈

<!--more-->

## 二 Flare

### 2.1 仓库地址

[Flare-Flutter](https://github.com/2d-inc/Flare-Flutter)：https://github.com/2d-inc/Flare-Flutter

### 2.2 插件地址

[flare_flutter 3.0.0](https://pub.dev/packages/flare_flutter)：https://pub.dev/packages/flare_flutter

###  2.3 插件安装与卸载

#### 插件安装

* 打开CMD终端，执行如下指令(自动添加pubspec.yaml依赖)

  ```
  flutter pub add flare_flutter
  ```
#### 插件卸载

* 打开CMD终端，执行如下指令(pubspec.yaml依赖被删除)

  ```
  flutter pub remove flare_flutter
  ```
## 三 Flare素材
### 3.1 素材资源
[https://flare.rive.app/](https://flare.rive.app/)
![][2]

从右上角处，下拉列表选择Flare文件
![][3]
### 3.2 素材下载
* Flare动画详情页，点击`OPEN IN RIVE1`
  ![][4]
* RIVE 1打开后，切换到`ANIMATE(animate)`选项卡，下面有相应的动画表情，点击可执行并查看(fail，test，success，idle)
  ![][5]
* 点击右上角导出按钮将文件导出
  ![][6]

## 四 示例

### 4.1 添加Flare依赖(assets下所有文件)

```
  assets:
     - images/
     - assets/
```

### 4.2 代码(通过设置不同名称，显示动画效果)

```
 //要执行的Flare名称(fail，test，success，idle选择一个)
 String _animationName = "fail";
 
  body: Column(
          children: [
            Flexible(child: FlareActor("assets/Teddy.flr", alignment:Alignment.center, fit:BoxFit.contain, animation: _animationName,)),
            Row(
              mainAxisAlignment:MainAxisAlignment.center,
              children: [
              RaisedButton(child: Text("test"),onPressed: (){setState(() {_animationName="test";});}),
              RaisedButton(child: Text("success"),onPressed: (){setState(() {_animationName="success";});})
            ],)
          ],
        )
```

### 4.3 效果图
![][7]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flare-plugin.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flare-resource-web.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flare-resource-select.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flare-open-in-rive1.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flare-animate-qiehuan.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flare-animate-download.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flare-animate-result.gif