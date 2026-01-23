---
title: AI开发助手Trae之——使用教程
categories:
  - 开发
  - R-AI开发助手
  - Trae
tags:
  - Trae
abbrlink: 78f68707
date: 2025-12-29 08:31:46
---
## 一 概述

```
本文介绍以下内容：
-1.介绍
-2.下载地址
-3.使用教程
-4.收付费及注意事项
-5.使用对比
-6.总结
```

<!--more-->

## 二 介绍

### 2.1 介绍

```
-Trae AI 是字节跳动推出的一款 AI 原生 IDE(AI-First IDE)
-目标是成为开发者的“10× AI 工程师”。
```

### 2.2 可完成

```
1.自动生成项目结构(Builder 模式)
2.修复 Bug、重构代码(Chat 模式)
3.多文件级别修改
4.自动运行脚本
5.图像转代码(多模态)
6.自主代理(SOLO/Agent Patterns)
7.上下文感知代码增强
```

### 2.3 内置模型及性能

```
它内置 GPT-4o、Claude 3.5 Sonnet 等高级模型，
并已在 2025 SWE-bench Verified 排行榜登顶，
在复杂任务、快速原型、Web 全栈开发方面表现突出。
```

### 2.4 支持语言

```
Python/JavaScript/TypeScript/Node.js/前端框架(React/Vue/Next.js)/Golang 等多语言。
```

### 2.5 核心特点

```
1.Builder：一句话创建完整项目或模块
2.Chat：项目级 AI 助手，能同时编辑多个文件
3.SOLO：AI 自主执行任务
4.上下文注入（#Context）和代理（@Agent
5.它正在成为 Cursor 与 GitHub Copilot 的强力竞争者
```

## 三 下载地址

### 3.1 官方网站

```
1、下载地址
https://www.trae.ai/
https://traeide.com/（镜像入口）

2、支持平台
-macOS 
-Windows 10/11  
-Linux
```

### 3.2 Trae 提供

```
-免费下载安装
-无需订阅即可使用基础功能与高级模型
```

## 四 使用教程(完整入门 → 进阶)

### 3.1 入门：安装与项目创建

```
1、下载客户端 → 安装 → 打开 Trae
2、可以选择：
-打开现有本地文件夹
-从 GitHub 克隆仓库
-使用 Builder 生成新项目

3、示例：
Build a Pomodoro Timer app with React and Tailwind.

4、Trae 会自动：
-创建项目结构
-配置环境
-生成页面
-输出可直接运行的代码
```

### 3.2 Chat 模式：AI 实时辅助编程

```
Chat 是 Trae 的核心功能：

1、可以输入：
Debug this Python script.

2、或：
Refactor the API folder. Split services and controllers.

3、Trae 会自动编辑多个文件，并生成完整 diff 供你确认。
```

### 3.3 Builder 模式：从描述生成整个项目

```
1、示例：
Create a Next.js 15 blog app with MDX support, search, dark mode, and RSS.

2、Builder 会自动：
-创建 pages/components/api 目录
-生成 UI 页面
-处理样式（Tailwind/Antd）
-生成 API 路由
-完整运行可用

相比 Cursor 的 Composer：更灵活、支持中文描述、免费用高级模型
```

### 3.4 高级功能(核心亮点)

```
1、 #Context（上下文注入）
你可以让 AI 查看项目中特定文件或文件夹：
#Context src/components
Refactor these into smaller components.
适合精确控制 AI 处理范围。

2、@Agent（委派任务）
Trae 支持类似“多人 AI 协作”：
@Agent Create a database migration tool for Postgres.

3、MCP（Model Context Protocol）支持
可以连接外部数据源和工具，例如：文件系统\API\数据库\本地运行环境
让 AI 拥有更强的执行能力。

4、.rules（自定义 AI 行为）
你可以定义：
-项目编码规范
-文件生成规则
-命名规则
-组件结构约定

相当于“训练你自己的 AI 编码伙伴”。

5、多模态（图像 → 代码）
拖入 UI 截图，指令：
Turn this into a responsive React page.
Trae 会自动生成页面与样式。
```

## 四 收费与注意事项

### 4.1 收费模式(2025 最新)

|  版本  |       价格        |                       内容                        |
| :----: | :---------------: | :-----------------------------------------------: |
| 免费版 |        ¥0         | GPT-4o / Claude 3.5 Sonnet、Chat、Builder(有配额) |
|  Pro   | $10/月(首月仅 $3) |      Builder/SOLO 无限、附加模型、更多上下文      |
| 企业版 |       定制        |               私有化部署、团队协作                |

备注：Trae 是目前唯一免费提供 GPT-4o + Claude 3.5 Sonnet 的 IDE。

### 4.2 注意事项

```
1、免费版有请求配额 → 大量 Builder/SOLO 操作可能被限速
2、隐私问题 → AI 会读取项目文件，不建议用于涉密代码
3、SOLO 是 beta → 自主执行可能出现错误，需要审阅
4、网络问题 → 某些国家地区模型访问受限
5、提示要尽量具体 → 避免模糊需求，比如 “优化代码”
```

## 五 使用对比

### 5.1 Trae vs Cursor vs Copilot(2025 必看对比)

|    项目    |              Trae AI              |         Cursor          | GitHub Copilot |
| :--------: | :-------------------------------: | :---------------------: | :------------: |
|    类型    |            AI 原生 IDE            |         AI IDE          |    IDE 插件    |
|  操作模式  | Builder、Chat、SOLO、自定义 Agent | Composer、Chat、AI 编辑 |   补全、Chat   |
| 多文件编辑 |                5星                |           5星           |      3星       |
|  自主代理  |             5星(SOLO)             |           4星           |      1星       |
| 上下文控制 |     \#Context / .rules / MCP      |     Project Context     |       限       |
|    模型    |     GPT-4o / Claude 3.5(免费)     |     GPT-4o / Claude     |  OpenAI 系列   |
|   多模态   |                强                 |           中            |       弱       |
|    定价    |          免费 + Pro $10           |         $20/月          |    $10(Pro)    |
|  上手难度  |               最低                |           中            |      最低      |
|  中文支持  |               最强                |           中            |       弱       |

### 5.2 一句话总结

```
1.Trae：最强性价比，国内使用体验最佳，适合前端/全栈
2.Cursor：大项目重构更稳，但收费高
3.Copilot：补全最强，但项目级编辑较弱
```

## 六 总结

### 6.1 优势

```
Trae AI 在 2025 年成为最值得尝试的 AI 编码工具之一，其优势在于：
-免费即可使用顶级模型
-Builder + Chat + SOLO 一体化 AI IDE
-对中文友好，国内速度快
-支持多文件重构与自动项目生成
-可自定义规则、代理、上下文
```

### 6.2 适合场景

```
-想快速做项目的个人开发者
-想学习 AI 编码的新手
-想提升 5～10 倍开发效率的前端/全栈工程师
-小团队快速产出 MVP

建议从免费版开始，通过 Builder 与 Chat 深度体验 AI 驱动开发。
```

