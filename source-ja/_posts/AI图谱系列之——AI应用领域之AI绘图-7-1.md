---
title: AI图谱系列之——AI应用领域之AI绘图(7.1)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: ffd7268e
date: 2026-04-07 19:41:21
---
## 一 概述

```
本文介绍：
 -AI应用领域之AI绘图
```

<!--more-->

## 二 核心

```
AI能力如何变成“产品”
```

## 三 AI绘图(AIGC最成熟赛道)

### 3.1 AI绘图的核心原理是什么？

```
1.核心原理
基于扩散模型（Diffusion Model），从随机噪声逐步生成图像。

2.核心流程：
-文本 → Embedding
-噪声 → 去噪（多步）
-输出图像

3.面试关键词：
“Diffusion + U-Net + Cross Attention”
```

### 3.2 主流绘图模型怎么选？

```
1、开源最强
Flux.1 / Flux.2

特点：
-质量高
-可控性强
-本地部署

2、经典开源
-Stable Diffusion 3
-Stable Diffusion 3.5

3、商业闭源
-Midjourney
-DALL·E
-Ideogram

4、一致性最强
Google Nano Banana 2

面试加分：“角色一致性是当前图像AI难点”
```

### 3.3 ComfyUI vs Automatic1111？

```
1、ComfyUI
-工作流（节点图）
-高度可控（专业）

2、AUTOMATIC1111
-上手简单
-插件丰富

3、面试总结：
“ComfyUI 适合生产，A1111 适合个人”
```

### 3.4 AI绘图难点？

```
1、难点
-手部细节
-多人物一致性
-角色稳定性（ID一致）

2、解决：
-ControlNet
-LoRA微调
```

