---
title: 打包工具CLI——常见多平台打包CLI(1)
categories:
  - 开发
  - L-自动化
  - CLI
tags:
  - CLI
abbrlink: '89846772'
date: 2025-08-06 06:17:22
---
## 一 概述

```
以下是一些主流的 多平台打包工具 CLI（Command Line Interface）工具，
适用于将应用打包发布到不同平台（如 Android/iOS/Web/桌面）的情况，
涵盖原生、跨平台、Web 等不同领域
```

<!--more-->

## 二 跨平台通用打包工具

|                             工具                             |                           说明                           |                   支持平台                    |
| :----------------------------------------------------------: | :------------------------------------------------------: | :-------------------------------------------: |
|       [electron-builder](https://www.electron.build/)        | 用于 Electron 应用的打包与发布，支持自动签名、代码签名等 |            Windows / macOS / Linux            |
|               [Tauri CLI](https://tauri.app/)                |         Rust + Webview 方案的打包工具，轻量安全          |            Windows / macOS / Linux            |
| [Flutter CLI](https://docs.flutter.dev/reference/flutter-cli) |   `flutter build` 命令支持打包 Android、iOS、Web、桌面   | Android / iOS / Web / macOS / Windows / Linux |
| [React Native CLI](https://reactnative.dev/docs/environment-setup) |  原生方式构建 React Native 应用，搭配 Gradle/Xcode 使用  |                 Android / iOS                 |
|   [React Native CLI / EAS CLI](https://docs.expo.dev/eas/)   |                       Expo EAS CLI                       |                                               |
|      [Capacitor CLI](https://capacitorjs.com/docs/cli)       |           Ionic 团队出品，支持 Web + 原生打包            |              Android / iOS / Web              |
|     [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)     |            React Native 的打包与发布增强工具             |           Android / iOS / Web(PWA)            |
| [Cordova CLI](https://cordova.apache.org/docs/en/latest/guide/cli/) |              老牌的 Web + 原生混合打包工具               |                 Android / iOS                 |
|                     Kotlin Multiplatform                     |      Kotlin Multiplatform(Compose Multiplatform 等)      |      Android / iOS / JVM / Web / Desktop      |
|               PyInstaller / Nuitka / Briefcase               |                Python 应用打包为桌面应用                 |                Win/macOS/Linux                |

## 三 Web & 桌面打包工具

|                      工具                      |                   说明                   |        支持平台         |
| :--------------------------------------------: | :--------------------------------------: | :---------------------: |
|        [Vite CLI](https://vitejs.dev/)         | 快速构建 Web 应用，可配合 Electron/Tauri | Web / Electron / Tauri  |
| [webpack CLI](https://webpack.js.org/api/cli/) |    配置灵活的打包工具，可定制输出格式    |           Web           |
|      [pkg](https://github.com/vercel/pkg)      |     将 Node.js 项目打包成可执行文件      | Windows / Linux / macOS |
|      [nexe](https://github.com/nexe/nexe)      |    类似 `pkg`，用于 Node.js 应用打包     | Windows / Linux / macOS |

## 四 移动端打包工具

|                    工具                     |                     说明                     |           支持平台           |
| :-----------------------------------------: | :------------------------------------------: | :--------------------------: |
|  Gradle CLI (`./gradlew assembleRelease`)   |     Android 项目打包使用的标准命令行工具     |           Android            |
|          Xcode CLI (`xcodebuild`)           |           iOS/macOS 项目打包与构建           |         iOS / macOS          |
|     [Fastlane](https://fastlane.tools/)     | 自动化打包、签名、上传 App Store/Play 的工具 |        Android / iOS         |
| [HBuildX CLI](https://uniapp.dcloud.io/cli) |           用于 uni-app 项目的打包            | Android / iOS / 小程序 / Web |

## 五 小程序/低代码工具 CLI

|                    工具                     |                      说明                      |             支持平台             |
| :-----------------------------------------: | :--------------------------------------------: | :------------------------------: |
| [uni-app CLI](https://uniapp.dcloud.io/cli) |       支持多端编译的小程序框架 CLI 工具        | 微信 / 支付宝 / 百度 / Web / App |
|       [Taro CLI](https://taro.zone/)        |          京东出品的小程序多端解决方案          |    微信 / RN / H5 / 支付宝等     |
|             微信开发者工具 CLI              | 微信官方提供的命令行工具，可用于自动预览、上传 |            微信小程序            |

## 六 其他辅助 CLI 工具

|                             工具                             |                 用途                 |
| :----------------------------------------------------------: | :----------------------------------: |
|            [esbuild](https://esbuild.github.io/)             | 极快的打包工具，可用作 Vite 插件底层 |
|               [rollup](https://rollupjs.org/)                |          构建 JS/TS 库工具           |
| [docker CLI](https://docs.docker.com/engine/reference/commandline/cli/) |       容器构建与多平台镜像打包       |
|                 [nx CLI](https://nx.dev/cli)                 | 单体仓库下管理多个项目，支持构建优化 |
|            [Turborepo CLI](https://turbo.build/)             |       Monorepo 项目管理与构建        |

## 七 示例命令一览

```
# Flutter
flutter build apk --release
flutter build ios

# React Native
npx react-native run-android
cd ios && xcodebuild -scheme MyApp archive

# Electron Builder
yarn build
yarn dist

# Tauri
cargo tauri build

# Fastlane
fastlane android beta
fastlane ios release

# Docker 多平台构建
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:multiarch .
```

