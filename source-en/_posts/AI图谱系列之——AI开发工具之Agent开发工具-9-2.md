---
title: AI图谱系列之——AI开发工具之Agent开发工具(9.2)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 4eb7ce4d
date: 2026-04-07 20:35:13
---
## 一 概述

```
本文介绍：
 -AI开发工具之Agent开发工具
 -可视化 + 快速搭建
```

<!--more-->

## 二 核心

```
让开发者“用AI写AI”
```

## 三 Agent开发工具(可视化 + 快速搭建)

### 3.1 开发工具

1- LangGraph Studio(官方工具)

```
1.特点：
-可视化 Agent Flow
-调试状态机
-支持多 Agent

2.使用场景
-复杂 Agent 系统开发
-企业流程编排
```

2-Flowise(低代码)

```
1.核心能力
-拖拽式构建 LLM 应用
-内置 RAG / Agent

2.优势
-快速搭建 demo
-非开发者也能用
```

3-Dify(企业级)

```
1.核心能力
-Prompt 管理
-RAG
-Agent
-API 发布

2.优势
= LLM应用平台（类似后端系统）

3.特别适合
-SaaS产品
-内部AI系统
```

4-Jupyter AI(数据科学)

```
1.特点：
-Notebook + AI
-数据分析 + LLM
```

### 3.2 分类理解

```
1.工作流编排（Workflow Orchestration）

-LangGraph Studio
-Flowise

特点：
-可视化 DAG（流程图）
-支持多Agent编排
-可插入工具调用（Tool Use）

2.企业级平台（LLM App Platform）
Dify

特点：
-Prompt管理
-RAG集成
-API服务化
-SaaS部署

3.数据科学 + AI融合
Jupyter AI

特点：
-Notebook + LLM
-数据分析 + AI生成
-实验友好
```

## 四 Agent开发工具总结

```
LangGraph Studio → 复杂Agent
Flowise          → 低代码
Dify             → 企业平台
Jupyter AI       → 数据分析
```

## 五 重点总结

```
1.Agent开发 ≠ 写代码

2.本质是：LLM + Workflow + Tool + Memory
```

