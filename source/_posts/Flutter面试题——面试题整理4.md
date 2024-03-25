---
title: Flutter面试题——面试题整理4
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: a80fe5f9
date: 2024-03-25 10:42:10
---
## 一 面试题汇总

1. Flutter是什么？为什么选择Flutter？
2. Flutter中的Widget是什么？有哪些常用的Widget？
3. Flutter中的StatefulWidget和StatelessWidget有什么区别？
4. Flutter中的路由是什么？如何实现路由跳转？
5. Flutter中的动画是如何实现的？有哪些常用的动画类？<!--more-->
6. Flutter中的网络请求是如何实现的？有哪些常用的网络库？
7. Flutter中的数据存储是如何实现的？有哪些常用的数据存储方式？
8. Flutter中的国际化是如何实现的？
9. Flutter中的生命周期是什么？有哪些常用的生命周期方法？
10. Flutter中的调试技巧有哪些？
11. 什么是flutter里的key? 有什么用？
12. Flutter中的GlobalKey是什么，有什么作用？
13. Flutter 如何与 原生Android iOS 通信的？举例子说明：
14. flutter开发中遇到了哪些比较棘手的问题，你是怎么解决的?
15. 什么是flutter中的key?有什么用？
16. 怎么理解isolate？
17. await for 如何使用？
18. flutter中Widget、Element、RenderObject三者之间的关系
19. dart是值传递还是引用传递？
20. flutter中mixin的使用和介绍
21. Flutter state生命周期方法之didChangeDependencies 、didUpdateWidget
22. flutter const和final的区别

## 二  面试题解答(仅供参考)

### 2.1 Flutter是什么？为什么选择Flutter？

```
Flutter是一个由谷歌开发的开源UI框架，可以用于构建高性能、高保真度、跨平台的移动应用、Web应用和桌面应用。使用Flutter的好处有很多，包括：

1-快速开发：Flutter提供了丰富的UI控件和功能，可以快速构建高质量的应用。
2-高性能：Flutter使用自绘引擎Skia，可以实现高性能的渲染和动画效果。
3-热重载：Flutter支持热重载，可以在不重新启动应用的情况下快速预览和调试应用。
4-跨平台：Flutter支持同时开发Android和iOS应用，甚至可以用同一份代码构建Web和桌面应用。
5-开源：Flutter是一个开源框架，有一个庞大的社区支持和贡献。
6-易于学习：Flutter使用Dart语言进行开发，语法简洁清晰，易于学习和使用。

综合来说，Flutter具有快速开发、高性能、跨平台等优势，并且易于学习和使用，因此被越来越多的开发者和企业所采用。
```

### 2.2 Flutter中的Widget是什么？有哪些常用的Widget？

```
在Flutter中，Widget是一个抽象的概念，它代表了应用程序中的一个可视化组件，
例如按钮、文本框、图像等。Flutter中的所有UI组件都是通过Widget构建而成的。

Widget是不可变的，一旦创建就不能修改。
如果需要更改Widget的属性或状态，必须先销毁原来的Widget，然后重新创建一个新的Widget。

Flutter中有两种类型的Widget：StatelessWidget和StatefulWidget。
StatelessWidget是不可变的，它的状态在创建后永远不会改变。
StatefulWidget是有状态的，它可以根据用户的操作或其他因素改变自身的状态。

Flutter中常用的Widget包括：

1-Text：用于显示文本内容。
2-Image：用于显示图像。
3-Container：用于创建一个矩形区域，并可以设置背景色、边框、圆角等属性。
4-Row和Column：用于创建水平和垂直布局。
5-ListView：用于创建可滚动的列表。
6-TextField：用于创建文本输入框。
7-RaisedButton和FlatButton：用于创建按钮。
8-Scaffold：用于创建基本的应用程序布局，包括AppBar、底部导航栏等。
9-AlertDialog：用于创建弹出对话框。

除了这些常用的Widget之外，Flutter还提供了许多其他的Widget，
例如Stack、GridView、Card、TabBar等，可以根据具体的需求选择使用。
```

### 2.3  Flutter中的StatefulWidget和StatelessWidget有什么区别？

```
StatefulWidget和StatelessWidget是两种不同类型的Widget，它们的主要区别在于是否有状态。
StatefulWidget可以根据用户的操作或其他因素改变自身的状态，
而StatelessWidget的状态在创建后永远不会改变。
在使用StatefulWidget时，需要同时定义一个State类和一个StatefulWidget类。
```

### 2.4 Flutter中的路由是什么？如何实现路由跳转？

