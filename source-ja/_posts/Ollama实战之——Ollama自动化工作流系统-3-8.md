---
title: Ollama实战之——Ollama自动化工作流系统(3.8)
categories:
  - AI
  - AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 2d27ea00
date: 2026-03-31 17:12:57
---
## 一 概述

```
本文介绍：
让 AI 不再是单点能力，而是“自动执行的工作流系统”
```

<!--more-->

## 二 工作流Workflow

### 2.1 什么是 AI 工作流(Workflow)？

```
工作流 = 一组“可编排的步骤链”

简单理解：AI 不只是回答问题，而是按流程完成任务
```

### 2.2 示例

```
用户提交需求
   ↓
AI解析任务
   ↓
数据检索（RAG）
   ↓
调用工具（Function）
   ↓
生成结果
   ↓
输出报告
```

### 2.3 为什么需要工作流？

1-Agent的问题

```
* 不稳定
* 多步骤容易跑偏
* 无法复现流程
```

2-Workflow优势

|  特性  | Agent  | Workflow |
| :----: | :----: | :------: |
| 稳定性 |   不   |    稳    |
| 可控性 |   不   |    稳    |
| 可复现 |   不   |    稳    |
| 可扩展 | 不一定 |    可    |

### 2.4 整体架构

```
用户
 ↓
Workflow Engine
 ↓
LLM（Ollama）
 ↓
RAG模块
 ↓
工具层（Functions）
 ↓
输出结果
```

## 三 工作流核心设计

一个标准 AI Workflow 包含 5 层：

### 3.1 输入层

```
* 用户问题
* API请求
```

### 3.2 解析层(Planner)

```
把任务拆解
```

### 3.3 执行层(Executor)

```
调用工具 / RAG / API
```

### 3.4 LLM层

```
生成 / 推理
```

### 3.5 输出层

```
返回结构化结果
```

## 四 实现步骤

### 4.1 第1步：定义 Workflow结构

```
workflow = [
    "analyze",
    "retrieve",
    "compute",
    "generate"
]
```

### 4.2 第2步：任务解析器（Planner）

```
import ollama

def planner(task):
    prompt = f"""
你是任务规划器，请把任务拆解为步骤：

任务：{task}

输出格式：
1. step1
2. step2
3. step3
"""
    res = ollama.chat(
        model="qwen2.5",
        messages=[{"role": "user", "content": prompt}]
    )
    return res["message"]["content"]
```

### 4.3 第3步：RAG模块接入

```
1.说明：复用前面知识库能力

2.内容：
def retrieve(query):
    return f"检索结果：{query}"
```

### 4.4 第4步：工具执行层

```
def compute(expr):
    return eval(expr)

def fetch_api(url):
    return f"API结果：{url}"
```

### 4.5 第5步：执行引擎(核心)

```
def execute_workflow(task):
    steps = planner(task)

    results = []

    for step in steps.split("\n"):
        if "计算" in step:
            results.append(compute("1+1"))

        elif "检索" in step:
            results.append(retrieve(task))

        else:
            results.append(step)

    return results
```

### 4.6 第6步：生成最终结果

```
def generate_output(results):
    prompt = f"""
根据以下执行结果生成最终回答：

{results}
"""

    res = ollama.chat(
        model="qwen2.5",
        messages=[{"role": "user", "content": prompt}]
    )

    return res["message"]["content"]
```

### 4.7 完整Workflow执行

```
def run(task):
    steps = execute_workflow(task)
    return generate_output(steps)
```

### 4.8 测试

```
run("帮我分析并计算预算，同时总结建议")
```

## 五 进阶

### 5.1 Workflow vs Agent vs RAG

```
1. RAG
“查资料再回答”

2. Agent
“动态决定做什么”

3. Workflow（本篇重点）
“固定流程执行任务”
```

### 5.2 三者关系

```
RAG ⊂ Agent ⊂ Workflow系统
```

### 5.3 进阶升级

```
1. DAG工作流（重要）：支持并行执行

A → B → C
  ↘ D → E

2. 任务调度器

可以接入：

* Airflow
* Prefect
* 自定义Queue

3. 多Agent工作流

Planner Agent
   ↓
Executor Agent
   ↓
Reviewer Agent
```

## 六 企业级应用

### 6.1 自动报表系统

```
* 拉数据
* 计算
* 生成报告
```

### 6.2 AI办公系统

```
* 邮件处理
* 文件整理
* 自动总结
```

### 6.3 DevOps自动化

```
* 日志分析
* 故障排查
* 自动修复
```

## 七 常见问题

```
1. Workflow太死板？
加 Agent 决策层

2. 步骤不准？
用 LLM重新规划

3. 执行失败？
加 retry机制
```

## 八 总结

```
Workflow = 让 Ollama 从“智能体”升级为“自动化系统”
```

