---
title: Android开发之——Jetpack Compose附带效应(05)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Jetpack Compose
abbrlink: ed125c2
date: 2022-11-14 08:48:08
---
## 一 概述

* 附带效应说明
* 状态和效应用例
* 重启效应

<!--more-->

## 二 附带效应说明

* 指发生在可组合函数作用域之外的应用状态的变化
* 可组合项在理想情况下应该是无附带效应的

## 三 状态和效应用例

* LaunchedEffect：在某个可组合项的作用域内运行挂起函数
* rememberCoroutineScope：获取组合感知作用域，以便在可组合项外启动协程
* rememberUpdatedState：在效应中引用某个值，该效应在值改变时不应重启
* DisposableEffect：需要清理的效应
* SideEffect：将 Compose 状态发布为非 Compose 代码
* produceState：将非 Compose 状态转换为 Compose 状态
* derivedStateOf：将一个或多个状态对象转换为其他状态
* snapshotFlow：将 Compose 的 State 转换为 Flow

## 四 思维导图
![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/Jetpack-Compose-05.png