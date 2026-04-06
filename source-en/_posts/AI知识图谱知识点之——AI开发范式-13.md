---
title: AI知识图谱知识点之——AI开发范式(13)
categories:
  - AI
  - AI图谱
  - AI知识点
tags:
  - AI知识点
abbrlink: 3b78c7e8
date: 2026-04-06 21:49:28
---
## 一 概述

```
本文介绍：
- Vibe Coding
- Agentic Development（以Agent为核心的开发模式）
- MCP-driven Development
- Computer Use Paradigm（屏幕操作驱动开发）
- Prompt-first / Graph-first Workflow
- Tool-first Development
- Retrieval-first Development（RAG优先）
```

<!--more-->

## 二 AI开发范式

```
1. Vibe Coding
-只描述氛围、意图、风格、效果
-AI 自主生成代码、结构、逻辑
-特点：低代码、自然语言驱动、快速原型

2. Agentic Development
-以 Agent 为核心的开发模式
-人定目标 → Agent 自主规划、编码、调试、迭代
-多 Agent 协作完成项目
-2026 主流：Cursor + OpenDevin + LangGraph

3. MCP-driven Development
-Model Context Protocol 驱动开发
-工具、模型、系统、Agent 用统一协议通信
-插件化、可插拔、跨模型兼容
-企业级 Agent 标准化架构

4. Computer Use Paradigm
-屏幕操作驱动开发
-AI 像人一样：看屏幕 → 点鼠标 → 敲键盘 → 改代码
-全自动复现人类开发流程
-代表：GPT-5.4、Claude 4.6 Computer Use

5. Prompt-first / Graph-first Workflow
-Prompt-first：先写清晰提示词，再生成代码 / 逻辑
-Graph-first：用流程图 / 状态机编排（LangGraph）
-可视化、可调试、可维护

6. Tool-first Development
-工具优先开发
-先定义工具集（搜索、数据库、API、画图）
-再让 Agent 基于工具完成任务
-强可控、少幻觉、企业安全

7. Retrieval-first Development（RAG 优先）
-检索优先，不硬编码知识
-把知识存在外部：向量库、文档、数据库
-模型先检索再生成
-解决：过时、幻觉、隐私、更新成本
```


## 三 总结

### 3.1 一句话总结

```
1.Vibe Coding：靠感觉写代码
2.Agentic：AI 自主开发
3.MCP：协议统一打通工具
4.Computer Use：AI 像人操作电脑
5.Graph-first：流程图驱动
6.Tool-first：工具优先更可控
7.Retrieval-first：RAG 优先不瞎编
```
