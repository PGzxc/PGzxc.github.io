---
title: React Native面试题——面试题整理1
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 8c67ae2d
date: 2024-03-19 09:53:45
---
## 一 面试题汇总

1. React Native相对于原生的ios和Android有哪些优势？
2. React Native组件的生命周期
3. 当你调用setState的时候，发生了什么事？
4. props和state相同点和不同点
5. shouldComponentUpdate 应该做什么  <!--more-->
6. reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？
7. redux状态管理的流程
8. 加载bundle的机制
9. Flex布局
10. 请简述 code push 的原理
11. Redux中同步 action 与异步 action 最大的区别是什么
12. React Native热更新原因和运行机制

## 二 面试题解答(仅供参考)

## 1.React Native相对于原生的ios和Android有哪些优势？

优点：

1.性能媲美原生APP 
2.使用JavaScript编码，只要学习这一种语言 
3.绝大部分代码安卓和IOS都能共用 
4.组件式开发，代码重用性很高 
5.跟编写网页一般，修改代码后即可自动刷新，不需要慢慢编译，节省很多编译等待时间 
6.支持APP热更新，更新无需重新安装APP

缺点： 

1.内存占用相对较高 
2.版本还不稳定，一直在更新，现在还没有推出稳定的1.0版本

## 2.React Native组件的生命周期

![][1]

生命周期 调用次数 能否使用 setSate() 

|      周期名称以及调用次数       | 能否使用 setSate() |
| :-----------------------------: | :----------------: |
| getDefaultProps 1(全局调用一次) |         否         |
|        getInitialState 1        |         否         |
|      componentWillMount 1       |         是         |
|           render >=1            |         否         |
|       componentDidMount 1       |         是         |
|  componentWillReceiveProps >=0  |         是         |
|    shouldComponentUpdate >=0    |         否         |
|     componentWillUpdate >=0     |         否         |
|     componentDidUpdate >=0      |         否         |
|      componentWillUnmount       |         否         |

## 3.当你调用setState的时候，发生了什么事？

1-参考

当调用 setState 时，React会做的第一件事情是将传递给 setState 的对象合并到组件的当前状态。 这将启动一个称为和解（reconciliation）的过程。

 和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新UI。 为此，React将构建一个新的 React 元素树（您可以将其视为 UI 的对象表示）。 一旦有了这个树，为了弄清 UI 如何响应新的状态而改变，React 会将这个新树与上一个元素树相比较（ diff ）。 通过这样做， React 将会知道发生的确切变化，并且通过了解发生什么变化，只需在绝对必要的情况下进行更新即可最小化 UI 的占用空间。

2-ChatGPT

在React Native中，当调用`setState`方法时，会发生一系列操作来更新组件的状态和UI。以下是详细的过程和背后的机制：

### 1. 更新状态对象

当调用`setState`时，React将传入的对象或函数与当前的状态对象合并。这是一个浅合并操作，即新的状态属性会覆盖旧的状态属性，但不会影响未改变的属性。

### 2. 触发重新渲染

`setState`会将组件标记为需要更新。React会在下一次事件循环中调度一次更新。这意味着多个`setState`调用可能会被合并，以提高性能。

### 3. 比较新旧虚拟DOM

在重新渲染过程中，React会调用组件的`render`方法来生成新的虚拟DOM树。然后，React会将新的虚拟DOM与之前保存的虚拟DOM进行比较。这一过程称为“diffing算法”。

### 4. 计算最小变化

React的diffing算法会找出新旧虚拟DOM之间的差异。React会计算出最小的、更改的DOM操作，并创建一个更新补丁（patch）。

### 5. 应用更新补丁

最终，React将更新补丁应用到实际的DOM中。这一过程确保了只有必要的部分被更新，而不是整个DOM树，从而提高了性能。

#### 步骤详细解释：

