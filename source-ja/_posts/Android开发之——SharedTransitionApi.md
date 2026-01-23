---
title: Android开发之——SharedTransitionApi
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 233c023c
date: 2025-08-05 09:31:08
---
## 一 概述

```
@OptIn(ExperimentalSharedTransitionApi::class) 
是用于启用 Jetpack Compose 中实验性 API 的一种方式。
它的作用是 显式声明你知晓并愿意使用还不稳定的 API。
```

<!--more-->

## 二 基本含义

```
1、注解
@OptIn(ExperimentalSharedTransitionApi::class)

2、说明
表示你要使用 Jetpack Compose 的 SharedElement 动画功能，
这个 API 目前处于实验阶段，不保证稳定，未来可能发生重大变更。

3、位置：这个注解通常出现在函数、类、文件头部
@OptIn(ExperimentalSharedTransitionApi::class)
@Composable
fun MyScreen() {
    // 使用 SharedElementTransition
}
```

## 三 什么是 SharedTransition API？

### 3.1 概念

```
SharedTransition 是 Compose Navigation 动画系统的一部分，
可以实现 跨界面共享元素转场动画（Shared Element Transition），

比如：
-A 页图片过渡到 B 页大图
-列表项平滑过渡到详情页布局

Jetpack Compose 官方从 1.5.0 开始引入了这个实验性 API。
```

### 3.2 示例

```
val transitionScope = rememberSharedTransitionScope()

SharedTransitionScope(transitionScope) {
    SharedElement(
        key = "image_${item.id}",
        screenKey = currentScreen,
        transitionSpec = SharedTransitionSpec()
    ) {
        Image(...)
    }
}
```

## 四 为什么需要 `@OptIn(...)`？

### 4.1 说明

```
Compose中所有标记了@Experimental的API都要求你显示声明使用意图，否则编译器会报错或警告。
```

### 4.2 示例

```
以下代码如果没有加 @OptIn 编译器会提示如下错误：
This declaration is experimental and its usage should be marked with '@androidx.compose.animation.ExperimentalSharedTransitionApi'
```

## 五 搭配使用建议

```
1、推荐这样标注函数或文件
@OptIn(ExperimentalSharedTransitionApi::class)
@Composable
fun DetailScreen() {
    ...
}

2、或在整个文件顶部全局声明
@file:OptIn(ExperimentalSharedTransitionApi::class)
```

## 六 相关依赖与启用(compose 1.5+)

```
如果你要使用该 API，需要添加
implementation("androidx.compose.animation:animation:1.5.0")

确保你的 Compose Compiler 是 1.5.0 或更高版本。
```

