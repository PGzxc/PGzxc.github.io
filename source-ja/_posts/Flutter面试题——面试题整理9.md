---
title: Flutter面试题——面试题整理9
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: d6be9944
date: 2024-03-25 18:40:21
---
## 一 面试题汇总

1. Widget在一些窄屏设备上，文本溢出了，你会如何修复呐？
2. Row显示宽度太窄无法容纳它们时，子节点自动换行到下一行展示如何操作
3. 如何将cheese变成私有变量，怎样将它变成全局变量，什么时候你使用全局变量？
4. hot reload和hot restart的区别是什么？
5. StatelessWidget和StatefulWidget的区别是什么？<!--more-->
6. WidgetsApp和MaterialApp的区别什么?
7. 可以嵌套使用Scaffold吗，为什么或者为什么不？
8. 什么时候适合使用packages、plugins或者三方库？
9. 怎么减少Widget的重新构建？
10. 什么是BuildContext，它有什么用？
11. 在Flutter应用程序中，你怎么和native进行交互？
12. 你可以做哪种类型的测试？
13. 不同状态管理框架的优缺点是什么？

## 二  面试题解答(仅供参考)

### 2.1 Widget在一些窄屏设备上，文本溢出了，你会如何修复呐？

```
在 Flutter 中，当 Widget 在窄屏设备上出现文本溢出问题时，可以采取以下几种方法来修复

1. 使用 TextOverflow 属性
-Text 组件提供了 overflow 属性，可以控制文本溢出时的显示方式。
-常用的值包括
TextOverflow.clip：截断超出部分。
TextOverflow.fade：淡出超出部分。
TextOverflow.ellipsis：在末尾显示省略号。

2.使用 Expanded 或 Flexible 组件
-将 Text 组件放置在 Expanded 或 Flexible 组件中，使其可以根据可用空间进行伸缩。
-这可以确保文本在可用空间内显示，并自动换行。

3.使用 SingleChildScrollView 组件
-如果文本内容较长，可以使用 SingleChildScrollView 组件，使其可以滚动。
-这允许用户滚动查看所有文本内容

4.使用 Wrap 组件
-如果文本内容需要换行显示，可以使用 Wrap 组件。
-Wrap 组件会自动将超出水平空间的文本换行显示

5.使用 MediaQuery 获取屏幕宽度
-使用 MediaQuery.of(context).size.width 获取屏幕宽度。
-根据屏幕宽度动态调整文本的样式，例如字体大小或最大行数。

6.使用 FractionallySizedBox 组件
-使用 FractionallySizedBox 组件，设置文本 Widget 的宽度为屏幕宽度的百分比。
-这可以确保文本 Widget 的宽度适应不同屏幕尺寸。

7.使用 AutoSizeText 组件
使用 auto_size_text 插件，它可以自动调整文本的字体大小，以适应可用空间

8.避免使用固定宽度
尽量避免为文本 Widget 设置固定宽度，而是使用相对宽度或自适应宽度。

9.使用约束布局
使用 ConstrainedBox 组件，为文本 Widget 设置尺寸限制。
```

### 2.2 Row显示宽度太窄无法容纳它们时，子节点自动换行到下一行展示如何操作

```
只需要将Row替换为Wrap就可以了。
```


### 2.3  如何将cheese变成私有变量，怎样将它变成全局变量，什么时候你使用全局变量？

```
给定下面类
class Pizza {
  String cheese = 'cheddar';
}

1-在变量的前面添加下划线_，可以使它在库中私有化
class Pizza {
  String _cheese = 'cheddar';
}

2-想要一个全局变量，只需要将变量移到类的外面就可以了。
String cheese = 'cheddar';
```

### 2.4 hot reload和hot restart的区别是什么？

