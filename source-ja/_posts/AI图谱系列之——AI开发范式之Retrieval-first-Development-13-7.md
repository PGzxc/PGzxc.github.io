---
title: AI图谱系列之——AI开发范式之Retrieval-first Development(13.7)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 6f80e428
date: 2026-04-07 21:06:32
---
## 一 概述

```
本文介绍：
 -AI开发范式之Retrieval-first Development(RAG优先)
```

<!--more-->

## 二 AI开发范式

### 2.1 总体理解

```
传统开发：人写代码 → 调API → 完成功能
AI开发：人描述目标 → AI规划 → AI执行 → 人做决策
```

### 2.2  本质变化

```
“编写代码” → “编排智能”
```

## 三 Retrieval-first Development(RAG优先)

### 3.1  核心思想

```
先检索数据，再让模型回答
```

### 3.2 流程

```
用户问题
 ↓
检索（向量数据库）
 ↓
上下文注入
 ↓
LLM生成
```

### 3.3 优势

```
-可控（避免胡说）
-可更新（数据可变）
-企业级必备
```

### 3.4 本质

```
LLM = 推理引擎
数据 = 知识来源
```

