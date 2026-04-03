---
title: Ollama开发系列之——第一个本地AI(2.3)
categories:
  - AI
  - AI模型
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 4923887f
date: 2026-03-31 16:50:32
---
## 一 概述

```
本文介绍：
 -3 分钟内，让你的电脑变成一个“本地 ChatGPT”
```

<!--more-->

## 二 启动本地AI

### 2.1 启动 Ollama 服务

```
1. 启动服务
执行指令:ollama serve
注意：
-macOS / Windows 通常已自动启动
-Linux / Docker 需要手动执行

2. 验证服务是否正常
curl http://localhost:11434
如果返回内容，说明服务正常
```

### 2.2  运行第一个模型

```
1.一条命令启动 AI：ollama run gemma3

执行过程：
-自动下载模型（首次）
-加载模型
-进入聊天界面

2. 成功标志
你会看到：>>> 
这就是 AI 等你输入的提示

3. 开始聊天
>>> 你好，请介绍一下你自己
```

### 2.3 模型下载与切换

```
1. 下载模型(不运行)
ollama pull qwen3:8b

2. 查看本地模型
ollama list

3. 切换模型
ollama run qwen3:8b

4. 删除模型
ollama rm gemma3
```

### 2.4 推荐新手模型

```
1. 通用聊天
Gemma 3
轻量、速度快

2. 中文 & 编程
Qwen3
强烈推荐开发者使用

3. 推理能力
DeepSeek-R1
适合复杂问题
```

### 2.5 云模型

```
1.何时使用
如果你的电脑性能不够，可以直接用“云模型”：
ollama run qwen3-coder:480b-cloud

2.特点：
-不占本地资源
-可用超大模型（几百B参数）

3.使用建议

场景	       推荐
日常使用	本地模型
高级推理	云模型
```

## 三 编程相关

### 3.1 API 快速测试(开发者必看)

1-本地API

```
Ollama 默认提供本地 API：
http://localhost:11434
```

2-最简单请求

```
curl http://localhost:11434/api/generate -d '{
  "model": "gemma3",
  "prompt": "介绍一下 Ollama"
}'
```

3-Chat 对话接口

```
1.Chat接口：
curl http://localhost:11434/api/chat -d '{
  "model": "gemma3",
  "messages": [
    { "role": "user", "content": "你好" }
  ]
}'

2.可以实现：
-做后端 API
-接入前端
-做 AI 应用
```

### 3.2-三分钟升级：变成 AI 编程助手

```
1. 下载编码模型
ollama pull qwen3-coder:8b

2. 启动 AI 编程工具
ollama launch openclaw
启动后会自动打开浏览器界面

3. 背后的工具
OpenClaw
可以：读代码/改代码/执行命令
```

## 四 完整推荐流程

```
1. 启动服务
ollama serve

2. 下载模型
ollama pull qwen3-coder:8b

3. 运行测试
ollama run qwen3-coder:8b

4. 启动 AI 编程助手
ollama launch openclaw
```

## 五 常见问题

```
1. 模型下载很慢：
解决：配代理/换网络

2. 运行卡顿：
原因：模型太大
解决：ollama run gemma3:4b

3. 端口占用：
默认端口：11434
```

