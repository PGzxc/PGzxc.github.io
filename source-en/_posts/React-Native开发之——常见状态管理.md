---
title: React Native开发之——常见状态管理
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: b8b516a3
date: 2026-02-23 08:51:31
---
## 一 概述

```
RN 状态管理三大主线：
1.React 官方路线(Context/Hooks)
2.Redux 体系(Redux/RTK)
3.轻量 & 原子化方案(Zustand/Jotai/Recoil)
```

<!--more-->

## 二 常见状态管理

### 2.1 React 官方(必懂)

1-useState

```
1-定位：组件内部状态
const [count, setCount] = useState(0);

2-优点
-最基础
-无依赖

3-缺点
-只能组件内
-无法跨页面

适合：UI 临时状态
```

2-useReducer(Redux 思想起点)

```
function reducer(state, action) {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });

Redux = useReducer + Context
```

3-Context API

```
const StoreContext = createContext(null);

<StoreContext.Provider value={state}>
  <App />
</StoreContext.Provider>

2-优点
-官方
-简单

3-缺点
-容易整棵树重渲染
-不适合复杂业务

小规模共享状态 OK
```

### 2.2 Redux 体系(企业级)

1-Redux(经典)

```
1-核心概念：
Store/Action/Reducer/Middleware

2-现状问题
-boilerplate 爆炸
-手写 action/type

现在已经不推荐直接写
```

2-Redux Toolkit(RTK)

```
现在 RN 里讲 Redux = RTK

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value++;
    },
  },
});

dispatch(counterSlice.actions.increment());

2-优点
-Redux 官方推荐
-写法极简
-内置 immer/thunk
-TypeScript 友好

Redux 正统现代写法
```

3-RTK Query(数据状态王者)

```
const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getUser: builder.query({ query: () => '/user' }),
  }),
});

2-解决
-请求缓存
-loading / error
-自动刷新

服务端状态首选
```

### 2.3 轻量 & 新主流(非常重要)

1-Zustand

```
1-当前 RN 社区最火
const useStore = create(set => ({
  count: 0,
  inc: () => set(state => ({ count: state.count + 1 })),
}));
const count = useStore(state => state.count);

2-优点
-超简单
-无 Provider
-性能好
-TS 体验极佳

3-缺点
无强约束

新项目首选之一
```

2-Jotai(原子化)

```
1-代码
const countAtom = atom(0);
const [count, setCount] = useAtom(countAtom);

2-优点
-原子级更新
-极少重渲染

复杂 UI 状态非常强
```

3-Recoil(Meta 出品)

```
-原子模型
-已停止大力维护 
-新项目不建议
```

### 2.4 异步 & 服务端状态(单独一类)

1-React Query (TanStack Query)

```
1-代码
useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
});

2-特点
-专治请求状态
-缓存 / 失效
-loading / error 自动化

不属于“本地状态”，但极其重要
```

## 三 选型建议

### 3.1 小型 App / 工具

```
useState + Context
```

### 3.2 中型 App(推荐)

```
Zustand + React Query
```

### 3.3 大型 / 企业级

```
Redux Toolkit + RTK Query
```

## 四 RN vs Flutter 对照

|      RN       |           Flutter            |
| :-----------: | :--------------------------: |
|   useState    |           setState           |
|    Context    |       InheritedWidget        |
| Redux Toolkit |       Bloc / Riverpod        |
|    Zustand    |           Riverpod           |
|  React Query  | Riverpod / Bloc + Repository |

