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

1. props和state相同点和不同点
2. shouldComponentUpdate 应该做什么
3. redux状态管理的流程
4. 加载bundle的机制
5. Flex布局 <!--more-->
6. 请简述 code push 的原理
7. Redux中同步 action 与异步 action 最大的区别是什么
8. React PureComponent的原理
9. JS调用原生方法
10. 原生发送事件给JS
11. immutable.js 的原理
12. react native redux中间件
13. InteractionManager
14. Rect Native 增量更新方案
15. codePush 接入教程
16. React Native 打包参数

## 二 面试题解答(仅供参考)

### 2.1 props和state相同点和不同点

React Native 中，props 和 state 都是用于存储数据的对象，但它们在来源、可变性和用途上有所不同。

1.相同点

```
-都是普通的 JavaScript 对象: props 和 state 本质上都是 JavaScript 对象，用于存储数据。
-用于渲染 UI: props 和 state 中的数据都可以用于渲染组件的 UI。
-触发重新渲染: props 或 state 的改变都会触发组件的重新渲染
```

2.不同点

|      对比项      |                       `props`（属性）                        |                      `state`（状态）                       |
| :--------------: | :----------------------------------------------------------: | :--------------------------------------------------------: |
|    是否可修改    | **不可修改**，只能由 **父组件** 传递，组件本身不能更改 `props` | **可修改**，组件内部可以使用 `setState` 或 `useState` 更新 |
|     谁来管理     |                   **父组件** 传递给子组件                    |                     **组件自身** 维护                      |
|     是否可变     |                     不可变（Immutable）                      |                      可变（Mutable）                       |
|       作用       |                   传递外部数据，组件间通信                   |                   管理组件内部的动态数据                   |
|     何时使用     |                   组件需要从父组件接收数据                   |                  组件内部有需要改变的数据                  |
| 是否触发重新渲染 |                `props` 变化时，组件会重新渲染                |               `state` 变化时，组件会重新渲染               |

3-总结

```
props 是组件的配置，由父组件传递给子组件，子组件不能修改自己的 props。
state 是组件内部的状态，组件可以自行修改 state，从而更新 UI

举例:一个显示计数器的组件：
-props 可以用来设置计数器的初始值。
-state 用来存储当前的计数器值，并在点击按钮时更新。

理解 props 和 state 的区别对于构建可维护和高效的 React Native 应用至关重要。
它们共同作用，使得组件可以根据不同的数据渲染不同的 UI。
```

### 2.2 shouldComponentUpdate 应该做什么

```
在React Native中，shouldComponentUpdate()是类组件的生命周期方法，用于控制组件是否需要重新渲染

1.shouldComponentUpdate() 的作用
-优化性能：通过比较 props 和 state 的变化，决定是否触发重新渲染
-返回值
--返回 true（默认值）：允许组件重新渲染。
--返回 false：阻止组件更新，避免不必要的渲染

2.语法
shouldComponentUpdate(nextProps, nextState) {
  // 比较当前的 props/state 和即将变化的 nextProps/nextState
  return this.state.count !== nextState.count;
}

3.示例
import React from 'react';
import { Text, Button, View } from 'react-native';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 只有 count 改变时才重新渲染
    return this.state.count !== nextState.count;
  }

  increment = () => this.setState({ count: this.state.count + 1 });

  render() {
    console.log("Rendered!");
    return (
      <View>
        <Text>Count: {this.state.count}</Text>
        <Button title="Increment" onPress={this.increment} />
      </View>
    );
  }
}

4.总结
-shouldComponentUpdate() 主要用于性能优化，防止不必要的渲染。
-如果使用函数组件，可以用 React.memo() 和 useMemo() 来替代
```

### 2.3 redux状态管理的流程

![][2]

```
在 React Native 中，Redux 是一种常见的状态管理工具，它的流程可以用以下四个核心步骤来概括：

1.创建 Store（仓库）：Store 是应用的状态仓库，保存所有的状态数据
import { createStore } from 'redux';
const store = createStore(reducer);

2.定义 Reducer（状态管理器）：Reducer 是一个纯函数，根据 Action 的类型来更新状态

const initialState = { count: 0 };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

3.触发 Action（动作）：Action 是一个普通的 JavaScript 对象，描述“要做什么”。
const incrementAction = { type: 'INCREMENT' };
store.dispatch(incrementAction); // 触发 action

4.订阅更新（UI 绑定）：使用 useSelector() 获取状态，useDispatch() 触发 action

import React from 'react';
import { Text, Button, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch({ type: 'INCREMENT' })} />
    </View>
  );
};

```

