---
title: React Native面试题——Redux之高级面试题(2)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
  - Redux
abbrlink: f7b9afef
date: 2025-04-12 15:01:45
---
## 一 概述

1. 如何优化 Redux 应用的性能？
2. Redux 的 dispatch 是同步还是异步？
3. redux-thunk 和 redux-saga 有什么区别？分别适用于什么场景？
4. Redux 中的状态是如何流转的？内部机制是怎样的？
5. Redux Toolkit 是什么？为什么推荐使用？<!--more-->
6. 如何自定义 Redux 中间件？
7. 如何处理多个 Reducer 共享状态的场景？
8. Redux 中的不可变性（immutability）为什么重要？如何实现？
9. Redux 与 MobX 有什么区别？
10. 如果 Redux 状态很多、Store 过大，如何模块化和可维护？

## 二 面试题解答(仅供参考)

### 2.1 如何优化 Redux 应用的性能？

```
Redux 性能优化常用方式包括：

1、使用 React.memo 和 useSelector 组合：
-useSelector 只会在依赖的 state 变化时触发组件更新；
-结合 React.memo 可避免组件不必要更新。

2、使用 Reselect 创建 Selector：
-Reselect 提供 createSelector，基于输入进行缓存（memoization），避免重复计算。

//示例
import { createSelector } from 'reselect';
const getItems = (state) => state.items;
const getCompletedItems = createSelector(
  [getItems],
  (items) => items.filter(item => item.completed)
);

3、Reducer 拆分合理、保持纯函数；
4、避免过多嵌套 dispatch 或深层嵌套 state 导致性能瓶颈；
5、使用批量 dispatch（如 batch）减少重渲染次数（需配合第三方包）。
```

### 2.2 Redux 的 dispatch 是同步还是异步？

```
Redux 的 dispatch 本质上是同步的，也就是说，action 传递给 reducer 的过程是同步执行的。

但是，配合中间件（如 redux-thunk 或 redux-saga），
可以让我们在 dispatch 前后插入异步逻辑，模拟异步“调度”行为。
```

### 2.3 redux-thunk 和 redux-saga 有什么区别？分别适用于什么场景？

|    项目    |             redux-thunk             |                 redux-saga                 |
| :--------: | :---------------------------------: | :----------------------------------------: |
|  实现原理  | 函数嵌套函数，使用 Promise 实现异步 |        使用 generator 函数处理异步         |
|  上手难度  |        简单，几乎无学习成本         |           学习成本高，语法更复杂           |
| 控制流能力 |       弱，不适合复杂流程控制        |   强，适合复杂任务流程（如取消、轮询等）   |
|  调试能力  |        一般，嵌套多了难追踪         |            好，逻辑清晰、可测试            |
|  应用场景  |      简单的异步请求、表单提交       | 多任务处理、后台同步、动画控制、事件队列等 |

### 2.4 Redux 中的状态是如何流转的？内部机制是怎样的？

```
Redux 内部机制流程如下：

1.用户调用 dispatch(action)；
2.Middleware（如 thunk）会先处理 action，如果是函数则执行；
3.最终传到 reducer；
4.Reducer 接收当前 state 和 action，返回新的 state；
5.Redux 比较新旧 state（一般是引用对比），如有变化，触发 subscribe 通知 UI 层更新；
6.react-redux 的 connect 或 useSelector 接收新的 state 更新组件
```

### 2.5 Redux Toolkit 是什么？为什么推荐使用？

```
Redux Toolkit（RTK）是 Redux 官方推荐的现代化开发工具集，
简化了 Redux 的配置、编码方式和开发效率。

优点包括：

-简化 Store 配置（不再手动配置中间件）；
-使用 createSlice 自动生成 reducer 和 action；
-内置支持 Immer（允许我们在 reducer 中写“可变”代码）；
-自带 redux-thunk 支持异步 action；
-更小的样板代码。

//示例：

import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
```

### 2.6 如何自定义 Redux 中间件？

```
Redux 中间件是一个函数，格式如下：

const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);  // 传递给下一个 middleware 或 reducer
  console.log('next state', store.getState());
  return result;
};

-中间件作用链：dispatch -> middleware1 -> middleware2 -> reducer
-可以通过 applyMiddleware(loggerMiddleware) 添加到 store 中
```

### 2.7 如何处理多个 Reducer 共享状态的场景？

```
可通过以下方式解决：

1.拆分状态结构：将共享状态上提至公共父 reducer；
2.共享 action type：多个 reducer 响应相同 action，根据自己关心的字段处理；
3.组合 reducer 时传递参数：在 reducer 内部处理共享逻辑；
4.使用中间件处理复杂逻辑，如 saga 中处理任务调度和依赖。
```

### 2.8 Redux 中的不可变性（immutability）为什么重要？如何实现？

```
1、Redux 要求状态是不可变的，原因：
-便于比较新旧 state，快速判断是否更新；
-避免副作用，保持 reducer 纯净；
-支持 time travel 和 Undo/Redo 功能。

2、实现方式：
-使用展开运算符（...）拷贝对象或数组；
-使用 immer 自动处理不可变逻辑（Redux Toolkit 默认支持）；

3、示例：
return {
  ...state,
  todos: [...state.todos, newTodo]
}
```

### 2.9 Redux 与 MobX 有什么区别？

|  比较项  |          Redux           |                  MobX                  |
| :------: | :----------------------: | :------------------------------------: |
| 架构设计 |   函数式、显式状态管理   |           响应式、观察者模式           |
| 学习曲线 | 相对陡峭，有一定模板代码 |                容易上手                |
| 状态定义 |   单一 store + reducer   |     类/对象 + observable + action      |
| 可维护性 |  高（可预测、调试方便）  | 中等（依赖自动追踪，有时不易发现 bug） |
|   性能   |    默认比 MobX 更保守    |     MobX 响应式设计，更新粒度更小      |
| 适用场景 |    大型项目、团队协作    |          中小型项目、快速开发          |

### 2.10 如果 Redux 状态很多、Store 过大，如何模块化和可维护？

```
1.使用 combineReducers 分模块管理状态；
2.将每个功能模块抽离为独立的 slice（推荐使用 Redux Toolkit）；
3.创建统一的 store/index.ts 管理入口；
4.通过封装 useAppSelector/useAppDispatch 来统一管理类型；
5.对于异步 action，使用 RTK 的 createAsyncThunk 提高复用和可维护性。
```

