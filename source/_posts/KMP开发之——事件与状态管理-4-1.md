---
title: KMP开发之——事件与状态管理(4.1)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: 6c2a0d13
date: 2026-01-17 09:23:15
---
## 一 概述

```
在 Compose/KMP 中有一句非常重要的话：
UI 是状态的函数：UI = f(State)
```

<!--more-->

## 二 相关概念

### 2.1 为什么「事件与状态」重要

```
1-在传统命令式 UI 中：
-改 View
-手动刷新
-同步 UI 状态

2-在 Compose 中：
-不直接改 UI
-只改 State
-UI 自动重组（Recomposition）

3-总结：
事件 → 改变状态 → UI 更新
```

### 2.2 Compose 中的 State 是什么？

```
1-State 的定义
State = 影响 UI 展示的数据
var count by remember { mutableStateOf(0) }

说明：
-mutableStateOf：可观察状态
-状态变化 → 触发重组

2、最简单的状态示例
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

## 三 事件(Event)的概念

### 3.1 什么是事件？

```
1-事件 = 用户行为或系统行为
-点击
-输入
-滑动
-网络回调

2、示例
Button(onClick = { /* 事件 */ })
```

### 3.2 Compose 的事件特点

|     特点     |      说明       |
| :----------: | :-------------: |
| 无监听器对象 |   直接 Lambda   |
|    单向流    |  Event → State  |
| 无 View 引用 | 无 findViewById |

## 四 状态管理

### 4.1 单向数据流(UDF)

1- 标准模型

```
State  →  UI
UI     →  Event
Event  →  State
```

2-错误示例(反模式)

```
@Composable
fun BadExample() {
    var text by remember { mutableStateOf("") }

    TextField(
        value = text,
        onValueChange = {
            text = it
            // x 同时处理复杂业务
        }
    )
}
```

3-正确示例(事件外提)

```
@Composable
fun Input(value: String,onValueChange: (String) -> Unit) {
    TextField(value, onValueChange)
}
```

### 4.2 remember 与 rememberSaveable

1-remember

```
1-代码
val checked by remember { mutableStateOf(false) }

2-说明：
-重组不丢失
-配置变化会丢失（Android）
```

2-rememberSaveable(Android)

```
1-代码
val checked by rememberSaveable { mutableStateOf(false) }

2-说明
-支持旋转屏幕
-iOS / Desktop 行为不同

3-KMP 中：
公共层不依赖 rememberSaveable
```

### 4.3 状态提升(State Hoisting)

1- 什么是状态提升

```
状态不由组件自己管理，而是交给父级
```

2-示例

```
@Composable
fun SwitchItem(checked: Boolean,onCheckedChange: (Boolean) -> Unit) {
    Switch(
        checked = checked,
        onCheckedChange = onCheckedChange
    )
}
```

3-父级管理状态

```
var checked by remember { mutableStateOf(false) }

SwitchItem(
    checked = checked,
    onCheckedChange = { checked = it }
)
```

## 五 KMP 场景下的状态分层

### 5.1 UI State(Composable 内)

```
1-说明
-输入框内容
-是否展开
-是否选中

2-代码
remember { mutableStateOf(...) }
```

### 5.2 Screen State(ViewModel)

```
1-说明
-页面数据
-加载状态
-错误状态

2-代码
data class UiState(
    val loading: Boolean,
    val list: List<Item>
)
```

### 5.3 Domain State(shared)

```
-业务状态
-网络结果
-本地缓存

不依赖 Compose
```

## 六 事件建模(推荐做法)

### 6.1 使用 sealed class

```
sealed class UiEvent {
    object Load : UiEvent()
    data class ClickItem(val id: String) : UiEvent()
}
```

### 6.2 UI 发送事件

```
Button(onClick = {
    onEvent(UiEvent.Load)
})
```

### 6.3 ViewModel 处理事件

```
fun onEvent(event: UiEvent) {
    when (event) {
        UiEvent.Load -> loadData()
        is UiEvent.ClickItem -> openDetail(event.id)
    }
}
```

## 七 Compose + KMP 常见误区

### 7.1 在 Composable 里直接请求网络(错误)

```
放在 ViewModel / shared
```

### 7.2 一个组件同时管理多种状态(错误)

```
拆分
```

### 7.3 UI 直接修改 shared 数据(错误)

```
通过事件
```

## 八 事件与状态管理规范总结

```
推荐公式：

Composable = 展示 + 事件分发
ViewModel  = 状态管理 + 业务
Shared     = 业务规则 + 数据
```