总结：Redux 的流程

```
1.Store：保存全局状态。
2.Reducer：定义状态的更新逻辑。
3.Action：描述状态的变化动作。
4.Dispatch：触发 action，通知 reducer 更新状态。
5.Subscribe：组件订阅状态变化，自动更新 UI。
```

### 2.4 加载bundle的机制

```
在 React Native 中，bundle 是一个 JavaScript 文件，包含了应用的所有代码和资源。
加载 bundle 的机制决定了如何将应用代码从服务器或本地加载到设备上，并执行应用逻辑。
React Native 的 bundle 加载机制 主要依赖于 打包工具（如 Metro Bundler）以及 本地与远程加载策略

React Native 加载 Bundle 的机制：

1.开发模式下的加载（使用 Metro Bundler）
1.1 Metro Bundler：
React Native 使用 Metro Bundler 来打包应用的 JavaScript 代码。
Metro 是一个 JavaScript 打包器，
它将你的 React Native 代码（包括 JS、图片等资源）打包成一个单一的 bundle 文件。

1.2 加载过程：
-在开发模式下，当你启动一个React Native项目时，应用会向本地开发服务器（Metro Bundler）请求bundle。
-这个请求会加载 JavaScript 代码，并通过 WebSocket 协议与开发服务器进行实时通信，
以实现热更新（Hot Reload）或即时刷新（Live Reload）。
-代码会被逐步加载到设备上并运行。

1.3 示例：
# 启动 Metro Bundler
npx react-native start

在开发模式下，React Native 会从 Metro 服务器加载 JS bundle：
// 默认在开发模式下，app 会请求 Metro Bundler 提供的 URL
http://localhost:8081/index.bundle?platform=ios

2.生产模式下的加载（打包并嵌入到 APK 或 IPA 中）
2.1 过程
-在发布应用时，bundle 会被打包到应用的安装包中（如 APK 或 IPA 文件）。
这个过程是由 React Native CLI 或 Xcode / Android Studio 完成的。
-当应用被安装到设备上并启动时，JS 代码会从本地存储（安装包中）加载，而不再通过开发服务器加载。
-生产模式下，bundle 文件 被压缩、优化，并嵌入到应用内，以提高性能。

打包命令：
-对于 Android：
npx react-native bundle --platform android --dev false --entry-file index.js 
--bundle-output ./android/app/src/main/assets/index.android.bundle

-对于 iOS：
npx react-native bundle --platform ios --dev false 
--entry-file index.js --bundle-output ./ios/main.jsbundle

在应用启动时，JS bundle 会从本地文件系统加载：
// 生产模式加载本地 bundle 文件
const source = Platform.OS === 'ios'
  ? require('./main.jsbundle')
  : { uri: 'file:///android_asset/index.android.bundle' };

3.远程加载（Over-the-Air）

3.1 远程加载
-为了支持 远程更新（例如，修复 bug 或发布新功能），
React Native 支持通过 Over-the-Air (OTA) 更新 来动态加载 JS bundle。
-远程更新可以通过 CodePush 或 Microsoft App Center 等工具来实现，
允许开发者在应用已发布后直接推送更新，而无需重新提交到 App Store 或 Google Play。

3.2 远程加载流程：
-当应用启动时，React Native 会检查是否有新的 JS bundle 版本。
如果有，应用会从服务器下载新的 bundle 并替换本地的旧版本。
-这种方式使得应用可以快速获得更新，而无需通过商店发布。

4.总结
-开发模式：应用从 Metro Bundler 动态加载 bundle，通过 WebSocket 实现热更新。
-生产模式：bundle 被打包到 APK 或 IPA 文件中，应用启动时从本地加载。
-远程更新：使用 OTA 技术（如 CodePush）允许远程加载新的 JS bundle。

5.关键点
Metro Bundler 负责开发时的打包和加载。
生产环境中，bundle 文件会嵌入到安装包中。
通过 OTA 更新 可以在无需重新发布应用的情况下，直接更新 JS bundle。
```

