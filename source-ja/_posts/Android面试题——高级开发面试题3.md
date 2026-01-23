---
title: Android面试题——高级开发面试题3
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 5c3392d
date: 2024-04-15 19:09:39
---
## 一 面试题整理

1. compose 和  view的区别
2. view是怎么渲染到屏幕上去的
3. 协程的轻量级体现在哪里

<!--more-->

## 二 面试题解答(ChatGPT)

### 2.1 compose 和  view的区别

```
在 Android 开发中，Compose 和传统的 View 是两种构建 UI 的方式，主要区别如下：

1.开发范式：
-Compose：声明式编程，直接用代码描述 UI，状态变化时自动更新界面。
-View：命令式编程，使用 XML 定义布局，手动更新 UI 状态。

2.布局管理：
-Compose：完全用 Kotlin 代码构建 UI，无需 XML，逻辑更集中。
-View：UI 和逻辑分离，XML 定义界面，代码处理交互。

3.状态管理：
-Compose：内置状态管理机制（remember、mutableStateOf），状态变更后 UI 自动重组。
-View：需要手动监听数据变化，通过 setText()、setVisibility() 等方法更新界面。

4.性能优化：
-Compose：采用重组机制，仅更新受影响的部分，渲染更高效。
-View：通过 invalidate()、requestLayout() 触发重绘，层级多时可能影响性能。

5.兼容性与学习成本：
-Compose：需要学习新的开发范式，更适合新项目
-View：大多数项目已采用 View 系统，迁移成本较高。

总结：Compose 更现代、开发效率更高，适合新项目；View 成熟稳定，旧项目维护更方便。
```

### 2.2  view是怎么渲染到屏幕上去的

```
Android View 渲染到屏幕上，主要经过以下三步：

1.测量（Measure）：
-从根View开始，递归调用measure()，根据父View的约束条件计算每个子View的尺寸（width和 height）。
-结果保存在 MeasuredWidth 和 MeasuredHeight。

2.布局（Layout）：
-根据测量结果，递归调用layout() 方法，确定每个View的具体位置（left、top、right、bottom）。

3.绘制（Draw）：
-最后调用 draw() 方法，完成屏幕渲染。
-绘制顺序：背景 → 自身内容 → 子 View → 前景。
-如果需要重绘，可以手动调用 invalidate() 或 requestLayout()。

总结：渲染流程是 Measure → Layout → Draw，每次界面变化都会触发这个流程，确保View正确显示在屏幕上
```

### 2.3 协程的轻量级体现在哪里

```
Android 协程（Coroutine） 之所以被称为轻量级，主要体现在以下几个方面

1.线程复用：
协程不是直接创建线程，而是通过调度器（Dispatchers）在线程池中复用已有线程，避免频繁创建和销毁线程的开销。

2.无需阻塞线程：
使用 suspend 函数挂起协程时，线程不会被阻塞，可以执行其他任务，等异步操作完成后协程会继续执行。

3.更少的内存消耗：
启动协程的成本极低，每个协程的内存开销只有几KB，对比线程（约1MB），可以创建上万个协程而不会耗尽内存。

4.结构化并发：
协程通过 CoroutineScope 统一管理，不需要手动创建和回收，避免线程池管理的复杂性。

5.无额外上下文切换成本
线程切换需要 CPU 进行上下文切换（涉及寄存器、缓存等），
而协程的调度是基于 Kotlin 运行时，无需操作系统级别的线程调度，切换更快。

总结：协程通过线程复用、挂起机制和极低的内存消耗，实现了轻量级并发处理，非常适合 Android 开发
```