---
title: Android开发之——依赖注入框架Koin(4)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 7718dc49
date: 2025-09-15 08:24:22
---
## 一 概述

```
本文介绍：依赖注入框架Koin相关内容
 -Koin介绍
 -快速上手
 -资源链接
 -示例
```

<!--more-->

## 二 Koin介绍

### 2.1 什么是 Koin

```
1、概念
-Koin 是一个轻量、实用的依赖注入框架，
-用于 Kotlin 和 Kotlin Multiplatform(KMP)项目。 

2、依赖注入
-它提供一个声明式的 DSL（Domain-Specific Language）来定义模块（modules），
在这些模块里你注册依赖项。
-通过类注入或接口注入来获得对象，不依赖反射的重型机制，比较适合移动端／轻量服务端等场景。 

3、平台支持
-支持多平台（包括 Android、iOS、桌面、JavaScript 等）
-使得你可以在共享代码中使用相同的 DI 机制
```

### 2.2 特性摘要

|       特性        |                          描述                           |
| :---------------: | :-----------------------------------------------------: |
|   轻量 / 无反射   |                 减少运行时开销，启动快                  |
| DSL 风格定义依赖  |          模块 + 单例 / 工厂 /作用域等方式注册           |
|    支持多平台     | 单一 API 可用于 Kotlin/JVM、Kotlin/Native、Kotlin/JS 等 |
| Android 支持良好  |    可以与 Android lifecycle、Jetpack Compose 等集成     |
| 插件 & 可视化工具 |      有监控、调试支持，可查看模块结构、依赖关系等       |

## 三 快速上手

### 3.1 添加依赖

```
1、说明
根据项目： Android、Kotlin Multiplatform 或服务端而定，选择合适的模块

2、示例(Android项目build.gradle.kts)
dependencies {
    implementation("io.insert-koin:koin-core:<版本号>")
    implementation("io.insert-koin:koin-android:<版本号>")
    // 如果使用 Jetpack Compose
    implementation("io.insert-koin:koin-androidx-compose:<版本号>")
}
```

### 3.2 定义模块(Module)

```
1、说明
-Koin 中依赖通过“模块（module）”来组织。
-在模块里你声明单例、工厂、作用域等

2、示例
import org.koin.dsl.module

val appModule = module {
    single { MyRepository() }
    factory { MyViewModel(get()) }  // get() 表示注入 MyRepository
}

3、示例说明
single { … }：单例
factory { … }：每次注入都会生成新的对象
```

### 3.3 启动 Koin

```
1、说明
在你的应用启动位置(Android 是 Application 的 onCreate，Kotlin 程序是 main 函数)
初始化 Koin，加载你的模块

2、示例
import org.koin.core.context.startKoin

class MyApplication: Application() {
    override fun onCreate() {
        super.onCreate()
        startKoin {
            androidContext(this@MyApplication)
            modules(appModule /*, 其他模块 */)
        }
    }
}
```

### 3.4 注入/使用依赖

```
1、说明
依赖注入的方式有几种，
比如直接在类中注入、在函数中获取、在 Compose/Android 活动／片段中注入等等。

2、示例(Android ViewModel)
class MyViewModel(private val repo: MyRepository) : ViewModel() {
    // ...
}

// 在 Activity 或 Fragment 中获取 ViewModel
class MyActivity: ComponentActivity() {
    private val viewModel: MyViewModel by viewModel()
    // 或者
    private val repo: MyRepository by inject()
}
```

## 四 资源链接

* [官方库 InsertKoinIO/koin](https://github.com/InsertKoinIO/koin)
* [官方文档—Android Compose](https://insert-koin.io/docs/quickstart/android-compose/)

## 五 示例

### 5.1 示例代码

```
https://github.com/PGzxc/DISamples/tree/main/samples/KoinDemo
```

### 5.2 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-di-koin-demo-4.gif