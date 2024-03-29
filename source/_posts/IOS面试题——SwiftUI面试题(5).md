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
5. 描述 iOS 14 及更高版本中的 SwiftUI 应用程序生命周期<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 描述 SwiftUI 中的视图

```
这就是SwiftUI具有数据驱动的性质，SwiftUI 通过在必要时以高性能的方式重新计算视图主体来处理更新。
开发人员不会直接处理视图刷新，而是系统处理此操作。

SwiftUI视图是引擎盖下的 struct，符合 SwiftUI 的 View 协议，以描述用户可查看的元素
```

### 2.2 描述 @State、@Binding、@ObservedObject、@Published和@EnvironmentObject 之间的区别

```
1-@State
1.1-属性包装器用于为应用程序中的数据创建单一真相源，该数据会随着时间的推移而变异(并适当更新视图)。
1.2-@State 中的包裹值是任何东西（通常是值类型）。
wrappedValue存储在堆上，当它更改无效时，视点和视点此值的视图将被标记为更新。

2-@Binding
@Binding 属性包装器允许存储数据的属性与显示和突变该数据的视图之间的双向连接。
wappedValue 是绑定到其他东西的值（任何东西）。它从其他来源获取/设置包裹值的值。
当绑定值更改时，它使标记为更新的视图无效。

3-@ObservedObject 和 Published
为了使通过 @Published 观察到的属性到包含类之外的类，该包含类需要继承ObservableObject ， 
相关属性应标记为 @Published ——该属性合成 objectWillChange 发布者以宣布该值将发生变化。

4-@EnvironmentObject
一个属性包装器，允许视图访问并响应自定义定义的设置和条件
```

### 2.3 描述 Spacer 组件的作用

```
Spacer 组件可以通过占用尽可能多的空间来撑开相邻的区域，它有以下特点：

1-灵活的间距：
可以使用 minLength 参数来控制 Spacer 试图占用的空间量。
如果有多个 Spacers ，它们可以在彼此之间平均分配可用空间。

2-自适应布局：
Spacer 通过根据可用空间自动调整间距，帮助创建适应不同屏幕尺寸和方向的布局。

3-可访问性：
Spacer 不仅有助于布局设计；
它还可以通过在UI元素之间创建清晰的视觉分离来促进应用程序的可访问性，这有助于用户更好地理解界面
```

### 2.4 SwiftUI 如何获知销毁视图？

```
SwiftUI 视图是值类型，因此没有直接方法来直接检测它们什么时候被释放。
但是可以使用的对象（引用类型）（如 ObservableObject 实例）析构器 ( deinit)，
这样在释放它们时会得到该析构器调用
```
### 2.5 描述 iOS 14 及更高版本中的 SwiftUI 应用程序生命周期

```
随着 iOS 14 以及更高版本中引入 @main ，
您可以使用 SwiftUI 创建应用程序，而无需传统的 AppDelegate。
现在可以直接使用 App 协议来定义应用程序的入口点。

生命周期方法（例如处理后台或前台事件）可以使用新的应用程序生命周期方法进行处理；

列举与App 协议相关联的生命周期事件

1-onContinueUserActivity 当应用程序继续从另一台设备移交的用户活动时调用
2-onOpenURL 当应用程序通过URL打开时调用

总而言之，处理 SwiftUI 生命周期的工作围绕着了解视图何时被重新绘制，
对特定的生命周期事件使用 onAppear 和 onDisappear 等修饰符，
以及以让 SwiftUI 知道何时需要更新的方式管理状态。
与 SwiftUI 一样，关键是陈述性地思考：根据 UI 的状态定义 UI 的外观，系统管理实际的渲染和更新。
```
## 三 参考

* [整理 SwiftUI 2023 年热门面试问题](https://www.codeun.com/archives/1259.html)