```
在Flutter中，路由是管理应用程序界面导航的机制。
它可以让用户在不同的屏幕之间进行切换，例如从登录界面跳转到主界面，从主界面跳转到设置界面等。

Flutter中的路由分为两种类型：命名路由和非命名路由。
命名路由是通过给每个页面指定一个名称来实现路由跳转的，而非命名路由则是通过Widget来实现路由跳转的。

实现路由跳转的基本步骤如下：

1-在应用程序的根Widget中定义路由表，用于存储每个页面的名称和对应的Widget。

class MyApp extends StatelessWidget {
@override
Widget build(BuildContext context) {
 return MaterialApp(
 title: ‘My App’,
 initialRoute: ‘/’,
 routes: {
  ‘/’: (context) => HomePage(),
  ‘/login’: (context) => LoginPage(),
  ‘/settings’: (context) => SettingsPage(),
  },
 );
 }
}

在这个例子中，根Widget是一个MaterialApp，它定义了一个路由表，
包括三个页面：HomePage、LoginPage和SettingsPage。

2-在需要跳转的页面中使用Navigator.push方法来实现路由跳转。

Navigator.push(context, MaterialPageRoute(builder: (context) => LoginPage()));

在这个例子中，当用户点击登录按钮时，会跳转到LoginPage页面。

3-在需要返回上一个页面时，可以使用Navigator.pop方法来实现。

Navigator.pop(context);

在这个例子中，当用户点击返回按钮时，会返回上一个页面。

Flutter中的路由是管理应用程序界面导航的机制，它可以让用户在不同的屏幕之间进行切换。
通过在根Widget中定义路由表，并使用Navigator.push和Navigator.pop方法来实现路由跳转和返回。
```

### 2.5 Flutter中的动画是如何实现的？有哪些常用的动画类？

```
在Flutter中，动画是通过Animation和AnimationController两个类来实现的。
Animation表示动画的当前状态，例如动画的当前值、是否完成、是否反向等。
AnimationController用于控制动画的开始、暂停、恢复、反向等。

Flutter中的动画可以分为两种类型：显式动画和隐式动画。
显式动画是通过AnimationController控制的，例如Tween动画、Curve动画等。
隐式动画则是通过Flutter框架自动执行的，例如AnimatedContainer、AnimatedOpacity等。

常用的动画类包括：

1-Tween：用于在两个值之间进行插值运算，例如在0和1之间插值计算出当前值。
2-Curve：用于定义动画的速度曲线，例如线性曲线、抛物线曲线、弹性曲线等。
3-AnimationController：用于控制动画的开始、暂停、恢复、反向等。
4-AnimatedBuilder：用于在动画变化时自动重建Widget树，可以用于创建复杂的动画效果。
5-AnimatedContainer：用于创建一个可以自动执行动画的Container。
6-AnimatedOpacity：用于创建一个可以自动执行动画的Opacity。
```

### 2.6 Flutter中的网络请求是如何实现的？有哪些常用的网络库？

```
在Flutter中，网络请求是通过Dart SDK提供的http库来实现的。
http库提供了发送HTTP请求和处理HTTP响应的函数和类，可以与RESTful API等后端服务进行交互。

常用的http库包括：

1-http：Dart SDK中自带的http库，可以用于发送HTTP请求和处理HTTP响应。
2-dio：基于http库封装的网络请求库，支持请求拦截、响应拦截、身份验证、文件上传等功能。
3-retrofit：基于Dart的注解和生成器功能，可以自动生成网络请求代码，简化网络请求的编写。

下面是一个使用http库发送GET请求的例子
import 'package:http/http.dart' as http;

class MyApiClient {
  static const String _baseUrl = 'https://jsonplaceholder.typicode.com';

  Future<List<Post>> getPosts() async {
    final response = await http.get('$_baseUrl/posts');

    if (response.statusCode == 200) {
      final List<dynamic> json = jsonDecode(response.body);
      return json.map((e) => Post.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load posts');
    }
  }
}

在这个例子中，MyApiClient是一个网络请求的类，它使用http库发送GET请求来获取文章列表。
在getPosts方法中，使用http.get方法发送请求，并根据响应的状态码来处理返回的结果。
如果响应状态为200，表示请求成功，将响应的JSON数据解码为一个List列表，并返回。
否则抛出异常，表示请求失败。

如果需要发送POST请求、文件上传等操作，可以使用http库提供的其他方法，例如http.post、http.put等。
在使用http库时，需要在pubspec.yaml文件中添加http库的依赖。

Flutter中的网络请求是通过Dart SDK提供的http库来实现的，常用的网络库包括http、dio、retrofit等。
可以根据具体的需求选择使用不同的网络库。
```

