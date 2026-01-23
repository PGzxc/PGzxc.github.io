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

1. Dart中 ?? 与 ??= 的区别
2. flutter中Widget、Element、RenderObject、Layer都有什么关系？
3. 简述state的生命周期
4. 简述flutter中自定义View流程？
5. flutter_boost的优缺点，内部实现<!--more-->
6. flutter的渲染机制
7. flutter和native的优缺点
8. flutter支不支持 120hz
9. 多线程怎么处理
10. flutter中大图片上传
11. flutter butild 方法中的 BuildContext 具体是什么东西
12. flutter 打包成web 移动端桌面端的过程是怎么样的
13. dart是弱引用还是强引用
14. get set方法实现
15. 简述Flutter 的热重载
16. Dart 的作用域
17. Dart 当中的 「 .. 」表示什么意思？
18. Dart 是不是单线程模型？是如何运行的？
19. Dart 是如何实现多任务并行的？
20. 说一下 mixin机制？
21. 介绍下Flutter的FrameWork层和Engine层，以及它们的作用
22. 简述Flutter的线程管理模型
23. 介绍下Flutter的理念架构
24.  Future和Isolate有什么区别？
25. 什么是Navigator? MaterialApp做了什么？

## 二  面试题解答(仅供参考)

### 2.1  Dart中 ?? 与 ??= 的区别

```
A??B
左边如果为空返回右边的值，否则不处理。
A??=B
左边如果为空把B的值赋值给A

------------------------------------------------------------------
在 Dart 语言中，?? 和 ??= 都是用于处理空值的操作符，但它们的作用和使用方式有所不同。
1  ?? (空合并运算符)

1.1 作用：
-?? 运算符用于在表达式为空时提供一个默认值。
-如果 ?? 左侧的表达式不为空，则返回左侧表达式的值。
-如果 ?? 左侧的表达式为空，则返回右侧表达式的值。

1.2 示例
String? name;
String displayName = name ?? 'Guest'; // 如果 name 为空，则 displayName 的值为 'Guest'
print(displayName); // 输出：Guest

String? anotherName = 'Alice';
String anotherDisplayName = anotherName ?? 'Guest'; // anotherName 不为空，则 anotherDisplayName 的值为 'Alice'
print(anotherDisplayName); // 输出：Alice

2 ??= (空赋值运算符)

2.1 作用：
-??= 运算符用于在变量为空时为其赋值。
-如果 ??= 左侧的变量为空，则将右侧表达式的值赋给该变量。
-如果 ??= 左侧的变量不为空，则保持原值不变。

2.2 示例
String? message;
message ??= 'Hello'; // message 为空，则 message 的值为 'Hello'
print(message); // 输出：Hello

String? anotherMessage = 'World';
anotherMessage ??= 'Hello'; // anotherMessage 不为空，则保持原值不变
print(anotherMessage); // 输出：World

3.主要区别总结：
-?? 运算符用于返回一个值，而 ??= 运算符用于为变量赋值。
-?? 运算符不会修改左侧表达式的值，而 ??= 运算符可能会修改左侧变量的值。
-?? 运算符通常用于提供默认值，而 ??= 运算符通常用于初始化变量。

4.简单来说：
-?? 就像一个“备选方案”，当左边的值为空时，就用右边的值。
-??= 就像一个“懒加载”，当变量为空时，才为其赋值
```

### 2.2 flutter中Widget、Element、RenderObject、Layer都有什么关系？

```
在Flutter中，Widget、Element、RenderObject和Layer是构建UI的核心概念，
它们之间存在着紧密的联系，共同协作完成组件的渲染。

1.Widget（组件）：
1.1 定义：
-Widget是Flutter UI的基本构建块，它描述了UI的配置信息，包括布局、样式和交互等。
-Widget是不可变的，这意味着它们的属性在创建后不能更改。

1.2 作用：
-Widget提供了一种声明式的方式来描述UI，使得UI构建更加简洁和直观。
-Widget树是Flutter应用UI的配置描述，它由开发者构建，使用Dart代码描述UI的结构和属性

2.Element（元素）：

2.1定义：
-Element是Widget在UI树中的实例化，它负责管理Widget的生命周期和更新。
-Element持有Widget和RenderObject的引用，并维护它们之间的关联。

2.2 作用：
-Element是Widget和RenderObject之间的桥梁，它负责协调Widget的配置信息和RenderObject的渲染逻辑。
-Element树是Widget树的实例化，它由Flutter框架根据Widget树构建。

3. RenderObject（渲染对象）：
3.1定义：
-RenderObject是负责实际布局和绘制的对象，它知道如何将UI元素绘制到屏幕上。
-RenderObject树是由RenderObject对象组成的树，它负责实际的UI布局和绘制操作。

3.2作用：
-RenderObject负责计算UI元素的大小和位置，并将其绘制到屏幕上。
-RenderObject使用Skia图形引擎进行绘制，Skia是一种高性能的2D图形库。

4. Layer（图层）：
4.1定义：
-Layer是RenderObject绘制的最终结果，它表示屏幕上的一个绘制区域。
-Layer树是由Layer对象组成的树，它表示屏幕上的所有绘制区域。

4.2作用：
-Layer负责将RenderObject的绘制结果合成到屏幕上。
-Layer可以用于实现复杂的视觉效果，例如透明度、遮罩和动画。

5.它们之间的关系：
-Widget树是UI的配置，Element树是Widget的实例化，
RenderObject树是UI的实际绘制，Layer树是最终的屏幕绘制。

-当Widget树发生变化时，Flutter框架会更新Element树。
-Element树的变化会触发RenderObject树的更新，最终将UI呈现在屏幕上。
-RenderObject通过Layer将绘制结果，最终在屏幕上显示出来

6.简单来说：
-Widget就像是UI的“设计图”，它描述了UI的结构和样式。
-Element就像是“施工队”，它负责根据Widget的“设计图”来构建实际的UI。
-RenderObject就像是“画家”，它负责将UI元素绘制到屏幕上。
-Layer就像是“画布”，它负责将所有的UI元素组合起来，最终显示在屏幕上。
```