### 2.5 Flex布局

![][3]

```
在 React Native中，布局采用了Flexbox，它与Web的Flexbox布局类似，但有些默认值不同。
Flexbox是一种一维布局模型，可以轻松地控制组件在主轴（Main Axis）和交叉轴（Cross Axis）上的排列方式。

Flex布局总结：
1.主轴：用flexDirection 控制（row 或 column）。
2.主轴对齐：用justifyContent控制（flex-start、center、flex-end、space-between、space-around）。
3.交叉轴对齐：用alignItems 控制（flex-start、center、flex-end、stretch）。
4.单独子元素对齐：用alignSelf 覆盖父容器的对齐规则。
5.自动填充空间：用 flex 来分配剩余空间。
```

### 2.6 请简述 code push 的原理

```
1.概念
Code Push 是微软提供的一种热更新服务，
允许在不经过应用商店审核的情况下，直接推送 JavaScript 代码和资源更新到用户的 React Native 应用。

2.工作原理
2.1 上传更新：
开发者通过命令行工具（code-push-cli），
将打包好的JS Bundle和资源文件（图片、样式等）上传到Code Push服务器。

2.2 检测更新：
应用启动时，Code Push SDK 会向服务器请求最新的更新信息，并与本地版本对比。

2.3 下载更新：
如果有新版本，应用会下载更新的 JS Bundle 和资源文件，并存储在本地设备的沙盒目录。

2.4 加载更新：
下载完成后，Code Push 会用新的 JS Bundle 替换原来的文件。
通常情况下，更新在下次应用启动时生效，但也可以配置为立即生效。

2.5 回滚机制
如果新版本存在崩溃等问题，Code Push 支持通过服务器 回滚到旧版本，确保用户体验稳定

3. 优势
1.无需重新上架：避免应用商店审核流程，快速修复 bug 或发布新功能。
2.动态更新：只更新 JS 和资源，不影响原生代码。
3.支持回滚：更新失败时，可以随时回滚到稳定版本。

4. 适用场景(注意：若涉及原生代码修改（如新增原生模块），仍需重新打包并上架应用商店)
1.修复紧急 bug。
2.优化页面逻辑或 UI。
3.推送小功能更新。

5. 总结：
Code Push 通过检测、下载、存储和加载新 Bundle 文件，
实现 React Native 应用的热更新，极大提升了迭代速度！
```

### 2.7 Redux中同步 action 与异步 action 最大的区别是什么

```
1.区别
在 Redux 中，同步 action 和 异步 action 的最大区别在于：

1.1 同步action：
返回一个普通的 对象，描述要执行的操作，交给 reducer 立即更新状态。
const increment = () => ({
  type: 'INCREMENT',
});

1.2 异步 action：
返回一个 函数（需要中间件如 redux-thunk 支持），可以在函数内执行异步操作（如网络请求），
然后在异步操作完成后，手动派发同步 action 来更新状态。
const fetchData = () => {
  return async (dispatch) => {
    const data = await fetch('https://api.example.com/data');
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  };
};

2.总结
-同步 action：直接触发 reducer 更新状态，操作立即生效。
-异步 action：先执行异步逻辑，完成后再派发同步 action 来更新状态。
```

### 2.8 React PureComponent的原理

```
1.原理
在 React Native 中，React.PureComponent 是一种优化性能的方式。它的原理在于

1.1 自动浅比较（Shallow Comparison）
-PureComponent 内部会在 shouldComponentUpdate() 方法中，
自动对 props 和 state 进行 浅比较（Shallow Compare）。
-只有当 props 或 state 发生变化时，组件才会重新渲染，避免不必要的渲染，提升性能。

import React, { PureComponent } from 'react';
import { Text } from 'react-native';
class MyComponent extends PureComponent {
  render() {
    console.log('Component Rendered');
    return <Text>{this.props.message}</Text>;
  }
}

2.对比说明
-普通 Component：每次父组件更新，子组件都会重新渲染。
-PureComponent：只有当 props 或 state 发生变化时才会重新渲染。

3.注意：
PureComponent 只做浅比较，如果 props 是对象或数组，内容变化但引用不变，不会触发重新渲染！

4.总结：PureComponent 通过浅比较优化渲染逻辑，减少不必要的渲染次数，提升性能。
```

