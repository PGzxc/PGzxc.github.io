---
title: React Native面试题——面试题整理6
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 12033b8e
date: 2024-03-19 16:28:39
---
## 一 面试题汇总

1. 简单介绍下React Native，以及和React.js的区别
2. React Native 相对于原生 IOS、Android 有哪些优、劣势
3.  什么是JSX语法
4. 什么是高阶组件（HOC）
5. 简单介绍下功能组件和类组件的区别
6. 调用setState后会发生什么
7. 简单介绍下React Native组件的生命周期函数
8. 简单介绍下useEffect生命周期钩子函数
9. React Native如何实现异步存储
10. Immutable有什么作用
11. 简单介绍下Redux状态管理工具
12. 简单介绍下Bundle 加载机制
13. React Native如何实现热更新
14. 如何开发React Native插件

<!--more-->

## 二 面试题解答(仅供参考)

## 2.1 简单介绍下React Native，以及和React.js的区别

React Native是一个JavaScript框架，由Facebook开发，以满足日益增长的移动应用开发的需求。它是开源的，基于JavaScript的。它被设计为用可重复使用的组件构建本地移动应用程序。它使用了大量的ReactJS组件，但在不同的设备上以原生方式实现它们。它调用Objective-C（用于iOS）和Java（用于Android）中的本地渲染API。

ReactJS也是由Facebook开发的一个开源的JavaScript库，主要用于为移动和网络应用开发响应式的用户界面开发场景。它有一个可重复使用的组件库，旨在帮助开发者为他们的应用程序建立基础。 

和ReactJS相比，React Native使用的JSX语法等其他方面有如下的一些区别：

- 语法：React Native和ReactJS都使用JSX，但ReactJS使用HTML标签，而React Native不使用。
- 导航：React Native使用自己的内置导航库，而ReactJS使用react-router。
- 动画：ReactJS使用CSS动画。React Native使用其动画API。
- DOM：ReactJS使用部分刷新的虚拟DOM。React Native在渲染UI组件时需要使用其本地API。
- 用法：ReactJS主要用于Web应用开发，而React Native则专注于移动应用。

### 2.2 React Native 相对于原生 IOS、Android 有哪些优、劣势

**优势：**

- 性能方面媲美原生App。
- 绝大部分代码同时适用IOS/Android，一套代码两套系统适用。
- 使用Javascript编码，上手容易。
- 组件式开发，易于管理维护，代码复用率高。
- 代码更改后会自动刷新，节省等待时间。
- 支持热更新，更新无需重新安装App。

**劣势：**

- RN组件库并不是全面，当遇到某些特殊功能，需要花费大量时间、精力进行插件开发；
- 系统适配方面， IOS版本略好，android发展较慢；
- 编程方面， iOS和Android代码并非通用，有可能需要维护两套代码或者在代码中做一些条件判断或编译；
- 开发复杂应用必须精通原生开发，开发效率并不比原生开发的熟手快。很多问题（包括兼容性问题解决）任然需要原生开发。
- 升级RN版本或需要大动干戈，尤其向下兼容不好；

### 2.3 什么是JSX语法

JSX，是React使用的一种XML/HTML模板语法。它扩展了ECMAScript，允许XML/HTML类文本与JavaScript和React代码重合。它允许我们把HTML放到JavaScript中。它比普通的JavaScript更快，使创建模板更容易，支持使用组件来构建应用的界面，如下所示。

```
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
```

### 2.4 什么是高阶组件（HOC）

高阶组件是纯函数，它接收组件并返回新组件，它们的主要目的是浓缩和重用不同组件的有状态逻辑，它被认为是高级技术，而且它们不是React API的一部分。下面是一个HOC的例子：

```
function simpleHOC(WrappedComponent) {
  ... 
}
```

然后，我们就可以像使用其他组件一样使用NewComponent组件

### 2.5 简单介绍下功能组件和类组件的区别

功能组件也被称为无状态组件，功能组件接受属性和参数并返回HTML，它们在不使用状态的情况下给出解决方案，它们可以定义为有或没有箭头函数。

