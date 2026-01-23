---
title: React Native面试题2025——路由与导航(3)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 83642a75
date: 2025-04-10 10:08:33
---
## 一 概述

1. React Navigation 和 React Native Navigation 的区别是什么？何时选择使用其中一个？
2. 请解释 React Navigation 的 StackNavigator、TabNavigator 和 DrawerNavigator。
3. React Native 中的导航是如何处理生命周期的？如何实现导航时的数据传递和状态保存？
4. 如何在 React Native 中实现深度链接（Deep Linking）？

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 React Navigation 和 React Native Navigation 的区别是什么？何时选择使用其中一个？

```
一、区别
React Navigation 和 React Native Navigation 都是 React Native 中常用的导航库，
但它们有一些区别：

1. React Navigation：
-基于 JavaScript：完全使用 JavaScript 实现，导航逻辑由 JavaScript 控制。
-易于使用和配置：适合快速开发和原型设计，配置简单，开发者可以轻松集成。
-跨平台一致性：在 iOS 和 Android 上表现一致，界面和体验统一。
-性能相对较低：由于完全由 JavaScript 控制，性能在复杂的导航场景下可能较差，尤其是包含大量页面和复杂动画时。

2. React Native Navigation：
-基于原生实现：由原生平台（iOS 和 Android）提供支持，采用原生导航控制。
-更接近原生体验：提供更原生的性能和交互体验，尤其在多层级堆栈导航和复杂动画中表现更好。
-配置较为复杂：需要原生代码的支持，配置相对繁琐，可能需要对原生代码有一定了解。

二、何时选择使用其中一个？
2.1 选择 React Navigation：
-如果需要快速开发、简单的导航需求，且对性能要求不是特别高。
-适用于大多数普通应用，尤其是原型设计和跨平台一致性要求较高的场景。

2.2 选择 React Native Navigation：
-如果对性能和原生体验有较高要求，尤其是在需要复杂导航或大量页面的应用中。
-适用于大规模应用、需要复杂原生导航体验的场景，比如具有多个嵌套导航的应用。
```

### 2.2 请解释 React Navigation 的 StackNavigator、TabNavigator 和 DrawerNavigator。

```
一、常见导航
React Navigation 提供了几种常见的导航模式，
分别是 StackNavigator、TabNavigator 和 DrawerNavigator，
它们用于不同的页面切换需求：

1.1 StackNavigator：
功能：用于实现页面之间的堆栈式导航。每次新页面的跳转都会将页面“压入”堆栈，
返回时通过“弹出”堆栈来回到上一个页面。

使用场景：适用于大多数应用中的标准页面跳转（例如从列表页面跳转到详情页），
可以支持页面的历史栈，支持前进和后退操作。

1.2 TabNavigator：
功能：用于实现标签导航，通常在屏幕底部显示一组标签，用户可以通过点击标签在不同的页面间切换。
使用场景：适用于需要在不同视图间快速切换的场景，如底部导航栏（例如首页、消息、个人资料等）。

1.3 DrawerNavigator：
功能：用于实现抽屉式导航，通常在屏幕边缘滑动时会显示一个侧边菜单，用户可以从中选择不同的页面。
使用场景：适用于侧边菜单的应用，通常用来展示更多的页面选项，常见于包含设置、用户信息、帮助等功能的应用。

二、总结：
-StackNavigator：用于实现页面堆栈式导航，适合页面跳转。
-TabNavigator：用于实现底部标签导航，适合多个主要功能页面。
-DrawerNavigator：用于实现侧边抽屉菜单，适合展示更多选项。
```

### 2.3 React Native 中的导航是如何处理生命周期的？如何实现导航时的数据传递和状态保存？

```
在 React Native 中，导航与组件的生命周期紧密相关。
React Navigation 通过控制组件的生命周期来管理页面的导航和状态。

1. 导航生命周期处理：
1.1 页面的加载与卸载：
ReactNavigation会在页面进入时自动触发组件的componentDidMount和componentWillUnmount等生命周期方法。
通过这些方法，开发者可以在页面加载时执行必要的初始化操作（如数据获取），并在页面卸载时清理资源（如取消网络请求）。

1.2 导航回调：
React Navigation 提供了 navigation.addListener 方法，可以监听页面的焦点变化（如页面的进入和离开）。
例如，当页面重新进入时，可以通过监听 focus 事件来触发某些操作。

2. 数据传递：
2.1 通过 params 传递数据：
可以在导航时通过 navigation.navigate 或 navigation.push 等方法传递参数（params）给目标页面。
例如：
navigation.navigate('Details', { itemId: 86 });

2.2 在目标页面中，通过 route.params 获取传递的数据：
const { itemId } = route.params;

3. 状态保存：
3.1 React Navigation 自动保存状态：
React Navigation 会自动保存导航状态，例如历史记录、页面顺序等。
这意味着当你返回到某个页面时，React Navigation 会恢复页面的上次状态。

3.2 持久化状态：
可以结合 useEffect 和 useState 来手动保存和恢复页面的状态。
例如，使用 AsyncStorage 或其他持久化方案来保存用户数据、输入内容等，确保在页面重新加载时恢复状态。

3.3 Screen 组件的 unmountOnBlur 属性：
通过设置 unmountOnBlur 为 true，可以在页面离开时卸载该页面，减少内存占用，避免页面状态过多占用资源。

总结：

-导航生命周期：通过事件监听（focus、blur）和生命周期方法（如 componentDidMount、componentWillUnmount）管理页面的加载与卸载。
-数据传递：通过 navigation.navigate 和 route.params 实现页面间的数据传递。
-状态保存：React Navigation 自动保存导航状态，开发者可通过持久化方案手动保存页面状态，确保应用数据不丢失。
```

### 2.4 如何在 React Native 中实现深度链接（Deep Linking）？

```
1.配置原生平台（iOS 和 Android）支持的 URL scheme 或 URI。
2.在 React Navigation 中配置深度链接的处理规则，映射 URL 路径到具体的页面。
3.使用 Linking API 监听并处理深度链接事件。
```

