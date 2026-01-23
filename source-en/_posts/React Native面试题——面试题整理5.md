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

|         方法          |        适用场景        |                          优缺点                          |
| :-------------------: | :--------------------: | :------------------------------------------------------: |
|     1. 父组件中转     |   适用于简单组件通信   |  **优点**：简单易用；**缺点**：`props` 传递层级深时麻烦  |
|    2. Context API     | 适用于多层组件共享状态 | **优点**：避免 `props` 层层传递；**缺点**：可能影响性能  |
|  3. Redux / Zustand   |     适用于大型应用     | **优点**：全局管理数据；**缺点**：需要额外库，增加复杂度 |
|      4. 事件总线      |    适用于松耦合组件    |  **优点**：组件间解耦；**缺点**：难以维护，可能导致 Bug  |
| 5. LocalStorage / URL |    适用于数据持久化    |    **优点**：数据可存储；**缺点**：仅适用于持久化需求    |

### 2.3 React 的 refs 有什么了解

```
在 React Native（以及 React）中，refs（引用）用于直接访问 DOM 节点或组件实例。
关于 refs，你可以了解以下几个关键点

1. refs 的作用
-在需要直接操作 DOM 或组件实例的情况下使用 refs，
例如获取组件的值、调用方法、控制焦点、执行动画等。

-适用于无法通过 state 和 props 实现的需求

2. 创建 refs 的方式
React 提供了两种主要的方式来创建 refs

2.1 useRef（函数式组件）

import { useRef, useEffect } from 'react';
import { TextInput } from 'react-native';
const MyComponent = () => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus(); // 组件挂载后自动聚焦
  }, []);

  return <TextInput ref={inputRef} placeholder="输入文本" />;
};
代码说明
-useRef 返回一个可变对象 { current: null }，不会因组件重新渲染而改变。
-适用于存储 DOM 或组件实例的引用。

2.2 createRef（类组件）

import React, { Component, createRef } from 'react';
import { TextInput, Button, View } from 'react-native';
class MyComponent extends Component {
  inputRef = createRef<TextInput>();

  handleFocus = () => {
    this.inputRef.current?.focus();
  };

  render() {
    return (
      <View>
        <TextInput ref={this.inputRef} placeholder="输入文本" />
        <Button title="聚焦输入框" onPress={this.handleFocus} />
      </View>
    );
  }
}
代码说明：createRef 适用于类组件，每次调用 createRef 都会返回一个新的 ref。

3. refs 的使用场景
-操作原生组件（如 TextInput、ScrollView）
-触发组件内部方法（如手动调用 focus()、scrollTo()）
-保存状态但不引发重渲染（如存储计时器 ID）
-与第三方库集成（如访问原生模块）

4. forwardRef 转发 ref
默认情况下，父组件无法直接获取子组件内部的 ref。
如果要让 ref 透传到子组件，需要使用 forwardRef：

import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';

const MyInput = forwardRef<TextInput, any>((props, ref) => {
  return <TextInput ref={ref} {...props} />;
});

export default MyInput;
代码说明：这样，外部组件就可以直接访问 MyInput 内部的 TextInput 实例

5. refs 的注意事项
-尽量少用 refs，避免过度依赖直接操作 DOM/组件实例。
-不要在 render 过程中修改 ref，ref 应该在 useEffect、event handler 等生命周期方法中使用。
-对于函数式组件，推荐使用 useRef，而不是 createRef

6.总结
-refs 允许我们直接访问组件实例或原生 DOM 组件。
-React Native 中常用于 TextInput、ScrollView 等需要手动控制的组件。
-推荐在函数式组件中使用 useRef，在类组件中使用 createRef。
-forwardRef 允许子组件透传 ref 给内部组件。
```

##  三 参考

* [掘金—React Native面试题总结](https://juejin.cn/post/7311602994571853851)



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md1-component-life.png
[2]:images5/rn-interview-md5-redux.png