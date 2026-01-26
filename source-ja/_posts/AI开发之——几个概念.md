---
title: AI开发之——几个概念
categories:
  - 开发
  - R-AI开发助手
  - 基础
tags:
  - 基础
abbrlink: 7c5fbb8e
date: 2025-12-15 10:42:02
---
## 一 概述

```
Model：大脑
Augment：外挂增强
Rules：约束与边界
Skills / Tools：能做什么
MCP：标准化“插外挂”的协议
Agentic Chat / Agent：会自己规划和执行的 AI
```

<!--more-->

## 二 概念详述

### 2.1 Model(模型)——AI 的“核心大脑”

```
1、是什么
-训练好嘅大语言模型(LLM / VLM)
-负责：理解、推理、生成

2、例子
-GPT-4 / GPT-4o / GPT-4.1
-Claude / Gemini / LLaMA / Qwen

3、特点
-不自带业务数据
-不知道你公司私有信息
-不会主动调用外部系统

Model 本身 ≠ AI 应用
```

### 2.2 Augment(增强)——给模型“外挂能力”

```
1、定义
Augment = 在 不重新训练模型 情况下，增强能力

2、常见 Augment 方式
-RAG（检索增强生成）
-Tool / Function Calling
-Memory（长期/短期记忆）
-多模态输入（图像 / 音频）

3、例子
-ChatGPT 能查文件、读代码、看图片
-企业知识库问答

4、公式
AI 能力 = Model + Augment
```

### 2.3 Rules(规则)——AI 的“行为约束系统”

```
1、是什么
-对模型行为的硬约束 / 软约束
-通常通过 System Prompt / Policy / Guardrails 实现

2、规则类型
-安全规则（不能输出违法内容）
-风格规则（必须用粤语 / 日语）
-业务规则（只能回答某领域）

3、例子
- 你是一个 Android 面试官
- 不允许编造数据
- 回答必须分点

Rules 决定 AI “能不能这样做”
```

### 2.4 Skills(技能)——AI “会做什么事”

1、概念

```
1、是什么
-AI 可调用的具体能力模块
-通常是一个函数 / API / 工具

2、例子
-搜索网页
-查询数据库
-生成代码
-调用支付 / 工单 / CI 系统
```

2、在不同体系中叫法

|   平台    |       叫法        |
| :-------: | :---------------: |
|  OpenAI   | Tools / Functions |
| LangChain |       Tools       |
|  AutoGPT  |      Skills       |
|  Copilot  |      Plugins      |

3、一句话

Skill = 可执行动作

### 2.5  MCP(Model Context Protocol)——“外挂标准接口” 

```
1、是什么
MCP 是一个标准协议，让 AI 安全、统一地接入外部能力

2、解决的问题
-不同模型 / Agent
-不同工具 / 数据源
-不同安全策略

3、用 MCP 可以做到：
-一次定义，多模型复用
-本地 / 云端工具统一接入
-AI 可发现、可调用、可控

4、你可以理解为
AI 世界的 USB-C / HTTP 协议
```

### 2.6 Agentic Chat(代理式对话)——“会自己做事的 AI”

```
1、普通 Chat
用户问 → AI 回答 → 结束

2、Agentic Chat
目标 → 拆任务 → 调工具 → 反思 → 继续 → 完成

3、关键能力
-Planning（规划）
-Tool Use（用工具）
-Memory（记忆）
-Self-Reflection（反思）

4、例子
-自动修 Bug
-自动生成项目
-自动部署 + 测试

5、一句话：
Agentic Chat = 有“行动力”的 AI
```

### 2.7 Agent(智能体)——AI 的“执行体”

```
1、是什么
一个 Agent = Model + Rules + Skills + Memory + Planner

2、特征
-有目标（Goal）
-会拆任务
-会调用工具
-会判断结果

3、类型
-单 Agent（一个人做完）
-Multi-Agent（角色协作）

4、例子
-产品经理 Agent
-架构师 Agent
-测试 Agent
```

## 三 对比表

|     概念     |   核心作用   |    类比    |
| :----------: | :----------: | :--------: |
|    Model     |   推理生成   |    大脑    |
|   Augment    |   能力增强   |    外挂    |
|    Rules     |   行为限制   |    法律    |
|    Skills    |  可执行动作  |    手脚    |
|     MCP      | 能力接口标准 | USB / HTTP |
| Agentic Chat | 自主执行对话 |  项目模式  |
|    Agent     |  完整执行体  |    员工    |

## 四 一句话总结

```
Model 决定 AI 有多聪明，
Augment 决定 AI 有多能干，
Rules 决定 AI 是否可控，
Skills 决定 AI 能做什么，
MCP 决定 AI 能不能规模化接入现实世界，
而 Agent 则让 AI 从“聊天工具”进化成“执行者”。
```

