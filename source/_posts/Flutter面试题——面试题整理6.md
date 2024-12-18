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

1. Flutter 与其它夸端框架的特点和优势
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

### 2.1  Flutter 与其它夸端框架的特点和优势

```
1-快速开发：Flutter 提供了热重载（Hot Reload）功能，可以实时预览应用程序的更改，
从而加快开发速度。开发人员可以迅速进行迭代和调试，无需等待重新编译。

2-单一代码库：使用 Flutter，你只需要编写一套代码，即可同时构建 iOS 和 Android 平台的应用程序。
这样可以节省开发时间和人力成本，并且简化了维护和更新的过程。

3-漂亮的用户界面：Flutter 提供了丰富的 UI 组件和内置的材料设计（Material Design）
和苹果风格（Cupertino）的样式，使开发者能够轻松创建漂亮和响应式的用户界面。

4-高性能：Flutter 使用自己的渲染引擎，称为 Skia，可以直接绘制应用程序的 UI。
这意味着应用程序的性能更高，响应更快，并且可以保持平滑的动画和过渡效果。

5-深度定制：Flutter 允许开发者对每个平台进行深度定制。
你可以直接访问平台特定的 API，以满足应用程序的特定需求，并提供与原生应用程序相似的用户体验。

6-强大的开发工具和社区支持：Flutter 提供了丰富的开发工具和插件，
如 Flutter DevTools 和 Flutter Inspector，帮助开发者进行调试和性能优化。
此外，Flutter 拥有庞大的开发者社区，提供了大量的资源、教程和第三方库，可以加速开发过程。

7-广泛的应用领域：Flutter 不仅限于移动应用开发，
还可以用于构建桌面应用程序和嵌入式设备应用程序。
这使得 Flutter 在多个领域具有广泛的适用性和可扩展性。
```

### 2.2 Flutter的架构层有哪些？

1-框架层
![][1]

2-框架说明

```
1-Embedder 嵌入器：作为基础层，它提供了平台特定的集成，使得Flutter能够在不同的系统上运行。
2-Engine 引擎：使用C++编写，该层管理核心任务，如图形渲染、文本布局和文件/网络操作。
3-Framework 框架：位于引擎之上，为应用程序开发提供高级类。
这包括小部件层，提供了大量的视觉、结构、平台和交互式小部件，
渲染层将小部件绘制到画布上，以及提供服务和实用工具的其他几个层。
```


### 2.3  Flutter Cupertino 和 Material是什么？

```
Flutter Cupertino 和 Material 是 Flutter 框架中的两个设计语言和视觉风格。

1-Cupertino：Cupertino 是苹果公司的设计语言，用于构建 iOS 风格的用户界面。
Flutter 提供了一套名为 "cupertino" 的包，其中包含了苹果风格的 UI 组件、图标和样式。
使用 Cupertino，你可以创建具有 iOS 视觉效果和交互行为的应用程序，
例如 iOS 设备上常见的滚动效果、导航栏样式和操作表。

2-Material：Material 是 Google 的设计语言，用于构建现代、响应式和有吸引力的用户界面。
Flutter 提供了名为 "material" 的包，
其中包含了 Material Design 风格的 UI 组件、图标和样式。
使用 Material，你可以创建具有 Material Design 视觉效果和交互行为的应用程序，例
如漂浮按钮、卡片、阴影效果和标准的应用栏。   
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
Flutter 中的 JIT（Just-in-Time）和 AOT（Ahead-of-Time）是两种不同的编译方式，
用于将 Flutter 代码转换成可执行的机器代码。

1-JIT（Just-in-Time）编译：在开发和调试阶段，Flutter 使用 JIT 编译方式。
JIT 编译器将 Dart 代码转换为中间代码（IL），然后在运行时动态地将中间代码转换为机器代码。
这种编译方式允许热重载（Hot Reload）功能，
开发者可以在不重新启动应用程序的情况下即时查看代码更改的结果。
JIT 编译器还提供了更快的开发周期和更快的编译时间，但相对而言，生成的代码执行速度可能较慢。

2-AOT（Ahead-of-Time）编译：在发布到生产环境时，Flutter 使用 AOT 编译方式。
AOT 编译器将 Dart 代码预先编译为机器代码，生成二进制文件，无需在运行时进行即时编译。
这种编译方式提供了更快的启动时间和更高的执行性能，
因为代码已经编译成机器代码，无需再进行运行时的转换。
但与 JIT 编译相比，AOT 编译不支持热重载功能，并且可能导致较长的编译时间。

JIT 编译方式适用于开发和调试阶段，提供了更快的开发周期和热重载功能，但执行速度可能较慢。
而 AOT 编译方式适用于发布到生产环境，提供了更快的启动时间和更高的执行性能，但不支持热重载功能。
在开发过程中，开发者可以充分利用 JIT 编译的便利性和开发速度，
而在发布时则可以选择 AOT 编译以获得更好的性能和用户体验
```

