---
title: React Native面试题——Redux之场景题(4)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
  - Redux
abbrlink: 3d319bbb
date: 2025-04-12 15:03:18
---
## 一 概述

1. 如果你负责开发一个商城 React Native App，请简述 Redux 在购物车模块的设计方案？
2. Redux 如何应对聊天系统中多会话、实时消息更新、已读状态管理？
3. Redux 如何与直播推流/拉流状态管理结合使用？
4. Redux 如何在招聘系统中处理职位筛选与投递状态同步？
5. Redux 如何配合角色权限系统控制不同用户功能？<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 场景一：商城类 App 中 Redux 应用(购物车 / 商品 / 用户)

一、问题

```
场景一：商城类 App 中 Redux 应用（购物车 / 商品 / 用户）
问：如果你负责开发一个商城 React Native App，请简述 Redux 在购物车模块的设计方案？
```

二、答题

```
1、状态结构设计（简洁 & 可维护）：
cart: {
  items: {
    [productId]: {
      id: string,
      name: string,
      price: number,
      count: number
    }
  },
  total: number,
  count: number
}

2、功能点拆解：
-addToCart(product)：增加或新增商品；
-removeFromCart(productId)：减少数量或移除；
-clearCart()：清空购物车；
-applyCoupon(code)：优惠券逻辑。

3、异步逻辑设计（redux-thunk）：
-获取商品详情；
-下单前校验库存；
-提交订单后清空 cart。

4、注意事项：
-所有操作必须保证商品 ID 唯一性；
-所有金额字段处理时避免浮点误差（如统一用整数分/厘）；
-结合 redux-persist 将购物车本地缓存。
```

### 2.2 场景二：即时通讯IM/聊天系统(消息收发、列表更新、未读数)

一、问题

```
场景二：即时通讯IM/聊天系统(消息收发、列表更新、未读数)
问：Redux 如何应对聊天系统中多会话、实时消息更新、已读状态管理？
```

二、答题

```
1、状态结构设计：
chats: {
  byConversationId: {
    "uid_123": {
      messages: [msg1, msg2, ...],
      unreadCount: 5,
      lastMessage: {...}
    }
  },
  currentChatId: "uid_123"
}

2、特点 & 方案：
-消息按会话分组（byId）；
-接收消息由 WebSocket middleware 注入；
-切换会话时，清空该会话未读数；
-输入草稿也可保存在 state（避免切换丢失）。

3、示例处理逻辑：
onSocketMessage(message) {
  const { from, to, content } = message;
  dispatch({ type: 'RECEIVE_MESSAGE', payload: message });

  if (from !== currentChatId) {
    dispatch({ type: 'INCREASE_UNREAD', payload: from });
  }
}

4、已读回执：
在进入 chat 页面时触发 dispatch(readMessages(conversationId))，
并通过 WebSocket 告知对方。
```

### 2.3 场景三：直播类App中Redux应用(房间状态 / 实时互动 / 弹幕)

一、问题

```
场景三：直播类App中Redux应用(房间状态 / 实时互动 / 弹幕)
问：Redux 如何与直播推流/拉流状态管理结合使用？
```

二、答题

```
1、状态结构（示意）：

liveRoom: {
  roomId: string,
  isStreaming: boolean,
  viewers: number,
  danmu: [],       // 弹幕列表
  streamUrl: string,
  error: null
}

2、实现关键：
-进入直播间，dispatch 异步 fetchRoomDetail(roomId)；
-使用 WebSocket 实时接收弹幕 & 人数更新；
-在直播出错时（如断流）设置 error 字段由 UI 自动提示重连；
-离开直播间清空 liveRoom slice。

3、弹幕优化：
-使用 redux middleware + debounce 限制 UI 频繁渲染；
-每条弹幕入列后清理旧的，保持固定长度；
-对弹幕使用 FlatList + inverted 模式渲染。
```

### 2.4 场景四：招聘类App中Redux应用(职位推荐/投递状态/筛选条件)

一、问题

```
场景四：招聘类App中Redux应用(职位推荐/投递状态/筛选条件)
问：Redux 如何在招聘系统中处理职位筛选与投递状态同步？
```

二、答题

```
1、状态结构示意：
jobList: {
  filters: {
    city: '广州',
    category: '前端',
    keyword: ''
  },
  jobs: [...],
  loading: false,
  appliedIds: []  // 已投递职位 ID 列表
}

2、筛选与状态更新：
-用户修改筛选项后立即触发 dispatch(fetchJobs(filters))；
-使用缓存策略避免重复请求相同筛选条件；
-投递成功后 dispatch(addAppliedJob(jobId))，UI 立即高亮职位卡片；
-appliedIds 可做持久化以支持“我投递过的职位”列表查询。
```

### 2.5 场景五：需要权限控制的模块(管理员和普通用户使用不同功能)

一、问题

```
场景五：需要权限控制的模块(管理员和普通用户使用不同功能)
问：Redux 如何配合角色权限系统控制不同用户功能？
```

二、答题

```
1、通用做法：
在 auth 模块中管理登录用户信息及角色：
auth: {
  token: 'abc',
  user: {
    id: 123,
    role: 'admin', // 或 user / guest
    ...
  }
}

2、使用场景：
-控制页面访问（如 admin dashboard）；
-控制按钮是否展示（如“审核”功能）；
-配合 withRole HOC 或条件渲染做权限限制。

3、高级做法（动态路由）：
-根据 role 初始化可访问页面路由（如 react-navigation 动态配置）；
-对于模块权限点（如按钮功能），做权限码校验：

user.permissions = ['POST_ADD', 'POST_EDIT'];
```

## 三 总结：面试高频 Redux 场景建议准备的方向

| 场景类别 |                  推荐准备点                  |
| :------: | :------------------------------------------: |
|  商城类  | 状态扁平化、购物车持久化、提交校验、优惠逻辑 |
| 聊天系统 | WebSocket 中间件、未读消息管理、列表性能优化 |
| 直播系统 |      弹幕优化、断流处理、状态一致性管理      |
| 招聘平台 |     条件筛选缓存、投递状态回写、分页优化     |
| 权限系统 |      role-based UI 控制、权限点系统设计      |

