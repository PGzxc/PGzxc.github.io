---
title: React Native面试题——面试题整理3
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 6269cf01
date: 2024-03-19 11:35:21
---
## 一 面试题汇总

1. React Native与ReactJS有什么不同？
2. 什么是JSX？
3. 什么是核心React组件，它们做什么？
4. 你如何安装和创建React Native应用程序？
5. 什么是Redux，什么时候应该使用它？
6. 什么是状态，如何使用它？
7. 你如何调试React应用程序，你可以使用哪些工具？
8. 构建一个除了说 "Hello World!"什么都不做的React应用
9. 你能在同一个代码库中为Android和iOS编写代码吗？
10. 描述一下如何重新呈现FlatList。
11. 当你调用SetState时会发生什么？
12. 你如何在React Native中为一个组件设计样式？
13. 什么是高阶组件（HOC），你如何使用它们？
14. 如何在React Native中调用一个Web API？
15. 描述一下虚拟DOM是如何工作的。
16. 描述Flexbox以及它最常用的属性
17. 功能性组件和类组件的区别是什么？
18. 如何从React Native的本地JSON文件中获取数据？
19. 列出一些你可以优化应用程序的方法。
20. 如何在React Native中创建一个stackNavigator？
21. 在iOS和Android中，内存泄露的一些原因是什么，如何检测它们？
22. 如何安装特定版本的React Native？
23. 举个React Native中使用道具的例子。
24. 如何在React Native中导入组件？
25. 如何在React Native中添加React导航？

<!--more-->

## 二 面试题解答(仅供参考)

## 2.1 React Native与ReactJS有什么不同？

React Native是一个JavaScript框架，由Facebook开发，以满足日益增长的移动应用开发的需求。它是开源的，基于JavaScript的。它被设计为用可重复使用的组件构建本地移动应用程序。它使用了大量的ReactJS组件，但在不同的设备上以原生方式实现它们。它调用Objective-C（用于iOS）和Java（用于Android）中的本地渲染API。

ReactJS也是由Facebook开发的。它是一个开源的JavaScript库，用于为移动和网络应用开发响应式的用户界面。它有一个可重复使用的组件库，旨在帮助开发者为他们的应用程序建立基础。

让我们来看看它们的一些主要区别。

- **语法**。React Native和ReactJS都使用JSX，但ReactJS使用HTML标签，而React Native不使用。
- **导航**。React Native使用自己的内置导航库，而ReactJS使用react-router。
- **动画**。ReactJS使用CSS动画。React Native使用其动画API。
- **DOM**。ReactJS使用部分刷新的虚拟DOM。React Native在渲染UI组件时需要使用其本地API。
- **用法**。ReactJS主要用于Web应用开发，而React Native则专注于移动应用。


### 2.2 什么是JSX？

JavaScript XML，或JSX，是React使用的一种XML/HTML模板语法。它扩展了ECMAScript，允许XML/HTML类文本与JavaScript和React代码重合。它允许我们把HTML放到JavaScript中。

它比普通的JavaScript更快，使创建模板更容易，并使用组件。它带有JavaScript的全部功能，你可以用它和React一起描述用户界面应该是什么样子。让我们看一下JSX中的Hello World！。

```
const element = <h1>Hello World!</h1>;
```

### 2.3 什么是核心React组件，它们做什么？

核心React组件包括。

- **Props**。你可以使用props来传递数据给不同的React组件。Props是不可变的，这意味着props不能改变它们的值。
- **ScrollView**。ScrollView是一个滚动的容器，用来承载多个视图。你可以用它来渲染大型列表或内容。
- **状态**。你使用状态来控制组件。在React中，状态是可变的，这意味着它可以在任何时候改变值。
- **风格**。React Native不需要任何特殊的语法来进行样式设计。它使用JavaScript对象。
- **文本**。文本组件在你的应用程序中显示文本。它使用textInput来接受用户的输入。
- **视图**。视图用于构建移动应用程序的用户界面。它是一个你可以显示你的内容的地方。

### 2.4 你如何安装和创建React Native应用程序？

在你开始之前，确保你的系统已经安装了Node.js和NPM。

要安装一个React Native应用程序，你可以使用以下命令。

```
$ npm install -g create-react-native-app
```

要创建一个React Native项目，你可以使用下面的命令。

```
$ npm create-react-native-app AppName
```

### 2.5 什么是Redux，什么时候应该使用它？

Redux是一个JavaScript应用程序的状态管理工具。它可以帮助你编写一致的应用程序，可以在不同环境下运行的应用程序，以及易于测试的应用程序。

