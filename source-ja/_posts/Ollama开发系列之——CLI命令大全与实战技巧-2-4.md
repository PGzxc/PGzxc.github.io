---
title: Ollama开发系列之——CLI命令大全与实战技巧(2.4)
categories:
  - AI
  - C-AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: fbfca3b7
date: 2026-03-31 16:51:03
---
## 一 概述

```
本文介绍：
 -命令详解
 -高级用法
 -模型管理技巧
```

<!--more-->

## 二 CLI命令详解

### 2.1 CLI 是什么？为什么重要？

```
1. 概念
CLI(Command Line Interface)是 Ollama 的核心控制方式

2. 所有模型操作，本质都通过 CLI 完成,包括：
-下载模型
-运行模型
-管理模型
-启动工具（Agent / WebUI）
```

### 2.2 核心命令

```
1. 运行模型
ollama run gemma3

功能：
-自动下载（如果不存在）
-启动模型
-进入聊天界面

2. 下载模型
ollama pull qwen3:8b

推荐模型：
-Gemma 3
-Qwen3

3. 查看模型
ollama list

4. 删除模型
ollama rm gemma3

5. 查看运行中的模型
ollama ps
```

### 2.3 进阶命令(开发者常用)

```
1. 复制模型
ollama cp old-model new-model
用于：修改模型配置前备份

2. 创建模型
ollama create my-model -f Modelfile
后面会重点讲 Modelfile

3. 推送模型
ollama push my-model
上传到模型仓库（类似 GitHub）
```

### 2.4 最强命令：launch(生态入口)

```
1. 启动 AI 工具
ollama launch openclaw
对应工具：OpenClaw

2. 其他工具
ollama launch codex
ollama launch claude
ollama launch opencode

用途：AI 编程/自动化 Agent/项目分析
```

## 三 实战

### 3.1 实战技巧

```
1. 多行输入（写复杂 Prompt）
写一个Python脚本，实现文件批量重命名
适合：长 Prompt/代码生成

2. 使用量化模型（省显存）
ollama pull qwen3:8b-q4_K_M
优点：显存占用降低 50%+/速度更快

3. 指定模型版本
ollama run llama3:8b
ollama run llama3:70b

类似 Docker Tag
```

### 3.2 模型管理最佳实践(推荐策略)

```
1. 分类存储
-chat 模型
-coder 模型
-reasoning 模型

2. 控制磁盘占用
ollama list
ollama rm xxx

定期清理不用模型

3. 优先使用小模型测试：
避免：卡顿/内存爆炸
```

### 3.3 CLI + API 联动(开发重点)

```
1. CLI 本质调用 API：
http://localhost:11434

2. CLI vs API 对比
CLI	        API
手动操作	程序调用
快速测试	系统集成

3. 开发建议：
-CLI → 调试
-API → 开发
```

### 3.4 完整实战流程

```
1. 查看模型
ollama list

2. 下载模型
ollama pull qwen3-coder:8b

3. 运行模型
ollama run qwen3-coder:8b

4. 查看运行状态
ollama ps

5. 启动 AI 工具
ollama launch openclaw
```

## 四 常见问题(CLI 相关)

```
1. 命令执行失败
检查：是否安装成功/PATH 是否正确

2. 模型无法运行
-原因：内存不足
-解决：ollama run gemma3:4b

3. 下载失败
-原因：网络问题
-解决：使用代理
```

