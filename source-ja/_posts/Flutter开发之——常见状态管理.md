---
title: Flutter开发之——常见状态管理
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: ba246823
date: 2026-02-21 07:43:19
---
## 一 概述

```
Flutter 状态管理一般分为3类：
1.Widget自带状态
2.Inherited/响应式状态
3.架构级状态管理框架
```

<!--more-->

## 二 状态管理

### 2.1 最基础(官方内置)

1-setState

```
1-定位：局部 UI 状态
2-复杂度：1
3-适合：页面内简单交互
setState(() {
  count++;
});

4-优点
-学习成本低
-官方推荐入门
-无第三方依赖

5-缺点
-逻辑和 UI 耦合
-页面复杂后难维护
-跨页面共享状态困难

6-适合场景
-按钮点击
-切换 tab
-显示/隐藏控件
```

2-ValueNotifier / ValueListenableBuilder

```
1-定位：轻量响应式状态
2-复杂度：2

final counter = ValueNotifier<int>(0);
ValueListenableBuilder(
  valueListenable: counter,
  builder: (_, value, __) => Text('$value'),
);

3-优点
-比 setState 更解耦
-监听粒度更小
-性能好

4-缺点
-只适合简单值
-复杂业务不友好

5-适合场景
-计数器
-loading 状态
-单一字段变化
```

### 2.2 官方推荐体系(主流)

1-InheritedWidget / InheritedModel

```
1-定位：Flutter 底层状态共享
2-复杂度：3

class MyInherited extends InheritedWidget { ... }

4-优点
-Flutter 核心机制
-性能极好

5-缺点
-使用复杂
-样板代码多

一般不直接用，而是用封装好嘅方案(Provider/Riverpod)
```

2-Provider(官方推荐)

```
基于 InheritedWidget

1-定位：应用级状态管理
2-复杂度：3
3-热度：4

ChangeNotifierProvider(
  create: (_) => CounterModel(),
  child: MyApp(),
);

context.watch<CounterModel>().count;

4-优点
-官方推荐
-学习成本低
-社区成熟

5-缺点
-ChangeNotifier 易滥用
-状态不可预测（可变）

6-适合场景
-中小型项目
-快速开发
-传统 MVC/MVVM
```

### 2.3 进阶 & 现代方案(强烈推荐)

1-Riverpod(Provider 作者新作)

```
1-定位：现代化状态管理
2-复杂度：4
3-趋势：3

final counterProvider = StateProvider<int>((ref) => 0);
ref.watch(counterProvider);

4-优点
-编译期安全
-不依赖 BuildContext
-更好测试
-支持 async / stream

5-缺点
-学习曲线略陡

6-适合场景
-中大型项目
-复杂业务
-新项目首选

2024+ 新项目强烈推荐
```

2-Bloc/Cubit

```
1-定位：事件驱动、严谨架构
2-复杂度：5
3-企业级：3
bloc.add(IncrementEvent());

4-优点
-状态可预测
-单向数据流
-非常适合团队协作

5-缺点
-样板代码多
-学习成本高

6-适合场景
-大型 App
-多人协作
-强业务流程（金融/IM）
```

### 2.4 其他常见方案(了解即可)

1-GetX

```
1-定位：All-in-one 框架
2-复杂度：2

3-优点
-上手极快
-少样板代码

3-缺点
-侵入性强
-隐式魔法多
-官方 Flutter 团队不推荐

适合个人项目/Demo
```

2-MobX

```
1-定位：响应式编程
2-复杂度：3

@observable
int count = 0;


3-优点
-自动响应
-写法优雅

4-缺点
-依赖代码生成
-Debug 较难
```

## 三 快速对比表

|     方案      | 学习成本 | 规模  | 推荐指数 |
| :-----------: | :------: | :---: | :------: |
|   setState    |    1     |  小   |    2     |
| ValueNotifier |    2     |  小   |    3     |
|   Provider    |    3     |  中   |    4     |
|   Riverpod    |    4     | 中/大 |    5     |
|     Bloc      |    5     |  大   |    4     |
|     GetX      |    2     |  小   |    2     |

## 四 实战建议

```
Demo / 小工具 → setState + ValueNotifier
普通商业 App → Riverpod
复杂业务 / 大团队 → Bloc
新项目不建议再选 Provider
```

