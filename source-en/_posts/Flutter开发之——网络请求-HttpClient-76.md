---
title: Flutter开发之——网络请求-HttpClient(76)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: c5347135
date: 2021-05-17 14:50:35
---
## 一 概述

* HttpClient是Flutter中默认的网络访问工具
* HttpClient可以分别对`get`和`post`请求使用`get`、`getUrl`和`post`、`postUrl`方法
* 本文仅对HttpClient进行简单介绍，后见将介绍其他网络请求框架

<!--more-->

## 二 网络请求中的几个类

flutter中网络请求的过程

![][1]

### 2.1 HttpClient

* 执行网络请求的客户端
* 实例化时通过`var httpClient = new HttpClient();`
* 可以发送get请求(get/getUrl)和post请求(post/postUrl)

### 2.2 Uri

```
factory Uri(
      {String? scheme,
      String? userInfo,
      String? host,
      int? port,
      String? path,
      Iterable<String>? pathSegments,
      String? query,
      Map<String, dynamic /*String|Iterable<String>*/ >? queryParameters,
      String? fragment}) = _Uri;
```

* scheme：如网络请求时为`http`或`https`，文件请求时为`file`
* userInfo：权限组件的用户信息部分，此部分默认为空
* host：主机部分，不区分大小写
* port：端口号，http请求时为80，https请求时为443
* path：接口请求路径(方法)
* pathSegments：同path，只不过将path分段了
* queryParameters：请求参数
* query：同queryParameters，将queryParameters合并成一个

```
var uri = Uri(
        scheme: 'https',
        host: 'www.wanandroid.com',
        path: '/user/login',
        queryParameters: {'username': 'wanandroidUser1', 'password': '123456'});
```

### 2.3 HttpClientRequest

添加请求信息

* request.persistentConnection：支持请求的持久连接状态(默认true)
* request.headers：请求头
* request.cookies：cookies

### 2.4 HttpClientResponse

客户端连接的HTTP响应

* response.statusCode：状态码

## 三 请求接口

[玩Android 开放API-登录](https://wanandroid.com/blog/show/2)

登录用户信息

* url：https://www.wanandroid.com/user/login
* username：wanandroidUser1
* password：123456

## 四 示例

### 4.1 分开请求

```
void _httpClientPost1() async {
    var httpClient = new HttpClient();
    var uri = Uri(
        scheme: 'https',
        host: 'www.wanandroid.com',
        path: '/user/login',
        queryParameters: {'username': 'wanandroidUser1', 'password': '123456'});

    // var uri2=Uri.https('www.wanandroid.com', '/user/login',{'username': 'wanandroidUser1', 'password': '123456'});

    HttpClientRequest request = await httpClient.postUrl(uri);
    HttpClientResponse response = await request.close();
    String responseBody = await response.transform(utf8.decoder).join();
    setState(() {
      _data = responseBody;
    });
    print(responseBody);
  }
```

### 4.2 链式请求

```
void _httpClientPost2() {
    var httpClient = new HttpClient();
    var uri = Uri(
        scheme: 'https',
        host: 'www.wanandroid.com',
        path: '/user/login',
        queryParameters: {'username': 'wanandroidUser1', 'password': '123456'});

    // var uri2=Uri.https('www.wanandroid.com', '/user/login',{'username': 'wanandroidUser1', 'password': '123456'});
    httpClient.postUrl(uri).then((HttpClientRequest request) {
      return request.close();
    }).then((HttpClientResponse response) async {
      String responseBody = await response.transform(utf8.decoder).join();
      setState(() {
        _data = responseBody;
        print(responseBody);
      });
    });
  }
```

### 3.3 设置显示

```
String _data;
body: Center(child: Text("$_data"),),
```

### 4.4 效果图

```
I/flutter (13964): {"data":{"admin":false,"chapterTops":[],"coinCount":0,"collectIds":[],"email":"","icon":"","id":99295,"nickname":"wanandroidUser1","password":"","publicName":"wanandroidUser1","token":"","type":0,"username":"wanandroidUser1"},"errorCode":0,"errorMsg":""}
```
![][2]

## 五 参考
* [Flutter-HttpClient class](https://api.dart.dev/stable/2.13.0/dart-io/HttpClient-class.html)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-http-process.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-httpclient-sample.png
