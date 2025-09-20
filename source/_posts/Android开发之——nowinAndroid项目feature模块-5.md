---
title: Android开发之——nowinAndroid项目feature模块(5)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 9818b795
date: 2025-09-20 08:50:08
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下feature模块
 -模块剖析:feature
```

<!--more-->

## 二 模块拆分

### 2.1 feature 模块结构

```
1、:feature
:feature 本身是一个 空壳模块（仅作分组/命名空间），真正有内容的是它的子模块

2、feature模块结构
:feature/
 ├── bookmarks/        # 书签功能
 │   ├── ui/           # Compose 界面（BookmarkScreen、组件）
 │   ├── navigation/   # 导航入口 (BookmarkNavigation.kt)
 │   ├── BookmarkViewModel.kt
 │   └── build.gradle.kts
 │
 ├── foryou/           # For You 推荐功能
 │   ├── ui/           # Compose 界面（ForYouScreen、Feed、Card）
 │   ├── navigation/   # 导航入口 (ForYouNavigation.kt)
 │   ├── ForYouViewModel.kt
 │   └── build.gradle.kts
 │
 ├── interests/        # 兴趣（作者、主题、新闻资源管理）
 │   ├── ui/
 │   ├── navigation/
 │   ├── InterestsViewModel.kt
 │   └── build.gradle.kts
 │
 ├── search/           # 搜索功能
 │   ├── ui/
 │   ├── navigation/
 │   ├── SearchViewModel.kt
 │   └── build.gradle.kts
 │
 ├── topic/            # 单个话题详情
 │   ├── ui/
 │   ├── navigation/
 │   ├── TopicViewModel.kt
 │   └── build.gradle.kts
 │
 ├── article/          # 文章详情
 │   ├── ui/
 │   ├── navigation/
 │   ├── ArticleViewModel.kt
 │   └── build.gradle.kts
 │
 └── settings/         # 设置页
     ├── ui/
     ├── navigation/
     ├── SettingsViewModel.kt
     └── build.gradle.kts
```

### 2.2  模块内部通用结构

```
每个 feature 子模块大致遵循相同的模板：

1、ui/
-包含 Screen（顶层页面）、Section（区域 UI）、以及 Compose 组件。

2、navigation/
-定义 Route 和 NavGraphBuilder 扩展函数，用于向 app 模块注册导航。

3、ViewModel
-管理 UI 状态（UiState）、调用 core/data 的 repository 获取数据。

4、build.gradle.kts
-依赖公共插件（nowinandroid.android.feature、compose、jacoco）
```

### 2.3 feature 与 app/core 的关系

```
app (导航中心, Application)
   │
   ├── 引入多个 feature 模块 (foryou, bookmarks, interests, search...)
   │       └── 提供 Route & Screen
   │
   └── 统一组装 NavHost
            └── 调用每个 feature.navigation 提供的入口

feature 模块
   └── 依赖 core 模块
          ├── core/data (Repository, UseCase)
          ├── core/designsystem (Material3, UI组件)
          ├── core/model (数据模型)
          └── core/ui (通用 Compose 工具)
```

## 三 总结

```
-feature/ 下的每个子模块 就是一个独立功能块（Screen + ViewModel + Nav 接口）。
-不直接依赖其他 feature，只依赖 core/* 模块。
-App 模块作为壳，负责把所有 feature 的导航统一整合。
-架构层次分明，方便并行开发、解耦、测试
```

