---
title: Kuikly开发之——介绍及入门教程
categories:
  - 开发
  - F-跨平台
  - Kuikly
tags:
  - Kuikly
abbrlink: 9ef38d79
date: 2025-12-12 08:20:46
---
## 一 概述

```
本文介绍：
 - Kuikly 是什么
 - 入门教程
```

<!--more-->

## 二 Kuikly 是什么

### 2.1 概念

```
1、定义：
Kuikly 是腾讯 TDS（前端技术部）推出的 跨平台 UI + 逻辑开发框架，
基于 Kotlin Multiplatform（KMP）技术实现。

2、支持平台：
Android、iOS、HarmonyOS、Web（Beta）、小程序（Beta）等。

3、架构：
-KuiklyCore：KMP 构建的跨平台核心，提供声明式 + 响应式 API，抽象统一 UI 控件接口。
-KuiklyRender：各平台的渲染层，根据平台实现 Core 定义的 UI 控件。

4、特点：轻量、可动态交付、性能接近原生。
```

### 2.2 文档

```
1、官方文档：https://kuikly.tds.qq.com/QuickStart/overview.html
2、GitHub-KuiklyUI：https://github.com/Tencent-TDS/KuiklyUI
```

## 三 Kuikly 接入 KMP 工程完整步骤

假设已有 KMP 项目（Android / iOS / Desktop / Shared 模块）

### 3.1 步骤 1：引入 Kuikly 依赖

```
在 shared/build.gradle.kts 中添加
kotlin {
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("com.tencent.kuikly:kuikly-core:0.1.0") // Core
            }
        }
        val androidMain by getting {
            dependencies {
                implementation("com.tencent.kuikly:kuikly-render-android:0.1.0") // Android 渲染器
            }
        }
        val iosMain by getting {
            dependencies {
                implementation("com.tencent.kuikly:kuikly-render-ios:0.1.0") // iOS 渲染器
            }
        }
        val harmonyosMain by getting {
            dependencies {
                implementation("com.tencent.kuikly:kuikly-render-harmony:0.1.0") // HarmonyOS 渲染器
            }
        }
        val jsMain by getting {
            dependencies {
                implementation("com.tencent.kuikly:kuikly-render-web:0.1.0") // Web 渲染器（Beta）
            }
        }
        val miniProgramMain by getting {
            dependencies {
                implementation("com.tencent.kuikly:kuikly-render-miniprogram:0.1.0") // 小程序（Beta）
            }
        }
    }
}
```

### 3.2 步骤 2：创建 Kuikly UI 模块

```
1、在 shared/src/commonMain/kotlin 创建 ui 包：

package com.example.shared.ui

import com.tencent.kuikly.core.KuiklyView
import com.tencent.kuikly.core.Text
import com.tencent.kuikly.core.Button

fun mainView(): KuiklyView {
    return Text("Hello Kuikly!") {
        fontSize = 18
    }
}

2、可根据需要添加 Button、List、Image 等控件。
```

### 3.3 步骤 3：各平台渲染

1、Android

```
import com.tencent.kuikly.android.KuiklyAndroidView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(KuiklyAndroidView(this) {
            mainView()
        })
    }
}
```

2、iOS (Swift)

```
import KuiklyRenderiOS

let kuiklyView = KuiklyIOSView(frame: view.bounds)
kuiklyView.setContent {
    mainView()
}
view.addSubview(kuiklyView)
```

3、HarmonyOS：

```
import com.tencent.kuikly.harmony.KuiklyHarmonyView

val view = KuiklyHarmonyView(context)
view.setContent {
    mainView()
}
```

4、Web (Kotlin/JS)

```
import com.tencent.kuikly.web.KuiklyWebView

val root = document.getElementById("root")!!
KuiklyWebView(root) {
    mainView()
}
```

5、小程序 (Beta)

```
import com.tencent.kuikly.miniprogram.KuiklyMiniView

val miniView = KuiklyMiniView()
miniView.setContent {
    mainView()
}
```

### 3.4 步骤 4：运行与调试

```
Android / iOS / HarmonyOS：直接 run 模拟器或真机
Web：启动 Kotlin/JS 或 Vite 等工具
小程序：使用微信 / QQ 小程序开发者工具运行

注意：Web / 小程序渲染器仍是 Beta，可能需要手动适配部分控件。
```

## 四 Kuikly vs Compose Multiplatform 完整对比表

|     特性     |                            Kuikly                            |            Compose Multiplatform            |                      备注                      |
| :----------: | :----------------------------------------------------------: | :-----------------------------------------: | :--------------------------------------------: |
|   技术基础   |                      KMP + 自研 UI DSL                       |              KMP + Compose DSL              |               都可跨平台共享逻辑               |
|   支持平台   |     Android / iOS / HarmonyOS / Web(Beta) / 小程序(Beta)     |        Android / iOS / Desktop / Web        | Kuikly Web / 小程序仍 Beta，Compose Web 更成熟 |
| UI 声明方式  |            Kuikly 自研 DSL（Text, Button, List…）            |    Compose DSL（Text, Button, Column…）     |            语法不同，需要迁移或适配            |
|    渲染层    | 平台渲染器（RenderAndroid / RenderiOS / RenderHarmony / RenderWeb / RenderMini） |              Compose 自身渲染               |     Kuikly 可自定义渲染，适合嵌入原生模块      |
| 社区 / 文档  |                      腾讯官方 + GitHub                       |            Jetbrains + 官方文档             |      Compose 社区更成熟，Kuikly 社区较小       |
|     性能     |                           接近原生                           |                  接近原生                   |             都支持热重载和性能优化             |
|   适用场景   |           多平台快速共用 UI + 逻辑、UI 跨平台抽象            |  Android / iOS / Desktop / Web UI 同步开发  |       Kuikly 更偏向企业多端统一 UI 框架        |
| 集成原生模块 |         可通过 Core + Render 封装 C++ / TurboModule          | 可通过 Compose + expect/actual 封装原生模块 |              两者都可，但方式不同              |
|   学习成本   |          中等偏高（需学 Kuikly DSL + Render 机制）           |             已有 Compose 背景低             |          Kuikly 新 DSL，需要额外学习           |
| 平台差异处理 |             需在 Render 层或 expect/actual 处理              |       Compose 多用 expect/actual 处理       | Kuikly 更明确分层，但每个平台可能有差异化逻辑  |
| UI 可扩展性  |                 可自定义渲染器或嵌入原生控件                 |      可使用 Compose 自身控件或原生控件      |          Kuikly 对多端统一控件更友好           |

