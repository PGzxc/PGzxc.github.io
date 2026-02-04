---
title: ComfyUI开发之——核心生成流程(4)
categories:
  - 开发
  - Q-AI
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 4401a601
date: 2026-02-05 07:11:00
---
## 一 概述

```
本文介绍一下内容：
 1.文生图 Workflow 原理拆解
 2.图生图 Workflow
 3.高清修复(Hires)流程
 4.Upscale 放大方案
```

<!--more-->

## 二 文生图 Workflow 原理拆解

### 2.1 ComfyUI 文生图的本质

```
1.一句话总结：
Prompt → 编码 → 潜空间采样 → 解码成图片

2.对应 ComfyUI 中的三大核心系统：

文本（Prompt）
  ↓
CLIP 编码
  ↓
Latent（潜空间）
  ↓
Sampler（采样器）
  ↓
VAE 解码
  ↓
Image
```

### 2.2 CLIP / Latent / Sampler 各自做什么？

1-CLIP(文本编码器)

```
1.将自然语言 Prompt 转为模型能理解的向量

2.分为：
-正向 Prompt（你想要什么）
-反向 Prompt（你不想要什么）

3.常见节点：
-CLIP Text Encode (Prompt)
-CLIP Text Encode (Negative)

4.重点理解：
-CLIP 不生成图片
-它只负责 “理解文字”
```

2-Latent(潜空间)

```
1.Stable Diffusion 不是直接在像素空间画图，而是：
-在一个低维“潜空间”中生成
-最后再通过 VAE 解码成真实图片

2.常见节点：
-Empty Latent Image
-VAE Encode
-VAE Decode

3.优点：
-运算更快
-更稳定
-适合迭代生成
```

3-Sampler(采样器)

```
1.Sampler 是 真正“画图”的地方。
2.在 ComfyUI 中，核心节点是：KSampler

3.它负责：
-从随机噪声开始
-1步步“去噪”
-最终生成符合 Prompt 的 Latent
```

### 2.3 KSampler 参数详解(必背)

这是 ComfyUI 最重要的节点，没有之一。

1-Steps(采样步数)

```
去噪的次数
越高 → 越精细 → 越慢
```

常见范围

|   场景   | Steps |
| :------: | :---: |
|   测试   | 15~20 |
| 正常出图 | 20~30 |
|  高质量  | 30~40 |

2-CFG(提示词引导强度)

```
1.说明：“模型有多听你的话？”

低 CFG：更自由、更随机
高 CFG：更贴合 Prompt，但容易崩

2.推荐范围：
5 ~ 9（最常用）


3.CFG 太高的问题：
-画面僵硬
-过度锐化
-奇怪构图
```

3-Seed(随机种子)

```
决定“随机起点”
同 Seed + 同参数 = 基本相同画面

2.用法技巧：
-1：每次随机
固定 Seed：用于微调、对比参数
```

4-Sampler / Scheduler

```
Sampler：去噪算法
Scheduler：步数分配方式

2.常用组合（新手）：
Sampler: DPM++ 2M
Scheduler: Karras
```

## 三 图生图 Workflow(Image to Image)

图生图 = 在已有图片基础上“再创作”

### 3.1 图生图与文生图的核心区别

|    文生图    |     图生图     |
| :----------: | :------------: |
| 从纯噪声开始 | 从已有图像开始 |
|   全新生成   |  保留原图结构  |
| 不可控性更高 |   可控性更强   |

### 3.2 图生图核心节点变化

```
1.新增关键节点：
-Load Image
-VAE Encode
-去掉 Empty Latent Image

2.流程变为：
Image
 → VAE Encode
 → Latent
 → KSampler
 → VAE Decode
```

### 3.3 去噪强度(Denoise Strength)

这是 图生图最关键参数

```
在 KSampler 中体现为：denoise = 0 ~ 1
```

2-含义

| Denoise |    效果    |
| :-----: | :--------: |
| 0.1~0.3 |    微调    |
| 0.4~0.6 |  风格迁移  |
| 0.7~0.9 |  大幅重绘  |
|   1.0   | 接近文生图 |

### 3.4 风格迁移 & 局部保持

```
1.风格迁移
-保留结构
-改变画风
-常用 denoise：0.4~0.6

2.局部保持技巧
-降低 denoise
-使用 ControlNet（后续章节）
-使用 Inpainting
```

## 四 高清修复(Hires)流程

### 4.1 说明

```
高清修复 ≠ 单纯放大
而是 “先生成 → 再精修”
```

### 4.2 两阶段采样原理

```
阶段一：
-小分辨率生成
-保证构图、姿态正确

阶段二：
-放大 Latent
-再采样补细节

好处：
-更清晰
-不容易崩脸
-性能友好
```

### 4.3 Latent Upscale 是什么？

```
在潜空间中放大
再进行二次采样

常见节点：
-Latent Upscale
-第二个 KSampler
```

### 4.4 常见问题

```
1.画面糊
Steps 太低 / CFG 太低

2.脸崩
Denoise 太高 / 二次采样过强

3.显存爆
放大倍数太大 / 分辨率过高
```

## 五 Upscale 放大方案

### 5.1 Latent 放大 vs 像素放大

|    方式     |       特点       |
| :---------: | :--------------: |
| Latent 放大 | 质量高，可再创作 |
|  像素放大   |  快，不改变内容  |

### 5.2 ESRGAN / Real-ESRGAN

```
1.ESRGAN
-偏向插画 / 二次元
-锐利感强

2.Real-ESRGAN
-偏向真实照片
-更自然
```

### 5.3 清晰度与速度的平衡

```
推荐策略：
先 Latent Upscale ×2
再 Real-ESRGAN ×2

兼顾质量与效率
```

