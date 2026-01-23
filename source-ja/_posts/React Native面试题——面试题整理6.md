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
3.  什么是JSX语法
4. 什么是高阶组件（HOC）
5. 简单介绍下功能组件(Functional Component)和类组件(Class Component)的区别 
9. React Native如何实现异步存储<!--more-->
14. 如何开发React Native插件

## 二 面试题解答(仅供参考)

## 2.1 简单介绍下React Native，以及和React.js的区别

```
1.不同
虽然 React 和 React Native 都使用 JavaScript 和 React 语法来构建应用，
但它们的使用场景和实现方式有所不同：

1.1用途
-React.js：
-用于构建 Web 应用。通过虚拟 DOM（Virtual DOM）来更新网页上的元素。
-React Native：
-用于构建 移动应用。
-通过桥接（bridge）技术将 JavaScript 代码与原生平台的 API 进行交互，实现原生控件的渲染。

1.2 渲染方式
-React.js：渲染成 HTML，然后通过浏览器的 DOM 来展示页面。
-React Native：渲染成 原生组件，如iOS的UIView和Android的View，直接在原生平台上显示。

1.3 开发环境
-React.js：主要开发和运行在 浏览器 中，使用 HTML 和 CSS 来样式化组件。
-React Native：
-通过原生开发工具（如 Xcode 和 Android Studio）构建和调试，
-样式使用的是类似于 CSS 的 Flexbox。

1.4 组件
-React.js：使用 HTML 标签（如 <div>、<span>）来构建界面。
-React Native：
提供了一组专门的组件（如 <View>、<Text>、<Image>）来替代 HTML 元素，
这些组件会被转换为原生的 UI 控件。

1.5 代码重用性
React.js：只能在 Web 应用中使用。
React Native：虽然主要用于移动应用，但也可以与 Web 技术（如 React DOM）进行集成，实现一定的代码重用。

2.总结
-React.js 主要用于 Web 开发，通过 HTML 渲染内容。
-React Native 主要用于 移动应用开发，通过原生控件渲染 UI。
-两者的主要区别在于渲染方式、开发环境和目标平台，React Native 采用原生渲染，
而 React.js 在 Web 上渲染为 HTML 元素。

一句话总结：React Native是React的一个分支，用于构建跨平台的移动应用，而React.js则专注于构建 Web 应用
```

### 2.2 什么是JSX语法

```
1.概念
JSX（JavaScript XML） 是一种 JavaScript 的语法扩展，它允许在JavaScript代码中直接编写类似HTML的语法。
React 使用 JSX 来描述 UI，简化了组件的结构和渲染。

2.JSX 的基本特点：
2.1 语法类似 HTML：
JSX 看起来像是 HTML，但实际上它是 JavaScript 语法扩展。
你可以在 JSX 中写标签，如 <div>, <button>, <h1> 等。

2.2 需要返回一个单一根元素：
在 JSX 中，返回的内容必须是一个单一的父元素。这意味着你不能返回多个元素直接并列在一起。
如果需要多个元素，可以将它们包裹在一个父元素中，通常是 div 或者使用 React.Fragment。

2.3 属性采用驼峰命名法：
与 HTML 中的属性不同，JSX 中的属性名称采用驼峰命名法。例如：
HTML: <input type="text">
JSX: <input type="text" />

2.4 JavaScript 表达式：
在 JSX 中，可以在大括号 {} 内嵌入任何有效的 JavaScript 表达式。
例如，可以插入变量、函数或计算值：
const name = 'React';
const element = <h1>Hello, {name}!</h1>;

2.5 条件渲染：
可以使用 JavaScript 的条件语句（如 if、&&、三元运算符等）来动态渲染 JSX 内容：
const isLoggedIn = true;
const greeting = isLoggedIn ? <h1>Welcome Back!</h1> : <h1>Please Log In</h1>;

2.6 事件处理：
在 JSX 中，事件名称采用驼峰命名法，例如 onClick、onChange 等
<button onClick={handleClick}>Click Me</button>

2.7 样式：
在 JSX 中，内联样式必须以 JavaScript 对象的形式传递，属性名称采用驼峰命名法：
const style = { color: 'blue', fontSize: '20px' };
<div style={style}>Hello</div>

3.JSX 示例
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  const name = 'World';
  return (
    <div>
      <Welcome name={name} />
    </div>
  );
}

export default App;

4. 总结
JSX 是一种方便的语法扩展，使得我们可以在 JavaScript 中直接编写类似 HTML 的代码来描述界面。
它通过将 HTML 和 JavaScript 合并，让代码更简洁、更易读

5. 一句话总结：JSX 是React中用来定义UI结构的语法扩展，类似于HTML，但具有JavaScript的功能性
```


