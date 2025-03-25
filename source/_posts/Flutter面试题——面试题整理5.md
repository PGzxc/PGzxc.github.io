---
title: Flutter面试题——面试题整理5
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: df08d56f
date: 2024-03-25 11:00:03
---
## 一 面试题汇总

1. dart是什么，和flutter有什么关系？
2. main()和runApp()函数在flutter的作用分别是什么？有什么关系吗？
3. 什么是widget?  在flutter里有几种类型的widget？分别有什么区别？能分别说一下生命周期吗？
4. 在flutter里streams是什么？有几种streams？有什么场景用到它？<!--more-->
5. 简单说一下在flutter里async和await？
6. future 和steam有什么不一样？
7. 在什么场景下使用profile mode？
8. 怎么做到只在debug mode运行代码？
10. 列举在flutter的状态管理方案？

## 二  面试题解答(仅供参考)

### 2.1 dart是什么，和flutter有什么关系？

```
dart是一种面向对象语言，dart是flutter的程序开发语言。
```

### 2.2 main()和runApp()函数在flutter的作用分别是什么？有什么关系吗？

```
main() 是 Dart 程序的入口点，在 Flutter 中用于启动应用。
runApp() 是 Flutter 的一个重要函数，它将根 Widget 挂载到屏幕上。runApp() 必须在 main() 中调用。
执行顺序：main() 会先被执行，接着调用 runApp() 来启动应用并渲染 UI。
```

### 2.3  什么是widget?  在flutter里有几种类型的widget？分别有什么区别？能分别说一下生命周期吗？

```
1.在 Flutter 中，Widget 是构建用户界面的基本单元。
可以将 Widget 理解为 UI 元素的描述，它定义了 UI 应该如何显示。 

2.Widget 的类型：
Flutter 中主要有两种类型的 Widget：

2.1 StatelessWidget（无状态 Widget）

2.1.1 定义：
-StatelessWidget 是不可变的，这意味着它们的属性在创建后不能更改。
-它们适用于不需要维护状态的 UI 部分，例如静态文本、图标或图像。

2.1.2 特点：
-性能较高，因为不需要管理状态。
-简单易用，适用于静态 UI。

2.1.3生命周期：
-build()：当 Widget 需要构建 UI 时调用。

2.2 StatefulWidget（有状态 Widget）

2.2.1 定义：
-StatefulWidget 是可变的，它们可以维护自己的状态，并在状态更改时更新 UI。
-它们适用于需要动态更新 UI 的部分，例如表单、动画或用户交互。

2.2.2 特点：
-可以管理内部状态，实现动态 UI。
-需要与 State 对象配合使用，State 对象负责维护 Widget 的状态。

2.2.3 生命周期：
-createState()：创建与 StatefulWidget 关联的 State 对象。
-initState()：State 对象初始化时调用。
-build()：当 Widget 需要构建 UI 时调用。
-didUpdateWidget()：当 StatefulWidget 的配置更改时调用。
-setState()：当 State 对象的状态更改时调用，触发 UI 更新。
-deactivate()：当 State 对象从 Widget 树中移除时调用。
-dispose()：当 State 对象被永久移除时调用。


3.区别总结：
-StatelessWidget 适用于静态 UI，而 StatefulWidget 适用于动态 UI。
-StatelessWidget 没有内部状态，而 StatefulWidget 可以管理内部状态。
-StatelessWidget 生命周期相对简单，StatefulWidget 生命周期相对复杂。

4.生命周期简单说明：

4.1StatelessWidget：
-build()：仅在需要构建 UI 时调用。

4.2StatefulWidget：
-createState()：创建 State 对象。
-initState()：初始化 State。
-build()：构建 UI。
-didUpdateWidget()：Widget 配置更改。
-setState()：状态更改，触发 UI 更新。
-deactivate()：State 从 Widget 树移除。
-dispose()：State 永久移除
```


### 2.4 在flutter里streams是什么？有几种streams？有什么场景用到它？

```
1.概念
在 Flutter 中，Stream 是一种用于处理异步数据序列的抽象。
它可以随着时间的推移发出多个数据事件，并且可以完成或发出错误。

2.Flutter 中主要有两种类型的 Stream：
2.1单订阅 Stream（Single-subscription Stream）：
-这种 Stream 只能被一个监听器监听。
-当监听器取消订阅或 Stream 完成时，它将关闭。
-适用于处理一次性事件序列，例如文件读取或网络响应。

2.2 广播 Stream（Broadcast Stream）：
-这种 Stream 可以被多个监听器监听。
-它可以在任何时候发出数据事件，并且不会因为监听器取消订阅而关闭。
-适用于处理多个监听器需要接收相同数据序列的场景，例如用户输入事件或传感器数据。

3.使用场景：
Stream 在 Flutter 中有许多应用场景，包括：
3.1处理异步数据：
-从网络请求、文件读取或数据库查询等异步操作中接收数据。

3.2 处理事件流：
-监听用户输入事件、传感器数据或计时器事件。

3.3 实现响应式编程：
-构建响应用户交互或数据更改的动态 UI。

3.4状态管理：
使用 StreamProvider 或 BLoC 模式等库管理应用程序状态。

4.简单来说：
Stream 就像一个水管，数据就像水流，监听器就像水龙头。
单订阅 Stream 就像只能接一个水龙头的水管，广播 Stream 就像可以接多个水龙头的水管。
```