### 2.6 Dart 语言 final 和 const 有什么不同？

```
在 Dart 语言中，final 和 const 是用来声明常量的关键字，但它们有一些不同之处：

1-final：final 用于声明一个只能被赋值一次的变量。
这意味着一旦变量被赋值后，其值就不能再被修改。
final 变量在运行时被初始化，可以根据需要进行延迟初始化。
final 变量的值可以是在运行时计算得到的结果，但一旦初始化后，就不能再改变

2-const：const 用于声明一个编译时常量，这意味着变量的值必须在编译时就已知且不可更改。
const 变量在编译时被初始化，可以在运行时之前进行优化。
const 变量的值必须是编译时常量，如字面量、常量构造函数创建的对象或其他 const 变量的组合。
```

### 2.7 Dart 中有哪些访问修饰符？

```
在 Dart 中，有以下几种访问修饰符：

1-默认访问修饰符（No modifier）：如果没有显式地指定访问修饰符，
则默认为包内可见（package-private），即同一个包内的其他文件可以访问。

2-public：在 Dart 中，默认情况下，所有的成员（变量、函数、类等）都是公开的，
即可在任何地方访问。公开成员不使用任何访问修饰符进行标识。

3-_private：使用下划线 _ 开头的标识符表示私有成员，只能在当前文件中访问。
私有成员在其他文件中是不可见的。
```

### 2.8 Dart 语言 命名参数、可选参数 是什么？

```
在 Dart 语言中，命名参数（Named Parameters）
和可选参数（Optional Parameters）是用于定义函数接受参数的方式。

1-命名参数：命名参数允许你通过指定参数名称来传递参数值，而不必按照参数定义的顺序传递。
使用大括号 {} 包围参数名称，并在函数调用时使用 参数名: 参数值 的形式进行传递

2-可选参数：可选参数允许你定义函数接受可选的参数，可以在函数调用时省略该参数。
可选参数分为两种类型：位置参数和命名参数
```

### 2.9 Dart 语言命名构造函数和工厂函数之间有什么区别？

```
在 Dart 语言中，命名构造函数（Named Constructors）
和工厂函数（Factory Constructors）是两种用于创建对象的不同方式，它们有以下区别：

1-命名构造函数：命名构造函数是在类中定义的特殊构造函数，
通过使用类名后跟一个句点和构造函数名称来定义。
命名构造函数用于提供不同的构造方式或创建具有特定初始化逻辑的对象

2-工厂函数：工厂函数是通过使用 factory 关键字定义的特殊构造函数，用于创建对象的灵活方式。
工厂函数可以返回一个新的对象，也可以返回一个已存在的对象。
工厂函数通常用于创建单例对象或根据特定条件决定返回哪个对象
```

### 2.10 面向对象编程（OOP）的四个原则是什么？

```
面向对象编程（OOP）的四个基本原则是抽象（Abstraction）、
封装（Encapsulation）、继承（Inheritance）和多态（Polymorphism）。
这些原则被称为「抽象、封装、继承、多态」（Abstraction, Encapsulation, Inheritance, 
Polymorphism）或「AEIP原则」。

这些原则是面向对象编程的基础，它们用于指导设计和组织代码的方式，以实现代码的可维护性、
可扩展性和重用性。

1-抽象（Abstraction）：抽象是将复杂的现实世界问题简化为适合程序处理的模型。
通过抽象，我们可以关注对象的关键特征和行为，忽略其细节。抽象可以通过类、接口和抽象类来实现。

2-封装（Encapsulation）：封装是将数据和操作数据的方法封装在一个单元（类）中，
以实现信息隐藏和访问控制。
封装通过将相关的数据和方法组织在一起，形成一个独立的模块，并限制外部访问来保护数据的完整性。

3-继承（Inheritance）：继承是通过创建新的类（子类）来继承现有类（父类）的属性和方法。
继承可以实现代码的重用和层次化的组织。
子类可以继承父类的属性和方法，并可以添加新的属性和方法，或者重写父类的方法。

4-多态（Polymorphism）：多态是指同一个方法可以在不同的对象上具有不同的行为。
多态允许使用基类或接口类型的引用来引用具体的子类对象，从而实现动态绑定和灵活的代码扩展
```
## 三 参考

* [狗哥课堂—Flutter 面试题整理 01](https://ducafecat.com/blog/flutter-interview-questions-with-answers-01)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-interview-6-framework.png