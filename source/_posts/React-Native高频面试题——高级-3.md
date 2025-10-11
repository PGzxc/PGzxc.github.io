---
title: React Native高频面试题——高级(3)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 735a27be
date: 2025-10-11 09:49:01
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二  面试要求和面试题

```
1.渲染原理
React Fiber：虚拟 DOM diff 算法
Yoga 布局引擎
Bridge 机制 vs 新架构 JSI/Fabric

2.Hooks 与高级特性
useState、useEffect、useMemo、useCallback、useContext
自定义 Hooks

3.状态管理
Redux：Action / Reducer / Store / Middleware（redux-thunk、redux-saga、redux-logger）
其他：MobX、Zustand、Recoil

4.组件通信
父传子：Props
子传父：回调函数 / Context
跨层级：Context API / 状态管理工具
```

### 三 面试题解答(仅供参考)

### 3.1 渲染原理

1、什么是 Virtual DOM？它的优势和工作原理是什么？

```
1、定义：真实 DOM 的轻量级 JS 对象表示，存在内存中。
2、原理：状态变更 → 生成新树 → Diff 算法计算最小更新 → 批量更新真实 DOM。
3、优势：减少昂贵 DOM 操作、支持跨平台（RN）、简化复杂更新。
```

2、React 的 Diff 算法如何工作？

```
1、思路：新旧 Virtual DOM 树对比，计算最小更新。

2、核心优化：
-相同组件 → 相似子树
-key 匹配列表 → O(n³) → O(n)

3、规则：
-根节点不同 → 替换子树
-同类型 → 更新属性
-子节点递归对比

4、Fiber 支持中断和优先级调度，提升流畅性。
```

3、React Fiber 是什么？它解决了什么问题？

```
1、定义：React16 引入的新渲染引擎，替代同步栈式协调器。

2、改进：
-增量渲染（可中断）
-优先级调度（交互优先）
-时间分片（跨帧处理）
-双缓冲树（Current/WorkInProgress）

3、优势：支持并发渲染、动画更流畅。
```

4、Yoga 布局引擎在 React Native 中的作用是什么？

```
1、定义：基于 Flexbox 的跨平台布局引擎。
2、作用：统一 iOS/Android 布局计算，避免依赖浏览器 CSS。
3、优势：高性能、跨平台一致性。
```

5、React Native 的 Bridge 机制和新架构（JSI/Fabric）有何区别？

```
1、Bridge（旧）：
-JS 与原生通信需序列化 JSON，异步，性能瓶颈。

2、新架构：
-JSI：JS 可直接调用 C++，支持同步。
-Fabric：新渲染器，支持并发渲染和同步视图管理。
-TurboModules：按需加载，减少启动耗时。

3、优势：
降低通信开销，支持复杂动画和大型应用。
```

### 3.2 Hooks 与高级特性

1、useState 是什么？工作原理和常见陷阱有哪些？

```
1、原理：
按调用顺序匹配状态，setState 异步批量更新。

2、常见陷阱：

-异步更新 → 需函数式写法 setState(prev => prev+1)
-不可变性 → 必须返回新副本
```

2、useEffect 的依赖数组作用是什么？不传会怎样？

```
1、副作用处理（数据获取/订阅）。

2、依赖数组：
-[] → 首次执行
-[dep] → 依赖变化执行
-无依赖 → 每次渲染执行，易死循环

3、清理函数：卸载或依赖变化前执行。
```

3、useMemo 和 useCallback 的区别和使用场景是什么？

```
1、useMemo：缓存计算结果，避免重复计算。
2、useCallback：缓存函数实例，避免子组件重复渲染。
3、注意：过度使用反而增加开销。
```

4、useContext 如何工作？适合什么场景？

```
1、功能：跨层级共享数据，解决 Prop Drilling。
2、场景：全局、低频更新数据（主题、用户信息）。
```

5、 什么是自定义 Hooks？何时创建？

```
1、作用：逻辑复用 + 关注点分离。
2、创建时机：提取重复逻辑（表单处理、API 请求）。
3、原则：以 use 开头，仅在顶层或其他 Hook 中调用。
```

### 3.3 状态管理

1、Redux 的核心概念和工作流程是什么？

```
-Store（全局状态树）
-Action（描述变化）
-Reducer（纯函数更新状态）
-Middleware（扩展 dispatch，如 thunk/saga）
-流程：dispatch → middleware → reducer → store → 组件刷新。
```

2、Redux 与其他状态管理库（如 MobX、Zustand、Recoil）有何区别？

```
1、Redux：可预测、适合大型应用，样板代码多。
2、MobX：响应式，简单但易过度渲染。
3、Zustand：轻量、Hooks 风格，适合中小应用。
4、Recoil：原子化状态，细粒度更新，适合复杂应用。
```

3、redux-thunk 和 redux-saga 的区别是什么？

```
1、thunk：Action 可返回函数，适合简单异步。
2、saga：基于 Generator，支持复杂异步（取消/并行），功能强大但学习成本高。
```

### 3.4 组件通信

1、React 中父子组件如何通信？

```
1、父 → 子：Props 传递数据
2、子 → 父：回调函数
```

2、如何处理跨层级组件通信？Context API 的作用是什么？

```
1、问题：
Prop Drilling（逐层传递 Props）导致代码冗余。

2、解决方案：
-Context API：全局 Provider → useContext 消费
-状态管理库：Redux/Recoil，更适合复杂数据
```

## 四 高频考点总结

```
1、渲染原理：Virtual DOM、Diff、Fiber、Yoga、JSI/Fabric → 重点理解性能优化。
2、Hooks：useState/useEffect/useMemo/useCallback 的区别与陷阱，自定义 Hooks。
3、状态管理：Redux 核心 & 与 MobX、Zustand、Recoil 的对比。
4、组件通信：父子（Props/回调）、跨层级（Context、状态库）。
```

