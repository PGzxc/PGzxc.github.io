---
title: Ollama基础系列之——Ollama核心机制(1.4)
categories:
  - AI
  - C-AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 9dab5d4c
date: 2026-03-30 16:25:26
---
## 一 概述

```
本文介绍：
 - 模型生命周期
 - Modelfile
 - 创建自定义模型
```

<!--more-->

## 二 模型生命周期

```
1.模型生命周期
-pull（下载）
-run（运行）
-create（自定义）
-rm（删除）

2.说明：类似容器管理思路
```

## 三 Modelfile

```
1.说明：
类似 Dockerfile：

2.示例：
FROM llama3
PARAMETER temperature 0.7
SYSTEM You are a helpful assistant

3.用于：
-自定义模型行为
-Prompt 固化
-参数调优
```

## 四 创建自定义模型

```
ollama create my-model -f Modelfile #创建自定义模型

ollama run my-model #运行自定义模型
```

