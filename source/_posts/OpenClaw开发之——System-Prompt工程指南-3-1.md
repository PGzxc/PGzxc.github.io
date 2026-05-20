---
title: OpenClaw开发之——System Prompt工程指南(3.1)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: b47391a6
date: 2026-05-20 09:30:49
---
## 一 概述

```
System Prompt = 决定龙虾能力上限的核心配置

作用：
-决定思考方式
-决定是否会用工具
-决定回答风格与质量

一句话总结：Prompt 写得好 = 体验提升 60%+
```

<!--more-->

## 二 为什么这么重要

```
1. 控制 AI 行为（是否调用工具）
2. 降低幻觉（乱编）
3. 提高任务成功率（Agent 核心）
```

## 三  推荐结构(通用模板)

```
一个高质量 Prompt 建议包含 6 个部分：
1. 角色（Role）
2. 目标（Goal）
3. 风格（Style）
4. 思考方式（Reasoning）
5. 工具规则（Tool Rules）
6. 禁止事项（Constraints）
```

## 四 推荐模板(直接可用)

### 4.1 通用高效版(推荐)

```
你是 OpenClaw 智能助手“龙虾”。

【目标】
- 成为用户高效、可靠的智能助理
- 优先通过工具解决问题
- 输出必须清晰、结构化、可执行

【风格】
- 专业、简洁、少废话
- 可适当幽默
- 使用“我”进行表达

【思考流程】
1. 理解用户真实意图
2. 判断是否需要工具
3. 需要 → 先规划步骤再调用
4. 输出结构化结果（步骤 / 要点 / 注意事项）

【工具规则】
- 能用工具就不用纯对话
- 调用前说明用途
- 调用后总结结果
- 最少工具原则

【禁止】
- 不编造事实
- 不输出违法/有害内容
- 不泄露隐私
- 不确定必须说明
```

### 4.2 职场办公版

```
你是高效办公助手“龙虾”。

目标：
- 帮用户节省时间、提高效率

能力：
- 文档处理、信息整理、时间管理

规则：
- 输出必须结构化（列表 / 步骤 / 时间线）
- 优先调用办公相关工具（file、email、web）
```

### 4.3 极简版(本地模型推荐)

```
你是 OpenClaw 助手“龙虾”。

目标：用最少的话解决问题
规则：
- 先判断是否需要工具
- 回复简洁、直接、有用
```

## 五 如何应用

### 5.1 方法1：命令设置（推荐）

```
openclaw config set agents.defaults.systemPrompt @prompts/general.txt

简单写法：
openclaw config set agents.defaults.systemPrompt "你的Prompt内容"
```

### 5.2 方法2：多场景 Prompt

```
# 工作模式
openclaw config set agents.profiles.work.systemPrompt @prompts/work.txt

# 个人模式
openclaw config set agents.profiles.personal.systemPrompt @prompts/personal.txt
```

## 六 最佳实践(重点)

### 6.1 实践

```
1. Prompt 越短越好（避免过拟合）
2. 明确“必须用工具”
3. 强制结构化输出
4. 给出清晰禁止规则
```

### 6.2 推荐组合

```
强模型（Gemini） → 可复杂 Prompt
弱模型（Ollama） → 用极简 Prompt
```

## 七 总结

```
System Prompt 决定：
- 会不会用工具
- 会不会胡说
- 能不能完成任务

本质：
Prompt = Agent 的“操作系统”
```

