---
title: AI图谱系列之——RAG与检索系统之RAG系统(3.3)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 8dcf3d0b
date: 2026-04-07 18:01:14
---
## 一 概述

```
本文介绍RAG与检索系统/RAG系统：
1-RAG系统
- RAG
- Chunking
- Rerank
- Query Expansion
- RAG Pipeline

2.RAG流程：
User Query—>Embedding—>Vector Search—>Retrieve Documents—>LLM Generation
```

<!--more-->

## 二 RAG与检索系统/RAG系统

### 2.1 什么是RAG？

```
1.概念
RAG（Retrieval-Augmented Generation）= 检索 + 生成

2.本质：
用外部知识增强 LLM，

3.解决：

-幻觉问题
-知识过时
-私有数据访问
```

### 2.2 RAG的流程是什么？

```
User Query
↓
Embedding
↓
Vector Search
↓
Top-K Documents
↓
LLM Prompt
↓
Answer
```

### 2.3 为什么要做Chunking？

```
1.概念
Chunking = 文档切分

2.影响：
-召回率
-上下文质量

3.常见策略：
-固定长度（512 tokens）
-语义切分（推荐）

4.面试加分：
overlap（重叠切分）

5.原因：
-上下文限制
-提高检索精度
-提高召回率

6.常见策略
-Fixed Size
-Sliding Window
-Semantic Chunking
```

### 2.4 Rerank 是什么？

```
1.概念
二次排序，提高检索结果质量。

2.流程：
-向量召回 TopK
-使用 Cross-Encoder 重新打分

3.优点：
-精度大幅提升
-成本可控
```

### 2.5 什么是Query Expansion？

```
1.概念
Query Expansion 是对用户问题进行扩展。

2.示例：
Query：苹果价格
↓
扩展：
苹果水果价格
Apple公司股价

3.方法：
同义词扩展
LLM改写
多查询生成
```

### 2.6 Multi-hop RAG 是什么？

```
1.概念
多跳推理 RAG，需要多次检索。

2.示例：
问题：“某公司CEO毕业学校在哪？”

流程：
-查 CEO是谁
-查 CEO教育背景
```

### 2.7 Graph RAG 是什么？

```
1.概念
结合知识图谱的 RAG

2.优点：
-支持复杂关系
-更强推理能力

3.场景：
-金融风控
-企业知识库
```

### 2.8 Context Compression 是什么？

```
1.概念
压缩检索内容，减少 token 消耗。

2.方法：
-摘要
-去重
-关键句提取
```

### 2.9 如何优化RAG系统？

```
从5个层面优化：

1.检索优化
-更好的Embedding模型
-Hybrid Search
-Top-K调整

2.数据优化
-高质量数据
-去噪
-结构化处理

3.Chunk优化
-合理大小（200~500 tokens）
-语义切分
-重叠窗口

4.排序优化
-Rerank模型
-Cross Encoder

5.生成优化
-Prompt优化
-上下文压缩
-防止幻觉
```

### 2.10 RAG和微调的区别？

|   维度   |   RAG    | Fine-tuning  |
| :------: | :------: | :----------: |
| 数据更新 |   实时   | 需要重新训练 |
|   成本   |    低    |      高      |
| 可解释性 |    强    |      弱      |
| 适用场景 | 知识问答 |   专业任务   |

### 2.11 RAG常见问题

```
1.幻觉（Hallucination）-解决

-引用来源
-Rerank
-增加检索约束
-限制回答来源
-引用文档

2.召回不准
-Query Expansion
-提高Top-K
-优化Embedding

3.误召回(召回不准)-解决
-Rerank
-过滤低质量数据

4.Token 超限-解决
-Context Compression
```

