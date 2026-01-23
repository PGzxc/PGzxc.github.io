---
title: React Native面试题——面试题整理8
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: f5bb1689
date: 2024-03-20 11:15:37
---
## 一 面试题汇总

1. 什么是React？
2. React的特点是什么？
3. 什么是JSX？
4. React中的组件有哪些类型？
5. 什么是props？
6. 什么是state？ <!--more-->
7. 什么是生命周期方法？(React中有哪些生命周期方法？/React Native组件的生命周期)
8. 什么是constructor()方法？
9. 什么是render()方法？
10. 什么是componentDidMount()方法？
11. 什么是shouldComponentUpdate()方法？
12. 什么是componentDidUpdate()方法？
13. 什么是componentWillUnmount()方法？
14. 什么是React Router？
15. React Router中有哪些组件？
16. 什么是Redux？
17. Redux中有哪些核心概念？
18. 如何在React中使用Redux？
19. 什么是React Hooks？
20. React Hooks有哪些？
21. 什么是useState()？
22. 什么是useEffect()？
23. 什么是useContext()？
24. 什么是useReducer()？
25. 什么是useCallback()？
26. 什么是useMemo()？
27. 什么是useRef()？
28. 什么是useImperativeHandle()？
29. 什么是useLayoutEffect()？
30. 什么是useDebugValue()？
31. 什么是React Native？
32. React Native中有哪些核心组件？
33. 什么是React Native CLI？
34. 什么是Expo？
35. 什么是React Native Navigation？

## 二 面试题解答(仅供参考)

### 2.1 什么是React？

```
React 是一个用于构建用户界面的 JavaScript 库。
它由 Facebook 开发并开源，被广泛用于创建单页应用、动态网站以及移动应用（通过 React Native）。

React 的核心思想是：

1.组件化: 
将 UI 拆分成独立、可复用的组件，每个组件管理自身的逻辑和渲染。
这使得代码更易于组织、维护和测试。

2.声明式编程: 
开发者只需描述 UI 的最终状态，React 会自动处理 DOM 的更新。
这与传统的命令式编程（直接操作 DOM）相比，更加简洁高效。

3.虚拟 DOM: 
React 使用虚拟 DOM 来提高性能。
当状态发生变化时，React会先在虚拟DOM中进行比较，然后只更新实际DOM中需要改变的部分，避免不必要的重绘。

4.JSX: 
JSX 是一种 JavaScript 语法扩展，允许开发者在 JavaScript 代码中编写类似 HTML 的结构。
这使得 UI 代码更易于理解和编写。

5.单向数据流: 
数据从父组件传递到子组件，子组件不能直接修改父组件的数据。这使得数据流更加清晰可控，方便调试和维护。

总而言之，React 提供了一种高效、灵活和可维护的方式来构建用户界面。 
它的组件化、声明式编程和虚拟 DOM 等特性，使其成为构建复杂 Web 应用的理想选择。
```

### 2.2 React的特点是什么？

```
React 的主要特点包括：

1.声明式编程: 
你只需要描述 UI 的最终状态，React 会自动处理 DOM 的更新，这使得代码更易于理解和维护。

2.组件化: 
将 UI 拆分成独立、可复用的组件，每个组件管理自身的逻辑和渲染，提高了代码的可维护性和复用性。

3.虚拟 DOM: 
React 使用虚拟 DOM 来提高性能，
通过比较虚拟 DOM 的差异来最小化实际 DOM 的操作，从而减少浏览器重绘和重排。

4.JSX: 
JSX 允许你在 JavaScript 代码中编写类似 HTML 的结构，使得 UI 代码更易于理解和编写。
虽然不是必须的，但它被广泛使用并推荐。

5.单向数据流: 
数据从父组件传递到子组件，子组件不能直接修改父组件的数据，
这使得数据流更加清晰可控，方便调试和维护。

6.跨平台 (React Native): 
使用 React Native 可以用 React 的开发模式构建移动应用，实现 "Learn once, write anywhere"。

7.活跃的社区: 
React 拥有庞大而活跃的社区，这意味着你可以轻松找到学习资源、库和工具。

8.SEO 友好: React 应用可以被搜索引擎很好的索引，因为它能够在服务器端渲染。

这些特点使得 React 成为一个流行且强大的 JavaScript 库，用于构建各种规模和复杂度的用户界面。
```

### 2.3 什么是JSX？

```
JSX 是一种 JavaScript 的语法扩展，它允许你在 JavaScript 代码中编写类似HTML的结构。
JSX 本身不是JavaScript，需要通过Babel等工具编译成标准的JavaScript代码才能在浏览器或Node.js环境中运行。

虽然 JSX 看起来像 HTML，但它实际上会被转换成 JavaScript 对象。例如：

const element = <h1>Hello, world!</h1>;
会被编译成：

const element = React.createElement("h1", null, "Hello, world!");

JSX 的主要优点：
1.更直观: 使用 JSX 编写 UI 代码更直观、更易于理解，尤其对于熟悉 HTML 的开发者来说。
2.类型安全: JSX 可以在编译时进行类型检查，帮助开发者尽早发现错误。
3.提高开发效率: JSX 简化了 UI 代码的编写，提高了开发效率。

虽然 JSX 不是使用 React 的必要条件，但它被广泛使用并推荐，因为它能够提高代码的可读性和可维护性。
许多开发者认为它比纯 JavaScript 更容易编写和理解 React 代码。
```

### 2.4 React中的组件有哪些类型？

```
React 中的组件主要有两种类型：

1.函数组件（Functional Component）：

-使用 JavaScript 的函数来定义组件。
-简洁直观，适合展示型 UI 或者逻辑简单的组件。
-可以使用 React Hooks（如 useState、useEffect）来管理状态和生命周期

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

2.类组件（Class Component）：
-使用 ES6 的类语法来定义组件。
-需要继承 React.Component 或 React.PureComponent。
-以前用来管理状态和生命周期，但随着 Hooks 的引入，逐渐被函数组件取代

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

总结：函数组件更简洁，推荐优先使用；类组件在老项目或特殊场景下可能还会用到。
```


