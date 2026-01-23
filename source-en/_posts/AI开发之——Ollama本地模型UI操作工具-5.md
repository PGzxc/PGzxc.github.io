---
title: AI开发之——Ollama本地模型UI操作工具(5)
categories:
  - 开发
  - Q-AI
  - Ollama
tags:
  - Ollama
abbrlink: aacaba61
date: 2025-07-18 06:52:36
---
## 一 概述

```
由于已经下载了Ollama模型，本文介绍如何与本地AI模型交互

1.Ollama命令行界面
2.Page Assist插件
```

<!--more-->

## 二 Ollama命令行界面

### 2.1 打开终端，执行如下指令，查看已安装模型

```
C:\Users\83422>ollama list

NAME                ID              SIZE      MODIFIED
qwen:7b             2091ee8c8d8f    4.5 GB    9 hours ago
llama3.2:latest     a80c4f17acd5    2.0 GB    6 days ago
gemma:2b            b50d6c999e59    1.7 GB    6 days ago
deepseek-r1:1.5b    e0979632db5a    1.1 GB    6 days ago
```

### 2.2 运行指定模型

```
ollama run qwen:7b
```

### 2.3 发送消息，本地模型处理

```
PS C:\Users\83422> ollama run qwen:7b
>>> 将如下内容翻译成中文：hello,world
你好，世界。
```

![][1]

## 三 Page Assist插件

### 3.1 打开Chrome应用商店，搜索`Page Assist`进行安装

![][2]

### 3.2 打开Page Assist，选择模型

![][3]

### 3.3 发送消息

![][4]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ollama-ui-model-run-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ollama-ui-chrome-install-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ollama-ui-model-choice-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ollama-ui-msg-resp-4.png