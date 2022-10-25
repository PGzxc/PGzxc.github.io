---
title: Android面试题——kotlin相关面试题
categories:
  - 面试相关
  - Android面试
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
12. VMC/MVP/MVVM
13. 项目亮点及难点
14. flutter与安卓通信

<!--more-->

## 二 面试题解答

### 2.1 kotlin协程

1- 协程是我们在 Android 上进行异步编程的推荐解决方案。它的特点包括：

* 轻量
* 内存泄漏更少
* 内置取消支持
* jetpack集成

2- 创建协程

```
// 方法一，使用 runBlocking 顶层函数
runBlocking {
    get(url)
}

// 方法二，自行通过 CoroutineContext 创建一个 CoroutineScope 对象，通过launch开启协程
val coroutineScope = CoroutineScope(context)
coroutineScope.launch {
    get(url)
}

// 方法三，使用 GlobalScope 单例对象,GlobalScope 实际是CoroutineScope的子类,本质是CoroutineScope
GlobalScope.launch {
    get(url)
}

//方法四，使用async开启协程
GlobalScope.async {
      get(url)
}
```

3-协程使用

协程最常用的功能是并发，而并发的典型场景就是多线程。

可以使用 `Dispatchers.IO` 参数把任务切到 IO 线程执行

```
coroutineScope.launch(Dispatchers.IO) {
    ...
}
```

使用`Dispatchers.Main` 切换到主线程

```
coroutineScope.launch(Dispatchers.Main) {
    ...
}
```

4-协程的挂起(suspend)

### 2.2 协程异常处理

* 协程的异常，一般使用`try/catch`或者`runCatching`内置函数来处理
* 协程处理异常的第二个方法是使用`CoroutineExceptionHandler`

### 2.3 kotlin中高阶函数

1-定义

高阶函数定义：参数有函数类型或者返回值是函数类型的函数。

2-高阶函数示例

```
(String, Int) -> Unit
```

3-高阶函数有三种用法

* 双冒号 ::method
* 匿名函数
* Lambda 表达式

4-系统常用的高阶函数

* map
* flatMap
* reduce
* fold
* joinToString
* filter

### 2.4 kotlin中with,run,apply,let函数

1- 基本介绍：

* with：不是T的扩展函数，需要传入对象进去，不能判空，最后一行是返回值。
* run：是T的扩展函数，内部使用this，最后一行是返回值。
* apply：是T的扩展函数，内部使用this，最后一行返回的是自身。
* let：是T的扩展函数，内部使用it，当然可以自定义名称(通过修改lambda表达式参数)，最后一行是返回值。
* also：是T的扩展函数，和let一样内部使用it，最后一行是返回自身。

2- 使用场景

* 用于初始化对象或更改对象属性，可使用apply
* 如果将数据指派给接收对象的属性之前验证对象，可使用also
* 如果将对象进行空检查并访问或修改其属性，可使用let
* 如果想要计算某个值，或者限制多个本地变量的范围，则使用run

3-区别

|  函数   | **是否是扩展函数** | **函数参数(this、it)** | **返回值(调用本身、最后一行)** |
| :-----: | :----------------: | :--------------------: | :----------------------------: |
|  with   |        不是        |          this          |            最后一行            |
|  T.run  |         是         |          this          |            最后一行            |
|  T.let  |         是         |           it           |            最后一行            |
| T.also  |         是         |           it           |            调用本身            |
| T.apply |         是         |          this          |            调用本身            |

### 2.5 [安卓中扫码区域大小(分别率-自定义)][00]

Zxing包中有个类CameraManager，它是来设置扫描框的大小

扫描框框初始化数值

```
 private static  int MIN_FRAME_WIDTH = 240;

  private static  int MIN_FRAME_HEIGHT = 240;

  private static  int MAX_FRAME_WIDTH = 480;

  private static  int MAX_FRAME_HEIGHT = 360;
```

此类里面有个getFramingRect方法用来设置扫描的框的大小，如果要修改扫描框的大小可以在这个方法里修改

### 2.6 多语言适配(多语言占位符)

%s：[字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)类型

%d：整数类型

%f：[浮点](https://so.csdn.net/so/search?q=浮点&spm=1001.2101.3001.7020)数类型

### 2.7 静态代理和动态代理

* 静态代理：由程序创建或者特定工具自动生成源代码，在程序运行前，代理类的.class文件已经存在
* 动态代理：在程序运行时，运用反射机制动态创建而成，无需手动编写代码

### 2.8 Android网络访问框架(Okhttp+retrofit)

OkHttp拦截器链

* RetryAndFollowUpInterceptor拦截器
* BridgeInterceptor拦截器（桥接模式？）
* CacheInterceptor：缓存拦截器
* ConnectInterceptor：连接拦截器，建立可用的连接，是下面拦截器的基础
* CallServerInterceptor：负责将我们的请求写进网络流中，别切会从IO流中读取服务器返回给我们的客户端的数据

### 2.9 Jetpack Compose 组件介绍

Jetpack 是一个丰富的组件库，它的组件库按类别分为 4 类

1-架构（Architecture）

* Data Binding
* Lifecycles
* LiveData
* Navigation
* Paging
* Room
* ViewModel
* WorkManager

2- 界面（UI）

* Animation & Transitions
* Auto,Tv&Wear
* Emoji
* Fragment
* Layout
* Palette

3-行为（behavior）

* Download Manager
* Media&Playback
* Permissions
* Notifications
* Sharing
* Slices

4-基础（foundation）

* AppCompat
* Android KTX
* Multidex
* Test

### 2.10 约束布局(ConstraintLayout)

ConstraintLayout 是一个 ViewGroup，它的出现是为了解决复杂布局时，布局嵌套（布局内的布局）过多的问题（嵌套布局会增加绘制界面所需的时间）。它可以根据同级视图和父布局的约束条件为每个视图定义位置，类似于 RelativeLayout 所有视图都是根据兄弟视图和父级布局之间的关系来布局的，但是与 RelativeLayout 相比，它更加灵活，更易于使用

*  约束布局常用属性
*  参考线（GuideLine）
*  链（Chains）
*  关于view gone

### 2.11 线程中断

* stop
* interrupt
* 标志位

### 2.12 VMC/MVP/MVVM

* MVC（Model-View-Controller）
* MVP（Model-View-Presenter）
* MVVM（Model-View-ViewModel）

### 2.13 项目亮点及难点

结合项目描述

### 2.14 flutter与安卓通信

* MethodChannel
* BasicMessageChannel
* EventChannel



[00]:https://www.lmlphp.com/user/57886/article/item/1661313/