---
title: React Native开发之——Expo项目升级
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: 1ea00991
date: 2025-09-16 09:59:44
---
## 一 概述

```
本文介绍：
 -React Native Expo 项目升级过程
 -React Native Expo 项目升级过程可能出现的问题
```

<!--more-->

## 二 项目升级过程


### 2.1 官方升级命令

```
1、升级Expo SDK
npx expo upgrade 或 //Expo 提供了官方升级工具
npm install expo@^54.0.0 或 yarn add expo@^54.0.0 //手动安装

2、升级依赖
npx expo install --fix

3、检查依赖
npx expo-doctor
 
4、升级完成后，记得执行
 npm install  # 或 yarn install
```


## 三 项目升级过程可能出现的问题

### 3.1 expo upgrade is not supporte

```
1、执行指令
npx expo upgrade
 
2、错误信息
expo upgrade is not supported in the local CLI, 
please follow this guide 
https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/ instead

3、如何处理
npm install expo@^54.0.0或yarn add expo@^54.0.0
```

### 3.2 15/17 checks passed. 2 checks failed. Possible issues detected

```
1、执行指令
npx expo-doctor

2、错误信息
15/17 checks passed. 2 checks failed. Possible issues detected:
Use the --verbose flag to see more details about passed checks.
✖ Check for legacy global CLI installed locally 

EAS CLI should not be installed in your project. Instead, install it globally or 
use "npx", "pnpx", or "bunx" depending on your preferred package manager.

Advice:                                                                                                                 
✖ Check that required peer dependencies are installed
Missing peer dependency: react-native-worklets
Required by: react-native-reanimated

Advice:                                                                                                               
Install missing required peer dependency with "npx expo install react-native-worklets"  
Your app may crash outside of Expo Go without this dependency. 
Native module peer dependencies must be installed directly.                      
2 checks failed, indicating possible issues with the project.  

3、如何解决
3-1、删除本地 eas-cli
npm uninstall eas-cli
npm install -g eas-cli   #（如果需要全局用）

3-2、安装缺少的依赖
npx expo install react-native-worklets

3-3、再执行
npx expo-doctor
```

### 3.3 npm warn ERESOLVE overriding peer dependency

```
1、执行指令
npm install

2、错误现象
npm warn ERESOLVE overriding peer dependency
npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error While resolving: react-native@0.81.4
npm error Found: @types/react@19.0.14
npm error node_modules/@types/react
npm error   peerOptional @types/react@"^19.1.0" from @react-native/virtualized-lists@0.81.4
npm error   node_modules/react-native/node_modules/@react-native/virtualized-lists
npm error   @react-native/virtualized-lists@"0.81.4" from react-native@0.81.4
npm error   node_modules/react-native
npm error   react-native@"0.81.4" from the root project
npm error   37 more (@expo/vector-icons, expo-font, expo, ...)
npm error Could not resolve dependency:
npm error peerOptional @types/react@"^19.1.0" from react-native@0.81.4
npm error node_modules/react-native
npm error   react-native@"0.81.4" from the root project
npm error   peer react-native@"*" from @expo/vector-icons@15.0.2
npm error   node_modules/@expo/vector-icons
npm error   @expo/vector-icons@"^15.0.2" from the root project
npm error   1 more (expo)
npm error   36 more (expo-font, expo, @react-native-community/masked-view, ...)
npm error Conflicting peer dependency: @types/react@19.1.13
npm error node_modules/@types/react
npm error   peerOptional @types/react@"^19.1.0" from react-native@0.81.4
npm error   node_modules/react-native
npm error   react-native@"0.81.4" from the root project
npm error   peer react-native@"*" from @expo/vector-icons@15.0.2
npm error   node_modules/@expo/vector-icons
npm error   @expo/vector-icons@"^15.0.2" from the root project
npm error   1 more (expo)
npm error   36 more (expo-font, expo, @react-native-community/masked-view, ...)
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error For a full report see:
npm error C:\Users\83422\AppData\Local\npm-cache\_logs\2025-09-15T07_02_14_225Z-eresolve-report.txt
npm error A complete log of this run can be found in: 
C:\Users\83422\AppData\Local\npm-cache\_logs\2025-09-15T07_02_14_225Z-debug-0.log

3、原因
@types/react、typescript版本过低

3、解决办法
@types/react": ~19.0.10升级到^19.1.13
typescript：~5.8.3 升级到 ~5.9.2
```

### 3.4 Android Bundling failed

```
1、执行指令
npx expo start

2、错误现象
Android Bundling failed 6659ms node_modules\expo\AppEntry.js (681 modules)
Unable to resolve "react-native/Libraries/NewAppScreen" from "App.js"
  1 | import {StatusBar} from 'expo-status-bar';
> 2 | import {Colors} from 'react-native/Libraries/NewAppScreen';
    |
  3 | import {StyleSheet, View} from 'react-native';
  4 | import {NavigationContainer} from "@react-navigation/native";
  5 | import Constants from 'expo-constants';
Import stack:
 App.js
 | import "react-native/Libraries/NewAppScreen" 
 node_modules\expo\AppEntry.js
 | import "../../App"
 | import "./node_modules/expo/AppEntry"
 
3、原因
import {Colors} from 'react-native/Libraries/NewAppScreen';已过时

4、解决办法
自定义Colors(切换明暗模式，作用不大，可去除)
```

