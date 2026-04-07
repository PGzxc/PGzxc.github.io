---
title: AI图谱系列之——RAG与检索系统之向量技术(3.1)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 52da7938
date: 2026-04-07 17:59:32
---
## 一 概述

```
本文介绍RAG与检索系统/向量技术：
1. 向量技术
   - Embedding
   - Vector Database
   - Vector Index

2. 数据库（2026主流）
   - Milvus / Zilliz Cloud
   - Pinecone
   - Weaviate
   - Chroma
   - Qdrant
   - PGVector（PostgreSQL插件，企业最常用）
```

<!--more-->

## 二 RAG与检索系统/向量技术

### 2.1 什么是 Embedding？和传统特征有什么区别？

```
1.概念
Embedding 是将文本/图像等数据映射到高维向量空间的表示方法，
使语义相似的数据在向量空间中距离更近。

2.核心点：
-输入：文本 / 图片 / 多模态
-输出：Dense Vector（如 768 / 1536 维）
-本质：语义压缩表示

3.对比传统特征：
-TF-IDF：稀疏、无语义
-One-hot：维度爆炸
-Embedding：稠密 + 语义信息

4.加分点：
-Embedding 模型：BERT / E5 / OpenAI embedding
-支持跨语言语义对齐
```

### 2.2 什么是 向量数据库(Vector Database)

```
1.概念
向量数据库是专门用于 存储向量并进行相似度检索 的数据库。

2.核心能力：
-高效向量存储
-相似度搜索（Top-K）
-索引加速
```

3-向量数据库和传统数据库的区别？

|   维度   | 传统数据库 | 向量数据库 |
| :------: | :--------: | :--------: |
| 查询方式 |  精确匹配  | 相似度匹配 |
| 数据结构 |     表     |    向量    |
|   索引   |    B+树    | ANN Index  |
|   应用   |  事务系统  |   AI检索   |

4-核心本质

```
向量数据库 = ANN算法 + 向量索引 + 存储系统
```

### 2.3 主流向量数据库选型怎么选？

```
1、企业级
-Milvus / Zilliz Cloud
-Pinecone

特点：
-分布式
-高可用
-SaaS支持

2、开源/轻量

-Chroma
-Qdrant
-Weaviate

适合：
-本地开发
-中小规模RAG

3、企业最常用（重点）
-PGVector

原因：
-和业务库统一（PostgreSQL）
-成本低
-易维护
```

### 2.4 什么是向量索引(Vector Index)？

```
1.概念
向量索引用于加速相似度搜索，避免全量扫描。

2.作用：
-降低查询复杂度
-提升检索速度

3.常见索引：
-IVF（倒排文件）
-HNSW（图结构）
-PQ（压缩向量）
```

### 2.5 主流向量数据库

1-常见向量数据库有哪些？如何选择？

```
Milvus / Zilliz Cloud
Pinecone
Weaviate
Chroma
Qdrant
PGVector
```

2-选型建议

|   场景   |       推荐        |
| :------: | :---------------: |
|  企业级  | Milvus / PGVector |
|  云服务  |     Pinecone      |
| 本地轻量 |      Chroma       |
|  高性能  |      Qdrant       |
|  AI原生  |     Weaviate      |

### 2.6 向量相似度有哪些？

```
Cosine Similarity（最常用）
L2 Distance（欧式距离）
Dot Product（内积）

面试关键点：
归一化后：cosine ≈ dot product
```

