---
title: React Native开发之——状态管理Zustand
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: 355a6a0e
date: 2025-09-05 07:48:15
---
## 一 概述

```
本文介绍：
 - React Native 状态管理库Zustand
 -Zustand简单示例
```

<!--more-->

## 二 什么是 Zustand？

### 2.1 概念

```
-Zustand 是一个小巧、快速、可扩展的状态管理库
-使用基于 hooks 的 API，设计上不强制结构，不依赖 Provider 等复杂设置
-它简洁直观，几乎没有样板代码（boilerplate），适合中小型项目或追求开发效率的场景
```

### 2.2 链接地址

```
1、Github地址
https://github.com/pmndrs/zustand

2、官网地址
https://zustand-demo.pmnd.rs/
```

## 三 使用示例

### 3.1 安装方式

```
npm install zustand
# 或
yarn add zustand
```

### 3.2 项目代码

1、创建 Store (useCounterStore.js)

```
// useCounterStore.ts
import { create } from 'zustand'

type CounterState = {
  count: number
  increase: () => void
  decrease: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increase: () => set((s) => ({ count: s.count + 1 })),
  decrease: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

2、App.js或某个页面(布局 + 代码)

```
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native'
import { useCounterStore } from '../store/useCounterStore'

export default function App() {
  
  const { count, increase, decrease, reset } = useCounterStore()

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>📱 Zustand + React Native</Text>
    <Text style={styles.counter}>当前计数：{count}</Text>

    <View style={styles.btnGroup}>
      <Button title="➕ 增加" onPress={increase} />
      <Button title="➖ 减少" onPress={decrease} />
      <Button title="🔄 重置" onPress={reset} />
    </View>
  </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 26,
    marginBottom: 30,
    color: '#333',
  },
  btnGroup: {
    width: '60%',
    gap: 12, // RN >=0.71 才支持 gap
  },
})
```

### 3.3 运行效果

```
打开 app，显示标题和当前计数
点击 增加 / 减少 / 重置 按钮，UI 会自动响应状态更新
```

## 四 使用建议与推荐场景

```
-适合小中型项目 或快节奏 MVP 开发，追求简单开发体验；
-适合需要灵活结构又高性能，但不想引入 Redux 样板代码的场景；
-结合 React Query 管理服务端缓存状态，Zustand 管理本地 app 状态，是常见高效组合；
-可以添加持久化，如 dark mode、用户偏好等持久状态；
-使用 Immer、订阅中间件 提升复杂 state 的可维护性和性能。
```

## 五 小结

```
Zustand 是 React／React Native 生态中一款极简、性能好的状态管理库；
使用直观，性能优异，支持同步与异步更新，也支持持久化；
非常适合现代 RN 项目，能和其他库（如 React Query）完美配合；
社区反馈积极，实用性强，值得一试。
```

