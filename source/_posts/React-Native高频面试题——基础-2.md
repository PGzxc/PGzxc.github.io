---
title: React Native高频面试题——基础(2)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: ff05a1cd
date: 2025-10-10 09:08:21
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
1. React 核心概念：组件（函数/类组件）、Props/State、组件封装
2. 生命周期：Hooks (useEffect/useLayoutEffect)、类组件生命周期
3. 哪些生命周期能 setState？
4. 动画：Animated、Reanimated、LayoutAnimation
5. RN 0.72+ 新架构：Fabric、TurboModules、JSI、Hermes
6. 路由与导航：React Navigation、React Router Native、Wix Navigation
7. 网络请求：Fetch、Axios、React Query
8. 数据存储：AsyncStorage、MMKV、Realm、SQLite、WatermelonDB
9. 启动流程：Native → 加载 JS Bundle → JS Engine → 渲染 UI
```

### 三 面试题解答(仅供参考)

### 3.1 React核心概念

1、什么是组件？函数组件 vs 类组件

```
组件：RN UI 的基本构建块，用于管理状态和渲染视图。
类组件：有 this.state、生命周期方法，适合复杂逻辑，但冗长，逐渐被淘汰。
函数组件：配合 Hooks 管理状态与副作用，更简洁、复用性强，是主流选择。
```

2、Props 和 State 的区别？组件间通信？

```
Props：外部传入、只读、用于配置。
State：组件内部可变、通过 setState 或 useState 更新。
通信方式：父传子（Props）、子传父（回调函数）、跨级/全局（Context、Redux、Zustand）。
```

3、如何封装高复用组件？

```
遵循 单一职责原则：UI 和业务逻辑拆分。
通过 Props 参数化（如 style、onPress、children）。
避免硬编码，封装成可独立文件。
面试常要求写一个自定义按钮组件，体现代码风格与可维护性。
```

4、设计高可复用组件的关键点

```
Props 灵活（可配置行为、可定制样式）。
children 用于组合。
Hooks 提取逻辑（自定义 Hook）。
避免冗余逻辑，保持简洁。
```

### 3.2 生命周期

1、类组件常见生命周期

```
挂载：constructor（初始化）、render、componentDidMount（数据请求）。
更新：shouldComponentUpdate、render、componentDidUpdate。
卸载：componentWillUnmount（清理副作用）。
```

2、Hooks：useEffect vs useLayoutEffect

```
useEffect：异步执行，在渲染后触发（数据请求、订阅），不阻塞 UI。
useLayoutEffect：同步执行，在 DOM/UI 绘制前触发（测量布局、避免闪烁），会阻塞渲染。
```

3、哪些生命周期能 setState？

```
可以：componentDidMount、componentDidUpdate、事件回调。
禁止：render、constructor、componentWillUnmount。
```

4、调用 setState 会发生什么？

```
状态异步更新 → 触发调和与重新渲染。
React 批处理更新以优化性能。
```

5、 setState 的执行机制

```
异步批处理，触发重新渲染。
立即读取不到新值，若依赖旧值需使用函数式 setState。
```

### 3.3 动画

1、RN 动画方式对比

```
Animated：内置，支持 timing、spring，可用 useNativeDriver 提升性能，适合简单动画。
Reanimated：基于 JSI/UI 线程，性能更好，支持复杂手势和物理动画，主流选择。
LayoutAnimation：全局布局过渡，适合列表项增删等简单场景，配置简洁。
```

### 3.4 React Native 版本特性(0.72+)

```
1、核心组件

-Fabric：新渲染器，基于 JSI，支持并发渲染，消除 Bridge 开销。
-TurboModules：原生模块懒加载，支持同步调用。
-JSI (JavaScript Interface)：C++ 层接口，支持 JS 和 Native 直接通信。
-Hermes：轻量级 JS 引擎，启动快、内存占用小。

2、优势

-更高效的 JS ↔ Native 通信（摆脱 Bridge）。
-更快启动和更流畅 UI。
-支持 React 18 特性（如并发渲染、Suspense）。
```

### 3.5 路由与导航

```
1、常见导航库对比

-React Navigation：最流行，基于 JS，灵活，性能稍逊。
-React Router Native：适合 Web + RN 跨端。
-Wix React Native Navigation：原生驱动，性能好，但配置复杂。

2、深度链接

-配置 iOS/Android 的 URL Scheme 或 Universal Links。
-通过 Linking API + React Navigation 实现跳转。
```

### 3.6 网络请求

```
Fetch API：原生支持，轻量，但功能有限。
Axios：支持拦截器、取消请求，常见企业级选择。
React Query / SWR：不只是请求，还负责缓存、重试、后台刷新、乐观更新，更适合复杂数据流。
```

### 3.7 数据存储

```
AsyncStorage：键值对存储，简单轻量，性能较低。
MMKV：C++ 实现，高性能、支持加密，适合高频读写。
Realm：面向对象数据库，支持实时同步，适合大规模离线数据。
SQLite/WatermelonDB：结构化存储，适合大型离线应用。
```

### 3.8 启动流程

```
1、React Native App 启动步骤

-Native 启动（Android Activity / iOS AppDelegate）。
-初始化 RN 环境（ReactInstanceManager / ReactNativeHost）。
-加载 JS Bundle（本地或远程）。
-JS 引擎运行（Hermes/JSC）。
-注册原生模块。
-Fabric 渲染 UI，显示首屏。

2、优化手段

-启用 Hermes。
-减少 JS Bundle 体积，按需加载。
-懒加载模块，预加载关键数据。
-避免大依赖。
```