### 2.3 简述state的生命周期

1-图示

![][1]

2-内容

```
在 Flutter 中，State 对象的生命周期是指它从创建到销毁的整个过程，
它对于管理 StatefulWidget 的状态和更新 UI 至关重要。


1.以下是 State 对象的生命周期方法：
1.1 createState()：
-这是 StatefulWidget 创建 State 对象时调用的第一个方法。
-它用于创建与 StatefulWidget 关联的 State 对象。

1.2 initState()：
-这是 State 对象初始化时调用的方法。
-它用于执行初始化操作，例如初始化变量、订阅事件或启动动画。
-在这个方法中调用 context 时，仅能调用当前widget的context。

1.3 didChangeDependencies()：
-当 State 对象依赖的 InheritedWidget 发生更改时调用。
-它用于处理依赖项更改，例如从 InheritedWidget 中获取数据。
-在 initState() 方法之后也会立即调用。

1.4 build()：
-这是构建 UI 时调用的方法。
-它用于根据 State 对象的状态返回一个 Widget 树。
-当 State 对象的状态更改时，会重新调用此方法。

1.5 didUpdateWidget()：
-当 StatefulWidget 的配置（即 widget 属性）发生更改时调用。
-它用于处理 Widget 配置更新，例如比较新旧配置并执行相应的更新操作。

1.6 setState()：
-这是一个用于更新 State 对象状态的方法。
-当调用此方法时，Flutter 框架会重新调用 build() 方法，以更新 UI。

1.7 deactivate()：
-当 State 对象从 Widget 树中移除时调用。
-它用于执行清理操作，例如取消订阅事件或停止动画。

1.8 dispose()：
-当 State 对象被永久移除时调用。
-它用于释放 State 对象占用的资源，例如关闭流或释放内存。

2.简而言之：

State 对象的生命周期方法提供了一种机制，用于管理 StatefulWidget 的状态和更新 UI。
通过合理地使用这些方法，可以构建出高效且响应迅速的 Flutter 应用程序。
```

### 2.4 简述flutter中自定义View流程？

```
1-已有控件（widget）的继承，组合
2-自定义绘制widget,也就是利用paint，cavans等进行绘制视图。
```

### 2.5 flutter_boost的优缺点，内部实现

