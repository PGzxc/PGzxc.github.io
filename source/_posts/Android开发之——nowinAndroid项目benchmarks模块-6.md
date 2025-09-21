---
title: Android开发之——nowinAndroid项目benchmarks模块(6)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 1eaf572c
date: 2025-09-21 09:07:35
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下benchmarks模块
 -模块剖析:benchmarks
```

<!--more-->

## 二 模块拆分

### 2.1 模块定位

```
1、性能基准测试中心：
用 Macrobenchmark测量启动时间、滚动流畅度等。
Macrobenchmark：https://developer.android.com/topic/performance/benchmarking/macrobenchmark

2、Baseline Profile 生成：
生成并验证 baseline-prof.txt，提升冷启动性能。


3、UI 自动化支持：
借助 UiAutomator驱动跨页面操作。
UiAutomator：https://developer.android.com/training/testing/other-components/ui-automator
```

### 2.2 目录结构(清晰分层)

```
benchmarks/
├── build.gradle.kts           ← 构建配置（Android Test 模块，依赖 Macrobenchmark、UiAutomator）
├── proguard-rules.pro         ← 混淆配置
└── src/androidTest/java/
    ├── androidx/test/uiautomator/       ← UiAutomator API 引入
    └── com/google/samples/apps/nowinandroid/
        ├── baselineprofile/
        │   ├── BaselineProfileGenerator.kt   ← 生成 baseline-prof.txt
        │   └── BaselineProfileMetrics.kt     ← 评估 baseline profile 效果
        │
        ├── startup/
        │   ├── StartupBenchmark.kt           ← 冷启动测试
        │   └── WarmStartupBenchmark.kt       ← 热启动测试
        │
        ├── foryou/
        │   └── ForYouBenchmark.kt            ← For You 页滚动/渲染性能
        │
        ├── bookmarks/
        │   └── BookmarksBenchmark.kt         ← 书签页性能测试
        │
        ├── interests/
        │   └── InterestsBenchmark.kt         ← 兴趣选择页性能测试
        │
        ├── GeneralActions.kt                 ← 常用 UI 操作封装（点击、滚动、切换 Tab）
        └── Utils.kt                          ← 通用工具类（等待、环境准备、日志等）
```

### 2.3 功能职责梳理

```
1、启动性能
-startup/StartupBenchmark.kt → 冷启动耗时
-startup/WarmStartupBenchmark.kt → 热启动性能

2、页面性能
-foryou/ForYouBenchmark.kt → For You 页滚动流畅度、掉帧
-bookmarks/BookmarksBenchmark.kt → 书签页交互性能
-interests/InterestsBenchmark.kt → 兴趣页响应速度

3、Baseline Profile
-baselineprofile/BaselineProfileGenerator.kt → 收集关键路径 → 生成 baseline-prof.txt
-baselineprofile/BaselineProfileMetrics.kt → 验证 profile 覆盖率与性能提升

4、辅助工具
-GeneralActions.kt → UI 操作复用，减少样板代码
-Utils.kt → 公共工具函数（如等待条件、调试打印）
```

### 2.4 工作流

```
-运行基准测试：冷/热启动 + 各功能页性能 → 检测回归
-收集 Baseline Profile：运行典型用户路径 → 生成 baseline-prof.txt
-打包到 app：随 APK 发布，系统安装时提前编译关键路径
-优化用户体验：冷启动更快，滚动/切换更流畅
```

## 三 总结

```
benchmarks 模块按照：
 -功能场景（启动 / For You / Bookmarks / Interests）
 -优化工具（Baseline Profile / 通用操作） 
 
两大维度组织代码，结构清晰，既能 覆盖核心性能指标，又能 保证测试可维护性与可复用性。
```

