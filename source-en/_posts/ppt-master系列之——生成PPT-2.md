---
title: ppt-master系列之——生成PPT(2)
categories:
  - AI
  - AI应用
  - AI办公
  - ppt-master
tags:
  - ppt-master
abbrlink: dd30eeb0
date: 2026-04-15 09:47:15
---
## 一 概述

```
本文介绍：
 - 环境准备
 - 选择AI编辑器
 - 项目配置
 - 开始创作
```

<!--more-->

## 二 环境准备

### 2.1 开发环境

```
Win11
```

### 2.2 安装相关软件

```
一、软件列表
1.Pyton
2.Node.js
3.Pandoc

二、如何安装
2.1、macOS
brew install python
brew install node                # 可选——用于微信公众号等网页转换
brew install pandoc              # 可选——用于 DOCX/EPUB 转换

2.2、Ubuntu/Debian
sudo apt install python3 python3-pip
sudo apt install nodejs npm      # 可选
sudo apt install pandoc          # 可选

2.3、Windows 
从 python.org、nodejs.org、pandoc.org 下载安装
```

## 三 选择 AI 编辑器

### 3.1 大模型

```
1.在线大模型：
比如收费的Kim3、MiniMax

2.本地Ollama模型
qwen3.5:4b、qwen2.5:7b等
```

### 3.2 模型编辑器

```
比如CC Switch
 - 为CC和CodeX配置本地大模型
 - 通过CC Switch模型打开对应终端
```

## 四 配置项目(Git clone)

### 4.1 拉取ppt-master项目

```
# GitHub
git clone https://github.com/hugohe3/ppt-master.git
# AtomGit（国内网速更快）
git clone https://atomgit.com/hugohe3/ppt-master.git
cd ppt-master
```

### 4.2 安装依赖

```
pip install -r requirements.txt
```

### 4.3 日常更新

```
python3 skills/ppt-master/scripts/update_repo.py
```

## 五 开始创作

### 5.1 准备输入内容(保存为AI 项目介绍.md)

```
# AI 项目介绍

## 背景
AI 技术快速发展

## 问题
- 数据分散
- 成本高

## 解决方案
- 模型统一
- 自动化处理
```

### 5.2 CC Switch 打开Claude Code终端(qwen3.5:4b模型)

```
1.打开Claude Code终端

2.输入：

根据该 Markdown 生成 PPT：
# AI 项目介绍

## 背景
AI 技术快速发展

## 问题
- 数据分散
- 成本高

## 解决方案
- 模型统一
- 自动化处理
```

### 5.3 生成内容

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ai-ppt-main-2.png