### 2.5 什么是props？

```
Props（Properties，属性） 是 React 组件的固定输入参数，用于在组件之间传递数据。

1.特点
-只读属性：组件接收到的props是不可更改的（immutable），只能由父组件传递，子组件不能直接修改。
-父子通信：父组件通过 props 向子组件传递数据或回调函数，实现组件间通信
-灵活传递：可以传递任意类型的值，如字符串、数字、数组、对象、函数等

2.示例
// 父组件传递 props
function Parent() {
  return <Child name="React Native" />;
}

// 子组件接收 props
function Child(props) {
  return <h1>Hello, {props.name}!</h1>;
}

3.总结：Props 让组件更灵活和可复用，是 React 组件通信的关键机制！
```

### 2.6 什么是state？

```
State（状态） 是 React 组件内部管理的数据，用于控制组件的动态行为和界面更新。

1.特点：
-组件私有：State 由组件自己维护，外部无法直接访问或修改
-可变数据：State 是组件内部可变的数据，一旦改变，组件会自动重新渲染
-触发更新：使用setState（类组件）或useState（函数组件）来更新状态，React会根据新状态重新渲染UI。

2.示例
-函数组件（Hooks）：
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 定义 state

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

-类组件
import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // 定义 state
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 }); // 更新 state
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

3.总结
-Props 让父组件传递数据给子组件，是「外部不可变数据」。
-State 则让组件自己管理数据，是「内部可变数据」
```

### 2.7 什么是生命周期方法？(React中有哪些生命周期方法？/React Native组件的生命周期)

```
生命周期方法是类组件在创建、更新和销毁的过程中，
React 自动调用的一系列方法，方便开发者在不同阶段执行特定逻辑。

1.生命周期的三个阶段：

1.1挂载（Mounting）：组件创建和插入DOM
-constructor：初始化状态和绑定事件。
-static getDerivedStateFromProps：根据 props 更新 state（少用）。
-componentDidMount：组件挂载后调用，常用来做接口请求、订阅事件等。

1.2.更新（Updating）：组件更新时（props 或 state 变化）
-static getDerivedStateFromProps：再次根据 props 更新 state（少用）。
-shouldComponentUpdate：控制组件是否重新渲染，优化性能。
-render：返回 UI 结构，必要方法。
-getSnapshotBeforeUpdate：更新前获取一些信息（如滚动位置）
-componentDidUpdate：更新完成后调用，常用来处理副作用逻辑

1.3.卸载（Unmounting）：组件从 DOM 移除
-componentWillUnmount：组件卸载前调用，常用来清理事件监听或取消请求。

2.函数组件用 Hooks 替代生命周期(在函数组件中，用 useEffect 来管理生命周期逻辑)

import React, { useEffect, useState } from 'react';
function Example() {
  const [count, setCount] = useState(0);

  // 模拟 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    console.log('组件挂载或更新！');
    return () => {
      console.log('组件卸载！');  // 模拟 componentWillUnmount
    };
  }, [count]);  // 依赖项变化时触发

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

3.总结
-类组件用生命周期方法管理组件状态和副作用
-函数组件推荐用 useEffect、useState 替代生命周期，更简洁直观。
```


### 2.8 什么是constructor()方法？

```
constructor()是React类组件中的一个特殊方法，用于初始化组件的状态(state)和绑定事件处理函数。

1.特点
1.1-初始化状态：
--constructor() 方法在组件实例化时调用，通常用来设置组件的初始 state。
--constructor() 必须调用 super(props)，以便正确地初始化父类 React.Component。
1.2-绑定事件:如果需要在类组件中使用事件处理方法，可以在constructor()中绑定this，确保this的指向正确。
1.3-参数：constructor()接受props作为参数，允许你在初始化时访问传递给组件的属性。

2.示例
class MyComponent extends React.Component {
  constructor(props) {
    super(props); // 必须调用父类构造函数
    this.state = { count: 0 }; // 初始化 state

    // 绑定事件
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>增加</button>
      </div>
    );
  }
}

3.总结：
-constructor() 方法主要用于在类组件中初始化 state 和绑定事件处理函数
-但随着 React Hooks 的引入，函数组件成为主流，constructor() 方法通常不再使用。
```


### 2.9 什么是render()方法？

```
render() 是 React 类组件中必须实现的方法，用来描述组件的 UI 结构。
它会返回一个 React 元素（通常是 JSX 语法），该元素将被渲染到屏幕上。

1. 特点
-必须实现：在React类组件中，render()是必须实现的，
其他生命周期方法（如 constructor()、componentDidMount()）是可选的
-返回 UI：render()方法会返回React元素，这些元素通常用JSX语法编写，用来定义UI的结构。
-触发更新：每当组件的state或props改变时，render()方法会重新调用，重新渲染组件。
-纯函数：render()方法应该是纯函数，即它只依赖props和state，不应该直接修改组件的状态或执行副作用操作。

2.示例
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hello, world!" };
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
3.总结
-render() 方法是 React 类组件的核心，用来描述 UI，返回的内容将会显示在页面上。
-每次 state 或 props 改变时，render() 会被重新调用，更新 UI
```

### 2.10 什么是componentDidMount()方法？

```
componentDidMount() 是 React 类组件中的一个生命周期方法，它在组件挂载完成后立即调用。
这个方法常用于执行需要依赖 DOM 或进行异步操作（如网络请求、订阅等）的操作。

1.特点
-组件挂载后调用：componentDidMount()在组件插入 DOM后调用，
确保组件已经准备好，适合进行副作用操作（如获取数据、设置定时器等）
-只调用一次：这个方法只会在组件首次挂载时调用一次，不会在组件更新时重复调用。
-异步操作：它通常用于启动异步操作，比如获取数据或与外部API交互，并在操作完成后更新组件的状态

示例
class MyComponent extends React.Component {
  componentDidMount() {
    console.log('组件已经挂载完成');

    // 例如：进行 API 请求
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });
  }

  render() {
    return (
      <div>
        <h1>My Data</h1>
        {/* 渲染数据 */}
      </div>
    );
  }
}
3. 总结：
componentDidMount()是在组件挂载完成后执行的生命周期方法，适合用来执行数据加载、订阅、设置定时器等操作。
它是处理副作用的理想位置
```

