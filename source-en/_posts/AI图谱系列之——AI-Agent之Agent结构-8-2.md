---
title: AI图谱系列之——AI-Agent之Agent结构(8.2)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 7aeb55d5
date: 2026-04-07 20:25:58
---
## 一 概述

```
本文介绍：
 -AI Agent之Agent结构
```

<!--more-->

## 二 核心

```
让 LLM 从“回答问题” → “自主完成任务”
```

## 三 Agent结构

### 3.1 Agent 标准架构？

```
用户请求
 ↓
Agent
 ↓
Planning（任务拆解）
 ↓
Workflow（流程编排）
 ↓
Skill / SubAgent
 ↓
执行（工具调用）
 ↓
结果返回
```

### 3.2 核心组件解释

1-Workflow（工作流）

```
1.概念：
定义执行路径

2.常见：
-DAG
-状态机

3.技术：
LangGraph
```

2-Skill（技能）

```
1.本质：
Tool（函数能力）

2.示例：
-搜索
-数据分析
-调用API
```
3-SubAgent（子代理）

```
1.说明：
用于复杂任务拆分

2.示例：
-Research Agent
-Coding Agent
```

### 3.3 多Agent架构设计

```
1.架构

User
 ↓
Planner Agent
 ↓
Task Queue
 ↓
Worker Agents（多个）
 ↓
Tool调用
 ↓
Aggregator

2.加分点：
-并行执行
-错误重试
-人类干预（Human-in-loop）
```

