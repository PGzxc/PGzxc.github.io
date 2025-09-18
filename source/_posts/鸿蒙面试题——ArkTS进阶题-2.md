---
title: 鸿蒙面试题——ArkTS进阶题(2)
categories:
  - 面试相关
  - Harmony面试题
tags:
  - Harmony面试题
abbrlink: 8ca37164
date: 2025-09-18 08:56:07
---
## 一 概述

```
本文介绍：
- ArkTS：基础/进阶/高频三部分
- 本小节：进阶题
```

<!--more-->

## 二 ArkTS进阶题(仅供参考)

### 2.1 类的修饰符有哪些？

```
-public：默认，所有地方可访问。
-private：仅类内部可访问。
-protected：类及子类可访问
```

### 2.2 抽象类和接口的区别？

```
-抽象类：可包含方法实现 + 抽象方法；只能单继承。
-接口：仅定义结构，不能包含实现；支持多实现
```

### 2.3 ArkTS 是否支持多继承？

```
不支持多继承，但可通过 接口实现 + 组合 达到类似效果
```

### 2.4 import/export 与 namespace 的区别？

```
-import/export：ES Module 标准，推荐方式。
-namespace：旧式模块划分方式，适合全局变量封装
```

### 2.5 函数重载如何实现？

```
1、说明
通过多次声明函数签名 + 单一实现函数

2、示例
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any) { return a + b; }
```