### 2.11 什么是shouldComponentUpdate()方法？

```
shouldComponentUpdate() 是 React 类组件中的一个生命周期方法，用于控制组件是否需要重新渲染。
它在组件的props或state发生变化时被调用，返回一个布尔值（true 或 false），决定组件是否应当重新渲染。

1.特点
-性能优化：
shouldComponentUpdate()方法可以通过比较当前的props和state与下一个props和state，
来判断组件是否需要重新渲染。
如果返回 false，则组件不会重新渲染；如果返回 true，则会继续渲染。

-默认行为：默认情况下，shouldComponentUpdate()返回true，即每当props或state改变时，组件都会重新渲染。
-优化场景：如果组件的更新不会影响其显示内容，可以返回 false 来跳过渲染，避免不必要的性能消耗。

2.示例
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 如果 props 中的 count 变化了，才更新组件
    if (this.props.count !== nextProps.count) {
      return true; // 需要更新
    }
    return false; // 不需要更新
  }

  render() {
    return <div>Count: {this.props.count}</div>;
  }
}

3.总结
-shouldComponentUpdate() 允许开发者控制组件是否应该重新渲染，是优化性能的一个重要方法。
-当组件的 props 或 state 改变时，使用这个方法可以避免不必要的重新渲染。
```

### 2.12 什么是componentDidUpdate()方法？

```
componentDidUpdate() 是 React 类组件中的一个生命周期方法，它在组件更新完成后立即被调用。
这个方法通常用于执行与组件更新相关的副作用操作，比如数据的再次请求、与外部系统同步等。

1. 特点
-更新后调用：
componentDidUpdate()在组件更新完成后（即render()方法调用之后）执行，可以访问更新前后的props和state
-可获取旧的 props 和 state：它接收三个参数：
prevProps: 更新前的 props。
prevState: 更新前的 state。
snapshot: 来自 getSnapshotBeforeUpdate() 方法的返回值（如果存在）
-用于副作用操作：适用于需要基于更新后的数据执行的操作，例如发起新的网络请求或更新外部库的状态。

2.示例
class MyComponent extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    // 如果 props 中的 count 发生变化，执行某些操作
    if (this.props.count !== prevProps.count) {
      console.log('Count updated:', this.props.count);
      // 可以在这里发起新的网络请求或进行其他副作用
    }
  }

  render() {
    return <div>Count: {this.props.count}</div>;
  }
}
3.总结：
componentDidUpdate()方法在组件更新完成后调用，适合用于处理副作用，比如发起API请求或与外部系统同步。
在执行更新逻辑时，可以比较更新前后的 props 和 state，确保只在必要时触发操作
```

### 2.13 什么是componentWillUnmount()方法？

```
componentWillUnmount() 是 React 类组件中的一个生命周期方法，它在组件卸载前被调用。
这个方法通常用于清理副作用操作，如清除定时器、取消网络请求或解除事件监听等，以防止内存泄漏

1. 特点：
-组件卸载前调用：componentWillUnmount() 在组件从DOM中移除之前调用，适用于进行必要的清理工作
-清理副作用：可以用来清除在组件生命周期内创建的副作用，例如取消订阅、清除定时器、移除事件监听等。
-避免内存泄漏：使用componentWillUnmount()可以确保组件卸载时不留下任何未清理的资源，减少内存泄漏的风险。

2.示例：
class MyComponent extends React.Component {
  componentDidMount() {
    // 假设我们设置了一个定时器
    this.timer = setInterval(() => {
      console.log('Timer running...');
    }, 1000);
  }

  componentWillUnmount() {
    // 清理定时器，防止内存泄漏
    clearInterval(this.timer);
    console.log('Component is being unmounted, timer cleared');
  }

  render() {
    return <div>My Component</div>;
  }
}
3.总结：
componentWillUnmount() 是在组件从页面移除之前调用的方法，
适合用于清理定时器、取消订阅、移除事件监听等副作用，确保组件卸载时资源被正确清理，避免内存泄漏。
```

### 2.14 什么是React Router？

```
React Router 是一个用于React应用的标准路由库，允许在单页面应用（SPA）中实现页面导航和视图切换。
它通过动态更新浏览器的 URL 来控制视图的显示，同时不需要重新加载页面，从而提供流畅的用户体验。

1.特点：
-声明式路由：使用 JSX 来声明路由规则，通过 Route 组件来匹配路径和视图。
-动态视图切换：根据URL变化，自动渲染匹配的组件，实现页面之间的切换。
-历史管理：利用浏览器的历史API（如 history.pushState）来管理URL和状态变化，支持前进、后退等功能。
-嵌套路由：支持路由嵌套，可以定义多级路径来实现复杂的视图结构。
-重定向与导航：可以通过 Redirect 或 useHistory 等方法实现页面重定向和程序化导航。

2.总结：
React Router 是 React 中用来处理视图导航和路由管理的工具，
支持动态渲染和嵌套路由，提供了灵活的路由控制和浏览器历史管理功能，适合开发单页面应用。
```

### 2.15 React Router中有哪些组件？

```
在 React Router 中，常用的组件主要有以下几种，用于实现页面导航、匹配路径、渲染视图等功能：

1.Router 管理路由历史。
2.Route 定义路径和对应的组件。
3.Switch 用于渲染第一个匹配的路由。
4.Link 和 NavLink 用于导航。
5.Redirect 用于重定向。
6.useHistory、useLocation 和 useParams 是常用的 Hook，用于编程式导航和获取路由信息。
```

### 2.16 什么是Redux？

