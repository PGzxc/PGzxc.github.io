---
title: Ollama开发系列之——Modelfile进阶(2.5)
categories:
  - AI
  - AI模型
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 3cc9dfdb
date: 2026-03-31 16:51:32
---
## 一 概述

```
本文介绍：
 - 用 Modelfile 定制属于你自己的 AI 模型
 - Modelfile = AI 模型的“Dockerfile”
```

<!--more-->

## 二 什么是 Modelfile？

### 2.1 概念

```
1. 说明：
在 Ollama 中，Modelfile 是模型配置文件，

2. 用于定义：
-基础模型
-Prompt 行为（System Prompt）
-参数（temperature、top_p 等）
-输出格式
-工具调用能力
```

### 2.2 类比理解

|    技术    |    对应     |
| :--------: | :---------: |
| Dockerfile |  容器构建   |
| Modelfile  | AI 模型构建 |

## 三 最简单的 Modelfile(直接可用)

### 3.1 Modelfile文件

```
1.创建一个文件：Modelfile

2.内容
FROM llama3
SYSTEM You are a helpful assistant
PARAMETER temperature 0.7
```

### 3.2 创建模型

```
ollama create my-assistant -f Modelfile
```

### 3.3 运行模型

```
ollama run my-assistant

现在你已经有一个定制 AI 助手
```

## 四 Modelfile 核心指令详解

### 4.1 FROM(基础模型)

```
FROM llama3

可替换为：
-Qwen3
-Gemma 3
```

### 4.2 SYSTEM(系统提示)

```
SYSTEM You are a senior Java developer

2. 用于：
-固定角色
-控制输出风格
```

### 4.3 PARAMETER(模型参数)

1-示例

```
PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER num_ctx 4096
```

2-参数说明

|    参数     |    作用    |
| :---------: | :--------: |
| temperature |   随机性   |
|   随机性    |   多样性   |
|   num_ctx   | 上下文长度 |

### 4.4 TEMPLATE(高级 Prompt 模板)

```
1. TEMPLATE（高级 Prompt 模板）
TEMPLATE """
{{ .System }}
User: {{ .Prompt }}
Assistant:
"""

2. 用于：
-自定义对话结构
-Prompt 工程
```

### 4.5 LICENSE(发布用)

```
LICENSE MIT
```

## 五 实战案例

### 5.1 案例1：程序员 AI 助手

```
1. Modelfile内容

FROM qwen3:8b
SYSTEM You are a professional software engineer
PARAMETER temperature 0.2

2. 创建和运行模型
ollama create coder-assistant -f Modelfile
ollama run coder-assistant

3. 特点：
-更严谨
-更适合写代码
```

### 5.2 案例2：中文客服助手(Modelfile内容)

```
FROM gemma3
SYSTEM 你是一个专业客服，请用中文回答问题
PARAMETER temperature 0.5
```

### 5.3 案例3：结构化输出(JSON)

```
1. Modelfile内容
FROM llama3
SYSTEM Always respond in JSON format

2. 输出：
{
  "answer": "..."
}
```

## 六 模型操作

### 6.1 导入本地模型(GGUF)

```
1. 什么是 GGUF？
一种本地模型格式（量化模型）

2. 导入方式
FROM ./model.gguf

3. 创建模型
ollama create my-gguf -f Modelfile

4.场景：
-使用第三方模型
-私有模型部署
```

### 6.2 模型分享(类似 GitHub)

```
1. 登录
ollama login

2. 推送模型
ollama push my-assistant

3.模型会发布到：
https://ollama.com
```

## 七 高级玩法

### 7.1  多模态模型

```
FROM llava

2.支持：
-图片理解
-图文对话
```

### 7.2 Tool Calling(函数调用)

```
让 AI 调用函数：
-查天气
-调接口
-自动化任务
```

### 7.3 Prompt 固化(企业级用法)

```
用 Modelfile 固定：

-企业知识
-业务规则
-输出格式
```

## 八 最佳实践(开发者经验)

### 8.1 不要用大模型做测试

```
先用：gemma3:4b
```

### 8.2 控制 temperature

|  场景   |  推荐   |
| :-----: | :-----: |
|  编程   | 0.1~0.3 |
| 0.1~0.3 |  对话   |

### 8.3 模型组合

```
示例：

chat → gemma3
code → qwen3-coder
reasoning → deepseek
```

## 九 完整开发流程

```
1. 写 Modelfile
nano Modelfile

2. 创建模型
ollama create my-model -f Modelfile

3. 运行测试
ollama run my-model

4. 调整参数
5. 发布模型
```

