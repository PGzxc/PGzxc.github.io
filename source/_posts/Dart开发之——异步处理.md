---
title: Dart开发之——异步处理
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: e680c69a
date: 2021-02-09 10:43:05
---
## 一 概述

开发中需要执行耗时操作，比如：文件下载、网络访问、复杂计算等，这些操作需要进行异步处理，这样不会造成界面的阻塞(卡顿)，本文介绍Dart中的异步处理，涉及一下内容：

* `async`和`await`
* `Future`

<!--more-->

## 二 async和await

### 2.1 说明

* `async`：需要执行异步操作时，用async，返回值类型是：`Future<T>`
* await：将异步结果`Future<T>`转换为`T`

### 2.2 示例

```
Future<void> main() async {
  var res = await getData();
  print(res);
}
/**获取数据 */
Future<String> getData() async {
  return await requestNet();
}
/**请求网络 */
Future<String> requestNet() {
  return Future.delayed(Duration(seconds: 2), () => "result");
}
```

打印结果：

```
result
```

## 三 Future

### 3.1 说明

* `Future·是一个抽象类，表示这个对象封装的数据是异步请求的结果
* 任意一个`async`函数都会返回一个`Future`对象

### 3.2 Future工厂模式调用的方法

#### 包含以下方法：

* Future.delay：延迟执行
* Future.sync：异步操作
* Future.value：取值
* Future.error：错误调用
* Future.microtask：异步任务

#### 示例

```
Future<String> timeOut() async {
  print("超时了");
  return await "超时了。。。";
}

String speak() {
  return "Hello";
}

Error onError() {
  throw "出错了";
}
Future<void> main() async {
Future.delayed(Duration(seconds: 4), () => print("延时了"))
      .timeout(Duration(seconds: 1), onTimeout: timeOut);

  var resSync = Future.sync(() => "sync");
  print(await resSync);
  
  var resValue = Future.value(speak());
  print(await resValue);

  var resError = Future.error("出错了", StackTrace.current);
  print(await resError);

  var resMicro = Future.microtask(() => print("microtask"));
  await resMicro;
}
```

### 3.3 Future静态方法

#### 包含以下方法

* Future.any
* Future.doWhile
* Future.foreach
* Future.wait

#### 示例

```
Future<String> timeOut() async {
  print("超时了");
  return await "超时了。。。";
}

Future<void> main() async {
 var map = {"1": timeOut()};
 var futureAny= Future.any(map.values);
 print(await futureAny);
}
```

### 3.4 Future构造时示例

```
Future<String> timeOut() async {
  print("超时了");
  return await "超时了。。。";
}
String speak() {
  return "Hello";
}
Error onError() {
  throw "出错了";
}

Future<void> main() async {
  var future = Future(onError);
  future.then((value) {
    print("获取值为:${value}");
  }, onError: (onError) {
    print("错误结果为11：$onError");
  }).whenComplete(() => print("执行完成了！！！"));

  var futureError = Future(onError);
  futureError.catchError((onError) {
    print("错误结果为：$onError");
  });
  }
```

