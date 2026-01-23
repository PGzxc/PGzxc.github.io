---
title: 项目最新实践和应用——Android项目最新框架1
categories:
  - 开发
  - U-项目实践
  - Android项目
tags:
  - Android
abbrlink: 8869339e
date: 2025-08-25 09:41:21
---
## 一 概述

```
方便学习最新技术和架构，本文列举了Android 最新开发框架、生态方案和代码示例
```

<!--more-->

## 二 最新开发框架

### 2.1 UI 层：Jetpack Compose

1、概念

```
框架：Jetpack Compose（声明式 UI，Google 官方推荐，逐步替代 XML UI）
关键特性：响应式编程、Material 3 支持、Compose Multiplatform
```

2、示例

* [Now in Android (Google 官方示例)](https://github.com/android/nowinandroid)
* [JetNews (Compose 官方示例)](https://github.com/android/compose-samples/tree/main/JetNews)

### 2.2 架构层：MVVM + MVI

1、概念

```
框架：
Android Jetpack Architecture Components
（ViewModel、LiveData、Room、DataStore、Paging 3）

MVI 框架推荐：
Mavericks（Airbnb 出品，支持 Compose）、Orbit MVI
```

2、示例

* [Now in Android](https://github.com/android/nowinandroid) → 使用 **MVVM + Kotlin Flows**
* [Mavericks Sample](https://github.com/airbnb/mavericks/tree/master/sample)

### 2.3  依赖注入：Hilt / Koin

1、概念

```
框架：
 Hilt（Google 官方基于 Dagger 的依赖注入库）
 Koin（轻量级 Kotlin DSL 依赖注入库）
```

2、示例

* [Now in Android → Hilt](https://github.com/android/nowinandroid)
* [Koin Android Example](https://github.com/InsertKoinIO/koin-samples)

### 2.4 网络与数据：Retrofit + Ktor + GraphQL

1、概念

```
框架：
 Retrofit + OkHttp（经典组合）
 Ktor Client（Kotlin Multiplatform 网络库，Compose Multiplatform 友好）
 Apollo GraphQL（GraphQL Android/Multiplatform）
```

2、示例

* [Ktor Client Sample](https://github.com/ktorio/ktor-samples)
* [Apollo GraphQL Android Example](https://github.com/apollographql/apollo-kotlin/tree/main/tests)

### 2.5 数据存储：Room + DataStore + SQLDelight

1、概念

```
框架：
 Room（Jetpack ORM）
 DataStore（替代 SharedPreferences，支持 Proto 数据）
 SQLDelight（KMP 跨平台数据库）
```

2、示例

* [Now in Android → Room + DataStore](https://github.com/android/nowinandroid)
* [SQLDelight Example](https://github.com/cashapp/sqldelight/tree/master/samples)

### 2.6 并发：Kotlin Coroutines + Flow

1、概念

```
框架：
Kotlin Coroutines（异步任务）、
StateFlow / SharedFlow（状态管理）
```

2、示例

* [Now in Android → 使用 Flow 管理状态](https://github.com/android/nowinandroid)
* [Kotlin Coroutines Sample](https://github.com/Kotlin/kotlinx.coroutines/tree/master/kotlinx-coroutines-core/jvm/test/guide)

### 2.7  跨平台：KMP + Compose Multiplatform

1、概念

```
框架：
 Kotlin Multiplatform (KMP)（共享业务逻辑）
 Compose Multiplatform（共享 UI，桌面/iOS/Android）
```

2、示例

* [PeopleInSpace (KMP + Compose)](https://github.com/joreilly/PeopleInSpace)
* [KaMPKit (KMP 模板)](https://github.com/touchlab/KaMPKit)

### 2.8 其他前沿框架

```
图像加载：Coil 3（支持 Compose & KMP）
异步任务调度：WorkManager
UI Navigation：Navigation-Compose
媒体播放：ExoPlayer 2/3
现代设计：Material3 + MotionLayout (Compose 支持)
```

## 三 推荐组合（2025 Android 项目最佳实践）

```
1、如果要做一个新项目，可以选用：
 UI：Compose + Material3
 架构：MVVM (ViewModel + Flow + StateFlow)
 依赖注入：Hilt / Koin
 网络：Retrofit + OkHttp（或 Ktor）
 数据：Room + DataStore
 并发：Coroutines + Flow
 跨平台（可选）：KMP + Compose Multiplatform
```

