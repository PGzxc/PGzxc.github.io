---
title: React Native面试题——面试题整理5
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 8b0a6a34
date: 2024-03-19 16:17:08
---
## 一 面试题汇总

1. setState为什么是异步的？
3. reactJS兄弟组件之间如何通信 <!--more-->
4. React 的 refs 有什么了解

## 二 面试题解答(仅供参考)

## 2.1 setState为什么是异步的？

```
1.说明
在 React 中，setState 是一个异步操作，目的是优化性能并提高用户体验。
虽然在调用 setState 后，你可能期望立即能获取到更新后的状态，但React并不会立即更新组件的状态，
而是将状态更新操作放入队列中，等待在合适的时机批量执行。


2.原因分析
2.1 性能优化： 
setState 不是同步的，主要是为了提高性能。
React 会将多个 setState 调用合并（批量更新），以减少重新渲染的次数。
如果每次 setState 都是同步更新状态，组件将频繁进行重新渲染，导致性能下降，特别是在复杂的应用中。

2.2 React 的批量更新机制： 
React 在事件处理、生命周期方法等地方会批量处理状态更新。
这样，多个 setState 调用会被合并成一个更新，从而减少 DOM 的操作，提升性能。
例如，在事件处理函数中，如果调用了多次setState，
React会将这些更新合并成一次操作，然后一起触发重新渲染。

2.3 状态更新的延迟： 
因为 React 是异步更新状态的，所以 setState 不会立即改变当前的状态值。
React 会在下一个事件循环中去处理这些状态更新。
因此，你不能在调用 setState 后立即访问最新的 state。
如果想要确保状态更新后执行某些操作，可以利用 setState 的回调函数。

this.setState({ count: this.state.count + 1 }, () => {
  console.log('State updated:', this.state.count);  // 最新的状态
});

2.4 React 17 之前和之后的行为差异： 
在 React 17 之前，setState 仅在组件的事件处理函数或生命周期方法内是异步的，
而在 JavaScript 的其他地方（例如原生的 setTimeout、setInterval、Promise 等）中是同步的。
从React 17开始，React引入了事件池（event pooling），使得setState在大部分情况下都是异步的。

3.总结：
setState 是异步的，主要是为了提升性能。
React 会通过批量更新和优化渲染流程，减少不必要的 DOM 更新。
这样做可以有效避免频繁的重渲染操作，提高应用的流畅性和响应速度。
如果需要在状态更新后执行某些操作，可以使用 setState 的回调函数。
```

### 2.2 reactJS兄弟组件之间如何通信 

```
1.兄弟组件间通信
在 React 中，兄弟组件直接的通信并不直接支持，因为 React 中的数据流是单向的（父到子）。
但是，可以通过父组件作为桥梁来实现兄弟组件之间的通信。
常见的方式包括：
1.通过父组件进行通信
2.使用 Context API
3.使用状态管理库（如 Redux）

2.兄弟组件间通信详解

2.1 通过父组件进行通信
2.1.1 概念
兄弟组件之间的通信可以通过父组件来实现。
父组件将一个共享的状态或回调函数传递给两个子组件，
当其中一个子组件需要与另一个子组件通信时，可以通过父组件进行数据传递。

2.1.2 步骤：
-父组件保存共享的状态或回调函数。
-父组件将状态或回调函数传递给两个子组件。
-子组件通过调用父组件传递的函数来进行通信。

2.1.3 示例

// 父组件
import React, { useState } from 'react';
import Brother1 from './Brother1';
import Brother2 from './Brother2';

const Parent = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (newMessage) => {
    setMessage(newMessage);
  };

  return (
    <div>
      <Brother1 onMessageChange={handleMessageChange} />
      <Brother2 message={message} />
    </div>
  );
};

export default Parent;

// 兄弟1组件
import React from 'react';

const Brother1 = ({ onMessageChange }) => {
  return (
    <button onClick={() => onMessageChange("Hello from Brother 1!")}>
      Send Message to Brother 2
    </button>
  );
};

export default Brother1;

// 兄弟2组件
import React from 'react';

const Brother2 = ({ message }) => {
  return <h1>{message}</h1>;
};

export default Brother2;
解释：
-父组件Parent将handleMessageChange函数作为props传递给Brother1，
并将message传递给 Brother2。
-Brother1通过调用onMessageChange来更新父组件的状态，从而间接地通知Brother2组件更新内容。

2.2 使用 Context API 进行通信
2.2.1 概念
如果兄弟组件之间的通信不止一次，并且组件层级较深，
可以使用 React Context API 来实现跨层级的通信，避免逐层传递 props

2.2.2 示例
// 创建 Context
import React, { createContext, useState } from 'react';

const MessageContext = createContext();

const Parent = () => {
  const [message, setMessage] = useState("");

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      <Brother1 />
      <Brother2 />
    </MessageContext.Provider>
  );
};

// 兄弟1组件
import React, { useContext } from 'react';
import { MessageContext } from './Parent';

const Brother1 = () => {
  const { setMessage } = useContext(MessageContext);

  return (
    <button onClick={() => setMessage("Hello from Brother 1!")}>
      Send Message to Brother 2
    </button>
  );
};

export default Brother1;

// 兄弟2组件
import React, { useContext } from 'react';
import { MessageContext } from './Parent';

const Brother2 = () => {
  const { message } = useContext(MessageContext);

  return <h1>{message}</h1>;
};

export default Brother2;

2.2.3 解释：
-MessageContext共享了一个message和setMessage，
Brother1和Brother2通过useContext直接访问共享的数据，从而实现兄弟组件之间的通信。
-Brother1 更新 message，而 Brother2 通过 Context 自动接收更新。

2.3 使用状态管理库（如 Redux）
2.3.1 概念
对于较大的应用，使用 Redux 等状态管理库可以更方便地处理跨组件的数据共享和通信。
兄弟组件可以通过 Redux 来共享状态，而不需要通过父组件传递。

2.3.2 步骤：
-使用 Redux 创建一个全局状态存储。
-兄弟组件通过连接到 Redux store 来获取和修改状态。

2.3.3 示例

// Redux action
const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  payload: message,
});

// Redux reducer
const messageReducer = (state = "", action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.payload;
    default:
      return state;
  }
};

export default messageReducer;

// 兄弟1组件
import React from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from './redux/actions';

const Brother1 = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(setMessage("Hello from Brother 1!"))}>
      Send Message to Brother 2
    </button>
  );
};

export default Brother1;

// 兄弟2组件
import React from 'react';
import { useSelector } from 'react-redux';

const Brother2 = () => {
  const message = useSelector(state => state.message);

  return <h1>{message}</h1>;
};

export default Brother2;

2.3.4 解释：
-使用 Redux 管理全局状态，setMessage 用于更新 message。
-Brother1 通过 dispatch 修改 Redux 中的 message，
Brother2 通过 useSelector 获取 Redux 中的最新 message。

3. 总结
-父组件作为桥梁：
通过父组件将数据传递给兄弟组件，或者通过回调函数让兄弟组件相互通信。
-Context API：
对于深层嵌套的组件，使用 Context 可以避免逐层传递 props，轻松实现跨层级组件之间的通信。
-Redux：
对于大型应用，使用Redux等状态管理库可以更方便地管理全局状态，
兄弟组件可以通过Redux来共享状态和实现通信。
```

