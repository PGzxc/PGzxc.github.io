---
title: Android面试题——kotlin相关面试题
categories:
  - 面试相关
  - Android面试题
tags:
  - Kotlin
abbrlink: b0d4b11c
date: 2022-10-25 17:55:08
---
## 一 面试主要知识点
1. kotlin协程
2. 协程异常处理
3. kotlin中高阶函数
4. kotlin中with,run,apply,let函数
5. 安卓中扫码区域大小(分别率-自定义)
6. 多语言适配(多语言占位符)
7. 静态代理和动态代理
8. Android网络访问框架(Okhttp+retrofit)
9. Jetpack Compose 组件介绍
10. 约束布局
11. 线程中断
12. MVC/MVP/MVVM/MVI
13. 项目亮点及难点
14. flutter与安卓通信

<!--more-->

## 二 面试题解答

### 2.1 kotlin协程

```
Kotlin 协程是 Kotlin 中用于进行异步编程的一个重要特性，它让我们能够更简洁、易读地编写并发代码。
这些问题是 Kotlin 协程的基础理解，
面试时可能会考察对这些概念的掌握以及如何在 Android 应用中实际使用协程进行异步任务管理。
```

1-Kotlin 协程的基础概念是什么？

```
协程是轻量级的线程，它能够在单线程中执行异步操作，并且比传统线程更节省资源。
协程可以挂起、恢复执行，不会阻塞线程。
```

2-如何启动一个协程？

```
使用 launch 或 async 函数来启动协程，
launch 用于启动一个没有返回值的协程，async 用于启动一个返回 Deferred 对象的协程。

示例：
GlobalScope.launch {
    // 协程代码
}
```

3-什么是 `suspend` 函数？

```
suspend 关键字标记一个函数为协程可挂起的函数，即可以在协程中暂停执行，等待某些任务完成后再继续执行。
示例：
suspend fun fetchData(): String {
    delay(1000) // 挂起当前协程，模拟网络请求
    return "Data"
}
```

4-`launch` 和 `async` 的区别？

```
launch 返回一个 Job，用于控制协程的生命周期，不返回任何值。
async 返回一个 Deferred 对象，可以通过 await() 获取协程的结果
```

5-什么是 `GlobalScope`？

```
GlobalScope 是一个顶级的协程作用域，适合启动不需要与特定生命周期绑定的协程。
但通常建议使用 CoroutineScope 来避免内存泄漏。
```

6-如何在协程中处理异常？

```
可以使用 try-catch 块来捕获协程中的异常，
或者使用 CoroutineExceptionHandler 来处理未捕获的异常。
```

7-什么是 `Dispatchers`？

```
Dispatchers 决定了协程在哪个线程上执行。
常见的调度器有：
-Dispatchers.Main: 在主线程执行
-Dispatchers.IO: 用于执行 I/O 操作
-Dispatchers.Default: 用于 CPU 密集型任务
```

8-如何使用 `withContext` 切换协程上下文？

```
withContext 用于在协程内切换到不同的 Dispatcher，适用于需要在协程中进行线程切换的情况
示例：
withContext(Dispatchers.IO) {
    // 在 IO 线程中执行网络请求
}

```

9-Kotlin 协程中的 `delay` 和 `Thread.sleep` 有什么区别？

```
delay 是挂起函数，它不会阻塞线程，只会暂停协程的执行；
而 Thread.sleep 会阻塞当前线程。
```


### 2.2 协程异常处理

```
* 协程的异常，一般使用`try/catch`或者`runCatching`内置函数来处理
* 协程处理异常的第二个方法是使用`CoroutineExceptionHandler`： 可以用于全局处理未捕获的异常
```

### 2.3 kotlin中高阶函数

1-定义

```
高阶函数定义：参数有函数类型或者返回值是函数类型的函数。
```

2-高阶函数示例

```
(String, Int) -> Unit
```

3-高阶函数有三种用法

```
* 双冒号 ::method
* 匿名函数
* Lambda 表达式
```

4-系统常用的高阶函数

```
* map
* flatMap
* reduce
* fold
* joinToString
* filter
```

### 2.4 kotlin中with,run,apply,let函数

1-示例讲解