```
Redux 是一个 JavaScript 状态管理库，常用于 React 和其他 JavaScript 应用中，用来管理应用的全局状态。
它通过集中存储应用状态并通过特定的规则来更新状态，帮助开发者更清晰、可预测地管理应用的数据流。

1. 特点
-单一数据源：
Redux使用store（存储）来管理整个应用的状态。所有的状态都集中保存在一个单独的对象中，方便管理和调试。

-只读状态：
应用的状态是只读的，不能直接修改。所有的状态更新必须通过 dispatch 一个 action，这使得状态变化是可预测的。

-纯函数：
状态的更新通过 reducer 函数完成，reducer 是一个纯函数，接收当前状态和 action，并返回新的状态。

-可预测性：
通过 action 来描述“发生了什么”，reducer 决定如何改变状态。
由于 Redux 遵循明确的规则，应用状态的变化是可追溯和可预测的。

-中间件支持：
Redux 提供了中间件机制，可以扩展功能（如日志、异步操作等），
最常用的中间件是 redux-thunk 和 redux-saga。

2.基本概念
-Store：用来存储整个应用的状态
-Action：表示“事件”或“行为”，是一个普通的 JavaScript 对象，描述了发生的事件。
-Reducer：是一个纯函数，决定如何更新应用的状态。
-Dispatch：用来发送 action 来更新状态。
-Subscription：组件可以订阅 store 中的状态变化，当状态变化时会自动重新渲染。

3.总结：
Redux 是一个状态管理库，适用于复杂的应用中，尤其是当多个组件需要共享状态时。
通过中心化状态和不可变的状态更新机制，Redux 帮助开发者管理全局状态，并使得应用的行为更易于预测和调试。
```

### 2.17 Redux中有哪些核心概念？

```
Redux 中有几个核心概念，它们帮助管理应用状态，并且使得状态的更新更加可预测和可调试。
以下是 Redux 的四个核心概念：

1.Store（存储）
-作用：
Store 是 Redux 的中心，存储着应用的整个状态（state）。
应用中只有一个单一的 store，通过它来管理整个应用的状态。
-特点：只有通过 dispatch 一个 action 才能改变 store 中的状态。

2.Action（动作）
作用：
Action 是一个普通的 JavaScript 对象，用来描述发生了什么。
它必须包含一个type属性，通常还会包含一些额外的数据（payload），传递给reducer来更新状态。

3.Reducer（减少器）
-作用：
Reducer 是一个纯函数，接收当前的状态和 action，并返回一个新的状态。
它是唯一负责更新 state 的地方。
Reducer 会根据 action 的 type 来决定如何改变状态。
-特点：Reducer 是一个纯函数，不直接修改传入的 state，而是返回一个新的状态对象。

4. Dispatch（派发）
-作用：
dispatch 是用于发送 action 的方法。
当用户交互或事件发生时，调用dispatch将action发送给reducer，从而触发状态更新。


总结：
Store：存储应用的状态。
Action：描述发生的事件，是更新状态的“指令”。
Reducer：接收 action 和当前状态，返回新的状态。
Dispatch：发送 action 来触发状态更新。

这四个核心概念共同作用，保证 Redux 中的状态变化是可预测的，且在整个应用中统一管理。
```

### 2.18 如何在React中使用Redux？

```
在 React 中使用 Redux 主要分为以下几个步骤，包含了设置 Redux 的 store，
创建 actions 和 reducers，以及将这些与 React 组件连接在一起。

1-过程
1.1-步骤 1：安装 Redux 及相关库(首先，安装redux和react-redux（用于连接React和Redux）)
npm install redux react-redux
1.2-步骤 2：创建 Redux 的 Store、Actions 和 Reducers
-1.2.1-创建 Action：用于描述事件或用户操作
// actions.js
export const increment = () => ({
  type: 'INCREMENT',
});

export const decrement = () => ({
  type: 'DECREMENT',
});
-1.2.2-创建 Reducer：处理状态更新的逻辑。
// reducer.js
const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export default counterReducer;
-1.2.3 创建 Store：使用 createStore 创建 Redux store，传入 reducer
// store.js
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(counterReducer);

export default store;
1.3 步骤 3：使用 Provider 包裹应用
react-redux 提供了Provider组件，用来将Redux store提供给整个应用。通常在应用的根组件中使用它。
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter'; // 一个需要访问 Redux 状态的组件

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default App;
1.4步骤 4：连接组件与 Redux（使用 connect）

react-redux 提供了 connect 高阶组件来将 Redux 状态和 dispatch 方法传递给 React 组件。
// Counter.js
import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';

const Counter = ({ count, increment, decrement }) => {
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

// 映射 Redux 状态到组件的 props
const mapStateToProps = (state) => ({
  count: state.count,
});

// 映射 Redux 动作到组件的 props
const mapDispatchToProps = {
  increment,
  decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
1.5 步骤 5：使用 useSelector 和 useDispatch（React-Redux Hook）
如果使用 React 的 Hook，可以使用 useSelector 和 useDispatch 来访问 Redux 状态和派发动作。
// Counter.js (使用 hooks)
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './actions';

const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;

2.总结

1.创建 Actions：定义应用中的各种行为（如增减、登录等）。
2.创建 Reducers：根据 actions 更新应用的状态。
3.创建 Store：用来存储和管理状态。
4.使用 Provider：将 Redux store 提供给整个应用。
5.连接组件与 Redux：
-使用connect或useSelector和useDispatch将Redux状态和dispatch方法传递给Reac 组件。

这样，你就能在 React 中使用 Redux 来管理应用状态了
```

### 2.19 什么是React Hooks？

```
React Hooks 是 React 16.8 版本引入的一个新特性，
它允许在不编写类组件的情况下使用 React 的状态和生命周期功能。
Hooks 使得函数组件拥有了和类组件一样的能力，并且让代码更简洁、可重用。
```

### 2.20 React Hooks有哪些？

