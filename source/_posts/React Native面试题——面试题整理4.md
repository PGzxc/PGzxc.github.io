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

1. 当你调用setState的时候，发生了什么事？
2. setState为什么是异步的？
3. reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？
4. reactJS中和子组件如何通信
5. reactJS兄弟组件之间如何通信
6. Redux中同步 action 与异步 action 最大的区别是什么
7. React 的 refs 有什么了解
8. Redux遵循的三个原则是什么？
9. 列出 Redux 的组件
10. 如何在 Redux 中定义 Action？
11. 解释 Reducer 的作用
12. Store 在 Redux 中的意义是什么？
13. Redux与Flux有何不同？

<!--more-->

## 二 面试题解答(仅供参考)

## 2.1 当你调用setState的时候，发生了什么事？

当调用 setState 时，React会做的第一件事情是将传递给 setState 的对象合并到组件的当前状态。
这将启动一个称为和解（reconciliation）的过程。
和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新UI。
为此，React将构建一个新的 React 元素树（您可以将其视为 UI 的对象表示）。
一旦有了这个树，为了弄清 UI 如何响应新的状态而改变，React 会将这个新树与上一个元素树相比较（ diff ）。
通过这样做， React 将会知道发生的确切变化，并且通过了解发生什么变化，只需在绝对必要的情况下进行更新即可最小化 UI 的占用空间。


### 2.2 setState为什么是异步的？

```
保持内部的一致性，跟props一样；
在许多情况下，setState的同步渲染效率不高，异步可以将几个更新合并，提高效率；
并不仅仅是出于优化方面的考虑，可以利用异步特征去做其他的事，例如你的navigator路由足够快，你跳转到别的页面了，还是能继续执行异步操作
```

setState之后并没有立即更新counter的值，那么如果确保拿到的counter是更新过的呢？有两种解决方法：

1. 利用setState的第二个参数设置回调函数，setState调用后会触发执行这个callback函数

```
add(value){
  this.setState({
    counter: this.state.counter+value
  }, () => {console.log(this.state.counter);});
}
```

2. 利用setTimeout

```
   setTimeout(() => {console.log(this.state.counter)}, 0)
```

   ### 2.3 reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？

this.props.children 的值有三种可能：

```
1.当前组件没有子节点，它就是 undefined;
2.有一个子节点，数据类型是 object ；
3.有多个子节点，数据类型就是 array 。
系统提供React.Children.map()方法安全的遍历子节点对象
```

### 2.4 reactJS中和子组件如何通信

一般是控制子组件的显示状态，可以用改变props，或者调用子组件的方法进行。子组件事件传递给父组件回调就好

### 2.5 reactJS兄弟组件之间如何通信

事件用DeviceEventEmitter、数据传递刷新等用Redux、mobx ,数据库

### 2.6 Redux中同步 action 与异步 action 最大的区别是什么

同步只返回一个普通 action 对象。而异步操作中途会返回一个 promise 函数。当然在 promise 函数处理完毕后也会返回一个普通 action 对象。thunk 中间件就是判断如果返回的是函数，则不传导给 reducer，直到检测到是普通 action 对象，才交由 reducer 处理。

### 2.7 React 的 refs 有什么了解

有助于存储对特定的 React 元素或组件的引用的属性，它将由组件渲染配置函数返回。用于对 render() 返回的特定元素或组件的引用。
以下是应该使用 refs 的情况：

需要管理焦点、选择文本或媒体播放时
触发式动画
与第三方 DOM 库集成

说说redux的特点，mobx的原理，mobx的observable变量，ref有什么作用，react生命周期，react native原理，基本的排序算法、设计模式。

### 2.8 Redux遵循的三个原则是什么？

- 单一数据来源：整个应用的状态存储在单个 store 中的对象/状态树里。单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。
- 状态是只读的：改变状态的唯一方法是去触发一个动作。动作是描述变化的普通 JS 对象。就像 state 是数据的最小表示一样，该操作是对数据更改的最小表示。
- 使用纯函数进行更改：为了指定状态树如何通过操作进行转换，你需要纯函数。纯函数是那些返回值仅取决于其参数值的函数。

### 2.9 列出 Redux 的组件

```
Redux 由以下组件组成：
Action – 这是一个用来描述发生了什么事情的对象。
Reducer – 这是一个确定状态将如何变化的地方。
Store – 整个程序的状态/对象树保存在Store中。
View – 只显示 Store 提供的数据。
```

### 2.10 如何在 Redux 中定义 Action？

React 中的 Action 必须具有 type 属性，该属性指示正在执行的 ACTION 的类型。必须将它们定义为字符串常量，并且还可以向其添加更多的属性。在 Redux 中，action 被名为 Action Creators 的函数所创建。以下是 Action 和Action Creator 的示例：

```
function addTodo(text) {
       return {
                type: ADD_TODO,    
                 text
    }
}
```

### 2.11 解释 Reducer 的作用

```
Reducers 是纯函数，它规定应用程序的状态怎样因响应 ACTION 而改变。
Reducers 通过接受先前的状态和 action 来工作，然后它返回一个新的状态。
它根据操作的类型确定需要执行哪种更新，然后返回新的值。
如果不需要完成任务，它会返回原来的状态。
```

### 2.12 Store 在 Redux 中的意义是什么？

Store 是一个 JavaScript 对象，它可以保存程序的状态，并提供一些方法来访问状态、调度操作和注册侦听器。应用程序的整个状态/对象树保存在单一存储中。因此，Redux 非常简单且是可预测的。我们可以将中间件传递到 store 来处理数据，并记录改变存储状态的各种操作。所有操作都通过 reducer 返回一个新状态。

### 2.13 Redux与Flux有何不同？

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



