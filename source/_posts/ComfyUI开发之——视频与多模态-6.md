---
title: ComfyUI开发之——视频与多模态(6)
categories:
  - 开发
  - Q-AI
  - ComfyUI
tags:
  - ComfyUI
abbrlink: '93828428'
date: 2026-02-07 09:10:46
---
## 一 概述

```
本文介绍一下内容：
 1.ComfyUI 视频生成架构
 2.图像->视频流程(Image to Video)
 3.多模态联动(ComfyUI 的真正上限)
```

<!--more-->

## 二 ComfyUI 视频生成架构

### 2.1 为什么视频生成比图像难？

```
1.图像生成只关心：空间一致性（Spatial）
2.而视频生成同时要保证：空间一致性 + 时间一致性（Temporal）
3.视频的本质是：Image₁ → Image₂ → Image₃ → ... → Imageₙ

4.如果每一帧都“随意生成”，就会出现：
-画面闪烁
-人脸漂移
-风格不稳定
```

### 2.2 视频 Diffusion 的基本原理(简化)

```
1.当前主流视频生成思路：
-以图像 Diffusion 为基础
-引入 时间维度（Time Axis）
-在采样过程中约束相邻帧变化

2.可以理解为：
“在 KSampler 的基础上，让模型同时考虑前后帧”
```

### 2.3 ComfyUI 中的视频生成定位

```
1.ComfyUI 本身不是“单一视频模型”，而是：视频生成工作流调度器

2.它的优势在于：
-可插拔模型（AnimateDiff、Video Diffusion）
-帧级可控
-能与 ControlNet / LoRA / Upscale 结合
```

### 2.4 帧(Frame)与时间维度的核心概念

```
1.帧数（Frames）
-决定视频长度
-帧数越多 → 显存占用越高

2.FPS（帧率）
-影响流畅度
-常见：8 / 12 / 24

3.时间一致性来源
-固定 Seed
-Temporal 模块
-帧间约束节点
```

## 三 图像->视频流程(Image to Video)

这是 目前最实用、成功率最高的视频生成方式

### 3.1 Image->Video 的基本思路

1-流程本质是

```
首帧图像
 → 在保持结构的前提下
 → 逐帧扩散变化
```

2-相比 Text to Video

|     方式      | 稳定性 |
| :-----------: | :----: |
| Text → Video  |   低   |
| Image → Video |   高   |

### 3.2 ComfyUI 中典型流程结构

```
1、简化逻辑
Load Image（首帧）
 → Video Diffusion / AnimateDiff
 → Frame Latents
 → Decode Frames
 → Video Combine

2、核心思想
-首帧决定一切
-后续帧只允许“微变化”
```

### 3.3 定性控制关键点

```
1.固定 Seed
-所有帧共用 Seed
-减少随机漂移

2.降低 Denoise
-视频中 denoise 通常 < 0.5
-防止“每帧重画”

3.控制 Motion 强度
-动作太大 → 抖动
-动作太小 → 像 GIF
```

### 3.4 风格一致性的保证方式

```
1.常用组合：
-固定 Checkpoint
-固定 LoRA
-固定 CFG
-统一 Prompt

2.进阶手段：
-ControlNet（Canny / Depth）
-帧间特征共享
```

## 四 多模态联动(ComfyUI 的真正上限)

### 4.1 Image + Audio

```
1.常见应用：
-视频自动配音
-AI 角色说话
-动画配乐

2.Workflow 思路：

Image / Video
 → Audio Generate（TTS / 音频模型）
 → 时间轴对齐
 → 合成输出

3.关键点：
-音频长度要匹配视频帧数
-注意采样率与时长
```

### 4.2 Image + LLM

```
1.这是 Agent 工作流的核心雏形。

2.常见玩法：
-LLM 生成 Prompt
-LLM 自动拆分场景
-LLM 决策参数

3.示例逻辑：
用户输入需求
 → LLM 生成 Prompt
 → Image Workflow
 → 输出结果

4.意义：
-非专业用户也能用
-AI 自动“指挥”绘画流程
```

### 4.3 Workflow 自动化(从工具到系统)

```
1.ComfyUI 真正强大的地方在于：它是一个“可编排的多模态流水线”

2.你可以做到：
-批量生成
-定时任务
-自动出图 + 出视频 + 出文案
-API 调用

3.典型自动化结构：
Input
 → LLM 决策
 → Image / Video
 → Upscale
 → Audio
 → Output
```

