---
title: Harness-Engineering开发之——实战指南(1)
categories:
  - AI
  - AI开发
  - AI Agent
  - Harness-Engineering
tags:
  - Harness-Engineering
abbrlink: c6edef98
date: 2026-05-12 19:17:14
---
## 一 概述

```
本文介绍：
 - 基于一篇微信博客：Harness Engineering：耗时一周，我是如何将应用的AI Coding率提升至90%的
 - 什么是 Harness Engineering？
 - 基于 Harness Engineering 项目中如何快速落地
```

<!--more-->

## 二 什么是 Harness Engineering？

### 2.1 Harness介绍及发展

```
Harness Engineering(驾驭工程)是Prompt Engineering → Context Engineering 的升级版。

-Prompt：写好一次提问
-Context：给 Agent 塞正确资料
-Harness：设计一套完整系统，让 Agent 能可靠地完成复杂项目
```

### 2.2 核心理念

```
Agent 容易犯错，就用工程手段（规则、流程、评审、记忆）让它“永远不再犯同一类错误”。
```

### 2.3 实战价值

```
在 10 万行+ 的企业级 Java 项目中，可将 AI 代码贡献率从 ~25% 提升到 90%+，且质量可控。
```

## 三 项目中如何快速落地

### 3.1 在项目根目录创建 .harness/ 文件夹

```
这是整个体系的“大脑”，推荐包含以下 4 类文件：

-Rules/：不变的硬规则（编码规范、分层架构、字段定义等）
-Skills/：标准化 SOP（技能包）
-Wiki/：业务知识（链路、数据模型、字典）
-Agents/：Agent 角色定义
-Changes/：每个需求建一个子文件夹，记录全过程
```

### 3.2 定义核心 Agent(最重要)

```
创建一个 ApplicationOwner.md（约 300-500 字），放在 .harness/agents/ 下。

必须写清楚的内容：
-角色定位（你是这个应用的总负责人）
-项目技术栈和架构约束
-10 阶段工作流（见下文）
-沟通原则和硬性禁止事项
```

### 3.3 搭建 10-Stage Pipeline(核心流程)

```
一、每次需求都严格走这个流程（可简化但不要跳）：

1.需求分析
2.需求评审
3.编码实现
4.编码评审
5.单元测试编写
6.单元测试评审
7.代码推送
8.CI 验证
9.部署验证
10.用户确认


二、每个阶段要点：
-明确“进入条件”和“退出标准”
-重要阶段使用 不同 Agent 评审（编码 Agent ≠ 评审 Agent）
-保留 Human-in-the-Loop（人在关键点把关）
```

### 3.4 构建关键 Skills(实用模板)

```
重点先做 3 个：
-coding-skill：分层规范（Controller/Service/Domain/DAO 分别怎么写）
-expert-reviewer：评审模板（问题 + 建议 + 优先级）
-unit-test-write：根据变更自动写测试用例

把历史踩过的坑写成规则，放入 Rules 中。
```

## 四 实战操作技巧

```
先 Dry Run：拿一个虚拟小需求走完整流程，调通模板和门禁后再正式用。
上下文分层：常驻只放 Rules + Agent 定义（控制在 40% 以内），其他按阶段动态加载。
变更管理：每个需求建文件夹，放 summary.md + 各阶段输出，永不删除历史。
质量门禁：CI 必须通过 + 测试覆盖 + 评审通过，Agent 才能标记完成。
工具结合：Cursor / Claude / Windsurf 等都可，重点是用 .harness/ 目录作为系统提示源。
```

## 五 预期效果(真实数据参考)

```
项目维度 AI 代码率：25% → 90%+
返工大幅减少，过程全 traceable
.harness/ 同时成为团队知识库，新人也能快速上手
```

## 六 上手建议

```
从小模块或新项目开始做 .harness/，先跑通 5-10 个需求后再全面推广。
重点花精力在规则沉淀和流程一致性上，而不是追求完美。
```

## 七 参考

* [Harness Engineering：耗时一周，我是如何将应用的AI Coding率提升至90%的](https://mp.weixin.qq.com/s/rlIyIIZOXFObNIXbPI7gDg)
* [Github写小说Harness-novel-harness](https://github.com/manhai934/novel-harness)

