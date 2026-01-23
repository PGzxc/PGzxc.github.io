---
title: KMP面试题之——中级之跨平台架构设计(4)
categories:
  - 面试相关
  - KMP面试题
tags:
  - KMP面试题
abbrlink: fcc45935
date: 2025-10-16 09:57:17
---
## 一 概述

```
1.介绍一下你项目中的 shared 模块结构？
2.KMP 项目中如何实现 MVVM 架构？
3.Compose Multiplatform + KMP 的架构层次是什么？
4.如何封装多平台的 Repository 层？
5.KMP 如何与 Android/iOS 原生 UI 通信？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1  shared 模块结构

1、核心概念

```
shared 模块是 Kotlin Multiplatform (KMP) 项目的业务逻辑核心，
负责多端共享代码、定义公共依赖与平台特化实现。
```

2、典型结构

```
shared/
 ├── build.gradle.kts
 └── src/
     ├── commonMain/     # 共享逻辑（ViewModel、UseCase、Repository、Model）
     │   ├── kotlin/
     │   ├── resources/
     │   └── 通用依赖：Ktor、Coroutines、Serialization
     ├── androidMain/    # Android 平台特化实现（日志、数据库、存储）
     ├── iosMain/        # iOS 平台特化实现（Darwin 网络、Keychain）
     └── commonTest/     # 跨平台单元测试
```

3、示例

```
// commonMain
expect class PlatformLogger() {
    fun log(message: String)
}

// androidMain
actual class PlatformLogger {
    actual fun log(message: String) = Log.d("KMP", message)
}
```

4、结构延伸

```
多模块化设计：可拆分为 :shared-core, :feature-* 模块；
源集层级 (hierarchies)：可定义 nativeMain 共享 iOS/macOS；
输出形式：Android → AAR，iOS → Framework/XCFramework；
常见问题：依赖冲突、平台库兼容性。
```

### 2.2 MVVM 架构实现

1、架构思路

```
KMP 中通过共享 ViewModel 和 Repository 层实现跨平台 MVVM，
使用 StateFlow 驱动状态，expect/actual 处理平台差异。
```

2、模块分层

```
shared/commonMain/
 ├── model/        # 数据模型 (data class)
 ├── repository/   # 数据仓库 (网络/数据库)
 ├── usecase/      # 业务逻辑封装
 ├── viewmodel/    # ViewModel (StateFlow 状态流)
 └── di/           # 依赖注入 (Koin)
```

3、示例

```
class ArticleViewModel(private val repository: ArticleRepository) {
    private val _state = MutableStateFlow(ArticleState())
    val state: StateFlow<ArticleState> = _state

    suspend fun loadArticles() {
        _state.value = _state.value.copy(loading = true)
        _state.value = _state.value.copy(
            loading = false,
            articles = repository.getArticles()
        )
    }
}
```

4、平台绑定

```
Android：collectAsState() 绑定到 Compose；
iOS：StateFlow → Swift ObservableObject / Combine；
测试：commonTest 可直接测试 ViewModel 逻辑。
```

### 2.3 Compose Multiplatform + KMP 架构

1、层次结构

```
┌──────────────────────────────┐
│ UI 层：Compose Multiplatform │ ← Compose for Android/iOS/Desktop
├──────────────────────────────┤
│ ViewModel 层：StateFlow 驱动 │ ← shared 模块 ViewModel
├──────────────────────────────┤
│ Repository 层：数据仓库      │ ← 网络/数据库抽象
├──────────────────────────────┤
│ DataSource 层：expect/actual │ ← 平台特化 (Ktor、SQLDelight)
└──────────────────────────────┘
```

2、架构说明

```
UI 层：composeApp 模块统一 Compose 组件与导航（如 Voyager）；
领域层：业务逻辑、UseCase、Entity；
数据层：Repository、DataSource（Ktor / SQLDelight / KStore）；
状态管理：StateFlow 单向数据流；
Clean Architecture 原则：UI 与数据层完全解耦
```

3、优势

```
一套 ViewModel 驱动多端 UI；
平台仅负责渲染层；
状态单向流动、架构清晰。
```

### 2.4 Repository 层

1、核心思路

```
通过接口抽象 + expect/actual 实现平台差异，
保持网络、缓存逻辑在共享层统一。
```

2、示例

```
// commonMain
interface ArticleRepository {
    suspend fun getArticles(): List<Article>
}

// androidMain / iosMain
class ArticleRepositoryImpl(private val httpClient: HttpClient) : ArticleRepository {
    override suspend fun getArticles() =
        httpClient.get("https://api.xxx.com/articles").body()
}
```

3、常用多平台库

|  类型   |       多平台库        |
| :-----: | :-------------------: |
|  网络   |         Ktor          |
| 数据库  |      SQLDelight       |
| KV 存储 |        KStore         |
|  JSON   | kotlinx.serialization |

4、最佳实践

```
RepositoryModule 统一依赖注入；
异步操作统一使用 Coroutines；
单元测试可通过 Mock 接口验证逻辑。
```

### 2.5 KMP 如何与原生 UI 通信

1、Android 侧

```
1、说明
KMP 的 ViewModel 可以直接通过 StateFlow 绑定到 Compose：

2、示例
@Composable
fun ArticleScreen(viewModel: ArticleViewModel) {
    val state by viewModel.state.collectAsState()
    ArticleList(state.articles)
}
```

2、iOS 侧

```
1、说明
通过 Swift 访问 Kotlin 代码：

2、示例
let viewModel = ArticleViewModel(repository: RepositoryModule().articleRepo)
viewModel.state.watch { state in
    self.uiState = state
}
```

3、通信桥接机制

```
1、桥接机制
StateFlow 转 Swift Observable
suspend 函数在 Swift 中可 async/await
Kotlin 对象自动暴露为 Swift 类（通过 KMP framework）

2、扩展：
可在 iOS 层添加 SwiftUI @ObservedObject 绑定 Kotlin ViewModel。
```

4、通信机制

|     类型     |        Kotlin → iOS 映射         |
| :----------: | :------------------------------: |
|  StateFlow   |    ObservableObject / Combine    |
| suspend 函数 |        Swift async/await         |
|  Kotlin 类   | Swift 桥接类(Framework 自动生成) |

5、工具与扩展

```
桥接：KMPNativeCoroutines 转换 Flow → Swift async；
依赖注入：Koin；
输出：AAR（Android）+ XCFramework（iOS）。
```

## 三 总结

|       知识点       |               关键词               |       面试重点       |
| :----------------: | :--------------------------------: | :------------------: |
|  shared 模块结构   |      commonMain/platformMain       |  层次清晰、依赖合理  |
|     MVVM 实现      | StateFlow + Repository + ViewModel |    架构复用与解耦    |
| Compose + KMP 架构 |       状态驱动 + Clean 分层        | 可维护性与跨端一致性 |
|  Repository 封装   |      expect/actual + 多平台库      |   平台差异抽象能力   |
|     与原生通信     |    Flow → Swift / Compose 绑定     |  平台集成与桥接能力  |

