---
title: Ollama实战之——Ollama+Agent打造自动化本地AI系统(3.5)
categories:
  - AI
  - C-AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 78927bee
date: 2026-03-31 17:11:32
---
## 一 概述

```
本地 ChatGPT以及RAG 知识库问答，它只能“回答问题”，不能“做事情”

本文介绍：Agent(智能体)
让 AI：
 -自动整理文件
 -查询数据库
 -写代码并执行
 -调用 API
```

<!--more-->

## 二 Agent

### 2.1 什么是 Agent？

```
Agent = 大模型 + 工具 + 规划能力
简单理解：不只是“聊天”，而是“能执行任务的 AI”
```

### 2.2 核心能力

```
理解任务
   ↓
拆解步骤
   ↓
调用工具
   ↓
执行结果
   ↓
继续推理
```

### 2.3 Agent vs 普通 LLM

|   能力   | LLM  | Agent |
| :------: | :--: | :---: |
| 回答问题 |  可  |  可   |
| 调用工具 | 不可 |  可   |
| 多步任务 | 不可 |  可   |
| 自动执行 | 不可 |  可   |

### 2.4 Agent整体架构

```
用户
 ↓
Agent控制器
 ↓
Ollama（大模型）
 ↓
工具层（Functions）
 ↓
执行环境（文件 / API / DB）
```

## 三 准备环境

### 3.1 安装 Ollama

```
curl -fsSL https://ollama.com/install.sh | sh
```

### 3.2 安装模型

```
ollama run qwen2.5
推荐：Qwen3（代码能力强）
```

### 3.3 Python依赖

```
pip install ollama requests
```

## 四 构建步骤

### 4.1 第1步：定义工具(Tools)

```
Agent的核心是工具调用。

1. 文件读取工具
def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

2. 写文件工具
def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return "写入成功"

3. 简单计算工具
def calculator(expr):
    return eval(expr)
```

### 4.2 第2步：工具注册表

```
tools = {
    "read_file": read_file,
    "write_file": write_file,
    "calculator": calculator
}
```

### 4.3 第3步：让模型“会调用工具”

```
1.我们用 Prompt 控制模型输出结构：

2.Prompt设计

你是一个Agent，可以调用以下工具：

- read_file(path)
- write_file(path, content)
- calculator(expr)

当需要使用工具时，请严格输出：

TOOL: 工具名
ARGS: 参数

否则直接回答用户。
```

### 4.4 第4步：调用 Ollama

```
import ollama

def call_llm(messages):
    return ollama.chat(
        model="qwen2.5",
        messages=messages
    )["message"]["content"]
```

### 4.5 第5步：解析工具调用

```
def parse_action(text):
    if "TOOL:" not in text:
        return None, text

    lines = text.split("\n")
    tool = lines[0].replace("TOOL:", "").strip()
    args = lines[1].replace("ARGS:", "").strip()

    return tool, args
```

### 4.6 第6步：执行 Agent 循环

```
def agent(user_input):
    messages = [
        {"role": "system", "content": "你是一个AI Agent"},
        {"role": "user", "content": user_input}
    ]

    while True:
        res = call_llm(messages)

        tool, args = parse_action(res)

        if not tool:
            return res

        result = tools[tool](args)

        messages.append({"role": "assistant", "content": res})
        messages.append({"role": "user", "content": f"工具结果：{result}"})
```

## 五 后续操作

### 5.1 测试 Agent

```
1. 计算任务
agent("帮我计算 128*256")


2. 文件操作
agent("读取 a.txt 内容")
```

### 5.2 Agent工作流程解析

```
用户问题
   ↓
LLM规划
   ↓
是否需要工具？
   ↓
是 → 调用工具
   ↓
返回结果
   ↓
继续推理
```

### 5.3 升级 Agent

```
1. 多工具调用
支持：搜索/API/文件系统/数据库

2. 多步推理
Agent可以：拆任务/分步骤执行/自我修正

3. Memory能力
加入记忆：用户偏好/历史任务/长期上下文
```

### 5.4 进阶：Agent + RAG

```
把上一章 RAG接入：Agent + 知识库 + 工具

Agent
  ↓
RAG（查资料）
  ↓
Tools（执行）
  ↓
Ollama（生成）
```

## 六 真实应用场景

### 6.1 自动写代码

```
* 生成文件
* 修复bug
* 执行测试
```

### 6.2 自动办公

```
* 读Excel
* 写报告
* 整理数据
```

### 6.3 AI助手

```
* 查资料
* 做总结
* 自动执行任务
```

## 七 常见问题

```
1. Agent不执行工具？
Prompt不够严格

2. 输出格式乱？
加“必须严格输出格式”

3. 多轮失败？
降低模型温度
```

## 八 总结

```
Agent = 让 Ollama 从“会聊天”变成“会干活”
```