### 2.5 简单说一下在flutter里async和await？

```
在 Flutter（以及 Dart 语言中），async 和 await 是用于处理异步操作的关键字，
它们使异步代码看起来更像同步代码，从而提高了代码的可读性和可维护性。

1.async
-async 关键字用于标记一个函数为异步函数。
-异步函数可以包含 await 表达式。
-异步函数总是返回一个 Future 对象，该对象表示异步操作的结果。

2.await
-await 关键字用于暂停异步函数的执行，直到一个 Future 对象完成。
-await 关键字只能在 async 函数中使用。
-await 表达式返回 Future 对象的结果

3.简单来说：
-async 就像告诉 Flutter：“这个函数里面有需要等待的操作，别着急，等我一下”。
-await 就像告诉 Flutter：“等等，这个操作还没完成，完成了我再继续”。

async 和 await 使得异步代码的编写和理解变得更加容易，避免了回调地狱（callback hell）的问题
```

### 2.6 future 和steam有什么不一样？

```
在 Flutter 中有两种处理异步操作的方式 Future 和 Stream，
Future 用于处理单个异步操作，
Stream 用来处理连续的异步操作
```

### 2.7 在什么场景下使用profile mode？

```
在 Flutter 开发中，Profile Mode（性能分析模式）主要用于分析应用程序的性能。
以下是使用 Profile Mode 的一些常见场景：

1. 性能分析和优化：
-当您需要深入了解应用程序的性能瓶颈时，可以使用 Profile Mode。
-通过分析应用程序的 CPU 使用率、内存消耗和帧率，您可以找到性能问题并进行优化。
-Profile Mode 允许您使用 Flutter DevTools 等工具来分析性能数据。

2. 调试性能问题：
-如果您遇到应用程序卡顿、掉帧或内存泄漏等性能问题，可以使用 Profile Mode 来调试这些问题。
-通过分析性能数据，您可以找到导致性能问题的代码段，并进行修复。

3. 启动时间分析：
-如果您需要分析应用程序的启动时间，可以使用 Profile Mode。
-通过跟踪应用程序的启动过程，您可以找到影响启动时间的因素，并进行优化。

4. 评估应用在真实设备上的性能：
-debug模式会开启很多调试工具，影响性能，release模式会关闭所有调试工具，不能分析性能。
-profile模式，会关闭大部分调试工具，保留性能分析工具，
所以更接近于release模式的真实性能，是分析app性能的理想模式。

5. 性能测试：
-在进行性能测试时，可以使用 Profile Mode 来收集性能数据。
-这些数据可以用于评估应用程序在不同设备和场景下的性能表现。
```

### 2.8 怎么做到只在debug mode运行代码？

```
1.概念
在 Flutter 中，你可以使用 kDebugMode 常量来检测应用程序是否在 Debug Mode 下运行。
kDebugMode 是 Flutter 提供的全局常量，它在 Debug Mode 下为 true，
在 Profile Mode 和 Release Mode 下为 false。


2.使用 kDebugMode 的示例

import 'package:flutter/foundation.dart';
void main() {
  if (kDebugMode) {
    // 只在 Debug Mode 下运行的代码
    print('应用程序在 Debug Mode 下运行');
    // 在这里添加你需要在 Debug Mode 下执行的代码
  } else {
    // 在 Profile Mode 或 Release Mode 下运行的代码
    print('应用程序不在 Debug Mode 下运行');
    // 在这里添加你需要在 Profile Mode 或 Release Mode 下执行的代码
  }

  // 其他应用程序代码
}

3.应用场景
3.1 日志记录：
-你可以在 Debug Mode 下打印详细的日志信息，以便调试应用程序。
-在 Profile Mode 或 Release Mode 下，你可以禁用日志记录，以提高性能和减少应用程序的大小。

3.2调试工具：
-你可以在 Debug Mode 下启用调试工具，例如性能监视器或布局调试器。
-在 Profile Mode 或 Release Mode 下，你可以禁用这些工具，以避免影响应用程序的性能。

3.3 模拟数据：
-你可以在 Debug Mode 下使用模拟数据来测试应用程序的功能。
-在 Profile Mode 或 Release Mode 下，你可以使用真实数据来运行应用程序。

3.4条件编译：
在开发过程中，某些代码可能只在调试阶段有用，而不需要在生产环境中使用。
使用 kDebugMode 可以有选择性的运行代码
```

### 2.9 列举在flutter的状态管理方案？

```
setState: Flutter 内置的最简单的状态管理方法
Redux:是一种流行的 JavaScript 状态管理库，它也被移植到了 Dart。
BLoC:它使用 Stream 来处理异步事件和状态更改
RxDart:RxDart 是 ReactiveX 的 Dart 实现，它提供了丰富的 Stream 操作符
provider:是一个封装了 InheritedWidget 的包，提供了更简洁的 API
GetX:是一个轻量级且强大的 Flutter 包，它提供了状态管理、路由管理和依赖注入等功能
```

## 三 参考

* [博客园—一些面试可能会问基础知识](https://www.cnblogs.com/sundaysandroid/p/13528265.html)


