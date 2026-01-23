---
title: Android开发之——nowinandroid自定义插件和版本别名(5)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 1deb72a9
date: 2025-08-05 09:30:38
---
## 一 概述

```
自定义插件和版本别名是Android项目中常见的概念
常用于模块化管理和构建优化
```

<!--more-->

## 二 自定义插件(Custom Gradle Plugin)

### 2.1 什么是自定义插件？

```
1、概念
将多个 build.gradle 中重复出现的构建逻辑提取封装为一个独立插件，在各模块中统一使用

2、示例(例如：你在多个模块都配置了类似的内容)
android {
    compileSdk = 34
    defaultConfig {
        minSdk = 24
        targetSdk = 34
    }
}

3、说明
与其复制粘贴到每个模块，不如封装成一个插件 com.joker.coolmall.android.application
```

### 2.2  结构示例(Kotlin DSL)

```
1、通常会建一个 build-logic 模块来存放所有自定义插件
project-root/
├── build-logic/
│   ├── convention/
│   │   └── src/main/kotlin/com/joker/coolmall/android/
│   │       ├── ApplicationPlugin.kt
│   │       ├── ComposePlugin.kt
│   └── build.gradle.kts
│   └── settings.gradle.kts

2、示例：ApplicationPlugin.kt
package com.joker.coolmall.android

import org.gradle.api.Plugin
import org.gradle.api.Project
import com.android.build.gradle.AppPlugin

class ApplicationPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        project.pluginManager.apply("com.android.application")
        project.pluginManager.apply("org.jetbrains.kotlin.android")

        project.extensions.configure<com.android.build.gradle.AppExtension>("android") {
            compileSdkVersion(34)
            defaultConfig {
                minSdk = 24
                targetSdk = 34
            }
        }
    }
}

3、build-logic/build.gradle.kts
plugins {
    `kotlin-dsl` //开启 Kotlin Gradle Plugin 编写功能
}

dependencies {
    implementation("com.android.tools.build:gradle:8.2.2")
    implementation(kotlin("gradle-plugin"))
}
```

说明(plugins { `kotlin-dsl`})作用：

```
它的作用是告诉 Gradle：
-这个模块不是普通的 Android 或 Java 应用模块，
-而是一个 Gradle 插件模块，使用 Kotlin DSL 编写构建逻辑。
```

### 2.3 项目根目录 `settings.gradle.kts`

```
pluginManagement {
    includeBuild("build-logic")
}
```

### 2.4 使用方式(模块中)

```
plugins {
    id("com.joker.coolmall.android.application")
}
```

## 三 版本别名(Version Catalog)

### 3.1 什么是 Version Catalog？

```
1、说明
-是 Gradle 7.x 提供的一种 集中式依赖和插件版本管理机制。
-所有依赖和插件都统一写入 libs.versions.toml 文件，用别名引用，避免版本分散。

2、位置
project-root/
└── gradle/
    └── libs.versions.toml
```

### 3.2 示例内容：`libs.versions.toml`

```
[versions]
kotlin = "1.9.22"
hilt = "2.48"

[plugins]
ksp = { id = "com.google.devtools.ksp", version = "1.9.22-1.0.17" }
hilt = { id = "com.google.dagger.hilt.android", version.ref = "hilt" }

[libraries]
hilt-android = { module = "com.google.dagger:hilt-android", version.ref = "hilt" }
hilt-compiler = { module = "com.google.dagger:hilt-compiler", version.ref = "hilt" }
```

### 3.3 使用方式

```
1、在插件块中引用插件：
plugins {
    alias(libs.plugins.ksp)
    alias(libs.plugins.hilt)
}

2、在依赖块中引用依赖
dependencies {
    implementation(libs.hilt.android)
    ksp(libs.hilt.compiler)
}
```

## 四 总结

|              |     自定义插件      |              版本别名               |
| :----------: | :-----------------: | :---------------------------------: |
| 解耦重复配置 |          ✅          |                  ❌                  |
| 多模块一致性 |          ✅          |                  ✅                  |
|   易于升级   |          ❌          |           ✅(集中管理版本)           |
|   使用方式   |      id("xxx")      | alias(libs.plugins.xxx)`、`libs.xxx |
|   配置位置   | `build-logic/` 模块 |  `gradle/libs.versions.toml` 文件   |

