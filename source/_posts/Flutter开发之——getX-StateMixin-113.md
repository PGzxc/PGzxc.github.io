---
title: Flutter开发之——getX-StateMixin(113)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: cba9e1ee
date: 2022-05-01 16:35:42
---
## 一 效果图

| Loading | Success | Empty  | Error  |
| :-----: | :-----: | :----: | :----: |
| ![][2]  | ![][3]  | ![][4] | ![][5] |

<!--more-->

## 二 StateMixin
### 2.1 概述

* Flutter中一种更新UI的方式是使用StateMixin，StateMixin是多种状态的混合
*  因为Controller是负责处理数据和业务功能的，在Controller的后面使用with StateMixin
* StateMixin\<T>中T是数据模型，比如User，StateMixin\<User>
*  当数据模型的数据改变时(如：空/完成/出错等)时，调用个`change(data, status;`方法

### 2.2  RxStatus中的状态

```
RxStatus.loading();
RxStatus.loadingMore()
RxStatus.success();
RxStatus.empty();
RxStatus.error('message');
```

## 三 StateMixin使用示例

### 3.1 项目结构

![][1]

### 3.2 getX入口文件

```
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getx_sample/views/Home.dart';

void main() => runApp(GetMaterialApp(home: Home()));
```

### 3.3 Home界面

```
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getx_sample/views/OtherClass.dart';
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
            child: Text("Go to Other"), onPressed: () => Get.to(OtherClass()))),
        floatingActionButton:
        FloatingActionButton(child: Icon(Icons.add), onPressed: c.increment));
  }
}
```

### 3.4 实体类User

```
class User {
  User({this.name = '', this.age = 0});
  String name;
  int age;
}
```

### 3.5 Controller控制器

```
import 'package:get/get.dart';
import 'package:getx_sample/bean/User.dart';

import '../test/test2.dart';

class Controller extends GetxController with StateMixin<User> {
  var count = 0.obs;

  increment() => interval(count++, (_) => print("interval $_"),
      time: Duration(seconds: 1));

  changeLoading() {
    change(User(name: '1',age: 18), status: RxStatus.loading());
  }

  changeSuccess() {
    change(User(name: 'Success',age: 20), status: RxStatus.success());
  }

  changeEmpty() {
    change(User(name: '4',age: 21), status: RxStatus.empty());
  }

  changeError() {
    change(User(name: '5',age: 22), status: RxStatus.error('error'));
  }
}
```

### 3.6 OtherClass(StateMixin更新UI)

```
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_state_manager/get_state_manager.dart';
import '../controller/Controller.dart';

class OtherClass extends GetView<Controller> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
        Center(
          child:controller.obx(
              (state) => Text(state!.name),
          //onLoading: const CupertinoActivityIndicator(radius: 10), //加载中，默认是个Center(child:CircularProgressIndicator())
          onEmpty: const Text('No data found'), //空数据显示
          onError: (error) => Text(error!), //出错界面显示
        )),
        RaisedButton(child: Text("Loading"), onPressed: () {controller.changeLoading();},),//TextButton文字
        RaisedButton(child: Text("Success"), onPressed: () {controller.changeSuccess();},),//TextButton文字
        RaisedButton(child: Text("Empty"), onPressed: () {controller.changeEmpty();},),//TextButton文字
        RaisedButton(child: Text("Error"), onPressed: () {controller.changeError();},),//TextButton文字
      ],
      )
    );
  }
}
```

## 四  参考

[Github-statemixin_sample](https://github.com/PGzxc/statemixin_sample)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-03-statemixin-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-03-statemixin-loading.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-03-statemixin-success.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-03-statemixin-empty.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-03-statemixin-error.png