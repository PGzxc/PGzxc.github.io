---
title: React Native高频面试题——UI库与生态(4)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: d964a77c
date: 2025-10-12 09:12:41
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二  面试要求和面试题

```
1.UI 库：NativeBase、UI Kitten、React Native Elements
2.跨平台 UI：Ant Design、Antd Mobile
3.第三方依赖：NPM/Yarn/Pnpm 仓库管理
```

### 三 面试题解答(仅供参考)

### 3.1 UI 库

1、React Native 常见的 UI 库有哪些？它们有什么特点？

```
1、NativeBase：基于原生组件，支持主题化和暗黑模式，适合大型项目和复杂 UI。
2、UI Kitten：基于 Eva Design System，支持主题切换和 Design Tokens，适合统一设计风格。
3、React Native Elements (RNE)：轻量级，组件简洁，跨平台一致性好，适合快速开发 MVP。
```

2、UI 库组件与原生组件（View/Text）相比有什么优缺点？

```
1、原生组件：轻量、性能高，但样式需要手写。
2、UI 库组件：开箱即用，支持主题一致性，但包体积大，定制受限。
```

3、如何选择合适的 UI 库？

```
1、NativeBase：适合复杂主题、大型项目。
2、UI Kitten：适合需要 Eva Design System、统一设计语言的项目。
3、RNE：适合小型项目或快速原型开发。
```

4、如何对 UI 库进行深度定制？

```
1、NativeBase：通过 theme 对象定义全局主题，也可在组件级别覆盖 style。
2、UI Kitten：修改 mapping.json 与 theme.json，可调整 design tokens。
```

5、如何优化 UI 库带来的性能问题？

```
-使用库内置的 FlatList 组件或配置虚拟化（removeClippedSubviews）。
-避免 ScrollView 嵌套。
-监控渲染次数，减少不必要的重绘。
```

### 3.2 跨平台 UI

1、Ant Design 系列有哪些版本？它们适用于哪些场景？

```
-Antd (Web)：企业级 Web 应用，组件丰富。
-Antd Mobile：移动端 H5/小程序。
-Antd-Mobile-RN：React Native 适配版，但支持有限。
```

2、在 React Native 中使用 Ant Design 有什么优缺点？

```
优点：一致的企业级 UI 设计、国际化支持、组件丰富。
缺点：包体积较大，RN 支持不完整，有些功能需依赖 WebView。
```

3、如何保证 Web 与 RN 在 UI 风格上的一致性？

```
-使用 主题变量 (tokens) 统一颜色、字体、间距。
-通过 Platform.select 处理 iOS/Android 样式差异。
-在 RN 中配置主题模拟 Ant Design Web 的设计风格。
```

### 3.3 第三方依赖

1、`dependencies` 和 `devDependencies` 有什么区别？

```
-dependencies：运行时依赖，打包时会被包含。
-devDependencies：开发时依赖（如 Babel、ESLint），不会进入最终包。
```

2、`npm install` 和 `npm ci` 有什么区别？

```
-npm install：根据 package.json 安装，可能更新 lock 文件。
-npm ci：严格按照 lock 文件安装，删除 node_modules 后重新安装，适合 CI/CD。
```

3、NPM、Yarn、Pnpm 的区别是什么？

```
-NPM：默认工具，简单但速度一般。
-Yarn：并行安装、更快，支持 workspaces。
-Pnpm：硬链接机制，节省磁盘，避免幽灵依赖，适合大型/Monorepo 项目。
```

4、什么是幽灵依赖？如何避免？

```
定义：未在 package.json 声明，但因依赖树安装进来而可用的包。
风险：升级或切换包管理器时会报错。
解决：使用 Pnpm（严格依赖解析），或手动在 package.json 中声明。
```

5、如何解决peerDependencies冲突问题？

```
使用 --legacy-peer-deps 忽略冲突（临时方案）。
优先升级相关库，保证版本一致。
在 Monorepo 项目中使用 workspace 统一依赖版本。
```

6、Monorepo 项目推荐用哪种包管理工具？为什么？

```
推荐 Pnpm Workspaces。
原因：依赖共享、硬链接节省磁盘、严格依赖解析，适合大型团队协作
```

