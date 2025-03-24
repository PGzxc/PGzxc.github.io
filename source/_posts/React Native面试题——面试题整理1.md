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

1. React Native组件的生命周期
2. 如何安装特定版本的React Native？
3. 如何在React Native中导入组件？
4. 如何在React Native中添加React导航？
5. React Native热更新原因和运行机制 <!--more-->
6. 列出一些你可以优化应用程序的方法。
7. 如何在React Native中创建一个stackNavigator？
8. 在iOS和Android中，内存泄露的一些原因是什么，如何检测它们？

## 二 面试题解答(仅供参考)

### 2.1 React Native组件的生命周期

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

### 2.2 如何安装特定版本的React Native？

```
在 React Native 中，可以通过以下方式安装特定版本

1.使用 npx react-native init（推荐）
npx react-native@<版本号> init MyProject
例如，要安装 0.71.0 版本：
npx react-native@0.71.0 init MyProject
npx 会自动下载并使用指定版本，无需全局安装。

2.使用 yarn 或 npm 安装特定版本
如果项目已创建，可以修改 package.json 并手动安装：
yarn add react-native@<版本号>
或
npm install react-native@<版本号> --save
例如：
yarn add react-native@0.71.0

3. 检查当前 React Native 版本
npx react-native --version
或在 package.json 中查找 react-native 依赖项的版本号
```

### 2.3 如何在React Native中导入组件？

```
在 React Native 中，组件可以是 内置组件（如 View、Text、Button）或 自定义组件，
需要通过 import 语句导入。

1.导入 React Native 内置组件
React Native 提供了许多内置组件，
例如 View、Text、Image 等，可以直接从 react-native 导入：
import { View, Text, Button } from 'react-native';
示例：

import React from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  return (
    <View>
      <Text>Hello React Native!</Text>
      <Button title="Click Me" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default App;

2.导入自定义组件
如果有一个 MyComponent.js 文件：
import React from 'react';
import { Text } from 'react-native';

const MyComponent = () => {
  return <Text>This is MyComponent</Text>;
};

export default MyComponent;
可以在其他文件中导入并使用：
import MyComponent from './MyComponent';

const App = () => {
  return <MyComponent />;
};

3.以 default 或 named 方式导入

3.1 默认导出（default export）
import MyComponent from './MyComponent';
3.2 命名导出（named export）
import { MyComponent } from './MyComponent';

如果 MyComponent.js 这样导出
export const MyComponent = () => <Text>Named Export Component</Text>;
则需要使用 {} 进行导入
import { MyComponent } from './MyComponent';
```


### 2.4 如何在React Native中添加React导航？

```
在 React Native 中添加 React Navigation 可以通过以下步骤完成：

1.步骤 1：安装 React Navigation 及依赖项
1.1 安装 React Navigation：
npm install @react-navigation/native

1.2 安装所需的依赖库
npm install react-native-screens react-native-safe-area-context 
@react-native/native-stack

1.3 安装导航器（根据需要选择合适的导航器）：

-栈导航（Stack Navigator）
npm install @react-navigation/native-stack
-底部标签导航（Bottom Tabs）
npm install @react-navigation/bottom-tabs
-抽屉导航（Drawer Navigator）
npm install @react-navigation/drawer
-安装 react-native-gesture-handler（部分导航器需要）
npm install react-native-gesture-handler

2.步骤 2：在 index.js 或 App.js 中配置 NavigationContainer
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View>
    <Text>Home Screen</Text>
    <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
  </View>
);

const DetailsScreen = () => (
  <View>
    <Text>Details Screen</Text>
  </View>
);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

3.总结：
-安装 @react-navigation/native 和必要的依赖项。
-选择合适的导航器（Stack、Tabs、Drawer）。
-使用 <NavigationContainer> 包裹导航结构。
-使用 navigate、goBack 等方法来跳转页面

这样就成功地在 React Native 中添加了 React Navigation！
```

### 2.5 React Native热更新原因和运行机制

