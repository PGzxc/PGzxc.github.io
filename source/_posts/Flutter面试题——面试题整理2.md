---
title: Flutter面试题——面试题整理2
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: 416c40cc
date: 2024-03-24 21:04:57
---
## 一 面试题汇总

1. Dart语法中dynamic，var，object三者的区别
2. const和final的区别
3. Dart中 ?? 与 ??= 的区别
4. 什么是flutter里的key? 有什么用？
5. Flutter中的GlobalKey是什么，有什么作用<!--more-->
6. main() 和runApp() 函数在flutter的作用分别是什么？有什么关系吗？
7. 什么是widget? 在flutter里有几种类型的widget？分别有什么区别？能分别说一下生命周期吗？
8. 简单说一下在Flutter里async和await？
9. future和steam有什么不一样？
10. flutter中Widget、Element、RenderObject、Layer都有什么关系？
11. 简述state的生命周期
12. 简述flutter中自定义View流程？
13. flutter_boost的优缺点，内部实现
14. flutter的渲染机制
15. flutter和native的优缺点
16. flutter支不支持 120hz
17. 状态管理熟悉哪些
18. 多线程怎么处理
19. flutter中大图片上传
20. await for 如何使用
21. Stream有两种订阅模式
22. flutter butild 方法中的 BuildContext 具体是什么东西
23. flutter 打包成web 移动端桌面端的过程是怎么样的
24. dart是值传递还是引用传递
25. dart是弱引用还是强引用
26. get set方法实现
27. Flutter 是如何与原生Android、iOS进行通信的？
28. 简述Flutter 的热重载
29. 怎么理解Isolate？
30. Dart 的作用域
31. Dart 当中的 「 .. 」表示什么意思？
32. Dart 是不是单线程模型？是如何运行的？
33. Dart 是如何实现多任务并行的？
34. 说一下Dart异步编程中的 Future关键字？
35. 说一下 mixin机制？
36. 介绍下Flutter的FrameWork层和Engine层，以及它们的作用
37. 简述Flutter的线程管理模型
38. 介绍下Flutter的理念架构
39.  Future和Isolate有什么区别？
40. 什么是Navigator? MaterialApp做了什么？

## 二  面试题解答(仅供参考)

### 2.1  Dart语法中dynamic，var，object三者的区别

```
var定义的类型是不可变的，
dynamic和object类型是可以变的，而dynamic与object 的最大的区别是在静态类型检查上
```

### 2.2 const和final的区别

```
均表示不可被修改
相同点
1、final、const必须初始化
2、final、const只能赋值一次

不同点
1、final可修饰实例变量、const不可以修饰实例变量
2、访问类中const修饰的变量需要static修饰
3、const修饰的List集合任意索引不可修改，final修饰的可以修改
4、const 用来修饰变量 只能被赋值一次，在编译时赋值
final 用来修饰变量 只能被赋值一次，在运行时赋值
5、final 只可用来修饰变量， const 关键字即可修饰变量也可用来修饰常量构造函数
当const修饰类的构造函数时，它要求该类的所有成员都必须是final的。
```

### 2.3  Dart中 ?? 与 ??= 的区别

```
A??B
左边如果为空返回右边的值，否则不处理。
A??=B
左边如果为空把B的值赋值给A
```

### 2.4 什么是flutter里的key? 有什么用？

```
key是Widgets，Elements和SemanticsNodes的标识符。
key有LocalKey 和 GlobalKey两种。
LocalKey 如果要修改集合中的控件的顺序或数量。
GlobalKey允许 Widget 在应用中的 任何位置更改父级而不会丢失 State。
```

### 2.5 Flutter中的GlobalKey是什么，有什么作用

```
GlobalKey可以获取到对应的Widget的State对象
需求：当我们页面内容很多时，而需要改变的内容只有很少的一部分且在树的底层的时候，我们如何去实现增量更新？
通常情况下有两种方式，
第一种是通过方法的回调，去实现数据更新，
第二种是通过GlobalKey，在StatelessWidget引用StatefulWidget。
```

### 2.6 main() 和runApp() 函数在flutter的作用分别是什么？有什么关系吗？

```
main函数是类似于java语言的程序运行入口函数
runApp函数是渲染根widget树的函数
一般情况下runApp函数会在main函数里执行
```

