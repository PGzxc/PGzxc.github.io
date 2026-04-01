---
title: Ollama实战之——Ollama Function Calling函数调用(3.6)
categories:
  - AI
  - AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 9736858d
date: 2026-03-31 17:12:02
---
## 一 概述

```
简易Agent的问题：
-工具调用是“靠 Prompt 约束”，不稳定
-模型可能输出乱格式
-无法标准化对接系统

本文，我们升级到真正工程级方案：Function Calling(函数调用)
```

<!--more-->

## 二 Function Calling

### 2.1 什么是 Function Calling？

```
Function Calling = 模型“结构化调用工具能力”

简单说：AI不再“说我要调用工具”，而是“按规范输出函数参数”
```

### 2.2 对比理解

```
1 .旧方式（Prompt）:不稳定、容易乱

TOOL: calculator
ARGS: 1+1

2. 新方式（Function Calling）：标准 JSON，可直接执行
{
  "tool": "calculator",
  "arguments": {
    "expr": "1+1"
  }
}
```

### 2.3 Ollama 是否支持 Function Calling？

```
目前 Ollama 本身不强制内置OpenAI级 function calling API

但可以通过：
- Prompt规范化
- JSON模式约束
- 中间层解析

实现“类Function Calling系统”
```

### 2.4 系统架构

```
用户
 ↓
Ollama（模型）
 ↓
结构化输出(JSON)
 ↓
Function Router
 ↓
工具执行层
```

## 三 实现步骤

### 3.1 第1步：定义工具 Schema

```
tools = {
    "calculator": {
        "desc": "计算数学表达式",
        "params": ["expr"]
    },
    "read_file": {
        "desc": "读取文件内容",
        "params": ["path"]
    }
}
```

### 3.2 第2步：强约束 Prompt(核心)

```
你是一个函数调用AI，只能输出JSON，不允许输出任何解释。

可用函数：

1. calculator(expr)
2. read_file(path)

输出格式：

{
  "tool": "...",
  "arguments": {
    ...
  }
}
```

### 3.3 第3步：调用 Ollama

```
import ollama

def call_llm(user_input):
    res = ollama.chat(
        model="qwen2.5",
        messages=[
            {"role": "system", "content": "你是函数调用AI"},
            {"role": "user", "content": user_input}
        ]
    )
    return res["message"]["content"]
```

### 3.4 第4步：解析 JSON

```
import json

def parse_function_call(text):
    try:
        data = json.loads(text)
        return data["tool"], data["arguments"]
    except:
        return None, text
```

### 3.5 第5步：工具执行器

```
def calculator(expr):
    return eval(expr)

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

tools_impl = {
    "calculator": calculator,
    "read_file": read_file
}
```

### 3.6 第6步：完整执行流程

```
def agent(user_input):
    response = call_llm(user_input)

    tool, args = parse_function_call(response)

    if not tool:
        return response

    result = tools_impl[tool](**args)

    return f"工具结果：{result}"
```

### 3.7 测试 Function Calling

```
1. 计算任务
agent("计算 128 * 512")

2. 文件任务
agent("读取 test.txt 内容")
```

## 四 后续操作

### 4.1 为什么 Function Calling 更强？

1-稳定性

|     方式      | 稳定性 |
| :-----------: | :----: |
|    Prompt     | 不稳定 |
| JSON Function |  稳定  |

2-可扩展性

```
可以无限增加工具：
- API调用
- 数据库查询
- 搜索引擎
- 文件系统
```

3-可工程化

```
可以直接接入：
- 微服务
- 后端系统
- 自动化流程
```

### 4.2 升级版架构

```
Ollama
  ↓
Function Parser
  ↓
Tool Registry
  ↓
External APIs / DB / FS
```

### 4.3 进阶：多工具调用(可以扩展为)

```
{
  "tool": "pipeline",
  "steps": [
    {"tool": "read_file", "args": {"path": "a.txt"}},
    {"tool": "calculator", "args": {"expr": "1+2"}}
  ]
}
```

### 4.4 结合 Agent(升级系统)

```
1.可以把它升级成：

Function Calling + Agent Loop + RAG

2. 架构:

用户
 ↓
Ollama
 ↓
Function Call
 ↓
RAG（知识库）
 ↓
Tools（执行）
 ↓
返回结果
```

## 五 常见问题

### 5.1 JSON解析失败？

```
强化Prompt：

- “必须输出JSON”
- “禁止任何多余字符”
```

### 5.2 模型不调用工具？

```
降低模型随机性：

- temperature=0
```

### 5.3 参数错误？

```
 做 schema 校验
```

## 六 真实应用场景

### 6.1 AI自动办公

```
* Excel处理
* 报表生成
* 文件整理
```

### 6.2 AI开发助手

```
* 自动写代码
* 自动运行测试
* 自动修复bug
```

### 6.3 企业自动化

```
* API调用
* 数据查询
* 流程编排
```

## 七 总结

```
Function Calling = 让 Ollama 具备“标准化执行能力”
```