```
1.常见的 React Hooks：
1.1-useState
作用：用于在函数组件中声明和管理状态。
示例：const [count, setCount] = useState(0);
useState 返回一个数组，第一个元素是当前状态，第二个元素是更新状态的函数。

1.2-useEffect
作用：用于处理副作用，例如数据获取、订阅、DOM 操作等，类似于类组件中的生命周期方法
（如 componentDidMount、componentDidUpdate、componentWillUnmount）。
示例：
useEffect(() => {
  // 组件挂载时执行
  console.log('Component mounted');
  return () => {
    // 组件卸载时执行
    console.log('Component unmounted');
  };
}, []);  // 空数组表示只在组件挂载和卸载时触发

1.3-useContext
作用：用于访问 React 的 Context 数据，避免了在组件层级中手动传递 props。
示例：const value = useContext(MyContext);

1.4-useReducer
作用：类似于 useState，但更适合处理复杂的状态逻辑，通常用于管理多个子状态或复杂状态更新的场景。
示例：const [state, dispatch] = useReducer(reducer, initialState);

1.5-useCallback
作用：用于记住一个函数实例，避免函数在每次渲染时重新创建，优化性能。
示例：
const memoizedCallback = useCallback(() => {
  console.log('Callback function');
}, []);  // 空数组表示函数只会在初次渲染时创建

1.6-useMemo
作用：用于记住计算结果，避免不必要的重复计算，优化性能。
示例：const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

1.7-useRef
作用：用于访问 DOM 元素或保持对某个值的引用，它不会导致组件重新渲染。
示例：const inputRef = useRef(null);

2.总结
-React Hooks 使得函数组件可以使用状态和生命周期方法，不再需要类组件。
-常用的 Hooks 包括：
useState（管理状态）、
useEffect（处理副作用）、
useContext（使用上下文）、
useReducer（复杂状态管理）、
useCallback、
useMemo（性能优化）、
useRef（引用）。
```

### 2.21 什么是useState()？

```
1-概念
useState() 是React中的一个 Hook，用于在函数组件中添加状态管理功能。
它让函数组件能够拥有和类组件一样的状态能力，允许你声明状态变量并提供一个函数来更新它。

2.语法
useState() 的语法：const [state, setState] = useState(initialState);

-state：当前状态的值。
-setState：更新状态的函数，用于修改 state 的值。
-initialState：初始状态的值，可以是任何类型（例如字符串、数字、对象、数组等）

3. useState() 的工作原理：
-useState 允许你在函数组件中声明一个状态变量，并为其提供一个初始值。
-useState 返回一个数组，第一个元素是当前的状态值，第二个元素是更新该状态的函数。
-调用 setState 更新状态时，React 会重新渲染组件并更新状态。

4.示例
import React, { useState } from 'react';

const Counter = () => {
  // 使用 useState 声明一个名为 count 的状态，初始值为 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
    </div>
  );
};
export default Counter;

在这个例子中：
-useState(0) 用于初始化 count 的值为 0。
-setCount 是更新 count 状态的函数，每次点击按钮时，setCount 会被调用来更新状态，从而导致组件重新渲染。

5.总结
-useState() 是 React 中用于管理状态的 Hook，它使得函数组件能够拥有内部状态并更新这些状态。
-通过 useState，你可以在组件中维护和管理动态数据，确保组件的可交互性和更新能力。
```

### 2.22 什么是useEffect()？

```
1-概念
useEffect() 是 React 中的一个 Hook，用于处理副作用（side effects）。
副作用包括数据获取、事件监听、订阅、手动修改 DOM 等操作，
这些操作通常不直接影响组件的渲染结果，但需要在某些特定时机执行。

2-useEffect() 的语法
useEffect(() => {
  // 你的副作用代码
}, [dependencies]);

-副作用函数：useEffect 接收一个函数，这个函数会在组件渲染后执行，处理副作用。
-依赖数组：
useEffect 的第二个参数是一个数组，表示副作用函数的依赖项。
当依赖项发生变化时，副作用函数会重新执行。
如果数组为空 []，则副作用函数只会在组件挂载和卸载时执行。

3.useEffect() 的工作原理：
-组件挂载时执行副作用：组件渲染后，useEffect 中的副作用函数会被执行
-依赖项变化时重新执行：如果 useEffect 的依赖项发生变化，副作用函数会再次执行。
-清理副作用：
如果副作用函数返回一个清理函数，该清理函数会在组件卸载或依赖项变化时执行，
用于清理之前的副作用（例如取消订阅、清除定时器等）。

4.示例
4.1-基本用法
import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);

  // 每秒更新一次 time
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // 清理定时器
    return () => clearInterval(timer);
  }, []);  // 空数组表示只在组件挂载时执行一次

  return <p>Timer: {time} seconds</p>;
};

export default Timer;

在这个例子中，useEffect 用来设置一个定时器，每秒更新一次 time 状态。当组件卸载时，定时器会被清理。

4.2-依赖项变化时执行：
import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState('https://api.example.com/data');

  // 每次 url 改变时获取数据
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);  // 依赖 url，url 改变时重新执行副作用

  return (
    <div>
      <p>{data ? JSON.stringify(data) : 'Loading...'}</p>
      <button onClick={() => setUrl('https://api.example.com/newData')}>
        Change URL
      </button>
    </div>
  );
};

export default DataFetcher;
在这个例子中，useEffect 会在 url 变化时重新发起数据请求。

5.总结
useEffect() 是一个非常重要的 Hook，用于处理副作用。
它可以在组件挂载时执行某些操作，也可以在组件卸载时进行清理。
通过依赖项，useEffect还能精确控制副作用的执行时机，
帮助开发者处理各种常见的副作用任务，如数据获取、事件监听等。
```

### 2.23 什么是useContext()？

