---
title: AI图谱系列之——AI网关层之Proxy(10.1)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 1cc9dd50
date: 2026-04-07 20:40:25
---
## 一 概述

```
本文介绍：
 -AI网关层之Proxy
```

<!--more-->

## 二 API Proxy(统一接入层)

### 3.1 代表方案

```
-OpenAI API
-Claude API
-DeepSeek API
-Qwen API
```

### 3.2 核心作用

```
屏蔽差异 → 统一接口调用
```

### 3.3  解决问题

```
各厂商 API 不统一（参数/返回结构不同）
模型切换成本高
业务代码耦合严重
```

### 3.4 实际工程做法

```
1.实际工程做法:
客户端
   ↓
API Gateway（统一封装）
   ↓
不同模型（GPT / Claude / DeepSeek / Qwen）

2.常见实现
-封装统一 SDK（推荐）
-或直接做 HTTP Proxy（中转）
```