1. **初始化状态**：`this.state` 被初始化为 `{ count: 0 }`。
2. 调用`setState`：当按钮被点击时，`incrementCount` 方法被调用，它调用了 `this.setState({ count: this.state.count + 1 })`。
3. **合并状态**：`setState` 将新的状态 `{ count: 1 }` 与当前状态 `{ count: 0 }` 合并，得到新的状态 `{ count: 1 }`。
4. **触发重新渲染**：React 标记这个组件需要更新并调度重新渲染。
5. **调用`render`方法**：React 调用 `render` 方法生成新的虚拟DOM。
6. **比较虚拟DOM**：React 将新的虚拟DOM与旧的虚拟DOM进行比较，找出不同点（在这个例子中，文本节点的内容从 `0` 变成 `1`）。
7. **更新实际DOM**：React 应用最小的更改，将文本节点的内容从 `0` 更新到 `1`。

### 总结

在React Native中，调用`setState`会触发以下关键步骤：

1. 合并新的状态与当前状态。
2. 标记组件需要更新并调度重新渲染。
3. 通过`render`方法生成新的虚拟DOM。
4. 比较新旧虚拟DOM以计算最小的变化。
5. 将这些变化应用到实际的DOM或原生UI中。

这种高效的更新机制是React性能良好的关键所在。通过diffing算法和批量更新，React确保了UI的更新尽可能快和流畅。

## 4.props和state相同点和不同点

相同点：

1.不管是props还是state的改变，都会引发render的重新渲染。 
2.都能由自身组件的相应初始化函数设定初始值。

不同点 ：

1.初始值来源：state的初始值来自于自身的getInitalState（constructor）函数；props来自于父组件或者自身getDefaultProps（若key相同前者可覆盖后者）。
2.修改方式：state只能在自身组件中setState，不能由父组件修改；props只能由父组件修改，不能在自身组件修改。
3.对子组件：props是一个父组件传递给子组件的数据流，这个数据流可以一直传递到子孙组件；state代表的是一个组件内部自身的状态，只能在自身组件中存在。

## 5.shouldComponentUpdate 应该做什么

其实这个问题也是跟reconciliation有关系。
“和解（ reconciliation ）的最终目标是以最有效的方式，根据新的状态更新用户界面”。
如果我们知道我们的用户界面（UI）的某一部分不会改变，
那么没有理由让 React 很麻烦地试图去弄清楚它是否应该渲染。
通过从 shouldComponentUpdate 返回 false，
React 将假定当前组件及其所有子组件将保持与当前组件相同

## 6.reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？

this.props.children 的值有三种可能：

1.当前组件没有子节点，它就是 undefined; 
2.有一个子节点，数据类型是 object ；
3.有多个子节点，数据类型就是 array 。 

系统提供React.Children.map()方法安全的遍历子节点对象

## 7.redux状态管理的流程

![][2]

action是用户触发或程序触发的一个普通对象。
reducer是根据action操作来做出不同的数据响应，返回一个新的state。
store的最终值就是由reducer的值来确定的。（一个store是一个对象, reducer会改变store中的某些值）
action -> reducer -> 新store -> 反馈到UI上有所改变。

## 8.加载bundle的机制

要实现RN的脚本热更新，我们要搞明白RN是如何去加载脚本的。 在编写业务逻辑的时候，我们会有许多个js文件，打包的时候RN会将这些个js文件打包成一个叫index.android.bundle(ios的是index.ios.bundle)的文件，所有的js代码(包括rn源代码、第三方库、业务逻辑的代码)都在这一个文件里，启动App时会第一时间加载bundle文件，所以脚本热更新要做的事情就是替换掉这个bundle文件。

## 9.Flex布局

采用Flex布局的元素，称为Flex容器（flex Container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。

![][3]

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

容器的属性 以下6个属性设置在容器上。 
1.flex-direction 属性决定主轴的方向（即项目的排列方向)。 
2.flex-wrap 属性定义，如果一条轴线排不下，如何换行。 
3.flex-flow flex-flow属性是flex-direction属性和flex-wrap属性的简写形式。 
4.justify-content 定义了项目在主轴上的对齐方式。 
5.align-items 属性定义项目在交叉轴上如何对齐。 
6.align-content align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

