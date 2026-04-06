---
title: AI知识图谱知识点之——RAG与检索系统(3)
categories:
  - AI
  - AI图谱
  - AI知识点
tags:
  - AI知识点
abbrlink: d70b9514
date: 2026-04-06 21:44:22
---
## 一 概述

```
本文介绍：
1.向量技术
2.检索技术
3.RAG系统
4.Search系统
```

<!--more-->

## 二 RAG与检索系统

### 2.1 向量技术

```
一、核心概念
1.1.Embedding：嵌入
将文本、图像转为低维稠密向量，语义相近则向量相近。

1.2.Vector Database：向量数据库
专门存储、检索向量的数据库，支持高维、海量、快速相似度查询。

1.3.Vector Index：向量索引
加速检索的结构，避免暴力遍历，实现毫秒级召回。

二、2026 主流向量库
-Milvus / Zilliz Cloud：国产开源头部，高性能、分布式。
-Pinecone：全托管云服务，开箱即用。
-Weaviate：向量 + 知识图谱结构。
-Chroma：轻量、本地开发常用。
-Qdrant：速度快、API 友好。
-PGVector：PostgreSQL 插件，企业最常用，业务数据与向量一体。
```

### 2.2 检索技术

```
一、检索类型
1.1、Similarity Search：相似度检索
计算向量距离（欧氏、余弦、内积）找出最相似条目。

1.2、Semantic Search：语义检索
按意思搜索，不依赖关键词匹配。

1.3、ANN Search：近似最近邻
Approximate Nearest Neighbor，用近似换速度，海量数据必备。

1.4、Hybrid Search：混合检索
关键词检索（BM25）+ 语义检索融合，精度最高。

二、经典算法
-FAISS：Facebook 经典向量检索库。
-HNSW：工业界综合最强，快、准、稳。
-ScaNN：Google，极致压缩与高速。
-DiskANN：Microsoft，针对磁盘存储优化。
```

### 2.3 RAG 系统

```
一、核心组件
1.1、RAG：Retrieval-Augmented Generation，检索增强生成，解决幻觉、知识过时。
1.2、Chunking：分块
长文档切分成小片段，适配上下文窗口。

1.3、Rerank：重排序
粗召回后精排，提升相关度。

1.4、Query Expansion：查询扩展
改写、扩充用户问题，提高召回率。

1.5、RAG Pipeline：完整流水线
查询 → 向量化 → 检索 → 精排 → 压缩 → 生成。

1.6、Graph RAG：结合知识图谱，实体与关系更强。
1.7、Multi-hop RAG：多步检索、多跳推理。
1.8、Context Compression：上下文压缩
精简内容，节省 token，提升理解。

二、标准 RAG 流程

User Query（用户问题）
↓
Embedding（转向量）
↓
Vector Search（向量检索）
↓
Retrieve Documents（取回文档）
↓
LLM Generation（生成回答）
```

### 2.4 Search 系统

```
1.Web Search：全网搜索
从互联网获取公开、实时信息。

2.Enterprise Search：企业搜索
对内检索私有文档、数据、知识库。

3.Real-time Retrieval：实时检索
低延迟、秒级更新，用于订单、监控、新闻等。
```

