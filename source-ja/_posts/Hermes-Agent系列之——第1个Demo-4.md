---
title: Hermes-Agent系列之——第1个Demo(4)
categories:
  - AI
  - AI开发
  - AI Agent
  - Hermes-Agent
tags:
  - Hermes-Agent
abbrlink: 5ca13b85
date: 2026-04-08 10:19:54
---
## 一 概述

```
本文介绍：
 - 示例：自动生成项目README
 - Hermes 内部执行流程
```

<!--more-->

## 二 自动生成项目README

### 2.1 输入

```
hermes
输入：帮我分析当前项目，并生成 README.md
```

### 2.2 Hermes 内部执行流程

```
1. 读取文件
2. 分析代码结构
3. 生成文档
4. 写入 README.md
5. 记录为 Skill
```

### 2.3  下一次：

```
自动复用 Skill（无需重新思考）
```

