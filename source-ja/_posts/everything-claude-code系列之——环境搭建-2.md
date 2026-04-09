---
title: everything-claude-code系列之——环境搭建(2)
categories:
  - AI
  - AI开发
  - AI Agent
  - everything-claude-code
tags:
  - everything-claude-code
abbrlink: fae1a543
date: 2026-04-09 09:23:20
---
## 一 概述

```
本文介绍：
 - 安装 Claude Code
 - 初始化项目
 - 基础目录说明
```

<!--more-->

## 二 安装 Claude Code

```
官方推荐方式(已更新)：
curl -fsSL https://claude.ai/install.sh | bash
不再推荐 npm 安装 
```

## 三 初始化项目

### 3.1 初始化

```
claude init
```

### 3.2 生成结构

```
.claude/
  ├── CLAUDE.md
  ├── skills/
  ├── commands/
  ├── hooks/
```

## 四 基础目录说明

### 4.1 CLAUDE.md

```
# Project Context

## Tech Stack
- Next.js
- PostgreSQL

## Rules
- 使用 TypeScript
- 禁止直接操作 DB
```

### 4.2 skills/

```
1.结构：
.claude/skills/
  tdd/
    README.md
  security-review/
  
2.每个 skill = 一个完整流程  
```

### 4.3 commands/

```
1.内容
.claude/commands/
  fix.md
  test.md
  
 2.说明：
 快速执行型 prompt
```

### 4.4 hooks/

```
{
  "PostToolUse": {
    "matcher": "Write|Edit",
    "command": "npm run lint"
  }
}

自动执行规则
```

