---
title: Android开发之——nowinAndroid项目build-logic模块(7)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 659d519f
date: 2025-09-26 16:45:17
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下build-logic模块
 -模块剖析:build-logic
 -是 Gradle 构建脚本逻辑的抽取和复用模块
```

<!--more-->

## 二 模块定位

### 2.1 为什么需要 build-logic

```
1、原因
在一个大型多模块项目里(NIA 有几十个模块)，很多 Gradle 配置会重复，比如：
-各模块通用的插件应用（如 Kotlin、Android 插件）
-Lint、代码规范、编译参数配置
-Compose、Hilt、KSP、Room 等库的统一配置
-依赖管理（依赖版本、依赖别名）

如果直接把这些逻辑写在每个模块的 build.gradle.kts 里，会非常冗余，维护困难

2、解决办法
所以 NIA 把这部分“构建逻辑”抽到单独的 build-logic 模块里，
变成 自定义 Gradle 插件，供整个工程复用
```

### 2.2 模块定位

```
-build-logic 是 NiA 项目中的 Gradle 构建逻辑集中管理模块。
-作用：统一管理SDK配置、依赖版本、插件逻辑、测试与质量检查、Compose/Hilt等功能，减少各业务模块的重复配置。
-技术手段：
 Convention Plugins（自定义 Gradle 插件）
 Helper Kotlin 文件（封装配置逻辑）
 Included Build（通过 pluginManagement { includeBuild("build-logic") } 被主项目识别）
```

## 三 文件与目录结构

```
build-logic/
│
├── convention/                 // 核心插件与工具集合
│   ├── build.gradle.kts        // 声明 kotlin-dsl 插件
│   └── src/main/kotlin/com/google/samples/apps/nowinandroid/
│       ├── 【Helper 工具类】       功能封装
│       │   ├── AndroidCompose.kt       // Compose 配置
│       │   ├── AndroidInstrumentedTests.kt // Instrumented Tests 配置
│       │   ├── Badging.kt             // APK/Bundle 打包标记
│       │   ├── GradleManagedDevices.kt // Managed Devices 配置
│       │   ├── Jacoco.kt              // 测试覆盖率配置
│       │   ├── KotlinAndroid.kt       // Kotlin/Android 配置
│       │   ├── NiaFlavor.kt           // Product Flavors 配置
│       │   ├── NiaBuildType.kt        // Build Types 配置
│       │   ├── ProjectExtensions.kt   // Gradle DSL 扩展函数
│       │   └── PrintTestApks.kt       // 输出测试 APK 工具
│       │
│       └── 【Convention Plugins】   按模块/功能划分
│           ├── AndroidApplicationConventionPlugin.kt
│           ├── AndroidApplicationComposeConventionPlugin.kt
│           ├── AndroidApplicationFirebaseConventionPlugin.kt
│           ├── AndroidApplicationFlavorsConventionPlugin.kt
│           ├── AndroidApplicationJacocoConventionPlugin.kt
│           ├── AndroidFeatureConventionPlugin.kt
│           ├── AndroidLibraryConventionPlugin.kt
│           ├── AndroidLibraryComposeConventionPlugin.kt
│           ├── AndroidLibraryJacocoConventionPlugin.kt
│           ├── AndroidRoomConventionPlugin.kt
│           ├── AndroidTestConventionPlugin.kt
│           ├── AndroidLintConventionPlugin.kt
│           ├── HiltConventionPlugin.kt
│           └── JvmLibraryConventionPlugin.kt
```

## 四 分层职责

### 4.1 Helper 工具类(工具方法 / 配置抽象)

1、概念

```
AndroidCompose.kt → Compose 配置（compiler extension、buildFeatures 等）。
AndroidInstrumentedTests.kt → Instrumented test 配置。
Badging.kt → APK/Bundle 打包标记相关。
GradleManagedDevices.kt → Gradle Managed Devices 配置。
Jacoco.kt → 统一 Jacoco 测试覆盖率配置。
KotlinAndroid.kt → Kotlin 编译配置（JVM target、lint、编译选项）。
NiaFlavor.kt → 应用/库的 product flavors 配置。
NiaBuildType.kt → 构建类型（debug/release/staging）。
ProjectExtensions.kt → 项目扩展方法（简化 Gradle DSL 调用）。
PrintTestApks.kt → 输出测试 APK 辅助逻辑。

