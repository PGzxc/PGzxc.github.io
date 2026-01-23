---
title: Android开发之——Jetpack Compose状态管理(04)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Jetpack Compose
abbrlink: a6b09eb0
date: 2022-11-14 08:41:18
---
## 一 概述

* 什么是状态
* 单向数据流
* 状态和组合(状态更新)
* 可组合项中的状态
* 其他受支持的状态类型
* 状态提升
* 状态恢复
* 状态管理

<!--more-->

## 二 什么是状态

随事件变化的任何值

## 三 单向数据流

状态向下流动而事件向上流动

## 四 状态和组合(状态更新)

状态：初始状态、重组状态

组合：初始组合、组合

## 五 可组合项中的状态

声明 MutableState 对象的三种方法

```
val mutableState = remember { mutableStateOf(default) }
var value by remember { mutableStateOf(default) }
val (value, setValue) = remember { mutableStateOf(default) }
```

## 六 其他受支持的状态类型

LiveData、Flow、RxJava2

## 七 状态提升

提升模式中两个参数

```
value: T
onValueChange: (T) -> Unit
```

## 八 状态恢复

rememberSaveable

## 九 状态管理

ViewModel

## 十 思维导图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/Jetpack-Compose-04.png