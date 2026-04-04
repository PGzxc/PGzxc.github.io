---
title: Continue教程之——IDE插件安装与配置(2)
categories:
  - AI
  - AI开发
  - AI编程助手
  - Continue
tags:
  - Continue
abbrlink: 944161bb
date: 2026-04-04 19:25:40
---
## 一 概述

```
本文介绍：
 -5 分钟在 VSCode / JetBrains 用上 Continue
 -安装 Continue 插件
 -登录 / 配置
 -接入模型（重点）
 -示例：接入 Ollama/接入 OpenAI / Claude / Gemini
```

<!--more-->

## 二 Continue安装及介绍

### 2.1 安装 Continue 插件

```
1、VS Code 安装
在 VS Code 插件市场搜索：Continue
或访问官方文档(IDE 扩展)：Continue IDE Extensions

2、JetBrains 安装(可选)

支持：
- IntelliJ IDEA
- Android Studio

插件市场同样搜索：Continue
```

### 2.2 安装完成后的界面说明

```
1、安装后你会看到：
左侧边栏 ——> Continue 面板

2、核心功能：
-  Chat（对话）
-  Edit（代码修改）
-  Context（上下文管理）
```

## 三 配置模型

Continue 默认是没有模型的，需要你自己接入


### 3.1 方案一：接入本地模型(推荐)—使用Ollama

1-启动 Ollama

```
1、已经有模型：
qwen3:8b
qwen2.5:7b
llama3:8b

2、启动服务：
ollama serve

3、默认地址：
http://localhost:11434
```

2-配置 Continue

```
1、打开 VS Code(或C:\Users\用户名\.continue\config.ts)：
Ctrl + Shift + P—> Continue: Open Config

2、编辑配置文件：
{
  models: [
      {
        title: "Llama3 8B (Local)",
        model: "llama3:8b",
        apiBase: "http://127.0.0.1:11434",
        provider: "ollama",
      },
      {
        title: "Qwen3 (Local)",
        model: "qwen3:latest",
        apiBase: "http://127.0.0.1:11434",
        provider: "ollama",
      }
    ],
    tabAutocompleteModel: {
      title: "Llama3 8B (Local)",
      model: "llama3:8b",
      apiBase: "http://127.0.0.1:11434",
      provider: "ollama",
    },
}
```

3-测试

```
在 Continue 面板输入：
帮我写一个快速排序

成功 = 本地 AI 已接入 
```

4-本地模型优化

```
1、建议(推荐模型)：
qwen2.5:7b   平衡性能
qwen3:8b     更强
llama3:8b    通用

2、如果卡顿
降低模型尺寸（4B / 7B）
```

### 3.2 方案二：接入云模型

1-接入 OpenAI

```
{
  "models": [
    {
      "title": "GPT",
      "provider": "openai",
      "model": "gpt-4o-mini",
      "apiKey": "你的key"
    }
  ]
}
```

2-接入 Anthropic（Claude）

```
{
  "models": [
    {
      "title": "Claude",
      "provider": "anthropic",
      "model": "claude-3-5-sonnet",
      "apiKey": "你的key"
    }
  ]
}
```

3-接入 Google DeepMind（Gemini）

```
{
  "models": [
    {
      "title": "Gemini",
      "provider": "gemini",
      "model": "gemini-pro",
      "apiKey": "你的key"
    }
  ]
}
```

## 四 优化

### 4.1 统一网关(New API / CC Switch)

1-Continue 只连一个入口

```
{
  "models": [
    {
      "title": "统一网关",
      "provider": "openai",
      "model": "gpt-4o-mini",
      "apiBase": "http://localhost:3000/v1",
      "apiKey": "sk-xxx"
    }
  ]
}
```

2-后端交给

```
- Ollama（本地）
- Claude
- GPT
- Gemini

由 CC Switch / New API 统一切换
```

3-优势

```
-IDE 无需改配置
-一键切换模型
-成本可控
-支持本地 + 云混合
```

### 4.2 多模型同时配置—在 Continue UI 可直接切换模型

```
{
  "models": [
    {
      "title": "本地 Qwen",
      "provider": "ollama",
      "model": "qwen3:8b"
    },
    {
      "title": "GPT",
      "provider": "openai",
      "model": "gpt-4o-mini",
      "apiKey": "xxx"
    }
  ]
}
```

## 五 常见问题

### 5.1 问题1：连接不上 Ollama

```
检查：curl http://localhost:11434
```

### 5.2 问题2：请求失败

```
检查：
- 防火墙
- 端口
- 模型是否存在
```

### 5.3 问题3：响应很慢

```
原因：模型太大 / CPU 跑
解决：用 4B / 7B 模型
```

## 六 实战演示

```
1.示例-生成 Android 代码
帮我写一个 Jetpack Compose 登录页面

2.示例-优化代码
优化这个函数的性能

3-示例-解释项目
解释这个项目结构
```

