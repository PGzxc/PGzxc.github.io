---
title: AI开发之——Ollama相关操作指令(4)
categories:
  - 开发
  - Q-AI
  - Ollama
tags:
  - Ollama
abbrlink: 7777cef6
date: 2025-07-17 05:23:33
---
## 一 概述

```
以下是一些常见的 Ollama 操作指令，用于管理和与本地 AI 模型交互。
这些指令帮助你进行模型的下载、运行、管理、查看模型列表等操作。
```

<!--more-->

## 二 查看模型帮助信息

### 2.1 打开终端，执行如下指令，查看帮助信息

```
ollama help
ollama --help
```

运行后

```
C:\Users\83422>ollama --help
Large language model runner

Usage:
  ollama [flags]
  ollama [command]

Available Commands:
  serve       Start ollama
  create      Create a model from a Modelfile
  show        Show information for a model
  run         Run a model
  stop        Stop a running model
  pull        Pull a model from a registry
  push        Push a model to a registry
  list        List models
  ps          List running models
  cp          Copy a model
  rm          Remove a model
  help        Help about any command

Flags:
  -h, --help      help for ollama
  -v, --version   Show version information

Use "ollama [command] --help" for more information about a command.
```

### 2.2 查看某个指令的详细帮助和用法

```
ollama help run
ollama help models
```

## 三 常见的 Ollama 指令

### 3.1 安装ollama到指定文件夹

```
ollamaSetup.exe /DIR=D:\PotPlayer-Install\ollama
```

### 3.2 列出所有已安装模型

```
ollama list
```

### 3.3 查看ollama版本

```
ollama -v
```

### 3.4 下载执行模型

```
ollama pull mistral //拉取
ollama run mistral //运行(拉取后运行)
```

### 3.5 运行指定模型(确认已安装，否则执行安装操作)

```
ollama run qwen:7b
```

### 3.6 查看模型信息

```
ollama show qwen:7b
```

### 3.7 推出命令行模型

```
1-Ctrl+d
2-/bye
```

### 3.8 停用模型

```
ollama stop qwen:7b
```

### 3.9 删除指定模型

```
ollama rm deepseek-r1:1.5b
```

### 3.10 查看运行的模型

```
ollama ps
```

## 四 备份本地的AI模型(手动备份)

### 4.1 模型存储位置

```
Ollama 默认将模型文件存储在用户的本地目录，通常在以下路径：

-Windows：C:\Users\<username>\.ollama\models\
-macOS：/Users/<username>/.ollama/models/
```

### 4.2 手动备份模型

```
1、打开模型目录
Windows：C:\Users\<username>\.ollama\models\
macOS：/Users/<username>/.ollama/models/

2、复制整个模型文件夹
3、将其粘贴到备份路径中(如外部硬盘、云存储等)
```

### 4.3 恢复模型

```
1、若需要恢复备份的模型，将复制的模型文件夹从备份路径粘贴回相同的目录即可：

Windows：C:\Users\<username>\.ollama\models\
macOS：/Users/<username>/.ollama/models/

2、然后重新启动 Ollama，即可在 UI 中找到并使用恢复的模型。
```

## 五 参考

* [Ollama官网](https://ollama.com/)