### 2.7 什么是widget? 在flutter里有几种类型的widget？分别有什么区别？能分别说一下生命周期吗？

**flutter**里有几种类型的widget

```
widget在flutter里基本是一些UI组件
有两种类型的widget，分别是statefulWidget 和 statelessWidget两种
statelessWidget不会自己重新构建自己，但是statefulWidget会
```

**statelessWidget**生命周期

```
1-构造函数
2-build方法
```

**StatefulWidget**生命周期：

```
1-widget的构造方法
2-widget的createState方法
3-state的构造方法
4-state的initState方法(重写该方法时，必须要先调用super. initState())
5-didChangeDependencies方法，分两种情况：

调用initState方法后，会调用该方法从其他widget中依赖一些数据发生改变时，
比如用InheritedWidget，provider来监听数据的改变

1-state的build方法（当调用setState方法，会重新调用build进行渲染）
2-state的deactivate方法（当state被暂时从视图移除的时候会调用，页面push走、pop回来的时候都会调用。
因为push、pop会改变widget在视图树位置，需要先移除再添加。
重写该方法时，必须要先调用super.deactivate()）
3-state的dispose方法。页面被销毁的时候调用，如：pop操作。
通常情况下，自己的释放逻辑放在super.dispose()之前，先操作子类在操作父类。
```

### 2.8 简单说一下在Flutter里async和await？

```
await的出现会把await之前和之后的代码分为两部分，
await并不像字面意思所表示的程序运行到这里就阻塞了，而是立刻结束当前函数的执行并返回一个Future，
函数内剩余代码通过调度异步执行。

async是和await搭配使用的，await只在async函数中出现。
在async 函数里可以没有await或者有多个await。
```

### 2.9 future和steam有什么不一样？

```
在 Flutter 中有两种处理异步操作的方式 Future 和 Stream，
Future 用于处理单个异步操作，
Stream 用来处理连续的异步操作。
```

### 2.10 flutter中Widget、Element、RenderObject、Layer都有什么关系？

```
首先看一下这几个对象的含义及作用。
Widget：仅用于存储渲染所需要的信息。
RenderObject：负责管理布局、绘制等操作。
Element：才是这颗巨大的控件树上的实体。

Widget会被inflate（填充）到Element，并由Element管理底层渲染树。
Widget并不会直接管理状态及渲染,而是通过State这个对象来管理状态。
Flutter创建Element的可见树，相对于Widget来说，是可变的，
通常界面开发中，我们不用直接操作Element,而是由框架层实现内部逻辑。
就如一个UI视图树中，可能包含有多个TextWidget(Widget被使用多次)，
但是放在内部视图树的视角，这些TextWidget都是填充到一个个独立的Element中。
Element会持有renderObject和widget的实例。
记住，Widget 只是一个配置，RenderObject 负责管理布局、绘制等操作。

在第一次创建 Widget 的时候，会对应创建一个 Element， 然后将该元素插入树中。
如果之后 Widget 发生了变化，则将其与旧的 Widget 进行比较，并且相应地更新 Element。
重要的是，Element 不会被重建，只是更新而已。
```

### 2.11 简述state的生命周期

![][1]

### 2.12 简述flutter中自定义View流程？

```
1-已有控件（widget）的继承，组合
2-自定义绘制widget,也就是利用paint，cavans等进行绘制视图。
```

### 2.13 flutter_boost的优缺点，内部实现

