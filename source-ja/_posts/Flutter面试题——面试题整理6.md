---
title: Flutter面试题——面试题整理6
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: 460184d5
date: 2024-03-25 11:43:56
---
## 一 面试题汇总

1. Flutter 与其它跨端框架的特点和优势
2. Flutter的架构层有哪些？
3. Flutter Cupertino 和 Material是什么？
4. Flutter支持哪些操作系统？
5. Flutter JIT 和 AOT 之间有什么区别？<!--more-->
6. Dart 语言 final 和 const 有什么不同？
7. Dart 中有哪些访问修饰符？
8. Dart 语言 命名参数、可选参数 是什么？
9. Dart 语言命名构造函数和工厂函数之间有什么区别？
10. 面向对象编程（OOP）的四个原则是什么？

## 二  面试题解答(仅供参考)

### 2.1  Flutter 与其它跨端框架的特点和优势

```
Flutter 是一种开源的跨平台开发框架，它允许开发者使用单一代码库构建 iOS、Android、Web、桌面等多平台应用。
与其它常见的跨平台框架（如 React Native、Xamarin、Cordova、Kotlin Multiplatform）相比，
Flutter 具有一些独特的特点和优势。
以下是 Flutter 与其它跨平台框架的特点和优势比较：

1. Flutter 的特点与优势
（1）性能
-高性能：
Flutter 使用 Dart 编程语言，并且直接编译为本地代码（Native code），因此具有更接近原生应用的性能表现。
相比 React Native 和其它基于 JavaScript 的框架，
Flutter 通过 Skia 图形引擎绘制 UI，避免了 JavaScript 与原生代码之间的通信延迟。

-GPU 加速：Flutter 使用 GPU 加速的渲染引擎，可以在各个平台上提供平滑的动画和高性能的用户界面

（2）单一代码库
跨平台开发：
Flutter 允许开发者使用一个代码库来构建 iOS、Android、Web、桌面等多平台应用。
相比 Xamarin 和 Kotlin Multiplatform，Flutter 的跨平台能力更加一致，不需要针对每个平台编写不同的代码。

3）一致的 UI
-自定义控件：
Flutter 提供了丰富的自定义控件，可以精确控制 UI 的布局和渲染。
这使得开发者能在不同平台上获得一致的用户界面和用户体验。

-无平台依赖的 UI 渲染：
Flutter 不依赖于原生控件，它通过自己的渲染引擎（Skia）来渲染 UI，
从而确保不同平台的外观一致，避免了平台间 UI 差异的问题。

4）快速开发（Hot Reload）
-快速调试和开发：
Flutter 提供了 Hot Reload 功能，允许开发者在不丢失应用状态的情况下即时查看 UI 更改。
这大大提高了开发效率，并减少了开发时间。

（5）丰富的生态和社区支持
-大量插件和包：
Flutter 拥有强大的社区支持和丰富的第三方插件生态，
开发者可以快速集成不同功能，如支付、地图、相机、文件系统等。
-活跃的社区：Flutter 的开发者社区不断扩展，许多开源项目和资源都可以找到，帮助开发者更快地解决问题。
```

### 2.2 Flutter的架构层有哪些？

1-图示
![][1]

2-框架说明

```
Flutter的架构层主要可以分为以下三层：

1.Framework（框架层）：
这一层完全使用Dart语言实现，提供了构建Flutter应用所需的各种工具和抽象。

它包括：
-Widgets（组件层）： 提供了丰富的、可组合的UI组件，用于构建应用程序的用户界面。
-Rendering（渲染层）： 负责将Widget树转换为可绘制的渲染对象树。
-Material/Cupertino（风格层）： 提供了遵循Material Design和iOS风格的UI组件。
-Widgets层，Rendering层，Material/Cupertino层，都是由Dart语言实现的。

2.Engine（引擎层）：
这一层是Flutter的核心，主要使用C++实现。
它包括：
-Skia： 一个2D图形渲染引擎，负责绘制UI。
-Dart Runtime（Dart运行时）： 负责执行Dart代码。
-Text Layout（文本布局）： 负责文本的排版和渲染。
引擎层是Flutter跨平台能力的核心。

3.Embedder（嵌入层）：
这一层是Flutter与底层操作系统的桥梁。
它负责：
-将Flutter引擎嵌入到特定的操作系统中（例如，Android或iOS）。
-提供访问底层操作系统功能（例如，输入、事件循环）的接口。
根据不同的平台，有不同的嵌入层实现。


4.简单来说：
-Framework层用Dart写好各种组件，方便开发者调用，快速的开发UI。
-Engine层用C++写好渲染，运行Dart代码等核心功能，保证了Flutter的高性能。
-Embedder层，让Flutter可以运行在不同的操作系统上。
```


