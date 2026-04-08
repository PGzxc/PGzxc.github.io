---
title: codex-plugin-cc系列之——如何调用Codex(4)
categories:
  - AI
  - AI开发
  - AI Agent
  - codex-plugin-cc
tags:
  - codex-plugin-cc
abbrlink: 6346a01
date: 2026-04-08 10:01:31
---
## 一 概述

```
本文介绍：
 - 基础用法
 - 典型使用场景
```

<!--more-->

## 二 基础用法

```
1.在 Claude Code 中直接描述任务：
帮我重构这个函数并添加单元测试

2.Claude 会自动判断：
是否调用 Codex
```

## 三 典型使用场景

### 3.1 场景1：复杂重构

```
重构这个模块，拆成 service + repository

Codex：
- 修改结构
- 提交 patch
```

### 3.2 场景2：自动补测试

```
为这个类补全 Jest 测试


Codex：
- 写测试
- 运行测试命令
```

### 3.3 场景3：Bug 修复

```
这个函数在空数组时报错，修复它

Codex：
- 找问题
- 修复
- 验证
```

