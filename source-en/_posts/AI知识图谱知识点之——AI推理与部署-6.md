---
title: AI知识图谱知识点之——AI推理与部署(6)
categories:
  - AI
  - AI图谱
  - AI知识点
tags:
  - AI知识点
abbrlink: 336b9413
date: 2026-04-06 21:45:48
---
## 一 概述

```
本文介绍：
1.推理框架
2.本地推理
3.推理优化
```

<!--more-->

## 二 AI推理与部署

### 2.1 推理框架(服务级部署)

|          框架           |        核心定位         |                          2026 地位                          |
| :---------------------: | :---------------------: | :---------------------------------------------------------: |
|          vLLM           |    通用 LLM 推理加速    | 王者，Continuous Batching + PagedAttention，吞吐 / 延迟双优 |
|      TensorRT-LLM       |   NVIDIA 硬件深度优化   |               英伟达生态首选，GPU 利用率拉满                |
|        DeepSpeed        | 微软开源推理 / 训练框架 |              大模型分布式推理，多卡 / 多机场景              |
| Triton Inference Server |     企业级推理服务      |            多模型、多框架统一部署，生产环境标配             |
|         SGLang          |     结构化生成加速      |      针对 JSON / 代码等结构化输出优化，速度提升 3-5 倍      |

### 2.2 本地推理(端侧 / 单机)

```
1.llama.cpp：C++ 实现，CPU/GPU 都能跑，低配设备友好
2.ExLlama：专门优化 Llama 系列，显存占用极低
3.MLC-LLM：手机 / 边缘端王者，iOS/Android 直接跑大模型
```

### 2.3 推理优化

```
1. 注意力机制优化
-FlashAttention：显存效率提升 2-4 倍，所有框架标配
-PagedAttention：vLLM 核心，解决 KV Cache 碎片化，吞吐暴涨

2. 量化（Quantization）
-把模型参数从 FP16/FP32 → INT8/INT4/FP8
-核心：显存减半 / 成本减半，精度损失 < 5%
-2026 主流：AWQ/GPTQ/FP8 量化

3. KV Cache Optimization
-优化上下文缓存，减少重复计算，长上下文必备
-配合 Continuous Batching 效果翻倍

4. Speculative Decoding（投机解码）
-小模型先 “猜” 结果，大模型验证
-生成速度提升 2-3 倍，几乎无损精度

5. Continuous Batching（连续批处理）
-vLLM 核心，打破传统静态批处理限制
-吞吐提升 5-10 倍，是 2026 推理部署必用技术
```

## 三 总结

### 3.1 一句话总结

```
推理部署 = 让模型跑得更快、更省资源、成本更低
是 LLM 落地的最后一公里，也是最关键的工程环节。
```

### 3.2 2026 推理部署选型口诀

```
1.云服务部署：vLLM + TensorRT-LLM
2.企业生产服务：Triton + vLLM
3.本地 / 低配机：llama.cpp / ExLlama
4.手机 / 边缘端：MLC-LLM
5.所有场景必加：量化 + PagedAttention + Continuous Batching
```

### 3.3 完整推理部署链路

```
开源模型 → 量化（GPTQ/AWQ） → vLLM/TensorRT-LLM 加速 → Triton 部署 → 对外提供 API
↓
本地部署：模型 → llama.cpp/ExLlama → 单机 / 端侧运行
```