```
在Kotlin中，with、run、apply 和let是常见的作用域函数（Scope Functions），用于简化对象操作，提高代码可读性。
它们的主要区别如下：

1. with
-作用：对同一对象执行多个操作，不返回对象本身，而是返回 lambda 表达式的结果。
-返回值：lambda 表达式的执行结果。
-适用场景：不需要返回对象本身，只是对对象进行一系列操作时。
-示例
val person = Person("Tom", 25)
val result = with(person) {
    println(name)
    println(age)
    "完成"
}
println(result)  // 输出："完成"

2. run
-作用：类似 with，但它是对象的扩展函数，返回 lambda 表达式的结果。
-返回值：lambda 表达式的执行结果。
-适用场景：当需要在对象作用域内执行代码并返回计算结果时。
-示例
val person = Person("Tom", 25)
val result = person.run {
    println(name)
    println(age)
    "完成"
}
println(result)  // 输出："完成"

3. apply
-作用：用于初始化或修改对象，返回对象本身，通常用于对象配置。
-返回值：对象本身。
-适用场景：当需要在对象上调用多个 setter 方法并返回对象本身时。
-示例
val person = Person().apply {
    name = "Tom"
    age = 25
}
println(person)  // person 对象已被修改

4. let
-作用：适用于非空对象操作，可以避免 NullPointerException，并返回 lambda 结果。
-返回值：lambda 表达式的执行结果。
-适用场景：常用于可空对象的安全调用或者链式调用。
-示例
val name: String? = "Tom"
name?.let {
    println("名字长度: ${it.length}")
}
// 避免了空指针异常
```

表格

| 函数  | 是否是扩展函数 |   返回值    |       适用场景       |
| :---: | :------------: | :---------: | :------------------: |
| with  |       否       | Lambda 结果 | 操作对象但不返回自身 |
|  run  |       是       | Lambda 结果 |  计算结果或链式调用  |
| apply |       是       |  对象本身   |   初始化或修改对象   |
|  let  |       是       | Lambda 结果 |     可空对象操作     |

1- 基本介绍：

```
* with：不是T的扩展函数，需要传入对象进去，不能判空，最后一行是返回值。
* run：是T的扩展函数，内部使用this，最后一行是返回值。
* apply：是T的扩展函数，内部使用this，最后一行返回的是自身。
* let：是T的扩展函数，内部使用it，当然可以自定义名称(通过修改lambda表达式参数)，最后一行是返回值。
* also：是T的扩展函数，和let一样内部使用it，最后一行是返回自身。
```

2- 使用场景

```
* 用于初始化对象或更改对象属性，可使用apply
* 如果将数据指派给接收对象的属性之前验证对象，可使用also
* 如果将对象进行空检查并访问或修改其属性，可使用let
* 如果想要计算某个值，或者限制多个本地变量的范围，则使用run
```

3-区别

|  函数   | **是否是扩展函数** | **函数参数(this、it)** | **返回值(调用本身、最后一行)** |
| :-----: | :----------------: | :--------------------: | :----------------------------: |
|  with   |        不是        |          this          |            最后一行            |
|  T.run  |         是         |          this          |            最后一行            |
|  T.let  |         是         |           it           |            最后一行            |
| T.also  |         是         |           it           |            调用本身            |
| T.apply |         是         |          this          |            调用本身            |

### 2.5 安卓中扫码区域大小(分别率-自定义)

```
Android面试中关于扫码区域自定义的问题，核心在于考察你对 ViewFinderView 的理解和使用。 
你需要展现你能够通过修改布局参数或自定义 ViewFinderView (绘制边框、控制大小和位置) 来实现对扫码区域的控制。
记住要提及扫描区域大小与用户体验和性能之间的平衡。 

简洁的回答可以是: 
"可以通过自定义ViewFinderView，在其onDraw方法中绘制矩形框来定义扫码区域的大小和位置，并在布局文件中引用它。
需要考虑用户体验，过大或过小都会影响易用性。"
```

### 2.6 多语言适配(多语言占位符)

```
%s：字符串类型
%d：整数类型
%f：浮点数类型
```

### 2.7 静态代理和动态代理

```
* 静态代理：由程序创建或者特定工具自动生成源代码，在程序运行前，代理类的.class文件已经存在
* 动态代理：在程序运行时，运用反射机制动态创建而成，无需手动编写代码
```

