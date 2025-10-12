---
title: Android开发之——nowinAndroid项目刨析(1)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: d17df68f
date: 2025-09-16 09:48:09
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目里分析
 -分为三大部分：项目结构、功能、依赖管理
```

<!--more-->

## 二 项目简介

### 2.1 项目地址

```
https://github.com/android/nowinandroid
```

### 2.2 项目介绍

```
-Now in Android是 Google 出品的一个开源 Android 示例 app
-完全用 Kotlin + Jetpack Compose 开发。
-它作为一个参考/范例，用来展示 Android 最佳实践：UI 架构、模块化、测试、性能等。
```

## 三 项目结构(Module 与目录划分)

| 模块 / 顶层目录 |                         职责 / 内容                          |                 典型子模块 / 文件                  |
| :-------------: | :----------------------------------------------------------: | :------------------------------------------------: |
|       app       | 主应用入口，包含导航（NavHost）、应用级别的主题配置、Scaffold 容器。<br/>负责将各个 feature 模块组装成完整应用。<br/>支持不同 build variant（debug/release/benchmark）和 flavor（demo/prod）。 |        MainActivity.kt、AndroidManifest.xml        |
| app-nia-catalog | 独立的小型示例应用，用来展示项目中设计系统(Design System)的组件库(component catalog)，<br/>方便开发者快速预览和调试 UI 元素 |                 CatalogActivity.kt                 |
|     feature     | 每个子模块对应一个具体功能，比如 `feature:foryou`、`feature:author`、`feature:topic`。<br/>每个 feature 模块高内聚、低耦合，包含 UI(Compose)、ViewModel、状态管理逻辑。 |         feature:foryou、<br>feature:author         |
|      core       | 核心库模块，存放通用逻辑和基础设施：<br/>- `core:data`：数据仓库、Repository 接口实现<br/>- `core:database`：Room 数据库<br/>- `core:network`：网络请求、Retrofit API<br/>- `core:model`：业务模型（domain entities）<br/>- `core:designsystem`：Material3 风格的 UI 组件库<br/>- `core:ui`：通用 UI 控件、扩展函数 | core:model、<br/>core:designsystem、<br/>core:data |
|   benchmarks    | 基准测试模块，用于测量应用启动时间、UI 渲染等性能关键指标。<br/>负责生成 Baseline Profile，提升 release 构建运行性能。 |                  BenchmarkTest.kt                  |
|   build-logic   | Gradle 的 convention 插件集合，统一定义模块的构建逻辑。<br/>包括 Compose 配置、lint 配置、依赖版本声明、代码格式化规则。<br/>避免每个模块重复写配置 |           convention-plugins.gradle.kts            |
| lint / spotless | 代码质量与规范模块。<br/>Spotless 用于统一代码格式，lint 模块可定义自定义规则，确保代码风格与质量一致 |                .spotless.gradle.kts                |
|  tools / docs   | 辅助工具与文档，比如 “Architecture learning journey”、“Modularization learning journey”。<br/>帮助开发者理解整个项目设计。 |                docs/ARCHITECTURE.md                |

## 四 功能

```
Now in Android 的核心功能围绕内容浏览与个性化展开，涵盖了现代应用的多种最佳实践：

-内容展示：展示 “Now in Android” 系列的文章、视频、新闻。
-个性化推荐：用户可以关注 Topics/Authors，基于偏好过滤内容流。
-通知提醒：当关注主题有新内容时，推送通知提醒。
-UI体验：基于Jetpack Compose + Material3，支持动态主题、暗黑模式、自适应布局(手机、平板、可折叠设备)
-数据同步：通过 WorkManager 后台任务定期拉取最新内容。
-性能优化：提供 benchmark 模块与 baseline profile，改善冷启动与 UI 流畅度。
-测试支持：提供单元测试、UI 测试、截图测试(Roborazzi)，覆盖常见的 UI 状态与交互场景。
```

## 五 依赖管理

项目采用了现代化、可维护的依赖管理方式：

### 5.1 版本与依赖统一管理

```
-使用 Gradle Kotlin DSL(.gradle.kts)编写构建脚本。
-通过 Version Catalog(libs.versions.toml)管理第三方依赖和版本号。所有模块共享同一版本声明，避免冲突。
```

### 5.2 自定义 Gradle 插件(Build Logic)

```
1、在 build-logic 模块中定义统一的 convention 插件，如：
-nowinandroid.android.library → 普通 Android 库模块配置
-nowinandroid.android.library.compose → 带 Compose 的库模块配置
-nowinandroid.spotless → 应用代码格式化规则

2、各模块只需应用这些插件即可继承统一配置，减少重复。
```

### 5.3 技术栈与主要依赖

```
-UI：Jetpack Compose、Material3、Accompanist
-导航：Navigation Compose
-网络：Retrofit + Kotlin Serialization
-数据库：Room、DataStore
-异步流：Coroutines + Flow
-依赖注入：Hilt
-后台任务：WorkManager
-图片加载：Coil
-测试：JUnit、Robolectric、Roborazzi(截图测试)、Macrobenchmark
```

### 5.4 构建变体(Build Variants & Flavors)

```
1、Variants：debug、release、benchmark

2、Flavors：
-demo → 使用本地静态数据，快速预览 UI
-prod → 使用真实网络 API
```

## 六 总结

```
Now in Android 项目展示了 Google 推崇的 Android 最佳实践：

-模块化架构 → 高内聚、低耦合，方便扩展与维护
-Compose + Material3 → 现代化 UI 构建方式
-依赖注入 + Repository 模式 → 清晰的分层，方便测试
-Gradle Build Logic + Version Catalog → 高度统一的依赖与构建管理
-性能与质量保障 → 基准测试、baseline profiles、严格的 lint & spotless 规则
```

