---
title: 项目最新实践和应用——KMP开发关键字
categories:
  - 开发
  - U-项目实践
  - Android项目
tags:
  - Kotlin
abbrlink: 4cd5a0e9
date: 2025-08-25 10:09:28
---
## 一 概述

```
本文介绍：
 -Kotlin Multiplatform (KMP) 和 Kotlin Compose 中使用的关键字和概念
 -涉及到多平台开发和界面构建
```

<!--more-->

## 二 常用关键字

### 2.1 expect 和 actual

```
1、作用: 用于多平台代码共享中，指定平台特定的实现。

2、说明:
 expect 用于声明一个平台特定的 API（在 commonMain 中声明）。
 actual 用于为具体平台提供实现（在各平台的 platform-specific 代码中）
 
3、示例
// commonMain
expect fun platformName(): String

// iosMain
actual fun platformName(): String = "iOS"

// androidMain
actual fun platformName(): String = "Android"
```

### 2.2 @Composable

```
1、作用: 标记一个函数为 Compose UI 组件。

2、说明: 用于声明可组合的 UI 元素，表示该函数可以在 UI 树中被调用并构建出界面

3、示例
@Composable
fun Greeting(name: String) {
    Text("Hello, $name!")
}
```

### 2.3 remember 和 rememberSaveable

```
1、作用: 用于在 Compose 中管理状态，避免在重新组合时丢失数据。

2、说明:
 remember 用于在组合期间保持状态。
 rememberSaveable 用于在界面重新组合和进程恢复时保存状态。
 
3、示例
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

### 2.4 @State(过时，用remember)

```
1、作用: 用于在 Compose 中声明一个状态。

2、说明: @State 是一种声明式的方式，用于处理 UI 元素的动态数据。

3、示例
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Click count: $count")
    }
}
```

### 2.5 @Preview

```
1、作用: 在 Android Studio 中预览 Compose UI。

2、说明: 用于在 Android Studio 中生成预览 UI。

3、示例
@Preview
@Composable
fun PreviewGreeting() {
    Greeting("World")
}
```

### 2.6 mutableStateOf 和 derivedStateOf

```
1、作用: 创建可变的状态值，和衍生状态。

2、说明:
 mutableStateOf 用于声明可变状态。
 derivedStateOf 用于基于其他状态计算一个新的状态。
 
3、示例
val count = mutableStateOf(0)
val doubleCount = derivedStateOf { count.value * 2 }
```

### 2.7 CoroutineScope

```
1、作用: 支持并发操作和异步调用。

2、说明: 用于在 Compose 中执行异步操作，通常结合 launchInComposition 或 LaunchedEffect 使用。

3、示例
@Composable
fun LoadData() {
    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        val data = loadDataAsync()
        // Update UI based on loaded data
    }
}
```

### 2.8 LaunchedEffect

```
1、作用: 用于在 @Composable 函数中启动一个协程进行副作用操作。

2、说明: 使得在组合过程中，可以执行异步操作，如网络请求、动画等。

3、示例
@Composable
fun LoadData() {
    LaunchedEffect(key1 = Unit) {
        // Perform async work here
    }
}
```

### 2.9 produceState

```
1、作用: 创建一个在 Compose 中的状态，它的值由外部协程或异步操作生成。

2、说明: 常用于在 Composable 函数中加载异步数据，并且直接绑定到 UI。

3、示例
@Composable
fun DataLoader() {
    val data = produceState<String>(initialValue = "Loading...") {
        value = loadDataFromApi() // Async call
    }
    Text(text = data.value)
}
```

### 2.10 ComposableContract

```
1、作用: 用于定义 Compose 函数的契约。

2、说明: 可以提供某些约束，通常用于提升编译时性能和代码优化。
```

### 2.11 Modifier

```
1、作用: 用于修改 Compose 元素的行为和样式。

2、说明: Modifier 是 Compose 中处理布局和样式的核心工具

3、示例
Text(
    text = "Hello, World!",
    modifier = Modifier.padding(16.dp)
)
```

### 2.12 @BindingAdapter

```
1、作用: 在 Compose 中绑定数据到 UI 元素。

2、说明: 用于 Compose 中的 UI 绑定，尤其是在复杂的数据流中
```

## 三 总结

```
这些是 KMP 和 Kotlin Compose 中常见的一些关键字和概念，
涵盖了从平台实现到 UI 构建、状态管理等多方面内容。
```

