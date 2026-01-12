---
title: KMP开发之——开发工具与插件及项目创建-1
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: c9043622
date: 2026-01-12 10:01:10
---
## 一 概述

```
Kotlin Multiplatform(KMP)是 JetBrains 官方推出的跨平台解决方案
-允许我们用 Kotlin 共享业务逻辑，
-同时保留 各平台原生 UI 与能力。

本篇从 开发环境 → 插件 → 项目创建 → 目录结构 开始介绍。
```

<!--more-->

## 二 KMP 能解决什么问题？

### 2.1 KMP 的定位

|                 能做                 |                        不能做                        |
| :----------------------------------: | :--------------------------------------------------: |
| 共享业务逻辑(网络、数据、状态、算法) | 不能“一套 UI 跑所有端”(除非用 Compose Multiplatform) |
|  支持 Android / iOS / Desktop / Web  |             iOS UI 仍需 SwiftUI / UIKit              |
|             官方长期维护             |          不追求 Flutter 那种“100% UI 统一”           |

### 2.2 适合人群

```
Android / Kotlin 开发者
追求「业务共享 + 原生体验」
已有 iOS 团队、但想减少重复逻辑
```

## 三 开发工具准备

### 3.1 基础工具清单(必装)

1-Android Studio(推荐)

```
1-版本：Android Studio Hedgehog / Iguana / 最新稳定版

2-原因：
-官方 KMP 支持最好
-Gradle / Kotlin / Android 调试一体化
-iOS Framework 构建也能完成

3-说明：
IntelliJ IDEA 也可以，但 Android Studio 更适合 KMP 实战。
```

### 3.2 Xcode(macOS 必须)

```
1-最低版本：Xcode 14+

2-用途：
-iOS 真机 / 模拟器调试
-SwiftUI / UIKit UI
-CocoaPods / Swift Package Manager

3-说明：
Windows 无法进行 iOS 编译(KMP 本身支持，但 iOS 工具链不支持)
```

### 3.3 JDK

```
1-推荐版本：JDK 17

2-原因：
-Android Gradle Plugin 8.x 要求
-Kotlin 1.9+ 兼容性最佳`
```

## 四 Kotlin & Gradle 版本建议

### 4.1 Kotlin & Gradle版本

|  组件  | 推荐  |
| :----: | :---: |
| Kotlin | 1.9.x |
|  AGP   |  8.x  |
| Gradle |  8.x  |

### 4.2 原则

```
Kotlin ≈ Compose ≈ AGP 版本要匹配
不追新 RC / Beta
```

## 五 KMP 必装插件

在 **Android Studio → Settings → Plugins** 中确认以下插件：

### 5.1 Kotlin Multiplatform(通常已内置)

```
提供：
-androidTarget()
-iosX64 / iosArm64 / iosSimulatorArm64
-expect / actual 支持
```

### 5.2 Kotlin 插件(JetBrains 官方)

```
Kotlin 代码高亮
Multiplatform 语法检查
Gradle Kotlin DSL 支持
```

### 5.3 Compose Multiplatform(可选)

```
如果你计划使用 Compose 跨端 UI：
-Android / Desktop / Web 复用 UI
-iOS 仍属于实验阶段
```

## 六 创建 KMP 项目(官方推荐方式)

### 6.1 方式一：Android Studio 向导(推荐)

1-Step 1：New Project

```
File → New → New Project
```

2-Step 2：选择模板

```
Kotlin Multiplatform App
```

3-Step 3：配置项目

|    配置项    |                 示例                  |
| :----------: | :-----------------------------------: |
| Project Name |                KmpDemo                |
|   Package    |            com.example.kmp            |
|  Platforms   |             Android + iOS             |
|      UI      | Android(Compose / View)，iOS(SwiftUI) |

4-完成后自动生成：

```
Android App
iOS App
shared 模块
```

### 6.2 方式二：KMP Wizard(进阶)

1-官网：

```
https://kmp.jetbrains.com/
```

2-适合：

```
-Desktop / Web / Wasm
-高度定制 Target
-生成最小化结构
```

## 七 项目结构详解

创建完成后，核心结构如下

```
KmpDemo
├── androidApp
├── iosApp
└── shared
    ├── src
    │   ├── commonMain
    │   ├── commonTest
    │   ├── androidMain
    │   ├── iosMain
    │   └── ...
```

### 7.1 shared 模块(KMP 核心)

```
1-commonMain(真正的“共享层”)
shared/src/commonMain/kotlin

2-放什么
-网络请求(Ktor)
-Repository
-UseCase
-ViewModel(非 Android ViewModel)
-业务状态

3-代码
class Greeting {
    fun greet(): String = "Hello KMP"
}
```

### 7.2 平台源码目录

1-目录

|    目录     |       作用       |
| :---------: | :--------------: |
| androidMain | Android 特有实现 |
|   iosMain   |   iOS 特有实现   |
| desktopMain |     Desktop      |
|   webMain   |       Web        |

2-用于：

```
expect / actual
平台 API(文件、时间、设备信息)
```

### 7.3 androidApp

```
1-正常 Android 工程

2-可用：
-Compose
-View
-Hilt
-Room(Android only)
```

### 7.4 iosApp

```
1.Swift / SwiftUI
2.通过 shared.framework 调用 KMP 代码：
Greeting().greet()
```

## 八 Gradle 关键配置示例

### 8.1 shared/build.gradle.kts

```
kotlin {
    androidTarget()
    iosX64()
    iosArm64()
    iosSimulatorArm64()

    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-core:2.3.3")
            }
        }
    }
}
```

## 九 新手常见坑(必看)

### 9.1 直接在 commonMain 用 Android API

```
解决：expect / actual
```

### 9.2 iOS 编译报错

```
检查：
-Xcode 是否打开过一次 iosApp
-是否选择了正确模拟器
```

### 9.3 Kotlin / Gradle 版本冲突

```
原则：
-不混用 RC
-查 Compose / AGP 对应表
```

## 十 小结

```
本篇你已经掌握：

KMP 的定位与适用场景
开发工具与插件完整清单
官方推荐的项目创建方式
shared 模块与目录结构理解
Gradle 核心配置思路
```

