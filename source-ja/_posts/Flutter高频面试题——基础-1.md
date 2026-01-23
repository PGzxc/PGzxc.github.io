---
title: Flutter高频面试题——基础(1)
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: 8c080f8
date: 2025-10-01 08:48:03
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二  面试要求和面试题

```
1.核心概念：Widget、布局、动画
2.三棵树：概念与应用
3.生命周期：Widget/State、App
4.启动流程：从原生到 Flutter
5.数据与网络：Dio/Retrofit(异步编程 Future/Stream)
6.本地存储：SharedPreferences、SQLite、Drift、Hive、Isar 等。
7.特殊布局：Sliver 及作用(滚动优化)
```

### 三 面试题解答(仅供参考)

### 3.1 核心概念

1、什么是 Flutter 中的 Widget？StatelessWidget 和 StatefulWidget 有什么区别？

```
Widget：Flutter UI 的基本构建块，是不可变的配置对象。
StatelessWidget：不可变，适合静态内容（如 Text）。
StatefulWidget：可变，状态存储在 State 中，通过 setState() 触发 UI 重绘。
```

2、Widget 和原生 View 有什么区别？

```
原生 View：可变，直接绘制在屏幕上。
Flutter Widget：不可变配置对象，真正的渲染由 Element 和 RenderObject 完成。
Flutter 刷新时仅重建 Widget 树，Element/Render 层会复用 → 提升性能。
```

3、Flutter 常见布局机制有哪些？使用场景是什么？

```
Row/Column：线性布局，分别用于水平/垂直方向排列。
Stack：层叠布局，子元素可重叠 + Positioned 精确定位。
Container：单子 Widget 容器，常用于 padding/margin/decoration。
Flutter 布局基于 约束模型(Constraints)：父 Widget 给约束，子 Widget 在约束范围内决定大小。
```

4、Flutter 动画有哪些实现方式？Tween 动画是什么？

```
隐式动画：AnimatedContainer、AnimatedOpacity，简单过渡。
显式动画：AnimationController + Tween + AnimatedBuilder，支持暂停、反转等精细控制。
Hero 动画：跨页面共享元素的过渡。
Tween 动画：定义起止值并线性插值，例如 Tween<double>(0, 100)。
```

5、什么是“一切皆 Widget”？

```
Flutter 中 UI、布局、手势、主题、动画等都是 Widget，统一了声明式开发模型。
```

### 3.2 三棵树

1、Flutter 中的三棵树分别是什么？作用是什么？

```
Widget Tree：不可变的配置树，由用户代码构建。
Element Tree：Widget 的实例化版本，可变，管理生命周期 & 状态。
RenderObject Tree：负责布局、绘制、命中测试。
```

2、三棵树在界面更新时如何协作？

```
1、触发 setState()。
2、Flutter 重新构建 Widget Tree。
3、Element Tree 对比新旧 Widget：
 相同类型 & key → 复用 Element / RenderObject。
 不同 → 销毁旧 Element，创建新 Element。

4、RenderObject Tree 更新布局和绘制，Skia 渲染到屏幕。
```

3、为什么 Flutter 更新 UI 效率高？

```
因为 Flutter 只重建 Widget 树，不会直接重建整个渲染树；
Element / RenderObject 层复用已有对象，通过 Diff 算法最小化更新。
```

### 3.3 生命周期

1、StatefulWidget 的生命周期有哪些阶段？

```
createState()：创建 State。
initState()：初始化，只调用一次，不依赖 context。
didChangeDependencies()：依赖 InheritedWidget 变化时触发，可使用 context。
build()：构建 UI，可能多次调用。
didUpdateWidget()：Widget 配置更新时调用。
deactivate()：从树中移除但未销毁时调用。
dispose()：销毁时调用，释放资源。
```

2、`initState()` 和 `didChangeDependencies()` 有什么区别？

```
1、initState()：
只调用一次，适合一次性初始化（如订阅、初始化变量）。

2、didChangeDependencies()：
依赖 InheritedWidget 变化时触发，适合依赖 context 的初始化（如 Theme.of(context)、MediaQuery）。
```

3、Flutter App 的生命周期有哪些？如何监听？

```
1、状态枚举（AppLifecycleState）：
resumed：前台运行。
inactive：临时中断（如来电）。
paused：后台运行。
detached：进程终止 / 无 UI 绑定。

2、监听方式：
实现 WidgetsBindingObserver，重写 didChangeAppLifecycleState 方法。
```

### 3.4 启动流程

