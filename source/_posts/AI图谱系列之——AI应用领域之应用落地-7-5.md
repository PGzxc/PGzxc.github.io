---
title: AI图谱系列之——AI应用领域之应用落地(7.5)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 820079bc
date: 2026-04-07 19:43:38
---
## 一 概述

```
本文介绍：
 -做一个 AI短视频系统怎么设计？
 -AI应用如何选技术？
```

<!--more-->

## 三 应用落地

### 3.1 做一个 AI短视频系统怎么设计？

```
1.系统设计
User Input(脚本)
 ↓
LLM(生成文案)
 ↓
Image/Video Model(生成画面)
 ↓
TTS(生成配音)
 ↓
剪辑(自动拼接)
 ↓
输出视频

2.技术组合：
-GPT / Claude
-Kling / Sora
-ElevenLabs
```

### 3.2 AI应用如何选技术？

```
1.看需求
-图像 → SD / Flux
-视频 → Kling / Sora
-语音 → ElevenLabs

2.看成本
-开源 → Flux / SD
-商业 → Midjourney

3.看部署
-本地 → SD / Flux
-云 → OpenAI / Google
```

