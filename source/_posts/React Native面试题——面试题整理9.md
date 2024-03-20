---
title: React Native面试题——面试题整理9
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 82bc261f
date: 2024-03-20 15:41:51
---
## 一 面试题汇总

1. React Native相对于原生的ios和Android有哪些优势？
2. React Native的优点和缺点在哪里？
3. 父传子，子传父数据传递方式？
4. 如何实现底部TabBar的高度不一样呢？（类似新浪微博底部加号）
5. 你的项目有没有使用redux或者是mobx来管理数据呢？
6. 请您简单介绍一下redux？dva? mobx？
7. 当你调用setState的时候，发生了什么事？
8. React中Element 和 Component 有何区别？
9. shouldComponentUpdate 应该做什么
10. 描述事件在React中的处理方式
11. reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？
12. 面试中的一道题
13. XSS与CSRF介绍
14. 在使用redux过程中，如何防止定义的action-type的常量重复？

<!--more-->

## 二 面试题解答(仅供参考)

## 2.1 React Native相对于原生的ios和Android有哪些优势？

React Native 相对于原生的 iOS 和 Android 具有以下优势：

1. **跨平台开发**：React Native 允许开发人员使用 JavaScript 构建单个代码库，以跨平台的方式开发应用程序，这意味着可以使用相同的代码库在 iOS 和 Android 上开发应用程序，从而节省时间和资源。
2. **快速开发**：React Native 提供了丰富的 UI 组件库和开发工具，可以快速构建用户界面。同时，使用热加载功能，可以即时预览代码更改的效果，加速开发过程。
3. **性能优化**：React Native 借助底层原生组件实现了高性能，尤其是在处理图形和动画方面。此外，React Native 支持原生代码的集成，可以通过编写原生模块来实现更高的性能要求。
4. **社区支持**：React Native 拥有庞大而活跃的开发者社区，提供了大量的文档、教程和第三方库，方便开发人员解决问题和获取支持。
5. **热更新**：React Native 支持热更新功能，允许在不重新发布应用程序的情况下更新应用程序的部分内容，从而可以更快地修复 bug 和推出新功能。
6. **简化学习曲线**：相对于学习两种完全不同的原生开发技术，React Native 提供了一种更为统一的开发体验，使得前端开发人员可以更快地适应移动应用程序开发。

总的来说，React Native 在跨平台开发、快速开发、性能优化和社区支持等方面具有明显优势，尤其适合中小型团队或需要快速迭代的项目。然而，在某些特定场景下，如对性能要求非常高或需要直接访问硬件功能的应用程序，原生开发仍然是更好的选择。

### 2.2 React Native的优点和缺点在哪里？

React Native 作为一种跨平台移动应用开发框架，有着许多优点和一些缺点。以下是它们的主要特点：

**优点：**

1. **跨平台开发**：React Native 允许开发者使用相同的代码库构建 iOS 和 Android 应用程序，从而节省了开发时间和成本。
2. **快速开发**：React Native 提供了丰富的 UI 组件库和开发工具，可以快速构建用户界面，并通过热加载实时预览代码更改的效果，加速开发过程。
3. **性能优化**：React Native 使用原生组件来实现高性能，尤其是在处理图形和动画方面。同时，可以通过集成原生代码来满足更高的性能需求。
4. **热更新**：React Native 支持热更新功能，允许在不重新发布应用程序的情况下更新应用程序的部分内容，从而可以更快地修复 bug 和推出新功能。
5. **活跃的社区支持**：React Native 拥有庞大而活跃的开发者社区，提供了大量的文档、教程和第三方库，方便开发人员解决问题和获取支持。

**缺点：**

1. **性能问题**：虽然 React Native 在大多数情况下表现良好，但在处理复杂的动画或大量数据时可能会出现性能问题。
2. **不适用于所有应用**：某些需要直接访问硬件功能或对性能要求非常高的应用程序可能不适合使用 React Native，原生开发仍然是更好的选择。
3. **依赖于第三方库**：由于 React Native 是一个开源项目，因此在某些情况下，可能需要依赖于第三方库来解决特定的问题，这可能会增加应用程序的复杂性。
4. **不稳定的 API**：React Native 的 API 可能会在不同版本之间发生变化，这可能会导致一些代码需要频繁更新以适应新的 API。
5. **调试困难**：由于 React Native 应用程序运行在原生容器中，因此调试可能会比较困难，尤其是在处理原生代码和 JavaScript 代码交互时。

