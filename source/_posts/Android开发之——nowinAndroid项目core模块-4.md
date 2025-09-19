---
title: Android开发之——nowinAndroid项目core模块(4)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 1156526d
date: 2025-09-19 08:04:36
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下core模块
 -模块剖析:core
```

<!--more-->

## 二 模块拆分

### 2.1 core 模块结构

```
1、:core
:core 本身是一个 空壳模块（仅作分组/命名空间），真正有内容的是它的子模块

2、core模块结构
:core
 ├── analytics       → 事件埋点 / 日志 / 分析
 ├── common          → 通用工具类 / 协程调度器 / Result 封装
 ├── data            → Repository 实现（整合网络 + 数据库 + 偏好存储）
 ├── database        → Room 数据库 (Dao / Entities)
 ├── datastore       → DataStore 偏好存储
 ├── datastore-proto → DataStore (Proto 格式序列化)
 ├── designsystem    → Material3 主题 / 组件库
 ├── domain          → UseCase / Repository 接口（业务契约）
 ├── model           → 通用数据模型 (DTO / Entity / Domain model)
 ├── network         → 网络层 (API 接口 / 序列化)
 ├── notifications   → 推送 / 本地通知
 ├── testing         → 测试工具 / Fake 实现
 └── ui              → 通用 UI 组件 (Compose Composable)
```

### 2.2  分层逻辑(清晰架构图)

1、通用结构

```
                   ┌───────────────┐
                   │   :core:model  │ ← 定义通用数据结构
                   └───────────────┘
                           ▲
                           │
                 ┌─────────┴─────────┐
                 │                   │
        ┌───────────────┐   ┌───────────────┐
        │  :core:domain  │   │  :core:common │
        │ UseCase /契约  │   │ 工具类/调度器 │
        └───────────────┘   └───────────────┘
                 ▲
                 │ 依赖接口
                 │
        ┌───────────────────┐
        │   :core:data       │ ← Repository 实现
        └───────────────────┘
            ▲           ▲
            │           │
   ┌──────────────┐ ┌───────────────┐
   │ :core:network │ │ :core:database │
   └──────────────┘ └───────────────┘
            ▲
   ┌────────────────┐
   │ :core:datastore │ (+ datastore-proto)
   └────────────────┘
```

2、UI 与数据层相对独立

```
:core:designsystem  → 主题 / 样式
:core:ui            → 通用 Compose 组件
```

3、横切关注点

```
:core:analytics     → 埋点
:core:notifications → 通知
:core:testing       → 测试支持
```

### 2.3 模块职责一句话总结

```
-common → 工具 & 基础设施（调度器、Result 封装）
-model → 所有层共享的数据模型
-domain → 契约（UseCase / Repository 接口）
-data → Repository 实现（组合 network/database/datastore）
-network → API 调用 & 网络序列化
-database → Room 本地存储
-datastore(+proto) → 偏好/配置存储
-designsystem → 主题、颜色、字体、组件库
-ui → 通用 Compose UI
-analytics → 埋点统计
-notifications → 推送/通知管理
-testing → 测试工具和 Fake 实现
```

