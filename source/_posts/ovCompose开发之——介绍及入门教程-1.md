---
title: ovCompose开发之——介绍及入门教程(1)
categories:
  - 开发
  - F-跨平台
  - ovCompose
tags:
  - ovCompose
abbrlink: 29950f0
date: 2025-12-11 13:05:26
---
## 一 概述

```
本文介绍：
 - ovCompose 是什么
 - 入门教程
```

<!--more-->

## 二 ovCompose 是什么

### 2.1 背景与来源

```
ovCompose(Online Video Compose）)是由 腾讯视频大前端 Oteam 团队推出的跨平台 UI框架，
基于 JetBrains Compose Multiplatform 打造。

项目地址:https://github.com/Tencent-TDS/ovCompose-multiplatform-core
```

### 2.2 目标

```
官方 Compose Multiplatform 在 iOS/HarmonyOS/桌面 等平台上的支持不完善；
多端(Android、iOS、HarmonyOS)开发中 UI 不统一、维护成本高 的问题；
提供一个 统一代码逻辑 + 一套 UI 渲染层 的跨平台解决方案。
```

## 三 主要特性

|     特性     |                            说明                            |
| :----------: | :--------------------------------------------------------: |
|  跨平台统一  | 支持 Android、iOS、HarmonyOS（纯血鸿蒙） 等多端共用一套 UI |
| 基于 Compose |   采用声明式 UI 编程模型，完全兼容 Jetpack Compose 生态    |
|  自渲染引擎  |       不依赖原生控件，使用 Skia 实现跨端一致渲染效果       |
|  模块化设计  |         可独立于原生模块使用，支持混合（混排）模式         |
|   性能优化   |            针对视频业务、高帧率场景做了底层优化            |
|   生态兼容   |  与 Kotlin Multiplatform (KMP) 完整兼容，支持 shared 模块  |

## 四 适用场景

```
-需要一套代码同时运行在 Android、iOS、HarmonyOS 上的应用；
-已有 Compose Multiplatform / KMP 基础，希望快速实现 UI 共用；
-追求一致的 UI 体验与高性能渲染；
-如果只是做单端 Android App，用官方 Jetpack Compose 即可，无需 ovCompose。
```