```
1.热更新的原因：
-发布效率提升： 避免每次修改都要重新提交 App 商店审核，直接推送更新。
-修复紧急问题： 出现重大 Bug 时，可快速修复并推送到用户端。
-减少安装包体积： 将部分逻辑更新放在远程服务器上，避免频繁更换原生代码

2.热更新的运行机制：

2.1 Bundle 文件更新
-React Native 的核心是 JS 代码逻辑，打包成 index.bundle 文件。
-热更新时，服务器会下发新的 JS Bundle 替换旧的 Bundle 文件。

2.2 检测更新
-App 启动或进入某个页面时，通过网络请求检查服务器上的最新版本。
-若有新版本，下载新的 JS Bundle 文件并缓存到本地。

2.3 加载新版本：
-下载完成后，重新加载 JS 文件，使应用逻辑生效，无需重启应用或重新安装。
-下次启动 App 时，加载本地缓存的最新 Bundle，实现更新效果

2.4 第三方工具支持
常用的热更新工具如 CodePush，可以提供完整的版本管理、灰度发布等能力。

3.总结
-React Native 的热更新主要通过远程下载新的 JS Bundle 文件来实现逻辑更新。
-运行机制包括 检测新版本 → 下载新 Bundle → 替换旧文件 → 加载新版本。
-借助 CodePush 等工具，热更新能大幅优化发布流程和修复效率
```

### 2.6 列出一些你可以优化应用程序的方法

```
1.优化组件渲染：
-使用 React.memo 和 PureComponent：避免不必要的重新渲染，提高性能。
-合理使用 shouldComponentUpdate()：根据需要优化组件更新条件，减少不必要的渲染。
-避免匿名函数作为 props：每次渲染都会创建新的函数，影响性能。

2.减少不必要的视图更新：
-使用FlatList或SectionList：对于长列表，使用这些优化的组件，支持懒加载和虚拟化，减少内存占用。
-分页加载数据：大数据列表使用分页或懒加载，避免一次性加载所有数据。

3.图片优化：
-按需加载图片：使用 react-native-fast-image等库来优化图片加载，支持缓存和图片压缩。
-压缩图片大小：确保图片的分辨率和文件大小适合目标设备，避免不必要的内存消耗。

4.避免使用大量的动画：
-动画优化：使用useNativeDriver来启用原生驱动，提高动画性能，减少JS线程负担。

5.优化网络请求：
-缓存请求结果：使用 React Query 或 Apollo Client 等工具缓存请求结果，避免频繁发起相同请求。
-批量请求：尽量将多个请求合并为一个请求，减少请求次数

6.内存管理：
-清理定时器和订阅：确保在组件卸载时清理所有的定时器和事件订阅，避免内存泄漏。
-避免重复加载资源：检查和避免重复加载资源（如图片、数据等）

7.使用 Native Modules（原生模块）：
-性能瓶颈时使用原生模块：
对于性能要求较高的任务（如图像处理、视频播放等），可以考虑使用原生模块来提高性能。

8.优化打包和构建：
-使用Proguard或Hermes：启用Hermes引擎或使用Proguard混淆来减小应用体积，提升启动性能。
-按需加载（Code Splitting）：将JavaScript代码分割成多个小文件，
只加载当前所需的部分，减少初始加载时间。

9.优化动画和过渡：
避免过多复杂动画：过多复杂动画可能导致主线程卡顿，尽量减少复杂的过渡效果。

10.使用本地存储：
-使用AsyncStorage、MMKV或其他本地数据库：存储和缓存一些数据，减少频繁的网络请求和加载时间。
```

### 2.7 如何在React Native中创建一个stackNavigator？

```
1.安装 React Navigation 和相关依赖
首先，确保你已经安装了 React Navigation 和所需的依赖：
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

2.安装react-native-gesture-handler（如果未安装）React Navigation需要这个库来处理手势：
npm install react-native-gesture-handler

3.导入必要的组件
在你的 App.js 文件中，导入 React Navigation 和 Stack Navigator

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

4.创建 Stack Navigator
使用 createNativeStackNavigator 创建导航器，并定义两个或多个屏幕（页面）

const Stack = createNativeStackNavigator();
function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

5.设置 NavigationContainer 和 Stack.Navigator
将你的屏幕组件嵌套在 NavigationContainer 和 Stack.Navigator 中来实现导航：
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

6.总结
-使用 @react-navigation/native 和 @react-navigation/native-stack 创建栈导航器。
-定义屏幕（HomeScreen 和 DetailsScreen）。
-使用 navigation.navigate() 实现页面跳转。
-使用 NavigationContainer 包裹导航器
```

