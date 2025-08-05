---
title: Android开发之——Compose架构常用API(1)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 45740b41
date: 2025-08-05 09:31:47
---
## 一 概述

```
本文介绍Android Jetpack Compose 和 Hilt 依赖注入架构中常用的组件或 API
```

<!--more-->

## 二 组件或API

### 2.1 @Composable —— 声明可组合函数

```
1、概念
@Composable 是 Compose 的核心注解，
用于标记一个函数是可以被 Compose 运行时调用并参与 UI 构建的。

2、示例
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}
```

### 2.2 State 管理核心：`stateIn` + `collectAsStateWithLifecycle`

1、stateIn

```
1、概念
-是 Kotlin Flow 的扩展，用于将一个 Flow<T> 转换为 StateFlow<T>，
从而具有状态保持能力，常用于 ViewModel 中构建 UI 状态流。
-通常配合 viewModelScope 使用。

2、示例
val uiState: StateFlow<MyUiState> = repository
    .getUser()
    .map { MyUiState(it) }
    .stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = MyUiState()
    )
```

2、collectAsStateWithLifecycle

```
1、概念
-是 Compose 中收集 StateFlow 或 Flow 的推荐方式，它自动绑定生命周期，防止内存泄漏。
-用于在 @Composable 中收集 ViewModel 的数据流。

2、示例
@Composable
fun MyScreen(viewModel: MyViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    Text(text = uiState.message)
}
```

### 2.3  依赖注入：@Singleton、@Inject、@HiltViewModel

1、@Singleton

```
1、概念
用于标记某个依赖在整个应用生命周期中只创建一次的单例

2、示例
@Singleton
class UserRepository @Inject constructor(
    private val api: UserApi
)
```

2、@Inject

```
1、概念
用于构造函数或属性注入依赖

2、示例
class MyViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel()
```

3、@HiltViewModel

```
1、概念
标记 ViewModel 以供 Hilt 管理注入。需要与 hiltViewModel() 搭配使用

2、示例
@HiltViewModel
class MyViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel()
```

### 2.4 事件流与状态：MutableSharedFlow、SharedFlow

1、MutableSharedFlow

```
1、概念
-可写版本，用于发送事件，如一次性消息（导航、Toast）。
-通常在 ViewModel 中使用。

2、示例
private val _eventFlow = MutableSharedFlow<UiEvent>()
val eventFlow: SharedFlow<UiEvent> = _eventFlow

fun onClickButton() {
    viewModelScope.launch {
        _eventFlow.emit(UiEvent.ShowToast("Clicked!"))
    }
}
```

2、SharedFlow

```
1、概念
只读版本，暴露给 UI 层监听。

2、示例
LaunchedEffect(Unit) {
    viewModel.eventFlow.collect { event ->
        when (event) {
            is UiEvent.ShowToast -> {
                Toast.makeText(context, event.message, Toast.LENGTH_SHORT).show()
            }
        }
    }
}
```

3、总结协作流程（图解式）：

```
[ Repository ] --> Flow<T> --(stateIn)--> [ ViewModel (Hilt注入) ]
                                     |
                            --> StateFlow<T> --> UI层 collectAsStateWithLifecycle
                                     |
                            --> MutableSharedFlow<UiEvent> --(emit事件)-->
                                     |
                             <-- SharedFlow<UiEvent> --(LaunchedEffect收集)
```

