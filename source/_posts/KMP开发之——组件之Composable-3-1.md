---
title: KMP开发之——组件之Composable(3.1)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: 47767d19
date: 2026-01-14 09:32:58
---
## 一 概述

```
在 KMP 中，UI 层的核心就是 Composable。
它相当于 Flutter 里的 Widget、React 里的 Function Component。
```

<!--more-->

## 二 什么是 Composable

### 2.1 基本定义

```
1-在 Compose 中：
@Composable
fun MyText() {
    Text("Hello KMP")
}

2-说明
-@Composable：声明这是一个 可组合函数
-函数本身 不返回 View
-UI 由函数执行时产生

3-总结
UI = 函数 + 状态
```

### 2.2 Compose 的核心思想

|        概念         |                说明                |
| :-----------------: | :--------------------------------: |
|      声明式 UI      | 描述「长什么样」，而不是「怎么画」 |
| 重组(Recomposition) |       状态变化 → 自动刷新 UI       |
|     单向数据流      |          State ↓ Event ↑           |

### 2.3 与 Flutter / RN 的对比

|  Compose   |   Flutter   |       React        |
| :--------: | :---------: | :----------------: |
| Composable |   Widget    | Function Component |
|  Modifier  | Widget 属性 |   style / props    |
|  remember  |    State    |      useState      |

## 三 Composable 的设计规范

### 3.1 函数要小

```
不要：一个 Composable 写 300 行
推荐：拆成多个 UI 组件
```

### 3.2 无业务逻辑

```
1、不要
不请求网络
不读数据库
不处理复杂逻辑

2-推荐
业务进 ViewModel
```

### 3.3 参数即状态

```
@Composable
fun UserItem(
    name: String,
    avatar: String
)
```

## 四 KMP 中使用 Composable 的注意点

### 4.1 iOS 现状说明

```
1-Compose Multiplatform iOS：实验阶段

2-正式项目建议：
-Android / Desktop 用 Compose
-iOS 用 SwiftUI + shared ViewModel
```

### 4.2 资源加载差异

```
Android：drawable
Desktop / iOS：resources
```

