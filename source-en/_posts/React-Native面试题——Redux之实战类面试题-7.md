---
title: React Native面试题——Redux之实战类面试题(7)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
  - Redux
abbrlink: c52c6a22
date: 2025-04-13 15:05:35
---
## 一 概述

1. 如何用 Redux Toolkit + TypeScript 重构一个已有的 Redux 模块？
2. Redux 状态越来越大，useSelector 性能变差，你怎么优化？
3. Redux 状态怎么进行持久化（持久化策略、字段筛选、安全性）？
4. Redux 状态数据和本地缓存数据冲突时，你如何处理？
5. Redux 与 Context API 有何区别？项目中你如何选择？<!--more-->
6.  Redux + React Native 如何实现网络状态丢失时自动缓存请求并重发？

## 二 面试题解答(仅供参考)

### 2.1 如何用 Redux Toolkit + TypeScript 重构一个已有的 Redux 模块？

```
1、背景：假设原有代码是传统 Redux：

// actions.ts
export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = () => ({ type: FETCH_USERS });

// reducer.ts
function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, loading: true };
    ...
  }
}

2、重构目标：
-简化 action + reducer 编写；
-支持类型推导；
-支持异步请求处理；
-提高模块内聚性；

3、重构步骤(RTK 实现)：使用 createSlice + createAsyncThunk：

interface User {
  id: string;
  name: string;
}

interface UserState {
  list: User[];
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  list: [],
  loading: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await fetch('/api/users');
  return await res.json();
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});
```

### 2.2 Redux 状态越来越大，useSelector 性能变差，你怎么优化？

```
1、问题分析：
-每次 dispatch 后所有 useSelector 都会重新运行；
-如果引用不变，组件也可能无意义更新；

2、优化方案：

2.1 使用 reselect 创建 memoized selector：
const selectCartTotal = createSelector(
  (state: RootState) => state.cart.items,
  (items) => items.reduce((sum, item) => sum + item.price * item.qty, 0)
);
2.2 组件中使用 shallowEqual + memo：
const total = useSelector(selectCartTotal, shallowEqual);

3、只订阅局部状态，避免大组件订阅整个模块。
4、useMemo + memo 包裹子组件，减少渲染层级上的冗余更新。
5、避免大型 JSON 数据直接存 Redux，建议用分页 + ID 引用方式管理数据。
```

### 2.3 Redux 状态怎么进行持久化（持久化策略、字段筛选、安全性）？

```
1、使用 Redux-Persist 实现持久化：

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cart'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

2、字段筛选策略：
-仅持久化必要模块（如登录信息、购物车）；
-将临时状态如 loading、error 排除在外（blacklist）；
-大对象（如数据缓存）使用缓存层或离线数据库（如 MMKV）。

3、版本控制 & 安全性考虑：
-增加 version + migration 机制；
-token 建议不直接放 Redux，而放 secure storage 或 keychain。
```

### 2.4 Redux 状态数据和本地缓存数据冲突时，你如何处理？

```
1、常见冲突场景：
-用户数据已更新但本地缓存未更新；
-持久化恢复后服务端数据已变化；

2、解决策略：
-启动后优先使用本地数据占位（提高渲染速度）；
-后台自动拉取最新数据比对（如 if (remote.updatedAt > local.updatedAt)）；
-避免本地状态持久化过多、过久；
-配合状态时间戳、etag、版本号等机制辅助自动刷新；
-提供“强制刷新”机制：如下拉刷新或点击“同步数据”。
```

### 2.5 Redux 与 Context API 有何区别？项目中你如何选择？

1-对比

|    对比项    |                 Redux                  |                Context API                 |
| :----------: | :------------------------------------: | :----------------------------------------: |
|   设计目的   | 管理复杂状态（多个模块、异步、持久化） |               轻量级状态传递               |
| 状态更新优化 |   高度可控（useSelector + reselect）   | 所有子组件都 re-render（除非 memo 深优化） |
|  中间件支持  |    有丰富的中间件生态（thunk/saga）    |                     无                     |
|  项目复杂度  |              适合大型项目              |           适合小型/局部共享状态            |

2-使用建议

```
-登录信息、主题、语言等轻量状态 → Context；
-异步请求、数据列表、模块划分明显的全局状态 → Redux；
-实际项目建议“搭配使用”：Redux 管数据，Context 管 UI。
```

## 三 总结、Redux 面试高阶答题策略

|   维度   |                             建议                             |
| :------: | :----------------------------------------------------------: |
| 技术知识 | 掌握 Redux、Toolkit、Thunk、Saga、Persist、reselect、Middleware 原理与使用 |
| 架构能力 |           会拆状态结构、按模块组织、设计可扩展方案           |
| 性能优化 | 知道性能瓶颈点及优化方式（memo、selector、分页、持久化粒度） |
| 项目经验 |    用过 Redux 做权限、缓存、WebSocket、表单、购物车等模块    |
| 答题逻辑 |       背景→原理→方案→代码→项目经验，一气呵成，条理清晰       |

