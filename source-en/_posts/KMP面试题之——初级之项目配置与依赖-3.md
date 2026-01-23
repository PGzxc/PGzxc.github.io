---
title: KMP面试题之——初级之项目配置与依赖(3)
categories:
  - 面试相关
  - KMP面试题
tags:
  - KMP面试题
abbrlink: 33e8d0d6
date: 2025-10-15 09:33:33
---
## 一 概述

```
1.如何在 Gradle 中配置 KMP 工程？
2.KMP 的 Gradle DSL 与普通 Android Gradle 有什么不同？
3.KMP 的依赖共享和平台特定依赖如何区分？
4.如何引入第三方库到 commonMain 与各平台 Main？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Gradle中配置 KMP 工程

1、如何在 Gradle 中配置 KMP 工程？

```
1、说明
KMP 工程通过在 build.gradle.kts 中使用 kotlin {} DSL 
来配置多平台目标(targets)和源码集(sourceSets)。

2、示例
plugins {
    kotlin("multiplatform")
    id("com.android.library")
}

kotlin {
    androidTarget()
    iosX64()
    iosArm64()
    iosSimulatorArm64()

    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(kotlin("stdlib"))
                implementation("io.ktor:ktor-client-core:2.3.3")
            }
        }
        val androidMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-okhttp:2.3.3")
            }
        }
        val iosMain by creating {
            dependsOn(commonMain)
            dependencies {
                implementation("io.ktor:ktor-client-darwin:2.3.3")
            }
        }
    }
}

android {
    namespace = "com.example.shared"
    compileSdk = 34
    defaultConfig { minSdk = 24 }
}
```

2、关键点

```
-kotlin("multiplatform") 是核心插件。
-androidTarget() 启用 Android 平台。
-iosArm64() / iosSimulatorArm64() 定义 iOS 架构。
-sourceSets 负责共享与平台特化逻辑。
-KMP 常见结构：:shared 模块(公共逻辑) + :app-android / :app-ios(平台 UI)
```

3、 面试考点提示

```
招聘中常问“如何配置 Kotlin Multiplatform 工程”，
主要考察你是否理解 DSL 结构、targets 声明、sourceSet 层次。
```

### 2.2 Gradle DSL 与 Android Gradle 的区别

1、对比

|   对比项   |       Kotlin Multiplatform DSL        |               普通 Android Gradle               |
| :--------: | :-----------------------------------: | :---------------------------------------------: |
|  插件声明  |        kotlin("multiplatform")        | com.android.application/<br>com.android.library |
|  源码结构  |  commonMain, androidMain, iosMain 等  |              main, debug, release               |
|  依赖管理  |  implementation()写在sourceSets {}中  |           直接写在 dependencies {}块            |
|  编译目标  | 多平台：android(), ios(), jvm(), js() |                   仅 Android                    |
|  编译产物  |  library (.klib) 或 framework (iOS)   |                   .apk/ .aar                    |
| 跨平台机制 |             expect/actual             |                     不支持                      |

2、总结

```
KMP DSL 是 声明式 + 分层式依赖结构，以复用为核心。
Android Gradle 是 任务流式配置，聚焦单平台构建。
KMP 构建复杂度更高，但支持多平台输出。
```

3、招聘考点

```
中高级 Android/Kotlin 岗常问“Gradle DSL 区别”。
答题时要提到「sourceSet 分层、expect/actual、产物类型差异」。
```

### 2.3 依赖共享和平台特定依赖

1、对比

|  SourceSet  |       作用       |                 示例依赖                  |
| :---------: | :--------------: | :---------------------------------------:|
| commonMain  | 所有平台共享逻辑  | ktor-client-core, kotlinx-coroutines-core |
| androidMain | Android 特有逻辑 | ktor-client-okhttp, androidx.lifecycle    |
|   iosMain   |   iOS 特有逻辑   |     ktor-client-darwin, NSUrlSession      |
| desktopMain |   JVM 桌面逻辑   |       ktor-client-java, sqlite-jdbc       |

2、示例

```
sourceSets {
    val commonMain by getting {
        dependencies { implementation("io.ktor:ktor-client-core:2.3.3") }
    }
    val androidMain by getting {
        dependencies { implementation("io.ktor:ktor-client-okhttp:2.3.3") }
    }
    val iosMain by getting {
        dependencies { implementation("io.ktor:ktor-client-darwin:2.3.3") }
    }
}
```

3、总结

```
commonMain ⇒ 通用业务逻辑与接口定义
平台 Main ⇒ 封装特定 API（如文件、网络、数据库）
通过 Gradle DSL 实现依赖隔离，减少冲突
```

4、面试延伸

```
若问“如何减少重复依赖配置”，可以回答：
使用 hierarchies 或 nativeMain 抽取中间层共享依赖。
```

### 3.4 引入第三方库

1、共享依赖(commonMain)

```
1、说明
必须是 Multiplatform 兼容库

2、例如
val commonMain by getting {
    dependencies {
        implementation("io.insert-koin:koin-core:3.5.0")
        implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
    }
}
```

2、平台依赖(androidMain / iosMain)

```
1、说明
用于特定平台的实现

2、示例
val androidMain by getting {
    dependencies {
        implementation("io.ktor:ktor-client-okhttp:2.3.3")
        implementation("androidx.room:room-runtime:2.6.1")
    }
}

val iosMain by getting {
    dependencies {
        implementation("io.ktor:ktor-client-darwin:2.3.3")
    }
}
```

3、数据库驱动示例(SQLDelight)

```
val commonMain by getting {
    dependencies { implementation("app.cash.sqldelight:runtime:2.0.0") }
}
val androidMain by getting {
    dependencies { implementation("app.cash.sqldelight:android-driver:2.0.0") }
}
val iosMain by getting {
    dependencies { implementation("app.cash.sqldelight:native-driver:2.0.0") }
}
```

4、实战提示

```
第三方库若不支持 KMP，可在平台层通过 expect/actual 实现适配。
iOS 平台可使用 cinterop 绑定原生 SDK 或 CocoaPods 集成。
```

## 三 总结

|    知识点    |                    核心要答出                     |
| :----------: | :-----------------------------------------------: |
| KMP 配置入口 |          kotlin {} DSL + 多平台 targets           |
| Gradle 差异  |            SourceSet + 多平台依赖结构             |
|   依赖管理   |            common vs 平台特定依赖分离             |
| 第三方库引入 |       使用 Multiplatform 兼容库或平台专属库       |
| KMP 工程结构 |    commonMain, androidMain, iosMain等目录层级     |
|   面试延伸   | 解释 hierarchies、expect/actual、依赖冲突解决方案 |

