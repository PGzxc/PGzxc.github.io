---
title: 鸿蒙面试题——ArkTS基础题(1)
categories:
  - 面试相关
  - Harmony面试题
tags:
  - Harmony面试题
abbrlink: 86d1c7dc
date: 2025-09-18 08:54:55
---
## 一 概述

```
本文介绍：
- ArkTS：基础/进阶/高频三部分
- 本小节：基础题
```

<!--more-->

## 二 ArkTS基础题解答(仅供参考)

### 2.1 ArkTS 和 TypeScript 的关系与区别是什么？

```
-ArkTS 基于 TypeScript 语法扩展，保留 TS 的强类型系统和 OOP 特性。
-移除了浏览器/Node 相关 API。
-新增 声明式 UI(ArkUI)、状态管理、装饰器 等特性。
-编译目标为 Ark Compiler(ArkTS → Ark bytecode → 设备运行)
```

### 2.2 let 和 const 的区别？

```
-let 声明的变量可重新赋值。
-const 声明的变量不可重新赋值，但引用对象内容可修改
```

### 2.3 any、unknown、never 的区别？

```
-any：关闭类型检查，任意类型。
-unknown：类型安全的 any，赋值前必须做类型收窄。
-never：表示不可能出现的值（例如抛异常的函数）
```

### 2.4 接口和类型别名的区别？

```
-接口(interface)：可继承，可实现，适合结构定义。
-类型别名(type)：可组合联合/交叉类型，更灵活
```

### 2.5 泛型的应用场景？

```
1、说明
复用函数/类逻辑，提升类型安全

2、示例
function identity<T>(arg: T): T {
  return arg;
}
```

