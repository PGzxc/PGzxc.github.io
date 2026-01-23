---
title: Flutter开发之——序列化失败-have not been migrated to null-safety(83)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 4ae9eb2e
date: 2021-05-25 15:51:49
---
## 一 现象

Flutter在数据序列化时，出现了异常，现象如下：

```
[SEVERE] json_serializable:json_serializable on lib/user.dart (cached):
Generator cannot target libraries that have not been migrated to null-safety.
package:flutter_image/user.dart:11:7
   ╷
11 │ class User {
   │       ^^^^
   ╵
[SEVERE] Failed after 74ms
pub finished with exit code 1
```

<!--more-->

## 二 原因分析

### 2.1 项目SDK版本及依赖库版本(pubspec.yaml)

```
environment:
  sdk: ">=2.7.0 <3.0.0"     #dart 版本
  
dependencies:
  json_annotation: ^4.0.1   #json_annotation版本
  
dev_dependencies:
  build_runner: ^2.0.3      #build_runner版本
  json_serializable: ^4.1.2 #json_serializable版本
```

### 2.2 生成json序列化代码时出现现象

编译指令

```
flutter pub run build_runner build
```

现象

```
[SEVERE] json_serializable:json_serializable on lib/user.dart (cached):
Generator cannot target libraries that have not been migrated to null-safety.
package:flutter_image/user.dart:11:7
   ╷
11 │ class User {
   │       ^^^^
   ╵
[SEVERE] Failed after 74ms
pub finished with exit code 1
```

### 2.3 原因

* null-safety：空安全类型错误
* 当前Dart版本为2.7.0，小于空安全类型的[最小版本2.12](https://dart.dev/guides/language/evolution#language-versioning)

```
Dart 2.9
Dart 2.9 didn’t add any features to the Dart language.

Dart 2.10
Dart 2.10 didn’t add any features to the Dart language, but it added an expanded dart tool that’s analogous to the Flutter SDK’s flutter tool.

Dart 2.12
Dart 2.12 added support for sound null safety. When you opt into null safety, types in your code are non-nullable by default, meaning that variables can’t contain null unless you say they can. With null safety, your runtime null-dereference errors turn into edit-time analysis errors.

In Dart 2.12, Dart FFI graduated from beta to the stable channel.
```

## 三 解决办法

  ### 3.1 修改pubspec.yaml中的sdk版本，并执行Pub get

  ```
   #sdk: ">=2.7.0 <3.0.0" #之前版本
   sdk: '>=2.12.0 <3.0.0' #现在版本
  ```

  ### 3.2 重新执行如下指令，生成user.g.dart文件

  ```
 flutter pub run build_runner build
  ```

  



[1]:images-null-safety/flutter-no-safety-dart-version.png