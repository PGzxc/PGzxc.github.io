---
title: Android开发之——nowinAndroid项目app模块(2)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 545bbac2
date: 2025-09-17 08:09:26
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下app模块
 -模块剖析:app 
```

<!--more-->

## 二 模块拆分

### 2.1 定位与职责

```
1、应用入口：
包含 MainActivity 和 NiaApplication，负责应用的启动、主题、依赖注入初始化。

2、导航中心：
维护全局 NavHost，协调不同 feature 模块之间的路由与跳转。

3、整合层(Glue layer)：
把 core 模块(数据、网络、设计系统、UI)与 
feature 模块(ForYou、Search、Bookmarks 等)组合成完整 App。

4、环境控制：
根据 demo/prod flavor 选择不同的数据源和依赖注入实现。

5、全局配置：
主题（Material3 + 动态色）、窗口控制（System UI、Insets）、性能配置（Baseline Profile）。
```

### 2.2  内部结构(关键组件)

```
app/
 ├── src/
 │    ├── main/
 │    │    ├── AndroidManifest.xml
 │    │    ├── java/com/google/samples/apps/nowinandroid/
 │    │    │    ├── NiaApplication.kt    # Application 入口，Hilt 初始化
 │    │    │    ├── MainActivity.kt      # 主界面，包含 NavHost
 │    │    │    ├── navigation/          # 全局导航设置，连接 feature routes
 │    │    │    └── ui/                  # AppShell、Scaffold、TopBar 等全局 UI
 │    │    └── res/                      # app 层资源（主题、strings 等）
 │    ├── demo/                          # demo flavor，静态/假数据
 │    └── prod/                          # prod flavor，真实网络数据
 └── build.gradle.kts                    # 定义依赖（core + feature + Hilt + Compose）
```

### 2.3 依赖关系

|        模块        |   依赖方向    |                             用途                             |
| :----------------: | :-----------: | :----------------------------------------------------------: |
|       core:*       |  app → core   | 复用基础设施：数据仓库、设计系统、UI 组件、网络、数据库、通知等 |
|     feature:*      | app → feature | 引入具体功能页面（ForYou、Search、Bookmarks 等）并注册到全局导航 |
|        Hilt        |   app 配置    |           全局依赖注入入口，Application 级别初始化           |
| flavors(demo,prod) |    app 内     |            切换不同数据源实现（本地 vs 真实服务）            |

### 2.4 核心功能点

```
1、Application
-NiaApplication 使用 @HiltAndroidApp 注解，触发依赖注入。

2、Activity
-MainActivity：设置 Compose 主题、窗口控制、NavHost 宿主。

3、Navigation
-navigation/ 目录下定义路由图，把 feature 模块的入口统一到全局导航。

4、UI Shell
-提供全局的 Scaffold（底部导航、顶栏、Drawer 等），各个 feature 的页面渲染在其中。

5、Flavors
-demo：使用假数据（方便 UI 预览和快速开发）。
-prod：依赖真实数据层（core:data → 网络/数据库）
```

### 2.5 设计原则

```
-低耦合：feature 模块彼此独立，仅依赖 core；所有整合逻辑放在 app。
-高内聚：app 模块聚焦应用入口、导航、配置，不包含业务逻辑。
-可替换性：通过 flavor 和依赖注入实现数据源切换。
-可测试性：UI 测试可直接在 app 层运行，配合 demo flavor。
```

## 三 总结

```
-:app 模块是入口层，不做业务逻辑，只负责：启动 + 导航 + 整合 + 配置。
-所有业务和UI功能都下沉到feature与core，实现了：清晰的模块边界 和 现代 Android 架构实践。
```

