---
title: Dart开发之——异常处理
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: ed5f381e
date: 2021-02-07 13:56:42
---
## 一 概述

* Dart中的异常
* Dart中的异常处理

<!--more-->

## 二 Dart中的异常
### 2.1 说明

* Dart使用throw关键字抛出异常
* throw("异常")或throw "异常"


### 2.2 代码示例

```
main() {
  var a = -1;
  if (a < 0) {
    throw "异常";
  }
}
```

打印：

```
Unhandled exception:
异常
#0      main (file:///D:/Code/Dart/DartWhile/src/exception/MainException.dart:4:5)
#1      _delayEntrypointInvocation.<anonymous closure> (dart:isolate-patch/isolate_patch.dart:283:19)
#2      _RawReceivePortImpl._handleMessage (dart:isolate-patch/isolate_patch.dart:184:12)
```

## 三 Dart中的异常处理

### 3.1 异常处理说明

当使用try处理异常语句时，显示下列内容(try后可接：on/catch/finally)

```
A try block must be followed by an 'on', 'catch', or 'finally' clause.  
Try adding either a catch or finally clause, or remove the try statement.
```

![][1]

### 3.2 try..on

```
main() {
  var a = -1;
  try {
    if (a < 0) {
      throw ("异常");
    }
  } on int {
    print("捕获了整数类型的异常");
  } on String {
    print("捕获了字符串类型的异常");
  }
  print("程序完成");
}
```

### 3.3 try..catch

```
main() {
  var a = -1;
  try {
    if (a < 0) {
      throw ("异常");
    }
  } catch(ex) {
    print("捕获了异常:$ex");
  }
  print("程序完成");
}
```

### 3.4 try..catch..finally

```
main() {
  var a = -1;
  try {
    if (a < 0) {
      throw ("异常");
    }
  } catch (ex) {
    print("捕获了异常:$ex");
  } finally {
    print("异常处理结束");
  }
  print("程序完成");
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-exception-deal-type.png