### 2.9 JS调用原生方法

```
1.概念
在 React Native 中，JS 调用原生方法的方式主要依赖于 原生模块（Native Modules）。
原生模块允许在 JS 代码中调用 Android（Java/Kotlin）或 iOS（Objective-C/Swift）编写的原生功能。

2.步骤：
2.1 创建原生模块
-在 Android 端，创建一个 Java/Kotlin 类继承 ReactContextBaseJavaModule
-在 iOS 端，创建一个 Objective-C/Swift 类继承 RCTBridgeModule。

2.2 导出原生方法：
-使用 @ReactMethod（Android）或 RCT_EXPORT_METHOD（iOS）来暴露原生方法给 JS。

2.3 在 JS 侧调用：使用 NativeModules 导入原生模块，并直接调用方法

3.示例（Android）
3.1 原生代码（Java）
package com.example;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class MyNativeModule extends ReactContextBaseJavaModule {
    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }

    @ReactMethod
    public void addNumbers(int a, int b, Promise promise) {
        promise.resolve(a + b);
    }
}
3.2 JS 代码
import { NativeModules } from 'react-native';

const { MyNativeModule } = NativeModules;

MyNativeModule.addNumbers(5, 3)
  .then(result => console.log('Result:', result))
  .catch(error => console.error(error));
  
4. 总结：
-创建原生模块，导出方法给 JS 使用。
-JS 通过 NativeModules 访问原生方法，实现跨平台通信。
-常用于调用设备硬件、系统功能等原生能力。

一句话总结：React Native 利用原生模块机制，让 JS 代码能调用 Android/iOS 的原生功能！
```

### 2.10 原生发送事件给JS

```
1.概念
在 React Native 中，原生代码可以通过 事件机制 将数据或通知发送给 JS 层，
常用于监听原生事件（如传感器、网络状态等）。

2. 步骤
下面简单介绍一下原理和步骤：
2.1 创建事件发送：在 Android 端使用 RCTDeviceEventEmitter，在 iOS 端使用 RCTEventEmitter
2.2 发送事件：在原生代码中定义方法，使用事件发送器将事件抛给 JS。
2.3 JS 层监听事件:使用 DeviceEventEmitter（Android/iOS 通用）来接收事件，并处理数据

3. 示例（Android）
3.1 原生代码（Java）
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MyNativeModule extends ReactContextBaseJavaModule {
    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }

    // 发送事件方法
    private void sendEvent(String eventName, String message) {
        getReactApplicationContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, message);
    }

    // 示例：触发事件
    @ReactMethod
    public void triggerEvent() {
        sendEvent("MyCustomEvent", "Hello from Native!");
    }
}
3.2 JS 代码：
import { DeviceEventEmitter, NativeModules } from 'react-native';

const { MyNativeModule } = NativeModules;

// 监听原生事件
DeviceEventEmitter.addListener('MyCustomEvent', (message) => {
  console.log('Received:', message);
});

// 触发事件（模拟原生调用）
MyNativeModule.triggerEvent();

4. 总结
-原生代码通过事件发送器（DeviceEventEmitter）发送事件。
-JS 通过 DeviceEventEmitter.addListener 监听事件，实时接收原生层的信息。
-适用于状态变化监听、传感器数据推送、后台任务等场景。

一句话总结：原生通过事件机制向 JS 通信，实现双向交互！
```

### 2.11 immutable.js 的原理

