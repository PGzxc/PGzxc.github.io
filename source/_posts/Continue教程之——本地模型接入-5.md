---
title: Continue教程之——本地模型接入(5)
categories:
  - AI
  - AI开发
  - AI编程助手
  - Continue
tags:
  - Continue
abbrlink: 57f8d303
date: 2026-04-04 19:28:07
---
## 一 概述

```
本文介绍：
 -Ollama + Continue 打造离线 AI 编程助手
 -安装 Ollama
 -模型推荐：qwen/llama3
 -Continue 配置
 -性能优化（GPU / 内存）
```

<!--more-->

## 二 为什么要用本地模型？

### 2.1 很多人用 AI 编程工具会遇到问题

```
API 太贵
网络不稳定
代码隐私风险
访问受限（Claude / GPT）
```

### 2.2 解决方案

```
本地模型 + Continue
```

### 2.3 核心组合

```
- 模型运行：Ollama
- AI 工具：Continue
```

### 2.4 最终效果

```
完全离线 AI 编程助手
```

## 三 接入流程

### 3.1 环境准备

```
1.安装 Ollama：官网下载安装
2.启动服务：ollama serve
默认地址：http://localhost:11434
3.下载模型（推荐组合）
 ollama pull qwen2.5:7b //日常开发+速度快
 ollama pull qwen3:8b //复杂逻辑+更智能
 ollama pull llama3:8b //通用+稳定
```

### 3.2 Continue 接入 Ollama

```
1-配置文件
{
  "models": [
    {
      "title": "Qwen 本地",
      "provider": "ollama",
      "model": "qwen3:8b"
    }
  ]
}

2-测试
帮我写一个接口限流中间件
```

## 四 进阶

### 4.1 多模型切换

```
1-配置多个模型：
{
  "models": [
    {
      "title": "轻量模型",
      "provider": "ollama",
      "model": "qwen2.5:7b"
    },
    {
      "title": "高质量模型",
      "provider": "ollama",
      "model": "qwen3:8b"
    }
  ]
}

2-使用策略：
简单任务 → 7B
复杂任务 → 8B
```

### 4.2 性能优化

1-硬件建议

| 配置 |     建议     |
| :--: | :----------: |
| CPU  |    ≥ 8核     |
| 内存 |    ≥ 16GB    |
| GPU  | 可选（更快） |

2-提速技巧

```
1.使用小模型

qwen2.5:7b > 8b > 14b

2.限制上下文

Continue 中避免：
一次性加载整个项目

3. 使用量化模型（如 Q4）
ollama pull qwen2.5:7b-q4
```

3-并发优化

```
多模型同时运行：
一个模型用于 chat
一个用于 checks
```

## 五 离线开发完整架构

### 5.1 架构图

```
Continue（IDE / CLI）
        ↓
Ollama（本地模型）
        ↓
     本地推理
```

### 5.2 进阶架构

```
Continue
   ↓
New API（统一入口）
   ↓
Ollama + GPT + Claude


优势：
-本地优先
-云模型兜底
-自动切换
```

## 实战及问题

### 6.1 离线开发实战

```
场景 1：写代码
帮我写一个缓存系统（LRU）

场景 2：读项目
解释这个项目结构

场景 3：重构代码
优化这个类的设计

场景 4：写测试
为这个模块补充单元测试
```

### 6.2 常见问题

```
1.模型很慢
原因：CPU 跑大模型
解决：换 7B / 4B

2.回答质量差
解决：换 qwen3 / llama3

3.内存爆炸
解决：使用 q4 量化模型
```

### 6.3 最佳方案

```
1.现在有：
- Ollama 
- 多模型 
- CC Switch 
- New API 

2.推荐终极方案：
Continue
   ↓
CC Switch
   ↓
New API
   ↓
Ollama（本地） + GPT + Claude

3.策略：

80% 请求 → 本地模型
20% 高质量 → 云模型
```

## 七 本篇总结

```
1-本地 AI 的核心价值
可控 + 低成本 + 高隐私

2-Continue + Ollama 的组合可以做到：
-完全离线开发
-无限调用
-无需翻墙
-企业可落地
```