```
在 Flutter 中，Hot Reload 和 Hot Restart 都是用来加速开发的工具，但它们的作用和机制不同：

1. Hot Reload（热重载）
-作用： 更新 UI 界面，保留当前状态。
-机制： 只重新加载修改的代码片段，更新 Widget 树，不重建整个应用。
-使用场景： 调整 UI、修复逻辑、微调布局等。
-优点： 快速预览效果，保持页面状态。
-限制： 无法更新 main() 方法、initState()、全局变量等。

2. Hot Restart（热重启）
-作用： 重启整个应用，状态会被重置。
-机制： 重建整个 Widget 树，重新执行 main() 方法，清空内存和状态。
-使用场景： 需要全局重置、修改初始化逻辑、调整全局变量时。
-优点： 确保应用从零开始运行，避免缓存影响。
-缺点： 相比 Hot Reload 较慢，页面状态会丢失。

3.总结：
-Hot Reload：快、保状态，适合调 UI 和逻辑。
-Hot Restart：慢、重置状态，适合改全局配置和初始化逻辑。

开发时优先用 Hot Reload，必要时用 Hot Restart
```

### 2.5 StatelessWidget和StatefulWidget的区别是什么？

```
在 Flutter 中，StatelessWidget和StatefulWidget是两种常见的Widget类型，它们的核心区别在于是否需要维护状态：

1.StatelessWidget（无状态组件）
-特点：不可变，状态固定，一旦创建后就不会改变。
-用途：展示静态 UI，比如文本、图标、按钮等。
-什么时候用：UI 内容固定，或者依赖外部传入的数据而不会自行变化时。

2.StatefulWidget（有状态组件）
-特点：可变，包含一个 State 对象来保存状态，状态改变时可以重建 UI。
-用途：需要动态交互的 UI，比如表单、动画、倒计时等。
-什么时候用：UI 需要根据用户操作、网络请求等动态更新时。

3.总结：
-StatelessWidget：静态、无状态，UI 不会随事件变化而更新。
-StatefulWidget：动态、有状态，通过 setState() 触发 UI 重建。

如果页面不需要更新，用 StatelessWidget 更轻量；若需要交互或动态更新，用 StatefulWidget！
```

### 2.6 WidgetsApp和MaterialApp的区别什么?

```
在 Flutter 中，WidgetsApp 和 MaterialApp 都是应用的根 Widget，它们的核心区别在于提供的功能和设计风格：

1.WidgetsApp
-特点：提供最基本的应用结构，是更底层的组件。
-用途：适合自定义 UI，或者不需要 Material Design 风格的场景。
-功能：路由管理、导航、应用生命周期监听、绑定 onGenerateRoute 等。
-适用场景：构建极简应用、自定义设计系统、游戏开发等。
-示例
WidgetsApp(
  color: Colors.blue,
  builder: (context, _) => Text('Hello WidgetsApp'),
)


2.MaterialApp
-特点：继承自 WidgetsApp，提供了 Material Design 风格的 UI 组件和行为。
-用途：快速构建符合 Material Design 规范的应用。
-功能：包含 WidgetsApp 的所有功能，额外提供主题、
Scaffold、AppBar、Snackbar、FloatingActionButton 等 Material 组件。
-适用场景：一般的移动端应用开发，符合 Google 的 Material Design 规范
-示例
MaterialApp(
  theme: ThemeData(primarySwatch: Colors.blue),
  home: Scaffold(
    appBar: AppBar(title: Text('Hello MaterialApp')),
    body: Center(child: Text('Hello')),
  ),
)

3.总结：
-WidgetsApp：底层、轻量，适合自定义 UI。
-MaterialApp：封装了 Material Design 风格，开发更方便。
-开发时：一般直接用 MaterialApp，除非有特殊设计需求！
```

### 2.7 可以嵌套使用Scaffold吗，为什么或者为什么不？