```
Flutter Boost 是一个由阿里巴巴开发的 Flutter 框架扩展，
旨在为 Flutter 应用提供多页面、多路由的支持，类似于原生应用的多Activity或者多ViewController 的概念。
以下是 Flutter Boost 的优缺点以及内部实现的一些特点：

1.优点：

1.1-多页面支持： 
Flutter Boost 允许在一个 Flutter 应用中使用多个页面和路由，
这使得开发者可以更灵活地组织应用结构，实现更复杂的应用场景。

1.2-原生集成： 
Flutter Boost提供了与原生代码的无缝集成，可以在原生应用中嵌入Flutter页面，
并且可以方便地与原生代码进行通信和交互。

1.3-性能优化： 
Flutter Boost 的内部实现对于性能进行了优化，使得在多页面场景下 Flutter 应用的性能表现更为稳定。

1.4-组件复用：
Flutter Boost 支持 Flutter 页面的复用，可以在不同的原生页面中加载同一个 Flutter 页面，提高了开发效率。

2.缺点：

2.1-学习成本： 
Flutter Boost 的使用相对复杂，需要对 Flutter 框架有一定的了解，
并且需要学习其与原生代码的交互方式，对于新手来说学习成本较高。

2.2-维护困难： 在使用多页面的情况下，应用的状态管理和页面之间的通信会变得更加复杂，增加了应用的维护难度。
2.3-依赖性： 
Flutter Boost是阿里巴巴开发的第三方框架，对于某些项目可能存在依赖性的问题，需要考虑其对项目的长期维护和支持

3.内部实现：

Flutter Boost 的内部实现基于 Flutter 的原生页面路由，它主要包含以下几个核心组件：

1-FlutterBoost: 这是整个框架的入口，负责管理和控制不同 Flutter 页面的跳转和生命周期管理。
2-FlutterBoostApp: 这是 Flutter 应用的主入口，负责初始化 Flutter 引擎，并与原生代码进行交互。
3-BoostNavigator: 
这是用于管理多个Flutter页面的导航器，负责页面的压栈、出栈等操作，类似于Flutter中的 Navigator。

4-BoostContainer: 
这是一个 Flutter Widget，用于承载其他 Flutter 页面的内容，
每个 BoostContainer 对应一个 Flutter 页面，可以在原生应用中被嵌入和展示。

5-BoostChannel: 
这是用于Flutter与原生代码通信的渠道，可以实现双向通信，Flutter可以调用原生方法，原生也可以调用Flutter方法。

通过这些组件的配合，Flutter Boost 实现了在原生应用中嵌入 Flutter 页面，
并且支持多页面、多路由的功能，使得 Flutter 应用在原生应用中的集成和使用更加灵活和便捷
```

### 2.6 flutter的渲染机制

1-图示

![][2]

2-说明

```
Flutter 的渲染机制是一个复杂但高效的过程，它确保了应用程序能够以每秒 60 帧或更高的帧率渲染 UI。
以下是对 Flutter 渲染机制的详细描述：

1. 三棵树的构建与关联：

1.1 Widget 树：
-这是开发者通过 Dart 代码构建的 UI 组件树，描述了 UI 的结构和配置。
-Widget 本身是不可变的，它只是 UI 的一个描述。

1.2 Element 树：
-Element 树是 Widget 树的实例化，它维护了 Widget 的生命周期和更新。
-Element 对象持有对 Widget 和 RenderObject 的引用。

1.3 Render 树：
-Render 树是由 RenderObject 对象组成的树，它负责实际的布局和绘制。
-RenderObject 对象知道如何将 UI 元素绘制到屏幕上。

1.4 关联：
-Flutter 框架根据 Widget 树构建 Element 树，然后由 Element 树创建并管理 Render 树。
-这三棵树之间存在着紧密的关联，Widget 树的变化会触发 Element 树和 Render 树的更新。

2. 布局（Layout）：
-Render 树中的每个 RenderObject 对象都会参与布局过程。
-布局过程会计算每个 RenderObject 对象的大小和位置，以确定它们在屏幕上的显示方式。
-Flutter 使用高效的布局算法，以确保 UI 的快速渲染。

3. 绘制（Painting）：
-布局完成后，Render 树中的每个 RenderObject 对象都会被绘制到屏幕上。
-Flutter 使用 Skia 图形引擎进行绘制，Skia 是一种高性能的 2D 图形库。
-Skia 能够在不同的平台上提供一致的绘制效果。

4. 合成（Compositing）：
-在绘制完成后，Flutter 会将各个 RenderObject 对象的绘制结果合成为最终的 UI 图像。
-合成过程会处理透明度、遮罩和其他视觉效果

5. 栅格化（Rasterization）：
-最终的UI图像会被栅格化，转换成像素数据。
-栅格化后的像素数据会被提交给GPU进行渲染

6. 渲染（Rendering）：
-GPU 将像素数据渲染到屏幕上。
-Flutter 能够以每秒 60 帧或更高的帧率渲染 UI，从而提供流畅的用户体验。

2核心技术：

2.1Skia：
-Flutter 使用 Skia 作为其 2D 图形渲染引擎。
-Skia 能够在不同的平台上提供一致的渲染效果，并具有高性能。

2.2 Dart：
-Flutter 使用 Dart 语言进行开发。
-Dart 具有高性能和快速的编译速度，这使得 Flutter 能够实现快速的 UI 渲染。

3.总结：

Flutter 通过构建和管理 Widget 树、Element 树和 Render 树，
并结合 Skia 图形引擎和 Dart 语言，实现了高效且一致的组件渲染。
```

### 2.7 flutter和native的优缺点