```
在React Native中，immutable.js 是Facebook推出的一个库，用来创建不可变数据结构，提升性能和代码稳定性。
它的原理主要体现在以下几点

1.数据不可变性
-immutable.js 创建的数据结构一旦生成，就无法直接修改。
-每次更新都会返回一个新对象，原对象保持不变，从而避免意外修改

示例
import { Map } from 'immutable';
const data = Map({ count: 0 });
const newData = data.set('count', 1);
console.log(data.get('count')); // 0（原数据没变）
console.log(newData.get('count')); // 1（返回新数据）

2.结构共享（Persistent Data Structure）
结构共享：新对象和旧对象会共享未更改的部分，只复制发生变化的部分，减少内存消耗，提升性能。

3.优化渲染
在React中，immutable.js 可以配合PureComponent使用，
利用浅比较机制（===），快速判断数据是否发生变化，从而避免不必要的渲染。

if (oldData !== newData) {
  console.log('数据变化，触发渲染');
}

4.总结
-不可变性：数据一旦创建不可修改，避免意外更改。
-结构共享：只更新变动部分，提升性能。
-优化渲染：借助浅比较机制，减少不必要的渲染。

一句话总结：immutable.js 通过不可变性和结构共享机制，让数据管理更安全、高效，特别适合 Redux 的状态管理！
```


### 2.12 react native redux中间件

```
1.概念
在 React Native 中，Redux 中间件 是一个在 dispatch 和 reducers 之间的扩展点，
用于处理异步逻辑、日志记录、错误报告等。
常见的 Redux 中间件有 redux-thunk、redux-saga 等。

2.Redux 中间件的原理
-拦截 action：中间件会拦截 dispatch 的 action，在传递给 reducer 之前执行额外逻辑。
-增强 dispatch：允许 dispatch 不仅接收对象，还能处理函数或 Promise（如异步请求）。
-链式调用：多个中间件可以通过 applyMiddleware 组合，形成中间件链。

3.常见中间件
3.1 redux-thunk：让 dispatch 支持函数，处理异步操作。
const fetchData = () => async (dispatch) => {
  const data = await fetch('https://api.example.com/data');
  dispatch({ type: 'FETCH_SUCCESS', payload: data });
};

3.2 redux-saga：使用生成器函数来管理异步逻辑，更清晰地处理副作用
function* fetchDataSaga() {
  const data = yield call(api.fetchData);
  yield put({ type: 'FETCH_SUCCESS', payload: data });
}

4. 总结
-作用：解耦逻辑、管理异步操作、增强 dispatch 功能。
-原理：拦截 action，执行额外逻辑后再传给 reducer。
-常用：redux-thunk（简单易用），redux-saga（强大但复杂）。

一句话总结：Redux 中间件通过拦截 action，提供额外的处理能力，解决异步逻辑和代码解耦问题！
```

### 2.13 InteractionManager

```
1.概念
在 React Native 中，InteractionManager 是一个用于处理与 UI 渲染相关的交互任务的 API。
它的主要作用是确保某些任务（比如动画、网络请求等）在屏幕渲染完成之后再执行，
从而避免阻塞主线程，提升应用的流畅性。

2.原理与使用场景
2.1 任务调度：
InteractionManager 允许我们将某些任务延迟到下一个 UI 渲染周期之后执行，
确保这些任务不会阻塞 UI 渲染，避免界面卡顿。

2.2 常见用途
通常用于在 UI 渲染后执行复杂的计算、动画或 API 请求，确保这些操作不会影响到界面的流畅度。

3.基本用法
3.1：runAfterInteractions()：
该方法用于将回调函数调度到所有交互操作完成后再执行。
通常用于延迟执行需要在 UI 渲染后完成的任务。

import { InteractionManager } from 'react-native';
// 延迟执行某些操作，直到所有交互动画完成
InteractionManager.runAfterInteractions(() => {
  console.log('所有交互完成，可以执行此任务');
});

3.2 InteractionManager.runBeforeInteractions()：
这个方法会把回调函数排队到交互和动画之前执行，不过较少使用。

4.总结
InteractionManager 是 React Native 提供的一种机制，
确保非渲染紧急的任务（如动画、请求等）在 UI 渲染完成后再执行，提升应用的流畅性和响应速度。

5.一句话总结：InteractionManager 延迟执行非紧急任务，避免阻塞 UI 渲染，提升用户体验！
```

### 2.14 Rect Native 增量更新方案