### 2.7 Flutter中的数据存储是如何实现的？有哪些常用的数据存储方式？

```
在Flutter中，数据存储是通过Flutter SDK提供的各种存储方式来实现的。常用的数据存储方式包括：

1-Shared Preferences：用于存储应用程序的轻量级数据，例如用户设置、用户偏好等。
2-SQLite数据库：用于存储应用程序的结构化数据，例如用户信息、文章列表等。
3-文件存储：用于存储应用程序的大型文件，例如音频、视频等。
```

### 2.8 Flutter中的国际化是如何实现的？

```
Flutter中的国际化（i18n）是通过Flutter SDK提供的intl库来实现的。
intl库提供了一组用于本地化的API，可以让应用程序在不同的语言环境下显示不同的文本、日期、货币等信息
```

### 2.9 Flutter中的生命周期是什么？有哪些常用的生命周期方法？

```
在Flutter中，生命周期是指Widget在创建、更新和销毁过程中所经历的各个阶段。
每个阶段都有对应的生命周期方法，可以在这些方法中执行一些初始化、清理、监听等操作。

常用的生命周期方法包括：

1-initState：在Widget第一次插入到Widget树时调用，用于初始化一些数据或监听一些事件。
2-didChangeDependencies：在Widget依赖的对象发生变化时调用，
例如调用了setState方法或父Widget的build方法被调用了。
3-build：用于构建Widget树，必须返回一个Widget。
4-didUpdateWidget：在Widget重新构建时调用，可以用于比较新旧Widget是否有差异，并做出相应的处理。
5-deactivate：在Widget从Widget树中被移除时调用，用于清理一些资源或监听。
6-dispose：在Widget从Widget树中永久移除时调用，用于释放一些资源或取消监听。
```

### 2.10 Flutter中的调试技巧有哪些？

```
在开发Flutter应用程序时，经常需要进行调试。
Flutter提供了一些调试技巧和工具，可以帮助开发人员更快地定位和解决问题。

常用的Flutter调试技巧包括：

1-使用print语句
在Flutter中，可以使用print语句来输出调试信息。print语句可以在控制台输出调试信息，
例如：print('Button onPressed');在控制台中，将输出’Button onPressed’。

2-使用断言
在Flutter中，可以使用断言来检查代码中的错误。断言通常用于检查前置条件、后置条件和不变量等，
例如：assert(count >= 0, 'The count cannot be negative.');
如果count小于0，将会抛出一个异常，并输出’The count cannot be negative.'。

3-使用Flutter DevTools
Flutter DevTools是一个用于调试Flutter应用程序的工具。
它可以在浏览器中查看和分析Flutter应用程序的性能和状态信息，例如Widget树、日志、堆栈跟踪等。
要使用Flutter DevTools，需要下载并安装Flutter SDK，
并在命令行中运行flutter pub global activate devtools命令来安装Flutter DevTools。
然后，在命令行中运行flutter pub global run devtools命令来启动Flutter DevTools。

4-使用Flutter Inspector
Flutter Inspector是Flutter SDK内置的一个工具，可以用于查看和分析Flutter应用程序的状态和性能信息。
在Flutter应用程序中，可以通过在控制台中按下’w’键来打开Flutter Inspector。
在Flutter Inspector中，可以查看Widget树、调试布局、查看性能图表等。

5-使用Flutter Driver
Flutter Driver是一个用于自动化测试Flutter应用程序的工具。
它可以模拟用户操作、查找和操作Widget、执行测试脚本等。
要使用Flutter Driver，需要在Flutter应用程序中添加flutter_driver库，
并在命令行中运行flutter drive命令来启动Flutter Driver。

Flutter提供了一些调试技巧和工具，可以帮助开发人员更快地定位和解决问题。
常用的Flutter调试技巧包括使用print语句、断言、Flutter DevTools、
Flutter Inspector和Flutter Driver等。可以根据具体的需求选择使用不同的调试技巧和工具。
```

### 2.11 什么是flutter里的key? 有什么用？

```
在Flutter中，Key是一个用于标识特定Widget的对象。
它的主要作用是在构建新的Widget树时，帮助Flutter框架判断哪些Widget可以保持原样，
哪些需要被更新或替换。
使用Key可以确保在Widget树更新时，状态和动画等信息能够被保留。

例如，假设我们有一个列表ListView，其中包含一些动态生成的Card项。
当你添加、删除或重新排序这些Card时，Flutter需要确定哪些Card是新的，哪些是已存在的。
这时，我们可以为每个Card分配一个Key，如ValueKey或ObjectKey，
以便在ListView发生变化时，Flutter能够正确识别各个Card
```

