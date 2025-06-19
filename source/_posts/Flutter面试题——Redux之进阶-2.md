---
title: Flutter面试题——Redux之进阶(2)
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
  - Redux
abbrlink: e7b04c4d
date: 2025-04-12 18:45:13
---
## 一 概述

1.  在大型项目中，Redux 状态树应如何拆分管理？
2.  如何避免 Flutter 中 Redux 重建导致的性能问题？
3.  你在实际项目中如何做 Redux 状态的持久化？
4.  Flutter Redux 如何处理多个异步任务（如并发请求/顺序依赖）？
5.  Flutter Redux 中有哪些调试工具？<!--more-->
6.  Redux 中间件的执行顺序？如何组织多个中间件？
7.  Redux 有什么缺点？什么时候不推荐使用 Redux？
8.  Redux 和 Riverpod 的主要区别是什么？
9.  Flutter Redux 中如何进行单元测试？

## 二 面试题解答(仅供参考)

### 2.1 在大型项目中，Redux 状态树应如何拆分管理？

```
1、应将全局 State 拆分成多个子模块，并使用 combineReducers 合并，做到“分而治之”。

2、示例结构：
// 全局 AppState
class AppState {
  final UserState userState;
  final ProductState productState;
  // ...
}

// 分别定义子 reducer
final appReducer = combineReducers<AppState>([
  TypedReducer<AppState, SomeAction>(_userReducer),
  TypedReducer<AppState, OtherAction>(_productReducer),
]);
这样可以避免 reducer 文件过大、职责不清，提升可维护性和复用性。
```

### 2.2 如何避免 Flutter 中 Redux 重建导致的性能问题？

```
Flutter Redux 容易导致 Widget 刷新，优化方案包括：

-使用 StoreConnector 的 distinct: true 参数（需实现 == 和 hashCode）。
-尽量只监听需要的子状态：
StoreConnector<AppState, int>(
  converter: (store) => store.state.counter,
  distinct: true,
  builder: (context, counter) => Text('$counter'),
);
-对 UI 层做拆分，降低刷新范围。
-配合 memoized selector（如 reselect.dart）提高性能。
```

### 2.3 你在实际项目中如何做 Redux 状态的持久化？

```
使用 redux_persist 插件可以实现状态持久化。
原理是通过 middleware 将 state 序列化存储到本地，如 SharedPreferences 或 File。

基本用法：
final persistor = Persistor<AppState>(
  storage: FlutterStorage(), // 本地存储
  serializer: JsonSerializer<AppState>(AppState.fromJson),
);

final store = Store<AppState>(
  reducer,
  initialState: await persistor.load(),
  middleware: [persistor.createMiddleware()],
);
```

### 2.4 Flutter Redux 如何处理多个异步任务（如并发请求/顺序依赖）？

```
1、概念
-并发异步任务：可以在一个 ThunkAction 中 await Future.wait([...])
-顺序异步任务：在一个 thunk 中按顺序执行 await 即可
-若任务复杂建议拆成多个 thunk 或引入 redux_epics（RxDart 支持）

2、示例：
ThunkAction<AppState> loadUserAndPosts = (store) async {
  final user = await getUser();
  store.dispatch(UserLoadedAction(user));

  final posts = await getPosts(user.id);
  store.dispatch(PostsLoadedAction(posts));
};
```

### 2.5 Flutter Redux 中有哪些调试工具？

```
-redux_logging：中间件记录每次 dispatch 的 action 和 state
-remote_devtools：可与 Redux DevTools（浏览器）连接查看 state 变化
-flutter_redux_dev_tools：内置 DevTools UI，可以“时间旅行”回退状态
```

### 2.6 Redux 中间件的执行顺序？如何组织多个中间件？

```
1、Redux 中的中间件是按数组顺序链式调用，先注册的先执行：

final store = Store<AppState>(
  reducer,
  initialState: AppState(),
  middleware: [
    loggingMiddleware,
    authMiddleware,
    thunkMiddleware,
  ],
);

2、建议：
-日志类中间件放最前面（最外层）
-异步处理类（如 thunk）放最后
```

### 2.7 Redux 有什么缺点？什么时候不推荐使用 Redux？

```
1、缺点
-模板代码繁多（Action、Reducer、State、Middleware）
-学习成本高（特别是异步中间件）
-状态更新显式但冗长
-小项目显得笨重

2、不推荐场景：
-页面简单、状态变更不多（推荐使用 Provider、Riverpod、Flutter Hooks）
-状态只涉及局部组件，非全局共享
-对响应式编程有更高需求（建议使用 Bloc、GetX）
```

### 2.8 Redux 和 Riverpod 的主要区别是什么？

|    特性    |               Redux               |             Riverpod             |
| :--------: | :-------------------------------: | :------------------------------: |
|  状态结构  |       单一状态树，结构固定        |         可组合状态，灵活         |
| 副作用处理 |       需中间件（如 thunk）        | 通过 `FutureProvider` 等天然支持 |
| 使用复杂度 | 高（需要 Reducer、Action、Store） |       低（函数式编程方式）       |
|  性能优化  |    需手动 distinct + 拆分监听     |      自动惰性监听，性能优秀      |
|  推荐场景  |            中大型项目             |   中小型项目或响应式需求高场景   |

### 2.9 Flutter Redux 中如何进行单元测试？

```
1、常见测试
-测试 reducer： 因为是纯函数，传入 state + action，验证返回结果是否正确
-测试中间件： 使用 mock store 和 dispatch，判断 action 是否按预期传递
-测试 UI： 可结合 flutter_test、StoreProvider 提供 mock 状态

2、示例测试 reducer：
test('should increment counter', () {
  final state = AppState(counter: 0);
  final newState = counterReducer(state, Actions.Increment);
  expect(newState.counter, 1);
});
```