不是所有的应用程序都需要Redux。它的设计是为了帮助你确定何时出现状态变化。根据Redux的官方文档，以下是一些你想使用Redux的例子。

- 你的应用状态经常更新
- 你有大量的应用状态，并且在应用的许多地方都需要它
- 更新你的应用状态的逻辑很复杂
- 你希望看到状态是如何随时间更新的
- 你的应用程序有一个中等或较大的代码库，并将由多个人员进行操作

### 2.6 什么是状态，如何使用它？

在React Native中，状态处理的是可改变的数据。状态是可变的，意味着它可以在任何时候改变值。你应该在构造函数中初始化它，然后在你想改变它时调用setState。让我们看一个如何使用state数据创建一个文本类组件的代码例子。

### 2.7 你如何调试React应用程序，你可以使用哪些工具？

在React Native应用程序中，有许多不同的方法来进行调试。由于React Native同时拥有iOS和Android环境，所以你会遇到各种各样的问题，也需要各种各样的工具。我们将探索一些不同的调试方法。让我们先来概述一下开发菜单。

**开发者菜单**

开发者菜单包括一些不同的调试和访问调试工具的方法，例如以下几种。

- **重新**加载：重新加载应用程序
- **Debug JS Remotely**：打开一个JavaScript调试器
- **启用实时重载**：导致应用程序在选择 "保存 "后自动重新加载
- **启用热重新加载**：观察变化
- **切换检查器**：切换检查器界面，以便我们可以检查UI元素和它们的属性
- **显示Perf Monitor**：监控性能

**Chrome开发工具**

你可以使用这些DevTools来调试React Native应用程序。你需要确保它连接到同一个WiFi。如果你使用的是Windows或Linux，按 ***Ctrl + M+\***，如果你使用的是macOS，按 ***命令+R\***.在开发者菜单中，你选择 "Debug JS Remotely"，它将打开默认调试器。

**React开发工具**

要使用React的开发者工具，你必须使用桌面应用程序。这些工具允许你调试React组件和样式。

**React本地调试器**

如果你在你的React应用中使用Redux，这对你来说是一个好的调试器。它是一个桌面应用，在一个应用中整合了Redux的和React的开发者工具。

**React Native CLI**

你也可以使用React Native命令行界面来进行调试。

### 2.8 构建一个除了说 "Hello World!"什么都不做的React应用

```
import React from "react";
import { Text, View } from "react-native";

const HelloWorldApp = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Hello World!</Text>
        </View>
    )
}
export default HelloWorldApp;
```

### 2.9 你能在同一个代码库中为Android和iOS编写代码吗？

是的，你可以。React负责所有的本地组件的翻译工作。

### 2.10 描述一下如何重新呈现FlatList。

你可以通过使用extraData属性来重新渲染一个FlatList。让我们看一个JavaScript代码的例子。

```
<FlatList .../
```

当我们将extraData={this.state}传递给FlatList时，我们确保当所选状态发生变化时，它将重新渲染自己。因为FlatList也是一个PureComponent，我们需要设置这个道具，这样它就知道要重新渲染项目

### 2.11 当你调用SetState时会发生什么？

当你在React中调用SetState时，你传递给它的对象将被合并到组件的当前状态中。这就触发了一种叫做_调和的_东西。调和的目的是以最有效的方式更新用户界面。

React通过构建一个React元素树，并将其与之前的元素树进行比较来实现这一目的。这向React显示了所发生的确切变化，因此React可以在必要的地方进行更新。

### 2.12 你如何在React Native中为一个组件设计样式？

你使用JavaScript。React的所有核心组件都接受一个叫做style的道具。这个道具可以是一个简单的JavaScript对象。你也可以传递一个不同风格的数组。

如果你有复杂的组件，建议使用StyleSheet.create来在一个地方建立多种样式。这里有一个例子

```
const styles = StyleSheet.create({
    container:  {
        borderRadius:  4,
        borderWidth:  0.5,
        borderColor:  '#d6d8da',
    }, 
    title:  {
        fontSize:  19,
        fontWeight:  'bold',
    }, 
    activeTitle:  {
        color:  'red',
    },
});

<View style={styles.container}>
    <Text style={[styles.title, this.props.isActive && styles.activeTitle]} /> 
</View>
```

### 2.13 什么是高阶组件（HOC），你如何使用它们？

高阶组件是纯函数，它接收组件并返回新组件。它们的主要目的是浓缩和重用不同组件的有状态逻辑。它们被认为是高级技术，而且它们不是React API的一部分。相反，它们是由React的组合性质产生的模式。下面是一个非常简单的HOC的例子。

```
function simpleHOC(WrappedComponent) {
```

