---
title: Android面试题——掘金-架构之常见架构模式(6.1)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 93879ccc
date: 2025-04-07 10:40:45
---
## 一 概述

```
以下是关于 Android 架构模式（MVC、MVP、MVVM、MVI） 的常见面试题及答题思路整理，
方便你在项目复盘或面试准备中快速查阅与理解。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 MVC 是什么？它的问题在哪？

```
1.MVC（Model-View-Controller）是最早的架构模式之一：
-Model：数据和业务逻辑
-View：UI 展示层（Activity / Fragment / XML）
-Controller：控制器，接收用户输入并调度 Model、View

2.在 Android 中的问题：
-View（Activity）既包含 UI 又处理业务逻辑，成为“胖 Controller”；
-难以测试（UI 与逻辑耦合）
-维护困难，不利于多人协作
```

### 2.2 MVP 是什么？相比 MVC 有什么优势？

1-MVP（Model-View-Presenter）将业务逻辑进一步拆分

|   组件    |           作用           |
| :-------: | :----------------------: |
|   Model   |          数据层          |
|   View    | 只负责 UI 展示，接口暴露 |
| Presenter |  控制层，负责逻辑和调度  |

2-优劣

```
1.优势：
-解耦视图与逻辑，View 只做展示
-便于单元测试（Presenter 可独立测试）
-适合 UI 逻辑较重的项目

2.劣势：
-接口过多（View 层接口暴露繁琐）
-手动绑定、解绑生命周期易出错
```

### 2.3 MVVM 是什么？它的优势在哪？

1-MVVM（Model-View-ViewModel）是 Jetpack 推荐架构：

|   组件    |                说明                |
| :-------: | :--------------------------------: |
|   Model   | 数据层，通常为 Repository + 数据源 |
|   View    |  UI 展示层（Activity / Fragment）  |
| ViewModel | 状态和逻辑持有者，生命周期感知组件 |

2-优劣

```
优势：
-ViewModel 解耦 UI 和逻辑
-配合 LiveData 或 StateFlow 实现数据驱动视图更新
-避免内存泄漏，自动跟随生命周期
示例流程：
View -> ViewModel -> Repository -> Model
                   ↑ LiveData/StateFlow ↓
               View 自动监听数据变化
```

### 2.4 MVVM 和 MVP 的区别？

|   对比项    |      MVP      |               MVVM                |
| :---------: | :-----------: | :-------------------------------: |
|   中介者    |   Presenter   |             ViewModel             |
| UI 通知方式 | View 接口回调 |       LiveData / Observable       |
|  双向绑定   |   手动实现    |      可通过 DataBinding 实现      |
|   测试性    |   易于测试    | 更好（ViewModel 无 Android 依赖） |
| 架构简洁性  | View 接口过多 |      ViewModel 清晰持有状态       |

### 2.5 MVI 是什么？相比 MVVM 有什么不同？

```
1.MVI（Model-View-Intent）是 Redux 思想在 Android 中的体现：
-View：UI，用户操作转为 Intent（意图）
-Intent：用户行为（点击、滑动）
-Model：状态（State），不可变
-ViewModel（或 Presenter）：接收 Intent → 处理 → 返回新 State

2.核心： 所有状态都通过一个 State 对象 表达，单向数据流（Unidirectional Data Flow）
User Intent → ViewModel → State → View 渲染
```

### 2.6  MVI 有什么优劣？

|        优势        |              劣势              |
| :----------------: | :----------------------------: |
|  状态单一、可追踪  |           学习成本高           |
| 单向数据流，易调试 | 实现复杂度高（适合中大型项目） |
| 更易于恢复 UI 状态 |   State 更新频繁可能影响性能   |

### 2.7 实际项目中应该选择哪种架构？

1-常见架构

|  项目复杂度   |           推荐架构            |
| :-----------: | :---------------------------: |
|   简单项目    |          MVVM 或 MVP          |
|  中大型项目   |  MVVM / MVI（配合 Jetpack）   |
| 组件化/多模块 | MVI + Redux / Jetpack Compose |

2-说明

```
MVVM 是当前 Android 的主流，Jetpack Compose 更倾向 MVI 思路（单向数据流 + State 驱动）
```

### 2.8 Android Jetpack 提供了哪些架构支持？

```
-ViewModel：用于持有和管理 UI 数据
-LiveData / StateFlow：响应式数据源，自动感知生命周期
-DataBinding / ViewBinding：简化 UI 更新和数据绑定
-Navigation：统一导航逻辑
-Hilt / Dagger：注入 ViewModel / Repository
-Room / WorkManager：数据和任务解耦
```

### 2.9 总结对比表

| 架构 | 是否解耦 UI/逻辑 | 是否数据驱动 | 是否支持单向流 | 易测试性 | 学习曲线 |
| :--: | :--------------: | :----------: | :------------: | :------: | :------: |
| MVC  |        ❌         |      ❌       |       ❌        |    差    |    低    |
| MVP  |  ✅（通过接口）   |      ❌       |       ❌        |    中    |    中    |
| MVVM |  ✅（LiveData）   |      ✅       |     可实现     |    ✅     |    中    |
| MVI  |   ✅（状态机）    |      ✅       |       ✅        |    ✅✅    |    高    |

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)