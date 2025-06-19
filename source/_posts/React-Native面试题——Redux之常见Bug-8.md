---
title: React Native面试题——Redux之常见Bug(8)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
  - Redux
abbrlink: f2386456
date: 2025-04-13 15:06:18
---
## 一 概述

1. 用户反馈“点击按钮没有响应”，你如何定位 Redux 是否出问题？
2. 某 Redux 模块出现状态污染，多页切换后数据不一致，怎么办？
3. 某页面状态闪一下又变回旧数据，Redux 正常 dispatch 了，怎么办？
4. Redux 中如何调试异步失败的原因？是否推荐统一 error 捕获？<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 用户反馈“点击按钮没有响应”，你如何定位 Redux 是否出问题？

```
排查逻辑（建议按以下思路答）：

1、确认组件是否 dispatch 正确：
-onPress={() => dispatch(doSomething(data))} 是否被触发？
-建议加一个 console.log('clicked') 验证组件响应事件。

2、检查 dispatch 是否发出正确的 action：
-打开 Redux DevTools（或加入 redux-logger）；
-看是否有 type: 'DO_SOMETHING' 的 action 发出。

3、Reducer 是否正确处理了该 action？
-是否拼写错了 type？
-是否返回了新对象？有没有直接修改原 state？

4、状态变化是否反映到 UI？
-useSelector 是否正确读取 state？
-是否依赖了一个 stale 状态（未重新触发渲染）？

5、中间件或异步异常？
-如果用了 thunk / saga，要看是否返回异常 / 未触发正确逻辑；
-可以手动捕获异常 try/catch 查看错误。
```

### 2.2 某 Redux 模块出现状态污染，多页切换后数据不一致，怎么办？

```
这是典型“状态未隔离 / 未重置”问题：

1、排查场景：
-页面 A 和 B 都使用了 userDetail 模块；
-页面 A 打开后进入页面 B，发现展示的是 A 的数据；
-说明公共状态未清空。

2、解决方案：

2.1 进入新页面时清空状态：
useEffect(() => {
  dispatch(clearUserDetail());
  dispatch(fetchUserDetail(id));
}, [id]);

2.2 Redux 中增加 reset reducer：
reset: () => initialState

2.3 考虑“按 ID 存储多页状态”
userDetails: {
  byId: {
    'uid123': { ... },
    'uid456': { ... }
  }
}
页面根据 ID 获取对应状态，避免覆盖污染。
```

### 2.3 某页面状态闪一下又变回旧数据，Redux 正常 dispatch 了，怎么办？

```
高概率是“组件更新早于异步状态更新”或“中间状态未处理”：

1、查看 reducer 是否更新了 loading 状态：
builder.addCase(fetchData.pending, (state) => {
  state.loading = true;
});
若没有 pending case，会造成页面一直用旧状态展示。

2、页面中不要直接依赖 stale 值渲染：
if (loading) return <Loading />;
if (error) return <Error />;
return <DataList data={list} />;

3、组件中使用了错误的依赖（如老的 useEffect([]) 触发）。
4、RTK asyncThunk 有多个请求时注意 race 条件：
引入请求 ID 防止覆盖旧请求：

const currentRequestId = useRef('');
useEffect(() => {
  const reqId = uuid();
  currentRequestId.current = reqId;
  dispatch(fetchSomething()).then(res => {
    if (currentRequestId.current !== reqId) return;
    ...
  });
}, []);
```

### 2.4 Redux 中如何调试异步失败的原因？是否推荐统一 error 捕获？

```
推荐结构（中大型项目）：
1、为每个模块设置 loading / error 字段：
initialState: {
  data: [],
  loading: false,
  error: null
}

2、在 createAsyncThunk 中封装错误处理：
export const fetchSomething = createAsyncThunk(
  'data/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(...);
      if (!res.ok) throw new Error('网络异常');
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

3、在 reducer 中使用 action.payload 统一存错：
.addCase(fetchSomething.rejected, (state, action) => {
  state.error = action.payload;
});

4、UI 层根据 error 显示 toast / 报错弹窗。
```