```
Flutter 和 Native（Android/iOS 开发）各有优缺点，适合不同的项目场景。
让我们从多个维度来对比一下

1. 开发效率
1.1 Flutter：
-优点：一套代码，多端运行，避免重复开发，极大提高效率。
-优点：支持 Hot Reload，代码修改后能立即看到效果，调试效率高。
-缺点：项目初期需要适应新的开发方式，学习 Dart 语言。

1.2 Native：
-优点：开发工具成熟（Android Studio、Xcode），直接使用平台原生能力。
-缺点：Android 和 iOS 需要各自开发，代码复用率低，开发周期更长。

2. 性能
2.1 Flutter：
-优点：接近原生性能，使用 Skia 渲染引擎，直接绘制 UI，避免原生视图嵌套带来的性能损耗。
-缺点：由于 Dart VM 需要启动和桥接原生代码，首次启动速度略慢（冷启动优化难度较高）。
-缺点：在涉及复杂的原生交互时（如蓝牙、传感器等），
需要用平台通道（Platform Channel）桥接原生代码，增加一定复杂度。

2.2 Native：
-优点：性能最佳，无额外的桥接层，适合对性能要求极高的场景（如游戏、图像处理等）。
-缺点：部分场景下，复杂 UI 会有更长的开发周期。

3. UI/设计
3.1 Flutter：
-优点：拥有完全自绘的渲染机制，可以自定义各类 UI 组件，且界面在各平台表现一致。
-优点：提供了 Material Design（Android 风格）和 Cupertino（iOS 风格）组件库，能快速构建跨平台界面。
-缺点：想要完全模拟原生控件的外观和交互，可能需要大量自定义工作。

3.2 Native：
-优点：直接使用原生控件，界面更符合系统的交互习惯。
-缺点：两端 UI 需要分别开发，代码复用率低。

4. 生态与第三方库
4.1 Flutter：
-优点：生态发展非常快，pub.dev 上有大量插件。
-缺点：部分三方库稳定性不如原生库，遇到平台相关的功能（如蓝牙、传感器），可能需要写原生代码桥接。

4.2 Native：
-优点：生态非常成熟，几乎所有的硬件功能和第三方库都可以直接使用。
-缺点：在多平台项目中，可能需要维护多套依赖管理方案（如 Android 的 Gradle、iOS 的 CocoaPods）。

5. 团队协作与招聘
5.1 Flutter：
-优点：团队只需要一个跨平台开发者就能同时开发 Android 和 iOS，大幅降低人力成本。
-缺点：Flutter 开发者相对较少，高级开发者难招。

5.2 Native：
-优点：开发者多，技术栈成熟，容易招聘人才。
-缺点：需要Android 和 iOS 分别招聘开发者，人力成本较高。

6. 项目适用场景
6.1 Flutter 适合：
-启动速度快、开发效率要求高的场景（如 MVP、快速迭代的项目）。
-跨平台项目、动态化需求强的项目。
-UI 个性化要求高、需要自定义组件的场景。

6.2 Native 适合：
-性能要求极致的场景（如大型游戏、相机、视频剪辑等）。
-强依赖原生能力、硬件交互的项目（如蓝牙、传感器、地图导航等）。
-项目已有成熟的原生代码库或团队时，继续用原生开发更合适。

总结
Flutter 优势：开发效率高、跨平台、UI 表现一致。
Flutter 劣势：初期学习成本高、部分场景性能略逊于原生、原生交互需要通过桥接层完成。
Native 优势：性能最佳、原生交互直接调用，生态成熟。
Native 劣势：开发效率低、需要分别开发 Android 和 iOS，维护成本较高。

如果项目对性能要求极致，选择 Native；
如果想要快速上线、降低开发成本、保持 UI 一致性，那 Flutter 绝对是最佳选择
```

### 2.8 flutter支不支持 120hz

```
Flutter 支持 120Hz 刷新率，但具体支持情况和实现方式需要考虑以下几个方面：

1. 硬件支持：
-首先，设备本身必须支持 120Hz 刷新率。
-大多数高端 Android 和 iOS 设备都支持 120Hz 刷新率。

2. Flutter 引擎：
-Flutter 引擎本身支持高刷新率。
-Flutter 的 UI 设计为每秒渲染 60 帧（fps），或者在支持 120Hz 更新的设备上为 120 帧。
-这意味着，大约每 16ms，UI 就会更新以反映动画或 UI 的其他更改。

3. 操作系统：
-操作系统需要正确地将 Flutter 应用程序的渲染结果以 120Hz 的刷新率显示在屏幕上。
-在 iOS 上，Flutter 可以以达到 120 hz 的刷新率进行渲染。
-在 Android 上，情况可能更复杂，因为不同 OEM 厂商的设备可能存在差异。

4. 应用程序优化：

-即使设备和 Flutter 引擎都支持 120Hz，应用程序本身也需要进行优化，以确保能够以 120fps 的帧率渲染 UI。
-这包括避免复杂的布局和绘制操作，以及使用高效的动画和过渡效果。

5.总结：
-Flutter 本身是支持高刷新率的。
-但实际应用中，还需要考虑设备硬件，操作系统本身，以及应用程序的优化。
-因此，为了确保 Flutter 应用程序能够以 120Hz 的刷新率运行，开发者需要进行充分的测试和优化。
```

