---
title: codex-plugin-cc系列之——工作原理(2)
categories:
  - AI
  - AI开发
  - AI Agent
  - codex-plugin-cc
tags:
  - codex-plugin-cc
abbrlink: 83a66bca
date: 2026-04-08 10:00:31
---
## 一 概述

```
本文介绍：
 - 系统结构
 - 工作流程
 - 核心机制
```

<!--more-->

## 二 系统结构

```
Claude Code (主Agent)
        │
        ▼
codex-plugin-cc（桥接层）
        │
        ▼
Codex（执行Agent）
        │
        ▼
代码仓库 / 本地环境 / 云环境
```

## 三 工作流程

```
1. 用户在 Claude Code 提问
2. Claude 判断任务复杂
3. 调用 codex-plugin-cc
4. 转发给 Codex
5. Codex 执行：
   - 修改代码
   - 跑测试
   - 生成结果
6. 返回 Claude 展示
```

## 四 核心机制

```
1. JSON-RPC 通信
- 插件通过 RPC 调用 Codex
- 类似 MCP（Model Context Protocol）

2. 多 Agent 协作
- Claude：推理 + 规划
- Codex：执行 + coding

3. 类似：
产品经理（Claude） + 工程师（Codex）
```

