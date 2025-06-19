---
title: Flutter面试题——Redux之收官(10)
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
  - Redux
abbrlink: 1610a92a
date: 2025-04-13 18:51:19
---
## 一 概述

1.  Redux 架构图(推荐绘制方式)
2.  Redux 技术面试自我介绍模板
3.  推荐 Redux + Flutter 开源项目模板
4.  Redux 面试中的白板题 / 口述设计题
5.  Redux 项目总结展示表(简历或 PPT 用)<!--more-->
6.  Redux vs Riverpod/BLoC 的优劣总结(面试问答准备)
7.  Redux 项目面试提问自测 Checklist

## 二 面试题解答(仅供参考)

### 2.1 Redux 架构图(推荐绘制方式)

```
1、Redux 架构示意图：

[ UI Widget ] 
     ↓ dispatch(Action)
[ Store ]
     ↓  ↙        ↘
[ Reducer ]    [ Middleware ]
     ↓             ↓
[ 新 State ]    [ 异步处理（如请求、导航） ]
     ↓             ↓
[ UI StoreConnector 订阅 ] ←←←←←←←←←←←

你还可以拓展版本加入：
-Firebase / API → Middleware
-Navigation → 自定义 Action 触发跳转
-DevTools → 实时监听 Action/State

2、页面跳转控制图：

[ 用户点击 "进入课程" ]
     ↓
dispatch(NavigateToCoursePageAction)

→ middleware 鉴权校验 → 无权限 → dispatch(ShowNoPermissionDialogAction)
                                → 有权限 → 调用 Navigator 或 RouterDelegate 跳转
```

### 2.2 Redux 技术面试自我介绍模板

```
在多个 Flutter 项目中，
我使用 Redux 管理复杂的全局状态，尤其是在用户登录、权限校验、聊天消息、数据缓存等高交互场景中。
通过 Reducer 拆分、Action 规范、中间件封装异步逻辑，使业务逻辑与 UI 解耦，提升可维护性。

我设计了一套 Redux 模块自动生成模板，
结合 freezed + json_serializable 实现状态不可变建模，
并使用 redux_dev_tools 支持状态调试、时间旅行功能。

同时我对 Redux 的局部持久化、版本迁移、跨平台适配也有完整实践经验，
并曾帮助团队将部分模块平滑迁移至 Riverpod 架构。
```

### 2.3 推荐 Redux + Flutter 开源项目模板

|                             名称                             |                地址                |                 简介                 |
| :----------------------------------------------------------: | :--------------------------------: | :----------------------------------: |
| [flutter_redux_boilerplate](https://github.com/brianegan/flutter_redux_boilerplate) |   Brian Egan 作者维护的经典模板    |       Redux + Thunk + 登录示例       |
| [flutter_firebase_redux](https://github.com/hillelcoren/flutter_redux_firebase) | Invoice Ninja 作者写的实际项目结构 |      Redux + Firebase 真实应用       |
| [flutter_redux_examples](https://github.com/brianegan/flutter_architecture_samples) |        Flutter 架构对比样本        | 包含 Redux、BLoC、ScopedModel 等对比 |
| [redux_devtools_server](https://github.com/zalmoxisus/remotedev-server) |       Redux DevTools 服务端        |     供 Flutter 连接浏览器调试用      |

### 2.4 Redux 面试中的白板题 / 口述设计题

```
你可能会被要求白板画 Redux 状态结构、Action 流程或用代码伪写一个中间件处理器，以下是准备模板：

一、题 1：「设计一个用户登录状态的 Redux 架构，包含状态、Action、Reducer、大致流程」
简答思路：
-LoginRequestAction / LoginSuccessAction / LoginFailureAction
-authReducer 控制 AuthState { isLoading, user, error }
-中间件：拦截 LoginRequest 发起网络请求，成功后 dispatch Success

2、题 2：「如何使用 Redux 管理路由跳转？」
回答方向：
-将导航行为封装成 NavigateToPageAction
-中间件监听跳转类 Action 执行 Navigator.push
-可以结合权限系统，中间件中做拦截控制（未登录 → 跳登录页）
```

### 2.5 Redux 项目总结展示表(简历或 PPT 用)

| 项目模块 |   状态拆分    |     中间件处理      |          UI绑定方式          |        异常处理方式        |
| :------: | :-----------: | :-----------------: | :--------------------------: | :------------------------: |
| 用户模块 |   AuthState   | 登录鉴权、Token刷新 | `StoreConnector` + ViewModel | `ErrorAction` 捕捉统一提示 |
| 聊天模块 |   ChatState   | WebSocket 收发处理  |     Consumer\<ChatState>     |     未读数统计异常提示     |
| 课程模块 |  CourseState  | 请求节流、权限拦截  |  `StoreConnector` 精准绑定   |    Toast+Fallback 数据     |
| 设置模块 | SettingsState |   主题/i18n 切换    |  ThemeProvider + Redux 监听  |         热更新支持         |

### 2.6 Redux vs Riverpod/BLoC 的优劣总结(面试问答准备)

|      维度      |                Redux                |       Riverpod       |          BLoC           |
| :------------: | :---------------------------------: | :------------------: | :---------------------: |
|    学习成本    |              中等偏高               |         中低         |          中等           |
|    状态解耦    |               ✅ 优秀                |        ✅ 更好        |            ✅            |
|  代码模板冗余  | ❌ 偏多（需 Action、Reducer、State） |        ✅ 极少        |           中            |
|    性能调优    |             ✅ 精细控制              |      ✅ 自动优化      |     ✅ 取决实现方式      |
|    调试工具    |        ✅ Redux DevTools 强大        | ☑️ 较弱（需额外工具） |      ☑️ 有 observer      |
|    时间旅行    |             ✅ 原生支持              |          ❌           |            ❌            |
| 中大型项目适配 |             ✅ 非常适合              |     ✅ 适合新项目     | ✅更偏向业务逻辑强的项目 |

## 三 Redux 项目面试提问自测 Checklist（自评用）

```
1.状态是如何划分模块的？是否支持懒加载？
2.Action 命名是否规范？如何追踪异常来源？
3.你是如何实现异步网络逻辑解耦的？中间件粒度如何划分？
4.Redux 状态如何持久化？是否考虑状态版本升级？
5.有没有实现 DevTools 调试？如何定位问题？
6.Redux 与路由、权限、WebSocket 等系统如何集成？
7.有没有与 Riverpod 或 Bloc 共存、迁移的经验？
8.有没有封装自动生成模板，提升团队效率？
```