### 2.9 多线程怎么处理

```
在 Flutter 中处理多线程任务的主要方式是使用异步编程模型。
Flutter 提供了一系列的异步处理工具，其中最常用的是 Future、async 和 await 关键字，以及 Isolate。
```

### 2.10 flutter中大图片上传

```
在 Flutter 中上传大图片通常涉及以下几个步骤：

1-选择图片： 
使用 Flutter 的 image_picker 插件或类似的库来实现从相册或相机中选择图片的功能。
这些插件提供了方便的 API，允许用户选择图片并返回图片的文件路径或字节数据。

2-压缩图片： 
由于大图片可能会占用较多的内存和网络带宽，建议在上传之前对图片进行压缩处理，以减小图片的尺寸和文件大小。
你可以使用 Flutter 中的 flutter_image_compress 插件或类似的库来实现图片的压缩操作。

3-上传图片： 
上传图片通常涉及将图片数据发送到服务器端，你可以使用Flutter的 http 插件或其他网络请求库来实现图片上传功能。
在上传图片之前，确保你已经获得了图片的文件路径或字节数据，并且在请求中将图片数据正确地包装和发送给服务器
```

### 2.11 flutter butild 方法中的 BuildContext 具体是什么东西

```
在 Flutter 中，BuildContext 是非常核心的概念，
它代表了一个 Widget 在 Widget 树中的位置和与其他 Widget 的关系。
具体来说，BuildContext 是一个指向当前 Widget 的环境对象，
它使得你可以访问与该 Widget 相关联的各种上下文信息。

1. BuildContext 是什么？
1.1 Widget 树中的定位：
每个 Widget 都有一个对应的 BuildContext，它描述了该 Widget 在 Widget 树中的位置。
通过 BuildContext，你可以访问 Widget 树中的其他 Widget 或者获取一些全局的信息（例如主题、路由等）。

1.2 上下文传递：
BuildContext 是 Flutter 中传递信息的桥梁，它可以被用来获取当前 Widget 所在的上下文信息。

2. BuildContext 的主要作用
2.1 获取祖先 Widget 的信息
2.2 访问 Widget 树中的信息
2.3 传递状态

3. BuildContext 作为 Widget 构建的一部分
-在 build() 方法中，BuildContext 作为参数传入，用来在该 Widget 的构建过程中访问其他 Widget 或其状态。
-build() 方法中的 BuildContext 是不可变的，即使 Widget 状态更新后，BuildContext 仍保持不变。
-每当 Widget 树发生变化时，build() 方法都会被调用，并且 BuildContext 会提供当前 Widget 树的状态

4. 常见用法
4.1 获取当前 Widget 的父级 Widget
4.2 导航与路由管理
4.3 通过 Scaffold 显示 Snackbar 或 Dialog
4.4 获取屏幕尺寸、媒体信息

5. 小结
-BuildContext 是 Flutter 中每个 Widget 的上下文环境，
它代表了该 Widget 在 Widget 树中的位置，帮助你访问当前上下文信息。
-它提供了对祖先 Widget、InheritedWidget、路由、状态等的访问方式。
-通过 BuildContext，你可以进行页面跳转、状态传递、获取布局信息等。
```

### 2.12 flutter 打包成web、 移动端、桌面端的过程是怎么样的

