---
title: Flutter开发之——网络请求-Dio(78)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 53e19e7a
date: 2021-05-20 17:06:18
---
## 一 概述

* Dio是一个强大的Dart/Flutter http请求库
* Dio支持Restful API、formData、拦截器、请求取消、Cookie管理、文件上传/下载、超时、自定义适配器等

<!--more-->

## 二 Dio

### 2.1 地址信息

* GitHub地址：https://github.com/flutterchina/dio
* pub地址：https://pub.flutter-io.cn/packages/dio

### 2.2 添加/删除软件包

打开CMD终端，执行如下指令(自动添加pubspec.yaml依赖)

Dart项目:

```
dart pub add dio
```

Flutter项目:

```
flutter pub add dio
```

#### 插件卸载

Dart项目:

```
dart pub remove dio
```

Flutter项目:

```
flutter pub remove dio
```

#### 执行命令

```
flutter pub get
```

## 三 基础使用

### 3.1 get请求

```
  var dio = Dio();
  var response = await dio.get('https://xxx.com/test?id=12&name=wendu');
  print(response.data.toString());

  response = await dio.get('https://xxx.com/test', queryParameters: {'id': 12, 'name': 'wendu'});
  print(response.data.toString());
```

### 3.2 post请求

```
 var dio = Dio();
 var response = await dio.post('https://xxx.com/test', data: {'id': 12, 'name': 'wendu'});
```

### 3.3 并发请求

```
 var dio = Dio();
 var response  = await Future.wait([dio.post('https://xxx.com/info'), dio.get('https://xxx.com/token')]);
```

### 3.4 下载文件

```
 var dio = Dio();
 var response = await dio.download('https://www.xxx.com/', '/savePath');
```

### 3.5 发送 FormData

```
 var dio = Dio();
 var formData = FormData.fromMap({
      'name': 'wendux',
      'age': 25,
    });
 var response = await dio.post('https://www.xxx.com/info', data: formData);
```

### 3.6 通过FormData上传多个文件

```
 var dio = Dio();
 var formData = FormData.fromMap({
      'name': 'wendux',
      'age': 25,
      'file': await MultipartFile.fromFile('./text.txt', filename: 'upload.txt'),
      'files': [
        await MultipartFile.fromFile('./text1.txt', filename: 'text1.txt'),
        await MultipartFile.fromFile('./text2.txt', filename: 'text2.txt'),
      ]
    });
  var response = await dio.post('https://www.xxx.com/info', data: formData);
```

### 3.7 监听发送(上传)数据进度

```
 var dio = Dio();
 var  response = await dio.post(
      'http://www.dtworkroom.com/doris/1/2.0.0/test',
      data: {'aa': 'bb' * 22},
      onSendProgress: (int sent, int total) {
        print('$sent $total');
      },
  );
```

## 四 示例

### 4.1 BaseOptions配置请求

#### 配置BaseOptions

```
var dio = Dio(BaseOptions(
      baseUrl: 'https://www.wanandroid.com/',
      connectTimeout: 5000,
      receiveTimeout: 100000,
      headers: {
        HttpHeaders.userAgentHeader: 'dio',
        'api': '1.0.0',
      },
      contentType: Headers.jsonContentType,
      responseType: ResponseType.plain,
    ));
```

#### get请求

```
Response response;
response = await dio.get('/article/list/0/json');
print(response.data);
```

#### 带options的get请求

```
var responseMap = await dio.get(
      '/article/list/0/json',
      // Transform response data to Json Map
      options: Options(responseType: ResponseType.json),
    );
print(responseMap.data);
```

#### 带参数的post请求

```
 Response response
 response = await dio.post(
      '//user/login',
      data: {
        'username': 'wanandroidUser1',
        'password': '123456'
      },
      // Send data with "application/x-www-form-urlencoded" format
      options: Options(
        contentType: Headers.formUrlEncodedContentType,
      ),
    );
 print(response.data);
```

#### fetch请求

```
 Response response;
 response = await dio.fetch(
      RequestOptions(path: 'https://www.wanandroid.com/article/list/0/json'),
    );
 print(response.data);
```

### 4.2 拦截器

```
 var dio = Dio(BaseOptions(
      baseUrl: 'https://www.wanandroid.com/',
      connectTimeout: 5000,
      receiveTimeout: 100000,
      headers: {
        HttpHeaders.userAgentHeader: 'dio',
        'api': '1.0.0',
      },
      contentType: Headers.jsonContentType,
      responseType: ResponseType.plain,
    ));
 Response response;
 dio.interceptors.add(InterceptorsWrapper(
        onRequest: (options, handler) {
          return handler.next(options);
        },
        onResponse: (response, handler) {
          return handler.next(response);
        },
        onError: (DioError e, handler) {
        }));
 response = await dio.post(
      '/user/login',
      data: {'username': 'wanandroidUser1', 'password': '123456'},
      // Send data with "application/x-www-form-urlencoded" format
      options: Options(
        contentType: Headers.formUrlEncodedContentType,
      ),
    );
 print(response.data);
}
```