```
Flutter Boost 是一个由阿里巴巴开发的 Flutter 框架扩展，旨在为 Flutter 应用提供多页面、多路由的支持，类似于原生应用的多 Activity 或者多 ViewController 的概念。以下是 Flutter Boost 的优缺点以及内部实现的一些特点：

优点：

1-多页面支持： Flutter Boost 允许在一个 Flutter 应用中使用多个页面和路由，这使得开发者可以更灵活地组织应用结构，实现更复杂的应用场景。
2-原生集成： Flutter Boost 提供了与原生代码的无缝集成，可以在原生应用中嵌入 Flutter 页面，并且可以方便地与原生代码进行通信和交互。
3-性能优化： Flutter Boost 的内部实现对于性能进行了优化，使得在多页面场景下 Flutter 应用的性能表现更为稳定。
4-组件复用： Flutter Boost 支持 Flutter 页面的复用，可以在不同的原生页面中加载同一个 Flutter 页面，提高了开发效率。

缺点：

1-学习成本： Flutter Boost 的使用相对复杂，需要对 Flutter 框架有一定的了解，并且需要学习其与原生代码的交互方式，对于新手来说学习成本较高。
2-维护困难： 在使用多页面的情况下，应用的状态管理和页面之间的通信会变得更加复杂，增加了应用的维护难度。
3-依赖性： Flutter Boost 是阿里巴巴开发的第三方框架，对于某些项目可能存在依赖性的问题，需要考虑其对项目的长期维护和支持。

内部实现：

Flutter Boost 的内部实现基于 Flutter 的原生页面路由，它主要包含以下几个核心组件：
1-FlutterBoost: 这是整个框架的入口，负责管理和控制不同 Flutter 页面的跳转和生命周期管理。
2-FlutterBoostApp: 这是 Flutter 应用的主入口，负责初始化 Flutter 引擎，并与原生代码进行交互。
3-BoostNavigator: 这是用于管理多个 Flutter 页面的导航器，负责页面的压栈、出栈等操作，类似于 Flutter 中的 Navigator。
4-BoostContainer: 这是一个 Flutter Widget，用于承载其他 Flutter 页面的内容，每个 BoostContainer 对应一个 Flutter 页面，可以在原生应用中被嵌入和展示。
5-BoostChannel: 这是用于 Flutter 与原生代码通信的渠道，可以实现双向通信，Flutter 可以调用原生方法，原生也可以调用 Flutter 方法。

通过这些组件的配合，Flutter Boost 实现了在原生应用中嵌入 Flutter 页面，并且支持多页面、多路由的功能，使得 Flutter 应用在原生应用中的集成和使用更加灵活和便捷
```

### 2.14 flutter的渲染机制

1-图示

![][2]

2-说明

```
Flutter只关心向GPU提供视图数据，
GPU的VSync信号同步到UI线程，
UI线程使用Dart来构建抽象的视图结构，
这份数据结构在GPU线程进行图层合成，视图数据提供给Skia引擎渲染为GPU数据，
这些数据通过OpenGL或者Vulkan提供给GPU。
```

### 2.15 flutter和native的优缺点

```
Flutter 和原生开发各有其优缺点，下面是它们的主要对比：

Flutter 的优点：

1-跨平台性： Flutter 允许开发者使用单一的代码库构建同时运行在 iOS 和 Android 平台上的应用程序，这降低了开发成本和维护复杂度。
2-快速开发： Flutter 提供了丰富的 UI 组件和开发工具，如热重载，使得开发者能够快速迭代、实时预览和调试应用程序，从而提高了开发效率。
3-漂亮的 UI： Flutter 使用自绘的方式渲染 UI，不依赖于平台的原生控件，因此能够实现高度自定义和丰富的动画效果，使得应用程序的界面更加美观和流畅。
4-一致性： 由于 Flutter 在不同平台上使用相同的渲染引擎和 UI 组件，因此可以实现跨平台应用程序的一致性，用户无论在 iOS 还是 Android 上使用应用程序，都能获得相似的体验。

Flutter 的缺点：

1-应用大小： Flutter 应用程序的打包体积通常会比原生应用大，因为应用需要包含 Flutter 的引擎和框架，这可能会增加应用的下载和安装时间。
2-性能： 尽管 Flutter 在大多数情况下能够提供良好的性能，但在某些特定情况下，如复杂的动画或高负载的场景下，与原生应用相比可能存在一些性能损失。
3-平台特定功能： Flutter 尚未完全支持所有平台特定的功能和 API，因此在需要使用特定于平台的功能时可能需要编写原生代码或使用插件。

原生开发的优点：

1-性能： 原生应用通常能够实现最佳的性能和响应速度，因为它们直接使用平台提供的原生 API 和功能
2-平台特定功能： 原生开发可以直接使用平台提供的所有功能和 API，包括设备硬件、系统服务等，这使得开发者能够更好地利用平台的特性。
3-生态系统： 原生开发具有成熟的开发工具和丰富的第三方库和工具支持，开发者可以更轻松地解决各种问题并获得更多的资源和支持。

原生开发的缺点：

1-开发成本高： 原生开发需要分别编写 iOS 和 Android 版本的代码，这增加了开发成本和工作量。
2-学习曲线： 原生开发需要掌握不同的开发语言和开发工具，如 Swift 或 Objective-C（iOS）、Java 或 Kotlin（Android），这增加了学习曲线。
3-代码重复： 原生开发中的大部分代码不能重用，开发者需要分别编写和维护不同平台的代码，这增加了代码重复和维护成本。

综上所述，Flutter 和原生开发各有其优劣势，开发者应根据项目需求、团队技能和资源情况选择合适的开发方式。
```

