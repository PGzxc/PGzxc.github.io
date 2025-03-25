---
title: Flutter面试题——面试题整理11
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: 3a625eaf
date: 2024-05-17 20:53:29
---
## 一 面试题汇总

1. Flutter Widget和App的生命周期
2. Flutter三棵树及对应关系
3. Flutter中key
4. Flutter中的Mixin
5. Flutter中的Sliver
6. Flutter从启动到显示
7. flutter overflow问题

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Flutter Widget和App的生命周期

```
1-StatefulWidget 生命周期

StatefulWidget 组件生命周期分为三组：
- 1.初始化期：createState() ,initState()
- 2.更新期：didChangeDependencies(),build(BuildContext context),didUpdateWidget()
- 3.销毁期：deactivate()，dispose()

2-StatelessWidget 组件生命周期函数
StatelessWidget 组件生命周期函数 : 只有两个 , 分别是 
-createElement() , 
-build() 


Flutter Widget 生命周期
1.createState：
当 StatefulWidget 被创建时，createState 方法被调用，创建相应的 State 对象。

2.initState：
-State对象被创建后，initState方法会被调用。
-这是初始化状态的地方，通常用于网络请求或其他异步操作的启动。

3.build：
-build 方法在每次 Widget 需要重新构建时调用，比如状态变化后或者父 Widget 重新构建时。
-该方法会返回一个新的 Widget 树。

4.didUpdateWidget：
当父 Widget 更新并重新构建时，didUpdateWidget 会被调用，用来处理与新的 Widget 的差异

5.setState：
通过调用 setState，Flutter 会通知框架重新构建 Widget 并更新 UI。

6.dispose：
当 Widget 不再需要时（例如，页面销毁时），dispose 被调用，用来释放资源和取消订阅等操作。


Flutter App 生命周期：
1.main：main 函数是 Flutter 应用的入口。这里通常会调用 runApp() 来启动应用。
2.initState (App)：initState 方法在应用启动时调用，这个阶段通常用于设置一些全局的配置。
3.build (App)：每次应用的 UI 树需要更新时，都会调用 build 方法。通常情况下是重新渲染页面时调用。
4.didChangeAppLifecycleState：
这是 App 的生命周期管理方法之一，当应用的状态发生变化时（例如从前台切到后台或从后台切到前台）会被调用。
5.dispose (App)：App 销毁时会调用 dispose 方法，通常用于清理资源。
```

### 2.2 Flutter三棵树及对应关系

```
1.三棵树

在 Flutter 中，有三棵重要的树，分别是：Widget 树、Element 树 和 RenderObject 树。
简单解释如下：

1.1 Widget 树：
-描述 UI 的结构，是开发者直接操作的部分。
-Widget 是不可变的，仅用于配置 UI。每次更新 UI 时，Flutter 会创建新的 Widget 树。

1.2 Element 树
-充当 Widget 和 RenderObject 之间的桥梁，管理 Widget 的生命周期和状态。
-Element 是持久的，能在 Widget 更新时复用，避免不必要的重建。

1.3 RenderObject 树
-负责布局、绘制和事件处理，是最底层的渲染机制。
-每个可视化的 Widget 都对应一个 RenderObject，用于真正的像素绘制

总结
-Widget 树描述 UI 结构。
-Element 树管理 Widget 的生命周期和状态。
-RenderObject 树负责绘制和布局。

三棵树各司其职，共同实现 Flutter 高效的 UI 构建与渲染

2 对应关系
2.1 Widget 树 vs Element 树：一对一关系
-每个 Widget 对应一个 Element，Element 作为 Widget 的实例化对象，管理 Widget 的生命周期和位置。
-当 Widget 树更新时，Flutter 会尝试重用现有的 Element，避免重复创建，提升性能。
-例子：Text('Hello') 这个 Widget 会创建一个对应的 Element（StatelessElement）。

2.2 Element 树 vs Render 树：一对多关系
-非所有 Element 都有对应的 RenderObject。
只有涉及渲染的 Widget（如 Container、Text）才会创建 RenderObject。

-某些布局类的 Widget（如 GestureDetector、StreamBuilder）并不直接参与渲染，
因此它们的 Element 没有对应的 RenderObject。

-例子：Column 创建一个对应的 Element，
同时生成一个 RenderObject；GestureDetector 只有 Element，没有 RenderObject。

总结：
-Widget 树 vs Element 树 → 一对一（每个 Widget 对应一个 Element）。
-Element 树 vs Render 树 → 一对多（只有可视 Widget 的 Element 才对应 RenderObject）。
```

### 2.3 Flutter中key

