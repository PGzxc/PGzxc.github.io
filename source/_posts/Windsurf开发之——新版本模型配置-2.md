---
title: Windsurf开发之——新版本模型配置(2)
categories:
  - AI
  - AI开发
  - AI开发工具
  - Windsurf
tags:
  - Windsurf
abbrlink: 9a806ca2
date: 2026-04-05 09:57:18
---
## 一 概述

```
本文介绍：
 -新版 Windsurf = 官方模型为主 + BYOK + MCP
 -不再支持直接填 Base URL / Ollama
```

<!--more-->

## 二 为什么你看不到自定义模型？

### 2.1 新版结构已经变成

```
Windsurf
   ↓
官方模型服务（内置）
   ↓
BYOK / MCP（有限开放）
```

### 2.2 直接影响

```
1.不再支持：
-Base URL（OpenAI-Compatible）
-直接接 Ollama

2.然支持：
-BYOK（自带 Key，如 Claude / GPT）
-MCP（高级自定义接入）
```

## 三 模型接入方案(按推荐顺序)

### 3.1 方案一：内置模型 + BYOK(最推荐)

```
1.说明：
最简单、最稳定

2.操作步骤
2.1 打开 Cascade 聊天窗口
2.2 点击模型下拉
2.3 选择带 BYOK 的模型（如 Claude）
2.4配置 Key

进入：https://docs.windsurf.com/windsurf/models
官方文档中的 Provider API Keys 页面，
填写：Anthropic Key（Claude）或 OpenAI Key

3.优点：稳定/简单/官方支持
4.缺点：不能用本地模型/有费用（取决于你的 Key）
```

### 3.2 方案二：MCP 接入(高级玩法)

```
1.MCP 是什么？
Model Context Protocol（模型桥接协议）

2.作用：
Windsurf
   ↓
MCP Server
   ↓
Ollama / New API / vLLM

3.实现思路

-启动一个 MCP Server（本地或远程）
-在 Windsurf 开启 MCP
-让 AI 通过 MCP 调用你的模型

4.特点
-更灵活（可接任何模型）
-比 Base URL 更高级
-但配置复杂

5.一句话总结：
旧方式：直接填 API  
新方式：通过 MCP 转发
```

### 3.3 方案三：降级旧版本(不推荐长期用)

```
1.如果你必须要：
-Base URL
-Ollama 直连

2.做法
卸载当前版本
安装旧版（1.8x / 1.9 早期）

3.风险
-无新功能
-可能不安全
-未来不兼容
```

### 3.4 方案四：换工具(现实最优)

```
一、核心需求是：
-本地模型
-多模型切换
-New API

二、推荐：
2.1 Continue（强烈推荐）
-支持 Ollama / New API
-完全可控

2.2 Cursor
-支持部分自定义 API

3.总结：
-Windsurf → 封闭但体验好  
-Continue → 开放且可控
```

## 四 最佳组合

### 4.1 当前环境

```
-Ollama
-New API
-cc switch
```

### 4.2 推荐方案

```
Continue（主力开发）
   ↓
Ollama / New API

Windsurf（辅助）
   ↓
BYOK 模型（Claude / GPT）

这样用最爽：
 -日常开发 → Continue + 本地模型
 -复杂任务 → Windsurf Agent（BYOK）
```

## 五 如何判断你当前版本？

### 5.1 新版(受限)

```
只有官方模型
无 Base URL
有 BYOK
```

### 5.2 老版(开放)

```
有 Base URL
有 Custom Provider
```