```
Flutter 允许将应用打包成多平台应用，
包括 Web、移动端（Android、iOS）和桌面端（Windows、macOS、Linux）。
每个平台有不同的打包和发布流程，下面是针对这些平台的打包过程。

1. 移动端打包（Android & iOS）

1.1 Android 打包过程：

1.1.1 准备：
-确保已经安装了 Android Studio 和相关的 Android SDK。
-需要配置好 Flutter 和 Dart 环境，以及 Android 模拟器或真机。

1.1.2 构建 APK 或 AAB（Android App Bundle）
-生成 APK：flutter build apk --release
-生成 AAB（推荐发布到 Google Play Store）:flutter build appbundle --release
-生成的 APK 或 AAB 会存放在 build/app/outputs/flutter-apk/
或 build/app/outputs/bundle/release/ 目录下。

1.1.3 发布到 Google Play Store：
打包完 APK 或 AAB 后，可以通过 Google Play Console 上传并发布应用。

1.2 iOS 打包过程：
1.2.1 准备：
-需要安装 Xcode 和相关的 iOS 开发环境。
-配置好证书、描述文件和 App ID 等。

1.2.2 构建 IPA 文件
-生成发布版本:flutter build ios --release
-你也可以使用 Xcode 生成 .ipa 文件：
flutter build ios
open ios/Runner.xcworkspace
-在 Xcode 中，选择 "Generic iOS Device"，然后使用 "Archive" 来生成 .ipa 文件。

1.2.3 发布到 App Store
生成的 .ipa 文件可以通过 Xcode 或 Apple 提供的 Transporter 工具上传到 App Store

2. Web 打包过程

2.1 准备：
-确保 Flutter 环境已安装并支持 Web（Flutter 2.x 及以上版本）。
-确保在 flutter config 中启用了 web 平台。

2.2 构建 Web 应用
-使用以下命令生成 Web 版本的应用：flutter build web
-这将生成一个 build/web/ 文件夹，里面包含了所有静态文件（HTML、CSS、JS）

2.3 部署到 Web 服务器
你可以将 build/web/ 文件夹中的内容上传到任意的 Web 服务器，如：
-Firebase Hosting
-Netlify
-GitHub Pages
-自己的服务器

3. 桌面端打包过程（Windows、macOS、Linux）

3.1 Windows 打包过程
3.1.1 准备：
-确保已经安装了 Visual Studio 和相关的 Windows 开发环境
3.1.2 构建 Windows 应用：
-使用以下命令生成 Windows 平台的可执行文件:flutter build windows
-这将生成一个 build/windows/ 文件夹，其中包含了 .exe 可执行文件
3.1.3 发布到 Windows
生成的 .exe 文件可以直接分发，或者打包成安装包（如使用 Inno Setup 或其他打包工具）。

3.2 macOS 打包过程
3.2.1 准备：
-确保安装了 macOS 和 Xcode 开发环境。
3.2.2 构建 macOS 应用
-使用以下命令生成 macOS 平台的可执行文件：flutter build macos
-这将生成一个 .app 文件在 build/macos/ 文件夹中
3.2.3 发布到 Mac App Store
将 .app 文件上传到 App Store，可以通过 Xcode 实现

3.3 Linux 打包过程：
3.3.1 准备：
-确保安装了 Linux 的开发环境（如 GCC、make 等）
3.3.2 构建 Linux 应用
-使用以下命令生成 Linux 平台的可执行文件：flutter build linux
-生成的可执行文件将位于 build/linux/ 目录
3.3.3 发布到 Linux 系统
可直接通过 .deb、.tar.gz 等格式进行分发，或者打包成应用商店（如 Snap 或 Flatpak）进行发布

4. 统一打包流程
4.1 平台选择：根据需要选择目标平台（Web、Android、iOS、Windows、macOS、Linux）。
4.2 构建命令：使用 Flutter 的构建命令生成对应平台的应用
-flutter build apk / flutter build appbundle：用于 Android。
-flutter build ios：用于 iOS。
-flutter build web：用于 Web。
-flutter build windows / flutter build macos / flutter build linux：用于桌面平台。

4.3 发布：完成构建后，按照各平台的发布流程进行上传或分发。


5.总结
-Flutter 支持多平台打包，
通过平台特定的命令可以为 Android、iOS、Web 和桌面（Windows/macOS/Linux）构建和发布应用。
-跨平台优势：一次代码，打包多个平台，减少开发和维护成本。
-注意事项：不同平台的打包和发布方式有所不同，确保根据每个平台的要求进行配置和优化。

这样，你就可以使用 Flutter 快速构建并发布一个跨平台的应用了
```

### 2.13 dart是弱引用还是强引用

```
强引用
```

### 2.14 get set方法实现

```
在 Dart 中，通常使用类的实例变量（成员变量）来存储对象的状态。
如果你想要对这些变量进行读取和设置，可以使用 Dart 中的 getter 和 setter 方法
```

### 2.15 简述Flutter 的热重载

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

### 2.16 Dart 的作用域

```
Dart 没有 「public」「private」等关键字，默认就是公开的，私有变量使用下划线 _开头。
```

### 2.17 Dart 当中的 「 .. 」表示什么意思？

```
Dart 当中的 「..」意思是 「级联操作符」，为了方便配置而使用。
「..」和「.」不同的是 调用「..」后返回的相当于是 this，而「.」返回的则是该方法返回的值 
```

### 2.18 Dart 是不是单线程模型？是如何运行的？

Dart 是单线程模型，运行的的流程如下图。

![][3]

运行说明

