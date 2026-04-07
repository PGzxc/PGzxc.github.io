---
title: AI图谱系列之——AI-Agent之Agent协议(8.4)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 401a99b8
date: 2026-04-07 20:27:07
---
## 一 概述

```
本文介绍：
 -AI Agent之Agent协议
```

<!--more-->

## 二 核心

```
让 LLM 从“回答问题” → “自主完成任务”
```

## 三 Agent协议

### 3.1 什么是 MCP？

```
1.概念
Model Context Protocol
当前最重要标准（必考）

2.背景：
-Anthropic 主导
-Linux Foundation 托管
```

### 3.2 MCP 解决什么问题？

```
1.问题：
-工具调用不统一
-数据接入复杂

2.MCP 作用：
“统一 Agent 与外部工具/数据交互”
```

### 3.3 MCP 架构？

```
Agent
 ↓
MCP Client
 ↓
MCP Server（工具/数据）


面试金句：
“MCP 是 Agent 时代的 USB 接口”
```

### 3.4 OpenClaw 是什么？

```
1.说明：
2026最火开源Agent生态

2.特点：
-多模型支持
-本地运行
-IM集成（Telegram / WhatsApp）

3.风险点（面试加分）：
-安全问题
-沙箱隔离
```