```
1-概念
useContext() 是 React 中的一个 Hook，用于在函数组件中访问 Context 的值。
它让我们可以轻松地共享和传递组件树中的数据，避免了层层传递 props 的麻烦。

2.什么是 Context？
React 的 Context 提供了一种方式，让我们能够在组件树中传递数据，而不需要显式地通过每一级的 props 传递。
通过 Context，可以使数据在组件树中的任何地方都能被访问到。

3.useContext() 的语法：const value = useContext(MyContext);
-MyContext：是一个由 React.createContext() 创建的 Context 对象
-value：是我们通过 useContext 获取的值，通常是在 Provider 中提供的值。

4.如何使用 useContext()？
4.1-创建 Context： 首先，使用 React.createContext() 创建一个 Context 对象
const MyContext = React.createContext(defaultValue);
4.2-提供Context值： 使用 MyContext.Provider将Context值提供给组件树中的所有子组件
const App = () => {
  const user = { name: 'John', age: 30 };

  return (
    <MyContext.Provider value={user}>
      <Child />
    </MyContext.Provider>
  );
};
4.3-使用useContext()获取值： 在任何函数组件中，使用useContext()来访问Context的值
const Child = () => {
  const user = useContext(MyContext);
  return <p>{user.name} is {user.age} years old.</p>;
};

5.示例
import React, { useContext } from 'react';

// 创建一个 Context
const ThemeContext = React.createContext('light');

const ThemedComponent = () => {
  // 使用 useContext 获取 Context 值
  const theme = useContext(ThemeContext);
  return <p>The current theme is {theme}</p>;
};

const App = () => {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
};

export default App;
在这个例子中，useContext(ThemeContext)会获取ThemeContext.Provider中提供的值，
ThemedComponent会显示dark。

6.总结：
-useContext() 允许我们在函数组件中直接访问 React Context 的值，简化了跨层级组件间的数据传递。
-它取代了传统的通过 props 一层层传递数据的做法。
-useContext() 是与 Context.Provider 配合使用的，Provider提供值，而useContext在需要的地方获取该值。
```

### 2.24 什么是useReducer()？

```
1.概念
useReducer() 是React中的一个Hook，用于管理复杂的状态逻辑。
它类似于useState()，但它适用于当状态更新逻辑较为复杂，或者有多个子状态需要处理时。
useReducer() 使用的是reducer函数，类似于Redux中的状态管理机制。

2.useReducer() 的语法：const [state, dispatch] = useReducer(reducer, initialState);
-reducer：是一个函数，用于根据当前的 state 和 action 来返回新的状态
-initialState：是状态的初始值。
-state：当前的状态。
-dispatch：用于触发 action，从而更新状态的函数

3.reducer 函数的格式
reducer 函数接收两个参数：当前的 state 和一个 action，并返回一个新的 state
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

4.如何使用 useReducer()：
-定义 reducer 函数：定义一个处理状态变化的 reducer 函数。
-调用 useReducer()：在函数组件中调用 useReducer 来获取 state 和 dispatch。

5. 示例：
import React, { useReducer } from 'react';

// 定义一个 reducer 函数
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const Counter = () => {
  // 使用 useReducer 创建状态
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increase</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrease</button>
    </div>
  );
};

export default Counter;

6.useReducer() 与 useState() 的区别
-seState() 适用于简单的状态更新，只需要存储一个状态值。
-useReducer() 适用于复杂的状态更新，例如需要多个值更新或更新逻辑复杂的场景。

7.总结：
-useReducer() 是一个强大的 Hook，用于管理复杂的状态更新。
-它依赖于一个 reducer 函数来处理状态的变化，类似于 Redux。
-使用 useReducer() 可以帮助我们更清晰地组织和管理多个状态的更新逻辑，特别是在状态之间有相互依赖时
```

### 2.25 什么是useCallback()？

```
1.概念
useCallback() 是 React 中的一个 Hook，用于 缓存 函数实例，避免函数在每次渲染时重新创建。
它主要用于优化性能，
尤其是在函数被传递给子组件或者作为依赖项传递给useEffect或useMemo时，防止不必要的渲染和计算。

2.useCallback() 的语法
const memoizedCallback = useCallback(() => {
  // 你的函数代码
}, [dependencies]);

-memoizedCallback：缓存的函数实例。
-dependencies：
一个数组，只有当数组中的依赖项发生变化时，才会重新创建缓存的函数。
如果数组为空 []，函数只会在组件挂载时创建一次。

3.为什么需要 useCallback()？
-每次组件重新渲染时，所有在组件内部定义的函数都会被重新创建。
-如果这个函数被传递给子组件，可能会导致子组件的重新渲染，即使这个函数并没有变化。
-useCallback() 通过缓存函数，确保函数实例在依赖项不变时不会被重新创建，从而提高性能。

4.示例
import React, { useState, useCallback } from 'react';

const Button = ({ onClick }) => {
  console.log('Button rendered');
  return <button onClick={onClick}>Click me</button>;
};

const Parent = () => {
  const [count, setCount] = useState(0);

  // 使用 useCallback 缓存函数，只有 count 变化时才重新创建
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);  // 这里的依赖为空，表示 handleClick 在组件渲染期间不会重新创建

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default Parent;

-在这个例子中，handleClick 函数被 useCallback 缓存，
-确保它在 count 变化时不会重新创建，这样避免了 Button 组件的不必要重新渲染。

5.什么时候使用 useCallback()？
-当你需要将回调函数传递给深层嵌套的子组件时。
-当回调函数作为 useEffect 或 useMemo 的依赖项时。

6.总结：
-useCallback() 用于缓存函数，避免函数在每次渲染时重新创建，提升性能。
-它只有在指定的依赖项发生变化时才会重新创建函数。
-常用于避免不必要的渲染，特别是在函数被传递给子组件或作为 useEffect 的依赖时。
```

### 2.26 什么是useMemo()？

