---
title: Continue教程之——高级玩法(7)
categories:
  - AI
  - AI编程助手
  - Continue
tags:
  - Continue
abbrlink: 43f56990
date: 2026-04-04 19:29:04
---
## 一 概述

```
本文介绍：
 -打造你的 AI Agent 开发流
 -自定义 Prompt
 -工具调用（Tool Use）
 -RAG 接入（本地知识库）
```

<!--more-->

## 二 高级玩法

### 2.1 三大核心能力

```
1.Prompt(提示工程)：控制 AI 行为
2.Agent(智能体)：让 AI 自动完成任务
3.RAG(知识库)：让 AI 记住你的项目
```

### 2.2 Prompt：让 AI 更“懂你”

```
1.为什么重要？

默认 AI：
-不知道你的代码规范
-不知道你的架构

解决：
自定义 Prompt

2. Continue 配置 Prompt

{
  "systemMessage": "你是一个资深 Android 架构师，所有代码必须符合 Clean Architecture，使用 Kotlin + Jetpack Compose"
}

效果：AI 输出 = 你的团队风格

3.高级 Prompt（推荐）

你是一个全栈工程师，请遵循：
1. 代码必须可维护
2. 必须包含注释
3. 优先考虑性能
4. 输出完整代码

本质：
Prompt = AI 的“人格 + 规则”
```

### 2.3 Agent：让 AI 自动干活

```
1.什么是 Agent？
AI 自动执行任务（不需要一步步问）

2.示例

你输入：帮我开发一个用户系统
Agent 会：设计数据库/写后端接口/写前端页面/写测试

3.Continue 中如何实现？

方式 1：CLI 自动流程
continue generate "创建一个完整的博客系统"
方式 2：多步骤 Prompt（推荐）

请分步骤完成：
1. 设计接口
2. 编写代码
3. 写测试
4. 输出结构

4. Agent 思维（重点）
不要问：帮我写一个函数
要问：帮我完成整个功能模块
```

### 2.4 RAG：让 AI 记住你的项目

```
1.什么是 RAG？
Retrieval-Augmented Generation（检索增强生成）

通俗理解：给 AI 一个“知识库”


2.为什么必须用？

默认 AI：
-不知道你的项目结构
-不知道业务逻辑

RAG：
-读取你的代码
-理解你的文档
-提供精准回答
```

## 三 RAG 实现方案

### 3.1 方案 1：简单版(推荐入门)

```
直接用 Continue Context:
在 IDE 中：选中代码 → Add to Context
```

### 3.2 方案 2：本地知识库(进阶)

```
1.工具组合：
- Ollama（模型）
- 向量数据库（如 Chroma / FAISS）

2.流程：
项目代码
   ↓
向量化
   ↓
存入数据库
   ↓
查询时检索
   ↓
交给 AI
```

### 3.3 方案 3：企业级(推荐)

```
Continue
   ↓
RAG 服务
   ↓
知识库（文档 + 代码）
```

## 四 完整 AI 开发流

### 4.1 架构

```
开发者
   ↓
Continue（IDE / CLI）
   ↓
Agent（自动流程）
   ↓
RAG（知识库）
   ↓
模型网关（New API）
   ↓
模型（本地 + 云）
```

### 4.2 实际开发流程

```
1. 输入需求
开发一个电商系统

2.Agent 拆解任务

-用户模块
-商品模块
-订单模块

3.RAG 提供上下文
读取项目结构 / 文档

4.AI 生成代码
自动完成开发

5.Checks 自动审查
保证质量
最终效果：AI 自动开发项目
```

## 五 最强方案

### 5.1 当前配置：

```
- Ollama 
- Continue 
- CC Switch 
- New API 
```

### 5.2  升级后

```
Continue
   ↓
Agent + Prompt + RAG
   ↓
New API（网关）
   ↓
Ollama + GPT + Claude
```

### 5.3 策略

```
简单任务 → 本地模型
复杂任务 → 云模型
知识问题 → RAG
```

## 六 常见问题

```
1.AI 乱写代码
原因：没有 Prompt 约束

2.AI 不懂项目
原因：没有 RAG

3.自动化失败
原因：任务拆解不清晰
```

## 七 本篇总结

```
1-本质
让 AI 从“工具”变成“开发者”

2-三大核心：
Prompt → 控制行为
Agent → 自动执行
RAG → 提供知识
```