### 2.3  Flutter Cupertino 和 Material是什么？

```
Flutter Cupertino 和 Material 是 Flutter 框架中用于构建 UI 的两种设计风格，
它们分别对应于 iOS 和 Android 的视觉和交互设计规范。

1. Material Design（Material）
1.1 Material Design 是 Google 提出的视觉设计语言，广泛应用于 Android 和 Web 应用中。
Flutter 提供了 Material Widgets 来帮助开发者构建符合 Material Design 规范的 UI。

1.2特点：
-强调扁平化设计、简洁的图标和动画效果。
-提供丰富的交互元素，如 浮动操作按钮（FAB）、卡片、抽屉菜单等。
-支持 Ripple Effect（点击反馈效果）和 Snackbars（临时提示消息）等。

1.3常见控件：
-MaterialApp: 创建 Material 风格的应用程序。
-Scaffold: 提供页面的结构框架（如 AppBar、Drawer 等）。
-FloatingActionButton: 浮动按钮。
-RaisedButton/FlatButton/OutlinedButton: Material 风格的按钮。

1.4平台：主要应用于 Android 和 Web 平台，但也可以在 iOS 平台使用。

2. Cupertino
2.1 Cupertino 是 Apple 推出的 iOS 设计规范，专门用于创建符合 iOS 视觉风格和交互习惯的 UI。
Flutter 提供了 Cupertino Widgets 来帮助开发者构建 iOS 风格的 UI。

2.2 特点：
-注重细节和柔和的阴影，符合 iOS 的精致设计语言。
-提供类似 iOS 上的控件和布局，如 CupertinoNavigationBar（导航栏）、CupertinoButton（按钮）等。
-强调流畅的动画效果和滑动手势。

2.3常见控件：
-CupertinoApp: 创建 Cupertino 风格的应用程序。
-CupertinoNavigationBar: iOS 风格的导航栏。
-CupertinoButton: iOS 风格的按钮。
-CupertinoTabBar: iOS 风格的标签栏。

2.4 平台：主要用于 iOS 平台，但也可以在 Android 上使用（不过会偏向 Material 风格）。


3.总结：
-Material Design 是针对 Android 及 Web 的设计语言，具有鲜明的现代感和互动感。
-Cupertino 是针对 iOS 的设计语言，界面风格和交互方式与 Apple 的设计哲学一致。

在 Flutter 中，开发者可以根据目标平台选择使用 Material 或 Cupertino，或者根据需要在应用中混合使用两者。
例如，MaterialApp 和 CupertinoApp 可以同时存在于同一个应用中。
```

### 2.4 Flutter支持哪些操作系统？

```
Flutter是一个多功能的框架，支持在多种平台上部署：

1-Mobile 移动平台（Android，iOS）
2-Desktop 桌面平台（Linux，MacOS，Windows）
3-Web 网络浏览器（Chrome，Firefox，Safari和Edge）
```

### 2.5 Flutter JIT 和 AOT 之间有什么区别？