```
Dart 确实是单线程模型，但它通过事件循环（Event Loop）和 Isolate 来实现并发和异步操作，
使得开发者能够编写高效、响应迅速的应用程序。

1.Dart 的运行方式

1.1 单线程执行：
-Dart 代码在一个单一的执行线程中运行，这意味着在任何给定时间，只有一个代码块在执行。
-这种模型简化了并发编程，避免了多线程编程中常见的锁和竞态条件等问题。

1.2 事件循环（Event Loop）：
-Dart 使用事件循环来管理异步操作和事件。
-事件循环是一个无限循环，它不断地从事件队列中取出事件并执行相应的回调函数。
-事件队列包含来自各种来源的事件，例如 I/O 操作、定时器和用户交互。
-事件循环确保了异步操作的有序执行，避免了阻塞主线程。

1.3 异步操作：
-Dart 提供了 Future 和 Stream 类，用于表示异步操作的结果。
-Future 表示一个可能在将来完成的异步操作，并返回一个结果。
-Stream 表示一个异步的数据序列，可以随着时间的推移发出多个数据事件。
-async 和 await 关键字用于简化异步代码的编写。

1.4 微任务队列（Microtask Queue）：
-除了事件队列，Dart 还有一个微任务队列。
-微任务队列中的任务优先级高于事件队列中的任务。
-微任务通常用于执行短期的、高优先级的操作，例如 Promise 回调。

1.5 Isolate：
-虽然 Dart 是单线程的，但它提供了 Isolate 来实现并发。
-Isolate 是一个独立的执行单元，它有自己的内存空间和事件循环。
-Isolate 之间通过消息传递进行通信。
-Isolate 适用于执行 CPU 密集型任务或需要并行处理的场景。

2 总结：
-Dart 的单线程模型通过事件循环和 Isolate 实现了高效的并发和异步操作。
-事件循环确保了异步操作的有序执行，避免了阻塞主线程，
-而 Isolate 则提供了并发执行 Dart 代码的能力，适用于需要并行处理的场景。
```

### 2.19 Dart 是如何实现多任务并行的？

```
Dart 实现多任务并行主要依赖于 Isolate 和 异步编程（async/await） 两种机制。
Dart 是单线程的，但是通过这些机制，它能够在不阻塞主线程的情况下实现多任务并行执行
```

### 2.20 说一下 mixin机制？

```
Mixin 是 Dart 中一种用于代码复用的机制，它允许你将一个类的行为（方法和属性）混入到另一个类中。
使用 mixin 可以避免传统单继承模式中的一些问题，如无法共享多个类的功能。
with 关键字用于将一个或多个 mixin 应用到类中，允许类获得 mixin 中定义的功能
```

### 2.21 介绍下Flutter的FrameWork层和Engine层，以及它们的作用
```
Flutter 框架可以分为 Framework 层和 Engine 层，它们在 Flutter 应用的构建和运行中扮演着不同的角色

1.Framework 层

1.1 作用：
-Framework 层是使用 Dart 语言编写的，它为开发者提供了构建 Flutter 应用所需的各种工具和组件。
-它包括 Widget 库、渲染管道、手势识别、动画等功能。
-开发者主要与 Framework 层交互，通过组合和定制各种 Widget 来构建用户界面。

1.2 主要组成部分：
-Widgets: Flutter UI 的基本构建块，它描述了 UI 的结构和配置。
-Rendering: 一个抽象的布局层，它将 Widget 描述转换为可以在屏幕上绘制的 RenderObject 树。
-Material 和 Cupertino: 提供了遵循 Material Design 和 iOS 设计规范的 Widget 库。

1.3 特点：
-使用 Dart 语言编写，易于学习和使用。
-提供了丰富的 Widget 库，支持快速构建美观、流畅的用户界面。
-具有高度的可定制性，允许开发者创建独特的 UI 效果。

2.Engine 层
2.1 作用：
-Engine 层是使用 C/C++ 语言编写的，它负责 Flutter 应用的底层渲染和 Dart 运行时环境。
-它包括 Skia 图形引擎、Dart 运行时、文本排版引擎等。
-Engine 层提供了高性能的渲染能力，确保 Flutter 应用在不同平台上具有一致的性能和外观。

2.2 主要组成部分：
-Skia: 一个 2D 图形渲染引擎，用于绘制 UI 元素。
-Dart Runtime: 负责执行 Dart 代码。
-libtxt: 一个文本排版引擎，用于处理文本的显示。

2.3 特点：
-使用 C/C++ 语言编写，具有高性能。
-通过 Skia 图形引擎实现跨平台渲染，确保 UI 在不同平台上的一致性。
-提供了 Dart 运行时环境，支持 Dart 代码的执行。

3.Framework 层和 Engine 层的关系
-Framework 层构建在 Engine 层之上，通过调用 Engine 层的 API 来实现 UI 的渲染和 Dart 代码的执行。
-Framework 层负责 UI 的逻辑和布局，而 Engine 层负责 UI 的实际绘制。
-这种分层设计使得 Flutter 既具有高性能，又具有高度的灵活性和可定制性
```

### 2.22 简述Flutter的线程管理模型

1-图示

![][4]

2-说明

