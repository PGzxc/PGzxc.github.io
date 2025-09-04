---
title: Flutter开发之——状态管理Riverpod
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 3a58960e
date: 2025-09-04 09:42:38
---
## 一 概述

```
本文介绍：
 状态管理 Riverpod 3.x 
 Riverpod简单示例
```

<!--more-->

## 二 什么是 Riverpod 3.x

```
1、概念
 Riverpod 是 Flutter 社区常用的 声明式状态管理库

2、相比 Provider 有这些优势
 -编译时安全：避免类型错误
 -依赖管理更强大：可以很容易组合、复用
 -热重载友好：不会因为全局单例而污染
 -内置支持 同步/异步状态管理（State、Future、Stream、Notifier、AsyncNotifier）
```

## 三 Riverpod简单示例

### 3.1 在 pubspec.yaml 中添加依赖

```
flutter_riverpod: ^3.0.0-dev.17
```

### 3.2 lib/main.dart

```
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';

// A Counter example implemented with riverpod

void main() {
  runApp(
    // Adding ProviderScope enables Riverpod for the entire project
    const ProviderScope(child: MyApp()),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: Home());
  }
}

/// Providers are declared globally and specify how to create a state
final counterProvider = StateProvider((ref) => 0);

class Home extends ConsumerWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter example')),
      body: Center(
        // Consumer is a builder widget that allows you to read providers.
        child: Consumer(
          builder: (context, ref, _) {
            final count = ref.watch(counterProvider);
            return Text('$count');
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // The read method is a utility to read a provider without listening to it
        onPressed: () => ref.read(counterProvider.notifier).state++,
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## 四 常见 Provider 类型

|     Provider 类型     |              适用场景              |
| :-------------------: | :--------------------------------: |
|       Provider        |   提供只读依赖(配置、Service 等)   |
|     StateProvider     |     管理简单可变状态(计数器等)     |
|    FutureProvider     |        管理 Future 异步请求        |
|    StreamProvider     |         管理 Stream 数据流         |
|   NotifierProvider    |          封装同步业务逻辑          |
| AsyncNotifierProvider | 封装异步业务逻辑(网络请求、数据库) |

## 五 最佳实践

```
-逻辑写在 Notifier / AsyncNotifier 里，UI 只关心状态
-避免在全局直接 ref.read，保持可测试性
-AsyncNotifier 统一处理 loading/error/data 三态
-项目大时建议配合 riverpod_generator + freezed 自动生成 Provider
```

