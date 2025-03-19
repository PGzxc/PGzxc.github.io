---
title: IOS面试题——SwiftUI面试题(5)
categories:
  - 面试相关
  - IOS面试题
tags:
  - SwiftUI面试题
abbrlink: 3d7cd81d
date: 2024-03-29 11:20:37
---
## 一 面试题汇总

1. 描述 SwiftUI 中的视图
2. 描述 @State、@Binding、@ObservedObject、@Published和@EnvironmentObject 之间的区别
3. 描述 Spacer 组件的作用
4. SwiftUI 如何获知销毁视图？
5. 描述 iOS 14 及更高版本中的 SwiftUI 应用程序生命周期

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 描述 SwiftUI 中的视图

```
在SwiftUI中，视图(View) 是用户界面的基本构建块。
每个视图遵循View协议，必须实现一个返回视图的body属性。
视图可以通过组合来构建复杂界面，并用修饰符（Modifiers）调整外观和行为。

SwiftUI使用声明式语法，
通过 状态管理（如 @State、@Binding 等）让界面与数据自动保持同步，避免手动更新。
整个架构简单直观，极大提升开发效率
```

### 2.2 描述 @State、@Binding、@ObservedObject、@Published和@EnvironmentObject 之间的区别

```
在 SwiftUI 中，这些属性包装器用来管理数据和视图更新，它们的区别如下：

@State：管理视图内部的私有状态，只有当前视图能修改它。
@Binding：让父视图把状态传递给子视图，实现双向绑定，子视图可以修改父视图的数据。
@ObservedObject：用于观察遵循 ObservableObject 协议的外部对象，当对象发生变化时，视图自动更新。
@Published：搭配 @ObservedObject 使用，标记对象的属性，当属性变化时触发视图刷新。
@EnvironmentObject：在视图层级中共享数据，适合全局状态管理，避免逐层传递。

简单总结：
@State 是本地的，
@Binding 用于父子传递，
@ObservedObject 和 @Published 处理复杂数据模型，
@EnvironmentObject 用来全局共享状态。
```

### 2.3 描述 Spacer 组件的作用

```
在 SwiftUI 中，Spacer组件用来在视图之间添加弹性空间，自动占据多余的空间，从而把其他视图推到一边或均匀分布。

常见用途：
1-对齐视图：把内容推到一侧。
2-均匀分布：在多个视图之间放置 Spacer，让它们平均分布。
```

### 2.4 SwiftUI 如何获知销毁视图？

```
在 SwiftUI 中，视图销毁时可以通过以下方式获知：

1-onDisappear 修饰符：当视图从界面上移除时触发
2-deinit 方法：如果视图绑定了一个类(Class)对象，并且这个类遵循ObservableObject，
可以在类的 deinit 方法里检测对象何时被释放

总结：常用onDisappear来监听视图移除，或者通过绑定的对象deinit来检测更底层的释放逻辑。
```
### 2.5 描述 iOS 14 及更高版本中的 SwiftUI 应用程序生命周期

```
在 iOS 14及更高版本中，SwiftUI引入了新的App生命周期，用来简化应用程序的启动和管理流程。关键点如下：

1-@main：用来标记应用程序的入口点，取代了原来的 AppDelegate。
2-App协议：遵循App协议，定义应用的结构和启动逻辑。
3-Scene：使用 WindowGroup 来管理窗口和场景，适合多窗口环境（如 iPad）。
4-生命周期事件：用onChange监听场景状态（如前后台切换）。

总结：新的生命周期更简洁，所有逻辑都在App结构体中声明，更符合SwiftUI的声明式风格！
```
## 三 参考

* [整理 SwiftUI 2023 年热门面试问题](https://www.codeun.com/archives/1259.html)