### 2.3 什么是高阶组件（HOC）

```
1.概念
高阶组件（Higher-Order Component, HOC） 是一种设计模式，是 React 中用于重用组件逻辑的技术。
它是一个 函数，接受一个组件作为参数并返回一个新的组件。
HOC 不会修改原有组件的代码，而是通过包装原组件来扩展其功能。

2.HOC 的特点：
-接受组件作为参数：HOC 接受一个 React 组件并返回一个新的组件。
-增强组件功能：HOC 通常用于为组件添加新的功能或行为，例如：添加状态管理、处理副作用、权限控制等。
-不修改原组件：HOC 不会直接修改原组件，而是返回一个新的组件，保持原组件的纯粹性。
-可以链式调用：多个 HOC 可以通过链式调用来增强同一个组件的功能。

3.HOC 的例子

import React from 'react';
// 一个简单的 HOC，给组件添加新的功能（例如：计时器）
function withTimer(Component) {
  return class extends React.Component {
    state = {
      time: new Date().toLocaleTimeString(),
    };

    componentDidMount() {
      this.timer = setInterval(() => {
        this.setState({
          time: new Date().toLocaleTimeString(),
        });
      }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    render() {
      return <Component {...this.props} time={this.state.time} />;
    }
  };
}

// 一个普通的展示组件
function ShowTime({ time }) {
  return <h1>The current time is: {time}</h1>;
}

// 使用 HOC 增强 ShowTime 组件
const ShowTimeWithTimer = withTimer(ShowTime);

// 在应用中使用
function App() {
  return <ShowTimeWithTimer />;
}

export default App;

4. HOC 的应用场景
-状态共享：多个组件之间共享相同的状态逻辑。
-代码复用：将多个组件中相同的逻辑提取到 HOC 中，避免重复代码。
-权限控制：在组件渲染前进行权限检查，决定是否渲染该组件。
-数据获取：HOC 可以负责从服务器获取数据并将其传递给组件。

5.总结
高阶组件HOC是React中的一种设计模式，它通过函数包装现有组件并返回新的组件来扩展功能，而不是直接修改原组件。
通过 HOC，可以实现代码复用、逻辑分离以及增强组件功能。
```

### 2.4 简单介绍下功能组件(Functional Component)和类组件(Class Component)的区别 

```
在 React 中，功能组件和类组件是两种创建组件的方式。
随着 React Hooks 的引入，功能组件逐渐成为更常用的组件形式，但类组件依然在一些项目中存在。
以下是两者的区别：

1.定义方式
1.1 功能组件（Functional Component）：
使用 JavaScript 函数来定义组件。
const MyComponent = (props) => {
  return <div>{props.text}</div>;
};

1.2 类组件（Class Component）：
使用 ES6 类来定义组件，并继承自 React.Component
class MyComponent extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

2. 使用状态（State）
2.1 功能组件：
之前功能组件没有状态，但引入 React Hooks 后，功能组件也可以使用 useState 来管理状态。
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
2.2 类组件：
类组件使用 this.state 来管理状态，并通过 this.setState() 来更新状态。
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

3 生命周期方法
3.1 功能组件：
在功能组件中，没有传统的生命周期方法，但通过 React Hooks（如 useEffect）可以模拟生命周期的行为。
const MyComponent = () => {
  useEffect(() => {
    // 类似 componentDidMount, componentDidUpdate 和 componentWillUnmount
    console.log('Component Mounted');
    return () => console.log('Component Unmounted');
  }, []);
  return <div>My Component</div>;
};
3.2 类组件：
类组件可以使用生命周期方法，例如 componentDidMount, componentDidUpdate, componentWillUnmount。
class MyComponent extends React.Component {
  componentDidMount() {
    console.log('Component Mounted');
  }
  componentWillUnmount() {
    console.log('Component Unmounted');
  }
  render() {
    return <div>My Component</div>;
  }
}

4.代码简洁性

4.1 功能组件：
功能组件代码更简洁，尤其是在没有状态或生命周期方法时。
引入 React Hooks 后，功能组件比类组件更直观和简洁。
4.2 类组件：
类组件比功能组件要复杂一些，特别是需要使用 constructor 和 this 关键字时。

5.性能
5.1 功能组件：
在 React 16.8 版本之前，功能组件不能处理状态和副作用，因此在性能方面通常更轻量。
随着 Hooks 的加入，性能差异已经非常小。

5.2 类组件：
类组件会涉及更多的内存分配和复杂性，但 React 已经做了优化，性能差距非常小。

6.一句话总结
功能组件更简洁、轻量，使用 React Hooks 后功能更强大，
而类组件则提供了传统的状态管理和生命周期方法，适用于需要复杂功能的情况
```

