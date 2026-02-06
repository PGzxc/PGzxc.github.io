---
title: ComfyUI开发之——进阶控制(5)
categories:
  - 开发
  - Q-AI
  - ComfyUI
tags:
  - ComfyUI
abbrlink: bd6cb003
date: 2026-02-06 07:48:44
---
## 一 概述

```
本文介绍一下内容：
 1.LoRA 使用与组合技巧
 2.ControlNet 全解析
 3.Inpainting/Outpainting(局部控制)
```

<!--more-->

## 二 LoRA 使用与组合技巧

### 2.1 LoRA 是什么？为什么它这么重要？

```
1.一句话理解：
LoRA = 给大模型“外挂的小技能包”

2.它不是完整模型，而是：
-针对某个风格 / 人物 / 服装 / 画风
-只训练很少的参数
-叠加在 Checkpoint 上使用

3.优点：
-体积小（几十 MB）
-切换快
-可叠加
-可精细控制
```

### 2.2 LoRA 的工作原理(简化版)

```
1.Stable Diffusion 原模型：
基础能力（通用绘画）

2.LoRA 做的事：
-在不改动原模型的前提下
-对特定层进行“偏移修正”

3.所以效果是：
-基础模型 + LoRA = 新风格
-LoRA 本身不能单独用
```

### 2.3 ComfyUI 中如何使用 LoRA？

```
1.核心节点
Load LoRA

2.连接方式（非常关键）：
Checkpoint
   ↓
Load LoRA
   ↓
CLIP / Model

3.注意：
-LoRA 同时影响 Model 和 CLIP
-不要只连一半
```

### 2.4 多 LoRA 叠加技巧

```
1.ComfyUI 天生支持 LoRA 串联：

 → LoRA A
 → LoRA B
 → LoRA C

2.常见组合方式
人物 LoRA + 画风 LoRA
服装 LoRA + 表情 LoRA
写实 LoRA + 光影 LoRA
```

### 2.5 权重控制(决定成败)

1-LoRA 权重一般范围

```
0.3 ~ 1.2
```

2-经验值

|   场景   |   权重    |
| :------: | :-------: |
| 风格微调 | 0.3 ~ 0.6 |
| 明显特征 | 0.7 ~ 0.9 |
|  强风格  | 1.0 ~ 1.2 |

3-权重过高常见问题

```
脸崩
画面脏
风格过拟合

多个 LoRA 时，单个权重要适当降低
```

## 三 ControlNet 全解析

### 3.1 ControlNet 的本质

```
1.一句话：
用“结构信息”强制约束生成结果

2.它不关心“画得漂不漂亮”，只关心：
-姿势对不对
-轮廓像不像
-深度合不合理
```

### 3.2  ControlNet 基本结构

```
1.典型流程：
 → ControlNet Preprocessor
 → ControlNet Model
 → KSampler

2.关键点：
ControlNet 不是单独生成
它是 影响 KSampler 的去噪过程
```

### 3.3 常用 ControlNet 类型详解

1- Canny(边缘)

```
提取轮廓线
保持构图与外形

2.适合：
-建筑
-产品
-结构明确的物体

3.提示：
-Prompt 不要太冲突
-否则容易“拉扯”
```

2-OpenPose(姿态)

```
人体骨骼
动作锁定

2.适合：
-人物站姿 / 动作
-跳舞 / 运动
-角色一致性

3.说明：人像 AI 必学 ControlNet
```

3-Depth(深度)

```
近大远小
空间关系

2.适合：
-写实摄影
-场景图
-室内 / 室外
```

### 3.4 不同场景如何选 ControlNet？

| 场景 |        推荐        |
| :--: | :----------------: |
| 人像 |  OpenPose + Depth  |
| 建筑 |   Canny + Depth    |
| 产品 |       Canny        |
| 插画 | Lineart / SoftEdge |

### 3.5 多 ControlNet 协同

```
1.ComfyUI 支持：多个 ControlNet 同时作用

2.示例：
-OpenPose：控制动作
-Depth：控制空间
-Canny：控制轮廓

3.关键技巧：
-每个 ControlNet 都要调权重
-不要全部拉满

4.推荐权重区间：0.5 ~ 1.0
```

## 四 Inpainting / Outpainting

### 4.1 Inpainting(局部重绘)原理

```
1.一句话：只让模型“重画你指定的区域”

2.核心要素：
-原图
-蒙版（Mask）
-去噪强度
```

### 4.2 蒙版技巧

```
1.白色 / 黑色规则
-白色：重绘
-黑色：保留

2.常见错误：
-画反了
-边缘太硬
```

### 4.3 Inpainting 常用参数建议

|  场景  |  Denoise  |
| :----: | :-------: |
|  修脸  | 0.2 ~ 0.4 |
| 改衣服 | 0.4 ~ 0.6 |
|  大改  | 0.6 ~ 0.8 |

2-修脸时

```
Denoise 宁低不高
Prompt 精确
```

### 4.4 Outpainting(画面扩展)

```
1.Outpainting =
在画面外继续生成内容

2.常见用途：
-横图变竖图
-补背景
-海报扩展

3.技巧：
-新区域 Prompt 要“弱引导”
-避免喧宾夺主
```

### 4.5 常见坑点汇总

```
1.重绘区域风格不一致:CFG 太高 / LoRA 过强
2.接缝明显:蒙版边缘不柔和
3.修脸越修越怪: Denoise 太高 + 多次叠加
```

