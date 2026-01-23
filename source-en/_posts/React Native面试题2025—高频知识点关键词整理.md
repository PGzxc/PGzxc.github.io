---
title: React Native面试题2025—高频知识点关键词整理
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: c6a73170
date: 2025-04-11 16:33:07
---
## 一 概述

```
以下是 React Native 常见关高频键词
```

<!--more-->

## 二 高频知识点

### 2.1. React Native 安装
```bash
React Native 安装流程如下：

1.安装 Node.js（推荐使用 LTS 版本），它包含 npm；
2.安装 React Native CLI（可选）：npm install -g react-native-cli  
3.安装 Android Studio（用于安卓开发）或 Xcode（用于 iOS 开发）；
4.使用命令初始化项目：npx react-native init MyApp  
5.启动项目：
 -Android：npx react-native run-android
 -iOS：npx react-native run-ios（需 macOS）

整个流程依赖 Node 环境和平台原生工具链。你也可以选择使用 Expo 简化环境配置。
```

### 2.2. 组件生命周期
```
1. Class 组件生命周期
基于类的组件，具有完整生命周期方法：

-constructor()：组件创建时调用，常用于初始化 state。
-componentDidMount()：组件挂载完成后调用，常用于网络请求或订阅。
-shouldComponentUpdate()：控制组件是否需要重新渲染。
-componentDidUpdate(prevProps, prevState)：组件更新后调用。
-componentWillUnmount()：组件卸载前调用，用于清理定时器、事件监听等

 
2.Function 组件生命周期
函数组件借助 Hook 实现生命周期逻辑：

2.1 使用 useEffect() 模拟生命周期：

-相当于 componentDidMount：useEffect(() => { ... }, [])
-相当于 componentDidUpdate：useEffect(() => { ... }, [依赖项])
-相当于 componentWillUnmount：在 useEffect 内返回清理函数

2.2 示例
useEffect(() => {
  // 初始化逻辑

  return () => {
    // 清理逻辑
  };
}, []);
函数组件更简洁、灵活，推荐使用。
```

### 2.3. 渲染原理
```
1.使用 React Fiber 架构 高效构建和更新虚拟 DOM；
2.通过 Bridge 桥接机制，将 JS 层的 UI 更新指令异步传递给原生视图管理器（ViewManager）；
3.新架构 Fabric 引入并发渲染、同步通信与更直接的原生视图绑定，大幅提升渲染性能与响应速度。
```

### 2.4. Diff 算法与 Key
```
- 使用 `key` 标识组件唯一性，帮助 React 精准高效地进行差异化更新（diff）
- 减少重渲染，提高性能
```


### 2.5. 布局系统
```
- 基于 Flexbox（类似 Web 的布局方式）
- 支持方向（`row`/`column`）、对齐（`justifyContent`/`alignItems`）等属性
```

### 2.6. React Native Runtime（Bridge / Fabric）
```
React Native Runtime 是 React Native 的运行时核心，包含两大关键模块：

一、Bridge（旧架构）
-JS 与原生模块之间通过异步消息通信；
-存在性能瓶颈：通信开销大、延迟高、不支持同步调用。

二、Fabric（新架构）
-引入同步通信和并发渲染；
-允许 JS 直接操作原生 UI 元素；
-提高了 UI 响应速度和渲染效率；
-与 TurboModule、JSI（JavaScript Interface） 一起组成新架构三大核心。

总结：Bridge 是传统通信方案，Fabric 是更高效的下一代运行时架构，提升性能与可维护性
```


### 2.7. 原生通信机制
```
React Native 的原生通信机制通过 Bridge 实现 JS 与原生模块之间的双向通信，
分为以下几种方式：

1. Native Modules
-JS 调用原生模块的功能，如文件操作、传感器等；
-异步通信，JS 通过发送消息给原生模块，原生模块执行后返回结果。

2. Event Emitter
-允许原生端向 JS 发送事件通知；
-如传感器数据更新、位置变化等，JS 通过监听事件处理。

3. TurboModules（新架构）
-基于新架构 Fabric，提供更高效的同步调用；
-改善了 JS 与原生模块之间的通信效率。

总结：React Native 的原生通信机制通过异步消息传递、事件监听和新架构提升了跨平台调用的效率和灵活性。
```

### 2.8. 混合开发
```
一、概念
混合开发指的是在原生应用中集成跨平台框架（如 React Native）以实现部分功能。

二、特点：
2.1 嵌入原生 App：可以将 React Native 页面嵌入到原生应用中（例如通过启动 RN Activity）。
2.2 局部替换与增量接入：支持逐步将原生应用的部分模块替换为跨平台模块，实现增量开发与接入。

这种方式能够在不重写整个应用的情况下，逐步引入跨平台框架，提高开发效率。
```

### 2.9. 第三方库与插件
```
第三方库与插件是 React Native 开发中常用的工具，能够扩展应用的功能。

1. 安装第三方库
通过 npm 或 yarn 安装第三方库，便于快速集成现成的功能。
npm install <库名>
# 或者使用 yarn
yarn add <库名>

2. 原生模块封装为插件
可以将原生模块封装为跨平台插件，提供 JS 与原生代码之间的桥接，方便调用原生功能。

例如：将 Android/iOS 原生功能封装成插件，发布到 npm 或 yarn，供 React Native 项目使用。
```

### 2.10. 热重载与热更新
```
- Fast Refresh：开发阶段支持热替换代码并保留状态
- 热更新方案如 Microsoft CodePush：实现 JS Bundle OTA 更新，无需商店发版
```

### 2.11. 学习资料与社区资源

- 官方文档：[https://reactnative.dev](https://reactnative.dev)
- 社区活跃，有丰富的教程、开源库、博客、视频等资源支持


