---
title: Android开发之——Jetpack Compose MD设计(07)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Jetpack Compose
abbrlink: ecbf9431
date: 2022-11-14 08:56:12
---
## 一 概述

* Material Design 2
* Material Design 3
* 从 M2迁移至M3

<!--more-->

## 二 Material Design 2

* 颜色
* 排版
* 形状
* 组件状态
* 涟漪

## 三 Material Design 3

* build.gradle添加依赖
* 新特性介绍

## 四 从 M2迁移至M3

### 4.1 原因

* 不应在一个应用中同时使用 M2 和 M3
* 这两个设计系统和各自的库在用户体验/界面设计和 Compose 实现方面大相径庭

### 4.2 分阶段方法

* 添加 M3 依赖项和 M2 依赖项
* 添加 M3 版应用主题和 M2 版应用主题
* 将各个模块、屏幕或可组合项迁移至 M3
* 完全迁移后，请移除 M2 版应用主题
* 移除 M2 依赖项

## 五 思维导图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/Jetpack-Compose-07.png