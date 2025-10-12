---
title: React Native高频面试题——前沿技术(8)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: c33feea
date: 2025-10-12 18:50:57
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
1.React Native 新架构：Fabric 渲染引擎、TurboModules、JSI
2.React 18+：Concurrent Rendering（并发渲染）、Suspense
3.引擎优化：Hermes：字节码、低内存占用
4.Expo 生态进化：EAS、Dev Client、新 SDK
5.react native与 expo
```

### 三 面试题解答(仅供参考)

### 3.1 React Native 新架构

1、React Native 新架构的三大核心是什么？作用分别是什么？

```
1.JSI (JavaScript Interface)：允许 JS 直接调用 C++ 对象 → 替代异步 Bridge，支持同步/零拷贝通信。
2.TurboModules：新一代原生模块，支持懒加载和类型安全，通过 JSI 实现高效调用。
3.Fabric：新渲染引擎，基于 C++ Shadow Node，支持并发渲染与同步布局，提升 UI 性能。
```

2、新架构如何优化性能？迁移步骤？

```
1、优化点：
消除 Bridge 瓶颈、TurboModules 减少启动内存、Fabric 提升 UI 响应。

2、迁移步骤：
-升级 RN 至 0.70+；
-启用新架构开关（Android build.gradle / iOS Podfile）；
-配置 babel.config.js 支持 Codegen；
-重建并测试兼容性。
```

3、JSI 与旧 Bridge 的区别？

```
1、Bridge：异步通信，基于 JSON 序列化，开销大。
2、JSI：同步调用，直接操作 C++ 对象，避免序列化。
```

4、TurboModules 如何实现类型安全？

```
通过 TypeScript/Flow 定义模块接口 → Codegen 自动生成类型绑定 → JS 与原生保持一致，避免运行时错误。
```

5、Fabric 与旧 UI Manager 的区别？

```
旧 UI Manager：JS → Bridge → JSON → Native，延迟高。
Fabric：直接通过 JSI 驱动，跨平台 C++ 内核 + 并发渲染，能优先处理动画/手势，减少掉帧。
```

6、总结口诀

```
JSI = 基石（通信）
TurboModules = 原生模块（逻辑）
Fabric = 渲染引擎（UI）
```
### 3.2 React 18+

1、什么是 Concurrent Rendering？

```
React 18 可中断/恢复渲染任务，按优先级调度（高优先级：输入 → 低优先级：渲染）。
优势：避免输入阻塞，提高交互流畅度。
```

2、Suspense 的作用？在 SSR 中如何优化？

```
作用：优雅处理异步加载（显示 fallback 占位符）。
SSR 优化：支持 流式渲染 (Streaming SSR) + 部分 Hydration，减少白屏时间。
```

3、`useTransition` 和 `useDeferredValue` 的区别？

```
useTransition：标记更新为“非紧急”，在后台执行（如路由切换）。
useDeferredValue：推迟渲染某个值，常用于搜索建议结果。
```

4、Concurrent Rendering 对 RN 的意义？

```
避免长列表卡顿，滚动优先渲染可见区域，后台任务延迟执行。
```

### 3.3 引擎优化

1、Hermes 是什么？为什么推荐？

```
1、概念
专为 RN 优化的 JS 引擎（AOT 编译）。

2、优势：
-启动快（字节码预编译）。
-内存低（GC 优化）。
-包体小（2-3MB）。

3、案例：Facebook App 冷启动 ↓30%。
```

2、Hermes 与 JSC/V8 的区别？

```
JSC/V8：依赖 JIT 编译 → 启动慢、内存高。
Hermes：AOT 字节码 → 启动更快、内存更低，更适合 RN 移动端。
```

3、Hermes 工作流程？

```
构建时：JS → 编译为 Hermes 字节码 (HBC)。
运行时：直接执行字节码，无需 JIT → 启动更快。
```

### 3.4 Expo 生态(EAS / Dev Client)

1、EAS 是什么？解决了哪些痛点？

```
Expo Application Services（云服务）。

2、能力：
-EAS Build：云端构建，无需本地环境。
-EAS Submit：自动上传应用商店。
-EAS Update：OTA 热更新，无需发版。

