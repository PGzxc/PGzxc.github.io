---
title: Android开发之——常用状态管理
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
  - 状态管理
abbrlink: af42baba
date: 2026-02-12 12:33:05
---
## 一 概述

```
本文介绍Android状态管理：
-Android 主流状态管理 = ViewModel + StateFlow（或 LiveData）
-如果用Jetpack Compose：StateFlow + collectAsState()
```

<!--more-->

## 二 状态管理

### 2.1 早期(Activity / Fragment 时代)

```
1-状态管理
-成员变量
-onSaveInstanceState
-Bundle

2-问题
-易丢失状态
-生命周期复杂
-配置变更难处理
```

### 2.2 Jetpack 官方体系(主流)

1-ViewModel(核心)

```
2-代码
class CounterViewModel : ViewModel() {
    var count = 0
}

2-作用
-生命周期感知
-配置变更不丢状态

几乎所有现代 Android 项目都会用
```

2-LiveData(传统主流)

```
1-代码
val count = MutableLiveData(0)
count.observe(this) { value ->
    textView.text = value.toString()
}

2-优点
-简单
-生命周期安全

3-缺点
-表达能力有限
-协程支持一般

维护旧项目仍常见
```

3-StateFlow(当前推荐)

```
1-代码

private val _state = MutableStateFlow(State())
val state: StateFlow<State> = _state
lifecycleScope.launch {
    viewModel.state.collect { state ->
        // update UI
    }
}
或（Compose）：
val state by viewModel.state.collectAsState()

2-优点
-官方协程体系
-可组合、可测试
-多端一致（KMP）

3-场景：新项目首选
```

### 2.3 Jetpack Compose 时代

1- Compose State(UI 层)

```
1-代码
var text by remember { mutableStateOf("") }

2-特点
-仅限 UI 状态
-不适合业务状态
```

2- ViewModel + StateFlow + Compose(黄金组合)

```
1-代码
@Composable
fun CounterScreen(vm: CounterViewModel) {
    val state by vm.state.collectAsState()
    Text("${state.count}")
}

2-说明
UI = State 的纯函数
```

### 2.4 Redux / MVI 思想在 Android

1-MVI(Intent → State)

```
1-代码
sealed interface Intent {
    object Load : Intent
}
fun reduce(state: State, intent: Intent): State


2-特点
-单向数据流
-可回溯
-非常适合复杂页面
```

2- Android 常用 MVI 框架

|    框架     |     说明     |
| :---------: | :----------: |
|  Orbit MVI  | 官方协程友好 |
|  Mavericks  | Airbnb 出品  |
| ReduxKotlin |  Redux 直译  |

### 2.5 第三方轻量方案(了解)

1- RxJava(老项目)

```
BehaviorSubject
PublishSubject

新项目不推荐
```

2-EventBus / LiveEvent

```
解决事件
不适合作为状态管理
```

## 三 Android 状态管理方案对比

|   方案    | 生命周期安全 | Compose 友好 | 推荐指数 |
| :-------: | :----------: | :----------: | :------: |
| 成员变量  |    不支持    |    不支持    |  1颗星   |
| LiveData  |     支持     |     一般     |  3颗星   |
| StateFlow |     支持     |     支持     |  5颗星   |
|    MVI    |     支持     |     支持     |  4颗星   |
| EventBus  |    不支持    |    不支持    |  1颗星   |

## 四 和 RN / Flutter / KMP 的对照

|  平台   |  主流状态管理   |
| :-----: | :-------------: |
|   RN    |  Zustand / RTK  |
| Flutter | Riverpod / Bloc |
|   KMP   | StateFlow + VM  |
| Android | StateFlow + VM  |

## 五 实战选型建议

### 5.1 新项目(强烈推荐)

```
ViewModel
 + StateFlow
 + Repository
 + Compose
```

### 5.2 中大型项目

```
ViewModel
 + StateFlow
 + MVI（Orbit / 自实现）
```

### 5.3 不推荐

```
Activity 持有业务状态
EventBus 当状态管理
RxJava 新项目
```