### 2.16 flutter支不支持 120hz

```
Flutter 框架本身并没有直接支持 120Hz 或其他高刷新率的显示。Flutter 主要依赖于平台提供的渲染引擎（Skia on Android，Metal on iOS），并且通常是以平台的默认帧率来渲染。

然而，Flutter 应用通常可以在支持高刷新率的设备上运行，并且它们可以受益于更流畅的动画和界面交互，但这并不是因为 Flutter 框架本身支持高刷新率，而是因为 Flutter 应用可以利用设备的高刷新率来提供更好的用户体验。

如果你希望在 Flutter 应用中实现更高的刷新率，可能需要考虑以下几点：

1-平台特定的优化： 你可以针对特定平台（如 Android、iOS）进行优化，利用平台提供的特性来实现更高的刷新率。例如，在 Android 上，你可以使用 Flutter 插件或原生代码来配置应用的渲染设置以支持更高的帧率。
2-定制渲染引擎： 你可以探索定制 Flutter 渲染引擎的可能性，以实现更高的帧率。这需要深入了解 Flutter 框架的内部工作原理，并且可能需要进行大量的定制和优化工作。
3-第三方库和工具： 虽然 Flutter 框架本身不直接支持高刷新率，但可能有第三方库或工具可以帮助实现这一目标。你可以搜索现有的 Flutter 插件或库，或者尝试与社区合作开发这样的功能。

总的来说，虽然 Flutter 框架本身没有直接支持 120Hz 或其他高刷新率，但你可以通过一些额外的工作和优化来实现这一目标，具体取决于你的项目需求和技术能力。
```

### 2.17 状态管理熟悉哪些

```
Flutter中的状态和前端React中的状态概念是一致的。
React框架的核心思想是组件化，应用由组件搭建而成，
组件最重要的概念就是状态，状态是一个组件的UI数据模型，是组件渲染时的数据依据。
Flutter的状态可以分为全局状态和局部状态两种。
常用的状态管理有ScopedModel、BLoC、Redux / FishRedux和Provider。
```

### 2.18 多线程怎么处理

```
在 Flutter 中处理多线程任务的主要方式是使用异步编程模型。
Flutter 提供了一系列的异步处理工具，其中最常用的是 Future、async 和 await 关键字，以及 Isolate。
```

### 2.19 flutter中大图片上传

```
在 Flutter 中上传大图片通常涉及以下几个步骤：

1-选择图片： 使用 Flutter 的 image_picker 插件或类似的库来实现从相册或相机中选择图片的功能。这些插件提供了方便的 API，允许用户选择图片并返回图片的文件路径或字节数据。
2-压缩图片： 由于大图片可能会占用较多的内存和网络带宽，建议在上传之前对图片进行压缩处理，以减小图片的尺寸和文件大小。你可以使用 Flutter 中的 flutter_image_compress 插件或类似的库来实现图片的压缩操作。
3-上传图片： 上传图片通常涉及将图片数据发送到服务器端，你可以使用 Flutter 的 http 插件或其他网络请求库来实现图片上传功能。在上传图片之前，确保你已经获得了图片的文件路径或字节数据，并且在请求中将图片数据正确地包装和发送给服务器
```

### 2.20 await for 如何使用

```
await for是不断获取stream流中的数据，然后执行循环体中的操作。
它一般用在直到stream什么时候完成，并且必须等待传递完成之后才能使用，不然就会一直阻塞。
```

### 2.21 Stream有两种订阅模式

