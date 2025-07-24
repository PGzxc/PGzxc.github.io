---
title: React Native面试题——面试题整理4
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: fc0d5aa2
date: 2024-03-19 15:55:14
---
## 一 面试题汇总

1. Redux遵循的三个原则是什么？
2. 列出 Redux 的组件
3. 如何在 Redux 中定义 Action？
4. 解释 Reducer 的作用
5. Store 在 Redux 中的意义是什么？
6. Redux与Flux有何不同？

## 二 面试题解答(仅供参考)

### 2.1 Redux遵循的三个原则是什么？

```
Redux 是一个用于 JavaScript 应用的状态管理库，它遵循三个核心原则，确保了状态管理的一致性和可预测性。
这三个原则分别是：

1.三个原则

1.1 单一数据源（Single Source of Truth）
Redux 中的整个应用状态存储在一个 单一的 store 中，
这个store是一个JavaScript对象，包含了应用的所有状态。
通过将所有的状态集中到一个地方，
可以确保应用的数据状态在任何时刻都具有一致性，避免了多种状态源可能导致的同步问题。
优点：便于调试和追踪，因为所有状态都集中存储，可以直接查看和操作。

1.2 状态是只读的（State is Read-Only）
唯一能改变应用状态的方法是触发一个action，
这些action是普通的JavaScript对象，其中包含了你想要改变的内容。
当需要修改状态时，不能直接修改 state，而是应该通过 dispatch 一个 action 来请求状态的改变。
优点：确保了状态的变化是可追踪和可预测的，避免了直接修改状态可能带来的不可控后果。

1.3 使用纯函数来修改状态（Changes are Made with Pure Functions）
为了更新应用的状态，Redux 使用 reducer，它是一个纯函数。
纯函数的特点是相同的输入总是会有相同的输出，而且不会产生副作用。
reducer 根据接收到的 action 和当前的 state 计算出新的状态，而不会直接修改原有状态。
优点：确保了状态更新的可预测性和可测试性，因为状态的变化完全由输入的 action 决定，且没有副作用

2.总结：Redux 遵循的三个核心原则是：
-单一数据源：所有的状态存储在一个 store 中。
-状态只读：只能通过 action 来修改状态。
-纯函数更新状态：状态的变化由 reducer 纯函数决定。

这些原则确保了Redux的状态管理系统的可预测性、一致性和可调试性，
使得在大型应用中管理和追踪状态变得更加清晰和可靠。
```

### 2.2 列出 Redux 的组件

```
Redux 主要由以下几个核心组件组成，它们协同工作，帮助管理和更新应用的状态。
以下是 Redux 的几个重要组件：

1.重要组件
1.1 Store（存储）
-Store 是 Redux 中保存应用状态的地方。它是一个对象，包含了应用的所有状
-通过 store，可以获取当前的应用状态、注册监听器以及派发（dispatch）action 来更新状态。

API：
-store.getState()：返回应用当前的状态。
-store.dispatch(action)：用于发送 action，触发状态更新。
-store.subscribe(listener)：注册一个监听器，监听状态变化。

1.2 Action（动作）
-Action 是一个普通的JavaScript对象，描述了发生了什么事情，并传递了状态变化所需的必要信息。
-每个action 都有一个type属性，用于标识 action 的类型，
此外，action 还可以包含其他数据（payload），这些数据是更新状态所需的信息。

const action = {
  type: 'ADD_ITEM',
  payload: { item: 'Apple' }
};

1.3 Reducer（简化函数）
-Reducer 是一个纯函数，用来描述如何根据 action 更新 state。
它接收当前的 state 和 action，并返回一个新的 state。
-Reducer 不会直接修改 state，而是返回一个新的状态对象。

const initialState = {
  items: []
};
const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload.item]
      };
    default:
      return state;
  }
};

1.4 Dispatch（派发）

Dispatch 是用于发送 action 的方法。
通过 dispatch，action 会被发送到 Redux store，触发相应的 reducer 更新状态。
store.dispatch({
  type: 'ADD_ITEM',
  payload: { item: 'Apple' }
});

1.5 Subscribe（订阅）
Subscribe 用于监听 state 的变化。
每当 Redux 中的状态发生变化时，已订阅的监听器会被触发。

store.subscribe(() => {
  console.log(store.getState());
});

2.总结：Redux 中的核心组件包括：
-Store：保存应用状态，提供获取、更新状态的功能。
-Action：描述应用中发生的事情，是一个普通的 JavaScript 对象。
-Reducer：是一个纯函数，根据 action 返回新的状态。
-Dispatch：用来派发 action，触发状态更新。
-Subscribe：监听 state 变化，当状态改变时触发回调函数。

这些组件协同工作，确保应用状态的统一管理和更新
```

