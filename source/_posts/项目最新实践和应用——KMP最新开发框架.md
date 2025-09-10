---
title: 项目最新实践和应用——KMP最新开发框架
categories:
  - 开发
  - U-项目实践
  - KMP项目
tags:
  - KMP项目
abbrlink: f0db8964
date: 2025-09-10 11:27:22
---
## 一 概述

```
方便学习最新技术和架构，本文列举了KMP 最新开发框架、生态方案和代码示例
```

<!--more-->

## 二 最新开发框架

### 2.1 UI 层[Compose Multiplatform (JetBrains 官方)]

```
最新版本：1.7.x
用途：跨 Android、iOS、Desktop、Web 的统一 UI 框架
特性：与 Jetpack Compose 基本一致，支持 Skia 渲染，性能提升明显
```

### 2.2 状态管理 / 路由

```
Voyager (1.0.0-rc) – KMP 专用路由与导航库
Decompose (3.x) – Ark Ivanov 的 MVI/Navigation 框架，常配合 MVIKotlin
```

### 2.3 网络与数据

```
Ktor (2.3.x) – KMP 的全平台 HTTP 客户端/服务端框架
SQLDelight (2.x) – KMP 数据库访问，支持 Android/iOS/桌面 SQLite
Realm Kotlin (2.x) – MongoDB 提供的跨平台数据库
```

### 2.4 依赖注入

```
Koin for KMP (3.5.x) – 轻量级依赖注入
Kodein-DI (7.x) – 经典 KMP DI 库
```

### 2.5 图片 / 存储

```
Kamel (0.9.x) – Compose Multiplatform 的图片加载器（类似 Coil）
KStore (1.0.x) – Kotlin Multiplatform 的 Key-Value 存储
```

### 2.6 并发

```
Kotlinx Coroutines (1.9.x) – 协程跨平台
Kotlinx Serialization (1.8.x) – 跨平台序列化
```

### 2.7 构建 / 项目结构

```
Gradle 8.x + Kotlin 2.x（K2 编译器已稳定）
Compose Multiplatform Plugin（简化 UI 多端配置）
KMP Target: android(), iosX64(), iosArm64(), desktop(jvm)，实验支持 wasmJs()
```


## 三 示例项目推荐

### 3.1 官方 TodoApp (Compose Multiplatform 示例)

```
地址：https://github.com/JetBrains/compose-multiplatform
技术栈：Compose MP + Ktor + SQLDelight
平台：Android / iOS / Desktop
```

### 3.2 PeopleInSpace

```
地址：https://github.com/joreilly/PeopleInSpace
技术栈：KMP + Compose Multiplatform + Ktor + SQLDelight + Voyager
特点：实时获取宇航员在太空数据，UI 三端一致
```

### 3.3 KMP News App

```
地址：https://github.com/joreilly/KMPNewsApp
技术栈：Compose MP + Ktor + Realm Kotlin + Voyager
平台：Android/iOS/Desktop/Web
```

### 3.4 KaMPKit (Touchlab 官方脚手架)

```
地址：https://github.com/touchlab/KaMPKit
技术栈：Ktor + SQLDelight + Coroutines
特点：偏向企业脚手架，实战落地参考
```

## 四 推荐的最新组合(2025 实战可用)

```
1、假如你要做一个 新闻聚合 App (Android + iOS + 桌面)：
 UI: Compose Multiplatform (统一 UI)
 导航: Voyager
 网络: Ktor
 数据库: SQLDelight (支持离线缓存)
 图片加载: Kamel
 DI: Koin
 架构: MVVM + Coroutines + Flow

这样配置，几乎可以无缝跑在 Android / iOS / Desktop / Web。
```

