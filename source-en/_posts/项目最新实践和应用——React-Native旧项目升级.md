---
title: 项目最新实践和应用——React Native旧项目升级
categories:
  - 开发
  - U-项目实践
  - React Native项目
tags:
  - React Native项目
abbrlink: d4889c77
date: 2025-09-04 11:48:30
---
## 一 概述

```
本文介绍：
 -React Native Expo 项目升级过程
 -分为 检查 → 升级 → 调试 → 验证 四个阶段
```

<!--more-->

## 二 项目升级过程

### 2.1 检查当前版本

```
1、在项目根目录执行
 expo --version
 npx expo-doctor

2、说明
 expo --version 看本地 CLI 版本
 expo-doctor 检查依赖是否与 SDK 匹配
 
3、检查
查看 package.json 里的 expo 版本，确定当前 SDK 版本（比如 "expo": "~50.0.10"）
```

### 2.2 官方升级命令（推荐）

```
1、Expo 提供了官方升级工具
 npx expo upgrade

2、说明
 自动升级 expo SDK 版本
 更新 react-native、react 及相关依赖
 修改 app.json / app.config.js 中的 SDK 配置
 
3、升级完成后，记得执行
 npm install  # 或 yarn install
 npx expo install --fix
```

### 2.3 手动升级（必要时）

```
如果 expo upgrade 出现冲突，可以手动做
1、去 Expo SDK Release Notes:https://docs.expo.dev/versions/latest/ 查看最新版本。
2、修改 package.json 中依赖，例如
 "expo": "~51.0.0",
 "react-native": "0.74.2",
 "react": "18.2.0"

3、重新安装依赖
 rm -rf node_modules package-lock.json yarn.lock
 npm install
```

### 2.4 清理缓存

```
1、升级后可能会遇到缓存问题，执行
expo start -c

2、或者
watchman watch-del-all
rm -rf node_modules
npm install
```

### 2.5 检查项目状态

```
npx expo-doctor
```

### 2.6 验证 & 适配

```
1、运行项目(在 iOS / Android 模拟器或 Expo Go 里打开)
expo start

2、检查原生模块（如果你 eject 了 Bare Workflow）
 需要同步升级 Xcode / Gradle / NDK 等配置
 
3、调试不兼容 API 
 查迁移指南：https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough
 解决可能的废弃 API
```

## 三 版本兼容关系

### 3.1 Expo SDK、React Native 与 React 的版本对应关系

| Expo SDK | React Native | React  |
| :------: | :----------: | :----: |
|  53.0.0  |     0.79     | 19.0.0 |
|  52.0.0  |     0.76     | 18.3.1 |
|  51.0.0  |     0.74     | 18.2.0 |

### 3.2  Node.js 与 npm 的兼容性

```
1、虽然 Expo 官网没有明确列出 Node.js 和 npm 的版本兼容表，但一般来说：
 -使用 Node LTS（如 18.x 或 20.x） 是最稳妥的选择。
 -推荐通过 nvm（Node Version Manager） 管理不同项目的 Node 版本，避免冲突和依赖问题
 
2、通过以下命令查看具体版本
 node -v
 npm -v
```

### 3.3 最新推荐组合

```
Expo SDK：53.0.0
React Native：0.79.x
React：19.0.0
```

## 四 建议

```
-逐版本升级：如果跨度太大（比如 SDK 45 → SDK 51），最好一版一版升，否则问题多。
-锁定 Node 版本：使用 nvm 保持 Node 版本与 Expo 推荐一致（见 Release Notes）。
-测试依赖库：比如 react-navigation、react-native-reanimated 常常需要跟着升级。
```

## 五 参考

* [Expo—Reference](https://docs.expo.dev/versions/latest)