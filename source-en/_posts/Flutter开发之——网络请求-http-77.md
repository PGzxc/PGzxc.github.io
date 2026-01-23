---
title: Flutter开发之——网络请求-http(77)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 65a80c32
date: 2021-05-17 16:12:41
---
## 一 概述

* http是一个可组合，基于Future的库，用于HTTP请求(A composable, Future-based library for making HTTP requests)
* 该软件包包含高级功能和类，可轻松使用HTTP资源。它是多平台的，并且支持移动设备，台式机和浏览器

<!--more-->

## 二 http

### 2.1 项目地址

* Github地址：https://github.com/dart-lang/http
* packages地址：https://pub.dev/packages/http

### 2.2 添加或删除软件

#### 插件安装

打开CMD终端，执行如下指令(自动添加pubspec.yaml依赖)

Dart项目:

```
dart pub add http
```

Flutter项目:

```
flutter pub add http
```

#### 插件卸载

Dart项目:

```
dart pub remove http
```

Flutter项目:

```
flutter pub remove http
```

#### 执行命令

```
flutter pub get
```

### 2.3 执行网络请求

#### 顶级函数请求

```
import 'package:http/http.dart' as http;

var url = Uri.parse('https://example.com/whatsit/create');
var response = await http.post(url, body: {'name': 'doodle', 'color': 'blue'});
```

#### 客户端请求并关闭

```
var client = http.Client();
try {
  var uriResponse = await client.post(Uri.parse('https://example.com/whatsit/create'),
      body: {'name': 'doodle', 'color': 'blue'});
} finally {
  client.close();
}
```

### 2.4 请求方法

* get
* post
* head
* delete
* put
* patch
* read
* readBytes

## 三 接口

[玩Android 开放API-登录](https://wanandroid.com/blog/show/2)

登录用户信息

* url：https://www.wanandroid.com/user/login
* username：wanandroidUser1
* password：123456

## 四 示例

### 4.1 请求参数包含在uri中

```
  var uri = Uri(
        scheme: 'https',
        host: 'www.wanandroid.com',
        path: '/user/login',
        //queryParameters: {'username': 'wanandroidUser1', 'password': '123456'}
        );
    var client=Client();
    Response response= await client.post(uri);
    setState(() {
      _data=response.body;
    });
    print(response.body);
  }
```

### 4.2 请求参数包含在body中

```
   var uri = Uri(
        scheme: 'https',
        host: 'www.wanandroid.com',
        path: '/user/login',
        );
    var client=Client();
    Response response= await client.post(uri,body: {'username': 'wanandroidUser1', 'password': '123456'});
    setState(() {
      _data=response.body;
    });
    print(response.body);
```

### 4.3 设置显示

```
String _data;
body: Center(child: Text("$_data"),),
```

### 4.4 打印结果

```
I/flutter (15765): {"data":{"admin":false,"chapterTops":[],"coinCount":0,"collectIds":[],"email":"","icon":"","id":99295,"nickname":"wanandroidUser1","password":"","publicName":"wanandroidUser1","token":"","type":0,"username":"wanandroidUser1"},"errorCode":0,"errorMsg":""}
```

