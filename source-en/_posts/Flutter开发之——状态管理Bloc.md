---
title: Flutter开发之——状态管理Bloc
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: b8f537cf
date: 2025-09-04 10:00:22
---
## 一 概述

```
本文介绍：
 -状态管理 Flutter Bloc
 -Bloc介绍和示例
```

<!--more-->

## 二 Bloc 简介

### 2.1 概念

```
Bloc ：Business Logic Component
Bloc是 Flutter 常用的状态管理框架之一
```

### 2.2 核心思想

```
-事件驱动 (Event-driven)：通过事件 Event 来触发业务逻辑。
-状态响应 (State-driven)：Bloc 接收到事件后会产出新的 State，UI 根据 State 来更新。
-关注点分离：UI 和业务逻辑分开，方便测试和维护
```

### 2.3 常用依赖

```
-bloc：核心逻辑库。
-flutter_bloc：将 Bloc 和 Flutter widget 结合，提供 BlocBuilder、BlocProvider 等组件
```

## 三 Bloc 基本结构

```
一个完整的 Bloc 包含三部分：
 -Event（事件） → 用户操作（点击按钮、请求数据等）
 -State（状态） → Bloc 输出的结果，用于更新 UI
 -Bloc（逻辑） → 事件和状态的桥梁，接收 Event，处理逻辑，输出 State
```

## 四 简单示例：计数器

### 4.1 添加依赖

```
在 pubspec.yaml 中添加

dependencies:
  flutter_bloc: ^9.1.1
```

### 4.2 代码

1、定义事件 (Event)—counter_event.dart

```
// counter_event.dart
abstract class CounterEvent {}

class Increment extends CounterEvent {}

class Decrement extends CounterEvent {}
```

2、定义状态 (State)—counter_state.dart

```
// counter_state.dart
class CounterState {
  final int count;
  CounterState(this.count);
}
```

3、定义 Bloc—counter_bloc.dart

```
// counter_bloc.dart
import 'package:flutter_bloc/flutter_bloc.dart';
import 'counter_event.dart';
import 'counter_state.dart';

class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<Increment>((event, emit) => emit(CounterState(state.count + 1)));
    on<Decrement>((event, emit) => emit(CounterState(state.count - 1)));
  }
}
```

4、UI 使用 Bloc—lib/main.dart

```
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'counter_bloc.dart';
import 'counter_event.dart';
import 'counter_state.dart';

void main() {
  runApp(
    BlocProvider(
      create: (_) => CounterBloc(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: CounterPage(),
    );
  }
}

class CounterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final bloc = context.read<CounterBloc>();

    return Scaffold(
      appBar: AppBar(title: const Text("Bloc 计数器")),
      body: Center(
        child: BlocBuilder<CounterBloc, CounterState>(
          builder: (context, state) {
            return Text(
              "当前计数：${state.count}",
              style: const TextStyle(fontSize: 28),
            );
          },
        ),
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            heroTag: "inc",
            onPressed: () => bloc.add(Increment()),
            child: const Icon(Icons.add),
          ),
          const SizedBox(height: 12),
          FloatingActionButton(
            heroTag: "dec",
            onPressed: () => bloc.add(Decrement()),
            child: const Icon(Icons.remove),
          ),
        ],
      ),
    );
  }
}
```

### 4.3 运行效果

```
-点击 + → 触发 Increment → Bloc 更新状态 → UI 显示 count+1
-点击 - → 触发 Decrement → Bloc 更新状态 → UI 显示 count-1
```

## 五 参考

* [pub.dev—flutter_bloc](https://pub.dev/packages/flutter_bloc/install)