### 2.8 [Android网络访问框架(Okhttp+retrofit)][01]

```
Android网络访问框架OkHttp和Retrofit的结合使用，考察你对这两个库的理解和它们如何协同工作。
面试官可能想了解你如何使用Retrofit构建网络请求接口，
OkHttp作为底层网络引擎处理请求，以及你对拦截器、缓存等功能的熟悉程度。

一个简短的回答可以是：
"Retrofit基于OkHttp构建网络请求，提供简洁的接口定义和注解，方便构建网络请求。
OkHttp负责底层网络通信，提供诸如拦截器、连接池、缓存等功能，提高网络请求效率和稳定性。"


OkHttp拦截器链
* RetryAndFollowUpInterceptor：重试和失败定向拦截器，会创建StreamAllocation对象，用来传递给后面的拦截器
* BridgeInterceptor：桥接和适配拦截器
* CacheInterceptor：缓存拦截器
* ConnectInterceptor：连接拦截器，建立可用的连接，是下面拦截器的基础
* CallServerInterceptor：负责将我们的请求写进网络流中，别切会从IO流中读取服务器返回给我们的客户端的数据
```

### 2.9 Jetpack Compose 组件介绍

```
Jetpack Compose 提供了丰富的组件来构建用户界面。这些组件可以大致分为以下几类：

1.基础组件 (Basic Components): 这些是构建其他更复杂组件的基础。
* Text: 显示文本。 可以自定义样式、颜色、字体等。
* Image: 显示图片。 支持各种图片格式和加载方式（例如 Coil 或 Glide）。
* Icon: 显示图标，通常来自资源文件。
* Button: 按钮组件，用于用户交互。 可以自定义样式和点击事件。
* Box: 一个容器，其子组件会堆叠在一起。 可以设置对齐方式和修饰符。
* Spacer: 用于在布局中添加空白空间。

2.布局组件 (Layout Components): 这些组件用于组织和排列其他组件。
* Column: 垂直排列子组件。
* Row: 水平排列子组件。
* Box: 允许子组件重叠。
* ConstraintLayout: 提供更灵活的布局方式，类似于传统的ConstraintLayout。
* LazyColumn: 用于高效显示长列表，只渲染可见的项。
* LazyRow: 用于高效显示水平长列表，只渲染可见的项。
* Scaffold: 提供一个标准的应用结构，包含AppBar、底部导航栏等。

3.Material Design组件: 这些组件遵循 Material Design 指南，提供一致的用户体验。
* Card: 卡片组件，用于展示信息块。
* TextField: 文本输入框。
* OutlinedTextField: 带边框的文本输入框。
* DropdownMenu: 下拉菜单。
* BottomNavigation: 底部导航栏。
* TopAppBar: 顶部应用栏。
* Snackbar: 用于显示简短的消息。
* AlertDialog: 对话框。
* ProgressIndicator: 进度指示器。

4.其他组件:
*Modifier: 用于修改组件的属性，例如 padding、size、background 等。 这是 Compose 的核心概念之一。
*remember: 用于在 Compose 的 recomposition 过程中保存状态。
*LaunchedEffect: 用于在 Compose 中启动协程。
```

### 2.10 约束布局(ConstraintLayout)

```
ConstraintLayout 是一个 ViewGroup，
它的出现是为了解决复杂布局时，布局嵌套（布局内的布局）过多的问题（嵌套布局会增加绘制界面所需的时间）。
它可以根据同级视图和父布局的约束条件为每个视图定义位置，
类似于 RelativeLayout 所有视图都是根据兄弟视图和父级布局之间的关系来布局的，
但是与 RelativeLayout 相比，它更加灵活，更易于使用

*  约束布局常用属性
*  参考线（GuideLine）
*  链（Chains）
*  关于view gone
```

### 2.11 线程中断

```
* stop
* interrupt
* 标志位
```

### 2.12 MVC/MVP/MVVM/MVI

1- MVC（Model-View-Controller）

