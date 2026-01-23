---
title: Android开发之——nowinAndroid项目gradle模块(8)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 37e8c48f
date: 2025-09-26 16:56:34
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下gradle
 -模块剖析:gradle
```

<!--more-->

## 二 项目结构

```
gradle/
 ├── wrapper/
 │    ├── gradle-wrapper.jar
 │    └── gradle-wrapper.properties
 ├── init.gradle.kts
 └── libs.versions.toml
```

## 三 剖析gradle

### 3.1 gradle/wrapper/

```
Gradle Wrapper 相关文件，保证构建环境一致。

1、gradle-wrapper.properties
-指定 Gradle 的版本与下载地址，例如：
-distributionUrl=https\://services.gradle.org/distributions/gradle-8.7-bin.zip
-项目里跑 ./gradlew build 就会自动下载并使用这个版本。

2、gradle-wrapper.jar
-Gradle 官方提供的小工具，负责下载和调用对应版本的 Gradle。
```

### 3.2 init.gradle.kts

```
1、说明
这是一个 初始化脚本，作用类似于全局的 init.gradle，但这里项目级别自带。

2、主要用途是：
-配置构建时的一些全局行为。
-在任何 settings.gradle.kts、build.gradle.kts 之前执行。
-可以做：
 插件仓库统一管理
 全局 build scan 配置
 自定义日志、构建输出
 性能监控、统计

3、在 Now in Android 里，它一般会放一些 构建优化和全局规则，例如：
-打印当前使用的 Gradle/JDK 版本。
-配置构建缓存、编译参数。
-可能还有针对 CI 的一些初始化逻辑。

4、这样做的好处是：
团队成员拉下来代码，无需额外配置，就能在一致的初始化规则下构建
```

### 3.3 libs.versions.toml

```
1、说明
这是 Gradle Version Catalog 文件，统一管理依赖版本

2、示例
[versions]
kotlin = "1.9.23"
compose = "1.7.1"
hilt = "2.52"

[libraries]
androidx-core = "androidx.core:core-ktx:1.13.1"
compose-ui = { module = "androidx.compose.ui:ui", version.ref = "compose" }
compose-material3 = { module = "androidx.compose.material3:material3", version.ref = "compose" }
hilt-android = { module = "com.google.dagger:hilt-android", version.ref = "hilt" }

[plugins]
android-application = { id = "com.android.application", version = "8.3.2" }
android-library = { id = "com.android.library", version = "8.3.2" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }

3、使用方式
在模块 build.gradle.kts 中直接引用：

dependencies {
    implementation(libs.androidx.core)
    implementation(libs.compose.ui)
    implementation(libs.compose.material3)
    implementation(libs.hilt.android)
}

4、这样可以：
-集中管理依赖版本（不用到处改）。
-避免冲突（统一入口）。
-升级方便（只改 toml 文件，不用全局搜）。
```

## 四 总结

```
-gradle/wrapper/ → 保证大家用相同的 Gradle 版本。
-init.gradle.kts → 项目级初始化脚本，全局规则 & 构建优化。
-libs.versions.toml → Version Catalog，集中管理依赖版本。
```

