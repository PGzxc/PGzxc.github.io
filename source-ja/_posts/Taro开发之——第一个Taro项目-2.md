---
title: Taro开发之——第一个Taro项目(2)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 73289dfa
date: 2025-06-23 08:34:50
---
## 一 概述

* 开发环境
* cli工具安装
* 创建项目

<!--more-->

## 二 开发环境

* 操作系统：Windows 11 专业版 22H2
* Node: 22.16.0
* Yarn: 1.22.22
* 开发工具：VSCode

## 三 cli工具安装

### 3.1 安装@tarojs/cli

打开终端，执行如下指令(npm方式)

```
npm install -g @tarojs/cli
```

### 3.2 查看Taro版本信息

```
npm info @tarojs/cli
```

![][2]

## 四 创建项目

### 4.1 VSCode打开Taro目录

![][3]

### 4.2 通过taro指令创建项目

```
taro init TaroDemo
```

![][4]

### 4.3 项目创建过程中相关操作

1、请输入项目介绍(可以为中文)

```
第一个Taro项目
```

2、请选择框架(通过上下箭头选择后回车)—本文选择React

![][5]

说明

```
1、React
完整生态支持：可无缝使用 React Hooks、Context API 等特性，兼容 Redux、MobX 等状态管理库。
组件复用性强：React 组件可直接迁移至 Taro 项目，适合已有 React 团队快速切入跨端开发。
JSX 语法友好：使用熟悉的 JSX 编写 UI，支持 TypeScript 静态类型检查

2、PReact
轻量级：体积仅 3KB（React 约 42KB），编译后包体积更小，适合对性能敏感的小程序。
API 兼容 React：语法与 React 几乎完全一致，可直接替换 React 使用。
快速渲染：基于虚拟 DOM diff 算法优化，渲染性能接近原生

3、Vue3
Composition API：使用组合式 API 组织逻辑，代码更易维护，适合大型项目。
响应式系统：基于 Proxy 的响应式原理，性能优于 Vue2。
Vue 生态兼容：支持 Vue Router、Pinia 等库，适合 Vue 开发者平滑过渡。

4、Solid
高性能响应式：基于细粒度响应式系统，无需虚拟 DOM diff，性能接近原生。
类似 JSX 的语法：使用 JSX 编写 UI，但编译时转换为原生 DOM 操作。
最小运行时：运行时仅 3KB，适合极致性能场景
```

3、是否需要使用TypeScript?

```
推荐选择，保证类型安全
```

![][6]

4、是否需要编译为ES5?(本文选N)

```
若有H5项目要求，需兼容 IE11，编译为 ES5，否则保留 ES6+
```

![][7]

5、请选择CSS预处理器(Sass/Less/Stylus)—本文选择Sass

```
首选 Sass (SCSS)：生态成熟、功能全面，适合大多数项目。
次选 Less：与 Ant Design 深度集成，适合 React 项目。
Stylus：适合追求语法灵活性和极致性能的团队。
```

![][8]

6、请选择包管理工具(yarn/pnpm/npm/cnpm)—本文选择yarn

```
首选 pnpm：兼顾速度、磁盘空间和依赖安全性，尤其适合大型 Taro 项目或磁盘空间有限的环境。
次选 yarn：若团队熟悉 yarn 且需离线支持，或项目依赖复杂，yarn 是可靠选择。
国内环境可选 cnpm：网络不稳定时，cnpm 的淘宝镜像可大幅提升安装体验。
npm：适合小型项目或需严格遵循 npm 生
```

![][9]

7、请选择编译工具(webpack5/Vite)—本文选择Webpack5

```
首选Vite：对于大多数Taro项目，尤其是中小型项目或开发体验敏感的场景，Vite 的开发效率提升显著。
Webpack5：对于大型项目、需精细控制构建流程或依赖特定Webpack插件的场景，Webpack5仍是更可靠的选择。
```

![][10]

8、请选择模板源(Gitee/Github/Cli内置默认模板/自定义/社区优质模板源)——本文选择Github

```
首选 Github（网络允许）：获取最新官方支持和完整文档。
国内用户选 Gitee：避免网络问题，保证初始化速度。
企业级选自定义模板：统一技术栈和代码规范。
特定场景选社区模板：如电商项目可直接使用 NutUI-Taro 模板。
```

![][11]

9、请选择模板(默认模板/mobx/pwa/react-native/react-native-harmony/react-nutui/redux)

```
1、初学者：
从Default模板开始，逐步添加所需功能

2、状态管理：
-中小型项目：优先选MobX（简单灵活）
-大型项目：选Redux（生态成熟，便于调试）

3、多端需求：
-纯小程序 / H5：默认模板
-需要原生 App：React-Native模板
-鸿蒙系统：React-Native-Harmony模板

4、UI 组件：
电商类优先选React-NutUI，其他场景手动集成(如 Ant Design)
```

![][12]

### 4.4 初始化完成后，项目结构如下图(提示为了安装依赖)

![][13]

### 4.5 进入项目，安装依赖

```
cd TaroDemo
yarn install
```

![][14]

## 五 参考

* [Taro官网—安装及使用](https://docs.taro.zone/docs/GETTING-STARTED)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-install-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-info-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-vscode-open-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-init-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-lan-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-ts-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-es5-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-sass-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-yarn-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-build-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-temp-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-temp-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-struct-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-2-demo-yarn-14.png