```
在 Flutter 中，不建议嵌套使用 Scaffold，因为它可能导致一些 UI 行为异常，主要原因如下：

1.Scaffold 的作用：
-Scaffold 是页面的结构基础，提供 AppBar、Body、FloatingActionButton、Drawer 等布局组件。
-每个页面通常只需要一个 Scaffold 作为根部结构，嵌套多个 Scaffold 会导致布局混乱。

2.嵌套问题：
-AppBar 重叠：多个 AppBar 会层层堆叠，影响导航和返回按钮的行为。
-SnackBar、Drawer 无效：Scaffold.of(context) 查找最近的 Scaffold，
嵌套时会找错目标，导致 SnackBar、Drawer 等功能失效。
-页面结构混乱：内层 Scaffold 的 Body、FloatingActionButton 等不会与外层协作，容易破坏页面逻辑

3.替代方案：
如果需要类似 Scaffold 的布局结构，可以用NestedScrollView、Column 或 CustomScrollView代替，
确保页面只有一个 Scaffold

4.总结：
-不要嵌套 Scaffold，会导致 AppBar、SnackBar、Drawer 等行为异常。
-正确做法：用 Column、Container、NestedScrollView 等替代，保持页面只有一个 Scaffold！
```

### 2.8 什么时候适合使用packages、plugins或者三方库？

```
在 Flutter 开发中，Packages、Plugins、第三方库能帮助提升开发效率，具体使用场景如下：

1.Packages（纯 Dart 包）
-适用场景：需要纯 Dart 逻辑、跨平台的工具或功能时使用。
-特点：不依赖原生平台代码，完全用 Dart 编写，跨平台通用。
-示例：数据处理（intl 格式化日期）、状态管理（provider）、网络请求（http）等。
示例用法：import 'package:http/http.dart' as http;

2. Plugins（插件）
-适用场景：需要调用原生平台功能（如摄像头、蓝牙、传感器）时使用。
-特点：
包含原生平台代码（Android 的 Kotlin/Java、iOS 的 Swift/Objective-C），
通过平台通道与 Dart 代码通信。
-示例：访问硬件设备（camera）、定位（geolocator）、权限管理（permission_handler）等。
-示例用法：import 'package:geolocator/geolocator.dart';

3.第三方库
-适用场景：遇到通用功能已有成熟方案时，避免重复造轮子。
-选择标准：看 GitHub Star 数、维护频率、问题反馈等指标，选靠谱的库。
-常用库：
--UI 库：flutter_svg、lottie
--状态管理：provider、bloc
--网络请求：dio
--本地存储：shared_preferences、hive

4.总结：
-Packages：纯 Dart 逻辑、跨平台功能。
-Plugins：需要调用原生平台功能。
-第三方库：已有成熟方案时直接用，省时省
```

### 2.9 怎么减少Widget的重新构建？