```
Stream 用来处理连续的异步操作，Stream 是一个抽象类，用于表示一系列异步数据的源。
它是一种产生连续事件的方式，可以生成数据事件或者错误事件，以及流结束时的完成事件

Stream 分单订阅流和广播流。

网络状态的监控
```

### 2.22 flutter butild 方法中的 BuildContext 具体是什么东西

```
BuildContext底层原理实现实际上就是Element of(context)原理，
其实就是通过调用BuildContext各种实现方法遍历widget tree和Element tree 
从而获取到指定的对象来达到数据共享的目的
```

### 2.23 flutter 打包成web 移动端桌面端的过程是怎么样的

```
将 Flutter 应用打包成 Web、移动端和桌面端的过程在一定程度上是相似的，但也有一些差异。下面我将简要介绍这些过程：

1. 打包成 Web 应用：

Flutter 支持将应用打包成 Web 应用，这样你就可以在浏览器中运行你的 Flutter 应用。下面是将 Flutter 应用打包成 Web 应用的一般步骤：

在 Flutter 项目中，使用 Flutter SDK 提供的 flutter build web 命令来构建 Web 应用程序。
这将生成一个包含 HTML、JavaScript 和其他相关文件的 build/web 目录，你可以将这些文件部署到 Web 服务器上，或者使用静态文件托管服务（如 Firebase Hosting、Netlify 等）进行部署。
2. 打包成移动端应用（Android 和 iOS）：

Flutter 支持将应用打包成移动端应用，同时支持 Android 和 iOS。以下是将 Flutter 应用打包成移动端应用的一般步骤：

2.1-对于 Android，使用 Flutter SDK 提供的 flutter build apk 命令来构建 APK 文件，然后将其上传到 Google Play 商店或其他 Android 应用市场。
2.2-对于 iOS，使用 Flutter SDK 提供的 flutter build ios 命令来构建 iOS 应用程序，然后使用 Xcode 将其打包成 IPA 文件，然后将 IPA 文件上传到 App Store 进行审核和发布。
3. 打包成桌面端应用（Windows、macOS 和 Linux）：

Flutter 还支持将应用打包成桌面端应用，目前主要支持 Windows、macOS 和 Linux。以下是将 Flutter 应用打包成桌面端应用的一般步骤：

3.1-使用 Flutter SDK 提供的 flutter config --enable-windows-desktop、flutter config --enable-macos-desktop 和 flutter config --enable-linux-desktop 命令来启用相应平台的桌面支持。
3.2-对于 Windows 和 Linux，使用 Flutter SDK 提供的 flutter build windows 和 flutter build linux 命令来构建相应平台的可执行文件。
33.3-对于 macOS，使用 Flutter SDK 提供的 flutter build macos 命令来构建 macOS 应用程序。
3.4-随后，你可以将生成的可执行文件进行打包、签名，然后发布到相应的桌面应用商店（如 Microsoft Store、Mac App Store、Snap Store 等）。

需要注意的是，每个平台的打包和发布过程都有其特定的要求和步骤，你需要仔细阅读官方文档并按照相应的指南进行操作。此外，Flutter 社区也提供了一些第三方工具和插件来简化这些过程，例如 flutter_launcher_icons 插件用于生成应用程序图标、flutter_launcher_name 插件用于配置应用程序名称等等。
```

### 2.24 dart是值传递还是引用传递

```
值传递
```

### 2.25 dart是弱引用还是强引用

```
强引用
```

### 2.26 get set方法实现

```
在 Dart 中，通常使用类的实例变量（成员变量）来存储对象的状态。
如果你想要对这些变量进行读取和设置，可以使用 Dart 中的 getter 和 setter 方法
```

### 2.27 Flutter 是如何与原生Android、iOS进行通信的？

```
Flutter 通过 PlatformChannel 与原生进行交互，其中 PlatformChannel 分为三种：
1-BasicMessageChannel ：用于传递字符串和半结构化的信息。
2-MethodChannel ：用于传递方法调用（method invocation）。
3-EventChannel : 用于数据流（event streams）的通信。
同时 Platform Channel 并非是线程安全的
```

### 2.28 简述Flutter 的热重载

