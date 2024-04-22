---
title: React Native面试题——面试题整理7
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 65040b18
date: 2024-03-19 16:54:41
---
## 一 面试题汇总

1. React Native相对于原生的ios和Android有哪些优势？
2. React Native组件的生命周期
3.  当你调用setState的时候，发生了什么事？
4. props和state相同点和不同点
5. shouldComponentUpdate 应该做什么 <!--more-->
6. reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？
7. redux状态管理的流程
8. 加载bundle的机制
9. Flex布局
10. 请简述 code push 的原理
11. Redux中同步 action 与异步 action 最大的区别是什么
12. React PureComponent的原理
13. JS调用原生方法
14. 原生发送事件给JS
15. immutable.js 的原理
16. react native redux中间件
17. InteractionManager
18. Rect Native 增量更新方案
19. codePush 接入教程
20. React Native 打包参数

## 二 面试题解答(仅供参考)

## 2.1 React Native相对于原生的ios和Android有哪些优势？

```
1.性能媲美原生APP 
2.使用JavaScript编码，只要学习这一种语言 
3.绝大部分代码安卓和IOS都能共用 
4.组件式开发，代码重用性很高 
5.跟编写网页一般，修改代码后即可自动刷新，不需要慢慢编译，节省很多编译等待时间 
6.支持APP热更新，更新无需重新安装APP
```

### 2.2 React Native组件的生命周期

![][1]

### 2.3 当你调用setState的时候，发生了什么事？

当调用`setState` 时，`React`会做的第一件事情是将传递给`setState` 的对象合并到组件的当前状态。 这将启动一个称为`和解（reconciliation）`的过程。 `和解（reconciliation)`的最终目标是以最有效的方式，根据这个新的状态来更新UI。 为此，React将构建一个新的 React 元素树（您可以将其视为 UI 的对象表示）。 一旦有了这个树，为了弄清 UI 如何响应新的状态而改变，React 会将这个新树与上一个元素树相比较（ diff ）。 通过这样做， React 将会知道发生的确切变化，并且通过了解发生什么变化，只需在绝对必要的情况下进行更新即可最小化 UI 的占用空间。

### 2.4 props和state相同点和不同点

#### 相同点

- 1.不管是`props`还是`state`的改变，都会引发render的重新渲染。
-  2.都能由自身组件的相应初始化函数设定初始值。

#### 不同点

1. 初始值来源：`state`的初始值来自于自身的`getInitalState（constructor）`函数；`props`来自于父组件或者自身`getDefaultProps`（若key相同前者可覆盖后者）。

- 2.修改方式：`state`只能在自身组件中`setState`，不能由父组件修改；  `props`只能由父组件修改，不能在自身组件修改。
- 3.对子组件：``props是一个父组件传递给子组件的数据流，这个数据流可以一直传递到子孙组件；`state`代表的是一个组件内部自身的状态，只能在自身组件中存在。

### 2.5 shouldComponentUpdate 应该做什么

其实这个问题也是跟`reconciliation`有关系。 `和解（ reconciliation ）`的最终目标是以最有效的方式，根据新的状态更新用户界面”。 如果我们知道我们的用户界面（UI）的某一部分不会改变， 那么没有理由让 React 很麻烦地试图去弄清楚它是否应该渲染。 通过从 `shouldComponentUpdate` 返回`false`， React 将假定当前组件及其所有子组件将保持与当前组件相同

### 2.6 reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？

`this.props.children` 的值有三种可能：
 1.当前组件没有子节点，它就是`undefined`;
 2.有一个子节点，数据类型是`object` ；
 3.有多个子节点，数据类型就是`array` 。 系统提供`React.Children.map()`方法安全的遍历子节点对象

### 2.7 redux状态管理的流程

![][2]

`action`是用户触发或程序触发的一个普通对象。 reducer是根据action操作来做出不同的数据响应，返回一个新的state。 store的最终值就是由reducer的值来确定的。（一个store是一个对象, reducer会改变store中的某些值） action -> reducer -> 新store -> 反馈到UI上有所改变

### 2.8 加载bundle的机制

要实现RN的脚本热更新，我们要搞明白RN是如何去加载脚本的。 在编写业务逻辑的时候，我们会有许多个js文件，打包的时候RN会将这些个js文件打包成一个叫`index.android.bundle(ios的是index.ios.bundle)`的文件，所有的js代码(包括rn源代码、第三方库、业务逻辑的代码)都在这一个文件里，启动App时会第一时间加载bundle文件，所以脚本热更新要做的事情就是替换掉这个bundle文件。

### 2.9 Flex布局

采用Flex布局的元素，称为`Flex容器（flex Container）`，简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

![][3]

容器默认存在两根轴：水平的`主轴（main axis）`和`垂直的交叉轴（cross axis）`。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

容器的属性 以下6个属性设置在容器上。 `flex-direction`属性决定主轴的方向（即项目的排列方向)。 `flex-wrap` 属性定义，如果一条轴线排不下，如何换行。 `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式。 `justify-content`定义了项目在主轴上的对齐方式。 `align-items` 属性定义项目在交叉轴上如何对齐。`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

1.在组件的style中指定`flexDirection`可以决定布局的主轴

```
flexDirection:'row',
flexDirection:'column',
```

2.在组件的style中指定`justifyContent`可以决定其子元素沿着主轴的排列方式