### 2.12 Flutter中的GlobalKey是什么，有什么作用？

```
Flutter中的GlobalKey是用来在Flutter Widget树中唯一标识一个Widget的对象。
它可以用于在Widget树中查找、操作或者监控特定的Widget。
下面是一些使用GlobalKey的例子：

1-查找Widget：可以使用GlobalKey来查找Flutter Widget树中的特定Widget，
例如，通过GlobalKey可以获取一个TextField的当前输入内容。

2-操作Widget：可以使用GlobalKey来操作特定的Widget，
例如，通过GlobalKey可以调用一个按钮的点击事件

3-监控Widget：可以使用GlobalKey来监控特定Widget的生命周期或者属性变化

GlobalKey是一个非常有用的工具，可以用于在Flutter Widget树中定位、操作和监控特定的Widget。 
通过给Widget设置不同的GlobalKey，可以实现更多的功能和交互
```

### 2.13 Flutter 如何与 原生Android iOS 通信的？举例子说明：

```
Flutter可以通过Platform Channels与原生Android和iOS代码通信。
Platform Channels是一种消息传递机制，允许Flutter代码与原生平台代码进行双向通信。
主要有三种类型的通道：

1-MethodChannel：用于传递方法调用。
2-EventChannel：用于数据流的通信，例如持续的传感器数据。
3-BasicMessageChannel：用于传递字符串和半结构化的消息
```

### 2.14 flutter开发中遇到了哪些比较棘手的问题，你是怎么解决的?

```
1-性能问题：Flutter应用可能会出现性能瓶颈，例如卡顿、动画不流畅等。
解决方法包括使用Flutter的性能工具分析性能问题、减少UI重建的次数、优化布局和渲染等。

2-设备兼容性问题：由于Flutter跨平台的特性，不同设备上的兼容性问题是常见的。
解决方法包括使用平台特定的代码、适配屏幕尺寸和分辨率、处理不同平台的API差异等。

3-第三方库的问题：Flutter生态系统非常丰富，但有时候可能会遇到不稳定或不兼容的第三方库
。解决方法包括查找替代库、修复或改进第三方库的问题、自己实现功能等。

4-调试问题：在开发过程中，可能会遇到难以调试的问题，例如UI显示异常、逻辑错误等。
解决方法包括使用调试工具、打印日志、逐步调试等。

5-动态UI的复杂性：Flutter的动态UI能力非常强大，但也带来了一些复杂性。
解决方法包括使用状态管理库（如Provider、GetX、Bloc）来管理UI状态、
封装可复用的小部件、遵循单一职责原则等。

解决这些问题的关键是充分了解Flutter的工作原理和常用的开发技巧，学会使用相关的工具和库来辅助开发
```

### 2.15 什么是flutter中的key?有什么用？

```
在Flutter中，Key是一个抽象类，用于标识Widget。每个Widget都可以使用Key来唯一标识自己。
Key在Flutter中有很多不同的用途，下面是一些常见的用途：

1-唯一标识：通过Key，可以在Widget树中唯一标识一个Widget。
这在Widget树重建时非常重要，可以确保正确地更新和重用Widget，而不是重新创建它们。

2-保留状态：当Widget树重建时，如果新旧Widget具有相同的Key，
Flutter会尽可能地保留旧Widget的状态。
这对于在用户交互过程中保留表单数据、滚动位置等非常有用。

3-查找和操作：通过Key，可以在Widget树中查找特定的Widget，并对其进行操作。
例如，可以使用GlobalKey来访问Widget的属性或调用其方法。

4-动画过渡：在进行动画过渡时，使用Key可以帮助Flutter识别新旧Widget之间的关系，以实现平滑的过渡效果。

5-列表更新：在使用ListView、GridView等可滚动列表时，
Key用于标识列表中的每个项，以便在更新列表时进行高效的增删改操作。

Key在Flutter中是一个非常重要的概念，用于管理和操作Widget。
通过合理使用Key，可以提高应用性能和用户体验。
```

### 2.16 怎么理解isolate？