```
Flutter 的热重载是基于 JIT 编译模式的代码增量同步。
由于 JIT 属于动态编译，能够将 Dart 代码编译成生成中间代码，让 Dart VM 在运行时解释执行，
因此可以通过动态更新中间代码实现增量同步。

热重载的流程可以分为 5 步，包括：扫描工程改动、增量编译、推送更新、代码合并、Widget 重建。
Flutter 在接收到代码变更后，并不会让 App 重新启动执行，而只会触发 Widget 树的重新绘制
，因此可以保持改动前的状态，大大缩短了从代码修改到看到修改产生的变化之间所需要的时间。

另一方面，由于涉及到状态的保存与恢复，涉及状态兼容与状态初始化的场景，热重载是无法支持的，
如改动前后 Widget 状态无法兼容、全局变量与静态属性的更改、main 方法里的更改、
initState 方法里的更改、枚举和泛型的更改等。

可以发现，热重载提高了调试 UI 的效率，非常适合写界面样式这样需要反复查看修改效果的场景。
但由于其状态保存的机制所限，热重载本身也有一些无法支持的边界
```

### 2.29 怎么理解Isolate？

```
isolate是Dart对actor并发模式的实现。 
isolate是有自己的内存和单线程控制的运行实体。
isolate本身的意思是“隔离”，因为isolate之间的内存在逻辑上是隔离的。
isolate中的代码是按顺序执行的，任何Dart程序的并发都是运行多个isolate的结果。
因为Dart没有共享内存的并发，没有竞争的可能性所以不需要锁，也就不用担心死锁的问题
```

### 2.30 Dart 的作用域

```
Dart 没有 「public」「private」等关键字，默认就是公开的，私有变量使用下划线 _开头。
```

### 2.31 Dart 当中的 「 .. 」表示什么意思？

```
Dart 当中的 「..」意思是 「级联操作符」，为了方便配置而使用。
「..」和「.」不同的是 调用「..」后返回的相当于是 this，而「.」返回的则是该方法返回的值 
```

### 2.32 Dart 是不是单线程模型？是如何运行的？

Dart 是单线程模型，运行的的流程如下图。

![][3]

运行说明

```
简单来说，Dart 在单线程中是以消息循环机制来运行的，包含两个任务队列，
一个是“微任务队列” microtask queue，
另一个叫做“事件队列” event queue。

当Flutter应用启动后，消息循环机制便启动了。
首先会按照先进先出的顺序逐个执行微任务队列中的任务，
当所有微任务队列执行完后便开始执行事件队列中的任务，
事件任务执行完毕后再去执行微任务，
如此循环往复，生生不息。
```

### 2.33 Dart 是如何实现多任务并行的？

```
前面说过， Dart 是单线程的，不存在多线程，那如何进行多任务并行的呢？
其实，Dart的多线程和前端的多线程有很多的相似之处。
Flutter的多线程主要依赖Dart的并发编程、异步和事件驱动机制。

简单的说，在Dart中，一个Isolate对象其实就是一个isolate执行环境的引用，
一般来说我们都是通过当前的isolate去控制其他的isolate完成彼此之间的交互，
而当我们想要创建一个新的Isolate可以使用Isolate.spawn方法获取返回的一个新的isolate对象，
两个isolate之间使用SendPort相互发送消息，
而isolate中也存在了一个与之对应的ReceivePort接受消息用来处理，
但是我们需要注意的是，ReceivePort和SendPort在每个isolate都有一对，
只有同一个isolate中的ReceivePort才能接受到当前类的SendPort发送的消息并且处理。
```

###  2.34 说一下Dart异步编程中的 Future关键字？
```
前面说过，Dart 在单线程中是以消息循环机制来运行的，其中包含两个任务队列，
一个是“微任务队列” microtask queue，
另一个叫做“事件队列” event queue。

在Java并发编程开发中，经常会使用Future来处理异步或者延迟处理任务等操作。
而在Dart中，执行一个异步任务同样也可以使用Future来处理。
在 Dart 的每一个 Isolate 当中，
执行的优先级为 ： Main > MicroTask > EventQueue。
```

### 2.35 说一下 mixin机制？

```
mixin 是Dart 2.1 加入的特性，以前版本通常使用abstract class代替。
简单来说，mixin是为了解决继承方面的问题而引入的机制，
Dart为了支持多重继承，引入了mixin关键字，
它最大的特殊处在于： 
mixin定义的类不能有构造方法，这样可以避免继承多个类而产生的父类构造方法冲突。


mixins的对象是类，mixins绝不是继承，也不是接口，而是一种全新的特性，
可以mixins多个类，mixins的使用需要满足一定条件。
```