```
在 Flutter 中，减少 Widget 的重新构建是提升应用性能的一个关键因素。
频繁的 Widget 重新构建会导致性能下降，特别是在复杂的 UI 或嵌套较深的场景下。
下面是一些减少 Widget 重新构建的策略：

1. 使用 const 构造函数
-适用场景：当 Widget 的内容不依赖于状态变化时，使用 const 修饰符。
-效果：使用 const 构造函数的 Widget 只会创建一次，之后不会被重新构建。
-示例：const Text('Hello, World!');

2.使用 Key 控制 Widget 更新
-适用场景：
在列表或动态变化的界面中，使用 Key 来标识每个 Widget 的唯一性，帮助 Flutter 高效更新 Widget 树。
-效果：通过 Key，Flutter 可以更精确地识别需要更新的部分，避免重新构建整个组件。
-示例
ListView(
  children: [
    Container(key: ValueKey('item1')),
    Container(key: ValueKey('item2')),
  ],
)

3.使用 shouldRebuild 来优化 CustomPainter 和 ListView
-适用场景：对于自定义绘制的 Widget（如 CustomPainter）或者ListView、GridView等滚动组件。
-效果：通过 shouldRebuild 方法来判断是否需要重新绘制 Widget。
-示例
class MyCustomPainter extends CustomPainter {
  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false; // 如果不需要重绘，返回 false
  }
}

4.使用 setState 仅更新需要更新的部分
-适用场景：只更新 UI 的小部分时，尽量将 setState 作用范围限定在变化的部分。
-效果：避免 setState 触发整个页面或大范围 Widget 的重建。
-示例
setState(() {
  // 只更新必要的状态
  _counter++;
});

5. 使用 Provider 或 InheritedWidget 提供高效的状态管理
-适用场景：使用状态管理工具（如 Provider）将数据放在全局状态中，只在需要的地方更新 Widget。
-效果：避免过度依赖 setState，减少不必要的 Widget 更新。
-示例
Provider(
  create: (_) => MyModel(),
  child: MyWidget(),
)

6.使用 ListView.builder 或 GridView.builder
-适用场景：列表中有大量数据时，使用 ListView.builder 或 GridView.builder 来按需构建列表项。
-效果：仅渲染当前可见的列表项，减少不必要的构建。
-示例
ListView.builder(
  itemCount: 100,
  itemBuilder: (context, index) {
    return ListTile(title: Text('Item $index'));
  },
)

7.使用 RepaintBoundary 分离重绘区域
-适用场景：需要高效渲染复杂界面时，使用 RepaintBoundary 来分离需要重绘的区域。
-效果：减少不必要的部分重绘，提升性能。
-示例
RepaintBoundary(
  child: YourWidget(),
)

8.总结：
-const 构造函数：避免 Widget 的重复构建。
-使用 Key：精确控制 Widget 更新。
-避免大范围 setState：只更新需要的部分。
-状态管理：通过高效的状态管理工具减少不必要的构建。
-按需构建：使用 ListView.builder 等按需加载。
```

### 2.10 什么是BuildContext，它有什么用？

```
在 Flutter 中，BuildContext 是一个非常重要的概念，
它代表了 Widget 树中的位置和上下文，并且提供了对当前 Widget 的父级、祖先 Widget 的访问权限。
它是许多 Flutter API 中的一个参数。

1. BuildContext 的作用：
-代表位置和上下文：BuildContext 是Widget在Widget树中的位置，能够让我们访问该位置的父级 Widget。
-提供对祖先 Widget 的访问：通过 BuildContext，可以获取到父级或祖先 Widget 的状态、主题、路由等信息。
-导航和主题获取：常用来访问 Navigator、Theme 或 InheritedWidget 等全局状态或数据。

2. 常见用途：
2.1 访问父级或祖先 Widget： 
通过BuildContext，你可以使用context.dependOnInheritedWidgetOfExactType<T>() 
等方法访问祖先 Widget，常见于访问主题、路由等全局数据。
ThemeData theme = Theme.of(context);

2.2 导航（Navigation）：
BuildContext 是进行页面导航的核心，通常使用 Navigator 来控制页面跳转。
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => NextPage()),
);

2.3 获取Scaffold或其他Widget的状态：使用Scaffold.of(context) 获取当前Scaffold的状态
Scaffold.of(context).openDrawer();

2.4 触发showDialog等操作：BuildContext也是弹出对话框、SnackBar等UI组件时需要的上下文。
showDialog(
  context: context,
  builder: (BuildContext context) {
    return AlertDialog(
      title: Text('Alert'),
      content: Text('This is a dialog'),
    );
  },
);

3.总结：
-BuildContext是Widget树中每个Widget的位置和上下文，帮助我们访问当前Widget的父级、祖先以及全局数据。
-主要用于 访问主题、导航、父级 Widget 状态，以及 显示对话框、SnackBar 等操作。
-使用场景：在需要访问祖先 Widget 或进行 UI 操作时，BuildContext 是必不可少的。
```
### 2.11 在Flutter应用程序中，你怎么和native进行交互？

