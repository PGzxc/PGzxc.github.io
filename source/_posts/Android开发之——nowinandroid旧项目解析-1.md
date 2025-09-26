---
title: Android开发之——nowinandroid旧项目解析(1)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 8afca71b
date: 2025-08-05 09:27:53
---
## 一 概述

```
nowinandroid 是 Google 官方推出的 Android 应用项目，
用作 Jetpack Compose + 现代 Android 技术栈实践的 示范性开源项目，
定位是一个完整的真实世界应用(Real-world app showcase)，
旨在展示如何构建可扩展、模块化、可测试、现代化的 Android 应用。
项目地址(GitHub)： https://github.com/android/nowinandroid
```

<!--more-->

## 二 项目结构总览

### 2.1 说明

```
项目采用 模块化架构(Modularization)，各层职责清晰划分
```

### 2.2 部分模块

|    模块     |                             说明                             |
| :---------: | :----------------------------------------------------------: |
|     app     |                      应用入口，启动模块                      |
|    core     |      核心通用模块，如数据库、网络、UI、测试、数据模型等      |
|  feature-*  | 每个 feature 都是独立模块，如 `feature-interests`, `feature-bookmarks` |
|    sync     |                      跨模块数据同步管理                      |
|  benchmark  |                       性能基准测试模块                       |
| build-logic | 构建脚本逻辑模块，封装了统一构建配置(如 compose、hilt 插件应用) |

## 三  核心技术栈汇总

|    领域    |                        使用技术                         |
| :--------: | :-----------------------------------------------------: |
|     UI     |                Jetpack Compose,Material3                |
|     DI     |                          Hilt                           |
|  状态管理  |                     StateFlow,Flow                      |
|    架构    |      MVVM + Clean Architecture(数据-领域-UI层分离)      |
|  路由导航  |                   Navigation Compose                    |
|    异步    |                    Kotlin Coroutines                    |
| 数据持久化 |                    Room + DataStore                     |
|  网络请求  |                Ktor(早期版本用 Retrofit)                |
|    测试    |   JUnit, Robolectric, UI Test, Gradle managed device    |
|   多语言   |          国际化支持(`strings.xml`、资源模块化)          |
| Benchmark  |                     Macrobenchmark                      |
|    构建    | Gradle + Kotlin DSL，使用 build-logic 统一管理插件/配置 |
|  同步策略  |          定时后台同步(SyncWorkManager + Hilt)           |

## 四 关键模块说明

### 4.1 `core` 系列

```
- core-data：数据仓库层，连接本地数据库、远程 API。
- core-database：Room 实现的数据库模块。
- core-network：网络层，当前用 Ktor 客户端封装 API。
- core-model：模型类，如 UserData, NewsResource 等，commonMain 共享。
- core-ui：通用 UI 组件，如 Loading、Empty、Error 状态视图等。
- core-testing：测试辅助工具类。
- core-analytics：封装 firebase 或日志打点。
- core-sync：数据同步策略模块。
```

### 4.2 `feature-*` 系列

```
1、说明
每个feature模块都是一个完整的 UI +ViewModel+use case+数据层 的实现，便于独立测试与开发。

2、例如：
-feature-interests
-feature-bookmarks
-feature-articles
-feature-settings
```

### 4.3 sync

```
一个统一的后台同步模块，负责从服务器同步数据，配合 WorkManager、CoroutineWorker。
```

## 五 构建依赖与插件分析

### 5.1 build-logic

```
1、使用了自定义构建逻辑插件

plugins {
    id("nowinandroid.android.library")
    id("nowinandroid.android.hilt")
    id("nowinandroid.android.feature")
    ...
}

2、插件封装于 build-logic 模块中，简化每个模块的 build.gradle.kts 配置。
采用 版本目录管理：
versionCatalogs {
    create("libs") {
        from(files("../gradle/libs.versions.toml"))
    }
}
```

### 5.2 libs.versions.toml 示例

```
[versions]
kotlin = "1.9.10"
hilt = "2.48"
compose = "1.5.0"
ktor = "2.3.3"

[libraries]
kotlinx-coroutines-core = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlin" }
androidx-hilt-navigation-compose = { module = "androidx.hilt:hilt-navigation-compose", version = "1.0.0" }
...
```

## 六 测试覆盖策略

|   类型    |                    内容                     |
| :-------: | :-----------------------------------------: |
| 单元测试  |       Repository、UseCase、ViewModel        |
|  UI测试   |      Compose UI 测试、Navigation 测试       |
| Benchmark | Compose 性能基准对比，使用 `Macrobenchmark` |
|   工具    |     Gradle managed device、CI 测试配置      |

## 七 架构亮点

```
-完整遵循 Clean Architecture：UI → ViewModel → UseCase → Repository → DataSource
-高度模块化、可重用
-自定义 Gradle 插件统一配置
-使用 Jetpack 官方推荐工具链，贴近实际生产环境
-Compose + Material3 完整落地方案
-动态主题、深色模式、用户设置等都考虑周到
```

## 八 值得借鉴的实践

```
-模块化设计思维（Feature + Core + Build logic）
-Compose 中的 UI 状态管理规范
-Sync + WorkManager 自动刷新架构
-App Startup 优化与多模块初始化管理
-统一依赖版本管理（TOML + build-logic）
-国际化、多主题、Accessibility 设计
```

## 九 参考

* [Now in Android官网介绍](https://developer.android.google.cn/series/now-in-android?hl=zh-cn)
* [Jetpack Compose教程](https://developer.android.com/develop/ui/compose/tutorial?hl=zh-cn)
* [架构指南](https://developer.android.google.cn/topic/architecture?hl=zh-cn)