```
在 Flutter 中，JIT（Just-In-Time，即时编译）和 AOT（Ahead-Of-Time，提前编译）
是两种不同的 Dart 代码编译方式，它们在开发和生产环境中扮演着不同的角色。

1.JIT（即时编译）
1.1工作原理：
-JIT 编译在应用程序运行时进行，它将 Dart 代码动态地编译为机器码。
-这意味着，代码在需要执行时才进行编译。

1.2应用场景：
-主要用于开发阶段。
-Flutter 的热重载（Hot Reload）功能就是基于 JIT 编译实现的，
它允许开发者在修改代码后快速查看效果，而无需重新编译整个应用程序。

1.3 优点：
-快速的开发迭代速度。
-便于调试。

1.4缺点：
-运行时性能可能略低于 AOT 编译。
-启动速度较慢

2.AOT（提前编译）

2.1工作原理：
-AOT 编译在应用程序构建时进行，它将 Dart 代码提前编译为机器码。
-这意味着，应用程序在运行时可以直接执行机器码，无需进行额外的编译。

2.2 应用场景：
-主要用于生产环境。
-当 Flutter 应用程序发布到应用商店时，它会使用 AOT 编译。

2.3优点：
-更高的运行时性能。
-更快的启动速度。

2.4缺点：
-编译时间较长。
-不支持热重载。

3.总结：
-JIT 编译用于开发阶段，以提高开发效率。
-AOT 编译用于生产环境，以提高应用程序的性能。
-Flutter 使用 JIT 和 AOT 是为了在开发效率和生产性能之间取得平衡
```

### 2.6 Dart 语言 final 和 const 有什么不同？

```
在 Dart 语言中，final 和 const 都用于声明常量，但它们之间存在一些关键区别：

1.final
1.1运行时常量：
-final 变量的值可以在运行时确定，但一旦赋值后就不能更改。
-这意味着，你可以在程序运行时初始化 final 变量，例如，从用户输入或文件读取数据。

1.2示例：
final String userName = getUserInput(); // getUserInput() 在运行时返回用户输入

2.const

2.1编译时常量：
-const 变量的值必须在编译时确定，并且永远不会改变。
-这意味着，你只能使用常量值初始化 const 变量，例如，字面量、算术表达式或对其他 const 变量的引用。

2.2 示例
const double pi = 3.14159;
const String appName = 'My App';

3.主要区别总结
3.1赋值时间：
-final 变量在运行时赋值。
-const 变量在编译时赋值。

3.2可变性：
-final 变量一旦赋值后不能更改。
-const 变量是完全不可变的。

3.3 用途：
-final 适用于需要在运行时确定值，但之后保持不变的情况。
-const 适用于需要在编译时确定值，并且永远不会改变的情况。
```

### 2.7 Dart 中有哪些访问修饰符？

```
在 Dart 中，访问修饰符用于控制类成员（变量、方法等）的可访问性。
Dart 的访问修饰符与其他一些编程语言（如 Java 或 C++）有所不同。

Dart 的访问修饰符：

1.public（公开）：
-在 Dart 中，默认情况下，所有类成员都是公开的。
-这意味着，任何地方都可以访问公开的成员。
-Dart 中没有显式的 public 关键字。

2.private（私有）：
-要将类成员声明为私有，只需在成员名称前添加下划线 _。
-私有成员只能在声明它们的库（Dart 文件）中访问。
-这提供了一种封装机制，可以隐藏类的实现细节。

3.简单来说:
-在 Dart 中，默认情况下，所有东西都是公开的。
-使用下划线 _ 来使成员变成私有的
```

### 2.8 Dart 语言 命名参数、可选参数 是什么？

```
在 Dart 语言中，命名参数和可选参数是两种强大的特性，它们提供了更灵活的函数调用方式。

1.命名参数

1.1 定义：
-命名参数允许你在调用函数时，通过参数的名称来传递值，而不是通过参数的位置。
-这使得函数调用更具可读性和易于理解。
-在定义函数时，使用花括号 {} 将命名参数括起来。

1.2使用：
调用函数时，使用 参数名: 值 的形式传递命名参数。

1.3 示例
void printPerson({String name, int age}) {
  print('Name: $name, Age: $age');
}

void main() {
  printPerson(name: 'Alice', age: 30);
  printPerson(age: 25, name: 'Bob'); // 参数顺序可以不同
}

2.可选参数

2.1 定义：
-可选参数允许你在调用函数时，省略某些参数的传递。
-Dart 支持两种类型的可选参数：
  -可选位置参数： 使用方括号 [] 将可选位置参数括起来。
  -可选命名参数： 使用花括号 {} 将可选命名参数括起来（与上面的命名参数相同）。

2.2 使用：
-对于可选位置参数，如果省略了某个参数，则该参数的值为 null。
-对于可选命名参数，如果省略了某个参数，则该参数的值也为 null，或者使用在定义函数时设置的默认值。

2.3 示例
void printPoint(int x, [int y, int z = 0]) {
  print('x: $x, y: $y, z: $z');
}

void main() {
  printPoint(10); // y 为 null，z 使用默认值 0
  printPoint(10, 20); // z 使用默认值 0
  printPoint(10, 20, 30);
}

3.总结：
-命名参数，可以让函数调用时，通过名称赋值，让代码可读性更高。
-可选参数，让函数调用时，可以省略某些参数。
```

