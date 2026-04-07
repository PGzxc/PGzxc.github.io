---
title: AI图谱系列之——AI-Agent之Agent核心能力(8.1)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: b2f6d93
date: 2026-04-07 20:25:16
---
## 一 概述

```
本文介绍：
 -AI Agent（智能体系统）
 -AI Agent之Agent核心能力
```

<!--more-->

## 二 核心

```
让 LLM 从“回答问题” → “自主完成任务”
```

## 三 Agent核心能力(本质能力模型)

### 3.1 什么是 Agent？

```
1.概念
Agent = 能够自主决策并执行任务的 AI 系统

2.本质：
LLM + Planning + Tool + Memory + State
```

### 3.2 Agent 核心能力有哪些？

1-Planning(规划能力)

```
1.概念
将复杂任务拆解

2.示例：
“帮我做一个竞品分析”

3.拆解：
-收集数据
-分析
-生成报告
```

2-Reflection(反思能力)

```
1.概念
自我评估 & 修正

2.面试加分：
-Self-Critique
-Retry机制
```
3-Memory(记忆系统)

```
1.分类
-短期记忆（Context）
-长期记忆（Vector DB / DB）
-用户记忆（Profile）

2.实现方式
-RAG（外部知识）
-向量数据库
-KV Cache（短期）

3.面试点
为什么 Agent 必须有 Memory？
否则无法持续任务 / 个性化
```

4-Tool Use(工具调用)

```
1.核心能力
让 LLM 调用外部能力（API / DB / 搜索引擎）

2.示例
- 搜索（Google / Bing）
- 数据库查询
- 调用接口
- 执行代码

3.面试点
Function Calling vs Tool Use？
本质一致，Tool Use 更广义
```

5-Multi-Agent Coordination(多Agent协作)

```
1.核心思想
多个 Agent 分工合作完成复杂任务

2.示例结构
Planner → Executor → Reviewer → Memory Agent

3.优势
-提升复杂任务能力
-更接近人类团队协作

4.面试点(高频)
单 Agent vs 多 Agent？
如何避免死循环？
```

6-Decision Making（决策）

```
1.核心：
-选择工具
-选择路径
```

7-State Management（状态管理）

```
1.关键点：
-当前任务进度
-历史执行记录

2.技术：
-LangGraph 状态机
```

### 3.3 Agent vs RAG（必问）

1-对比

|    维度    | RAG  | Agent |
| :--------: | :--: | :---: |
|    核心    | 检索 | 行动  |
|  是否决策  |  否  |  是   |
| 是否多步骤 |  否  |  是   |

2-面试金句

```
“RAG 是知识增强，Agent 是任务执行”
```

