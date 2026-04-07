---
title: AI图谱系列之——RAG与检索系统之Search系统(3.4)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 79ec4c31
date: 2026-04-07 18:01:53
---
## 一 概述

```
本文介绍RAG与检索系统/Search系统：
- Web Search
- Enterprise Search
- Real-time Retrieval
```

<!--more-->

## 二 RAG与检索系统/Search系统

### 2.1 Web Search vs RAG？

|   维度   | Web Search |   RAG    |
| :------: | :--------: | :------: |
| 数据来源 |    全网    | 私有数据 |
|  实时性  |     强     |   可控   |
|  可控性  |     低     |    高    |

### 2.2 Enterprise Search 架构？

```
1-典型架构:

数据源（DB / 文档 / API）
↓
ETL / 清洗
↓
Embedding
↓
Vector DB
↓
Search API
↓
RAG
```

### 2.3 Real-time Retrieval 怎么做？

```
1.核心点：
-实时写入向量库
-增量索引
-Streaming pipeline

2.技术组合：
-Kafka + 向量DB
-实时 embedding
```

## 三 面试总结

```
Embedding 本质：语义向量化
向量数据库 = 存储 + ANN索引
HNSW 原理（图结构）
ANN vs 精确搜索
Hybrid Search（关键词+语义）
RAG 标准流程（必须能手写）
Chunking + overlap
Rerank（提升精度关键）
Multi-hop / Graph RAG
企业架构（RAG + Search）
```

