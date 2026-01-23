---
title: Web前端高频面试题——框架与库之React(5)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: c39400e0
date: 2025-10-23 09:10:37
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
1.Fiber 架构
2.组件通信：props、context、事件、全局状态
3.Hooks 原理：useState/useEffect/useMemo/useCallback/useRef
4.Diff 算法
5.React 18：Concurrent Rendering、Suspense
6.状态管理：Redux、MobX、Recoil、Zustand
7.性能优化：memo、虚拟化、懒加载
```

### 三 面试题解答(仅供参考)

### 3.1 Fiber 架构

1、什么是 React 的 Fiber 架构？

```
Fiber 是 React 16 引入的核心渲染引擎，
通过将渲染任务拆分为可中断的单元，
支持优先级调度和并发渲染，
提升 UI 响应性和复杂应用的性能。
```

2、Fiber 如何提升渲染效率？

```
1、任务分片：
将渲染任务拆分为小块，高优先级任务(如用户交互)优先执行，低优先级任务(如数据加载)可暂停，避免UI阻塞。
2、时间切片：利用浏览器空闲时间处理任务，保持界面流畅。
3、优先级调度：通过 Scheduler 动态调整任务优先级。
```

3、Fiber 中 Reconciliation 的过程是怎样的？

```
Reconciliation 比较新旧 Virtual DOM，计算最小更新集，批量应用到真实 DOM。

Fiber 使此过程可中断，支持并发更新，分两阶段：
 -Render 阶段（可中断）：生成 Fiber 树，计算变化。
 -Commit 阶段（不可中断）：更新 DOM，触发生命周期
```

4、什么是 React Fiber？为什么要引入 Fiber？

```
1、概念
Fiber是React 16之后重构的核心架构，用来优化 协调(Reconciliation)过程，支持 可中断、可恢复的异步渲染。

2、旧架构问题（Stack Reconciler）：
-递归遍历虚拟 DOM，同步执行；
-1次更新会长时间占用主线程，造成页面卡顿（无法响应用户交互）。

3、Fiber 的改进：
-Fiber 是一种数据结构(每个节点对应一个 Fiber 对象，保存组件状态、DOM 信息、上下文引用等)。
-通过 链表结构（child、sibling、return）实现 可中断遍历。
-支持 时间切片（Time Slicing） 和 优先级调度（Scheduler）。

4、简要流程：
-render 阶段（可中断）：生成 Fiber 树、计算变化；
-commit 阶段（不可中断）：DOM 更新、生命周期触发。

5、考点总结：
-Fiber 提升了 UI 响应性；
-核心思想是 将同步任务分片化；
-React 18 的并发特性基于 Fiber 实现。
```

### 3.2 组件通信

1、props 和 state 的区别是什么？

```
Props：父组件传递给子组件的只读数据，驱动单向数据流。
State：组件内部可变数据，通过 setState 或 useState 更新，管理交互逻辑
```

2、什么是 prop drilling，如何解决？

```
1、概念
Prop Drilling 是多层组件逐层传递 props 的问题，

2、解决方案：
-Context API：跨层级共享全局数据（如主题、用户信息）。
-状态管理库：如 Redux、MobX，适合复杂数据共享。
```

3、React 中如何通过事件实现组件通信？

```
子组件通过父组件传入的回调函数（如 onClick）传递数据，父组件更新状态，实现通信。
```

4、Context API 的作用和适用场景？

```
Context API 用于全局数据共享（如主题、用户信息），通过 Provider 和 Consumer 或 useContext 访问，适合中等规模应用。
```

5、React 组件之间有哪些通信方式？适用场景？

|        通信方式        |    场景    |             实现方式             |
| :--------------------: | :--------: | :------------------------------: |
|         Props          |  父 → 子   |           直接传递属性           |
|        回调函数        |  子 → 父   |        通过 props 传函数         |
|        Context         |   跨层级   | React.createContext + useContext |
|        全局状态        | 多组件共享 | Redux / MobX / Recoil / Zustand  |
|        事件总线        |  异步解耦  |       mitt / EventEmitter        |
| URL 参数、localStorage | 页面间传递 |        Router 或本地存储         |

### 3.3 Hooks 原理

1、useState 的工作原理是什么？

```
useState 管理函数组件状态，返回 [state, setState]。

React 内部：
-用数组按调用顺序存储状态，依赖闭包保持值。
-setState 触发 re-render，更新对应 Hook 节点状态。
```

2、useEffect 原理

```
1、概念
useEffect 处理副作用（如 DOM 操作、请求、订阅）

