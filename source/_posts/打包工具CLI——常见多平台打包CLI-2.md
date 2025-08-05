---
title: 打包工具CLI——常见多平台打包CLI(2)
categories:
  - 开发
  - L-自动化
  - CLI
tags:
  - CLI
abbrlink: a2a934b1
date: 2025-08-06 06:18:20
---
## 一 概述

```
按适用场景分类，适合构建桌面、Web、移动端、服务端应用等，
列举常见的多平台打包 CLI 工具
```

<!--more-->

## 二 通用跨平台打包 CLI 工具

|       工具        |                   说明                    |      支持平台       |                      官网/文档                      |
| :---------------: | :---------------------------------------: | :-----------------: | :-------------------------------------------------: |
|        pkg        |      将 Node.js 项目打包为可执行文件      | Win / macOS / Linux |            https://github.com/vercel/pkg            |
|       nexe        | 类似 pkg，将 Node.js 应用编译为独立二进制 | Win / macOS / Linux |            https://github.com/nexe/nexe             |
| jpackage (JDK14+) |   Java 官方打包工具，可打包为平台安装包   | Win / macOS / Linux | https://docs.oracle.com/en/java/javase/14/jpackage/ |
|    PyInstaller    |   将 Python 应用打包成独立的可执行文件    | Win / macOS / Linux |               https://pyinstaller.org               |
|    GoReleaser     |         Go 应用打包+交叉编译+发布         |       多平台        |               https://goreleaser.com                |

## 三 桌面应用相关 CLI 工具

|          工具          |     技术栈     |      支持平台       |                  说明                  |
| :--------------------: | :------------: | :-----------------: | :------------------------------------: |
|    electron-builder    |    Electron    | Win / macOS / Linux |    自动打包为安装包(如 .exe / .dmg)    |
|       Tauri CLI        | Rust + Webview | Win / macOS / Linux | 超轻量桌面打包方案，性能优于 Electron  |
|     flutter build      |    Flutter     | Win / macOS / Linux | 支持 `flutter build windows/mac/linux` |
| Qt Installer Framework |       Qt       |       多平台        |               创建安装包               |

## 四  移动端打包工具 CLI

|               工具               |     平台      |         功能         |
| :------------------------------: | :-----------: | :------------------: |
|      flutter build apk/ipa       | Android / iOS |   构建 Flutter App   |
| react-native run-android/run-ios | React Native  |       开发调试       |
|             fastlane             | Android / iOS | 自动打包、签名、发布 |
|  cordova build` / `ionic build   | Android / iOS |     传统混合开发     |

## 五 Web App 打包工具 CLI

|            工具            |      类型      |           说明           |
| :------------------------: | :------------: | :----------------------: |
|  **Vite** / `vite build`   |  前端构建工具  | 快速构建 SPA / SSR 项目  |
|        Webpack CLI         |    前端构建    |      支持高度自定义      |
| **Next.js** / `next build` | React SSR 构建 | 同时支持服务端和静态导出 |
| **Nuxt.js** / `nuxt build` |  Vue SSR 构建  | Vue 的服务端渲染解决方案 |
|      esbuild / rollup      |     打包器     |      极快的打包 CLI      |

## 六 跨平台脚本自动化打包工具

|          工具           |                  说明                  |
| :---------------------: | :------------------------------------: |
|        Makefile         |    类 Unix 系统的通用构建自动化脚本    |
|        Justfile         |       类似 Makefile，更现代语法        |
| Taskfile (Taskfile.yml) |        Go 编写的跨平台任务工具         |
|       Goreleaser        | 支持多平台自动构建、打包、上传 release |

## 七 打包时可考虑的 CLI 特性

```
-支持跨平台构建（Windows/macOS/Linux）
-支持 ARM/ARM64 等架构交叉编译
-支持自动签名（iOS/Android/Windows）
-支持多语言或资源注入
-能生成图形化安装包（.msi / .dmg / .deb）
```

