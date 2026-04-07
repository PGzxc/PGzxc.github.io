---
title: AI图谱系列之——AI开发框架之LLM开发框架(5.1)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 4c4f6db9
date: 2026-04-07 18:55:07
---
## 一 概述

```
本文介绍：
 -AI开发框架之LLM开发框架
```

<!--more-->

## 二 核心作用

```
快速构建 LLM 应用（RAG/Agent/工具调用）
```

## 三  LLM开发框架(RAG/应用开发核心)

### 3.1 什么是 LLM 开发框架？

```
LLM开发框架是对大模型调用进行封装，提供：

-Prompt管理
-工具调用（Tools）
-记忆（Memory）
-RAG集成
-Agent编排

2.本质：
“让 LLM 从 API → 应用系统”
```

### 3.2 主流框架对比？

1、LangChain（最常见）

```
1、特点：
-生态最全
-支持RAG / Agent / Tools
-插件丰富

2、缺点：
复杂（面试常吐槽点）
```

2.LangGraph

```
1.2026趋势：
多Agent标准

2.核心：
-状态机 + DAG
-可控流程（比LangChain更工程化）

3.面试关键词： “Agent Workflow 编排”
```

3.LlamaIndex

```
1.特点：
-专注数据（RAG最强）
-文档索引能力强

2.适合：
-知识库
-文档问答
```

4.Haystack

```
1.特点：
-企业级
-Elasticsearch集成好
```

5.Semantic Kernel

```
特点：
-微软生态（.NET / C#）
-插件化设计（Function Calling）
```

### 3.3 LangChain vs LangGraph？

1-对比

|  维度   | LangChain | LangGraph |
| :-----: | :-------: | :-------: |
|  抽象   |    高     |  更底层   |
|  控制   |    弱     |    强     |
| 多Agent |   一般    |    强     |
|  适合   | 快速开发  | 复杂系统  |

2-面试总结

```
“LangChain 做 demo，LangGraph 做系统”
```

### 3.4 LlamaIndex vs LangChain？

```
1.核心区别：
-LlamaIndex：数据（RAG）
-LangChain：流程（Agent）

2.最佳实践：
“LlamaIndex + LangGraph 组合”
```