```
1.概念
在 React Native 中，增量更新（Incremental Update）
是指通过将更新内容（如 JS Bundle 或资源文件）分发给用户，而无需重新发布整个应用。
这样可以减少更新包的大小，提高更新速度和用户体验。

2.常见的增量更新方案
2.1 Code Push
-Code Push：
是微软提供的一个热更新服务，允许开发者无需通过应用商店审核，即可直接推送 JavaScript 代码和资源文件的更新。
它可以实现应用的增量更新，更新内容可以是修复 bug 或添加小功能，而不需要重新发布整个应用。
-通过Code Push，开发者可以将JS Bundle、图片等资源更新推送到用户设备，用户在启动应用时自动下载并应用更新。
-原理：在 JS 代码更新时，只更新代码和资源部分，不影响原生代码，节省流量并加快更新速度。

import codePush from "react-native-code-push";
class MyApp extends React.Component {
  componentDidMount() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }
}

2.2 Hot Module Replacement (HMR)
-HMR 是一种开发模式下的增量更新，允许在不刷新整个应用的情况下，仅重新加载修改过的模块。
它通常用于开发阶段，在开发过程中提供即时反馈。
-在生产环境中不常用，因为它需要较复杂的配置，并且在应用商店审核时无法使用。

2.3 Dynamic Delivery (通过 Google Play 和 App Store)
-对于 Android 和 iOS，可以通过 Google Play 和 App Store 提供的增量更新机制来实现。
-Google Play提供了App Bundles，可根据用户设备的特性（如架构、语言等）进行增量更新，只下载必要的资源。
-iOS 提供了 App Thinning，可以针对不同的设备和需求只下载需要的部分资源，从而减少应用包的大小。

3.总结
增量更新方案可以通过 Code Push（热更新）、
HMR（开发模式）以及 平台原生增量更新功能（如 Google Play 和 App Store）来实现。
这些方案能够提高应用更新的速度和效率，尤其在修复 bug 或推出小功能时，减少了用户的等待时间和流量消耗。

一句话总结：React Native 增量更新通过热更新和平台增量更新机制，帮助开发者快速发布小更新，提高用户体验
```

### 2.15 codePush 接入教程

```
1.概念
CodePush 是微软提供的一项服务，允许你无需通过应用商店审核就能推送 JavaScript 代码和资源的增量更新。
接入 CodePush 可以帮助 React Native 应用快速发布小的修复或更新，提高用户体验。

2.React Native CodePush 接入教程
2.1  安装依赖：
-首先，安装 react-native-code-push 包和相应的 CLI 工具
npm install react-native-code-push --save
-如果使用的是 React Native 0.59 或更早的版本，你需要手动链接
react-native link react-native-code-push
-对于 React Native 0.60+，因为使用了自动链接，所以不需要手动链接

2.2 在应用中配置 CodePush
在你的 React Native 项目的 App.js 文件中，导入 codePush 并将它应用到主组件上。

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import codePush from 'react-native-code-push';
class App extends Component {
  render() {
    return (
      <View>
        <Text>Welcome to React Native CodePush!</Text>
      </View>
    );
  }
}

// 配置 CodePush 更新策略
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL, // 手动检查更新
  installMode: codePush.InstallMode.IMMEDIATE // 立即安装更新
};

// 使用 codePush 包裹 App 组件
export default codePush(codePushOptions)(App);

2.3 创建 CodePush 账户并获取秘钥
2.3.1 访问 CodePush 网站并创建账户
2.3.2 在创建好账户后，你需要获取 App Key（用于标识应用）：
-登录到 CodePush 后台。
-创建一个新的应用，选择平台（iOS 或 Android）。
-获取该应用的 Deployment Key，用于推送更新

2.4 配置 Android 和 iOS

2.4.1 Android：
-在 android/app/build.gradle 文件中配置 CodePush
apply plugin: 'com.microsoft.codepush'
-并在 defaultConfig 下添加：
buildTypes {
    release {
        // 其他配置
        resValue "string", "CodePush_deploymentKey", "<Your Android Deployment Key>"
    }
}
2.4.2 iOS
打开 ios/{your_project}.xcodeproj，在 Info.plist 文件中添加 CodePush 配置：
<key>CodePushDeploymentKey</key>
<string>YOUR_IOS_DEPLOYMENT_KEY</string>

2.5 发布更新：发布更新是通过 CodePush CLI 实现的。

2.5.1 安装 CodePush CLI（如果尚未安装）
npm install -g code-push-cli

2.5.2 登录到 CodePush
code-push login

2.5.3 发布更新
-在 React Native 项目根目录下生成新的 JavaScript Bundle：
react-native bundle --entry-file index.js --bundle-output 
./index.android.bundle --platform android --dev false --minify true

-然后发布更新：
code-push release-react <Your App Name> android -d Production
其中 -d Production 是指定发布的目标环境，可以是 Staging 或 Production。

2.6 检查和更新
在应用启动时，你可以选择手动检查更新，或者自动检查更新
// 手动检查更新
codePush.sync({
  updateDialog: true, // 弹出更新提示框
  installMode: codePush.InstallMode.IMMEDIATE, // 立即安装更新
});

3.总结
通过以上步骤，你可以成功将 CodePush 集成到你的 React Native 项目中，并实现应用的热更新。
这样，你就可以在不经过应用商店审核的情况下，快速发布 JavaScript 代码的更新。


一句话总结：通过 CodePush，你可以为 React Native 应用提供增量更新，实现无缝、快速的更新发布体验
```