```
justifyContent :'flex-start',
justifyContent :'center',
justifyContent :'flex-end',
justifyContent :'space-around',
justifyContent :'space-between',
```

3.在组件的style中指定`alignItems`可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式

```
alignItems: 'flex-start',
alignItems: 'center',
alignItems: 'flex-end',
alignItems: 'stretch',  
```

### 2.10 请简述 code push 的原理

code push 调用 react native 的打包命令，将当前环境的非 native 代码全量打包成一个 bundle 文件，然后上传到`微软云服务器（Windows Azure）`。 在 app 中启动页（或 splash 页）编写请求更新的代码（请求包含了本地版本，hashCode、appToken 等信息），微软服务端对比本地 js bundle 版本和微软服务器的版本，如果本地版本低，就下载新的 js bundle 下来后实现更新(code push 框架实现)。

### 2.11 Redux中同步 action 与异步 action 最大的区别是什么

同步只返回一个普通 action 对象。而异步操作中途会返回一个 promise 函数。当然在 promise 函数处理完毕后也会返回一个普通 action 对象。thunk 中间件就是判断如果返回的是函数，则不传导给 reducer，直到检测到是普通 action 对象，才交由 reducer 处理。

### 2.12 React PureComponent的原理

当组件更新时，如果组件的 props 和 state 都没发生改变， render 方法就不会触发，省去 Virtual DOM 的生成和比对过程，达到提升性能的目的。具体就是 React 自动帮我们做了一层浅比较：

```
if (this._compositeType === CompositeTypes.PureClass) {  shouldUpdate = !shallowEqual(prevProps, nextProps)  || !shallowEqual(inst.state, nextState);}
```

而 shallowEqual 又做了什么呢？会比较 Object.keys(state | props) 的长度是否一致，每一个 key 是否两者都有，并且是否是一个引用，也就是只比较了第一层的值，确实很浅，所以深层的嵌套数据是对比不出来的。

### 2.13 JS调用原生方法

#### IOS

```
RCTBridgeModule 
RCT_EXPORT_MODULE 
RCT_EXPORT_METHOD 
RCT_REMAP_METHOD 
Promises Callbacks
```

#### Android

```
ReactContextBaseJavaModule ReactMethod MyReactPackage里增加模块
NativeModules.MyNativeModule.callNativeMethod(‘成功调用原生方法’);
```

### 2.14 原生发送事件给JS

#### IOS

```
RCTEventEmitter sendEventWithName NativeEventEmitter
```

#### android

```
DeviceEventEmitter.addListener
```

### 2.15 immutable.js 的原理

Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。 Immutable 则提供了简洁高效的判断数据是否变化的方法，只需 === 和 is 比较就能知道是否需要执行 render()，而这个操作几乎 0 成本，所以可以极大提高性能。修改后的 shouldComponentUpdate 是这样的：

```
import { is } from 'immutable';shouldComponentUpdate: (nextProps = {}, nextState = {}) => {  const thisProps = this.props || {}, thisState = this.state || {};   if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||      Object.keys(thisState).length !== Object.keys(nextState).length) {    return true;  }   for (const key in nextProps) {    if (!is(thisProps[key], nextProps[key])) {      return true;    }  }   for (const key in nextState) {    if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {      return true;    }  }  return false;}
```

### 2.16 react native redux中间件

```
react-redux redux-actions redux-promise redux-thunk redux-logger redux-devtools
```

### 2.17 InteractionManager

InteractionManager可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行。这样可以保证JavaScript动画的流畅运行。比如 Navigator的转场动画。

```
InteractionManager.runAfterInteractions(() => {    navigator.push({        
  component: MainPager,
  name: 'MainPager'   
  })
})
componentDidMount() {    
    InteractionManager.runAfterInteractions(() => {  
      this.setState({renderPlaceholderOnly: false});  
    });
  }
```

### 2.18 Rect Native 增量更新方案

https://www.jianshu.com/p/2cb3eb9604ca

### 2.19 codePush 接入教程

https://www.jianshu.com/p/6a5e00d22723

### 2.20 React Native 打包参数

```
--entry-file ：JS根目录文件
--platform ：选择平台--（ios or android）
--transformer ：编译器默认编译器地址（/Users/babytree-mbp13/projects/xcodeProjects/AwesomeProject/node_modules/react-native/packager/transformer.js）
--dev ：是否是开发环境，默认为true
--prepack ：是否需要预先包装，默认为false
--bundle-output ：输出的目录文件地址
--bundle-encoding ：编码格式，默认utf8
--sourcemap-output ：结果文件存放地址
--assets-dest ：图片等资源文件存放地址
--verbose ：是否开启日志打印，默认为false
```

Android示例

```
react-native bundle --entry-file index.android.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --assets-dest ./android/app/src/main/res/ --dev false
```

iOS 示例

```
react-native bundle --entry-file index.ios.js --bundle-output ./ios/bundle/index.ios.jsbundle --platform ios --assets-dest ./ios/bundle --dev false
```


## 三 参考

* [简书—React Native面试题总结](https://www.jianshu.com/p/af455071a6b8)



[1]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-rn/rn-interview-md1-component-life.png
[2]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-rn/rn-interview-md1-redux.png
[3]:https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-rn/rn-interview-md1-flex.png