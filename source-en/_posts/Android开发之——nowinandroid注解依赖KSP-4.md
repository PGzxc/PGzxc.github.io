---
title: Android开发之——nowinandroid注解依赖KSP(4)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 48432a57
date: 2025-08-05 09:29:49
---
## 一 概述

```
KSP(Kotlin Symbol Processing)是 JetBrains 官方推出的注解处理框架，
是用来替代 kapt 的新一代工具，常用于生成代码，比如：

-Jetpack Room、DataStore 使用 KSP 进行代码生成
-Hilt、Moshi、AutoService 等库也陆续支持 KSP
```

<!--more-->

## 二 如何在 Android 项目中使用 KSP 依赖？( Gradle Kotlin DSL )

### 2.1  根项目的 `build.gradle.kts` 中添加插件管理

```
pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}
```

### 2.2 模块 `build.gradle.kts` 示例

```
plugins {
    id("com.android.application")
    kotlin("android")
    id("com.google.devtools.ksp") version "1.9.22-1.0.18" // 👈 注意版本
}

android {
    ...
}

dependencies {
    implementation("com.squareup.moshi:moshi:1.15.0")
    ksp("com.squareup.moshi:moshi-kotlin-codegen:1.15.0") // 👈 使用 KSP 插件生成
}
```

### 2.3 配置生成代码目录

```
如果你需要访问 KSP 生成的代码（例如在 kspGeneratedDir 下调试）
kotlin {
    sourceSets.configureEach {
        kotlin.srcDir("build/generated/ksp/${name}/kotlin")
    }
}
```

## 三 示例：生成 Room 数据库

### 3.1 示例

```
dependencies {
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")
}
```

### 3.2 注意事项

```
-如果你使用的是 kotlin-android 插件，推荐使用与 Kotlin 版本匹配的 ksp 插件版本。
-kspGeneratedDir 可用于配置生成的源码文件夹，例如：

kotlin {
    sourceSets["main"].kotlin.srcDir("build/generated/ksp/main/kotlin")
}
```

## 四 常见使用 KSP 的库和依赖

|     依赖库      |                  implementation                  |            `ksp` 依赖             |
| :-------------: | :----------------------------------------------: | :-------------------------------: |
|      Moshi      |             com.squareup.moshi:moshi             |       moshi-kotlin-codegen        |
|      Room       |            androidx.room:room-runtime            |    androidx.room:room-compiler    |
|      Hilt       |          com.google.dagger:hilt-android          | `hilt-compiler`(部分版本支持 KSP) |
|   AutoService   | com.google.auto.service:auto-service-annotations |           auto-service            |
| Koin(ksp 版 DI) |           io.insert-koin:koin-android            |  `koin-ksp-compiler`(仅部分版本)  |

## 五 为什么使用 KSP 而不是 kapt？

|    对比项     |                kapt                |           ksp            |
| :-----------: | :--------------------------------: | :----------------------: |
|   编译性能    | 慢(使用 Java annotation processor) | 快(直接处理 Kotlin 源码) |
|   构建时间    |                 长                 |            短            |
| Kotlin 支持度 |      有时会有类型信息丢失问题      |     原生支持 Kotlin      |
|   未来推荐    |             偏过渡方案             |  JetBrains 官方推荐方向  |

## 六 参考

* [Kotlin官网——KSP](https://kotlinlang.org/docs/ksp-overview.html)
* [示例——Room with KSP](https://developer.android.com/codelabs/android-room-with-a-view-kotlin#3)
* [ 示例——Moshi Kotlin codegen](https://github.com/square/moshi)

