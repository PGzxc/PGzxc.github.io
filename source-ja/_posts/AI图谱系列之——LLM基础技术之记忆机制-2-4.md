---
title: AI图谱系列之——LLM基础技术之记忆机制(2.4)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: cbc6a3d9
date: 2026-04-07 17:44:22
---
## 一 概述

```
本文介绍LLM基础技术/记忆机制：
- Context（短期记忆 / LLM内）
- Memory（长期记忆）
- Vector Memory / Episodic Memory（2026 Agent常用）
```

<!--more-->

## 二 LLM基础技术/记忆机制

### 2.1 Context vs Memory？

1-概念

```
Context是短期记忆，存在于当前输入；
Memory是长期记忆，需要外部存储（如向量数据库）。
```

2-对比

| 类型 |  类型   |
| :--: | :-----: |
| 特点 | Context |
| 临时 | Memory  |

### 2.2 Vector Memory 是什么？

```
1.概念
Vector Memory是把信息转为Embedding存储，
通过相似度检索实现长期记忆。

2.本质
= RAG中的向量检索
```

### 2.3 Episodic Memory 是什么？

```
Episodic Memory是记录历史交互或事件，
用于提升个性化和上下文连续性。
类似“用户会话历史”
```

## 三 LLM总结

```
LLM的核心 = Token预测 + Prompt控制 + Context限制 + 外部Memory扩展
```

