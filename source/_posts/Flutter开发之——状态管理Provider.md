---
title: Flutter开发之——状态管理Provider
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 8c3161af
date: 2025-09-03 08:08:33
---
## 一 概述

```
本文介绍：
 -状态管理 Flutter Provider
 -Provider介绍和示例
```

<!--more-->

## 二 Provider 简介

### 2.1 概念

```
Provider 是 Flutter 官方推荐的状态管理库之一，
基于 InheritedWidget 封装，
提供了更清晰、更简洁的方式来管理和共享应用中的状态。
```

### 2.2 核心思想

```
-Provider：提供数据（状态）的地方。
-Consumer / context.watch：订阅并监听数据变化。
-ChangeNotifier：可观察对象，封装了 notifyListeners() 来通知 UI 更新
```

### 2.3 适用场景

```
-全局共享状态（如用户登录信息、主题）。
-局部页面状态管理（如计数器、表单输入）。
-配合 ChangeNotifier 使用时非常直观。
```

## 三 示例

### 3.1 安装依赖

```
在 pubspec.yaml 添加

dependencies:
  provider: ^6.1.2
```

### 3.2 代码

1、counter.dart(创建状态类)

```
import 'package:flutter/foundation.dart';

class Counter with ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners(); // 通知所有监听UI刷新
  }
}
```

2、MyApp.dart

```
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'counter.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const CounterPage(),
    );
  }
}

class CounterPage extends StatelessWidget {
  const CounterPage({super.key});

  @override
  Widget build(BuildContext context) {
    final counter = context.watch<Counter>(); // 订阅状态变化

    return Scaffold(
      appBar: AppBar(title: const Text("Provider 示例")),
      body: Center(
        child: Text(
          "点击次数: ${counter.count}",
          style: const TextStyle(fontSize: 24),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.read<Counter>().increment(), // 修改状态
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

3、lib/main.dart

```
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'MyApp.dart';
import 'counter.dart'; // 状态类

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: const MyApp(),
    ),
  );
}
```

### 3.3 运行效果

```
-点击右下角的 + 按钮时，会调用 increment()。
-notifyListeners() 通知 Consumer 或 context.watch 的组件自动刷新。
-UI 自动显示最新的点击次数。
```

## 四 总结

```
Provider 简单、轻量，适合中小型项目，也能作为大型项目的基础。
它比 setState 更优雅，比 Bloc 更轻量，学习成本低。
```

## 五 参考

* [pub.dev—provider](https://pub.dev/packages/provider/example)