```
通常你不需要和原生进行交互，因为Flutter或三方插件会处理这些问题，
但是，如果你发现确实有特殊需要访问一些底层平台，你可以使用平台channel。

其中一种类型是method channel，数据在Dart侧进行序列化，然后会将数据发送到原生侧，
你可以在原生侧编写代码响应交互，然后回传序列化后的数据。
在Android侧可以选用Kotlin或者Java，在iOS侧可以使用Objective-C或者Swift进行编写。

但是，在开发web的时候，你不需要使用channel，这时非必要的步骤。

第二种channel类型是event channel，你可以用来从native发送stream数据到flutter侧，
这对监控传感器数据的场景很有用。

可以在Flutter的文档platform channels中看到更详细的介绍
```

### 2.12 你可以做哪种类型的测试？

```
在 Flutter 中，测试是确保应用质量和稳定性的重要手段。
Flutter 提供了多种类型的测试，包括单元测试、集成测试和 UI 测试。
下面是常见的几种测试类型：

1.单元测试（Unit Test）
-目的：测试单个函数、方法或类的行为，确保它们按预期工作。通常是针对业务逻辑的测试。
-特点：单元测试不依赖于外部资源（如网络、数据库），通常运行快速。
-工具：Flutter 提供了 test 包用于编写单元测试

2.Widget 测试（Widget Test）
-目的：测试 Flutter Widget 的行为，确保它们在不同状态下正确渲染和响应用户操作。
可以模拟 UI 交互（例如点击按钮、输入文本）并验证结果。
-特点：Widget 测试主要关注 UI 层，通常运行比单元测试慢一些，但可以测试交互逻辑。
-工具：使用 flutter_test 包进行 Widget 测试。

3.集成测试（Integration Test）
-目的：测试整个应用或部分应用的集成行为，模拟用户操作并测试多组件交互。
这种测试通常是端到端的测试，用来验证应用的整体功能。
-特点：集成测试通常运行较慢，因为它涉及整个应用或较大部分的交互，常用于验证 UI 流程和用户交互。
-工具：使用 integration_test 包进行集成测试

4.总结：
-单元测试：验证单个函数、方法或类的行为。
-Widget 测试：验证 Flutter UI 组件的正确渲染和交互。
-集成测试：验证整个应用或多个组件的协作与交互，通常为端到端测试
```

### 2.13 不同状态管理框架的优缺点是什么？

在 Flutter 中，有多种 **状态管理框架**，每种框架有不同的设计理念和使用场景。

下面是一些常见的状态管理框架的 优缺点：
 **1-setState（内置的状态管理）**

```
setState 是 Flutter 提供的最基本的状态管理方法，适用于简单的应用或局部更新。

优点：
-简单易用：使用内置的 setState，无需引入外部库，适合小型应用或简单场景。
-不依赖外部库：Flutter 自带，无需安装和配置。
-直接反映 UI 更新：每次调用 setState，Flutter 会自动重新构建 UI。

缺点：
-无法跨 Widget 树共享状态：只能在当前 Widget 内部更新状态，无法在多个 Widget 之间共享。
-状态管理混乱：在复杂应用中，多个 setState 会导致代码难以维护，状态逻辑可能分散在多个地方。
-性能问题：每次调用 setState 都会导致整个 Widget 的重建，可能引起性能下降。
```

**2-Provider**

```
Provider 是 Flutter 中非常流行的状态管理库，基于 InheritedWidget 实现，适用于中到大型应用。

优点：
-高效的状态共享：可以方便地在 Widget 树的多个层级之间共享状态。
-易于维护和扩展：状态逻辑与 UI 解耦，使得应用更易于管理和扩展。
-性能优化：只有依赖于状态的 Widget 会重新构建，避免了不必要的重建。
-社区支持：活跃的社区，丰富的文档和资源。

缺点：
-学习曲线：对于初学者来说，理解 Provider 和 ChangeNotifier 的概念可能需要一些时间。
-多层嵌套：在较复杂的场景下，可能会导致 Widget 树的嵌套层数增多，影响可读性。
```

**3-Riverpod**

