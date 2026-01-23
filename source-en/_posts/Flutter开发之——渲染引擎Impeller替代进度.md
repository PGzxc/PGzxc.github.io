---
title: Flutter开发之——渲染引擎Impeller替代进度
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 65441a8f
date: 2025-09-05 07:40:40
---
## 一 概述

```
本文介绍：从 Skia 转向 Impeller的进度
```

<!--more-->

## 二 Flutter各平台替换进度

### 2.1 iOS 上的替代已经完成

```
-从Flutter3.29(发布日期约为 2025 年中)开始，iOS 平台默认使用 Impeller 渲染引擎，并且 无法切换回 Skia
-此前在 Flutter 3.10 就已在 iOS 开启 Impeller，并逐步稳定下来。

所以如果你是使用最新版 Flutter 构建 iOS 应用，现在 Impeller 已经是默认引擎，Skia 已经不再被用作首选了。
```

### 2.2 Android 上的替代正在推进中

```
在 Flutter 3.27(发布于 2024 年 12 月)中，
Impeller 开始成为 现代设备上默认渲染引擎，代替 Skia 来提升性能、减少延迟。

官方文档指出，对 Android API 29+ 的设备，Impeller 已启用并默认使用；
在不支持 Vulkan 或设备较旧时，会自动回退到 Skia/OpenGL。

这意味着在新版 Flutter 上，如果目标设备比较新，Impeller 通常会被选用。
对于老设备，目前仍可能使用 Skia。
```

### 2.3 Web 与桌面平台支持仍在规划中

```
-Web(CanvasKit/Skwasm)目前仍在使用 Skia 渲染；Impeller 尚未用于 Web。
-桌面（如 macOS）尚处于可选并需要开启的状态，尚未全面默认使用 Impeller。
```

## 三 总结替代时间线一览

|  平台   |         Impeller 默认启用时间          |           Skia 状态及备注            |
| :-----: | :------------------------------------: | :----------------------------------: |
|   iOS   | Flutter 3.10 开始试点 → 3.29 完全默认  |      已完整替代 Skia，不可切换       |
| Android | Flutter 3.27 开始默认用于 API 29+ 设备 |    老设备仍用 Skia 或 OpenGL 回退    |
|   Web   |           尚未启用 Impeller            |  继续使用 CanvasKit/Skiasw 替代路径  |
|  桌面   |           可选启用（未默认）           | Skia 仍主导，多平台仍在推进 Impeller |

## 四 开发者应该怎么做？

### 4.1 如果你是iOS 开发者

```
如果你是 iOS 开发者：
 -默认已使用 Impeller，无需额外配置；
 -如需回退，可通过 --no-enable-impeller 或修改 Info.plist 暂时切换（仅建议用于调试或解决兼容性问题）
```

### 4.2 如果你是Android 开发者

```
1、使用最新 Flutter（>= 3.27）构建时，Impeller 在新设备上会被默认启用；

2、若需显性控制，可：
-在开发中通过 flutter run --no-enable-impeller 禁用；
-在 AndroidManifest 中加入：
 <meta-data 
 android:name="io.flutter.embedding.android.EnableImpeller"android:value="false" />
-如需测试性能差异，建议使用 DevTools 或真机集成测试框架对比渲染表现 
```