```
1.概念
useMemo() 是 React 中的一个 Hook，用于缓存计算结果，防止在每次渲染时重复进行昂贵的计算。
它主要用于性能优化，确保只有在依赖项发生变化时才重新计算，而在其他情况下直接返回上一次的计算结果。

2.useMemo() 的语法
const memoizedValue = useMemo(() => {
  // 需要计算的值
  return expensiveComputation();
}, [dependencies]);

-memoizedValue：缓存的计算结果
-dependencies：
一个数组，只有当数组中的依赖项发生变化时，useMemo 才会重新计算值。
如果数组为空 []，则表示只会在组件初次渲染时计算一次。

3.为什么需要 useMemo()？
React 会在每次组件渲染时重新计算所有的变量和函数。
如果计算逻辑非常复杂或者开销较大，可能会影响性能。
useMemo() 通过缓存计算结果，确保只有在依赖项变化时才重新执行计算，避免了不必要的性能开销。

4.示例：
import React, { useState, useMemo } from 'react';

const ExpensiveComponent = ({ number }) => {
  const [count, setCount] = useState(0);

  // 使用 useMemo 缓存计算结果
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return number * 2;
  }, [number]);  // 只有 number 改变时才重新计算

  return (
    <div>
      <p>Expensive value: {expensiveValue}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
};

export default ExpensiveComponent;
在这个例子中，expensiveValue 是通过 useMemo 缓存的计算结果。
只有 number 发生变化时，expensiveValue 才会重新计算，而 count 的变化不会影响它

5. 什么时候使用 useMemo()？
-当有性能开销较大的计算时，使用 useMemo() 可以避免不必要的重新计算。
-当依赖项较为复杂，且需要确保计算结果只在某些特定情况下更新时。

6. 总结：
-useMemo() 用于缓存计算结果，避免在每次渲染时重复执行昂贵的计算。
-它仅在依赖项发生变化时才会重新计算，否则会直接返回上次的缓存结果。
-适用于优化性能，特别是当计算过程复杂且影响组件渲染时。
```

### 2.27 什么是useRef()？

```
1.概念
useRef() 是 React 中的一个 Hook，用于创建一个可以在组件的整个生命周期中保持不变的可变引用对象。
它通常用于访问 DOM 元素或者存储某些在渲染间持久化的数据，而不触发组件的重新渲染。

2.useRef() 的语法:const ref = useRef(initialValue);
-ref：返回一个包含 .current 属性的对象。.current 属性用来存储你希望保持的值
-initialValue：useRef 的初始值，通常用来初始化 .current

3.useRef() 的用途：
-访问 DOM 元素：可以使用 useRef() 获取对 DOM 元素的引用。
-存储不需要触发重新渲染的数据：
用来保存某些变量或数据，这些数据不需要在每次渲染时更新，但需要在不同渲染之间保持。

4.如何使用 useRef()
4.1 访问DOM元素：使用useRef()获取对DOM元素的引用，可以直接访问该元素，进行操作（如聚焦、滚动等）
import React, { useRef } from 'react';

const FocusInput = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();  // 聚焦到输入框
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus the input</button>
    </div>
  );
};

export default FocusInput;
在这个例子中，useRef创建了一个对input元素的引用，
点击按钮时，调用inputRef.current.focus()使输入框获得焦点。

4.2-存储跨渲染的数据：useRef()还可以用于存储一些不需要更新视图的值，例如保存上次的状态或记录上次的计时器ID
import React, { useState, useRef, useEffect } from 'react';

const Timer = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;  // 在每次渲染后更新上一次的 count 值
  }, [count]);

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Timer;
在这个例子中，prevCountRef 用来存储 count 的上一个值，它不会导致组件重新渲染。

5. 总结
-useRef() 是 React 中用于创建可变引用的 Hook。
-它有两个主要用途：访问和操作 DOM 元素和存储不会触发组件重新渲染的值。
-与useState 不同，useRef的值变更不会导致组件重新渲染，因此适用于跨渲染保存数据或访问DOM元素的场景
```

### 2.28  什么是useImperativeHandle()？

```
1.概念
useImperativeHandle()是React中的一个Hook，
通常与forwardRef()一起使用，用于在父组件中暴露子组件的特定实例值。
它允许子组件控制暴露给父组件的 ref，而不是直接暴露整个组件实例。

2.useImperativeHandle() 的语法：
useImperativeHandle(ref, () => {
  return {
    // 你希望暴露给父组件的属性或方法
  };
}, [dependencies]);

-ref：来自父组件的 ref，这个 ref 会被暴露给父组件
-回调函数：返回一个对象，包含要暴露给父组件的属性或方法
-dependencies：当这些依赖项变化时，useImperativeHandle() 会重新暴露新的值

3. 为什么使用 useImperativeHandle()？
-默认情况下，使用 ref 可以直接访问组件的实例。
-通过 useImperativeHandle()，我们可以控制暴露给父组件的实例内容，
避免暴露不必要的实现细节，只暴露需要的 API 或属性。
-这种方式可以提高组件的封装性和可维护性。

4. 如何使用 useImperativeHandle()
-父组件传递 ref 给子组件。
-子组件通过 useImperativeHandle() 暴露特定的属性或方法

5. 示例：
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

// 子组件
const Child = forwardRef((props, ref) => {
  const localRef = useRef();

  // 使用 useImperativeHandle 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      localRef.current.focus();  // 暴露 focus 方法，触发子组件的输入框聚焦
    },
  }));

  return <input ref={localRef} />;
});

// 父组件
const Parent = () => {
  const childRef = useRef();

  const handleClick = () => {
    childRef.current.focus();  // 调用子组件暴露的 focus 方法
  };

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>Focus the input in Child</button>
    </div>
  );
};

export default Parent;
在这个例子中：
-子组件Child使用 useImperativeHandle()暴露了一个focus方法，允许父组件调用该方法来触发输入框的聚焦。
-父组件通过 ref 调用子组件暴露的方法，而不需要直接访问子组件的内部实现。

6.总结：
-useImperativeHandle()用于通过 ref 暴露给父组件的特定实例方法或属性。
-它通常与forwardRef()一起使用，帮助我们封装组件内部实现，只暴露必要的功能，增加组件的可维护性和安全性。
-useImperativeHandle()使得父组件可以在需要时调用子组件的API，而不直接暴露整个组件实例。
```

### 2.29 什么是useLayoutEffect()？