3、痛点解决：避免繁琐本地配置，提升构建与发布效率。
```

2、Dev Client 与 Expo Go 的区别？

```
Expo Go：只支持 Expo SDK 模块，不能用自定义原生库。
Dev Client：自定义开发客户端，可运行任意原生模块，更接近生产环境。
```

3、Expo SDK 发展趋势？

```
更好兼容 RN 新架构（TurboModules）。
更多模块原生化（相机、推送等）。
与 EAS + Dev Client 深度整合，逐步弱化“黑箱限制”。
```

### 3.5 react native与 expo

1、React Native

```
1、概念
React Native 是由 Facebook 开发的一个开源框架，
允许开发者使用 JavaScript 和 React 来构建原生移动应用（iOS 和 Android）。
它通过将 JavaScript 代码编译为原生组件，提供接近原生应用的性能和用户体验。

2、特点：

-原生性能：React Native 生成真正的原生 UI 组件，而不是 WebView 包装的网页。
-灵活性：开发者可以直接访问原生模块(如相机、GPS)，
并通过桥接机制编写原生代码(Swift/Objective-C 或 Java/Kotlin)。
-社区支持：拥有庞大的社区和丰富的第三方库。
-学习曲线：需要一定的原生开发知识，尤其是在处理复杂的功能或调试原生模块时。

3、适用场景：

-需要高度定制化的应用。
-希望直接与原生代码交互，或需要优化性能的场景。
-长期维护的大型项目。

4、局限性：

-配置和设置环境较为复杂（需要安装 Xcode、Android Studio 等）。
-调试和构建可能需要处理原生代码，增加了开发难度。
```

2、Expo

```
1、概念
Expo 是一个基于 React Native 的开发工具和平台，旨在简化 React Native 应用的开发流程。
它提供了一套工具和服务，包括 CLI、SDK 和云服务，让开发者可以更快速地构建和部署应用。

2、特点：

-简化开发：Expo 提供了一个统一的开发环境，无需配置复杂的原生开发工具（如 Xcode 或 Android Studio）。
-内置 SDK：包含大量预配置的 API（如相机、推送通知、地图等），无需编写原生代码即可使用。
-快速迭代：支持热重载和实时预览，开发体验更流畅。
-云构建：Expo 提供云端构建服务，开发者无需本地配置即可生成 iOS 和 Android 应用。
-托管服务：如 OTA（Over-the-Air）更新，允许在不重新提交应用商店的情况下更新应用。

3、适用场景：

-快速原型开发或 MVP（最小可行产品）。
-小型到中型项目，尤其是对原生功能需求不高的场景。
-团队或开发者缺乏原生开发经验时。

4、局限性：

-受限的原生功能：
  Expo 的 SDK 虽然覆盖了很多功能，
  但如果需要高度定制化的原生模块，可能需要“弹出”（eject）到裸 React Native。
-依赖 Expo 生态：应用的构建和功能受限于 Expo 的工具和服务。
-性能开销：相比纯 React Native，Expo 可能会引入额外的包体积或性能开销。
```

3、React Native 与 Expo 的对比

|     特性     |           React Native            |                Expo                 |
| :----------: | :-------------------------------: | :---------------------------------: |
| 开发环境配置 | 需要配置 Xcode、Android Studio 等 |       开箱即用，无需复杂配置        |
| 原生功能访问 |     完全支持，需编写原生代码      | 受限于 Expo SDK，需弹出支持复杂功能 |
|   开发速度   |       较慢，需处理原生代码        |       快速，适合快速原型开发        |
|     性能     |        接近原生，高度优化         |     接近原生，但可能有轻微开销      |
|   社区支持   |          庞大，生态丰富           |      依赖 Expo 社区，生态较小       |
|   OTA 更新   |        需要第三方工具实现         |              内置支持               |
|   适用项目   |    大型、复杂、高度定制化项目     |      小型、中型、快速开发项目       |

4、如何选择？

```
1、选择 React Native：
-如果你的项目需要高度定制化或深度集成原生功能。
-如果你有原生开发经验或团队支持。
-如果你需要完全控制构建流程和依赖管理。

2、选择 Expo：
-如果你希望快速启动项目，专注于业务逻辑而非环境配置。
-如果你的应用需求可以被 Expo 的 SDK 覆盖。
-如果你没有原生开发经验或资源有限。
```

## 四  面试作答技巧（四句话总结）

```
新架构：JSI 打基础，TurboModules 管原生，Fabric 管 UI。
React 18：并发渲染 + Suspense，核心是响应更快。
Hermes：AOT 编译，启动快、内存低 → 移动端首选。
Expo：EAS + Dev Client → 云构建 + 自定义原生，更接近纯 RN 工程
```

