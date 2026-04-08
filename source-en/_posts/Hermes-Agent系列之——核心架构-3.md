---
title: Hermes-Agent系列之——核心架构(3)
categories:
  - AI
  - AI开发
  - AI Agent
  - Hermes-Agent
tags:
  - Hermes-Agent
abbrlink: e867125b
date: 2026-04-08 10:18:50
---
## 一 概述

```
本文介绍：
 - 整体架构
 - 四大核心模块
```

<!--more-->

## 二 整体架构

```
User
  ↓
Agent（Hermes）
  ↓
Tools + Skills + Memory
  ↓
LLM（OpenAI / Ollama）
```

## 三 四大核心模块

### 3.1 Agent(大脑)

```
- 任务调度
- 推理决策
```

### 3.2 Memory(记忆系统)

类型：

|   类型   |    作用    |
| :------: | :--------: |
| 会话记忆 | 当前上下文 |
| 长期记忆 |  用户信息  |
| 技能记忆 |  自动生成  |

### 3.3 Skills(技能系统)

```
Hermes最核心能力：
任务 → 自动总结 → Skill → 可复用

示例：
- 自动写代码
- 自动整理文档
- 自动部署脚本
```

### 3.4 Tools(工具系统)

```
1.内置工具（官方）：
- 文件操作
- Shell执行
- Web搜索
- 子Agent
- Cron任务

2.类似：
AI + 操作系统能力
```

