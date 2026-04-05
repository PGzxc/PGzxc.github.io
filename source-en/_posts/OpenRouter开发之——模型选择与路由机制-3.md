---
title: OpenRouter开发之——模型选择与路由机制(3)
categories:
  - AI
  - AI模型
  - 聚合平台
  - OpenRouter
tags:
  - OpenRouter
abbrlink: 5b41a1e1
date: 2026-04-05 21:06:45
---
## 一 概述

```
本文介绍：
 - 模型命名规则
 - 自动路由能力
 - 在线搜索增强
```

<!--more-->

## 二 模型选择与路由机制

### 2.1 模型命名规则

```
1.模型命名规则：
openrouter/<provider>/<model>

2.例如：
 -openrouter/anthropic/claude-3.5-sonnet
 -openrouter/openai/gpt-4o
 -openrouter/meta/llama-3-70b
```

### 2.2 动路由能力(核心)

```
1.OpenRouter 支持：
 -按价格选
 -按性能选
 -自动 fallback
 - 多 provider 同模型

2.同一个模型，不同供应商：
 -更便宜
 -更快
 -更稳定
```

### 2.3 在线搜索增强(官方)

```
1.开启方式：
:model:online

2.例如：
gpt-4o:online

自动接入实时搜索数据
```