2、分两阶段：
-Render 阶段：注册 effect。
-Commit 阶段：执行清理函数后运行新 effect。

3、依赖数组：
-[]：仅 mount 时执行。
-[deps]：依赖变化时执行。
-无依赖：每次渲染后执行。
```
3、useMemo / useCallback 区别

|         Hook          |  返回值  |               作用               |
| :-------------------: | :------: | :------------------------------: |
|   useMemo(fn, deps)   | 计算结果 |     缓存计算值，减少重复计算     |
| useCallback(fn, deps) |   函数   | 缓存函数引用，防止子组件重复渲染 |

4、useRef 原理及用途

```
1、概念
useRef 返回可变对象 { current: ... }，不随渲染更新。

2、用途：

-访问 DOM 节点。
-存储可变值（如定时器 ID）。
-保持前一状态。
```

5、Hooks 的使用规则是什么？

```
仅在函数组件或自定义 Hook 顶层调用。
不可在循环、条件或嵌套函数中调用，确保调用顺序一致。
```

### 3.4 Diff 算法

1、React 的 Diff 算法是什么？

```
Diff 算法比较新旧 Virtual DOM，计算最小变化集，更新真实 DOM。
假设同级元素类型相同，使用 key 优化列表。
```

2、列表中 key 的作用？

```
key 帮助 React 识别列表项的唯一性，优化 diffing 过程，减少不必要 re-render。
key 需唯一且稳定，不建议用索引。
```

3、Virtual DOM 如何与 Diff 算法协作？

```
Virtual DOM 是真实 DOM 的轻量表示，Diff 算法在其上计算变化，批量更新真实 DOM，降低操作成本。
```

### 3.5 React 18

1、React 18 的 Concurrent Rendering 是什么？

```
1、概念
通过 createRoot 启用，允许中断渲染任务，优先处理高优先级更新（如用户交互），提升 UI 响应性。

2、核心 API：

-startTransition：标记非紧急更新。
-useTransition：处理延迟状态。
-useDeferredValue：延迟渲染高开销内容。
```

2、Suspense 和懒加载如何结合？

```
Suspense：暂停组件渲染，显示 fallback，等待条件满足（如数据加载）。
React.lazy：动态导入组件，结合 Suspense 实现代码拆分，优化初始加载。
```

3、React 18 如何改善用户体验？

```
React 18 通过时间切片、优先级调度和 Suspense，提升交互流畅性和加载体验。
```

### 3.6 状态管理

1、状态管理方案对比

|   库    |               特点               |         优缺点         |
| :-----: | :------------------------------: | :--------------------: |
|  Redux  |      单向数据流、可预测状态      |    模板多，生态强大    |
|  MobX   |         响应式、面向对象         |    上手快，调试复杂    |
| Recoil  |      原子化状态，React 集成      |  学习曲线低，社区中等  |
| Zustand | 轻量简洁，Hooks 驱动，支持 immer | 适合中小项目，API 简单 |

2、何时选择全局状态管理？

```
复杂应用：需要调试工具、中间件或跨组件共享状态时，使用 Redux、MobX 等。
简单场景：useState 或 useContext 足以应对。
```


### 3.7 性能优化

1、React.memo 的作用是什么？

```
React.memo 缓存函数组件，浅比较 props 避免不必要 re-render，适用于 props 稳定场景。
```

2、虚拟化如何优化大列表？

```
虚拟化(如 react-window)仅渲染视口内元素，回收其他，减少 DOM 节点，优化滚动性能。
```

3、如何实现懒加载？

```
使用 React.lazy 动态导入组件，结合 Suspense 显示 fallback，减少初始加载大小。
```

4、React 性能优化的常见方法？

```
使用 memo 避免重渲染、useMemo/useCallback 缓存值/函数、虚拟化大列表、懒加载组件、本地化状态、DevTools 分析瓶颈。
```

5、性能优化策略

|         手段          |                       说明                       |
| :-------------------: | :----------------------------------------------: |
|      React.memo       |       缓存纯组件，浅比较 props 避免重渲染        |
| useMemo / useCallback |     缓存值/函数，减少重复计算或子组件重渲染      |
|        虚拟化         | 使用 react-window / react-virtualized 渲染长列表 |
|        懒加载         | React.lazy + Suspense 动态加载组件，减少初始加载 |
|       代码分割        |        通过 Webpack 动态 import 拆分代码         |
|       合并更新        |         避免频繁 setState，批量更新状态          |
|     key 使用优化      |       使用唯一且稳定的 key 减少列表重渲染        |

6、性能分析

```
使用 React DevTools 定位瓶颈，针对性优化。
```