```
1.概念
useLayoutEffect()是React中的一个Hook，与useEffect()类似，它用于在DOM更新后同步执行副作用操作。
不同之处在于，useLayoutEffect() 会在 浏览器绘制之前 执行，而 useEffect() 会在浏览器绘制之后执行。
这个特性使得 useLayoutEffect() 更适合用于一些需要读取 DOM 并同步修改它的场景。

2.useLayoutEffect() 的语法
useLayoutEffect(() => {
  // 你的副作用代码
}, [dependencies]);

-dependencies：与 useEffect() 相同，useLayoutEffect() 也可以接受一个依赖项数组。
只有当数组中的依赖项发生变化时，副作用才会被重新执行。

3.为什么使用 useLayoutEffect()？
useLayoutEffect()在DOM更新后，但浏览器渲染之前执行，因此可以确保在用户看到更新之前对DOM进行更改。
它通常用于以下场景：
-读取 DOM 布局并同步进行修改（例如获取元素的尺寸或位置）
-需要立即在浏览器渲染前进行 DOM 操作的情况

4.与 useEffect() 的区别：
-useEffect() 在浏览器绘制之后执行，可以允许浏览器先完成渲染。
-useLayoutEffect() 在浏览器绘制之前执行，它同步执行副作用操作，适用于需要立即读取和修改DOM的情况。

5.示例：
import React, { useState, useLayoutEffect, useRef } from 'react';

const LayoutEffectExample = () => {
  const [width, setWidth] = useState(0);
  const divRef = useRef();

  // 使用 useLayoutEffect 读取 DOM 并更新状态
  useLayoutEffect(() => {
    const divWidth = divRef.current.offsetWidth;
    setWidth(divWidth);  // 在渲染前更新宽度状态
  }, []);  // 只在组件挂载时执行一次

  return (
    <div>
      <div ref={divRef} style={{ width: '50%' }}>Resize me!</div>
      <p>The width of the box is: {width}px</p>
    </div>
  );
};

export default LayoutEffectExample;
在这个例子中，useLayoutEffect() 用来确保我们在浏览器渲染前读取和更新div的宽度。
这样可以确保在页面渲染时，宽度值是准确的，而不是在渲染完成后才更新。

6.什么时候使用 useLayoutEffect()？
-当你需要在 DOM 更新后、浏览器绘制前执行副作用时，确保用户看到的内容是经过修改后的。
-例如，获取元素的尺寸、位置或应用 CSS 变换等需要在渲染之前立即完成的操作。

7.总结：
-useLayoutEffect()与useEffect()类似，用于执行副作用操作，
但它会在浏览器绘制之前执行，因此它适用于需要同步访问 DOM 并修改它的场景。

-useLayoutEffect() 确保在页面渲染之前进行 DOM 操作，避免页面闪烁或布局问题。
```

### 2.30 什么是useDebugValue()？

```
1.概念
useDebugValue() 是 React 中的一个 Hook，主要用于在 React 开发工具中显示自定义的调试信息。
它通常用于 自定义 Hook 中，帮助开发者在 React DevTools 中查看该 Hook 的值或状态，方便调试和排查问题。

2.useDebugValue() 的语法
useDebugValue(value);
useDebugValue(value, formatter);

-value：你希望展示在 React DevTools 中的调试信息，通常是该自定义 Hook 的状态或者计算值。
-formatter（可选）：一个格式化函数，用于控制如何显示 value。
它接受 value 作为参数，并返回一个格式化后的字符串。

3.为什么使用 useDebugValue()？
-在 React DevTools 中，useDebugValue() 可以帮助开发者看到自定义 Hook 的当前状态或值，
特别是在调试复杂的应用时非常有用。
-它能让开发者更清晰地了解 Hook 的内部数据，而不必通过日志或其他方式打印调试信息。

4.示例
import React, { useState, useEffect, useDebugValue } from 'react';

function useCustomHook() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCount(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // 使用 useDebugValue 显示调试信息
  useDebugValue(count > 5 ? 'High' : 'Low');

  return count;
}

const App = () => {
  const count = useCustomHook();

  return <div>Count: {count}</div>;
};

export default App;
在这个例子中，useDebugValue() 被用来在 React DevTools 中显示 count 的值状态
（当 count 大于 5 时，显示为 'High'，否则为 'Low'）。
你可以在 React DevTools 中看到 useCustomHook 的调试信息，而无需手动打印

5.总结
-useDebugValue() 用于在 React 开发工具中显示自定义 Hook 的调试信息，帮助开发者查看其内部状态或值。
-它可以接受一个格式化函数来定制显示内容，增强调试体验。
-主要用于自定义 Hook 中，帮助开发者调试和理解应用中的复杂逻辑
```

### 2.31 什么是React Native？

```
React Native是一个用于构建原生移动应用程序的React库。
它允许我们使用JavaScript和React构建跨平台的应用程序，并且可以在iOS和Android上运行。
```

### 2.32 React Native中有哪些核心组件？

```
React Native中有以下核心组件：

- View：类似于HTML中的div元素，用于包含其他组件。
- Text：用于显示文本。
- Image：用于显示图像。
- TextInput：用于获取用户输入的文本。
- ScrollView：用于滚动页面。
- FlatList：用于显示列表。
- TouchableOpacity：用于创建可点击的元素。
```

### 2.33 什么是React Native CLI？

```
React Native CLI是React Native的命令行工具，用于创建和管理React Native应用程序。
它允许我们在本地开发环境中构建和运行React Native应用程序。
```

### 2.34 什么是Expo？

```
Expo是一个用于构建React Native应用程序的开发工具和服务平台。
它提供了一些有用的功能，例如快速原型设计、自动构建和发布、设备测试等。
```

#### 2.35 什么是React Native Navigation？

```
React Native Navigation 是一个用于在 React Native 应用中实现页面导航的库。
它提供了高效、灵活的解决方案，帮助开发者实现页面之间的跳转、堆栈管理、标签栏、抽屉菜单等常见的导航模式。
```

## 三 参考

* [2023年最新react面试题总结大全(附详细答案)](https://www.jb51.net/javascript/302190jdy.htm)


