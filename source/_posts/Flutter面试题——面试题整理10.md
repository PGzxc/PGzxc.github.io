---
title: Flutter面试题——面试题整理10
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: 4d656e39
date: 2024-05-17 20:53:29
---
## 一 面试题汇总

1. Flutter Widget和App的生命周期
2. Flutter三棵树
3. Flutter中key
4. Flutter中的Mixin
5. Flutter中的Sliver
6. Flutter从启动到显示
7. flutter overflow问题

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Flutter Widget和App的生命周期

1-StatefulWidget 生命周期

StatefulWidget 组件生命周期分为三组：

- 1.初始化期：createState() ,initState()
- 2.更新期：didChangeDependencies(),build(BuildContext context),didUpdateWidget()
- 3.销毁期：deactivate()，dispose()

2-StatelessWidget 组件生命周期函数

StatelessWidget 组件生命周期函数 : 只有两个 , 分别是 

* createElement() , 
* build() 

### 2.2 Flutter三棵树

即Widget树、Element树和RenderObject树。

* Widget树：控件的配置信息，不涉及渲染，更新代价极低。
* RenderObject树：真正的UI渲染树，负责渲染UI，更新代价极大。
* Element树：Widget树和RenderObject树之间的粘合剂,负责将Widget树的变更以最低的代价映射到 RenderObject树上

### 2.3 Flutter中key

1-什么是key

```
Widget中有个可选属性key，顾名思义，它是组件的标识符，
当设置了key，组件更新时会根据新老组件的key是否相等来进行更新，可以提高更新效率。
但一般我们不会去设置它，除非对某些具备状态且相同的组件进行添加、移除、或者排序时，
就需要使用到key，不然就会出现一些莫名奇妙的问题
```

2-key的分类

key有两个子类GlobalKey和LocalKey

* GlobalKey：GlobalKey全局唯一key，每次build的时候都不会重建，可以长期保持组件的状态，一般用来进行跨组件访问Widget的状态
* LocalKey：LocalKey局部key，可以保持当前组件内的子组件状态，用法跟GlobalKey类似，可以访问组件内部的数据。LocalKey有3个子类ValueKey、ObjectKey、UniqueKey。

### 2.4 Flutter中的Mixin

1-什么是Mixin？

```
Mixin是一种将一个类的功能注入到另一个类中的方式，而不涉及继承。
它允许你将代码模块化，使得不同的类可以共享相同的功能，从而减少重复代码，提高代码的可维护性。

Mixin在Dart语言中通过with关键字实现
一个类可以通过with关键字引入一个或多个Mixin，从而获得Mixin中定义的功能
```

2-Mixin的基本用法

```
// 定义一个简单的Mixin
mixin LoggerMixin {
  void log(String message) {
    print('Log: $message');
  }
}

// 使用Mixin
class MyClass with LoggerMixin {
  void performAction() {
    log('Performing action');
    // 其他操作
  }
}

void main() {
  var myObject = MyClass();
  myObject.performAction();
}
```

3-Mixin的高级用法

* Mixin的有状态
* 多个Mixin的组合

### 2.5 Flutter中的Sliver

1-什么是Sliver

```
Sliver是Flutter中的一种特殊的滚动元素，它可以用来构建复杂的滚动效果，例如可伸缩的头部、悬浮的导航栏等。 Sliver通常用于CustomScrollView中，这是一个可以容纳多个Sliver的滚动视图。

Sliver的特点在于其灵活性，你可以通过组合不同类型的Sliver来实现各种滚动行为。
Flutter提供了许多内置的Sliver，例如SliverAppBar、SliverList、SliverGrid等，
同时你也可以创建自定义的Sliver以满足特定需求
```

2-Sliver的基本结构

* **SliverAppBar**：用于创建可伸缩的头部，可以随着滚动改变高度、显示/隐藏标题等
* **SliverList/SliverGrid：** 用于创建滚动的列表或网格。
* **SliverToBoxAdapter：** 允许将普通的Widget包装成Sliver，使其能够在CustomScrollView中使用

3-使用场景

