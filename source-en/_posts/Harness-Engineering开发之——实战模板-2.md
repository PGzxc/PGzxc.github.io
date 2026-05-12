---
title: Harness-Engineering开发之——实战模板(2)
categories:
  - AI
  - AI开发
  - AI Agent
  - Harness-Engineering
tags:
  - Harness-Engineering
abbrlink: bf63beac
date: 2026-05-13 07:17:57
---
## 一 概述

```
本文介绍：
 - 这是一篇直接复制使用的 .harness/ 实战模板
```

<!--more-->

## 二 .harness/ 实战模板

### 2.1 目录结构

```
.harness/
├── agents/
│   └── ApplicationOwner.md
├── rules/
│   ├── coding-rules.md
│   ├── architecture-rules.md
│   └── business-rules.md
├── skills/
│   ├── demand-analysis.md
│   ├── coding-skill.md
│   ├── expert-reviewer.md
│   └── unit-test-write.md
├── wiki/
│   ├── domain-model.md
│   ├── key-flows.md
│   └── data-dictionary.md
└── changes/
    └── README.md          # 变更总索引
```

### 2.2 核心文件示例(直接复制修改)

1-agents/ApplicationOwner.md(最重要，必做)

```
# Application Owner Agent

**角色**：你是本应用的 Owner，对需求质量、架构一致性、交付结果负全责。

**项目背景**：
- 技术栈：Spring Boot + MyBatis + Redis + RocketMQ（根据你的项目修改）
- 架构：严格分层（Controller → Service → Domain → Repository）
- 代码仓库：本项目根目录

**核心职责**：
- 调度完整的 10 阶段 Pipeline
- 确保 Rules 被严格执行
- 协调编码 Agent、评审 Agent、测试 Agent
- 最终对产出质量负责

**10-Stage Pipeline（必须严格执行）**：
1. 需求分析
2. 需求评审
3. 编码实现
4. 编码评审
5. 单元测试编写
6. 单元测试评审
7. 代码推送
8. CI 验证
9. 部署验证
10. 用户确认

**硬约束（永远禁止违反）**：
- 金额字段必须用 Long，单位为分
- 所有外部调用必须加超时 + 熔断
- 禁止在 Service 层写 SQL 或直接操作数据库
- 关键逻辑必须有单元测试

**工作原则**：简洁、专业、结构化。先思考再输出，使用 Markdown 格式。
```

2-rules/coding-rules.md(示例)

```
# 编码硬规则

## 1. 字段规范
- 金额/价格/费用：必须使用 Long 类型，单位为「分」
- 时间：统一使用 LocalDateTime
- ID 类：统一使用 Long
- 状态字段：使用 String 或枚举（禁止直接用 int）

## 2. 分层规范
- Controller：参数校验 + 调用 Service + 统一 Result 返回
- Service：纯业务逻辑，禁止出现 SQL 和 Mapper 直接调用
- Domain：领域实体，可包含业务方法
- Repository/Mapper：仅负责数据访问

## 3. 其他强制规则
- 所有 Feign/外部调用必须配置超时和 fallback
- 日志使用结构化输出（推荐 MDC）
- 新增接口必须添加 @Operation 注解
- 异常统一使用 BusinessException
```

3-rules/architecture-rules.md

```
# 架构规则

- 严格遵循分层架构，禁止跨层调用
- 领域逻辑必须放在 Domain 层
- 事务控制放在 Service 层
- 缓存操作必须统一封装
- 重要业务流程必须画时序图（可让 Agent 生成）
```

4-skills/demand-analysis.md

```
# Demand Analysis Skill

请按以下结构分析需求：

1. **需求理解**：核心目标是什么？
2. **影响范围**：会改哪些模块？
3. **验收标准**：列出可验证的 Checklist
4. **潜在风险**：技术/业务风险
5. **需要补充的问题**：列出需要用户澄清的事项

输出使用清晰的 Markdown 标题和列表。
```

5-skills/coding-skill.md

```
# Coding Skill

执行编码任务时必须遵循以下步骤：
1. 阅读相关 rules/ 和 wiki/ 文件
2. 按分层顺序修改代码
3. 每个重要方法添加必要注释
4. 输出以下内容：
   - 修改的文件列表
   - 核心改动说明
   - 需要注意的事项
```

6-skills/expert-reviewer.md

```
# Expert Reviewer Skill

你现在是严格的代码评审专家。请从以下维度评审：

**评审维度**：
- 是否符合 Rules
- 架构合理性
- 潜在 Bug 与风险
- 代码可读性
- 测试充分性

**输出格式**：
### ✅ 通过项
### ⚠️ 问题列表
1. [严重/一般/建议] 问题描述 → 建议修改
### 📋 总体结论：通过 / 需要修改后重审
```

7-skills/unit-test-write.md

```
# Unit Test Write Skill

编写单元测试要求：
- 使用 JUnit5 + Mockito
- 覆盖正常、边界、异常三种场景
- 使用真实业务数据构造测试用例
- 测试类与实现类同路径
- 重点测试业务逻辑分支
```

8-wiki/domain-model.md（示例）

```
# 领域模型

- Order（订单）：id, userId, amount(Long), status, createTime
- Inventory（库存）：skuId, stock(Long), version（乐观锁）
- ...
```

9-wiki/key-flows.md

```
# 核心业务流程

- 下单流程：库存检查 → 扣库存 → 创建订单 → 发送消息
- 支付回调流程：...
```

10-changes/README.md

```
# 变更记录总索引

- DEMO-001：用户下单库存检查（2026-05-12）
- DEMO-002：...

每个需求在 changes/ 下建立独立文件夹，存放所有过程文档。
```

## 三 立即上手步骤

```
1.在项目根目录新建 .harness/ 文件夹
2.按上面结构创建所有子文件夹和文件
3.把上面的内容全部复制进去
4.根据你的实际技术栈和业务修改 Rules 和 Wiki
5.拿一个简单需求测试完整流程（Dry Run）
```