```
在 Flutter 中，Key 主要用于标识 Widget，
在 Widget 更新时帮助 Flutter 正确匹配旧 Widget 和新 Widget，避免不必要的重建，提高性能。

1.Key 的作用：
-保持 Widget 状态：当 Widget 重新构建时，Flutter 通过 Key 识别是否是相同的 Widget，避免状态丢失。
-优化列表性能：在 ListView 等动态列表中，使用 Key 可避免不必要的重建，提高滚动性能。
-避免 Widget 位置错乱：在 Column、Row 等结构中，使用 Key 可防止重排导致的 UI 闪烁或数据错乱。

2.Key 的类型：

2.1 GlobalKey
-适用于跨 Widget 树使用的情况，例如获取 Widget 的状态、操作 Scaffold 等。
-例如 GlobalKey<FormState>() 可用于表单校验

2.2 LocalKey（ValueKey、ObjectKey、UniqueKey）
-ValueKey：根据具体值判断是否为同一个 Widget，适用于标识某个特定数据项。
-ObjectKey：适用于对象列表，基于对象的 hashCode 进行匹配。
-UniqueKey：每次创建都不同，不会复用 Widget，强制 Flutter 重新构建

3.示例
ListView.builder(
  itemBuilder: (context, index) {
    return ListTile(
      key: ValueKey(items[index].id), // 使用唯一 ID 作为 Key
      title: Text(items[index].name),
    );
  },
);

4.总结
-Key 主要用于 Widget 识别，优化 UI 更新，避免状态丢失和 UI 闪烁。
-GlobalKey 适用于全局状态管理，LocalKey 适用于局部组件标识
```

### 2.4 Flutter中的Mixin

```
在Flutter（Dart语言）中，Mixin是一种代码复用机制，它允许你在多个类之间共享代码，而无需使用传统的继承方式。
以下是对Flutter中Mixin的详细描述

1.Mixin的定义
-Mixin是一种特殊的类，它包含一组可复用的方法和属性。
-Mixin可以被多个类混入（使用with关键字），从而使这些类拥有Mixin中定义的功能。
-Mixin不具备普通类的构造函数，不能被实例化。

2.Mixin的特点
-代码复用： Mixin允许你在多个类之间共享代码，避免代码冗余。
-灵活性： Mixin可以被多个类混入，从而实现灵活的代码组合。
-避免多重继承问题： Dart不支持多重继承，而Mixin提供了一种替代方案，可以实现类似多重继承的效果。

3.Mixin的声明和使用
3.1 声明Mixin： 使用mixin关键字声明Mixin
mixin MyMixin {
  void doSomething() {
    print('Doing something...');
  }
}
3.2 使用Mixin： 使用with关键字将Mixin混入类中
class MyClass with MyMixin {
  void doAnotherThing() {
    print('Doing another thing...');
  }
}

4.Mixin的应用场景
-共享通用功能： 当多个类需要共享一组通用功能时，可以使用Mixin。
-实现代码复用： 当需要在多个类之间复用代码时，可以使用Mixin。
-避免多重继承问题： 当需要实现类似多重继承的效果时，可以使用Mixin。

5.关键要点
-Mixin是一种代码复用机制，允许你在多个类之间共享代码。
-Mixin使用mixin关键字声明，使用with关键字混入类中。
-Mixin可以提高代码的复用性和灵活性，避免多重继承问题。
```

### 2.5 Flutter中的Sliver

```
1-什么是Sliver
Sliver是Flutter中的一种特殊的滚动元素，
它可以用来构建复杂的滚动效果，例如可伸缩的头部、悬浮的导航栏等。 
Sliver通常用于CustomScrollView中，这是一个可以容纳多个Sliver的滚动视图。

Sliver的特点在于其灵活性，你可以通过组合不同类型的Sliver来实现各种滚动行为。
Flutter提供了许多内置的Sliver，例如SliverAppBar、SliverList、SliverGrid等，
同时你也可以创建自定义的Sliver以满足特定需求

2-Sliver的基本结构
-SliverAppBar：用于创建可伸缩的头部，可以随着滚动改变高度、显示/隐藏标题等
-SliverList/SliverGrid： 用于创建滚动的列表或网格。
-SliverToBoxAdapter： 允许将普通的Widget包装成Sliver，使其能够在CustomScrollView中使用

3-使用场景
-复杂的滚动效果
-列表和网格的高级定制
-头部悬浮导航栏
-多层级滚动
```

### 2.6 Flutter从启动到显示

