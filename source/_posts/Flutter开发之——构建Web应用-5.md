---
title: Flutter开发之——构建Web应用(5)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: a2dc5393
date: 2021-01-19 17:33:39
---
## 一 概述

之前介绍过使用Flutter构建移动应用，本文介绍使用Flutter构建Web应用

```
- 配置flutter sdk以支持Web
- 在新项目中开启Flutter Web
- 创建一个支持Web运行的新应用
- 向已有的应用添加Web支持
```

<!--more-->

## 二 配置flutter 工具以支持Web

在创建支持Web的Flutter应用前，你需要安装下面的应用：

```
* Flutter SDK(安装并添加到环境path变量中)
* 浏览器(谷歌、Edge)，调试Web应用时，需要浏览器支持
```

## 三 在新项目中开启Flutter Web

### 3.1 开启Web支持

输入下面的指令来开启Web支持

```
flutter config --enable-web
```

这个命令，会生成`.flutter_settings`配置文件，Windows环境下，生成文件的路径是：

```
C:\Users\用户名\AppData\Roaming
```

打开后内容为

```
{
  "enable-web": true
}
```

### 3.2 查看支持的设备(浏览器)

开启Web支持后，运行`flutter devices`命令(类似于Android中的`adb devices`)，会列出所有支持的浏览器信息(QQ浏览器和IE浏览器虽未列出，但也支持)

```
flutter devices
2 connected devices:
Chrome (web) • chrome • web-javascript • Google Chrome 87.0.4280.141
Edge (web)   • edge   • web-javascript • Microsoft Edge 87.0.664.75
```

## 四 创建一个支持Web运行的新应用

### 4.1 集成开发环境(IDE)

#### 4.1.1 创建Web项目(Android Studio为例)

依次点击：File——>New Flutter Project——>Flutter Application——>配置Flutter应用
![][1]

#### 4.1.2 IDE运行Flutter web

从要运行到的设备下拉列表中，选择要运行到的`chrome`，点击运行
![][2]

运行后，程序自动打开chrome浏览器的效果图
![][3]


### 4.2 命令行

#### 4.2.1 创建Web项目

打开终端，输入下面的指令，创建Web新应用

```
flutter create myapp
cd myapp
```

#### 4.2.2 运行Web项目

指定浏览器

```
flutter run -d chrome
flutter run -d edge
```

不指定浏览器

```
flutter run -d web-server
```

运行过程

```
flutter run -d web-server
Launching lib\main.dart on Web Server in debug mode...
Waiting for connection from debug service on Web Server...         14.9s
lib\main.dart is being served at http://localhost:61015
The web-server device requires the Dart Debug Chrome extension for debugging. Consider using the Chrome or Edge devices for an improved development workflow.

Warning: Flutter's support for web development is not stable yet and hasn't
been thoroughly tested in production environments.
For more information see https://flutter.dev/web

  To hot restart changes while running, press "r" or "R".
```

在浏览器中输入`http://localhost:61015`查看运行效果

![][4]

#### 4.2.3 Build命令

创建发行构建

```
flutter run --release
flutter build web
```

输出文件在`build/web`目录下，包括需要一起提供的assets资源文件

## 五 向已有的应用添加Web支持

创建的项目默认支持android、ios、web，如果缺少web端，执行下面的指令(用于添加web支持)

```
flutter create .
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-web-create-config.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ide-chrome-run.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ide-run-chrome-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-cmd-chrome-run.png

