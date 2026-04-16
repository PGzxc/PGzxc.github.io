---
title: Claude-Code-Workflow之——项目介绍(1)
categories:
  - AI
  - AI开发
  - AI编程助手
  - CCW
tags:
  - CCW
abbrlink: 578bc4b7
date: 2026-04-16 10:58:29
---
## 一 概述

```
本文介绍：
 - CCW是什么？
 - 核心特性
```

<!--more-->

## 二 CCW是什么？

### 2.1 项目地址

```
Github：https://github.com/catlog22/Claude-Code-Workflow/

中文文档：
https://github.com/catlog22/Claude-Code-Workflow/blob/main/README_CN.md
```

### 2.2 是什么

```
Claude-Code-Workflow(简称 CCW）)是一个创新的 AI 智能体协作工作流编排平台，
由 catlog22 开发并开源在 GitHub 上。

它以 JSON 驱动的多智能体(Multi-Agent)节奏团队开发框架为核心，
专注于实现自动化、智能化的代码开发闭环。
```

### 2.3 项目亮点

```
将 Claude、Gemini、Qwen、Codex 等多个大模型的 CLI 工具进行智能编排，
结合角色-based 的 Team 架构 v2，
让 AI 像真实开发团队一样协作——从需求规划、代码生成、测试修复，到审查迭代，全流程自动化。

同时支持会话持久化、队列调度、可视化仪表板和拖拽式工作流编辑器(基于 React Flow)，
极大提升开发者效率。
```

## 三 核心特性

### 3.1 Skill 工作流

```
提供多种预置技能，如：
 -workflow-lite-plan（轻量规划）
 -workflow-plan（完整规划）
 -workflow-tdd-plan（TDD 测试驱动）
 -brainstorm（多角色头脑风暴）等
```

### 3.2 多 CLI 智能编排

```
自动或手动调用 Gemini、Qwen、Codex、Claude 等 CLI 工具，
支持自然语言语义触发（如“使用 Gemini 分析 auth 模块”）。
```

### 3.3 Team 架构 v2

```
基于 22 个专业化智能体(agents)，
支持内循环执行、消息总线协调、智慧积累(learnings/decisions/conventions)。
```

### 3.4 队列调度与会话管理

```
后台队列执行、会话启动/恢复/同步/完成，
支持 Issue 到执行的全链路(/issue/new → /issue/execute)。
```

### 3.5 可视化界面

```
终端多网格仪表板(实时监控)、
A2UI(智能体到用户交互)、
可视化编排器(拖拽模板编辑工作流)。
```

### 3.6 事件驱动节拍模型(Beat Model)

```
协调器按需唤醒，实现快速推进、动态流水线和并行执行
```

## 四 总结

### 4.1 项目

```
项目灵感部分来源于 Impeccable(UI 设计)和 gstack(调试发布框架)，
采用 MIT 许可证，适合个人开发者、团队协作或构建复杂 AI 驱动开发流程。

仓库中还包含 37 个模块化技能、详细的 WORKFLOW_GUIDE_CN.md 等中文文档，友好度很高
```

### 4.2 一句话

```
CCW 把“AI 编程助手”从单一工具升级成了一个可编排、可视化、可团队协作的完整开发操作系统，
是 2026 年 AI 编码领域值得关注的新项目
```

## 五 参考

* [Github-CCW](https://github.com/catlog22/Claude-Code-Workflow/)