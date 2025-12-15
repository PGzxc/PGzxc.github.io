---
title: mobile-mcp开发之——简介(1)
categories:
  - 开发
  - R-AI开发助手
  - mobile-mcp
tags:
  - mobile-mcp
abbrlink: cdac25ea
date: 2025-12-15 10:51:18
---
## 一 概述

```
本文介绍：
-什么是 Mobile-MCP？
-主要用途
-支持平台
-关键特性
-架构概述
-安装与快速启动
```

<!--more-->

## 二 什么是 Mobile-MCP？

### 2.1  概念

```
Mobile-MCP 是一个 Model Context Protocol (MCP) 服务器，专为移动设备自动化和抓取设计。
它允许AI模型(如 Claude、Cursor、Copilot、ChatGPT 等)像“控制电脑”一样控制手机，
实现智能自动化操作。
```

### 2.2 简单来说

```
它让大语言模型(LLM)能“看到”手机屏幕、“理解”界面元素，并执行点击、滑动、输入等动作。
无需分别学习 iOS 和 Android 的细节，提供统一的平台无关接口。
```

## 三 主要用途

```
1、AI驱动的移动自动化：
构建手机上的智能代理(Agent)，执行复杂任务，如浏览 App、填写表单、测试流程。

2、应用抓取与数据提取：从屏幕提取结构化数据、文本或图像。
3、自动化测试与开发：快速验证 UI 交互、业务逻辑，而无需手动操作。

4、与AI工具集成：
无缝对接支持MCP的客户端(如 Cursor IDE、Claude Projects)，
让 AI 助手直接操作真实设备或模拟器。
```

## 四 支持平台

```
-Android：真实设备、模拟器(Emulator)
-iOS：真实设备、模拟器(Simulator)
-支持同时连接多设备，适用于 MacOS/Linux 环境。
```

## 五 关键特性

```
1、视觉感知(Visual Sense)：
-优先使用结构化数据(如accessibility tree/view hierarchy)，坐标精确；
-若不可用，则 fallback 到截图分析，减少歧义。

2、确定性操作：比纯截图方案更可靠，工具调用更精准。
3、丰富工具集：包括截图、点击、滑动、输入、App 管理、元素列表、结构化数据提取等(详见仓库工具列表)
4、高效轻量：低延迟，适合实时交互。
5、跨平台统一：无需 iOS/Android 特定知识。
6、模拟器支持：无物理设备时，可用 emulator/simulator 测试
```

## 六 架构概述

```
-服务器运行在电脑上，通过 ADB(Android)或 iOS 工具(如 XCUITest/Appium)连接设备。
-提供标准 MCP 接口(stdio、SSE、HTTP 等)，AI 模型调用工具获取屏幕上下文并执行动作。
-支持截图 + 结构化数据 + OCR 等多模态输入
```

## 七 安装与快速启动(通过 npm 安装)

### 7.1 安装

```
npm install -g @mobilenext/mobile-mcp  # 或使用 npx 临时运行
```

### 7.2 准备环境

```
-安装 Android SDK(设置 ANDROID_HOME)和 Xcode(for iOS)。
-连接设备或启动模拟器(adb devices 检查 Android；iOS 用 Simulator)。
```

### 7.3 启动服务器

```
npx @mobilenext/mobile-mcp@latest

或配置环境变量如 MCP_PORT、ANDROID_SDK_ROOT 等
```

### 7.4 集成到 AI 工具(例如 Cursor 或 Claude)

```
添加 MCP 服务器配置
参考工具文档，如 {"command": "npx", "args": ["@mobilenext/mobile-mcp"]}}。
```

## 八 适用场景示例

```
1、AI 代理任务：让 Claude 在手机上打开 YouTube，搜索视频、点赞、评论、分享到 WhatsApp。
2、开发迭代：快速测试 App UI 变化、提取屏幕数据验证逻辑。
3、自动化脚本：多步流程自动化，如电商 App 下单测试。
4、研究与演示：移动端多模态 AI 交互实验。
```

