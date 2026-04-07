---
title: AI图谱系列之——RAG与检索系统之检索技术(3.2)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: f892cabe
date: 2026-04-07 18:00:30
---
## 一 概述

```
本文介绍RAG与检索系统/检索技术：
1. 检索技术
   - Similarity Search
   - Semantic Search
   - ANN Search
   - Hybrid Search

2. 算法
   - FAISS
   - HNSW
   - ScaNN（Google）
   - DiskANN（Microsoft）
```

<!--more-->

## 二 RAG与检索系统/检索技术

### 2.1 什么是相似度搜索(Similarity Search)？

```
1.概念
Similarity Search 是基于向量距离计算相似度。

2.常见距离：
Cosine Similarity
Euclidean Distance
Dot Product

3.公式（余弦相似度）：
cos(θ) = (A·B) / (|A||B|)
```

### 2.2 什么是语义搜索(Semantic Search)？

```
1.概念
语义搜索是基于 含义而不是关键词 进行搜索。

2.示例：
Query：如何减肥
结果：健康饮食、运动建议

而不是：只匹配“减肥”关键词
```

### 2.3 Semantic Search 和 Keyword Search 区别？

1-对比

|      类型       |        特点        |
| :-------------: | :----------------: |
| Keyword Search  | 关键词匹配（BM25） |
| Semantic Search |    向量语义匹配    |

2-举例

```
用户搜：“如何提升代码质量”
-Keyword：匹配“代码质量”
-Semantic：匹配“代码规范、重构、测试”
```

### 2.4 什么是 ANN(Approximate Nearest Neighbor)？

```
1.概念
ANN（Approximate Nearest Neighbor）是 近似最近邻搜索。

2.特点：
-牺牲少量精度
-换取极大性能提升

3.原因：
-精确搜索复杂度 O(n)
-ANN可降低到 O(log n)
```

### 2.5 什么是混合搜索(Hybrid Search)？

```
1.概念
混合检索 = 关键词 + 向量检索

2.常见方案：

Score = α * BM25 + β * Vector Score

3.作用：
-提高召回率
-避免语义偏差
```

### 2.6 常见ANN算法

1-FAISS是什么？

```
1.概念
是 Facebook 开源的向量检索库。

2.特点：
-高性能
-支持 GPU
-多种索引（IVF / PQ / HNSW）
```

2-HNSW原理是什么？

```
1.概念
HNSW（Hierarchical Navigable Small World）

2.核心思想：
-构建多层图结构
-上层：稀疏（快速定位）
-下层：稠密（精确搜索）

3.优点：
-查询速度极快
-高 recall

4.常见使用：
-Qdrant
-Milvus
```

3-ScaNN特点？

```
1.概念
ScaNN 是 Google 提出的高效ANN算法。

2.特点：
-向量量化
-高性能
-适合大规模数据
```

4-DiskANN解决什么问题？

```
1.概念
DiskANN 用于 超大规模数据（磁盘级）检索。

2.特点：
-低内存占用
-支持TB级数据
```


