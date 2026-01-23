---
title: Flutter开发之——渲染引擎Impeller
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 8ab19757
date: 2025-09-05 07:39:46
---
## 一 概述

```
Flutter 从 Skia 转向 Impeller 并不是简单的“替代”，
而是因为 Flutter 团队在移动端和多平台渲染上遇到了 Skia 难以解决的一些痛点
```

<!--more-->

## 二 Skia 的问题

### 2.1 Skia

```
Skia 是 Google 内部长期使用的跨平台 2D 渲染引擎(Chrome、Android、Firefox、Figma 等都在用)，
Flutter 从一开始就基于 Skia。

它的优点是成熟、跨平台，但 Flutter 的需求和 Skia 的设计并不完全匹配
```

### 2.2 Skia问题

```
1、OpenGL 依赖过重
 -Flutter 在 Android/iOS/Web 上最常用的后端是 OpenGL，但
 OpenGL 在移动端 GPU 驱动支持不稳定（尤其是 iOS Metal、Android Vulkan 设备）。

 -导致 Flutter 在复杂 UI 或动画下容易掉帧、产生 jank（卡顿）
 
2、渲染时编译 Shader(Shader Jank)
 -Skia 运行时遇到新的 shader（着色器）会编译 GLSL → GPU 专用字节码。
 -这个编译过程会阻塞主线程，引起明显卡顿（比如第一次进入某个动画场景）
 
3、现代 GPU 特性利用不足 
-Skia 设计比较通用，Flutter 无法完全掌控底层渲染流程。
-对于 Vulkan / Metal 的一些特性(预编译着色器、tile-based 渲染优化)，Skia 没有做针对 Flutter 的优化。
```

## 三 Impeller 的设计目标

### 3.1 Impeller介绍

```
Impeller 是 Flutter 团队自己打造的新一代 GPU 渲染引擎，
定位是 “为 Flutter 定制的渲染器”
```

### 3.2 核心目标

```
1、完全规避 Shader Jank
 -所有 shader 在构建时预编译（而不是运行时），运行时直接使用。
 -这样首次加载复杂动画也不会卡顿。
 
2、面向现代图形 API（Metal / Vulkan / DX12）
 -Impeller 的架构是针对 低层次 GPU API 来写的，而不是依赖 OpenGL。
 -在 iOS 上直接用 Metal，在 Android 上用 Vulkan（未来会支持更多）
 
3、为动画优化的流水线
 -Flutter 的 UI 大量依赖动画，而 Impeller 渲染流水线是专门针对 动画流畅度 设计的。
 -比如：批处理绘制、减少 GPU 状态切换
 
4、确定性渲染性能
Flutter 要在 60FPS/120FPS 下保持稳定，
而 Impeller 的目标是让 帧时间更可预测，避免偶发的 jank。

5、长期可控性
 -Flutter 团队不想受制于 Skia 的设计决策。
 -Impeller 由 Flutter 自己掌控，可以针对未来的跨平台（移动、桌面、Web、XR）持续优化。
```

## 四 Impeller 与 Skia 的对比总结

|   特性   |         Skia          |                Impeller                 |
| :------: | :-------------------: | :-------------------------------------: |
|  着色器  |  运行时编译(有 jank)  |              构建时预编译               |
| API 后端 |  OpenGL/Metal/Vulkan  |            Metal/Vulkan 定制            |
|   定位   |   通用 2D 渲染引擎    |        专为 Flutter UI/动画优化         |
|  控制权  | Google Skia 团队主导  |          Flutter 团队完全掌控           |
| 目标平台 | 各类应用(浏览器、App) | Flutter 多平台(iOS、Android、桌面、Web) |

## 五 为什么 Skia 会逐渐被替代？

```
-Skia 本质是“通用 2D 引擎”，并不针对 Flutter 优化 → 性能瓶颈难解决。
-移动端 GPU 驱动环境复杂（尤其 Android），Skia 的 OpenGL 方案无法保证 跨设备一致流畅。
-Flutter 需要“完全可控”的引擎来保证 UI 动画流畅度、未来 XR/3D 扩展性。

所以 Flutter 决定打造 Impeller，逐步替代 Skia。
```

## 六 当前进度

```
iOS：Impeller 已经在 Flutter stable 默认开启。

Android：Impeller 仍在优化 Vulkan 后端，还没完全替换 Skia（一些老设备上 Skia 兼容性更好）。

Web/桌面：未来也会逐步支持。
```

