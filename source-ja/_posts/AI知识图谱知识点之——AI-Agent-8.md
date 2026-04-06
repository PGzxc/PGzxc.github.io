---
title: AI知识图谱知识点之——AI Agent(8)
categories:
  - AI
  - AI图谱
  - AI知识点
tags:
  - AI知识点
abbrlink: b7851ecf
date: 2026-04-06 21:46:50
---
## 一 概述

```
本文介绍：
1.Agent核心能力
2.Agent结构
3.Agent工具
4.Agent协议
5.Computer Use
```

<!--more-->

## 二 AI Agent(2026 核心智能体)

### 2.1 Agent 核心能力

```
Agent = 能自主思考、规划、执行、反思的智能体

1.Agent：智能体本体
2.Planning：规划任务、拆步骤
3.Reflection：反思、纠错、自我改进
4.Memory：长期 / 短期记忆（向量记忆、情景记忆）
5.Tool Use：调用工具（搜索、代码、画图、数据库）
6.Multi-Agent Coordination：多代理协作、团队作业
7.Decision Making：复杂决策、判断
8.State Management：状态管理、任务进度保存
```


### 2.2 Agent 结构(标准架构)

```
1.Agent结构
用户请求
   ↓
Agent（接收、理解）
   ↓
Planning（拆解目标、制定计划）
   ↓
Workflow（执行流程、分支、循环）
   ↓
Skill / SubAgent（调用能力 / 子代理）
   ↓
执行（工具、搜索、代码、操作）
   ↓
返回结果

2.关键词
-Workflow：任务执行流（LangGraph 核心）
-Skill：工具封装好的能力
-SubAgent：子任务专家代理
```

### 2.3 Agent 工具

```
1.Manus：企业级多 Agent 平台
2.AutoGPT / BabyAGI：早期经典自主 Agent，现在多被 LangGraph、CrewAI、OpenAI Swarm 替代
```

### 2.4 Agent 协议(2026 最重要)

```
1.Model Context Protocol（MCP）
-Anthropic 主导，Linux 基金会托管
-2026 Agent 事实标准协议
-统一模型与工具、系统、外部服务的通信

2.OpenClaw
-GitHub 星数第一、最火开源 Agent
-支持多模型、本地运行、多平台接入
-注意：企业使用要做安全沙箱、权限控制
```

### 2.5 Computer Use(AI 操作电脑)

```
2026 最强杀手级能力

1.Claude Computer Use（Claude 4.6）
-成熟、稳定、企业可用
2.OpenAI Computer Use（GPT-5.4）
-原生支持，鼠标键盘屏幕全自动化

意义：Agent 真正能像人一样操作电脑，完成全流程自动化。
```

## 三 总结

### 3.1 一句话总结

```
1.Agent = 规划 + 记忆 + 工具 + 反思 + 协作
2.Computer Use = AI 直接用电脑
3.MCP = 2026 Agent 统一协议
4.LangGraph = 多 Agent 工作流事实标准
```

