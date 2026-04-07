---
title: AI图谱系列之——AI开发框架之Agent框架(5.2)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: f95f0835
date: 2026-04-07 18:55:52
---
## 一 概述

```
本文介绍：
 -AI开发框架之Agent框架
```

<!--more-->

## 二 核心作用

```
让 LLM 具备「行动能力」
```

## 三  Agent框架(2026核心)

### 3.1 什么是 Agent？

```
1.Agent
Agent = LLM + Tools + Memory + Planning

2.能力：
-自动决策
-工具调用
-多步骤执行
```

### 3.2 主流 Agent 框架？

1-LangGraph

```
企业主流：
-多Agent协作
-工作流控制强
```

2-AutoGen

```
1.特点：
-多Agent对话
-自动协作
```

3-CrewAI

```
1.特点：
-角色分工（CEO / Dev / PM）
-简单易用
```

4-OpenAI Swarm

```
1.特点：
-轻量
-原生多Agent
```

5-Letta

```
1.特点：
-长期记忆（Memory）
-用户画像
```

6-Semantic Kernel

```
1.特点：
-企业级 Agent
-强工具调用
```

### 3.3 Agent vs RAG？

1-对比

|    维度    | RAG  |  Agent   |
| :--------: | :--: | :------: |
|    核心    | 检索 |   行动   |
|    能力    | 问答 | 执行任务 |
| 是否多步骤 |  否  |    是    |

2-面试一句话

```
“RAG 解决知识问题，Agent 解决任务问题”
```

### 3.4 多Agent系统怎么设计？

```
1-常见架构：
User
 ↓
Planner Agent（任务拆解）
 ↓
Worker Agents（执行）
 ↓
Tool调用（API/DB）
 ↓
Aggregator（汇总）

2、面试加分点：
-状态管理（LangGraph）
-错误重试
-人类反馈（Human-in-the-loop）
```