```
Flutter应用程序从启动到显示经历了一系列复杂的步骤。以下是对这一过程的详细描述:

1.应用启动
1.1 原生启动：
-当用户点击Flutter应用的图标时，操作系统（Android或iOS）会启动原生应用。
-原生应用负责初始化Flutter引擎

1.2 Flutter引擎初始化：
-Flutter引擎是一个C++编写的运行时环境，负责渲染Flutter应用。
-引擎初始化包括设置图形渲染管道、加载Dart虚拟机等

2.Dart虚拟机启动
2.1 Dart代码加载：
-Flutter引擎加载Dart代码，并启动Dart虚拟机。
-Dart虚拟机负责执行Dart代码

2.2 main()函数执行：
-Dart虚拟机执行main()函数，这是Flutter应用的入口点。
-runApp()方法被调用，它将根Widget传递给Flutter框架

3.Widget树构建
3.1 Widget构建：
-Flutter框架根据根Widget构建Widget树。
-Widget树描述了应用的用户界面。

3.2 Element树和RenderObject树：
-Flutter框架将Widget树转换为Element树和RenderObject树。
-Element树负责管理Widget的生命周期，RenderObject树负责布局和绘制。

4.布局和绘制
4.1 布局：RenderObject树根据Widget的布局约束计算每个RenderObject的大小和位置。
4.2 绘制：
-RenderObject树将每个RenderObject绘制到屏幕上。
-Flutter引擎使用Skia图形库进行高效的绘制
4.3 帧渲染：
-Flutter引擎按照每秒60帧或更高的速率渲染用户界面，以实现流畅的动画和交互

5. 显示
5.1 显示到屏幕：
-Flutter引擎将渲染的帧显示到屏幕上。
-用户看到应用的初始界面

关键要点：
-Flutter应用启动涉及原生应用和Flutter引擎的初始化。
-main()函数和runApp()函数是Flutter应用启动的关键。
-Widget树、Element树和RenderObject树是Flutter框架的核心数据结构。
-Flutter引擎使用Skia图形库进行高效的渲染。
```

### 2.7 flutter overflow问题

```
在 Flutter 中，"overflow" 问题通常指的是布局溢出，即 Widget 的内容超出了其父 Widget 的边界。
这可能导致 UI 显示不正确，甚至出现错误。以下是一些常见的 Flutter 溢出问题以及解决方法：

1.文本溢出
1.1 问题：当Text Widget中的文本太长，无法在其父 Widget 的边界内完整显示时，就会发生文本溢出。
1.2 解决方法
1.2.1 使用 TextOverflow 属性
--Text Widget 提供了 overflow 属性，可以控制文本溢出时的显示方式
--常用的值包括
TextOverflow.clip：截断超出部分
TextOverflow.fade：淡出超出部分。
TextOverflow.ellipsis：在末尾显示省略号。

1.2.2 使用 Expanded 组件
将 Text Widget 放置在 Expanded 组件中，使其占据剩余空间，并自动换行。

1.2.3 使用 SingleChildScrollView 组件
如果文本内容较长，可以使用 SingleChildScrollView 组件，使其可以滚动

2.布局溢出
2.1 问题：当 Row 或 Column 中的子 Widget 总宽度或总高度超出父 Widget 的边界时，就会发生布局溢出。
2.2 解决方法
2.2.1 使用 Expanded 或 Flexible 组件
将子 Widget 放置在 Expanded 或 Flexible 组件中，使其可以根据可用空间进行伸缩。
2.2.2 使用 SingleChildScrollView 组件：
如果内容过多，可以使用 SingleChildScrollView 组件，使其可以滚动。
2.2.3 使用 ListView 组件
如果内容是列表，可以使用 ListView 组件，它可以自动处理滚动
2.2.4 使用 OverflowBox 组件
OverflowBox组件可以让子组件溢出父组件的限制，并且不报错

3.图片溢出
3.1 问题：当Image Widget中的图片尺寸太大，无法在其父Widget的边界内完整显示时，就会发生图片溢出
3.2 解决方法
3.2.1 使用 FittedBox 组件：
将 Image Widget 放置在 FittedBox 组件中，使其可以根据父 Widget 的尺寸进行缩放。
3.2.2 使用 Image.fit 属性：
Image Widget 提供了 fit 属性，可以控制图片的缩放和裁剪方式

4.避免溢出的最佳实践
4.1 使用响应式布局：
使用 MediaQuery 获取屏幕尺寸，并根据屏幕尺寸动态调整布局。

4.2 使用灵活的布局组件：
使用 Expanded、Flexible 和 Wrap 等灵活的布局组件，使布局可以适应不同的屏幕尺寸。

4.3 使用滚动视图：
当内容可能超出屏幕范围时，使用 SingleChildScrollView、ListView 或 GridView 等滚动视图

4.4 合理设置 Widget 的尺寸：
避免为 Widget 设置过大的固定尺寸，尽量使用相对尺寸或自适应尺寸。

4.5 使用约束布局：
使用 ConstrainedBox 组件，为子组件设置尺寸限制
```

## 三 参考

1. [一文详解Flutter Widget和App的生命周期](https://www.jb51.net/program/2943396fy.htm)
2. [Flutter 三棵树](https://blog.csdn.net/sziitjin/article/details/134231544)
3. [详解Flutter中key的正确使用方式](https://www.jb51.net/article/273195.htm)
4. [Flutter 完整的生命周期](https://www.jianshu.com/p/6c214a054f90)
5. [深入了解Flutter中的Mixin](https://blog.csdn.net/qq_42698421/article/details/135698462)
6. [深入了解Flutter中的Sliver](https://blog.csdn.net/qq_42698421/article/details/135931334)
7. [Flutter从启动到显示](https://blog.csdn.net/rnZuoZuo/article/details/119358063)