### 2.3 React 的 refs 有什么了解

```
在 React Native 中，refs（引用）主要用于直接访问组件实例或 DOM 元素（在 React Native 中是原生视图），
让你可以操作它们，比如获取输入框值、控制焦点、触发动画等。
以下是对 refs 的一些关键理解

1. 创建 Refs：
可以使用 useRef（函数组件）或 createRef（类组件）来创建引用

1.1 函数组件（推荐用 useRef）：

import React, { useRef } from 'react';
import { TextInput, Button, View } from 'react-native';
const MyComponent = () => {
  const inputRef = useRef(null);

  const focusInput = () => inputRef.current.focus();

  return (
    <View>
      <TextInput ref={inputRef} placeholder="输入点什么..." />
      <Button title="点击聚焦" onPress={focusInput} />
    </View>
  );
};

1.2 类组件（用 createRef）：

import React, { Component, createRef } from 'react';
import { TextInput, Button, View } from 'react-native';
class MyComponent extends Component {
  inputRef = createRef();

  focusInput = () => this.inputRef.current.focus();

  render() {
    return (
      <View>
        <TextInput ref={this.inputRef} placeholder="输入点什么..." />
        <Button title="点击聚焦" onPress={this.focusInput} />
      </View>
    );
  }
}

2. Refs 的使用场景

-获取原生组件实例（如 TextInput、ScrollView、Modal 等）。
-控制焦点（focus()、blur()）。
-获取组件值（如 inputRef.current.value）。
-触发动画（Animated、LottieView 等库）。
-强制更新（不推荐，通常用 state）。

3. Forwarding Refs（转发 refs）：
如果你封装了一个组件，想让外部能访问内部的原生视图或方法，可以用 forwardRef

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextInput, Button, View } from 'react-native';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // 暴露 focus 方法给外部调用
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));

  return <TextInput ref={inputRef} {...props} />;
});

const App = () => {
  const customInputRef = useRef(null);

  return (
    <View>
      <CustomInput ref={customInputRef} placeholder="点我聚焦" />
      <Button title="聚焦输入框" onPress={() => customInputRef.current.focus()} />
    </View>
  );
};

4. 注意事项：
-避免滥用 refs：多数场景用 state 和 props 是更合适的。
-不能在函数组件直接用 createRef：要用 useRef。
-不能操作函数组件的实例：refs 只能用于类组件或原生组件，函数组件需要用 forwardRef。
```

##  三 参考

* [掘金—React Native面试题总结](https://juejin.cn/post/7311602994571853851)



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md1-component-life.png
[2]:images5/rn-interview-md5-redux.png