类组件也被称为有状态组件。，它们是ES6类，扩展了React库中的组件类，它们实现了逻辑和状态。类组件在返回HTML时需要有一个render()方法，开发中可以向它们传递属性和参数，并通过this.props访问它们。

### 2.6 调用setState后会发生什么

将传入的参数对象与当前的状态合并，然后触发调和过程。在调和过程中react会根据新的状态以相对高效的方式构建react元素树。react会对新旧元素树进行diff算法计算出差异，然后根据差异进行最小化渲染

### 2.7 简单介绍下React Native组件的生命周期函数

React Native组件的生命周期大体可以分为：创建阶段、实例化阶段、运行（更新）阶段、销毁阶段。

其中，创建阶段中会初始化组件的属性类型和默认属性。实例化阶段主要是实例化组件类的时候，也就是该组件类被调用的时候触发，主要由constructor、componentWillMount、render、componentDidMount等生命周期函数构成。运行（更新）阶段则主要由componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render以及componentDidUpdate构成。销毁阶段主要是在组件消亡的时候触发，主要由componentWillUnmount构成。

![][1]

不过，随着函数组件的流程，现在开发RN应用基本都是使用函数组件的方式进行开发，配合React的Hooks函数，就可以实现类组件生命周期功能。

### 2.8 简单介绍下useEffect生命周期钩子函数

我们可以使用 useEffect 钩子在函数组件中运行副作用。 轮询请求、直接 DOM 操作以及使用诸如 setTimeout() 之类的计时器函数都是副作用的示例。

以前，这些副作用是通过使用生命周期方法来实现的，例如 componentDidMount()、componentDidUpdate() 和 componentWillUnmount()。 useEffect Hook 是所有这些方法的组合，它接受在渲染操作发生时调用的回调函数。

默认情况下，useEffect Hook 在第一次渲染后和每次更新后运行。 useEffect 挂钩有助于避免冗余代码和组相关代码，使用示例如下。

