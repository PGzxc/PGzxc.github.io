---
title: CC Switch之——添加本地Ollama(2)
categories:
  - AI
  - AI开发
  - AI编程助手
  - CC-Switch
tags:
  - CC-Switch
abbrlink: 212c1ec9
date: 2026-04-04 13:57:55
---
## 一 概述

```
本文介绍：
 -CC Switch添加本地Ollama
```

<!--more-->

## 二 前置准备

```
-确保 Ollama 已安装并正在运行（默认端口 11434）。
-在终端运行 ollama list 查看已下载的模型（如 qwen3:8b、glm-4.7-flash、llama3.2 等）。
-如果模型未下载，先执行 ollama pull 模型名称。
```

## 三 在 CC Switch 中添加步骤

### 3.1 切换应用

```
打开 CC Switch，切换到你要使用的应用（如 Claude Code）。
```

### 3.2 点击右上角

```
点击右上角 +（Add Provider / 添加供应商）。
```

![][1]

### 3.3 添加自定义

```
选择 自定义（Custom） 预设（不要选内置预设）。
```

### 3.4 填写以下关键信息

```
1.名称：随意填写，例如 Local-Ollama-qwen3.5:4b(方便识别)。
2.API Key：填写 ollama（固定值，不是空）。
3.Base URL（请求地址 / API URL）：填写 http://localhost:11434
（如果是同一电脑；如果是局域网其他机器，改成 http://你的IP:11434）。
4.模型（Model）：
  填写 Ollama 中的模型名称，
  例如 qwen3.5:4b等(必须和 ollama list 显示的一致)。
5.API 格式 / Schema：
  通常选择 OpenAI Compatible 或 Anthropic Messages
  （Ollama v0.14+ 已较好支持 Anthropic 格式，建议优先试 Anthropic）。
6.其他字段（如温度、最大 Token）可保持默认，或根据需要调整。
```

图示

| key和请求地址 | api和模型 |  Json  |
| :-----------: | :-------: | :----: |
|    ![][2]     |  ![][3]   | ![][4] |

### 3.5 保存

```
点击 添加 或 保存
```

### 3.6 选中配置

```
在供应商列表中选中这个新配置，点击 启用（或「使用」）。
```

图示

![][5]

### 3.7 测试

```
打开终端，输入 claude（或对应 CLI 命令），然后试用模型。
建议在 Claude Code 中指定模型：claude --model qwen3:8b。
```

| 1-打开终端 | 2-回复 |
| :--------: | ------ |
|   ![][6]   | ![][7] |



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-ccswitch-2-1-add.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-ccswitch-2-2-edit.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-ccswitch-2-3-edit.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-ccswitch-2-4-edit.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-ccswitch-2-5-use.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-ccswitch-2-6-open.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-ccswitch-2-7-resp.png