---
title: Android开发之——Jetpack Compose基础(06)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Jetpack Compose
abbrlink: 920db7a
date: 2022-11-14 08:52:21
---
## 一 概述

* 生命周期
* 修饰符
* Jetpack Compose 的阶段
* Jetpack Compose 架构分层
* CompositionLocal
* Compose 导航

<!--more-->

## 二 生命周期

进入组合、执行重组、退出组合

## 三 修饰符

### 3.1 修改

```
示例：modifier = Modifier.padding(24.dp)
```

### 3.2 修饰符顺序不同效果不同

## 四 Jetpack Compose 的阶段

组合、布局、绘制

## 五 Jetpack Compose 架构分层

* Runtime(运行时)：此模块提供了 Compose 运行时的基本组件
* UI(界面)：界面层由多个模块（ui-text、ui-graphics 和 ui-tooling 等）组成
* Foundation(基础)：此模块为 Compose 界面提供了与系统无关的构建块
* Material：此模块为 Compose 界面提供了 Material Design 系统的实现

## 六 CompositionLocal

### 6.1 CompositionLocal 提供值

CompositionLocalProvider 、provides infix 函数

### 6.2 创建 CompositionLocal

compositionLocalOf、staticCompositionLocalOf

## 七 Compose 导航

NavController、NavHost、navigate、navArgument、NavBackStackEntry 、 NavDeepLink

## 八 思维导图

![][1]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/Jetpack-Compose-06.png