### 2.3 父传子，子传父数据传递方式？

```
简答：props state refs 方面回答
```

### 2.4 如何实现底部TabBar的高度不一样呢？（类似新浪微博底部加号）

```
简答：主要考察flex布局绝对定位问题
```

### 2.5 你的项目有没有使用redux或者是mobx来管理数据呢？

Redux 和 MobX 都是流行的状态管理工具，它们可以帮助你在 React Native 项目中有效地管理应用程序的状态和数据流。它们的主要区别在于设计和使用方式：

1. **Redux**：
   - Redux 是一个单向数据流管理库，它使用不可变的状态来管理应用程序的数据。
   - Redux 通过创建一个全局的单一数据源（Store）来存储应用程序的状态，通过 dispatching action 来修改状态。
   - Redux 采用纯函数的方式来处理状态变更，通过 reducers 来处理 action 并更新状态。
   - Redux 的设计理念是通过预测性的数据流来管理应用程序的状态。
2. **MobX**：
   - MobX 是一个响应式状态管理库，它可以使你的应用程序更具可观察性，更易于理解和维护。
   - MobX 的核心概念是可观察对象（Observable）和响应式行为，通过使用装饰器或 observable API 来声明可观察对象。
   - MobX 通过自动追踪对象的属性和计算属性之间的依赖关系，并在相关数据变更时自动更新相关的 UI。

在 React Native 项目中使用 Redux 或 MobX，你需要做以下几个步骤：

1. **安装 Redux 或 MobX**：通过 npm 或 yarn 安装 Redux 或 MobX 及其相关的依赖。
2. **创建 Store**：如果使用 Redux，你需要创建一个 Redux Store 来存储应用程序的状态。如果使用 MobX，则需要创建一个 MobX Store 并声明可观察对象。
3. **定义 Actions 和 Reducers（Redux）或 Actions 和响应式函数（MobX）**：定义用于修改状态的 actions 和 reducers（Redux）或定义响应式函数来更新状态（MobX）。
4. **连接组件**：将你的 React Native 组件连接到 Store，以便能够访问状态并更新它。
5. **使用 Provider（Redux）或 Provider 和 observer（MobX）**：在应用的最顶层使用 Provider（Redux）或 Provider 和 observer（MobX）来将状态管理功能注入到整个应用中。

这些是在 React Native 项目中使用 Redux 或 MobX 的基本步骤，具体实现方式可以根据项目的需求和个人偏好来进行调整和扩展。

### 2.6 请您简单介绍一下redux？dva? mobx？

当然，让我简单介绍一下 Redux、Dva 和 MobX 这三个在 React 生态中常用的状态管理库：

1. **Redux**：
   - Redux 是一个用于 JavaScript 应用程序的可预测状态容器，特别适用于 React 应用程序。
   - Redux 的核心思想是将整个应用程序的状态存储在一个单一的可预测的状态树中（也称为 Store）。
   - Redux 的数据流是单向的，通过派发 actions 来修改状态，然后通过纯函数的 reducers 来处理这些 actions 并更新状态。
   - Redux 强调了可预测性和不可变性，所有的状态修改都是通过纯函数完成的，使得状态变更变得可控和易于调试。
2. **Dva**：
   - Dva 是一个基于 Redux、Redux-saga 和 React-router 的轻量级前端框架，用于简化 React 应用程序的开发。
   - Dva 提供了一种更简洁的方式来组织 Redux 应用程序的代码结构，并且内置了一些常用的功能，如数据异步请求、路由等。
   - Dva 使用了约定优于配置的理念，使得开发者能够更快速地构建出功能完善的 React 应用程序。