1、Flutter 应用从点击图标到显示首页的流程是什么？

```
1、系统启动原生容器：
 Android → MainActivity
 iOS → AppDelegate/SceneDelegate

2、原生加载 FlutterEngine（Dart VM、Skia、Text 渲染等）。
3、Engine 启动 Dart VM，执行 main()。
4、runApp(MyApp)：构建根 Widget。
5、框架构建三棵树（Widget → Element → RenderObject）。
6、RenderObject Tree 渲染命令交给 Skia 引擎。
7、原生 Surface 显示首帧 UI。
```

2、如何优化 Flutter 应用启动速度？

```
使用 预热引擎（Warm-up Engine），提前加载 FlutterEngine。
减少首帧依赖的初始化逻辑（如异步请求延迟到首页后）。
使用 flutter build release 生成优化后的包。
```

### 3.5 数据与网络

1、Flutter 中 `Future` 和 `Stream` 有什么区别？

```
Future：表示一次性异步结果（单值），常见于网络请求、文件读取。
Stream：表示一系列异步结果（多值），适合持续性数据，如用户输入、WebSocket、传感器数据。
```

2、为什么 Flutter 网络请求要用 `async/await` 或 `Future`？

```
1、Dart 单线程运行，通过事件循环和 Future 实现异步非阻塞。

2、Future 状态：
-未完成（操作中）
-已完成（成功返回值）
-已完成（返回错误）

3、async/await 提供语法糖，让异步代码更简洁，避免回调地狱。
```

3、Flutter 如何处理异步 UI 更新？

```
FutureBuilder：用于单次异步操作（加载 → 成功/失败）。
StreamBuilder：用于多次异步数据（实时更新）。
```

4、Dio 和 Retrofit 在 Flutter 中的作用是什么？

```
Dio：功能丰富的 HTTP 客户端，支持拦截器、请求取消、超时、文件上传下载。
Retrofit：基于注解的 API 封装工具，常结合 Dio 使用，简化 REST 接口调用。
```

5、如何处理 Flutter 异步操作中的错误？

```
try-catch + await 捕获错误。
Dio 提供拦截器，可统一处理请求/响应/错误（如 Token 过期）。
```

### 3.6 本地存储

1、Flutter 常见的本地存储方式有哪些？

```
-SharedPreferences：键值对存储，适合配置、Token 等小数据。
-SQLite/Drift：关系型数据库，支持复杂查询和事务，适合结构化数据。
-Hive：轻量级 NoSQL，性能高，适合对象存储和缓存。
-Isar：高性能 NoSQL，支持索引、关系查询，比 Hive 更强
```

2、SharedPreferences、SQLite 和 Hive 的区别是什么？

```
SharedPreferences：存储简单键值对（用户设置、主题等）。
SQLite：关系型数据库，支持复杂查询（如离线缓存）。
Hive：NoSQL 数据库，轻量快速，适合对象存储。
```

3、Drift、Isar 和 Hive 该如何选择？

```
1、对比
Drift：基于 SQLite，提供类型安全 ORM，适合复杂结构化数据。
Isar：高性能 NoSQL，支持索引和关系，适合大规模对象存储。
Hive：简单 NoSQL，适合轻量对象存储。

2、选择建议：
配置 → SharedPreferences；
复杂关系型 → Drift；
高性能对象存储 → Isar；
简单对象存储 → Hive。
```

### 3.7 特殊布局：Sliver

1、什么是 Sliver？它的作用是什么？

```
-Sliver 是 可滚动区域的一部分，只有在视口内时才会构建和渲染。
-优点：支持懒加载和视口裁剪，大幅优化滚动性能。
```

2、Sliver 和 ListView 有什么区别？

```
-ListView：常规滚动列表，简单易用。
-Sliver：更灵活，可在一个滚动视图中组合不同内容（列表、网格、折叠头部等），并带来性能优化。
```

3、常见的 Sliver Widget 有哪些？

```
-CustomScrollView：Sliver 容器，控制滚动行为。
-SliverList / SliverGrid：高性能线性/网格列表。
-SliverAppBar：可折叠、伸缩、固定的头部。
-SliverToBoxAdapter：插入普通 Widget。
-SliverFillRemaining：填充剩余空间。
```

4、Sliver 的典型应用场景有哪些？

```
-大数据列表（只渲染可见区域，节省内存）。
-复杂滚动效果（如折叠 AppBar + 列表 + 网格组合）。
-自定义滚动（视差动画、联动滚动）。
```
