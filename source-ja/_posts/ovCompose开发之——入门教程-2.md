---
title: ovCompose开发之——入门教程(2)
categories:
  - 开发
  - F-跨平台
  - ovCompose
tags:
  - ovCompose
abbrlink: dd2640c1
date: 2025-12-11 13:06:41
---
## 一 概述

```
本文介绍： - ovCompose入门教程
```

<!--more-->

## 二 入门教程

### 2.1 准备环境

```
Kotlin ≥ 1.9.22
Compose Multiplatform Plugin ≥ 1.6.0
Gradle ≥ 8.2
Android Studio ≥ 2024.1 Canary 或兼容版本
HarmonyOS SDK / iOS Xcode 按平台需求配置好
```

### 2.2 添加依赖与插件

```
1、在 settings.gradle.kts
pluginManagement {
    repositories {
        google()
        gradlePluginPortal()
        mavenCentral()
    }
}

2、在 build.gradle.kts 中启用 KMP + Compose

plugins {
    kotlin("multiplatform")
    id("org.jetbrains.compose") version "1.6.10"
}
```

### 2.3  配置多端 Target

```
在 shared/build.gradle.kts

kotlin {
    androidTarget()
    iosArm64()
    iosSimulatorArm64()
    // 若有 HarmonyOS
    // ohosArm64() // 根据 ovCompose Sample 配置

    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.ui)
            }
        }
        val androidMain by getting {
            dependencies {
                implementation("androidx.activity:activity-compose:1.9.2")
            }
        }
    }
}
```

### 2.4 Android 模块配置

```
app/build.gradle.kts

android {
    namespace = "com.example.ovcompose"
    compileSdk = 34

    defaultConfig {
        minSdk = 21
    }

    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.13"
    }
}
```

### 2.5 编写共享 UI

```
在 shared/src/commonMain/kotlin/com/example/ui/App.kt

@Composable
fun App() {
    MaterialTheme {
        Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("Hello ovCompose!", fontSize = 24.sp)
        }
    }
}
```

### 2.6 Android 端调用

```
MainActivity.kt

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            App()
        }
    }
}
```

### 2.7  iOS / 鸿蒙 端集成(可选)

```
1、iOS：
-使用 KMP 输出 .framework；
-在 Swift 工程中引入并调用共享 UI；
-可运行在 UIKit 或 Compose 自渲染模式下。

2、鸿蒙：
-使用 ovCompose 的 ohosArm64 target；
-将共享库打包成 .har 或 .so；
-在 HarmonyOS 工程中通过 native bridge 加载；
-ovCompose 官方 sample 已验证兼容。
```

## 三 运行与调试

```
运行 Android 模拟器，验证 UI；
若配置 iOS / HarmonyOS 目标，分别构建运行；
若报错 “Skia runtime init fail”，说明缺少渲染依赖，请检查 sample 的 CMake 或 Gradle 设置。
```

## 四 示例与参考

```
1、官方示例仓库：https://github.com/Tencent-TDS/ovCompose-sample
2、官方核心库：https://github.com/Tencent-TDS/ovCompose-multiplatform-core
3、腾讯云开发者文章：https://cloud.tencent.com/developer/article/2530550
```

## 五 总结

|       优点       |                 说明                  |
| :--------------: | :-----------------------------------: |
| 一套 UI 多端通用 |        共用 Compose 声明式 UI         |
|      模块化      |         可插拔式接入现有项目          |
|      自渲染      |            视觉一致性更高             |
|     实现灵活     | 支持 Android、iOS、HarmonyOS 混合架构 |
|     官方支持     |       腾讯开源维护，稳定性较好        |