### 2.3 如何在 Redux 中定义 Action？

```
在Redux中，Action是一个普通的JavaScript对象，它包含了type和payload（可选）来描述发生的事件或行为。
type 是一个字符串，表示 action 的类型，payload 是附加的数据，用来传递给reducer更新状态。

1.定义 Action 的一般步骤如下：
1.1 定义 Action Type
-Action Type 是字符串常量，用于标识不同类型的 action。
-通常，action type 会大写，使用常量或者枚举的形式进行定义，避免拼写错误。

// 定义 Action Type
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';


1.2 创建 Action Creator
-Action Creator是一个函数，返回一个action对象。
它封装了创建 action 的逻辑，可以传递必要的数据（如 payload）。
--通常会创建 action creators 来生成具体的 action，避免手动创建 action 对象。

// Action Creator
const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item
});

const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id
});

1.3 使用 Action Creator 派发 Action
在组件中，可以通过dispatch方法来派发action，通常dispatch会与connect或useDispatch 一起使用。

import { useDispatch } from 'react-redux';
import { addItem } from './actions';
const MyComponent = () => {
  const dispatch = useDispatch();
  
  const handleAddItem = (item) => {
    dispatch(addItem(item)); // 派发 Action
  };

  return (
    <button onClick={() => handleAddItem('Apple')}>Add Item</button>
  );
};

1.4 Action 对象的结构
一个标准的 Redux action 对象应该至少包含 type 属性。
其他数据（如 payload）是可选的，可以根据需要传递。
{
  type: 'ADD_ITEM',
  payload: {
    id: 1,
    name: 'Apple'
  }
}

2.总结:在 Redux 中定义 Action 一般包括以下步骤：
-定义 Action Type：通常是大写的常量，代表不同的操作类型。
-创建 Action Creator：通过一个函数返回具体的 action 对象，封装 type 和 payload。
-派发 Action：在组件中使用 dispatch 触发 action，更新状态。

通过这种方式，Redux 使得 action 的定义和管理变得更加清晰和可维护。
```

### 2.4 解释 Reducer 的作用

```
1.作用
在 Redux 中，Reducer 是一个纯函数，用于指定如何根据 action 来更新应用的状态。
Reducer 接收两个参数：当前的状态（state） 和 要执行的动作（action），并返回一个新的状态。

Reducer 的主要作用是根据传入的action类型以及payload 来计算和更新新的状态，而不是直接修改原来的状态。
它确保了状态管理的不可变性（immutability）

2.Reducer 的基本特征：
-纯函数：
Reducer 必须是一个纯函数，意味着对于相同的输入（state 和 action），
它应该总是返回相同的输出，而不会产生副作用。

-不修改原始状态：
Reducer 返回的新状态应该是一个全新的对象，不能直接修改原始状态对象。
这样可以保证状态的不可变性，确保状态变更可追踪。

-返回新的状态：
Reducer 根据当前的状态和 action 返回一个新的状态对象，而不是修改现有的状态。
```

### 2.5 Store 在 Redux 中的意义是什么？

```
1.Redux的意义
在 Redux 中，Store 是一个中心化的存储容器，用于管理应用的状态。
它是 Redux 的核心组件之一，负责存储整个应用的状态，并提供了更新状态和订阅状态变化的方法。
简而言之，Store 就是 Redux 用来保存和管理应用状态的地方。

2.Store 的主要功能：
2.1 保存应用的状态：
-Store是Redux的唯一状态源，它保存了应用的所有状态数据。
整个应用的状态是一个JavaScript对象，存储在 Redux 的 store 中。
-通过 store.getState()，你可以访问当前的应用状态

2.2 提供 dispatch 方法来派发 Action：
-dispatch 是Store的一个方法，用来发送（或派发）action到Reducer，从而触发状态的更新。
-通过 dispatch(action)，你可以通知 Redux 应用进行状态更新，之后Reducer 会计算并返回新的状态。


2.3 订阅状态的变化：
-Store 允许你注册监听器来订阅状态变化。
每当 Redux 中的状态发生变化时，已经注册的监听器会被触发，通常你可以用来更新 UI。
-通过 store.subscribe(listener)，你可以在状态变更时执行某些逻辑，比如重新渲染组件。

2.4 避免状态分散：
Redux中的状态保存在一个全局的Store中，避免了多种状态分散的情况，使得应用的状态管理更加一致和可控。

3.总结
在 Redux 中，Store 的作用是作为应用状态的中心存储，它保存了所有的状态，
并提供了 dispatch、getState 和 subscribe 等方法来管理和访问状态。
通过集中管理状态，Store 使得应用状态的一致性、可预测性和可调试性得到了增强。
```

### 2.5 Redux与Flux有何不同？

1-概念