### 2.9 Dart 语言命名构造函数和工厂函数之间有什么区别？

```
在 Dart 语言中，命名构造函数和工厂构造函数都是用于创建对象的方式，但它们之间存在一些关键区别

1.命名构造函数（Named Constructors）

1.1 定义：
-命名构造函数允许你为一个类定义多个构造函数，每个构造函数都有一个不同的名称。
-这使得你可以根据不同的参数或初始化方式创建对象。

1.2特点：
-命名构造函数仍然是构造函数，它会创建一个新的对象实例。
-它们主要用于提供不同的初始化方式。
-命名构造函数可以像普通构造函数一样，初始化类的实例变量。

1.3 示例
class Point {
  double x, y;
  Point(this.x, this.y); // 普通构造函数
  Point.origin() { // 命名构造函数
    x = 0;
    y = 0;
  }
}

2.工厂构造函数（Factory Constructors）

2.1定义：
-工厂构造函数是一种特殊的构造函数，它可以返回一个新的对象实例，也可以返回一个已存在的对象实例。
-这使得你可以实现单例模式、缓存对象等功能。

2.2特点：
-工厂构造函数不一定会创建新的对象实例。
-它们可以返回任何类型的对象，包括类的子类或已缓存的对象。
-工厂构造函数不能直接初始化类的实例变量，但可以通过返回的对象进行初始化。

2.3 示例
class Logger {
  static Logger _cache;
  factory Logger() {
    if (_cache == null) {
      _cache = Logger._internal();
    }
    return _cache;
  }
  Logger._internal(); // 私有构造函数
}

3.主要区别总结：

3.1创建对象的方式：
-命名构造函数总是创建一个新的对象实例。
-工厂构造函数可以选择创建新的对象实例，也可以返回已存在的对象实例。

3.2 初始化实例变量：
-命名构造函数可以直接初始化类的实例变量。
-工厂构造函数不能直接初始化类的实例变量。

3.3应用场景：
-命名构造函数适用于提供不同的初始化方式。
-工厂构造函数适用于实现单例模式、缓存对象等功能。
```

### 2.10 面向对象编程（OOP）的四个原则是什么？

```
面向对象编程（OOP）的四个基本原则是：

1.封装（Encapsulation）：
-封装是将数据（属性）和操作数据的方法（函数）捆绑在一起，形成一个独立的单元（对象）。
-它隐藏了对象的内部实现细节，只暴露必要的接口给外部使用。
-封装提高了代码的模块化、可维护性和安全性。

2.继承（Inheritance）：
-继承允许一个类（子类）继承另一个类（父类）的属性和方法。
-子类可以重用父类的代码，并可以添加或修改自己的特性。
-继承建立了类之间的层次关系，提高了代码的重用性和扩展性。

3.多态（Polymorphism）：
-多态允许使用相同的接口来表示不同的对象，并根据对象的实际类型执行不同的操作。
-它提供了代码的灵活性和可扩展性，使得代码可以适应不同的对象类型。
-多态主要通过方法重写（Override）和方法重载（Overload）来实现。

4.抽象（Abstraction）：
-抽象是忽略或隐藏对象的某些细节，只关注其本质特征。
-它提供了一种简化复杂系统的方法，通过定义抽象类或接口来表示对象的通用行为。
-抽象有助于提高代码的可读性和可维护性。
```
## 三 参考

* [狗哥课堂—Flutter 面试题整理 01](https://ducafecat.com/blog/flutter-interview-questions-with-answers-01)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-interview-6-framework.png