```
Riverpod 是由 Provider 的作者创建的状态管理库，
它提供了更强大的功能和更好的可组合性，旨在解决 Provider 的一些限制。

优点：
-完全解耦：Riverpod 不依赖于 Widget 树，状态管理与 UI 逻辑完全分离。
-更强的类型安全：Riverpod 提供了更强的类型检查，减少了错误的发生。
-优化性能：比 Provider 更加高效，避免了不必要的重建。
-更灵活的组合：支持在多个作用域和不同组件中管理状态。

缺点：
-相对复杂：对于初学者来说，Riverpod 的学习曲线较陡，需要了解更多的概念和 API。
-不常用的功能过于复杂：一些高级特性（例如 ScopedReader）可能对于小型应用来说过于复杂。
```

 **4-BLoC（Business Logic Component）**

```
BLoC 是一种基于流（Streams）和响应式编程（Reactive Programming）的状态管理方法，
适用于大型应用，特别是需要复杂业务逻辑的场景。

优点：
-解耦 UI 和业务逻辑：BLoC 强调 UI 层与业务逻辑层的分离，便于测试和维护。
-可扩展性强：适用于复杂和中大型应用，特别是在需要复杂业务逻辑时。
-流的管理：通过 Streams 管理应用状态，具有强大的异步处理能力。

缺点：
-学习曲线陡峭：对于初学者来说，理解 Stream、Sink、StreamController 等概念需要一定时间。
-代码量较大：BLoC 需要编写大量的样板代码，可能导致开发效率降低。
-不适合小型应用：对于简单应用来说，BLoC 可能显得过于复杂和笨重。
```

5-Redux

```
Redux 是一种基于单一状态树的状态管理库，灵感来自 JavaScript 的 Redux。适用于需要全局状态管理的应用。

优点：
-全局状态管理：Redux 的状态是全局的，适用于大型应用中的复杂状态管理。
-一致性：通过 Actions 和 Reducers 管理状态变化，确保状态管理的一致性。
-易于调试：由于所有状态变化都在 Store 中有记录，易于追踪和调试。

缺点：
-学习曲线陡峭：Redux 的概念较复杂，尤其是对于新手来说，理解 Store、Action、Reducer 等概念需要时间。
-代码样板多：需要大量的样板代码，如创建 Actions、Reducers 等，开发效率较低。
-性能问题：虽然通过中间件可以优化性能，但复杂的状态更新仍可能影响性能。
```

**6-GetX**

```
GetX 是一个轻量级的状态管理框架，提供了高效、简洁的状态管理、路由和依赖注入。

优点：
-轻量高效：GetX 提供非常简单的 API，易于上手，且性能优秀。
-一体化功能：不仅提供状态管理，还包括路由和依赖注入，适用于小到中型应用。
-极简代码：通过简洁的语法减少样板代码，开发效率高。

缺点：
-不适合大型应用：GetX 的简洁性可能导致应用变得难以扩展，特别是在涉及复杂业务逻辑时。
-社区资源有限：相比其他框架，GetX 的社区支持和文档较少。
```

**7-表格**

|   框架   |               优点               |               缺点               |
| :------: | :------------------------------: | :------------------------------: |
| setState |        简单易用、内置支持        |   难以跨 Widget 树共享、性能差   |
| Provider | 高效的状态共享、易维护、社区支持 | 高效的状态共享、易维护、社区支持 |
| Riverpod |             Riverpod             |    相对复杂、高级特性过于复杂    |
|   BLoC   | 解耦 UI 和业务逻辑、适合大型应用 |      学习曲线陡峭、代码量大      |
|  Redux   |     全局状态、一致性、易调试     |  学习曲线、代码样板多、性能问题  |
|   GetX   |    轻量高效、一体化功能、易用    |    不适合大型应用、社区支持少    |

**8-如何选择**

```
选择合适的状态管理框架要根据应用的规模、复杂度以及开发团队的熟悉程度来决定。
对于简单应用，setState 或 GetX 可能足够；
而对于大型应用，Provider、BLoC 或 Redux 会更合适。
```

## 三 参考


* [简书—Flutter面试题带答案](https://www.jianshu.com/p/de8fbb09dfb4)


