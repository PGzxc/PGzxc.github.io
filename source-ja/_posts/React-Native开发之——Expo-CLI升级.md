---
title: React Native开发之——Expo CLI升级
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: ee565a
date: 2025-12-22 08:18:56
---
## 一 执行指令后警告

```
执行指令：npx expo --version
问题：
WARNING: The legacy expo-cli does not support Node +17.Migrate to the new local Expo CLI 6.3.12
```

<!--more-->

## 二 版本说明

### 2.1 旧版 expo-cli(legacy)

```
版本 6.3.12 已属于被废弃(legacy)。
它 不支持 Node 17+(你当前 Node 版本应在 18/20/22)。
Expo Orbit/Expo Tools/Expo Web Support 都无法正常工作。
```

### 2.2 新一代 Expo CLI(local Expo CLI)

```
从 SDK 49+ 开始，Expo 官方完全停用旧的 expo-cli 包。
当前正确版本应该长这样：
npx expo --version
7.x.x 或 8.x.x
且不会显示 legacy 警告。
```

## 三 如何解决

### 3.1 第 1 步：卸载全局旧版 expo-cli

```
1、先把旧版删掉：
npm uninstall -g expo-cli

2、如果你还会用 yarn 安装过：
yarn global remove expo-cli
```

### 3.2 第 2 步：删除旧项目中的 expo-cli 依赖(如有)

```
在项目根目录执行：
npm uninstall expo-cli

或：
yarn remove expo-cli
```

### 3.3 第 3 步：安装新一代 Expo CLI(本地版)

```
运行官方推荐命令：
npx expo --version

如果是第一次运行，它会自动安装 expo 包（新 CLI）。

或者你可以提前安装：
npm install expo --save-dev
```

### 3.4 第 4 步：确认是否成功替换为新 CLI

```
再执行：
npx expo --version

如果输出是 7.x.x 或 8.x.x，就成功了。
示例正确输出：7.2.1

且不会再出现：WARNING: The legacy expo-cli does not support Node +17.
```

## 四 为什么一定要升级？

升级后你才能正常使用：

|            功能            |  旧 CLI  |  新 CLI  |
| :------------------------: | :------: | :------: |
|       Expo Orbit GUI       |  不支持  | 完整支持 |
|      React Native Web      | 容易报错 | 自带支持 |
| Expo Tools（VS Code 插件） |  不兼容  | 完美集成 |
|     EAS Build / Submit     | 老版 API |   最新   |
|      SDK 50 / 51 / 52      |  不兼容  | 官方支持 |

