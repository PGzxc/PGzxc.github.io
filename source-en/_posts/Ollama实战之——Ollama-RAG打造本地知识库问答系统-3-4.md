---
title: Ollama实战之——Ollama+RAG打造本地知识库问答系统(3.4)
categories:
  - AI
  - C-AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 60b36479
date: 2026-03-31 17:11:04
---
## 一 概述

```
前文介绍用 Ollama 搭建了本地 ChatGPT。但你会很快遇到一个关键问题：
- 模型不知道你的公司文档 / PDF / 私有数据
- 回答是“通用知识”，不“懂你”

这就是 RAG 需要解决的问题。
```

<!--more-->

## 二 RAG

### 2.1 什么是 RAG？

```
RAG = Retrieval-Augmented Generation（检索增强生成）
简单理解：先查资料，再让大模型回答
```

### 2.2 核心流程

```
用户问题
   ↓
向量检索（知识库）
   ↓
找相关内容
   ↓
拼接 Prompt
   ↓
Ollama生成答案
```

### 2.3 RAG系统整体架构

```
用户
 ↓
应用层（Python / WebUI）
 ↓
向量数据库
 ↓
Embedding模型
 ↓
Ollama（LLM）
```

## 三 准备工作

### 3.1 开发环境

```
1. 安装 Ollama

curl -fsSL https://ollama.com/install.sh | sh

2. 拉取模型
-Chat模型：ollama run qwen2.5
-Embedding模型(关键)：ollama pull nomic-embed-text
```

### 3.2 选择向量数据库

1-常见选择：

| 工具   | 特点     |
| ------ | -------- |
| FAISS  | 本地轻量 |
| Chroma | 简单易用 |
| Milvus | 企业级   |

2-这里使用：Chroma

### 3.3 安装依赖

```
pip install chromadb ollama
```

## 四 构建步骤

### 4.1 第1步：构建知识库

```
1. 读取文档

import os
def load_docs(folder):
    docs = []
    for file in os.listdir(folder):
        if file.endswith(".txt"):
            with open(os.path.join(folder, file), "r", encoding="utf-8") as f:
                docs.append(f.read())
    return docs

2. 文本切分

def split_text(text, chunk_size=300):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
```

### 4.2 第2步：向量化(Embedding)

```
使用 Ollama embedding：

import ollama
def get_embedding(text):
    res = ollama.embeddings(
        model="nomic-embed-text",
        prompt=text
    )
    return res["embedding"]
```

### 4.3 第3步：存入向量数据库

```
import chromadb
client = chromadb.Client()
collection = client.create_collection("docs")

def add_docs(chunks):
    for i, chunk in enumerate(chunks):
        emb = get_embedding(chunk)
        collection.add(
            ids=[str(i)],
            embeddings=[emb],
            documents=[chunk]
        )
```

### 4.4 第4步：检索相关内容

```
def search(query):
    q_emb = get_embedding(query)

    result = collection.query(
        query_embeddings=[q_emb],
        n_results=3
    )

    return result["documents"][0]
```

### 4.5 第5步：接入 Ollama 生成答案

```
def ask_llm(question, context):
    prompt = f"""
你是一个知识助手，请根据以下内容回答问题：

内容：
{context}

问题：
{question}
"""

    res = ollama.chat(
        model="qwen2.5",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return res["message"]["content"]
```

### 4.6 完整流程

```
def rag_pipeline(question):
    docs = search(question)
    answer = ask_llm(question, docs)
    return answer
```

### 4.7 测试一下

```
print(rag_pipeline("公司报销流程是什么？"))
```

## 五 升级及优化

### 5.1 升级 WebUI 版 RAG

```
1.可以结合：
Open WebUI

2.实现：
- 上传 PDF
- 自动索引
- 聊天问答
```

### 5.2 RAG优化关键点

1-Chunk策略

| 方法     | 效果 |
| -------- | ---- |
| 固定长度 | 简单 |
| 按段落   | 更好 |
| 语义切分 | 最优 |

2-Embedding模型选择

```
推荐：
- nomic-embed-text（轻量）
- bge-m3（更强）
```

3-检索优化

```
- TopK = 3~5
- 加 rerank（进阶）
```

4-Prompt优化

```
不要只拼接文本，要：
- 加角色
- 加约束
- 加格式
```

## 六 常见问题

### 6.1 回答不准？

```
检查：
- chunk太大
- embedding不好
- topK太小
```

### 6.2 查不到内容？

```
检查：

- 是否真的入库
- embedding是否一致模型
```

### 6.3 回答“胡说”

```
原因：LLM没限制上下文
解决： 强制“只能基于内容回答”
```

## 七 完整系统升级路线

### 7.1 现有

```
* Ollama ChatGPT
* 本地模型
* RAG知识库
```

### 7.2 进阶方向

```
1. Agent系统：自动执行任务
2. 多文档知识库：企业级系统
3. Rerank模型：提升精度
4. WebUI RAG集成：零代码体验
```

## 八 总结

```
RAG = 让 Ollama 变成“懂你私有数据的 ChatGPT”
```

