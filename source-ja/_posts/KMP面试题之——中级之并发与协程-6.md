---
title: KMP面试题之——中级之并发与协程(6)
categories:
  - 面试相关
  - KMP面试题
tags:
  - KMP面试题
abbrlink: 550bbb1b
date: 2025-10-17 08:47:24
---
## 一 概述

```
1.KMP 协程是如何在 iOS 与 Android 上运行的？
2.iOS 中的协程调度器如何工作？(Main/Worker Dispatcher)
3.CoroutineScope 如何跨平台安全使用？
4.如何处理 freeze() 与共享内存问题(Kotlin/Native 特有)？
5.SharedFlow 与 StateFlow 在 KMP 中的应用？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 KMP 协程

1、跨平台运行机制对比

|     平台      |         调度机制          |                  底层实现                  |
| :-----------: | :-----------------------: | :----------------------------------------: |
| Android (JVM) | 基于 JVM 线程池与 Looper  |     Dispatchers.Main → Android 主线程      |
| iOS (Native)  | 基于 Kotlin/Native Worker | Dispatchers.Main → Main run loop (UI 线程) |
| Desktop (JVM) |        JVM 调度器         |              与 Android 相似               |

2、工作原理

```
Android → 编译为 JVM 字节码，运行在 Java 线程池；
iOS → 编译为 LLVM + Kotlin/Native Runtime，通过 Worker API 调度执行。
```

3、核心理解

```
KMP 协程由 kotlinx.coroutines 提供统一 API，但不同平台执行环境差异显著。
Android 使用 JVM 原生线程模型。
iOS 依赖 Kotlin/Native Worker（无共享堆内存）。
Kotlin/Native 旧内存模型下对象线程隔离，跨线程需 freeze()。
```

### 2.2 协程调度器

1、对比

|       Dispatcher       |  底层机制   |               说明               |
| :--------------------: | :---------: | :------------------------------: |
|    Dispatchers.Main    | 主 RunLoop  | 对应 Android Looper / iOS 主线程 |
|  Dispatchers.Default   |   Worker    |          多线程后台任务          |
| Dispatchers.Unconfined | 当前 Worker |          不推荐常规使用          |

2、实战示例：

```
CoroutineScope(Dispatchers.Main).launch {
    val data = withContext(Dispatchers.Default) {
        fetchDataFromNetwork()
    }
    updateUI(data)
}
```

3、加分点

```
iOS 的 Dispatchers.Main 由 nsQueueDispatcher（GCD Main Queue）实现。
老版本可用 newSingleThreadContext("Main") 自行实现。
可通过 kotlinx.coroutines.darwin 模块启用官方 iOS Main Dispatcher。
```

4、 关键总结

```
Android 调度基于线程池，iOS 基于 GCD Worker。
旧模型下协程间对象需 freeze()，新内存模型可直接共享。
```

### 2.3 CoroutineScope

1、KMP 常用的三种协程作用域(Scope)

|      Scope       | 生命周期管理 |        典型用途         |
| :--------------: | :----------: | :---------------------: |
|   MainScope()    |    UI 层     |  ViewModel / Presenter  |
| ApplicationScope |    全局级    |     后台任务、同步      |
|   自定义 Scope   |   灵活控制   | Repository / UseCase 层 |

2、示例

```
class SharedViewModel {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main)

    fun loadData() {
        scope.launch {
            val data = withContext(Dispatchers.IO) { api.fetch() }
            _state.value = data
        }
    }

    fun clear() {
        scope.cancel()
    }
}
```

3、跨平台实践

```
1、说明
避免使用 GlobalScope(无生命周期绑定)。
通过 expect/actual 提供各平台 Scope：

2、示例
// commonMain
expect val uiScope: CoroutineScope

// androidMain
actual val uiScope = viewModelScope

// iosMain
actual val uiScope = MainScope()
```

4、面试要点

```
iOS 不存在 ViewModel 生命周期，Scope 需自定义管理。
优先使用结构化并发(supervisorScope、withContext)。
```

### 2.4 freeze() 与共享内存

#### 旧模型(Classic MM)

1、 概念

```
Kotlin/Native 不支持线程间共享可变对象：

val user = User("Tom", 20)
user.freeze()  // 冻结后只读
```

2、对比

|            机制            |        含义        |
| :------------------------: | :----------------: |
|          freeze()          |  标记为不可变对象  |
|          isFrozen          |    检查冻结状态    |
| InvalidMutabilityException | 修改冻结对象时抛出 |

3、冻结

```
旧模型中 Flow / StateFlow 需显式冻结
```

#### 新模型(New Memory Model)

1、说明

```
Kotlin 1.9+ 起默认启用，Kotlin 2.x 全面替代旧模型。
```

2、特点

```
移除 freeze 限制，支持多线程共享可变状态；
内置并发 GC；
无需手动冻结；
兼容 Swift 并发模型。
```

6、Gradle 启用方式

```
kotlin.native.binary.memoryModel=experimental
```

#### 面试总结

|  模型  |            特点            |        建议        |
| :----: | :------------------------: | :----------------: |
| 旧模型 |  隔离堆内存、手动 freeze   | 仅维护旧项目时使用 |
| 新模型 | 自动内存管理、线程安全共享 |    建议默认启用    |

### 2.5 SharedFlow 与 StateFlow

1、区别对比

|     特性      |     StateFlow      |       SharedFlow        |
| :-----------: | :----------------: | :---------------------: |
|    初始值     |    必须有初始值    |          可选           |
| 重放 (Replay) |      仅最新值      |         可配置          |
|     用途      | 持久状态(UI State) | 一次性事件(Toast、导航) |
|   是否热流    |        热流        |          热流           |

2、示例

```
// 状态流 StateFlow
private val _uiState = MutableStateFlow(UiState())
val uiState = _uiState.asStateFlow()

// 事件流 SharedFlow
private val _events = MutableSharedFlow<UiEvent>()
val events = _events.asSharedFlow()
```

3、跨平台桥接

```
Android：lifecycleScope.launchWhenStarted { collect {...} }
iOS (Swift)：通过 callbackFlow 或 KMP-NativeCoroutines 转换为 AsyncStream 收集。
Compose Multiplatform：直接使用 collectAsState()。
```

4、面试加分

```
StateFlow = 状态；SharedFlow = 事件。
两者均可放在 shared 层共用，无需平台区分。
KMP NativeCoroutines 插件可桥接 suspend / Flow → Swift async/await。
```

## 三 总结

|    面试主题    |         核心考点          |              实战重点              |
| :------------: | :-----------------------: | :--------------------------------: |
| 协程跨平台运行 | JVM vs Native Worker 模型 |         异步复用与数据共享         |
| iOS Dispatcher |  MainQueue / Worker 调度  |           主线程 UI 更新           |
|   Scope 管理   |       生命周期绑定        | Android ViewModel / iOS Controller |
|    内存模型    |   freeze 与 New MM 对比   |           并发安全与迁移           |
|   Flow 应用    |    热流机制与状态管理     |      Compose/SwiftUI 数据同步      |