* 复杂的滚动效果
* 列表和网格的高级定制
* 头部悬浮导航栏
* 多层级滚动

### 2.6 Flutter从启动到显示

在 Flutter 应用程序启动后，到其内容最终显示在屏幕上，通常涉及以下主要步骤：

#### 1. Flutter 引擎初始化：

- Flutter 引擎初始化是应用程序启动的第一步。在这个阶段，Flutter 引擎会初始化运行时环境，加载 Flutter 框架和原生平台的相关代码。

#### 2. Dart 代码执行：

- 一旦引擎初始化完成，Flutter 会加载并执行 Dart 代码。Dart 代码包括应用程序的入口点 `main()` 函数以及应用程序的其他逻辑。

#### 3. Widget 树构建：

- Flutter 使用一种称为 Widget 的组件模型来构建用户界面。在 Dart 代码执行阶段，Flutter 应用程序会通过调用 `build()` 方法构建 Widget 树。
- 在构建 Widget 树期间，Flutter 会创建并配置一系列 Widget，这些 Widget 最终会渲染为用户界面的组件。

#### 4. 绘制和布局：

- 一旦 Widget 树构建完成，Flutter 引擎会执行布局（Layout）和绘制（Painting）阶段。在布局阶段，Flutter 计算每个 Widget 的位置和大小。在绘制阶段，Flutter 将每个 Widget 绘制为屏幕上的图像。

#### 5. 合成：

- 在绘制阶段完成后，Flutter 引擎会将所有绘制的内容合成为一张图像，并将其显示在屏幕上。
- Flutter 使用了一种称为“图层合成”的技术，它能够有效地管理屏幕上的图层，提高绘制效率，并允许 Flutter 应用程序以 60 帧每秒的速度渲染动画和交互效果。

#### 6. 显示：

- 最后，一旦合成完成，图像就会被显示在屏幕上，用户就能够看到应用程序的内容了。

总的来说，从 Flutter 应用程序启动到其内容显示在屏幕上，涉及到一系列复杂的过程，包括引擎初始化、Dart 代码执行、Widget 树构建、布局和绘制、合成和显示等阶段。Flutter 通过这些阶段来实现高性能、流畅的用户界面渲染。

### 2.7 flutter overflow问题

```
在Flutter中，"overflow"问题通常指的是一个widget的内容超出了其可用空间。这可能发生在水平或垂直方向上。为了解决这个问题，你可以使用以下几种方法：

Container 控制大小：使用Container来包装内容，并通过设置width和height来限制其大小。

Center、Align和FittedBox：如果你想居中内容，并且允许内容在必要时溢出（例如，文本过长时使用省略号），可以使用Center、Align或FittedBox。

OverflowBox：允许子widget超出其父widget的范围。

SingleChildScrollView：如果内容超过屏幕大小，使用SingleChildScrollView来滚动查看全部内容。

SizedBox.expand：使用SizedBox.expand来让子widget充满可用空间。

Flexible：在Row或Column中使用Flexible widget，允许其中一些子widget根据可用空间进行伸缩。

Expanded：在Row、Column或Flex中使用Expanded，它会填充剩余的空间。

具体使用哪种方法取决于你的具体需求。例如，如果你希望文本自动换行并且容器大小固定，可以使用SingleChildScrollView；如果你想要的是内容根据屏幕大小自适应，可以使用Flexible或Expanded
```



## 三 参考

1. [一文详解Flutter Widget和App的生命周期](https://www.jb51.net/program/2943396fy.htm)
2. [Flutter 三棵树](https://blog.csdn.net/sziitjin/article/details/134231544)
3. [详解Flutter中key的正确使用方式](https://www.jb51.net/article/273195.htm)
4. [Flutter 完整的生命周期](https://www.jianshu.com/p/6c214a054f90)
5. [深入了解Flutter中的Mixin](https://blog.csdn.net/qq_42698421/article/details/135698462)
6. [深入了解Flutter中的Sliver](https://blog.csdn.net/qq_42698421/article/details/135931334)
7. [Flutter从启动到显示](https://blog.csdn.net/rnZuoZuo/article/details/119358063)