---
title: React Native面试题——Redux之源码(9)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
  - Redux
abbrlink: bc2bcc66
date: 2025-04-13 15:06:59
---
## 一 概述

1. Redux 的 createStore 如何实现 subscribe？能监听 action 吗？
2. createAsyncThunk 为什么能自动生成 pending / fulfilled / rejected 三种状态？<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Redux 的 createStore 如何实现 subscribe？能监听 action 吗？

```
答案关键点：
-createStore 内部维护一个 listener 数组；
-调用 store.subscribe(listener) 会 push 一个函数进去；
-每次 dispatch(action) 触发时，执行所有 listener；
-subscribe 监听的是 state 变化，不是具体的 action type；
-如果你想监听 action，可以通过 middleware 实现（例如 redux-logger）。
```

### 2.2 createAsyncThunk 为什么能自动生成 pending / fulfilled / rejected 三种状态？

```
原因解析：

-createAsyncThunk 本质上是一个异步 action creator；
-它返回一个 thunk 函数；
-并自动为你创建了 3 个 action type，如：

'posts/fetch/pending'
'posts/fetch/fulfilled'
'posts/fetch/rejected'

-当你 dispatch(fetchPosts())，RTK 内部：
dispatch({ type: 'posts/fetch/pending' });
try {
  const data = await promise;
  dispatch({ type: 'posts/fetch/fulfilled', payload: data });
} catch (e) {
  dispatch({ type: 'posts/fetch/rejected', error: e });
}

-所以你只需在 extraReducers 中写好 3 个 case 即可。
```

## 三 总结：Redux 面试+实战强化路线图

|   层级   |                   推荐学习与练习内容                   |
| :------: | :----------------------------------------------------: |
| 基础能力 | `createSlice`, `useSelector`, `dispatch`, 状态结构建模 |
| 中阶能力 |  `createAsyncThunk`, `redux-persist`, 多模块状态组织   |
| 高阶能力 |     reselect`, `middleware`, `网络恢复队列`, `Saga     |
| 实战能力 |     异步流处理、权限系统、状态拆分与重置、性能优化     |
| 源码能力 |    createStore`, `applyMiddleware`, `Thunk 实现机制    |

