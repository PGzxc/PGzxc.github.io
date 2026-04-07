---
title: AI图谱系列之——AI推理与部署之推理优化(6.3)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: b89f0613
date: 2026-04-07 19:15:52
---
## 一 概述

```
本文介绍：
 -AI推理与部署之推理优化
```

<!--more-->

## 二 核心

```
降低成本 + 提升速度 + 节省显存
```

## 三  推理优化(性能核心)

### 3.1 FlashAttention(必考)

```
1.概念
FlashAttention 是一种优化 Attention 计算的算法。

2.核心：
-减少显存访问（IO-aware）
-直接在 GPU SRAM 计算

3.效果：
-更快
-更省显存
```

### 3.2 PagedAttention(vLLM核心)

```
1.vLLM 的核心优化
-KV Cache 分页管理
-类似操作系统虚拟内存

2.解决：
-显存碎片
-多请求冲突
```

### 3.3 Quantization(量化)

```
1.核心思想
降低精度 → 减少模型大小

2.常见类型
FP32 → FP16 → INT8 → INT4

3.对比
精度：FP32 > FP16 > INT8 > INT4
性能：INT4 > INT8 > FP16 > FP32

4.优势
-显存降低 50%~90%
-推理速度提升

5.风险
-精度下降
-推理质量下降（尤其复杂任务）
```

### 3.4 KV Cache 优化是什么？

```
1.概念
缓存 Transformer 中历史 token 的 Key/Value。

2.作用：
-避免重复计算
-大幅提升生成速度
```

### 3.5 Speculative Decoding(推测解码)

```
1.概念
用小模型“猜测”大模型输出。

2.流程：
-小模型生成候选
-大模型验证

3.优势：
加速生成
```

### 3.6 Continuous Batching 是什么？

```
1.概念
已在 vLLM 中解释

2.核心：
-动态合并请求
-提高 GPU 利用率
```

## 四 推理优化总结(面试速记)

```
FlashAttention  → Attention加速
PagedAttention  → KV Cache优化（vLLM核心）
Quantization    → 降低模型大小
```