## 10.请简述 code push 的原理

code push 调用 react native 的打包命令，将当前环境的非 native 代码全量打包成一个 bundle 文件，然后上传到微软云服务器（Windows Azure）。 在 app 中启动页（或 splash 页）编写请求更新的代码（请求包含了本地版本，hashCode、appToken 等信息），微软服务端对比本地 js bundle 版本和微软服务器的版本，如果本地版本低，就下载新的 js bundle 下来后实现更新(code push 框架实现)。

## 11.Redux中同步 action 与异步 action 最大的区别是什么

同步只返回一个普通 action 对象。而异步操作中途会返回一个 promise 函数。当然在 promise 函数处理完毕后也会返回一个普通 action 对象。thunk 中间件就是判断如果返回的是函数，则不传导给 reducer，直到检测到是普通 action 对象，才交由 reducer 处理。

## 12 React Native热更新原因和运行机制

React Native热更新是一种在不重新发布应用程序的情况下更新应用程序的技术。它允许开发人员动态地更新JavaScript代码，以及可能的情况下更新资源文件，例如图片、字体等。熟悉React Native热更新的工作原理和运行机制可以帮助开发人员更好地理解和使用该功能。

### 工作原理

#### 1. JavaScript Bundle

React Native应用程序的JavaScript代码被打包成一个或多个bundle文件，这些bundle文件包含了应用程序的所有逻辑和界面组件。

#### 2. 本地Bundle存储

原生应用在启动时会加载本地存储的bundle文件，并执行应用程序的初始逻辑。

#### 3. 远程Bundle存储

热更新的关键是将更新的bundle文件存储在远程服务器上，而不是在应用程序发布时打包到本地。

#### 4. 检查更新

应用程序定期检查远程服务器是否有新的bundle文件可用。这通常通过一些方式实现，例如定时轮询、推送通知等。

#### 5. 下载新Bundle

如果检测到新的bundle文件可用，应用程序会从远程服务器下载最新的bundle文件。

#### 6. 更新本地Bundle

下载完成后，应用程序会将新的bundle文件存储在本地，并更新应用程序的状态以指向新的bundle文件。

#### 7. 重新加载应用程序

一旦bundle文件被更新，应用程序会重新加载JavaScript代码，并重新渲染用户界面以反映新的更改。

### 运行机制

#### 1. CodePush

CodePush是一种常用的React Native热更新解决方案，由微软提供。它允许开发人员使用命令行工具将更新的JavaScript代码打包并上传到CodePush服务器。应用程序在启动时检查CodePush服务器是否有新的更新，并在发现更新时下载和应用新的bundle文件。

#### 2. AppHub

AppHub是另一个常用的React Native热更新解决方案，它提供了类似于CodePush的功能，允许开发人员动态地更新JavaScript代码。AppHub还提供了更多高级功能，例如分组部署、AB测试等。

#### 3. 自定义解决方案

除了使用现有的热更新解决方案之外，开发人员还可以开发自己的热更新解决方案。这可能涉及构建一个自定义的服务器端和客户端，用于管理和传输更新的bundle文件。

### 总结

React Native热更新允许开发人员在不重新发布应用程序的情况下更新JavaScript代码，以及可能的情况下更新资源文件。它的工作原理是将更新的bundle文件存储在远程服务器上，并在应用程序启动时检查更新并下载新的bundle文件。常用的React Native热更新解决方案包括CodePush和AppHub，但也可以开发自定义的解决方案来满足特定的需求

## 三 参考

* [React Native面试题库](https://webcc.gitee.io/blog/2018/04/09/React%20Native%E9%9D%A2%E8%AF%95%E9%A2%98%E5%BA%93(%E6%8C%81%E7%BB%AD%E6%9B%B4%E6%96%B0)/)




[1]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-rn/rn-interview-md1-component-life.png
[2]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-rn/rn-interview-md1-redux.png
[3]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-rn/rn-interview-md1-flex.png