3. **MobX**：
   - MobX 是一个简单、可扩展的状态管理库，它允许你以响应式方式来管理应用程序的状态。
   - MobX 的核心概念是可观察对象（Observable）和响应式函数（Reactions），通过使用装饰器或 observable API 来声明可观察对象。
   - MobX 通过自动追踪对象的属性和计算属性之间的依赖关系，并在相关数据变更时自动更新相关的 UI。
   - MobX 的设计理念是让状态管理变得简单、直观，使得开发者能够更专注于业务逻辑的实现。

简而言之，Redux 是一个可预测的状态管理库，Dva 是基于 Redux 的前端框架，而 MobX 是一个简单、可扩展的响应式状态管理库。这三个库都在 React 生态中发挥着重要作用，开发者可以根据项目需求和个人偏好选择适合的库来管理应用程序的状态。

### 2.7 当你调用setState的时候，发生了什么事？

```
当调用 setState 时，React会做的第一件事情是将传递给 setState 的对象合并到组件的当前状态。
这将启动一个称为和解（reconciliation）的过程。
和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新UI。
为此，React将构建一个新的 React 元素树（您可以将其视为 UI 的对象表示）。
一旦有了这个树，为了弄清 UI 如何响应新的状态而改变，React 会将这个新树与上一个元素树相比较（ diff ）。
通过这样做， React 将会知道发生的确切变化，并且通过了解发生什么变化，只需在绝对必要的情况下进行更新即可最小化 UI 的占用空间。
```


### 2.8 React中Element 和 Component 有何区别？

```undefined
简单地说，一个 React element 描述了你想在屏幕上看到什么。
换个说法就是，一个 React element 是一些 UI 的对象表示。
一个 React Component 是一个函数或一个类，
它可以接受输入并返回一个 React element 
(通常是通过 JSX ，它被转化成一个 createElement 调用）。
```

### 2.9 shouldComponentUpdate 应该做什么

```
其实这个问题也是跟reconciliation有关系。
“和解（ reconciliation ）的最终目标是以最有效的方式，根据新的状态更新用户界面”。
如果我们知道我们的用户界面（UI）的某一部分不会改变，
那么没有理由让 React 很麻烦地试图去弄清楚它是否应该渲染。
通过从 shouldComponentUpdate 返回 false，
React 将假定当前组件及其所有子组件将保持与当前组件相同
```


### 2.10 描述事件在React中的处理方式

```
为了解决跨浏览器兼容性问题，
您的 React 中的事件处理程序将传递 SyntheticEvent 的实例，
它是 React 的浏览器本机事件的跨浏览器包装器。

这些 SyntheticEvent 与您习惯的原生事件具有相同的接口，除了它们在所有浏览器中都兼容。
有趣的是，React 实际上并没有将事件附加到子节点本身。
React 将使用单个事件监听器监听顶层的所有事件。
这对于性能是有好处的，这也意味着在更新DOM时，React 不需要担心跟踪事件监听器
```

### 2.11 reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？

```css
this.props.children 的值有三种可能：
    1.当前组件没有子节点，它就是 undefined;
    2.有一个子节点，数据类型是 object ；
    3.有多个子节点，数据类型就是 array 。
系统提供React.Children.map()方法安全的遍历子节点对象
```

### 2.12 面试中的一道题:

问题

```
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
问上述代码中 4 次 console.log 打印出来的 val 分别是多少？
```

答案

```
答案：4 次 log 的值分别是：0、0、2、3。
 （如果想知道到底为什么，可以看另一篇文章，《React中this.setState到底做了什么？》）
```

### 2.13 XSS与CSRF介绍

```
XSS是一种跨站脚本攻击，是属于代码注入的一种，攻击者通过将代码注入网页中，其他用户看到会受到影响(代码内容有请求外部服务器);

CSRF是一种跨站请求伪造，冒充用户发起请求，完成一些违背用户请求的行为(删帖，改密码，发邮件，发帖等)
```

### 2.14 在使用redux过程中，如何防止定义的action-type的常量重复？

```
ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。
Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象
Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
```

## 三 参考

* [简书-React、React Native面试题](https://www.jianshu.com/p/fd4831435b27)


