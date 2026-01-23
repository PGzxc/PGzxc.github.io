---
title: Flutter开发之——getX-快速入门(111)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: d7be6c20
date: 2022-04-29 21:29:29
---
## 一 概述

GetX是Flutter的一个快速开发框架，借助GetX可以极大提高Flutter的开发速度和效率，它支持：

* 反应式状态管理OBS(之前通过setState设置)
* 路由管理(之前通过Navigator跳转)
* 依赖管理(设置过Get.put(Controller)可以获取到Controller实例化)
* 实用工具箱(国际化、切换主题、网络连接设置、GetPage中间件、高级API、本地状态组件、状态混合、测试等)

后续将分章节进行讲解，本文为GetX快速入门，让你对GetX有个了解

<!--more-->

## 二 GetX项目地址及项目集成

### 2.1 GetX项目地址

Github-getX：https://github.com/jonataslaw/getx#about-get

### 2.2 项目集成

1-将 Get 添加到您的 pubspec.yaml 文件中，并执行`Pub get`，查看Dark Packages下面的gex-xxx是否存在

```
dependencies:
  get:
```

![][1]

2-在需要使用的地方导入下面的文件

```
import 'package:get/get.dart';
```

## 三 GetX示例(重写默认项目)

重写后的项目结构如下图所示，重写之前为main.dart，重写之后分为下面3个部分：

* 1-getX-启动入口
* 2-Views：视图View
* 3-controller：控制器

![][2]

### 3.1 getX-启动入口

```
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getx_sample/views/Home.dart';

void main() => runApp(GetMaterialApp(home: Home()));
```

说明：此处作为程序的入口文件，之前的MaterialApp被GetMaterialApp取代

### 3.2 Views：视图View

#### Home.dart(启动页面)

```
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controller/Controller.dart';
import 'Other.dart';

class Home extends StatelessWidget {

  @override
  Widget build(context) {
    //通过Get.put()方法初始化Controller
    final Controller c = Get.put(Controller());
    return Scaffold(
      //当count变化时，Obx可以监听改变
        appBar: AppBar(title: Obx(() => Text("Clicks: ${c.count}"))),
        //通过Get.to方法取代Navigator.push代替页面间的跳转
        body: Center(child: ElevatedButton(
            child: Text("Go to Other"), onPressed: () => Get.to(Other()))),
        floatingActionButton:
        FloatingActionButton(child: Icon(Icons.add), onPressed: c.increment));
  }
}
```

说明：

* 此页面为home页面
* 将点击floatingActionButton的方法放入到Controller的increment中执行
* 通过Get.put(Controller())管理Controller，并返回一个Controller实例
* 点击按钮，借助`Get.to`跳转到第2个页面

#### Other.dart

```
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controller/Controller.dart';

class Other extends StatelessWidget {
  //通过Get.find()找到另一个页面的控制器
  final Controller c = Get.find();

  @override
  Widget build(context){
    //显示更新后的count值
    return Scaffold(body: Center(child: Text("${c.count}")));
  }
}
```

说明：

* 此页面为执行`Get.to`跳转后的页面
* 在此页面通过`Get.find()`获取到Controller，并获取到Controller中的count变量显示

### 3.3 controller：控制器

```
import 'package:get/get.dart';

class Controller extends GetxController{
  var count = 0.obs;
  increment() => count++;
}
```

说明：

* Controller：继承自GetxController，负责页面逻辑的处理
* count值后缀0.obs，监听count的变化值




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-01-install-dependencies.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-01-project-struct.png