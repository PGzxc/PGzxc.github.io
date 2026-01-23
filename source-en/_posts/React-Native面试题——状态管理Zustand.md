---
title: React Native面试题——状态管理Zustand
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 8d09f0e3
date: 2025-09-08 09:07:33
---
## 一 概述

```
本文介绍：Zustand 常见面试题
```

<!--more-->

## 二 常见面试题及解答

### 2.1 Zustand 是什么？相比 Redux 有什么优势？

```
-Zustand 是一个轻量、无 boilerplate 的 React 状态管理库。
-使用 hooks API，避免繁琐的 action/reducer 模式。
-不依赖 Context API，避免了不必要的 re-render。
-支持中间件（如持久化、订阅日志、异步处理）。
-更小的 bundle size，比 Redux 更简洁
```

### 2.2 Zustand 的核心 API 是什么？

```
-create()：创建 store。
-set()：更新状态。
-get()：获取状态。
-subscribe()：订阅状态变化。
-useStore()：在组件中读取状态。
```

### 2.3 Zustand 的状态更新机制与 Context 有何不同？

```
-React Context：更新会导致所有消费者组件 re-render。
-Zustand：基于订阅（subscribe），只有使用到某个 slice 的组件会更新。
-因此性能更好，避免了大范围无意义的渲染。
```

### 2.4 如何在 Zustand 中实现 **持久化存储**？

```
1、说明
 使用 persist 中间件
 
2、示例
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((s) => ({ count: s.count + 1 }))
    }),
    { name: 'counter-storage' }
  )
)
```

### 2.5 Zustand 如何支持异步操作？

```
1、说明
 在 set 里写异步函数即可（不像 Redux 需要 thunk/saga）
 
2、示例 
const useUserStore = create((set) => ({
  user: null,
  fetchUser: async (id) => {
    const res = await fetch(`/api/user/${id}`)
    const data = await res.json()
    set({ user: data })
  }
}))
```

### 2.6 Zustand 如何避免状态共享冲突？

```
-每个 create 定义的 store 独立，互不干扰。
-可以组合多个 store 或使用 combine。
-也可以通过 slice pattern 模块化管理状态。
```

### 2.7 Zustand 如何进行选择性订阅（selector）？

```
1、示例
const count = useStore((state) => state.count)  

2、说明
 -只有 count 变化时，组件才会更新。
 -避免整个 store 更新时所有组件都重新渲染。
```

### 2.8 Zustand 与 Redux Toolkit 相比，如何选择？

```
-如果项目大规模、多人协作、需要严格数据流规范 → Redux Toolkit。
-如果项目轻量、追求开发效率、React Hooks 风格 → Zustand。
-Redux 更适合复杂中大型应用，Zustand 更适合中小型应用或快速迭代。
```

### 2.9 Zustand 如何在 React Native 项目中使用？

```
1、说明
 -安装后可直接使用，与 Web 一样。
 -常搭配 zustand/middleware/persist 使用 AsyncStorage 实现本地存储
 
2、示例
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({ count: 0, increase: () => set((s) => ({ count: s.count + 1 })) }),
    { name: 'counter', getStorage: () => AsyncStorage }
  )
)
```

### 2.10 Zustand 有哪些常用中间件？

```
-persist → 持久化存储。
-devtools → 集成 Redux DevTools 调试。
-subscribeWithSelector → 精确订阅状态变化。
-immer → 结合 Immer，支持不可变数据写法。
```