```
MVC 是最早期的架构模式之一，将应用分为三部分：Model、View 和 Controller。
Model：负责应用的数据和业务逻辑。它不依赖于视图，独立处理数据和业务逻辑。
View：负责显示 UI，通常是 Activity 或 Fragment，直接与用户交互。
Controller：负责协调 Model 和 View 之间的交互，监听用户输入并更新 View。

优点：
简单直观，易于理解。
适用于小型应用。

缺点：
随着应用复杂度的增加，Controller 可能变得庞大且难以维护。
View 和 Controller 紧密耦合，不利于单元测试。

适用场景：适合小型应用或简单的界面交互。
```

2-MVP（Model-View-Presenter）

```
MVP是对 MVC 的改进，强调将 UI 逻辑与视图和模型分离。它将应用分为三部分：Model、View 和 Presenter。
Model：负责数据和业务逻辑。
View：负责 UI 显示，通常是 Activity 或 Fragment。
Presenter：负责处理业务逻辑，将数据从 Model 层传递给 View，并决定如何更新 UI。

优点：
更好的解耦，Presenter 和 View 通过接口进行交互，便于测试。
易于单元测试，因为 View 和 Presenter 分开

缺点：
对于简单应用，Presenter 可能显得过于复杂。
对于每个界面都需要创建 Presenter，增加了开发成本。

适用场景：适合中等复杂度的应用，尤其是需要清晰分离 UI 和逻辑的场景。
```

3-MVVM（Model-View-ViewModel）

```
MVVM 通过引入ViewModel层来解耦视图和模型，它适合与现代的UI构建框架（如Jetpack Compose和DataBinding）一起使用。
Model：包含数据和业务逻辑。
View：负责 UI 显示，通常是 Activity 或 Fragment。
ViewModel：负责准备和管理 UI 所需的数据，并通过 LiveData、StateFlow 等与 View 层进行交互。它不直接操作 UI，而是通过数据绑定更新 UI。

优点：
数据驱动的 UI 使得状态管理更加简洁。
ViewModel 层可以方便地与 UI 数据进行绑定。
适用于现代 Android 开发，尤其是与 Jetpack 组件（如 LiveData 和 ViewModel）结合使用。

缺点：
初学者可能对数据绑定和 ViewModel 的概念有一定难度。
在某些简单应用中，MVVM 可能显得过于复杂。

适用场景：适合中到大型应用，尤其是需要响应式 UI 和数据绑定的场景。
```

4-MVI（Model-View-Intent）

```
MVI 是一种响应式架构模式，基于单向数据流。它将应用的状态管理和 UI 更新通过 Intent 和 Model 之间的交互进行处理。
Model：包含应用的状态和数据。
View：负责 UI 显示。
Intent：代表用户的意图或动作，通常是 UI 事件（例如按钮点击）。

优点：
单向数据流，易于管理和调试。
每个状态变更都是明确的，UI 是根据当前状态重新渲染的。
适合复杂的 UI 和频繁变化的状态。

缺点：
对于简单应用，MVI 可能显得过于复杂。
对响应式编程有较高要求，学习曲线较陡。

适用场景：适合具有复杂 UI 状态和业务逻辑的应用，特别是需要频繁更新 UI 的应用。
```

5-总结

```
MVC 适合小型应用，但随着应用的复杂度增加，控制器可能变得难以维护。
MVP 适用于中型应用，强调视图和业务逻辑的分离，易于测试。
MVVM 适用于现代 Android 开发，特别是与 Jetpack 组件结合使用，适合需要响应式 UI 的应用。
MVI 强调单向数据流，适合复杂的 UI 状态管理和响应式编程。
```

### 2.13 项目亮点及难点

```
项目亮点
1.性能优化
2.模块化开发
3.响应式 UI
4.多语言支持
5.复杂功能实现
6.无障碍支持

项目难点：
1.性能瓶颈问题
2.内存泄漏
3.复杂网络请求和数据同步
4.跨平台适配
5.复杂的第三方 SDK 集成
6.并发和线程管理
```

### 2.14 flutter与安卓通信

```
* MethodChannel
* BasicMessageChannel
* EventChannel
```



[00]:https://www.lmlphp.com/user/57886/article/item/1661313/
[01]:https://developer.aliyun.com/article/1047840
[02]:https://www.jianshu.com/p/3f456edae550
[03]:http://events.jianshu.io/p/d3be141d5244