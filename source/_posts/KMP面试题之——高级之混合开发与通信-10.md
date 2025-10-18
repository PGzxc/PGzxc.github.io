---
title: KMP面试题之——高级之混合开发与通信(10)
categories:
  - 面试相关
  - KMP面试题
tags:
  - KMP面试题
abbrlink: 9cc03366
date: 2025-10-18 09:18:45
---
## 一 概述

```
1.Android 如何调用 shared 模块？
2.iOS 如何调用 shared 模块？(Swift 调用 Kotlin Framework)
3.如何桥接 Swift <-> Kotlin 的数据类型？
4.如何共享 business logic 而保留原生 UI？
5.如何调试 shared 模块的 native 崩溃问题？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Android 如何调用 shared 模块

1、面试要点

```
KMP 工程结构、Gradle 配置、依赖方式、Android 集成路径
```

2、解答

```
1、说明
在 Android 中，shared 模块被视为普通的 Gradle Module
（类型：kotlin("multiplatform") + androidTarget()）

2、调用步骤
2-1、settings.gradle.kts
// settings.gradle.kts
include(":androidApp", ":shared")

// androidApp/build.gradle.kts
dependencies {
    implementation(project(":shared"))
}
2-2、在 Android 代码中直接引用
import com.example.shared.*

// 调用 shared 模块逻辑
val result = Greeting().greet()
```

3、重点

```
Android 会编译 shared 模块为 .aar，直接集成到 app module 中；
可以复用 Kotlin 源码、协程、Ktor、SQLDelight 等业务逻辑。
```

### 2.2 iOS 如何调用 shared 模块？

1、面试要点

```
KMP 生成 Framework 的原理、CInterop 桥接机制、Xcode 配置。
```

2、解答

```
1、KMP 构建时会通过 Gradle 的 iosTarget() 生成 .framework：
kotlin {
    ios {
        binaries.framework {
            baseName = "SharedSDK"
        }
    }
}
生成后，在 shared/build/XCFrameworks 中得到 SharedSDK.xcframework，

2、在 Xcode 中添加：
Xcode → General → Frameworks, Libraries, and Embedded Content → Add files…

3、Swift 调用示例：
import SharedSDK

let greeting = Greeting()
print(greeting.greet())
```

3、重点

```
iOS 使用 Kotlin/Native 编译的 LLVM Bitcode Framework；
可自动桥接到 Swift/C 运行时，内部包含 Kotlin Runtime。
```

### 2.3 如何桥接 Swift <-> Kotlin 的数据类型？

1、面试要点

```
类型映射规则、Nullability、集合与异步（Flow/Coroutine）桥接。
```

2、解答

2-1、Kotlin/Native 会自动映射常见类型

|   Kotlin 类型   |       Swift 映射类型        |
| :-------------: | :-------------------------: |
|     String      |           String            |
|   Int, Long     |       Int32, Int64          |
|     Boolean     |            Bool             |
|    List\<T>     | KotlinArray\<T> / NSArray   |
|    Map<K,V>     |        NSDictionary         |
|  Nullable 类型   |          Optional           |

2-2、异步桥接

```
suspend 函数 → Swift 异步闭包 (completionHandler)
Flow<T> 可通过 combineFlow() 或 callbackFlow 适配成 Swift AsyncStream
```

2-3、示例

```
// shared
suspend fun fetchUser(): User

// Swift 调用
shared.fetchUser { user, error in
    if let u = user {
        print(u.name)
    }
}
```

3、技巧

```
为提升可读性，可以在 Kotlin 层定义 “DTO + Mapper” 进行结构体转换，或在 Swift 层写扩展进行轻量封装。
```

### 2.4 如何共享 business logic 而保留原生 UI？

1、面试要点

```
KMP 的架构定位、UI 分层策略（MVVM/MVI）、平台层职责。
```

2、解答：

2-1、KMP 推荐架构：

```
shared ──> ViewModel + UseCase + Repository + Data
androidApp ──> Compose / View XML
iosApp ──> SwiftUI / UIKit
```

2-2、典型实现

```
shared 层：定义 ViewModel、状态流（StateFlow）、业务逻辑。
Android 端：collectAsState() 订阅状态。
iOS 端：通过 Flow.asCommonFlow() 订阅并转为 SwiftUI ObservableObject。
```

2-3、示例

```
1、示例
class MainViewModel {
    private val _state = MutableStateFlow("Loading…")
    val state: StateFlow<String> = _state
}

2、Swift 端绑定：
@ObservedObject var vm = MainViewModelWrapper()

Text(vm.state)
```

3、重点

```
共享的是 “业务逻辑（ViewModel、UseCase）”，
而 UI 层完全原生（Compose + SwiftUI），保证体验一致性与可维护性。
```

### 2.5 如何调试 shared 模块的 native 崩溃问题？

1、面试要点

```
Kotlin/Native 调试难点、符号还原、调试工具链。
```

2、解答

2-1、常见原因

```
NullPointer（因 Swift Optional <-> Kotlin nullable 不匹配）
并发问题（Kotlin/Native 对象冻结）
内存泄漏（未释放 CPointer）
Native 库交互错误（CInterop）
```

2-2、调试手段

```
1、开启 Debug Symbol
ios {
    binaries.framework {
        isStatic = false
        freeCompilerArgs += listOf("-g")
    }
}

2、使用 Xcode 调试
将 shared 的 .framework 以 debug 模式编译。
在 Xcode 运行时可看到 Kotlin 栈追踪（带符号名）。

3、查看 Kotlin/Native 崩溃日志
运行时打印：Uncaught Kotlin exception: kotlin.NullPointerException
可以在 Gradle 中启用：export KONAN_DEBUG=1

4、符号化工具
使用 atos 或 llvm-symbolizer 将 .dSYM 映射回 Kotlin 源码。
```

3、最佳实践

```
在 Kotlin 层 catch 并包装异常（避免直接传到 Swift）。
使用 Kermit 或 Napier 记录跨平台日志。
测试阶段尽量启用 Debug 构建 + 内存泄漏检测
```

## 三 延伸提问

|   方向   |                       示例问题                       |
| :------: | :--------------------------------------------------: |
| 工程架构 | 你们的 shared 模块怎么组织？是否使用 expect/actual？ |
| 性能优化 |            iOS Framework 的体积如何优化？            |
| 类型桥接 |    Swift Optional 与 Kotlin nullable 的坑有哪些？    |
| 崩溃分析 |              如何定位 Native 崩溃堆栈？              |
| 调试实践 |    shared 层如何进行单元测试？是否使用 KMMTest？     |

