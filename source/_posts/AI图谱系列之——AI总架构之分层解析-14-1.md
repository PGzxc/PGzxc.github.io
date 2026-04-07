---
title: AI图谱系列之——AI总架构之分层解析(14.1)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 2d10b9a
date: 2026-04-07 21:12:40
---
## 一 概述

```
本文介绍：
 -AI总体架构之分层解析
```

<!--more-->

## 二 分层解析

### 2.1 用户层(Prompt入口)

```
1.概念
一切的起点

2.核心内容
-Prompt（提示词）
-多模态输入（文本 / 图片 / 语音）

3.本质
用户意图表达层

4.关键点（面试常问）
-Prompt设计（Prompt Engineering）
-指令清晰度影响结果质量
```

### 2.2 模型层(LLM核心)

```
1.模型层（LLM核心）
-GPT-5.4
-Claude 4.6
-Gemini 3.1 Pro
-DeepSeek

2.核心能力
理解 + 推理 + 生成

3.局限
-幻觉（Hallucination）
-无法访问实时数据
```

### 2.3 数据层(RAG / Search)

```
1. 作用
给模型“补脑”

2.组成
-向量数据库（Vector DB）
-检索系统（Search）
-实时数据（API / Web）

3.流程
问题 → 检索 → 上下文 → LLM

4.意义
企业AI的核心（知识库 / 私有数据）
```

### 2.4 Agent层(决策中枢)

```
1.核心能力
思考 → 规划 → 决策

2.组成
-Planning
-Reflection
-Memory
-Tool Use
-Multi-Agent

3.本质
AI的大脑（Brain）
```

### 2.5 执行层(Workflow + Tool)

```
1.Workflow（流程）
定义“怎么做”

2.Tool / Skill
定义“能做什么”

3.示例
-搜索工具
-数据库查询
-API调用
-文件操作

4.本质
AI的“手和脚”
```

### 2.6  执行方式(Action层)

```
1. 具体执行形式
- API调用
- Computer Use（操作电脑）
- UI自动化
- 系统操作

2.特点
AI开始“真正做事”，不只是回答
```

### 2.7 输出层(Response)

```
1.输出内容
-文本
-图片
-视频
-操作结果

2.关键点
可解释性（Explainability）
```

### 2.8  Memory(记忆闭环)

```
1.类型
- 短期记忆（上下文）
- 长期记忆（用户数据）

2.作用
-个性化
-连续对话
-Agent进化

3.本质
AI的“学习能力”
```