```
在Flutter中，Isolate是一个独立的执行线程，可以独立于主线程执行代码。
Isolate可以理解为在应用程序中运行的另一个独立的"工作区"，
与主线程相互隔离，各自拥有自己的内存空间和执行上下文。

Flutter的Isolate提供了一种并发执行代码的方式，
可以在多个Isolate之间并行执行任务，从而提高应用程序的性能和响应能力。
每个Isolate都是相互独立的，拥有自己的事件循环、堆内存和栈，可以执行独立的计算任务、IO操作等。

在Flutter中，可以使用Dart语言的isolate库来创建和管理Isolate。
通过创建新的Isolate，可以在新的线程中执行耗时的计算任务，而不会阻塞主线程的UI渲染和用户交互。

Isolate之间可以通过消息传递进行通信，
即通过发送消息和接收消息的方式实现Isolate之间的数据交换。
Flutter提供了Isolate.spawn函数来创建新的Isolate，并使用SendPort进行消息传递。

需要注意的是，由于Isolate是相互独立的，因此不能直接访问主线程的UI组件和状态。
如果需要更新UI或与UI交互，可以通过消息传递将结果返回给主线程，然后由主线程来更新UI。

总结来说，Flutter的Isolate是一种并发执行代码的机制，
可以在多个独立的执行线程中执行任务，提高应用程序的性能和响应能力。
通过消息传递，Isolate之间可以进行数据交换和通信。
```

### 2.17 await for 如何使用？

```
在Dart中，await for语法用于对一个异步数据流进行迭代。
它通常与Stream一起使用，用于处理异步事件流
```

### 2.18 flutter中Widget、Element、RenderObject三者之间的关系

```
在Flutter框架中，Widget、Element和RenderObject是三个核心概念，它们之间存在一定的关系。

Widget是Flutter中构建用户界面的基本单元，可以理解为一个不可变的配置对象，
用来描述界面的外观和行为。Widget通过build()方法构建Element树。

Element是Widget在Flutter渲染树中的实例，它负责管理Widget的生命周期和状态，
并且负责将Widget转化为RenderObject。
每个Widget都对应一个Element，Element可以有一个或多个子Element。

RenderObject是Flutter的渲染层的基本单元，它负责绘制界面的内容和处理用户交互。
RenderObject可以通过布局算法确定自身的位置和大小，并与其他RenderObject进行组合，
形成一个完整的界面。每个Element都对应一个RenderObject。

总的来说，Widget是描述界面的配置对象，Element是Widget在渲染树中的实例，
RenderObject是负责绘制和布局的对象。
它们之间的关系是Widget通过Element转化为RenderObject，最终被渲染到屏幕上。
在Flutter的渲染过程中，Widget和Element是可以被热重载的，而RenderObject则是持久存在的。
```

### 2.19 dart是值传递还是引用传递？

```
在 Dart 中，函数参数的传递方式是值传递（pass-by-value）
```

### 2.20 flutter中mixin的使用和介绍

```
在Flutter中，mixin是一种代码复用的机制，它允许将一组方法注入到类中，以便在多个类中重复使用这些方法。
Mixin类似于其他编程语言中的"混入"或"特质"。

使用mixin可以实现一些横切关注点（cross-cutting concerns）的功能，例如日志记录、网络请求等。
通过将这些功能封装在mixin中，可以在多个类中重复使用，避免代码冗余
```

### 2.21 Flutter state生命周期方法之didChangeDependencies 、didUpdateWidget

```
在Flutter中，StatefulWidget有一系列的生命周期方法，
其中包括 didChangeDependencies 和 didUpdateWidget。

1-didChangeDependencies 方法在以下情况下被调用：

1.1-在 initState 之后，当 State 对象的依赖关系发生变化时。
1.2-当父级 Widget 中的依赖关系发生变化时，这可能会导致 State 对象的依赖关系发生变化。
didChangeDependencies 方法可以用来执行与依赖关系有关的操作，例如获取 Provider 或 InheritedWidget 的实例，并更新 State 对象的状态。

2-didUpdateWidget 方法在以下情况下被调用：

2.1-当父级 Widget 重建时，会创建一个新的 Widget 实例，并使用新的配置参数。
2.2-当调用 setState 方法时，会导致当前 Widget 重新构建。
didUpdateWidget 方法通常用于处理 Widget 配置的更改，可以比较新旧配置参数，并根据需要更新 State 对象的状态
```

### 2.22 flutter const和final的区别

```
在Flutter中，const和final都用于声明常量，但它们有一些重要的区别。

1-赋值时机不同：final在第一次赋值的时候被初始化，而const在编译时就需要被赋值。

2-可变性不同：final关键字声明的变量可以有一个初始值，并且只能被赋值一次，但是它的值可以是可变的。
const关键字声明的变量必须在声明时初始化，并且它的值是不可变的。

3-内存分配不同：final变量在第一次使用时才会被分配内存，而const常量在编译时就已经分配了内存。

4-作用域不同：final变量可以在运行时被初始化，因此可以根据条件来确定其值。
const常量必须在编译时就确定其值，因此不能根据条件来初始化
```

## 三 参考

* [CSDN—Flutter面试中常问到的问题](https://blog.csdn.net/qq_28563283/article/details/130216009)


