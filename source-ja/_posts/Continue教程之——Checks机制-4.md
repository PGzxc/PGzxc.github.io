---
title: Continue教程之——Checks机制(4)
categories:
  - AI
  - AI开发
  - AI编程助手
  - Continue
tags:
  - Continue
abbrlink: 4c579e3d
date: 2026-04-04 19:27:16
---
## 一 概述

```
本文介绍：
 -Continue Checks：自动代码审查神器
 -Checks 是什么
 -如何配置规则
 -自动 Review/CI 集成
 -实战案例（代码规范/安全扫描）
```

<!--more-->

## 二 相关概念

### 2.1 什么是 Checks？

1-概念

```
Checks 是 Continue 提供的一个自动化代码检查机制，可以理解为：

AI Code Review + 规则引擎 + 自动化审核
```

2-类比理解

|      工具       |    作用     |
| :-------------: | :---------: |
|     ESLint      |  语法规范   |
|    SonarQube    |  代码质量   |
| Continue Checks | AI 智能审查 |

3-最大区别

```
传统工具 = 静态规则
Checks = AI + 上下文理解
```

### 2.2 Checks 能做什么？

```
1. 自动代码审查(检查：)
- 代码规范
- 性能问题
- 潜在 Bug

2. 安全检查(检测：)
- SQL 注入
- XSS
- 敏感信息泄露

3. 代码风格统一(统一：)
- 命名规范
- 代码结构

4. 自动生成建议
AI 不只是报错，还会给优化方案
```

### 2.3 Checks 工作原理

```
1-流程:
代码变更
   ↓
触发 Checks
   ↓
AI 分析代码
   ↓
输出 Review 结果

2-可以接入
- CLI
- IDE
- Git Hook
- CI/CD
```

## 三 如何启用 Checks？

### 3.1  基础配置

```
1-打开 Continue 配置文件：
Continue: Open Config

2-添加
{
  "checks": [
    {
      "name": "代码审查",
      "prompt": "请对这段代码进行代码审查，指出问题并给出优化建议"
    }
  ]
}
```

### 3.2 多规则配置

```
{
  "checks": [
    {
      "name": "代码规范",
      "prompt": "检查代码是否符合最佳实践"
    },
    {
      "name": "安全检查",
      "prompt": "检查是否存在安全漏洞"
    },
    {
      "name": "性能优化",
      "prompt": "分析性能问题并优化"
    }
  ]
}
```

### 3.3 本质

```
Checks = Prompt 工程
```

## 四 实战

### 4.1 代码审查示例

```
1-示例代码
const password = "123456";

function login(user) {
  if (user.password == password) {
    return true;
  }
}

2-Checks 输出（示例）
使用明文密码
使用 == 存在隐患
无异常处理

建议：
- 使用加密存储
- 使用 ===
- 增加错误处理

3-重点：
AI 不只是指出问题，还给方案
```

### 4.2 结合 CLI 自动化

```
1.手动触发 Checks
git diff | continue ask "做代码审查"

2.自动化 Review
写一个脚本：

#!/bin/bash

git diff | continue ask "请做代码审查，并指出风险"
```

### 4.3 Git Hook 自动检查—pre-commit 自动审查

```
1.安装 hook
touch .git/hooks/pre-commit

2.写入脚本

#!/bin/bash

git diff --cached | continue ask "检查代码是否有严重问题"

3.加权限
chmod +x .git/hooks/pre-commit

效果：提交代码前 → AI 自动审核
```

### 4.4 CI/CD 集成

```
1.示例：GitHub Actions

name: AI Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: |
          git diff origin/main | continue ask "做代码审查"

2.实现：
PR 自动 AI Review
```

## 五 最佳实践

### 5.1 Checks 分层设计

```
基础层：
- 代码规范

进阶层：
- 性能
- 安全

高级：
- 架构设计
```

### 5.2 模型选择建议

```
1.本地模型（Ollama）
-简单检查
-低成本

2.云模型（OpenAI / Anthropic）
-深度分析
-安全审查
```

### 5.3 推荐架构

```
1.架构

Continue Checks
   ↓
New API（统一网关）
   ↓
本地 + 云模型混合

2.策略：
普通检查 → 本地模型
复杂分析 → 云模型
```

## 六 常见问题

### 6.1 检查不准确

```
1.原因：Prompt 太简单
2.优化：写清楚规则 + 输出格式
```

### 6.2 成本过高

```
解决：优先用本地模型
```

### 6.3 检查太慢

```
解决：减少上下文
```

## 七 本篇总结

```
Checks 的本质：用 AI 代替人工 Code Review

它让你实现
-自动审查
-自动优化
-自动拦截问题代码
```