```
Redux 和 Flux 都是用于管理前端应用状态的架构模式，尤其适用于大型复杂应用的状态管理。
虽然它们在很多方面有相似之处，但在实现方式和一些设计理念上有所不同。

下面是它们的主要区别：

1.单一状态树（State Tree）
1.1 Redux：
Redux 强调有一个 单一的全局状态树，所有的状态都保存在一个根 store 对象中。
通过一个统一的 store 来管理应用的所有状态。这使得状态管理更加简洁，便于调试和维护。

示例
const store = Redux.createStore(rootReducer);
const state = store.getState();  // 获取整个应用的状态

1.2 Flux：
Flux 也有单一方向的数据流，但它没有强制要求一个全局的单一状态树。
在 Flux 中，应用的状态通常分散在多个不同的stores中，每个store负责管理一部分状态。

示例
// Flux 中可能有多个 store
store1.getState();
store2.getState();

2. 数据流模型
2.1 Redux：
Redux 实现了一个 单向数据流。
数据流从 Action -> Reducer -> Store，当状态发生变化时，整个应用的状态树被更新。
组件通过 dispatch 来派发 action，并通过 store.getState() 来获取状态。
-Action 是事件的描述。
-Reducer 用来决定如何根据 action 更新 state。
-Store 存储整个应用的状态，并提供 dispatch 和 getState 方法

2.2 Flux：
Flux 也有单向数据流，但数据流的概念相对灵活。
它由 Actions -> Dispatcher -> Stores -> Views 组成。
Flux 中有一个 dispatcher，负责协调各个 store 之间的更新。
这意味着 Flux 会依赖一个全局的 dispatcher 来管理多个 store。

-Actions 描述用户的操作。
-Dispatcher 将 action 分发到所有的 stores。
-Stores 负责持有应用的状态，并监听 dispatcher 发出的 action。

3.Reducer vs. Store

3.1 Redux：
在 Redux 中，Reducer 是纯函数，决定如何更新应用的状态，而 Store 只是一个存储数据的地方。
状态的更新由 action 和 reducer 共同决定，状态管理更加集中和明确。

3.2 Flux：
在 Flux 中，Store 直接管理应用的状态，并且会响应 dispatcher 发出的 action。
每个 store 都管理一部分状态，它们之间没有像 Redux 中 reducer 的明确分工。

4.简化与复杂性
4.1 Redux：
Redux 的设计思想是通过一个简单的单一状态树、纯函数的 reducer 和 不可变状态 来简化状态管理。
由于 Redux 中有明确的单一状态和 reducer 的概念，使用时通常更简洁和可维护，特别是在大型应用中。

4.2 Flux：
Flux 的设计更加灵活，虽然它有多个 store，但是也带来了更多的复杂性。
由于 dispatcher 和 stores 的分离，Flux 更容易处理复杂的交互，但可能使得状态管理的代码结构更加复杂。

5.Middleware（中间件）支持
5.1 Redux：
Redux 提供了中间件机制（如 redux-thunk 或 redux-saga），
允许在 dispatch 和 reducer 之间插入额外的逻辑，处理异步操作和副作用。

5.2 Flux：
Flux 本身没有像 Redux 那样原生支持中间件的机制。
需要开发者自行实现类似的功能。

6.总结
6.1 单一状态树：
-Redux：有一个单一的全局状态树。
-Flux：状态分散在多个 store 中。

6.2数据流：
-Redux：数据流较简单，Action -> Reducer -> Store。
-Flux：数据流较复杂，Actions -> Dispatcher -> Stores。

6.3 更新机制：
-Redux：通过 reducer 来处理状态更新，保持纯函数。
-Flux：通过 store 直接管理状态，且需要 dispatcher 协调多个 store。

6.4 简化与复杂性：
-Redux：设计简洁、易于维护，适合大型应用。
-Flux：灵活性高，但在复杂应用中管理多个 store 可能更加复杂。

总的来说，Redux 在 Flux 的基础上做了简化，
尤其是通过单一状态树和 reducer 机制，使得状态管理更加清晰和可维护。
```

2-表格

|              Flux               |             Redux             |
| :-----------------------------: | :---------------------------: |
|    Store 包含状态和更改逻辑     |   Store 和更改逻辑是分开的    |
|          有多个 Store           |        只有一个 Store         |
| 所有 Store 都互不影响且是平级的 | 带有分层 reducer 的单一 Store |
|          有单一调度器           |       没有调度器的概念        |
|      React 组件订阅 store       |      容器组件是有联系的       |
|          状态是可变的           |       状态是不可改变的        |


## 三 参考

* [React Native 面试题](https://peilinghui.github.io/2020/03/20/ReactNative%E9%9D%A2%E8%AF%95%E9%A2%98/)



