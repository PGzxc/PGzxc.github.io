---
title: AI图谱系列之——LLM基础技术之Prompt工程(2.2)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 15b3d320
date: 2026-04-07 17:43:23
---
## 一 概述

```
本文介绍LLM基础技术/Prompt工程：
- Prompt
- 提示工程(Prompt Engineering)
- System Prompt
- Prompt Template
- Few-shot / Zero-shot / One-shot
- Chain of Thought（CoT）
- Tree of Thoughts
- Self Consistency
- ReAct
- Plan-and-Solve / Least-to-Most Prompting
```

<!--more-->

## 二 LLM基础技术/Prompt工程

### 2.1 什么是Prompt？

```
1.概念
Prompt 是输入给 LLM 的文本指令，用于引导模型生成结果。

2.示例：
请用简单语言解释机器学习

3.本质：
控制模型输出行为的输入
```

### 2.2 什么是提示工程(Prompt Engineering)？

```
1.概念
Prompt Engineering 是设计和优化 Prompt，使模型输出更准确、更稳定的技术。

2.核心目标：
-提高准确率
-减少幻觉
-控制输出格式
-增强推理能力
```

### 2.3 System Prompt 的作用是什么？

```
1.概念
System Prompt 是用于定义模型 角色和行为规则 的提示。

2.示例：
你是一个资深AI工程师，请用专业术语回答问题

3.作用：
-控制语气
-约束行为
-设定角色
```

### 2.4 什么是Prompt Template？

```
1.概念
Prompt Template 是将 Prompt 模板化，提高复用性。

2.示例：
-问题：{question}
-请给出详细解答

3.应用：
-RAG系统
-批量任务
-Agent系统
```

### 2.5 什么是Few-shot学习？

1.概念

```
Few-shot 是在 Prompt 中提供 少量示例 来引导模型。
```

2.对比

|   类型    |   含义   |
| :-------: | :------: |
| Zero-shot |  无示例  |
| One-shot  | 一个示例 |
| Few-shot  | 多个示例 |

3-示例

```
输入：2+2=4
输入：3+3=6
输入：5+5=？
```

### 2.6 什么是CoT(Chain of Thought)？

```
1.概念
CoT（Chain of Thought）是通过让模型 一步一步推理 来提高准确率。

2.示例：
请一步一步思考：

3.效果：
提升数学/逻辑题准确率
```

### 2.7 ToT(Tree of Thoughts)和CoT区别？

1-对比

| 方法 |    特点    |
| :--: | :--------: |
| CoT  | 单路径推理 |
| ToT  | 多路径搜索 |

2-ToT流程：

```
生成多个思路
↓
评估每条路径
↓
选择最优路径
```

3-适用于：

```
复杂推理
搜索问题
规划问题
```

### 2.8 什么是Self Consistency？

```
1.概念
Self Consistency 是生成 多个答案 → 投票选择最优结果。

2.流程：

多次生成
↓
结果投票
↓
输出最一致答案

3.优点：

降低随机性
提升稳定性
```

### 2.9 什么是ReAct？

```
1.概念
ReAct = Reason + Act

2.模型可以：
思考（Reason）
调用工具（Act）

3.示例：
Thought: 我需要查天气
Action: 调用API
Observation: 返回天气

4.应用：
Agent系统
工具调用
自动化流程
```

### 2.10 Plan-and-Solve / Least-to-Most

1-什么是Plan-and-Solve？

```
1.概念
Plan-and-Solve 是先规划再执行的Prompt方法。

2.流程：

先生成计划
↓
按步骤执行
```

2-什么是Least-to-Most Prompting？

```
1.概念
将复杂问题拆解为多个子问题：简单问题 → 复杂问题

2.示例：
-先解决基础步骤
-再组合结果

3.优势：
提升复杂任务成功率
```

