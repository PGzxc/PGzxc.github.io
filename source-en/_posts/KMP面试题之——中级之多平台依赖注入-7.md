---
title: KMP面试题之——中级之多平台依赖注入(7)
categories:
  - 面试相关
  - KMP面试题
tags:
  - KMP面试题
abbrlink: '65751804'
date: 2025-10-17 08:55:15
---
## 一 概述

```
1.如何在 KMP 中使用依赖注入(Koin/Hilt 替代方案)？
2.Koin 在 KMP 中的使用方式
3.为什么 Hilt 不能直接在 shared 模块使用？
4.Koin 跨平台注入原理
5.Koin Multiplatform 是如何实现跨平台注入的？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 依赖注入(背景与框架选择)

1、背景

```
KMP 在编译为 JVM / Native / JS 时，运行时机制各异，
DI 框架必须支持多平台编译（非仅 JVM）
```

2、框架选择

|    框架     |     平台支持      |                特点与局限                 |
| :---------: | :---------------: | :---------------------------------------: |
| Hilt/Dagger |  仅 JVM/Android   | 基于注解与 kapt/ksp，不支持 Kotlin/Native |
|    Koin     | JVM / Native / JS |   纯 Kotlin，无反射，DSL 友好，推荐 KMP   |
|  Kodein-DI  |   JVM / Native    |              轻量但维护较少               |
|  Manual DI  |      全平台       |            适合简单或实验项目             |

3、结论

```
Hilt 无法在 shared 模块使用，推荐使用 Koin Multiplatform。
```

### 2.2 Koin 在 KMP 中的使用方式

1、Gradle 配置

```
kotlin {
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("io.insert-koin:koin-core:4.0.0")
            }
        }
        val androidMain by getting {
            dependencies {
                implementation("io.insert-koin:koin-android:4.0.0")
            }
        }
    }
}
```

2、定义模块

```
// shared/src/commonMain/kotlin/di/CommonModule.kt
val commonModule = module {
    single { HttpClient() }
    single<Repository> { RepositoryImpl(get()) }
    factory { GetUserUseCase(get()) }
}
```

3、平台特定依赖

```
// commonMain
expect fun platformModule(): Module

// androidMain
actual fun platformModule() = module { single { AndroidLogger() } }

// iosMain
actual fun platformModule() = module { single { IOSLogger() } }
```

4、初始化

```
fun initKoin() = startKoin {
    modules(commonModule, platformModule())
}
```

5、平台调用

```
// Android
class MyApp : Application() {
    override fun onCreate() = initKoin()
}

// iOS
KoinKt.doInitKoin()
```

### 2.3 Hilt 不能直接在 shared 模块

1、技术原因

```
Hilt 基于 Dagger2（kapt/ksp 注解处理），仅 JVM 有效；
Kotlin/Native 无法运行 Annotation Processor；
Dagger 生成的 Java 代码无法转为 LLVM；
shared 模块非 Android-only，引用 Hilt 会导致 iOS 构建失败。
```

2、项目实践

```
1、概念
Android 层继续使用 Hilt；
shared 层保持纯 Kotlin 构造；
Hilt 在 Android 层注入 shared 层依赖；
iOS 层用 Koin 或手动注入。

2、示例
// Android
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    @Inject lateinit var viewModel: SharedViewModel
}

// shared
class SharedViewModel(val repository: Repository)
```

3、面试加分答法

```
shared 层不依赖 Hilt，保持纯 Kotlin。
Android 端使用 Hilt 注入构造依赖，iOS 用 Koin/手动注入，
从而实现跨平台解耦与可复用性。
```
### 2.4 Koin 跨平台注入原理

1、核心原理

```
Koin 采用 Service Locator + Kotlin DSL，无反射实现。
模块加载时注册依赖关系到 KoinContext，运行时按类型查找实例。
```

2、线程安全机制

```
旧内存模型：使用 freeze() 冻结对象；
新内存模型（Kotlin 1.9+）：依赖并发 GC，无需手动 freeze。
```

### 2.5 Koin Multiplatform 实现机制

1、expect/actual 机制示例

```
// commonMain
expect class PlatformService()

val appModule = module {
    single { PlatformService() }
}

// androidMain
actual class PlatformService() { /* Android实现 */ }

// iosMain
actual class PlatformService() { /* iOS实现 */ }
```

2、启动注入

```
fun initKoin() = startKoin {
    modules(appModule, platformModule())
}
```

3、特性总结

```
纯 Kotlin，无 kapt；
支持 expect/actual 平台特化；
模块化定义，支持懒加载、scope；
可单测（mock module）；
新内存模型兼容多线程。
```

## 三 总结

|  面试方向   |                      关键点                       |            实战建议            |
| :---------: | :-----------------------------------------------: | :----------------------------: |
| DI 框架选择 |        Koin (KMP 支持) vs Hilt (JVM 专属)         |       shared 层使用 Koin       |
|  架构桥接   | Android：Hilt 注入 shared；<br>iOS：Koin/手动注入 |     保持 shared 纯 Kotlin      |
|  注入机制   |     Koin 基于 DSL，无反射，支持 expect/actual     | 使用 module + startKoin 初始化 |
| Native 支持 |    Koin 在旧模型中 freeze，新模型自动并发安全     |        建议 Kotlin 1.9+        |

