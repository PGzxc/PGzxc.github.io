---
title: Jupyter系列之——Jupyter架构原理(10)
categories:
  - AI
  - AI应用
  - AI办公
  - Jupyter
tags:
  - Jupyter
abbrlink: 864afce0
date: 2026-04-06 12:08:48
---
## 一 概述

```
本文介绍：
 - 核心架构
 - 通信机制
 - Notebook 本质
```

<!--more-->

## 二 Jupyter架构原理

### 2.1 核心架构

```
Browser UI
   ↓
Jupyter Server
   ↓
Kernel（Python/R）
```

### 2.2 通信机制

```
- WebSocket / ZMQ 
- JSON 协议
```

### 2.3 Notebook 本质

```
JSON 文件（记录所有执行过程） 
```

## 三 系列总结

### 3.1 一句话理解 Jupyter

```
“代码 + 文档 + 可视化 = 可复现计算环境”
```

### 3.2 技术定位

|    工具    |   定位   |
| :--------: | :------: |
|  Notebook  | 轻量实验 |
| JupyterLab |   IDE    |
| JupyterHub |   平台   |
|   Voilà    |  产品化  |