```
function Counter() {
  const [count, setCount] = useState(0);
 
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 2.9 React Native如何实现异步存储

Async Storage 是一个 React Native 社区维护的模块，它提供了一个异步的、未加密的键值对存储。 它本质上是 React Native 的基于 Web 的本地存储版本。当我们需要存储全局应用程序范围的变量、持久的 GraphQL 或 Redux 状态或我们希望在用户关闭应用程序后保留的其他非敏感数据时，异步存储非常有用。

因为异步存储只能存储字符串数据，所以对象数据必须先序列化后才能存储。此外，我们不应该在异步存储中存储敏感数据，例如令牌或大量数据。

### 2.10 Immutable有什么作用

Javascript 中的对象一般是可变的(Mutable)。 由于使用了引用赋值，新对象简单引用原始对象后，新旧对象值的修改都将影响到彼此。虽然这样做可以节省内存，但应用变得复杂后，这就造成了非常大的隐患，Mutable带来的优点变得得不偿失。为了解决这个问题，一般的做法是使用深浅拷贝来避免修改，但这样又造成了CPU和内存的浪费。而Immutable可以很好地解决这些问题。 

目前流行的Immutable库有两个：immutable.js和seamless-immutable。

**Imutable的优点**

- 降低了Mutable带来的复杂度；
- 节省内存；
- Undo/Redo, Copy/Paste, 甚至时间旅行这些功能做起来都是小菜一碟；
- 并发安全；
- 拥抱函数式编程；

**Immutable的缺点**

- 需要学习新的API；
- 增加了资源文件的大小；
- 容易和原生对象混淆；

Immutable Data是一旦被创建，就不能被更改的数据。对Immutable 对象的任何修改或添加删除操作都会返回一个新的Immutable 对象。Immutable 实现原理是持久化数据结构（Persistent Data Structure）,也就是使用旧数据创建新数据的同时要保证旧数据的可用且不变。同时又为了避免深拷贝把所有节点都复制一遍带来的性能损耗，Immutable 使用了Structure Sharing(结构共享)，即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其他节点则进行共享。

### 2.11 简单介绍下Redux状态管理工具

Redux是前端开发中的一个状态管理工具，主要由Action、Store和Reducers三部分组成。其中，Store用于存储应用程序的状态数据，组件通过dispatch()方法触发Action，Action将接收的用户事件转发给Store，Store接收Action并转发给Reducer，Reducer根据Action类型对状态数据进行处理并将处理结果返回给Store执行数据存储，整个执行的流程如下。

![][2]

接着，其他组件通过订阅Store状态的来刷新自身的状态，从而实现组件之间的状态数据共享。

### 2.12 简单介绍下Bundle 加载机制

在编写业务逻辑的时候，我们会有许多个js文件，打包的时候RN会将这些个js文件打包成一个叫index.android.bundle(ios的是index.ios.bundle)的文件，所有的js代码(包括rn源代码、第三方库、业务逻辑代码)都在这一个文件里，启动App时会第一时间加载bundle文件，所以脚本热更新要做的事情就是替换掉这个bundle文件。

### 2.13 React Native如何实现热更新

在React Native项目集成热更新目前有4个方案。

**CodePush**

由鼎鼎大名的微软出品，是App Center的一部分。如果不考虑稳定性，这绝对是不二选择。但是非常可惜，因某些不可言表的原因，其服务在中国非常不稳定。有人说不选择CodePush的原因是因为它的服务器在海外，速度慢。其实慢与快不是考虑的重点（除非慢到极端），一个React Native App的Js bound通常只有几M，能达到20M的都是罕见的了，在如今的网络环境下，这根本就不是个事。所以考虑的重点其实是稳定性。

经本人在公司的网络环境下测试，发布新版不成功的概率超过10%，更新不成功（无法连接、中断、以及不知是何原因）的概率超过20%。这还仅仅是在一个网络环境下和某个时间段内，如果放大到全国和所有时间段，那这个概率应该还会提高。

因此，如果你的产品是面向海外用户的，那么就选择CodePush，不用考虑其它。如果是面向国内用户的，那么不建议使用。

**中文社区的CodePush**

由CodePush中文社区出品。其实就是微软的CodePush，将服务器改在了国内，然后在用法上进行了一些封装和简化。我们公司现在用的是这个。之所以选择它，是因为我最早测试的是微软的CodePush，然后顺理成章就选择了这个。

其特点是使用简单。虽然仍然是微软的CodePush，但经过二次封装，其用法要比微软的CodePush更简单直接。当然，之所以有这种感觉，也有可能是我在折腾微软的CodePush时是刚开始接触，而在使用中文社区的CodePush时已经有了前面的积累，所以就感觉上更简单了。

**Pushy**

由React Native中文社区出品。正是由于微软的CodePush在中国不稳定，所以促使中文社区的开发者们开发出了一些类似功能的服务。Pushy应该算是其中的佼佼者。

经在公司的网络环境下测试，其服务还算比较稳健。

从用法上来看，其实也能看到一些CodePush的影子。当然，热更新功能最核心的无外乎就是上传与更新，也不可能玩出朵花来。

对比中文社区的两个产品，感觉中文社区的CodePush是在微软的CodePush上做减法，而Pushy是在微软的CodePush上做的自定义开发。

**自建CodePush服务器**

由于微软的CodePush在中国不稳定，所以网上有些文章介绍用一些开源项目搭建自己的CodePush服务器，不过这需要开发者具备全栈的技术能力。

### 2.14 如何开发React Native插件

在React Native中，开发插件需要全局安装react-native-cli和react-native-create-library两个插件。然后，我们就可以使用命令react-native-create-library创建一个插件项目。

```
react-native-create-library --package-identifier 包名 --platforms android,ios 插件名
```

紧接着，我们需要到原生Android，iOS工程中去开发功能，然后再通过RN的NativeModules实现和原生原生Android，iOS的方法调用，比如原生Android，iOS提供了一个alipay方法，那么我们可以在RN中使用如下的方式进行调用：

```
NativeModules.RNAlipay.alipay(orderInfo)
```

## 三 参考

* [掘金—React Native面试题总结](https://juejin.cn/post/7311602994571853851)



[1]: https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-rn/rn-interview-md1-component-life.png
[2]: https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-rn/rn-interview-md5-redux.png