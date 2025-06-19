---
title: React Native面试题——Redux之专项模拟题(5)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
  - Redux
abbrlink: e4b8145
date: 2025-04-12 15:04:05
---
## 一 概述

1. Redux 状态更新为什么要遵循不可变性原则？你在项目中是如何保证的？
2. 请描述 Redux 应用中异步请求的完整流程，包括中间件的作用
3. Redux Toolkit 为什么比传统 Redux 更推荐使用？
4. Redux 中你如何设计复杂表单的数据结构？
5. Redux 状态越来越大，你如何拆分和组织它？<!--more-->
6.  Redux 如何配合 React Navigation 实现页面数据预加载或登录拦截？

## 二 面试题解答(仅供参考)

### 2.1 Redux 状态更新为什么要遵循不可变性原则？你在项目中是如何保证的？

```
1、定义概念：
-Redux 使用纯函数 Reducer，要求返回新的 state 对象；
-不可变性是指不能直接修改原 state，而是复制一个新对象；

2、不可变性好处：
-易于判断状态是否变化（通过引用对比）；
-有助于时间旅行调试、Undo/Redo 实现；
-减少副作用，保持函数纯净；

3、项目实践方案：
-使用 ... 运算符复制数组/对象；
-使用 immer（Redux Toolkit 内置）写“可变代码”实现不可变效果；
-编写 eslint 规则防止 state 被直接修改。
```

### 2.2 请描述 Redux 应用中异步请求的完整流程，包括中间件的作用

```
1、异步请求的常规问题：
React 本身不处理异步状态，需要借助 Redux 中间件管理；

2、引入中间件（如 redux-thunk）作用：
-允许 dispatch 一个函数（而非对象）；
-可在该函数中进行异步请求，完成后再 dispatch 正常 action；

3、流程图描述：

组件 -> dispatch(thunk) -> 异步请求 -> 成功/失败 -> dispatch(action) 
-> Reducer -> 更新 State -> 组件渲染

4、代码举例（fetch list）：
export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_START' });
  try {
    const res = await fetch(...);
    const data = await res.json();
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (e) {
    dispatch({ type: 'FETCH_FAIL', payload: e });
  }
};
```

### 2.3 Redux Toolkit 为什么比传统 Redux 更推荐使用？

```
1、传统 Redux 痛点：
-模板代码太多（reducer、action type、action creator 手动写）；
-配置 store 麻烦；
-异步逻辑管理不统一；

2、Redux Toolkit 优势：
-createSlice 简化 reducer + actions；
-configureStore 自动加上 thunk 和 DevTools；
-createAsyncThunk 管理异步请求；
-内置 immer，代码更简洁；

3、项目中应用情况：
-开发大型应用时结构更清晰；
-与 TS 配合良好；
-官方推荐，用于替代手写模板代码。
```

### 2.4 Redux 中你如何设计复杂表单的数据结构？

```
1、分析表单需求：
-表单字段较多，有嵌套结构；
-涉及字段验证、变更、高亮提示；

2、状态结构建议：
form: {
  fields: {
    name: { value: '', error: '', touched: false },
    age: { value: '', error: '', touched: false },
  },
  isSubmitting: false,
  submitError: null
}

3、处理方式：
-通过统一的 reducer updateField(fieldName, value) 更新字段；
-校验逻辑可在 thunk 或组件中统一触发；
-支持 touched 字段用于高亮错误；
-提交时设置 isSubmitting=true，避免重复点击。
```

### 2.5 Redux 状态越来越大，你如何拆分和组织它？

```
1、拆分原因：
-单一 reducer 文件太庞大；
-模块职责不清晰，影响协作与维护；

2、拆分策略：
-使用 combineReducers 按功能拆分模块；
-每个模块单独负责自己领域的状态和 reducer；

combineReducers({
  auth,
  user,
  cart,
  orders,
});

3、更进一步（RTK）：
-使用 createSlice 模块化创建每个 slice；
-统一在 store.ts 配置 entry reducer，集成中间件；

4、配合类型系统（TS）：
-使用 RootState 类型辅助组件中的 useSelector 获取状态。
```

### 2.6 Redux 如何配合 React Navigation 实现页面数据预加载或登录拦截？

```
1、拦截方案：
-使用 auth.token 判断是否登录；
-在导航层根据权限动态跳转页面（如 Redirect 到 Login）；

2、页面预加载方案：
-在导航进入前使用 thunk dispatch 请求数据；
-也可以放在 useEffect 中触发加载，并通过状态控制加载动画；

useEffect(() => {
  dispatch(fetchUserDetail(userId));
}, []);

3、统一管理导航状态：
-redux 中维护当前页面状态、tab 状态（可选）；
-用于还原场景或实现多窗口导航恢复。
```

## 三 总结

|    技巧点    |                             建议                             |
| :----------: | :----------------------------------------------------------: |
|    条理性    |      答题建议使用 **背景 → 原理 → 实现 → 举例** 四步法       |
|   术语准确   | 使用术语如 reducer、action、middleware、dispatch 等时准确使用，避免泛泛而谈 |
| 强调项目实战 |    每题都可以带一句“我在实际项目中是这样做的…”来拉升深度     |
|   示例代码   |                适当穿插简洁的代码片段，加分项                |
|   对比分析   | 能对比 redux-thunk / saga，context / redux 的场景选择更体现广度 |