### 2.16 React Native 打包参数

```
1.概念
在 React Native 中，打包是将开发环境中的 JavaScript 代码和资源打包成一个可供设备运行的应用包的过程。
打包过程中，常用的参数用于优化和定制构建结果。以下是 React Native 打包过程中常见的参数及其作用：

2. Android 打包参数：
在 React Native 项目的根目录，使用 react-native CLI 进行打包时，常用的参数包括：

2.1 --variant
-用于指定打包的构建类型。
-常见的值有：release（发布版本）、debug（调试版本）。
react-native run-android --variant=release

2.2 --appId
用于指定 Android 应用的包名
react-native run-android --appId=com.example.myapp

2.3 --no-packager
跳过启动开发服务器（Metro bundler），适用于已经构建好 JS Bundle 的场景。
react-native run-android --no-packager

2.4 --debug 和 --release
1.--debug：用于在调试模式下启动应用（包含开发工具和调试功能）
2.--release：用于在发布模式下启动应用，去除调试信息，并进行优化。
react-native run-android --release

3.iOS 打包参数
使用 react-native CLI 来打包 iOS 应用时，常见的参数有
3.1 --configuration
用于指定打包的构建配置。
常见的值有：Debug（调试模式）、Release（发布模式）。
react-native run-ios --configuration Release

3.2 --device
用于指定将应用安装到真机设备上，而不是模拟器。
react-native run-ios --device "iPhone 12"

3.3 --no-packager
跳过启动开发服务器，适用于已经有打包好的 JS 文件的场景。
react-native run-ios --no-packager

3.4 --scheme
用于指定 Xcode 中的 scheme，常见的值为 Release 或 Debug。
react-native run-ios --scheme Release

4. 生成 JS Bundle
有时你需要单独打包 JS 文件（JS Bundle），通常使用以下命令

4.1 Android
react-native bundle --platform android --dev false --entry-file index.js 
--bundle-output android/app/src/main/assets/index.android.bundle 
--assets-dest android/app/src/main/res

4.2 iOS
react-native bundle --platform ios --dev false --entry-file index.js 
--bundle-output ios/main.jsbundle --assets-dest ios

--platform：指定平台（android 或 ios）
--dev：是否启用开发模式，false 为生产模式（压缩、去调试信息）。
--entry-file：入口文件，通常为 index.js。
--bundle-output：指定 JS Bundle 输出路径
--assets-dest：指定资源文件（如图片）的输出目录

5.总结
React Native 打包过程中，有多个参数帮助开发者控制构建类型、目标平台、资源路径等。常见的打包参数包括：
--variant：指定构建类型（如 release）。
--configuration：指定构建配置（如 Debug 或 Release）。
--no-packager：跳过 Metro Bundler。
--dev：指定是否为开发模式或生产模式。
--entry-file：指定入口文件。

一句话总结：React Native 打包通过多种参数配置，帮助开发者灵活生成适用于不同平台和模式的应用
```

## 三 参考

* [简书—React Native面试题总结](https://www.jianshu.com/p/af455071a6b8)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md1-component-life.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md1-redux.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md1-flex.png