总结

|     特性     |                功能组件                |                      类组件                      |
| :----------: | :------------------------------------: | :----------------------------------------------: |
|   定义方式   |              使用函数定义              |        使用类定义，继承 `React.Component`        |
|   状态管理   | 通过 `useState`（React Hooks）管理状态 |  通过 `this.state` 和 `this.setState` 管理状态   |
| 生命周期方法 |   使用 `useEffect` 模拟生命周期方法    | 使用内建的生命周期方法（如 `componentDidMount`） |
|  代码简洁性  |                 更简洁                 |                      更复杂                      |
|     性能     |                性能相似                |                     性能相似                     |
|              |                                        |                                                  |

### 2.5 React Native如何实现异步存储

```
1.概念
在React Native中，异步存储（AsyncStorage）
是一个用于存储和读取小型数据（如设置、用户偏好、会话信息等）的简单解决方案。
它基于键值对的形式进行存储，并支持异步操作。

在 React Native 中，之前使用的是 AsyncStorage，但它现在已经被移到独立的包中，
即 @react-native-async-storage/async-storage。
这个库提供了一个简单的 API 来进行数据存储和读取。

2. 使用
2.1 安装 AsyncStorage
要在React Native项目中使用异步存储，需要首先安装 @react-native-async-storage/async-storage 库：
npm install @react-native-async-storage/async-storage

2.2 常见的 API 操作
2.2.1 存储数据（setItem）：使用 setItem 方法将数据存储到异步存储中。

import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('key', value);
  } catch (e) {
    console.error("Error saving data", e);
  }
};
2.2.2 读取数据（getItem）：使用 getItem 方法从异步存储中获取数据
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('key');
    if(value !== null) {
      console.log(value);
    }
  } catch (e) {
    console.error("Error reading value", e);
  }
};
2.2.3 删除数据（removeItem）：使用 removeItem 方法删除存储的数据
const removeData = async () => {
  try {
    await AsyncStorage.removeItem('key');
  } catch (e) {
    console.error("Error removing value", e);
  }
};
2.2.4 清除所有数据（clear）：清空所有的存储数据。
const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error("Error clearing data", e);
  }
};
2.2.5 多项存储/读取（multiSet, multiGet）：可以同时存储或读取多个键值对。
const multiSet = async () => {
  try {
    await AsyncStorage.multiSet([['key1', 'value1'], ['key2', 'value2']]);
  } catch (e) {
    console.error("Error setting multiple values", e);
  }
};

const multiGet = async () => {
  try {
    const values = await AsyncStorage.multiGet(['key1', 'key2']);
    console.log(values); // [['key1', 'value1'], ['key2', 'value2']]
  } catch (e) {
    console.error("Error getting multiple values", e);
  }
};

3. 使用场景
-存储用户偏好设置：如保存语言设置、主题（暗黑/亮白）等。
-会话管理：存储用户的登录信息、身份验证 token 等。
-小型数据缓存：缓存一些简单的应用数据，以便在没有网络连接时使用。

4.注意事项
-容量限制：
AsyncStorage 适合存储少量数据（例如：少于 6MB 的数据），不适合存储大量的文件或数据库。

-数据类型：
AsyncStorage 存储的数据必须是字符串类型，如果需要存储对象，需要先将对象转换成字符串
（如 JSON.stringify()）存储，读取时再进行解析（如 JSON.parse()）。

5.总结
React Native实现异步存储通过
@react-native-async-storage/async-storage库提供的API来进行数据的存储、读取和删除操作，
适合用于存储少量数据，如用户设置、会话信息等。它采用异步操作，保证不会阻塞主线程，从而提升应用的性能
```

