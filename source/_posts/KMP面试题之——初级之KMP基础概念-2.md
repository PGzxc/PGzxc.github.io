---
title: KMP面试题之——初级之KMP基础概念(2)
categories:
  - 面试相关
  - KMP面试题
tags:
  - KMP面试题
abbrlink: 1e1b16e7
date: 2025-10-14 09:10:10
---
## 一 概述

```
1.什么是 Kotlin Multiplatform？它的核心理念是什么？一套代码，多端共享，平台特化(expect/actual)
2.KMP 与 Flutter、React Native、Compose Multiplatform 的区别？
3.KMP 中 commonMain、androidMain、iosMain 各代表什么？
4.什么是 expect/actual 机制？举例说明
5.shared 模块的作用是什么？常见结构有哪些？
6.KMP 支持哪些平台？
7.Kotlin Native、Kotlin JS、Kotlin JVM 的关系？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 Kotlin Multiplatform

1、什么是 Kotlin Multiplatform

```
Kotlin Multiplatform（简称 KMP）是 JetBrains 推出的 跨平台开发技术，
支持在 Android、iOS、Web、Desktop、Server、IoT 等平台之间共享业务逻辑代码。
```

2、它的核心理念是什么？

```
一套代码，多端共享；
平台特化，按需扩展。
```

3、实现机制

```
commonMain：编写跨平台业务逻辑（数据模型、网络层、仓库逻辑等）。
expect/actual：在不同平台提供差异化实现。
```

4、优势

```
共享核心逻辑，减少重复代码；
可调用原生 SDK，保持平台原生体验；
支持多后端编译(JVM / Native / JS)
```

### 2.2 KMP与其他跨平台区别

1、对比

|       技术方向        |              UI 层              |      共享层      |           编译方式           |      性能表现      |         生态/特点          |
| :-------------------: | :-----------------------------: | :--------------: | :--------------------------: | :----------------: | :------------------------: |
|          KMP          |      原生 UI(XML/SwiftUI)       |   业务逻辑共享   | 源码编译为 JVM / Native / JS |    接近原生性能    |    原生体验、渐进式接入    |
|        Flutter        |          自绘 UI(Skia)          |     全部共享     |       编译为 ARM / x64       | 高性能但非原生控件 |     一致 UI，生态成熟      |
|     React Native      |        原生控件 + JS 桥         |    JS 层共享     |     JS → Bridge → Native     |     有桥接开销     |        JS 生态丰富         |
| Compose Multiplatform | Jetpack Compose UI 框架多端实现 | 可复用 shared 层 |         Kotlin 编译          |  高性能声明式 UI   | Android → iOS → Web 一体化 |

2、总结

```
KMP 聚焦逻辑共享，
Flutter/RN/Compose M 聚焦 UI 跨平台渲染。
```

### 2.3 commonMain、androidMain、iosMain 各代表什么

1、区别

|    模块     |         说明         |                     用途                      |
| :---------: | :------------------: | :-------------------------------------------: |
| commonMain  |     公共逻辑源集     |      平台无关代码(数据类、仓库、算法等)       |
| androidMain | Android 平台特化实现 |    使用 JVM / Android SDK(如 Room、OkHttp)    |
|   iosMain   |   iOS 平台特化实现   | 使用 iOS API(如 NSURLSession、NSUserDefaults) |

2、项目结构示例

```
shared/
 ├─ src/
 │   ├─ commonMain/
 │   │   ├─ kotlin/
 │   │   └─ resources/
 │   ├─ androidMain/
 │   └─ iosMain/
 
 这些源集由 Gradle 管理，确保逻辑复用与平台隔离
```

### 2.4 expect/actual 机制

1、什么是 expect/actual 机制？

```
expect/actual 是 KMP 的核心机制，用于声明平台无关接口（expect）与提供平台特定实现（actual）
```

2、举例说明

```
// commonMain
expect class PlatformInfo() {
    fun getPlatformName(): String
}

// androidMain
actual class PlatformInfo {
    actual fun getPlatformName(): String = "Android"
}

// iosMain
actual class PlatformInfo {
    actual fun getPlatformName(): String = "iOS"
}

运行结果：
Android 输出：Android
iOS 输出：iOS
```

3、用途

```
封装系统差异：文件系统、网络请求、本地存储、日志等；
避免 if-else 平台分支，提高可维护性。
```

### 2.5 shared 模块

1、shared 模块的作用是什么？

```
shared 模块是 KMP 的核心模块，用于存放跨平台共享逻辑。
```

2、常见结构有哪些？

```
shared/
 ├─ build.gradle.kts
 ├─ src/
 │   ├─ commonMain/
 │   │   ├─ model/        # 数据模型
 │   │   ├─ network/      # 网络请求
 │   │   ├─ repository/   # 仓库层
 │   │   ├─ utils/        # 工具类
 │   │   ├─ di/           # 依赖注入 (Koin)
 │   ├─ androidMain/      # Android 特化实现
 │   ├─ iosMain/          # iOS 特化实现
 │   └─ commonTest/       # 通用单测
```

3、功能总结

```
共享逻辑（业务、模型、算法）
通过 expect/actual 与平台交互
输出形式：
 -Android → .aar
 -iOS → .framework
```

### 2.6 KMP 支持哪些平台

1、KMP 支持哪些平台？

```
截至2025年，KMP支持Android(JVM)、iOS(Native)、Desktop(JVM/Native,如Windows/macOS/Linux)、Web(JS/Wasm)、Server(JVM)和嵌入式系统。
稳定性：Android/iOS/Desktop为Stable；Web(Kotlin/JS) 和Wasm为Beta。 
JetBrains持续扩展，如增强WatchOS/TVOS支持。相比早期版本，2025年生态更成熟，许多公司如Netflix采用。
在面试中，常问特定平台兼容性，如iOS interop。
```

2、列表

|     分类     |                    平台                    |
| :----------: | :----------------------------------------: |
|    移动端    |      Android、iOS(ARM64 / Simulator)       |
|    桌面端    | JVM (Windows/macOS/Linux)、Compose Desktop |
|     Web      |           Kotlin/JS、Wasm(Beta)            |
|     后端     |          Ktor Server、Spring Boot          |
| 嵌入式 / IoT |  Kotlin/Native (Linux ARM、Raspberry Pi)   |

3、发展方向

```
官方正重点推进 Compose Multiplatform + KMP 全栈生态融合
```

### 2.7 Kotlin Native、Kotlin JS、Kotlin JVM

1、列表

|   目标平台    |     编译产物      |           使用场景            |
| :-----------: | :---------------: | :---------------------------: |
|  Kotlin/JVM   |    .class/.jar    | Android、Server(Spring、Ktor) |
|   Kotlin/JS   |        .js        |    Web 前端、React Wrapper    |
| Kotlin/Native | .klib/ .framework |   iOS、macOS、Linux、嵌入式   |

3、总结

```
KMP 是一个统一的编译体系：
同一份 Kotlin 源码，可根据目标平台编译为对应后端（JVM/JS/Native）。
```

## 三 总结

|    记忆点    |             含义             |
| :----------: | :--------------------------: |
|   一套代码   |     commonMain 共享逻辑      |
|   多端适配   |    expect/actual 平台特化    |
|   UI 原生    | 不丢失 Android/iOS 原生体验  |
| 性能接近原生 | 无桥接层（编译直达目标平台） |
|  渐进式接入  |      可从逻辑层复用开始      |

