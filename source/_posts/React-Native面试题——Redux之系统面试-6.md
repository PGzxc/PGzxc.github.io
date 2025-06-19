---
title: React Native面试题——Redux之系统面试(6)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
  - Redux
abbrlink: 7bf39b55
date: 2025-04-13 15:04:48
---
## 一 概述

1. 如何在一个 React Native App 中设计 Redux 状态层支持“登录+多角色权限+页面缓存+全局消息弹窗”？
2. Redux 如何应对“复杂异步工作流 + 多 API 串行/并行调度 + 错误回退”？
3. Redux 项目上线后遇到状态不同步或数据丢失问题，你是怎么排查和解决的？
4. Redux 状态暴露在 DevTools 中是否有风险？你如何处理？
5. 封装一个通用的 Redux Toast 模块，用于任何组件全局弹出提示信息。<!--more-->
6.  Redux + React Native 如何实现网络状态丢失时自动缓存请求并重发？

## 二 面试题解答(仅供参考)

### 2.1 如何在一个 React Native App 中设计 Redux 状态层支持“登录+多角色权限+页面缓存+全局消息弹窗”？

```
1、状态结构设计拆分：
{
  auth: {
    token: string,
    role: 'admin' | 'user',
    userInfo: { ... },
  },
  ui: {
    toast: {
      visible: true,
      message: '操作成功',
      type: 'success',
    }
  },
  cache: {
    screenData: {
      Home: { timestamp: 123456789, data: [...] }
    }
  }
}

2、说明权限控制策略：
-基于 auth.role 在路由配置中动态加载可访问模块；
-页面按钮通过权限码或角色判断渲染（如 can('POST_EDIT')）；

3、页面缓存机制：
-利用 Redux 存储页面接口响应；
-加入 timestamp 字段判断是否使用缓存数据或重新拉取；

4、全局 toast 管理：
-使用 ui.toast 模块；
-所有页面可通过 dispatch(showToast({msg, type})) 全局触发；
-结合 setTimeout 自动关闭。
```

### 2.2 Redux 如何应对“复杂异步工作流 + 多 API 串行/并行调度 + 错误回退”？

```
1、答题亮点：
-对于复杂流程（如下单 → 支付 → 通知），推荐使用 redux-saga；
-Saga 提供流程控制（call、put、all、race、retry）；

//示例：
function* submitOrderSaga(action) {
  try {
    const order = yield call(api.createOrder, action.payload);
    yield put({ type: 'ORDER_SUCCESS', payload: order });

    const paymentResult = yield call(api.payOrder, order.id);
    yield put({ type: 'PAYMENT_SUCCESS', payload: paymentResult });

    yield call(api.sendEmail, order.id);
  } catch (e) {
    yield put({ type: 'ORDER_FLOW_FAILED', payload: e });
  }
}

2、 补充：
-使用 retry 自动重试；
-race 做并发控制（如支付超时）；
-使用 finally 语义标识流程结束（如关闭 loading）。
```

### 2.3 Redux 项目上线后遇到状态不同步或数据丢失问题，你是怎么排查和解决的？

```
1、定位场景：
-页面刷新、App 冷启动后状态异常；
-用户操作了状态但未写入持久化存储。

2、排查思路：
-检查是否用了 redux-persist（或 MMKV）；
-排查哪些 reducer 没有加入白名单 / 黑名单配置；
-检查版本号是否迁移导致状态结构变化；
-用 redux-logger 观察 action 是否被正确 dispatch；
-确保 rehydrate 时间点后再访问状态，避免空值访问。

3、优化方案：
-明确哪些模块必须持久化（auth、cart）；
-配合 splash 页面阻断主页面加载直到 rehydrate 完成；
-加入版本检测与 migration 机制防止旧结构导致异常。
```

### 2.4 Redux 状态暴露在 DevTools 中是否有风险？你如何处理？

```
答题点：
1、默认开发环境下 DevTools 显示完整 store 内容，存在：
-用户隐私泄露（如 token、用户信息）；
-安全隐患（攻击者获取内部状态结构）；

2、解决方法：

2.1 生产环境禁用 DevTools：
configureStore({
  devTools: process.env.NODE_ENV !== 'production',
})

2.2 敏感字段脱敏（如 token）：
-使用 middleware 拦截 action/state，做拦截或过滤；
-或 dispatch 仅传业务字段，token 单独存在安全存储中
```

### 2.5 封装一个通用的 Redux Toast 模块，用于任何组件全局弹出提示信息。

```
1、Slice 定义：
const toastSlice = createSlice({
  name: 'toast',
  initialState: { visible: false, message: '', type: 'info' },
  reducers: {
    showToast: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
    },
    hideToast: (state) => {
      state.visible = false;
      state.message = '';
    }
  }
});

2、组件调用：
dispatch(showToast({ message: '登录成功', type: 'success' }));
setTimeout(() => dispatch(hideToast()), 2000);
```

### 2.6 Redux + React Native 如何实现网络状态丢失时自动缓存请求并重发？

```
1、概念
-利用 redux middleware 实现请求“缓存”机制；
-利用 NetInfo（React Native 提供）监听网络变化；
-当网络恢复时 dispatch 队列中的缓存 action；

2、示例
const offlineQueue = [];

const offlineMiddleware = store => next => action => {
  const isOnline = store.getState().network.isOnline;
  if (!isOnline && action.meta?.retryWhenOnline) {
    offlineQueue.push(action);
  } else {
    return next(action);
  }
};

NetInfo.addEventListener(state => {
  if (state.isConnected) {
    while (offlineQueue.length > 0) {
      store.dispatch(offlineQueue.shift());
    }
  }
});
```

## 三 总结、如何练习 Redux 面试体系能力？

|      练习方法      |                             说明                             |
| :----------------: | :----------------------------------------------------------: |
|     自拟小项目     | 自己用 Redux 写一个“表单 + 列表 + 异步加载 + 登录鉴权”小应用 |
|   用白板模拟答题   |              将前面这些题打印出来，每天练 3 道               |
| 查源码理解核心概念 |          建议看 redux-thunk / createSlice 源码结构           |
|  面试前准备答题卡  |             每个知识点写 3 行答法 + 一个代码片段             |

