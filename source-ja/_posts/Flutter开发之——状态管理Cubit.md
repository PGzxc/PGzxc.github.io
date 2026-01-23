---
title: Flutter开发之——状态管理Cubit
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 6c4f3ac2
date: 2025-09-04 09:54:07
---
## 一 概述

```
本文介绍：
 -状态管理 Flutter Cubit
 -Cubit介绍和示例
```

<!--more-->

## 二 Bloc 简介

```
1、Cubit 是 Bloc 库 中更轻量的状态管理解决方案。
 -Bloc：事件（Event）驱动，输入事件 → 状态变化。
 -Cubit：方法调用驱动，直接调用方法改变状态。
 
2、使用场景
适合需要轻量状态管理、逻辑不复杂的场景。
```

## 三 示例

### 3.1 安装依赖

```
在 pubspec.yaml 添加

dependencies:
  flutter_bloc: ^9.1.1
```

### 3.2 代码

1、counter_bloc(创建一个计数器 Cubit)

```
import 'package:flutter_bloc/flutter_bloc.dart';

/// 状态就是一个 int
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);

  void increment() => emit(state + 1);

  void decrement() => emit(state - 1);
}
```

说明

```
super(0) 表示初始状态为 0
emit(newState) 用于更新状态
```

2、lib/man.dart(使用 Cubit)

```
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'counter_cubit.dart';

void main() {
  runApp(
    BlocProvider(
      create: (_) => CounterCubit(),
      child: const MyApp(),
    ),
  );
}

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
    final counterCubit = context.read<CounterCubit>();

    return Scaffold(
      appBar: AppBar(title: const Text('Cubit 示例')),
      body: Center(
        child: BlocBuilder<CounterCubit, int>(
          builder: (context, count) {
            return Text(
              '$count',
              style: const TextStyle(fontSize: 40),
            );
          },
        ),
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            heroTag: 'decrement',
            onPressed: counterCubit.decrement,
            child: const Icon(Icons.remove),
          ),
          const SizedBox(width: 10),
          FloatingActionButton(
            heroTag: 'increment',
            onPressed: counterCubit.increment,
            child: const Icon(Icons.add),
          ),
        ],
      ),
    );
  }
}
```

### 3.3 运行效果

```
点击 + → 数字加 1
点击 - → 数字减 1
```

