---
title: 项目最新实践和应用——Android项目最新框架2
categories:
  - 开发
  - U-项目实践
  - Android项目
tags:
  - Android
abbrlink: '11606224'
date: 2025-08-25 09:57:37
---
## 一 概述

```
方便学习最新技术和架构，本文列举了Android 最新开发框架、生态方案和代码示例
```

<!--more-->

## 二 最新开发框架

### 2.1 Jetpack Compose (UI 框架)

1、概念

```
1、技术亮点：
取代 XML 布局，使用 Kotlin 声明式 UI；与 Material3、动态主题、动画深度集成。

2、生态：
Compose Multiplatform（JetBrains）→ 可跑 Android/iOS/桌面/Web。
```

2、示例

* [Nowinandroid](https://github.com/android/nowinandroid) → Google 官方 Jetpack Compose + Kotlin + Hilt + Room + Retrofit 项目
* [Compose Samples](https://github.com/android/compose-samples) → 官方 Compose UI 示例集合

### 2.2 Kotlin Multiplatform (KMP) + Compose Multiplatform

1、概念

```
1、技术亮点：
 共享业务逻辑（网络、数据层），UI 各端（Android/iOS/桌面/Web）独立；
 Compose MPP 提供 UI 共享可能。
```

2、示例

* [PeopleInSpace](https://github.com/joreilly/PeopleInSpace) → KMP + Compose MPP
* [KMM-Sample](https://github.com/Kotlin/kmm-sample) →JetBrains 官方 KMP 示例

### 2.3  Modern Android Development (MAD) 套件

1、概念

```
技术栈：
 语言：Kotlin
 依赖注入：Hilt (Dagger Hilt)
 并发：Kotlin Coroutines + Flow
 数据存储：Room / DataStore
 网络：Retrofit / Ktor
 架构模式：MVVM / MVI + Jetpack ViewModel + Navigation Compose
```

2、示例

* [Tivi](https://github.com/chrisbanes/tivi) → Jetpack Compose + Coroutines + Flow + Room + Hilt
* [Nowinandroid](https://github.com/android/nowinandroid)（再次推荐，Google Showcase）

### 2.4 Compose for Wear OS / TV / Auto

1、概念

```
亮点：
Google 已经将 Compose 扩展到手表 (Wear OS)、电视 (Android TV)、车机 (Android Auto)
```

2、示例

* [Compose for Wear OS Samples](https://github.com/android/wear-os-samples)

### 2.5 AI/ML 集成框架

1、概念

```
ML Kit：OCR、语音识别、人脸检测
TensorFlow Lite：本地 AI 推理
最新趋势：结合 Google Gemini Nano（Android 15 内置小模型，替代部分 ML Kit）
```

2、示例

* [ML Kit Samples](https://github.com/googlesamples/mlkit)

### 2.6  其他新兴框架

1、概念

```
Glance → 用 Compose 写 Widget
WorkManager → 后台任务调度
CameraX → 相机框架
```

2、示例

* [Glance Samples](https://github.com/android/glance-samples)—已删除
* [CameraX Samples](https://github.com/android/camera-samples)

## 三 总结推荐组合

```
新项目建议直接采用：
 UI → Jetpack Compose + Material3
 架构 → MVVM/MVI + Jetpack ViewModel + Navigation Compose
 数据层 → Room + DataStore
 网络 → Retrofit / Ktor
 依赖注入 → Hilt
 并发 → Kotlin Coroutines + Flow
 跨平台（选配） → Kotlin Multiplatform + Compose Multiplatform
```

