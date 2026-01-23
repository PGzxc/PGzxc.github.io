---
title: AI开发助手Google Antigravity之——使用教程
categories:
  - 开发
  - R-AI开发助手
  - Google Antigravity
tags:
  - Google Antigravity
abbrlink: b5a2b5d3
date: 2026-01-10 09:28:02
---
## 一 概述

```
本文介绍以下内容
-1.介绍
-2.下载地址
-3.使用教程
-4.收付费及注意事项
-5.使用对比
-6.总结
```

<!--more-->

## 二 介绍

### 2.1 说明

```
Google Antigravity是Google(DeepMind + Google Research)在2024–2025推出的AI代码生成与软件自动化平台
```

### 2.2 功能

```
-跨平台应用自动生成（Web / Android / iOS / Backend）
-自然语言 → 完整项目构建
-自动编排代码、多文件修改、智能重构
-与 Gemini 模型深度整合
-支持真实仓库的端到端开发任务
```

### 2.3 核心卖点

```
它比 Cursor / Copilot 更偏“构建器方向”(Builder Style)，类似：
-Google 版本的 Cursor
-Google 版的 Trae Builder
-具备自动生成 UI + 多端代码的能力
-深度支持 Android / Kotlin / Flutter(Google 生态优势)

其底层核心模型：Gemini 2.0 Pro / Flash / Ultra 系列。
```

## 三 下载地址 / 访问方式

Antigravity 主要属于 Web + IDE 插件形态

### 3.1 网页版入口(实验室 / Beta)

```
https://antigravity.google.com

注意：常根据地区灰度开放
```

### 3.2 Google AI Studio(主要入口)

```
https://ai.google.dev
用于调用 Gemini 模型 + Antigravity 生成代码。
```

### 3.3 Chrome DevTools / Web IDE 扩展(Beta)

```
Google 实验功能，支持浏览器内构建应用。
```

### 3.4 Android Studio / VS Code(插件 Beta)

```
目前多面向 Android/Kotlin。
```

## 四 使用教程

### 4.1 基础使用：从自然语言生成应用

```
1、在 Web 版输入：
Create a Flutter app with a tab bar, login screen, and cloud sync.

2、Antigravity 会直接生成：
-多文件 Flutter 工程
-UI 界面(Dart 文件)
-API service(Dio/Retrofit)
-配置(pubspec.yaml)
-Dark / Light Theme 支持
-运行说明 + 后续迭代问答
```

### 4.2 多文件修改(类似 Cursor / Trae Builder)

```
1、你可以输入：
Refactor the project to use MVVM and Riverpod.

2、Antigravity 会给出：
-文件树变更
-全部文件 diff
-自动批量应用
```

### 4.3 生成 Web / Android / iOS 多端代码

```
1、Example：
Build a responsive e-commerce web app and Android app with shared API logic.

2、Antigravity 会返回：
-Next.js Web
-Flutter / Compose Multiplatform 移动端
-Shared REST API + Auth 逻辑

Google 在跨端生态深度绑定 → 这点比 Copilot 更强
```

### 4.4 Debug 与日志分析

```
1、上传项目后可以让它：
Find the root cause of the crash based on this logcat.

2、Antigravity 会：
-分析 stacktrace
-指出根因
-提供修复代码
-生成单元测试(Junit/Jest/Python 等)
```

### 4.5 UI 自动生成(图像 → UI)

```
1、上传一张截图：
-App 草图
-Web 页面截图
-Figma UI

2、指令：
Convert this UI into Flutter code with Material 3.
它会直接生成全套布局。
```

## 五 收费方案与注意事项

### 5.1 收费

```
Antigravity 不单独收费，绑定在：

1、Google One AI Premium($19.99/月)
-启用 Gemini Advanced(Ultra 级模型)
-可在 Gmail / Docs / Android / Chrome 使用完整 AI 功能
-解锁 Antigravity 全能力

2、Google Cloud(企业版)
针对开发团队：
-更长上下文
-可连接企业仓库
-API 定价按 Token 计费

3、免费版(有限制)
-提供 Gemini Pro 能力
-代码自动生成次数限制
-大项目 diff/多文件修改能力限制
```

### 5.2 注意事项

```
1、需要梯子或特定地区才能使用完整功能
某些地区服务受限。

2、 暂不支持所有语言的深度工程理解
目前偏 TypeScript、Python、Java、Kotlin、Dart。

3、自动生成项目较强，但稳定性不如 Cursor 或 Trae Builder
特别是大型项目（100+ 文件）时。

4、与 Google 生态绑定深
最佳体验在：Android Studio、Flutter、Chrome、GCP、Firebase
```

## 六 对比

|        工具        | 自动生成项目 | 多文件重构 | UI 自动生成 | IDE 整合 |  本地部署  |               优势               |
| :----------------: | :----------: | :--------: | :---------: | :------: | :--------: | :------------------------------: |
| Google Antigravity |     5星      |    4星     |     5星     |   4星    |    不可    | Web/Flutter/Android 多端生成最强 |
|      Trae AI       |     5星      |    4星     |     3星     |   3星    |    不可    |      Builder 最强、性价比高      |
|       Cursor       |     4星      |    5星     |     3星     |   5星    |    不可    |          工程化编辑最强          |
|    Claude Code     |     3星      |    5星     |     2星     |   2星    |    不可    |         代码理解能力最强         |
|      Copilot       |     2星      |    3星     |     2星     |   5星    |    不可    |           自动补全最强           |
|   DeepSeek-Coder   |     2星      |    2星     |     2星     |   1星    | 模型可本地 |          免费、本地可用          |
|      ChatGPT       |     4星      |    4星     |     4星     |   3星    |    不可    |       综合最强 + 推理最强        |

## 七 总结

```
1、适合你的场景：
-构建 Flutter / Android / Web 应用
-想要“一句话生成多端应用”
-希望有强大的 UI 转代码能力
-使用 Firebase / GCP / Android Studio

2、 Antigravity 的核心优势：
-Google 生态最强集成（Android / Flutter）
-UI + 跨端自动生成能力领先所有工具
-Gemini Ultra 生成质量优异
-适合快速从 0 → 1 生成完整 App

3、不足：
-大型工程重构不如 Cursor 稳
-调用次数有限制（免费版）
-需使用 Google 生态、梯子要求较高
-自动构建项目偶尔会缺依赖或目录混乱
```

