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
2. Flutter中的路由是什么？如何实现路由跳转？
3. Flutter中的动画是如何实现的？有哪些常用的动画类？<!--more-->
4. Flutter中的网络请求是如何实现的？有哪些常用的网络库？
5. Flutter中的数据存储是如何实现的？有哪些常用的数据存储方式？
6. Flutter中的国际化是如何实现的？
7. Flutter中的生命周期是什么？有哪些常用的生命周期方法？
8. Flutter中的调试技巧有哪些？
9. Flutter 如何与 原生Android iOS 通信的？举例子说明：
10. await for 如何使用？
11. dart是值传递还是引用传递？
12. Flutter state生命周期方法之didChangeDependencies 、didUpdateWidget

## 二  面试题解答(仅供参考)

### 2.1 Flutter是什么？为什么选择Flutter？

```
Flutter是Google开发的开源UI工具包，用于从单一代码库构建适用于移动、Web和桌面端的精美、原生编译的应用程序。

1.Flutter 的特点：
1.1跨平台开发：
-使用同一份代码，可以同时构建出适用于 iOS、Android、Web 和桌面端的应用程序，大大提高了开发效率。

1.2原生性能：
-Flutter 使用 Dart 语言，直接编译为机器码，因此具有接近原生应用的性能。
-Flutter 使用自己的渲染引擎 Skia，直接绘制 UI，避免了与原生组件的桥接，提高了渲染效率。

1.3 美观且高度定制的 UI：
-Flutter 提供了丰富的、高度定制化的 Widget 库，允许开发者构建精美的、符合品牌风格的用户界面。

1.4 快速开发：
Flutter 的热重载（Hot Reload）功能允许开发者在不重启应用的情况下实时查看代码更改，大大提高了开发效率。

1.5强大的社区支持：
-Flutter 拥有一个活跃的开发者社区，提供了大量的开源库和工具。
-Google 的大力支持也为 Flutter 的发展提供了保障。

2.选择 Flutter 的理由：

2.1 提高开发效率：
单一代码库、热重载等特性，可以显著提高开发效率，缩短开发周期。

2.2 构建精美的用户界面：
丰富的 Widget 库和高度定制化的 UI 能力，可以帮助开发者构建出令人惊艳的用户界面。

2.3 提供原生性能：
接近原生应用的性能，可以提供流畅的用户体验。

2.4 降低开发成本：
跨平台开发能力，可以减少开发和维护多个平台应用程序的成本。

2.5 强大的社区支持：
活跃的社区和 Google 的支持，为 Flutter 的发展提供了保障。

总结：
Flutter是一种强大的跨平台移动应用开发框架，它具有高性能、高效率、美观等特点，是构建高质量移动应用的理想选择。
```


### 2.2 Flutter中的路由是什么？如何实现路由跳转？

```
1.概念
在 Flutter 中，路由 是应用程序中的一个抽象概念，用于管理不同界面（页面）之间的跳转。
Flutter 使用 Navigator 类来管理和控制应用中的路由。
每个路由代表一个 Widget，并且可以在不同的页面之间进行跳转。

Flutter 提供了两种主要的路由机制
-命名路由：基于路由名称来进行导航。
-匿名路由：直接通过 MaterialPageRoute 或 CupertinoPageRoute 等类来实现页面跳转。

2.如何实现路由跳转？
Flutter 提供了多种方式来实现页面跳转，下面是几种常见的路由跳转方式：
2.1 使用 Navigator.push() 实现页面跳转
2.2 使用 Navigator.pop() 返回上一页
2.3 使用命名路由
2.4. 使用 Navigator.pushReplacement() 替换当前页面
2.5. 返回带有参数的数据

3总结：
-在 Flutter 中，路由用于管理页面之间的跳转和数据传递。常用的路由跳转方式有：
-使用 Navigator.push() 实现页面跳转。
-使用 Navigator.pop() 返回上一页面。
-使用命名路由实现页面跳转。
-使用 Navigator.pushReplacement() 替换当前页面。
```

### 2.3 Flutter中的动画是如何实现的？有哪些常用的动画类？

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

### 2.4 Flutter中的网络请求是如何实现的？有哪些常用的网络库？

```
在 Flutter 中，网络请求的实现主要依赖于 Dart 语言提供的 http 包，或者一些更高级的第三方网络库。
以下是 Flutter 中网络请求的实现方式和常用的网络库：

1.Flutter 中的网络请求实现方式
1.1 使用 http 包
-http 包是 Dart 官方提供的用于发起 HTTP 请求的库。
-它提供了简单易用的 API，可以发起 GET、POST、PUT、DELETE 等各种 HTTP 请求。

1.2 使用第三方网络库：
-除了 http 包，Flutter 社区还提供了许多功能更强大的第三方网络库，例如 dio 和 chopper。
-这些库通常提供了更高级的功能，例如拦截器、转换器、请求取消等。

2 常用的网络库：

2.1 http：
-Dart 官方提供的 HTTP 请求库。
-简单易用，适用于基本的网络请求。
-优点：轻量级，易于上手。
-缺点：功能相对较少。

2.2 dio：
-一个强大的Dart HTTP请求库，支持Restful API、FormData、拦截器、请求取消、Cookie管理、文件上传/下载等。
-功能丰富，适用于复杂的网络请求场景。
-优点：功能强大，灵活易用。
-缺点：相对较重。

2.3 chopper：
-一个基于注解的 HTTP 请求库，可以自动生成 HTTP 请求代码。
-适用于 Restful API 开发。
-优点：代码生成，减少样板代码。
-缺点：学习曲线较陡峭
```

