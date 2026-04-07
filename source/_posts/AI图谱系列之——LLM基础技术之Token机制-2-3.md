---
title: AI图谱系列之——LLM基础技术之Token机制(2.3)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: d38eebc1
date: 2026-04-07 17:43:53
---
## AI图谱系列之——LLM基础技术之Token机制(2.3)

## 一 概述

```
本文介绍LLM基础技术/Token机制：
- Token
- Tokenization
- Context Window（1M+上下文已成为标配）
```

<!--more-->

## 二 LLM基础技术/Token机制

### 2.1 Token是什么？

```
1.概念
Token 是 LLM 处理文本的最小单位。

2.示例：

2.1-Hello world
Token：
Hello
world

2.2-中文：你好世界
可能拆分：
你 / 好 / 世界
```

### 2.2 什么是Tokenization？

```
1.概念
Tokenization 是将文本转换为 Token 的过程。

2.常见方法：
-BPE（Byte Pair Encoding）
-WordPiece
-SentencePiece

3.流程：
文本 → Token → ID → 模型输入
```

### 2.3 什么是上下文窗口？

```
1.概念
Context Window 是模型一次能处理的最大 Token 数量。

2.例如：
8K
32K
128K
1M+

3.影响：
长文本理解
RAG效果
代码分析能力
多轮对话能力
```

### 2.4 上下文窗口越大越好吗？

```
1.不完全是，存在问题：
-计算成本高
-注意力衰减（远距离信息弱）
-推理速度变慢

2.解决方案：
-RAG
-Sliding Window
-Memory机制
```

