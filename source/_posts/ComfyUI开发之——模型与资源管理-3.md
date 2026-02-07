---
title: ComfyUI开发之——模型与资源管理(3)
categories:
  - 开发
  - Q-AI
  - ComfyUI
tags:
  - ComfyUI
  - 模型
abbrlink: 9af56ac2
date: 2026-02-04 07:22:05
---
## 一 概述

```
本文介绍一下内容：
 1.模型体系总览
 2.Checkpoint(主模型)
 3.VAE
 4.LoRA
 5.ControlNet(结构控制核心)
 6.Embedding(文本增强)
 7.Upscaler(放大模型)
 8.模型来源与选择建议
 9.模型管理经验总结
```

<!--more-->

## 二 模型体系总览

### 2.1 为什么模型管理如此重要？

```
1.在 ComfyUI 中：
Workflow 是骨架，模型是灵魂。

2.同一个 Workflow：
-模型不同 → 风格、质量、能力完全不同
-模型放错位置 → Workflow 直接跑不起来
```

### 2.2 ComfyUI 中常见的模型类型

|  模型类型   |            作用            |
| :---------: | :------------------------: |
| Checkpoint  |    主模型，决定整体能力    |
|     VAE     | 解码潜空间，影响色彩与细节 |
|    LoRA     | 微调模型，控制风格 / 人物  |
| ControlNet  |          结构控制          |
|  Embedding  |    词向量，增强 Prompt     |
|  Upscaler   |         放大清晰度         |
| Video Model |          视频生成          |
| Audio Model |          音频生成          |

## 三 Checkpoint(主模型)

### 3.1 什么是 Checkpoint

```
1.Checkpoint 通常是：
-.ckpt
-.safetensors

2.它包含：
-大量参数
-已训练好的权重
-决定模型「能画什么、画成什么样」
```

### 3.2 SD / SDXL 的区别

|  项目  | SD 1.5  |   SDXL    |
| :----: | :-----: | :-------: |
| 分辨率 | 512×512 | 1024×1024 |
|  显存  |   低    |    高     |
|  质量  |  尚可   |   更好    |
|  速度  |   快    |    慢     |

新手建议：

* 显存 ≤ 8GB：SD 1.5
* 显存 ≥ 10GB：SDXL

### 3.3 Checkpoint 放哪里？

```
1.位置
ComfyUI/models/checkpoints/

2.放进去后：
-刷新 UI
-在 Load Checkpoint 节点中选择
```

## 四 VAE

### 4.1 VAE 是什么？

```
1.VAE(变分自编码器)负责：把 AI 的“潜空间结果”转成你看到的图片

2.影响：
-颜色
-对比度
-细节层次
```

### 4.2 是否必须单独使用 VAE？

```
1.如何使用
有些 Checkpoint 内置 VAE
有些需要 外置 VAE

2.经验建议：
模型作者推荐什么 VAE，就用什么
```

### 4.3 VAE 目录

```
ComfyUI/models/vae/
```

## 五 LoRA

### 5.1  LoRA 是什么？

```
1.LoRA 是：
在不改变主模型的情况下，对某一风格 / 人物 / 特征进行增强

2.特点：
-文件小(几十 MB)
-可叠加
-可调权重
```

### 5.2 LoRA 的常见用途

```
人物脸型
画风
服装
构图风格
```

### 5.3 LoRA 怎么用？

```
1、方式一（Prompt）：
<lora:xxx:1.0>

2、方式二（节点）：
-Load LoRA
-接入 Model + CLIP
```

### 5.4 LoRA 放哪里？

```
ComfyUI/models/loras/
```

## 六 ControlNet(结构控制核心)

### 6.1 ControlNet 能做什么？

```
1.ControlNet 用来控制：
-姿态（OpenPose）
-边缘（Canny）
-深度（Depth）
-轮廓（Lineart）

2.说明：想要“可控画面”，ControlNet 是必学项。
```

### 6.2 ControlNet 的基本结构

```
原图 / 辅助图
ControlNet 模型
与 KSampler 连接
```

### 6.3 ControlNet 模型目录

```
ComfyUI/models/controlnet/
```

## 七 Embedding(文本增强)

### 7.1 Embedding 是什么？

```
1.Embedding 是：
扩展 Prompt 理解能力的小型向量

2.通常用于：
-风格词
-质量增强词
```

### 7.2 使用方式

```
直接在 Prompt 中写 embedding 名称即可。
```

### 7.3 目录位置

```
ComfyUI/models/embeddings/
```

## 八 Upscaler(放大模型)

### 8.1 Upscaler 的作用

```
1.用于：
-图像放大
-细节增强

2.常见类型：
-ESRGAN
-Real-ESRGAN
```

### 8.2 Upscaler 目录

```
ComfyUI/models/upscale_models/
```

## 九 模型来源与选择建议

### 9.1 常见来源

```
CivitAI（最常用）
HuggingFace
官方 Templates 自动下载
```

### 9.2 新手模型选择建议

```
不要一次下太多
先 1–2 个主模型
再补 LoRA
```

## 十 模型管理经验总结

### 10.1 命名规范

```
modelName_type_version.safetensors
```

### 10.2 分类清晰

```
不混放
不随意改目录
```

### 10.3 定期清理

```
不用的模型直接删
避免占满 SSD
```