### 2.6 如何开发React Native插件

```
React Native 插件（也称为原生模块或原生扩展）是 React Native 中与原生代码进行交互的桥梁。
它允许你在 React Native 中调用 Android 和 iOS 平台的原生 API，或将一些平台特有的功能封装成组件或模块。

开发 React Native 插件的过程可以分为以下几个步骤：

1.步骤 1：创建一个新的 React Native 项目
首先，确保你已经安装了 React Native 环境，并创建一个新的 React Native 项目。
npx react-native init MyNativePluginApp
cd MyNativePluginApp

2.步骤 2：创建一个新的原生模块（插件）

你可以通过手动创建一个原生模块来实现插件。
原生模块分为 Android 和 iOS 两部分，开发时需要分别处理。

2.1  创建 Android 原生模块

2.1.1 在 android 文件夹下创建一个新的 Java 类，继承 ReactContextBaseJavaModule。
例如，创建一个 ToastModule.java 文件

package com.mynativeplugin;
import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ToastModule extends ReactContextBaseJavaModule {

  public ToastModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "ToastModule";
  }

  @ReactMethod
  public void show(String message) {
    Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();
  }
}

2.1.2 在 MainApplication.java 中注册这个模块：

import com.mynativeplugin.ToastModule;  // 导入你的模块
@Override
public List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    new ToastModule()  // 注册你的模块
  );
}

2.2 创建 iOS 原生模块
2.2.1 在 ios 文件夹下创建一个新的 Objective-C 类，继承 RCTBridgeModule。
例如，创建一个 ToastModule.m 文件：

#import "React/RCTBridgeModule.h"
#import "React/RCTLog.h"
@interface ToastModule : NSObject <RCTBridgeModule>
@end

@implementation ToastModule

RCT_EXPORT_MODULE();  // 将模块导出为 React Native 模块

RCT_EXPORT_METHOD(show:(NSString *)message) {
  RCTLogInfo(@"Showing toast with message: %@", message);
  // 这里可以调用原生的 iOS Toast 功能，或使用 UIAlertController 等
}

@end

2.2.2 在 AppDelegate.m 中注册该模块

3.步骤 3：创建 JavaScript 端的接口
为了在JavaScript中调用原生模块，需要在JavaScript中创建一个接口，使用NativeModules来调用原生模块的方法。
例如，创建一个 Toast.js 文件，调用刚才在原生代码中定义的方法：

import { NativeModules } from 'react-native';
const { ToastModule } = NativeModules;

const showToast = (message) => {
  ToastModule.show(message);  // 调用原生模块的 show 方法
};
export default showToast;

4.步骤 4：在 React Native 中使用插件
现在，你已经创建了一个原生模块，可以在 React Native 中调用它

import React from 'react';
import { Button } from 'react-native';
import showToast from './Toast';  // 导入刚才创建的 JS 接口

const App = () => {
  return (
    <Button
      title="Show Toast"
      onPress={() => showToast('Hello from Native!')}
    />
  );
};
export default App;

5.步骤 5：测试插件
运行 React Native 项目，确保插件能够在设备上正常工作。
npx react-native run-android   # 对于 Android
npx react-native run-ios       # 对于 iOS

6.步骤 6：发布插件（可选）
如果你想将插件发布给其他开发者使用，可以创建一个 NPM 包，并通过 NPM 或 Yarn 发布。

-在插件的根目录下创建 package.json 文件。
-添加适当的包信息，并确保插件支持 React Native 的链接（如果需要的话）。
-发布到 npm：npm publish

7.总结
开发一个 React Native 插件主要包括以下几个步骤：
-在原生平台（Android 和 iOS）中创建模块，定义原生代码。
-使用 JavaScript 创建接口，通过 NativeModules 访问原生功能。
-在 React Native 项目中调用该接口，并测试功能。
-如果需要，发布插件到 npm。

通过这些步骤，你可以扩展React Native的功能，封装原生代码并使其在JavaScript中可用，满足不同的应用需求
```

## 三 参考

* [掘金—React Native面试题总结](https://juejin.cn/post/7311602994571853851)



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md1-component-life.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md5-redux.png