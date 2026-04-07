---
title: AI图谱系列之——LLM基础技术之LLM概念(2.1)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 745322b8
date: 2026-04-07 17:42:48
---
## 一 概述

```
本文介绍LLM基础技术/LLM概念：
- 基础模型(Foundation Model)
- 大语言模型(Large Language Model（LLM）)
- 多模态模型(Multimodal Model)
- 推理模型(Reasoning Model)
- Thinking Model(Test-time Compute / Thinking Modes)
```

<!--more-->

## 二 LLM基础技术/LLM概念

### 2.1 什么是基础模型(Foundation Model)？

```
1.概念
Foundation Model(基础模型)是指在 大规模通用数据上预训练的通用模型，
可以通过微调或Prompt适配到多种任务。

2.特点：
-通用性强
-规模大（数据 + 参数）
-可迁移（Fine-tuning / Prompt）

3.典型模型：
-GPT系列
-BERT
-Llama
-Qwen
-DeepSeek

4.一句话总结：
Foundation Model = “通用AI底座模型”
```

### 2.2 什么是大语言模型(LLM)？

```
1.概念
LLM（Large Language Model）是基于 Transformer架构，在海量文本数据上训练的语言模型。

2.核心能力：
-文本生成
-对话
-推理
-代码生成
-知识问答

3.本质：
预测下一个Token的概率模型

4.数学表达：
P(w_t | w_1, w_2, ..., w_{t-1})
```

### 2.3 什么是多模态模型(Multimodal Model)？

```
1.概念
多模态模型是可以处理 多种输入/输出模态 的模型。

2.模态包括：
-文本
-图像
-音频
-视频

3.能力：
-图文理解
-语音对话
-视频生成
-视觉问答（VQA）

4.实现方式：
-统一Embedding空间
-Cross Attention
-多编码器结构
```

### 2.4 什么是推理模型(Reasoning Model)？

```
1.概念
Reasoning Model 是专门优化 逻辑推理能力 的模型。

2.特点：
-多步推理能力强
-数学能力强
-代码能力强

3.实现方式：
-Chain of Thought训练
-RLHF / DPO优化
-Test-time计算增强
```

### 2.5 什么是Thinking Model？

```
1.概念
Thinking Model 是指在 推理阶段增加计算（Test-time Compute） 来提升模型能力的技术。

2.核心思想：
多算几步 → 更聪明

3.常见方式：
-多轮推理
-Tree Search
-Self-Reflection
-多样本生成（Self-Consistency）

4.优势：
-无需重新训练模型
-显著提升推理能力
```