### 2.5 Flutter中的数据存储是如何实现的？有哪些常用的数据存储方式？

```
在Flutter中，数据存储是通过Flutter SDK提供的各种存储方式来实现的。

常用的数据存储方式包括：

1-Shared Preferences：用于存储应用程序的轻量级数据，例如用户设置、用户偏好等。
2-SQLite数据库：用于存储应用程序的结构化数据，例如用户信息、文章列表等。
3-文件存储：用于存储应用程序的大型文件，例如音频、视频等。
```

### 2.6 Flutter中的国际化是如何实现的？

```
Flutter中的国际化（i18n）是通过Flutter SDK提供的intl库来实现的。
intl库提供了一组用于本地化的API，可以让应用程序在不同的语言环境下显示不同的文本、日期、货币等信息
```

### 2.7 Flutter中的生命周期是什么？有哪些常用的生命周期方法？

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

### 2.8 Flutter中的调试技巧有哪些？

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


### 2.9 Flutter 如何与 原生Android iOS 通信的？举例子说明：

```
Flutter可以通过Platform Channels与原生Android和iOS代码通信。
Platform Channels是一种消息传递机制，允许Flutter代码与原生平台代码进行双向通信。
主要有三种类型的通道：

1-MethodChannel：用于传递方法调用。
2-EventChannel：用于数据流的通信，例如持续的传感器数据。
3-BasicMessageChannel：用于传递字符串和半结构化的消息
```


### 2.10 await for 如何使用？

```
在 Dart 语言中，await for 循环用于异步地迭代 Stream 中的数据。
它允许你以同步的方式处理 Stream 中的每个事件，而无需使用 Stream.listen() 方法和回调函数。

1.await for 的工作原理：
1.1 异步迭代：
-await for 循环会异步地等待 Stream 发出下一个数据事件。
-当 Stream 发出数据事件时，循环会执行循环体中的代码，并将数据事件赋值给循环变量。

1.2 自动处理完成和错误事件：
-await for 循环会自动处理 Stream 的完成和错误事件。
-当 Stream 完成时，循环会正常结束。
-当 Stream 发出错误事件时，循环会抛出异常

2.await for 的语法：
await for (var variable in stream) {
  // 循环体代码
}
-variable：用于存储 Stream 发出的数据事件的变量。
-stream：要迭代的 Stream 对象。

3.await for 的使用场景：
-处理异步数据流，例如从网络、文件或数据库读取的数据。
-监听用户输入事件或传感器数据。
-实现响应式编程。

4.await for 的优点：
-使异步代码看起来更像同步代码，提高了代码的可读性。
-简化了异步数据流的处理，无需使用回调函数。
-自动处理 Stream 的完成和错误事件。

5.await for 的缺点：
-只能在 async 函数中使用。
-可能会阻塞当前异步函数的执行，直到 Stream 完成。

6.总结：
await for 循环是 Dart 中一个强大的特性，它允许你以同步的方式处理异步数据流。
它简化了异步代码的编写，提高了代码的可读性和可维护性。
```

### 2.11 dart是值传递还是引用传递？

```
在 Dart 中，参数传递的方式取决于参数的类型：

1.值传递（Pass by Value）：
-对于基本数据类型（如 int、double、bool 等），参数通过值传递。
-这意味着在函数内部对参数的修改不会影响函数外部的变量。

2.引用传递（Pass by Reference）：
-对于对象类型（如 List、Map、自定义类等），参数通过引用传递。
-这意味着在函数内部对参数的修改会影响函数外部的变量。

3.总结：
-Dart 使用值传递来传递基本数据类型。
-Dart 使用引用传递来传递对象类型
```


### 2.12 Flutter state生命周期方法之didChangeDependencies 、didUpdateWidget

```
在 Flutter 中，State 对象的生命周期包含多个方法，
其中 didChangeDependencies 和 didUpdateWidget 是两个用于处理依赖项和 Widget 更新的重要方法。

1.didChangeDependencies:
1.1 调用时机：
-在 initState() 方法之后立即调用。
-当 State 对象依赖的 InheritedWidget 发生更改时调用。
-当 State 对象第一次构建时也会调用。

1.2作用：
-用于处理依赖项更改。
-通常用于从 InheritedWidget 中获取数据或执行与依赖项相关的初始化操作。

2.didUpdateWidget:
2.1调用时机：
当 StatefulWidget 的配置（即 widget 属性）发生更改时调用。

2.2 作用：
-用于处理 Widget 配置更新。
-通常用于比较新旧配置并执行相应的更新操作。

3.总结：
-didChangeDependencies 用于处理依赖项更改，例如从 InheritedWidget 中获取数据。
-didUpdateWidget 用于处理 Widget 配置更新，例如比较新旧配置并执行相应的更新操作。

这两个方法都是 State 对象生命周期中的重要组成部分，用于确保 Widget 在依赖项或配置更改时正确更新
```

## 三 参考

* [CSDN—Flutter面试中常问到的问题](https://blog.csdn.net/qq_28563283/article/details/130216009)