### 2.36 介绍下Flutter的FrameWork层和Engine层，以及它们的作用
```
Flutter的FrameWork层是用Dart编写的框架（SDK），
它实现了一套基础库，包含Material（Android风格UI）和Cupertino（iOS风格）的UI界面，
下面是通用的Widgets（组件），之后是一些动画、绘制、渲染、手势库等。
这个纯 Dart实现的 SDK被封装为了一个叫作 dart:ui的 Dart库。
我们在使用 Flutter写 App的时候，直接导入这个库即可使用组件等功能。

Flutter的Engine层是Skia 2D的绘图引擎库，其前身是一个向量绘图软件，
Chrome和 Android均采用 Skia作为绘图引擎。
Skia提供了非常友好的 API，并且在图形转换、文字渲染、位图渲染方面都提供了友好、高效的表现。
Skia是跨平台的，所以可以被嵌入到 Flutter的 iOS SDK中，
而不用去研究 iOS闭源的 Core Graphics / Core Animation。
Android自带了 Skia，所以 Flutter Android SDK要比 iOS SDK小很多。
```

### 2.37 简述Flutter的线程管理模型

1-图示

![][4]

2-说明

```
默认情况下，Flutter Engine层会创建一个Isolate，并且Dart代码默认就运行在这个主Isolate上。
必要时可以使用spawnUri和spawn两种方式来创建新的Isolate，
在Flutter中，新创建的Isolate由Flutter进行统一的管理。

事实上，Flutter Engine自己不创建和管理线程，
Flutter Engine线程的创建和管理是Embeder负责的，Embeder指的是将引擎移植到平台的中间层代码，
Flutter Engine层的架构示意图如下图所示。

在Flutter的架构中，Embeder提供四个Task Runner，
分别是Platform Task Runner、UI Task Runner Thread、GPU Task Runner和IO Task Runner，
每个Task Runner负责不同的任务，Flutter Engine不在乎Task Runner运行在哪个线程，
但是它需要线程在整个生命周期里面保持稳定。
```

### 2.38 介绍下Flutter的理念架构

1-图示

![][5]

2-说明

```
由上图可知，Flutter框架自下而上分为Embedder、Engine和Framework三层。
其中，Embedder是操作系统适配层，实现了渲染 Surface设置，
线程设置，以及平台插件等平台相关特性的适配；
Engine层负责图形绘制、文字排版和提供Dart运行时，Engine层具有独立虚拟机，
正是由于它的存在，Flutter程序才能运行在不同的平台上，实现跨平台运行；
Framework层则是使用Dart编写的一套基础视图库，
包含了动画、图形绘制和手势识别等功能，是使用频率最高的一层
```

### 2.39 Future和Isolate有什么区别？

```
future是异步编程，调用本身立即返回，并在稍后的某个时候执行完成时再获得返回结果。
在普通代码中可以使用await 等待一个异步调用结束。

isolate是并发编程，Dartm有并发时的共享状态，所有Dart代码都在isolate中运行，包括最初的main()。
每个isolate都有它自己的堆内存，意味着其中所有内存数据，包括全局数据，都仅对该isolate可见，
它们之间的通信只能通过传递消息的机制完成，消息则通过端口(port)收发。
isolate只是一个概念，具体取决于如何实现，比如在Dart VM中一个isolate可能会是一个线程，
在Web中可能会是一个Web Worker。
```

### 2.40 什么是Navigator? MaterialApp做了什么？

```
Navigator是在Flutter中负责管理维护页面堆栈的导航器。
MaterialApp在需要的时候，会自动为我们创建Navigator。
Navigator.of(context)，会使用context来向上遍历Element树，
找到MaterialApp提供的_NavigatorState再调用其push/pop方法完成导航操作。
```

## 三 参考

* [掘金—Flutter 面试题整理](https://juejin.cn/post/7067828374344826887)



[1]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-state-life.png
[2]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-render.png
[3]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-thread.png
[4]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-thread-manager.png
[5]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-struct.png