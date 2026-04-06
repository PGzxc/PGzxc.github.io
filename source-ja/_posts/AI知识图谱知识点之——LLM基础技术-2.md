---
title: AI知识图谱知识点之——LLM基础技术(2)
categories:
  - AI
  - AI图谱
  - AI知识点
tags:
  - AI知识点
abbrlink: d924f308
date: 2026-04-06 21:43:51
---
## 一 概述

```
本文介绍：
1.LLM概念
2.Prompt工程
3.Token机制
4.记忆机制
```

<!--more-->

## 二 LLM基础技术

### 2.1 LLM概念

```
1.基础模型（Foundation Model）
在海量数据上预训练、能适配各种任务的通用大模型底座。

2.大语言模型（LLM）
基于海量文本训练、能理解与生成人类语言的大规模语言模型。

3.多模态大模型（Multimodal Model）
能同时处理文本、图像、音频、视频等多种信息的模型。

4.推理大模型（Reasoning Model）
专注逻辑、数学、代码、复杂问题求解的增强型 LLM。

5.思考模式（Thinking Model）
模型在生成答案前先自主思考、推理、验算，提升正确率。
```

### 2.2 Prompt工程

```
1.提示词（Prompt）
给模型的指令 / 问题 / 输入。

2.提示词工程（Prompt Engineering）
设计更精准的提示，让模型输出更符合预期。

3.系统提示词（System Prompt）
给模型设定角色、规则、风格、约束。

4.提示词模板（Prompt Template）
可复用的标准化提示结构。

5.Zero/One/Few-shot
零示例 / 单示例 / 少示例直接让模型完成任务。

6.思维链（CoT）
让模型一步步写出推理过程，提升复杂问题正确率。

7.思维树（ToT）
多分支推理，尝试多条思路再选最优。

8.自一致性（Self Consistency）
生成多条推理路径，投票选出最一致答案。

9.ReAct
同步输出思考 + 行动 + 观察，适合工具调用。

10.Plan-and-Solve / Least-to-Most
先规划再解题 / 从简单推到复杂，2026 高级 Prompt 标配。
```

### 2.3 Token 机制

```
1.Token
LLM 里文字的最小单位，中文一般一字或一词。

2.Tokenization
把人类语言切分成 Token 并转为数字编号。

3.Context Window
模型一次能 “看到” 的最大 Token 数量，
2026 年 1M+ 上下文已成为旗舰标配。
```

### 2.4 记忆机制

```
1.Context（短期记忆）
模型当前对话能看到的全部信息，关掉即消失。

2.Memory（长期记忆）
跨对话、可持久存储的外部记忆。

3.Vector Memory（向量记忆）
用向量存储，按语义相似度检索。

4.Episodic Memory（情景记忆）
按时间、事件、经历保存，像日记一样，2026 Agent 标配。
```

