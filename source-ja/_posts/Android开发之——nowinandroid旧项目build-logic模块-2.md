---
title: Android开发之——nowinandroid旧项目build-logic模块(2)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 700da4ff
date: 2025-08-05 09:28:35
---
## 一 概述

```
Now in Android 是 Google 官方出品的一个现代化 Android 应用参考项目，
架构先进、构建方式模块化优雅，
其中 build-logic 模块是其构建体系的核心之一
本文主要介绍build-logic模块技术要点
```

<!--more-->

## 二 模块定位与功能

### 2.1 模块

|    名称     |                         作用                         |
| :---------: | :--------------------------------------------------: |
| build-logic | 用于封装项目的公共构建逻辑，提供可复用的 Gradle 插件 |

### 2.2 说明

```
其目标是将所有 重复、通用的构建配置(如 Compose 设置、Kotlin 配置、Lint 配置等)
统一封装成插件，供各模块按需引入，达到：

-提升构建一致性
-减少样板代码
-易于维护与升级
```

### 2.3  目录结构概览(简化)

```
nowinandroid/
├── build-logic/
│   ├── conventions/
│   │   ├── build.gradle.kts
│   │   └── src/main/kotlin/
│   │       └── ... (多个插件类)
│   └── settings.gradle.kts

conventions 模块：
是 Gradle 插件模块，提供插件注册与构建逻辑实现
```

## 三 技术要点详解

### 3.1 `kotlin-dsl` 插件

```
1、配置
plugins {
    `kotlin-dsl`
}

2、说明
表示这是一个 Gradle Kotlin DSL 插件模块，可以使用 Kotlin 编写插件逻辑
```

### 3.2 使用 `gradlePlugin {}` 注册插件

```
1、配置
gradlePlugin {
    plugins {
        register("nowinandroid.android.application") {
            id = "nowinandroid.android.application"
            implementationClass = "NowinandroidAndroidApplicationConventionPlugin"
        }
        // 更多插件...
    }
}

2、说明
-每个插件都封装一类通用构建配置（如 android.library、android.compose）
-使用时只需：id("nowinandroid.android.application") 即可复用配置
```

### 3.3 插件类实现(示例)

```
1、示例
class NowinandroidAndroidApplicationConventionPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        with(project) {
            pluginManager.apply("com.android.application")
            pluginManager.apply("org.jetbrains.kotlin.android")

            extensions.configure<ApplicationExtension> {
                compileSdk = 34
                defaultConfig {
                    minSdk = 26
                }
            }
        }
    }
}

2、说明
这类插件将各类 Android 配置集中化
```

### 3.4 与版本目录 `libs.versions.toml` 协作

```
1、在 build.gradle.kts 中引用：
dependencies {
    implementation(libs.androidx.core.ktx)
}

2、依赖版本集中管理于 gradle/libs.versions.toml
[libraries]
androidx-core-ktx = { module = "androidx.core:core-ktx", version = "1.12.0" }
```

### 3.5 插件使用方式(在 App 模块等)

```
1、示例
plugins {
    id("nowinandroid.android.application")
    id("nowinandroid.android.hilt")
    id("nowinandroid.android.compose")
}

2、说明
无需每次重复配置，只需引用对应插件即可自动注入统一构建逻辑
```

## 四 总结

|          要点          |                           描述                           |
| :--------------------: | :------------------------------------------------------: |
| `build-logic` 是什么？ |                存放构建配置封装插件的模块                |
|       kotlin-dsl       |                 启用 Gradle 插件模块支持                 |
|  gradlePlugin.plugins  |                      注册自定义插件                      |
|   libs.versions.toml   |                     统一依赖版本控制                     |
|        插件用途        | 提供如 Application、Compose、Hilt、Kotlin 等统一构建配置 |
|        使用方式        |         模块内直接 `id("xxx")` 引用封装好的插件          |

## 五 参考

* [Now In Android Github](https://github.com/android/nowinandroid)
* `build-logic` 模块：[nowinandroid/build-logic/conventions](https://github.com/android/nowinandroid/tree/main/build-logic/conventions)