作用：
-把公共逻辑封装为函数，供插件直接调用
-把常用的、可复用的配置抽象成函数，供插件调用
```

2、表格

|            文件             |                           作用                           |
| :-------------------------: | :------------------------------------------------------: |
|      AndroidCompose.kt      | Compose buildFeatures、compiler extension version 等配置 |
| AndroidInstrumentedTests.kt |                  Instrumented Test 配置                  |
|         Badging.kt          |                   APK/Bundle 打包标记                    |
|   GradleManagedDevices.kt   |               Gradle Managed Devices 配置                |
|          Jacoco.kt          |                      测试覆盖率配置                      |
|      KotlinAndroid.kt       |             Kotlin/Android 编译选项、lint 等             |
|        NiaFlavor.kt         |                   Product Flavors 管理                   |
|       NiaBuildType.kt       |                     Build Types 管理                     |
|    ProjectExtensions.kt     |                   Gradle DSL 扩展函数                    |
|      PrintTestApks.kt       |                    输出测试 APK 辅助                     |

### 4.2 Convention Plugins 层(插件类)

4.2.1 概念

```
1、Application 相关
-AndroidApplicationConventionPlugin.kt → 基础 Application 配置。
-AndroidApplicationComposeConventionPlugin.kt → Application + Compose 支持。
-AndroidApplicationFirebaseConventionPlugin.kt → Firebase 配置（Crashlytics 等）。
-AndroidApplicationFlavorsConventionPlugin.kt → Flavors 配置（调用 NiaFlavor.kt）。
-AndroidApplicationJacocoConventionPlugin.kt → Application + Jacoco 覆盖率。

2、Library / Feature 相关
-AndroidLibraryConventionPlugin.kt → 基础 Library 配置。
-AndroidLibraryComposeConventionPlugin.kt → Library + Compose 支持。
-AndroidLibraryJacocoConventionPlugin.kt → Library + Jacoco 覆盖率。
-AndroidFeatureConventionPlugin.kt → Feature 模块统一配置（依赖 core、Hilt 等）。
-AndroidRoomConventionPlugin.kt → Room 数据库配置。
-JvmLibraryConventionPlugin.kt → 纯 JVM Library 配置（非 Android）。

3、测试 / 质量
-AndroidTestConventionPlugin.kt → 专用测试模块配置。
-AndroidLintConventionPlugin.kt → Lint 检查配置。
-HiltConventionPlugin.kt → Hilt 依赖注入配置。
-Jacoco.kt（helper）+ 各 Jacoco 插件 → 统一测试覆盖率。
```

4.2.2-1、Application 模块相关

|                    插件                    |                         作用                         |
| :----------------------------------------: | :--------------------------------------------------: |
|     AndroidApplicationConventionPlugin     | Application 基础配置（compileSdk、kotlinOptions 等） |
| AndroidApplicationComposeConventionPlugin  |              Application + Compose 支持              |
| AndroidApplicationFirebaseConventionPlugin |             Firebase / Crashlytics 配置              |
| AndroidApplicationFlavorsConventionPlugin  |                 Product Flavors 配置                 |
|  AndroidApplicationJacocoConventionPlugin  |           Application + Jacoco 测试覆盖率            |

4.2.2-2、Library / Feature 模块相关

|                 插件                  |                    作用                    |
| :-----------------------------------: | :----------------------------------------: |
|    AndroidLibraryConventionPlugin     |              Library 基础配置              |
| AndroidLibraryComposeConventionPlugin |           Library + Compose 支持           |
| AndroidLibraryJacocoConventionPlugin  |        Library + Jacoco 测试覆盖率         |
|    AndroidFeatureConventionPlugin     | Feature 模块统一配置（依赖 core、Hilt 等） |
|      AndroidRoomConventionPlugin      |              Room 数据库配置               |
|      JvmLibraryConventionPlugin       |    JVM Library 配置（非 Android 模块）     |

4.2.2-3、 测试 / 质量 / DI

|            插件             |                   作用                    |
| :-------------------------: | :---------------------------------------: |
| AndroidTestConventionPlugin | 测试模块配置（JUnit、instrumented tests） |
| AndroidLintConventionPlugin |             Lint 检查统一配置             |
|    HiltConventionPlugin     |           Hilt 依赖注入统一配置           |

## 五 模块使用示例

### 5.1 示例(feature/news 模块)

```
plugins {
    id("nia.android.feature")
    id("nia.android.library.compose")
}

android {
    namespace = "com.google.samples.apps.nowinandroid.feature.news"
}
```

### 5.2 说明

```
-无需重复：compileSdk、kotlinOptions、composeOptions、Hilt、Jacoco 等都由插件注入。
-模块脚本清晰：只关注 namespace 和模块特有依赖。
```

## 六  总结

```
-减少重复配置：公共配置集中在 build-logic。
-模块简洁可读：业务模块只关注自身特性。
-组合灵活：插件可叠加（Application / Library / Feature / Compose / Jacoco / Hilt）。
-版本一致性：配合 version catalog 管理依赖和插件版本。
-维护方便：改动 plugin / helper 自动影响所有模块。
```

## 七 设计亮点

```
-Helper + Plugin 分层清晰 → 插件专注“模块逻辑”，Helper 封装“功能实现”。
-按模块类型和功能划分插件 → Application / Library / Feature / Test / JVM / Compose / Hilt 等。
-Included Build → 插件解耦主项目，可复用。
-统一依赖版本和构建配置 → 保证整个多模块项目一致性。
-组合性强 → 模块按需选择插件，既统一又灵活。
```

