---
title: React Native高频面试题——工具与工程化(5)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 6ff57e8c
date: 2025-10-12 09:16:30
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
1.开发与调试
Flipper、React DevTools、Hermes Profiler
Expo CLI & Expo Dev Client

2.工程化工具
Webpack、Vite、Rollup
Monorepo：Nx、Lerna

3.CI/CD 与自动化
Fastlane、GitHub Actions、Bitrise
Expo EAS Build、OTA 更新

4.应用发布
App Store、Google Play 提交与审核
```

### 三 面试题解答(仅供参考)

### 3.1 开发与调试

1、什么是 Flipper？它在 RN 中的作用是什么？

```
Flipper 是 Meta 提供的跨平台桌面调试工具，支持查看日志、网络请求、布局树、数据库内容等。
RN 集成 Flipper 后，可通过插件（如 React DevTools、Hermes Debugger）增强调试能力。
作用：解决 RN 调试工具分散、原生数据不透明的问题。
```

2、React DevTools 如何与 RN 集成？与 Flipper 有什么区别？

```
React DevTools 专注于调试 React 组件树、状态、props 和渲染性能。
RN 中可通过 Flipper 插件或 React Native DevTools 集成。

区别：
-DevTools → 组件层调试
-Flipper → 更全面，涵盖日志、网络、数据库、布局树等

一般结合使用。
```

3、Hermes Profiler 的作用是什么？

```
Hermes Profiler 用于分析 RN 应用的 JS 执行性能（启动速度、函数耗时、内存占用、垃圾回收）。

启用 Hermes 后，可在 Chrome DevTools 或 Flipper 中采集性能数据，
常用于定位卡顿、内存泄漏问题。
```

4、Flipper 与 Chrome Debugger 的区别？

```
Chrome Debugger：早期工具，JS 在 Chrome V8 上运行，无法调试原生模块，性能差。
Flipper：官方推荐，原生与 JS 一体化调试，性能更好，支持插件扩展。
```

5、Expo CLI 和 Expo Dev Client 有什么区别？

```
Expo CLI：命令行工具，负责创建项目、运行 dev server、构建。
Expo Dev Client：可运行带自定义原生模块的 RN 应用，突破 Expo Go 的限制。

小项目用 Expo Go，大项目建议用 Dev Client
```

6、RN 中远程调试与 Hermes 的兼容性问题如何解决？

```
远程调试（Chrome Bridge）不兼容 Hermes，因为 Hermes 在设备本地执行。
解决方案：用 Flipper/Hermes Debugger 或 React Native DevTools（RN 0.76+ 支持 Hermes）。
```

### 3.2 工程化工具

1、Webpack、Vite、Rollup 在 RN 中的作用和区别？

```
Webpack：功能全面，生态成熟，适合大型 Web 项目。
Vite：开发体验好，冷启动快（ESM + esbuild），适合 monorepo web 目标。
Rollup：专注组件库打包，Tree-shaking 优秀。

RN 默认用 Metro，只有在 monorepo 或跨平台 Web 目标时才考虑它们。
```

2、什么是 Monorepo？它在 RN 中解决了哪些问题？

```
Monorepo = 单仓多包管理，

解决：
-代码共享（组件/工具函数）
-统一工具链（Lint、TS Config）
-原子性修改（一次提交跨包更新）
-CI/CD 增量构建

RN 企业项目常用 Nx + Yarn Workspaces。
```

3、Nx 和 Lerna 的区别是什么？

```
Lerna：经典工具，偏向包管理和发布。
Nx：更现代，支持依赖图、缓存、增量构建，更适合大规模团队。

大型项目选 Nx，小型项目用 Lerna 足够。
```

### 3.3 CI/CD 与自动化

1、Fastlane 在 RN CI/CD 中的作用？

```
Fastlane 是 iOS/Android 自动化工具，
核心能力：
-签名管理（match）
-构建打包（gym、gradle）
-发布分发（deliver、supply）
-自动截图、版本管理

常与 GitHub Actions/Bitrise 结合，减少重复性操作。
```

2、GitHub Actions 和 Bitrise 有什么区别？

```
GitHub Actions：免费额度、社区生态强，适合中小团队。
Bitrise：专注移动端，UI 配置友好，证书管理强，适合企业级。
```

3、Expo EAS Build 有什么优势？

```
EAS Build 提供云端构建，免本地配置 Xcode/Android Studio。
支持 OTA 更新（EAS Update），快速迭代 RN 应用。
缺点：需付费套餐，灵活性不如自建 CI。
```

4、什么是 OTA 更新？原理和局限性？

```
OTA（Over-The-Air）只更新 JS Bundle 和资源文件，下次启动时加载新版本。
工具：CodePush、Expo EAS Update。
局限性：无法更新原生代码（如新增模块），仍需走商店审核。
```

### 3.4 应用发布

1、如何将 RN app 发布到 App Store？

```
1.Apple Developer 配置证书、App ID、Provisioning Profile
2.Xcode Archive IPA
3.上传到 App Store Connect
4.填写元数据、隐私声明，提交审核

注意：隐私政策必须填写，常见拒审是 SDK 不合规或崩溃。
```

2、Google Play 发布 RN app 的流程？

```
1.生成 keystore，配置 build.gradle
2../gradlew bundleRelease 生成 AAB
3.上传 Play Console

注意：Google 要求 AAB 格式，版本号必须递增。
```

3、App Store 和 Google Play 审核有何不同？

```
App Store：严格，审核慢（1–7 天），关注隐私、UI、支付合规。
Google Play：相对宽松，审核快（几小时–1 天），重点在安全与广告透明度。
```

4、发布后 OTA 如何与店审结合？

```
小 bug 用 OTA 热更新，大功能或涉及原生改动仍需店审。
常见做法：CI 配置自动 OTA 更新生产分支，配合商店版本发布。
```