```
Flutter 的线程管理模型基于 Dart 的单线程执行模型，但通过事件循环和 Isolate 提供了并发和异步操作的能力。
以下是 Flutter 线程管理模型的主要特点：

1. 单线程执行：
-Flutter 应用的 Dart 代码主要在一个单一的 UI 线程（也称为主线程）中执行。
-这意味着 UI 渲染、事件处理和 Dart 代码的执行都在同一个线程中进行。

2. 事件循环（Event Loop）：
-Flutter 使用事件循环来管理异步操作和事件。
-事件循环是一个无限循环，它不断地从事件队列中取出事件并执行相应的回调函数。
-事件队列包含来自各种来源的事件，例如用户交互、网络请求、定时器等。
-事件循环确保了异步操作的有序执行，避免了阻塞主线程，从而保持 UI 的流畅性和响应性。

3. Isolate：
-虽然 Dart 是单线程的，但它提供了 Isolate 来实现并发。
-Isolate 是一个独立的执行单元，它有自己的内存空间和事件循环。
-Isolate 之间通过消息传递进行通信。
-Isolate 适用于执行 CPU 密集型任务或需要并行处理的场景，例如图像处理、数据分析等。

4. Future 和 async/await：
-Flutter 使用 Future 和 async/await 关键字来处理异步操作。
-Future 表示一个可能在将来完成的异步操作，并返回一个结果。
-async/await 关键字简化了异步代码的编写，使其看起来像同步代码

总结：
Flutter 的线程管理模型通过单线程和事件循环实现了高效的异步操作，保持了 UI 的流畅性和响应性。
Isolate 提供了并发执行 Dart 代码的能力，适用于需要并行处理的场景。
Flutter的线程模型与javascript的线程模型类似，是单线程模型。
```

### 2.23 介绍下Flutter的理念架构

1-图示

![][5]

2-说明

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

### 2.24 Future和Isolate有什么区别？

```
在 Dart 中，Future 和 Isolate 都用于处理异步操作，但它们在实现方式和适用场景上有所不同。
以下是 Future 和 Isolate 之间的主要区别：

1. 执行环境：
1.1 Future：
-Future 在同一个 Isolate（即主线程）中执行。
-它通过事件循环（Event Loop）来管理异步操作，避免阻塞主线程。

1.2 Isolate：
-Isolate 是一个独立的执行单元，拥有自己的内存空间和事件循环。
-它在后台线程中执行，与主线程并行运行。

2. 并发性：
2.1 Future：
-Future 实现了异步操作，但不是真正的并行。
-它允许在等待 I/O 操作或其他异步任务完成时，继续执行其他代码。

2.2 Isolate：
-Isolate 实现了真正的并行计算。
-它允许在后台线程中执行 CPU 密集型任务，充分利用多核 CPU 的性能。

3. 通信方式：
3.1 Future：
-Future 不需要显式的通信机制，可以直接在同一个 Isolate 中访问和修改变量。

3.2 Isolate：
-Isolate 之间通过消息传递（Message Passing）进行通信。
-这增加了代码的复杂性，但也避免了多线程编程中常见的共享内存问题。

4. 适用场景：
4.1 Future：
-适用于 I/O 操作，例如网络请求、文件读写等。
-适用于不需要长时间计算的异步任务。
-在Flutter 框架中，大部分的异步操作都是使用Future 完成的。

4.2 Isolate：
-适用于 CPU 密集型任务，例如图像处理、数据分析、复杂的数学计算等。
-适用于需要并行处理的任务。

总结：
-Future 用于处理异步 I/O 操作，避免阻塞主线程。
-Isolate 用于实现真正的并行计算，充分利用多核 CPU 的性能
```

总结

|   特性   |                    Future                     |                          Isolate                          |
| :------: | :-------------------------------------------: | :-------------------------------------------------------: |
|   目的   | 适用于异步 I/O 操作，如网络请求、文件读取等。 |           适用于并行计算，执行 CPU 密集型任务。           |
| 线程模型 | 运行在主线程（事件循环）中，依赖于异步编程。  |   每个 `Isolate` 拥有自己的线程和内存，支持真正的并行。   |
|   内存   |  共享内存，多个 `Future` 共享主线程的内存。   |             独立内存，每个 `Isolate` 互不干扰             |
|   性能   |  更适合处理 I/O 密集型任务，避免阻塞主线程。  |          更适合处理 CPU 密集型任务，能提高性能。          |
|   通信   |    通过 `async/await` 和事件队列处理结果。    |      通过 `SendPort` 和 `ReceivePort` 实现消息传递。      |
|   并发   |   通过事件循环异步执行，但不是真正的并行。    | 支持真正的并行计算，每个 `Isolate` 可以在不同核心上运行。 |

### 2.25 什么是Navigator? MaterialApp做了什么？

```
Navigator是在Flutter中负责管理维护页面堆栈的导航器。
MaterialApp在需要的时候，会自动为我们创建Navigator。
Navigator.of(context)，会使用context来向上遍历Element树，
找到MaterialApp提供的_NavigatorState再调用其push/pop方法完成导航操作。
```

## 三 参考

* [掘金—Flutter 面试题整理](https://juejin.cn/post/7067828374344826887)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-state-life.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-render.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-thread.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-thread-manager.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-interview-2-struct.png