这个简单的React HOC将WrappedComponent作为一个参数，然后它返回一个新的React组件。新的React组件将WrappedComponent作为其子节点。由此，我们可以像这样创建一个新的组件。

```
const NewComponent = simpleHOC(Dog);
```

我们的NewComponent可以完全像其他组件一样使用。

### 2.14 如何在React Native中调用一个Web API？

下面的代码显示了我们如何在React Native中调用Web API的一个例子。

```
fetch("http://**sampleurl**", {
method: "POST",
headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
},
body: JSON.stringify({
    username: "educative1",
    password: "educative987",
})
})
```

### 2.15 描述一下虚拟DOM是如何工作的。

在React Native中，虚拟DOM是真实DOM的一个副本。它是一个节点树，列出了元素以及它们的属性、内容、和属性。每当我们的底层数据发生变化时，虚拟DOM会重新渲染用户界面。之后，其他DOM表现和虚拟DOM表现之间的差异将被计算出来，而真实DOM将被更新。

### 2.16 描述Flexbox以及它最常用的属性

Flexbox是一种布局模式，使元素能够在容器内协调和分配空间。它在不同的屏幕尺寸上提供了一个一致的布局。

Flexbox的主要属性是flexDirection、justifyContent和alignItems。我们来讨论一下这些属性各自的作用。

- **flexDirection**：用于指定元素的对齐方式（垂直或水平）。
- **justifyContent**：用于决定元素在一个给定的容器内应该如何分布
- **alignItems**：用于指定一个给定的容器内的元素沿次轴的分布。

### 2.17 功能性组件和类组件的区别是什么？

功能性组件也被称为无状态组件。功能性组件接受道具并返回HTML。它们在不使用状态的情况下给出解决方案，它们可以定义为有或没有箭头函数。

下面是一个React中的功能组件的例子。

```
import React from "react";
```

类组件也被称为有状态组件。它们是ES6类，扩展了React库中的组件类。它们实现了逻辑和状态。类组件在返回HTML时需要有一个render()方法。你可以向它们传递道具，并通过this.props访问它们。

让我们看一个例子。

```
import React, {Component} from "react";

class Friend extends Component {
    constructor(props) {
    super(props)
    this.state = {
    name: "Erin";
    }
    }

    render() {
    return (
    <div>
    <hi> Hi {this.state.name}</h1>
    </div>
    );
    }
}

export default Friend;
```

### 2.18 如何从React Native的本地JSON文件中获取数据？

有几种方法可以从React Native的本地JSON文件中获取数据。让我们看一下两个选项。

**选项1**:

```
const customData = require("./customData.json");
```

**选项2**:

```
import * as data from "./example.json";
```

### 2.19 列出一些你可以优化应用程序的方法。

有许多不同的方法来优化一个应用程序。让我们看一下我们的一些选择。我们可以。

- 压缩或转换我们的原始JSON数据，而不是仅仅存储它
- 为CPU架构制作缩小尺寸的APK文件
- 优化本地库和状态操作的数量
- 在列表项上使用关键属性
- 压缩图片和其他图形元素
- 使用Proguard来最小化应用程序的大小，并剥离我们的字节码及其依赖的部分。

### 2.20 如何在React Native中创建一个stackNavigator？

下面是如何在React Native中创建一个stackNavigator。

```
const AppNavigator = createStackNavigator({
```

### 2.21 在iOS和Android中，内存泄露的一些原因是什么，如何检测它们？

如果在componentDidMount中添加了未发布的定时器或监听器，或者关闭范围泄漏，就会发生内存泄漏。

要检测iOS的内存泄漏，你可以进入Xcode，产品，然后是配置文件。

要检测Android的内存泄漏，你可以使用性能监视器。

### 2.22 如何安装特定版本的React Native？

要安装特定版本的React Native，我们可以使用这个命令。

```
$ react-native init newproject --version react-native@VersionNumber
```

### 2.23 举个React Native中使用道具的例子。

```
import React, {Component} from "react";
import {View, Text} from "react-native";
class DefaultPropComponent extends Component {
    render() {
        return (
            <View>
                <Text>
                    {this.props.name}
                </Text>
            </View>
        }
    }
}
Demo.defaultProps = {
    name: "Erin"
}
export default DefaultPropComponent;
```

### 2.24 如何在React Native中导入组件？

下面介绍如何在React Native中导入组件。

```
import React from "react";
```

### 2.25 如何在React Native中添加React导航？

我们有几个选择。让我们看看第一种。

```
yarn add react-navigation
```

下面是第二个。

```
npm install react-navigation
```


## 三 参考

* [React Native 面试题整理](https://github.com/woliwa1/xiaoQiang-interview-react-Native)