### 2.8 在iOS和Android中，内存泄露的一些原因是什么，如何检测它们？

```
一.内存泄漏的常见原因：
1.1 未清理的定时器和事件监听器：
-在组件销毁时没有清理定时器（如 setTimeout、setInterval）和事件监听器
（如 addEventListener）。
这会导致这些回调函数仍然保持对组件的引用，从而无法被垃圾回收。

1.2 过度使用 setState：
-频繁调用setState，尤其是在不必要的情况下，可能导致React的虚拟DOM被频繁更新，增加内存使用和性能开销。
-特别是在不清理状态的情况下，组件会持续在内存中存在。

1.3 没有解除订阅或解除网络请求：

-使用诸如fetch、axios等网络请求时，未能在组件卸载时取消请求，可能导致请求完成后仍然存在对组件的引用。
-在使用事件或状态管理库（如 Redux）时，也要确保在组件销毁时取消相关订阅。

1.4 闭包（Closure）导致的引用保持：
-使用闭包时，可能会意外地持有对组件的引用，导致组件无法被销毁。
-例如，在回调函数中使用组件的 this 或状态对象

1.5 过度使用大对象或图片资源：
-加载大图片或数据时，未能及时释放这些资源，可能导致内存被大量占用，最终导致内存泄漏。

1.6 未释放的原生模块资源：
-使用原生模块时，如果没有在适当的时机释放原生资源（如传感器、位置服务等），也会导致内存泄漏。

二、如何检测内存泄漏：

2.1 使用 Xcode（iOS）：
-在 Xcode 中，使用 Instruments 工具的 Leaks 和 Allocations 功能可以检测内存泄漏。
通过记录应用运行时的内存使用情况，查看是否有持续增加的内存占用而没有被释放。

-可以通过 Allocations 工具来查看对象的分配情况，是否有对象没有被释放。

2.2 使用 Android Studio（Android）：
-在Android Studio中，使用 Profiler 工具查看内存使用情况。
通过 Memory Profiler，可以跟踪应用的内存使用变化，检查是否有内存泄漏。
-使用 Heap Dumps 来分析堆中的对象，找出无法被回收的对象。

2.3 使用 React Native 内置工具：
-React Native 提供了 remote debugging 和 React DevTools，
可以查看组件的生命周期、状态变化以及渲染情况。
-使用 console.log 或 console.time 来手动检查组件是否被正确卸载或清理。

2.4 使用第三方库：
-why-did-you-render：
这个库可以帮助你检测是否有不必要的重新渲染，它能帮助你找到不必要的内存占用。
-Leak Canary（Android）：
Android 中可以使用 LeakCanary 库来检测内存泄漏。它能帮助开发者在应用中捕获和报告内存泄漏。

2.5 手动检查和调试：
-在代码中确保每个事件监听器、定时器、网络请求等都在组件卸载时正确地被清理。
-对于使用 useEffect、componentWillUnmount 等生命周期方法的组件，确保资源被及时清理。

3.总结：
-常见原因：未清理定时器、事件监听器、网络请求，过度使用 setState，闭包等。
-检测方法：
--使用 Xcode Instruments（iOS）和 Android Studio Profiler（Android）进行内存跟踪。
--利用 LeakCanary（Android）、why-did-you-render 和 React DevTools 来查找潜在问题。
--代码中手动清理事件监听和定时器，避免不必要的内存占用

通过这些方法，可以有效检测和避免 React Native 应用中的内存泄漏问题
```

## 三 参考

* [React Native面试题库](https://webcc.gitee.io/blog/2018/04/09/React%20Native%E9%9D%A2%E8%AF%95%E9%A2%98%E5%BA%93(%E6%8C%81%E7%BB%AD%E6%9B%B4%E6%96%B0)/)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md1-component-life.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md1-redux.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-interview-md1-flex.png