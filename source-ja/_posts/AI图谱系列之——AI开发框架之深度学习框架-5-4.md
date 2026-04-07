---
title: AI图谱系列之——AI开发框架之深度学习框架(5.4)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: cf945270
date: 2026-04-07 19:00:06
---
## 一 概述

```
本文介绍：
 -AI开发框架之深度学习框架
```

<!--more-->

## 二 核心作用

```
训练 / 推理 / 模型开发
```

## 三  深度学习框架(底层)

### 3.1 主流框架？

1-PyTorch(主流)

```
1.特点
-动态图（Dynamic Graph）
-易调试
-学术 + 工业主流

2.生态
-Transformers（HuggingFace）
-PEFT（LoRA）
```

2-TensorFlow

```
1.特点
-静态图（早期）
-工业部署成熟
-TensorFlow Lite（移动端）
```

3-JAX(高端)

```
1.特点
-高性能（GPU/TPU）
-自动微分
-Google 内部主力

2.使用场景
-大模型训练
-科研
```

4-ONNX(模型标准)

```
1.作用
-模型格式标准
-跨框架部署

2.示例
PyTorch → ONNX → TensorRT
```

### 3.2 PyTorch vs TensorFlow？

1-对比

|  维度  | PyTorch | TensorFlow |
| :----: | :-----: | :--------: |
| 易用性 |  5颗星  |   3颗星    |
|  研究  |   强    |    一般    |
|  部署  |  一般   |     强     |

2-总结：

```
“研究用 PyTorch，生产用 TensorFlow（但现在 PyTorch 也可生产）”
```

### 3.3 ONNX 的作用？

```
“AI模型的中间语言”
-PyTorch → ONNX → TensorRT
-跨平台部署（移动端/边缘）
```

## 四 总结

### 4.1 面试重点总结

```
PyTorch      → 训练主流
TensorFlow   → 工业部署
JAX          → 高性能训练
ONNX         → 跨平台推理
```

### 4.2 第五部分总结

```
LangChain      → LLM开发框架（最通用）
LangGraph      → 多Agent编排（2026核心）
LlamaIndex     → RAG框架
AutoGen        → 多Agent对话
CrewAI         → 简单Agent框架
Ollama         → 本地运行
PyTorch        → 深度学习主流
```

### 4.3 2026开发趋势(必考)

```
1. LangGraph 成为 Agent 标准框架
2. Agent 替代传统 App 流程
3. RAG 成为标配
4. 本地模型（Ollama）爆发
5. 多Agent系统成为复杂任务核心
```

