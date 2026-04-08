---
title: lanhu-mcp系列之——进阶配置(4)
categories:
  - AI
  - AI开发
  - AI Agent
  - lanhu-mcp
tags:
  - lanhu-mcp
abbrlink: ed21c30c
date: 2026-04-08 10:38:46
---
## 一 概述

```
本文介绍：
 - 环境变量优化
 - 缓存机制
 - 自定义角色映射
 - 性能优化机制
```

<!--more-->

## 二 进阶配置

### 2.1 环境变量优化

```
export HTTP_TIMEOUT=30
export VIEWPORT_WIDTH=1920
export VIEWPORT_HEIGHT=1080
export DEBUG=false
```

### 2.2 缓存机制

```
export DATA_DIR="/your/cache/path"

支持：
- 增量更新
- 版本缓存
```

### 2.3 自定义角色映射

```
ROLE_MAPPING_RULES = [
    (["backend"], "后端"),
    (["frontend"], "前端"),
]
```

### 2.4 性能优化机制

```
- 并发处理
- 智能缓存
- 增量更新

官方强调：高性能设计 
```

