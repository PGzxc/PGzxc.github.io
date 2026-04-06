---
title: AI知识图谱知识点之——AI模型生态(4)
categories:
  - AI
  - AI图谱
  - AI知识点
tags:
  - AI知识点
abbrlink: 14e45fab
date: 2026-04-06 21:44:51
---
## 一 概述

```
本文介绍：
1.国外模型
2.国内模型
3.开源模型
```

<!--more-->

## 二 国外模型

### 2.1 OpenAI(3 月最新)

```
1.GPT-4o：稳定多模态，日常主力
2.GPT-5 系列(3月5日发布，最新 GPT-5.4)
 -GPT-5.4：
  --旗舰，1M 上下文、原生 Computer Use、Thinking 模式
  --中途可打断、可引导（steerable thinking）
  --电脑操作 OSWorld 75% > 人类 72.4%
 -GPT-5.4 Pro：专业顶配，推理 / 代码 / Agent 最强OpenAI
 -GPT-5.4 mini /nano（3 月 17 日新出）
  --mini：性能接近满血，速度 ×2，低延迟
  --nano：超轻量、低成本，基础任务
3.o1 / o3 / o3-pro：推理专用系列（长思考链）
4.Codex：历史，已并入 GPT-5.4/Codex 分支
```

### 2.2 Anthropic(Claude 4 系列)

```
1.Claude 4.6（2 月发布，3 月 13 日正式 1M 上下文 GA）
 -Opus 4.6：旗舰，1M token、幻觉率 2.9%（全球最低）
 -Sonnet 4.6：主力，1M token、速度快、价格减半
 -Haiku 4.x：轻量、极速、低成本
 
2.核心：超长上下文无损召回、企业级安全、低幻觉
```

### 2.3 Google(Gemini 3 系列)

```
1.Gemini 3.1 Pro（2 月 19 日）：当前最强，推理 / 多模态 / 代码顶尖
2.Gemini 3.1 Flash：平衡速度与性能
3.Gemini 3.1 Flash-Lite（3 月 3 日）：
 -最快、性价比最高
 -响应 ×2.5，输出速度 +45%，1M 上下文
 -价格极低：输入 $0.25 / 百万 token
```

### 2.4 Meta(Llama 4 系列)

```
1.Llama 4（3 月 12 日发布，部分延期至 5 月）
 -Llama 4 Scout：10M 上下文（行业第一）、MoE
 -Llama 4 Maverick：400B 总参 / 17B 激活，通用强
 -Llama 4 Behemoth：2 万亿参（未完全发布）
 
2.定位：开源最强、超长上下文、低成本推理
```

## 三 中国模型

```
1.DeepSeek
-V3.2/R1(代码/性价比之王)
-V4(4月即将发布)

2.Qwen(通义千问)
-Qwen 3 / Qwen 3.5（MoE，256K+ 上下文）

3.GLM
-GLM-4.7 / GLM-5（MoE，长上下文）

4.Kimi(月之暗面)
-Kimi K2 / Kimi K2.5（多模态、长文本）

5.Baichuan/Yi：稳定商用、企业级
6.MiniMax：M2.1 / M2.5 / M2.7（3 月 18 日，自进化模型）36氪
7.Moonshot：长文本、多模态
8.文心 5.0（百度）：128K 上下文、多模态
9.混元 3.0（腾讯，4 月发布）36氪
```

## 四 开源模型(2026.3 主流)

```
1.Mistral / Mixtral：欧洲标杆、高效 MoE
2.Phi（微软）：小参数强性能、端侧友好
3.Falcon：开源老牌、稳定
4.RWKV：RNN 架构、低显存、超长上下文
5.Llama 4 系列（开源版）
6.Qwen 3.5 系列（开源小模型：0.8B/2B/4B/9B）
7.DeepSeek 系列
8.Nemotron 3（NVIDIA，3 月 GTC 发布）
9.Nemotron 3 Super / Ultra：硬件深度优化、企业级
10.Step 3.5 Flash（阶跃星辰）：全球调用量最高开源
11.Yuan 3.0 Ultra（浪潮）：万亿级 MoE 开源
```

## 五 一句话定位

```
1.OpenAI：全能最强、Agent/Computer Use 领先
2.Anthropic：超长上下文、低幻觉、企业安全首选
3.Google：多模态 + 速度 + 性价比均衡
4.Meta：开源天花板、10M 上下文王者
5.中国模型：性价比极高、长文本强、本地化好
6.开源：Llama 4、Qwen 3.5、DeepSeek、Nemotron 三足鼎立
```

