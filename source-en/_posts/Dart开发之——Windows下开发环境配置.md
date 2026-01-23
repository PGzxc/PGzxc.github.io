---
title: Dart开发之——Windows下开发环境配置
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: 7b255e0a
date: 2021-01-20 15:58:14
---
## 一 概述

* Dart SDK 包含开发 Web、命令行和服务端应用所需要的库和命令行工具
* 从 Flutter 1.21 版本开始，[Flutter SDK](https://flutter.cn/docs/get-started/install) 会同时包含完整的 Dart SDK，因此如果你已经安装了 Flutter，可能就无需再特别下载 Dart SDK 了
* Flutter 1.21 之前版本，需要下载并配置Dart SDK

<!--more-->

## 二 Dart SDK下载及配置

### 2.1 Flutter 1.21之后版本(Flutter SDK)

在[Flutter SDK下载页面][21]，选择操作系统下载
![][1]

下载后，解压并配置环境变量

```
PUB_HOSTED_URL:https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL:https://storage.flutter-io.cn
path:D:\SoftWare\flutter\bin
```

打开终端，检测dart SDk是否正确配置

```
dart --version
```

### 2.2  Flutter 1.21之前版本(Dart SDK)

打开[Dart SDK下载页面][22]，选择渠道和版本进行下载

```
渠道说明：
Stable channel：稳定版本
Beta channel：测试版本
Dev channel：开发版本
```
![][2]
下载后解压，并配置dart环境变量

```
path:C:\Program Files\Dart\dart-sdk\bin
```

打开终端，检测dart SDk是否正确配置

```
dart --version
```

### 2.3 查看Dart SDK安装位置

打开git bash，输入如下指令

```
$ which dart
```

## 三 第一个dart文件

* 创建hello.dart文件，打开hello.dart，输入如下内容

  ```
  main() {
    print('hello world');
  }
  ```

* 编译并运行文件

  ```
  dart hello.dart
  ```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-flutter-page-download.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-dart/dart-stable-channel-select.png

[21]:https://flutter.cn/docs/get-started/install
[22]:https://dart.cn/tools/sdk/archive