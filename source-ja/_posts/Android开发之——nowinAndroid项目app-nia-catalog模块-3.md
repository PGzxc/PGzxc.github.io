---
title: Android开发之——nowinAndroid项目app-nia-catalog模块(3)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: d87bcf93
date: 2025-09-18 08:37:44
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下app-nia-catalog模块
 -模块剖析:app-nia-catalog
```

<!--more-->

## 二 模块拆分

### 2.1 app-nia-catalog 模块结构

```
app-nia-catalog/
 ├── build.gradle.kts           # 模块构建脚本
 └── src/main/
      ├── AndroidManifest.xml   # 声明应用入口 Activity
      └── java/com/google/samples/apps/nowinandroid/catalog/
            ├── NiaCatalogActivity.kt   # 应用入口 Activity
            └── Catalog.kt              # Catalog UI 定义
```

### 2.2  功能说明

```
1、NiaCatalogActivity
 -位置：NiaCatalogActivity.kt
 -职责：应用的 唯一入口 Activity
 -作用：
  继承 ComponentActivity
  在 onCreate 中调用 setContent { Catalog() }
  也就是把 Catalog 这个 Composable 设置为整个应用的 UI。

-总结：可以理解为 壳子 (container)，唯一的任务就是挂载 Compose UI。

2、Catalog.kt
 -位置：Catalog.kt
 -职责：定义 整个应用的 UI 内容
 -作用：
  是一个 @Composable fun Catalog()
  内部会调用 NiaDesignSystem（项目的设计系统模块）里的组件，比如 NiaTheme
  展示一系列 Now in Android 的 UI 组件示例（按钮、排版、颜色等）。
  可能包含 LazyColumn / Scaffold 之类的 Compose 结构，把不同组件分组展示出来。

 -总结：可以理解为 舞台(stage)，把所有组件示例摆出来
```

### 2.3 模块职责总结

```
-极简：没有复杂的导航、数据层。
-定位：独立的“样式预览 app”。
-流程：
 NiaCatalogActivity → 作为入口，启动后加载 UI
 Catalog() → 真正的界面逻辑，调用 design system，展示组件样式
-依赖：主要依赖项目里的 core-designsystem 模块
```


### 2.4 可视化理解

```
[ app-nia-catalog 模块 ]
        │
        ▼
┌─────────────────────┐
│  NiaCatalogActivity │   ← 应用入口
└─────────────────────┘
             │
             ▼
┌─────────────────────┐
│      Catalog()      │   ← Compose UI，展示组件样式
└─────────────────────┘
             │
             ▼
   [ core-designsystem ]
   （主题、颜色、排版、组件）
```

## 三 总结

```
这个模块本质就是 一个单 Activity + 一个 UI Composable，
非常干净，方便设计/开发快速预览 Now in Android 的组件样式
```

