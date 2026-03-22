---
title: 电子书实战之——电子书Android示例(3)
categories:
  - 技术实践
  - 项目实践
  - Android项目
tags:
  - 电子书实战
abbrlink: 3bf45a1
date: 2026-03-22 08:37:47
---
## 一 概述

```
本文介绍：
-基于 Android 平台的 EPUB 阅读器 Demo
-使用 Kotlin + Jetpack Compose 开发
-提供直观、流畅的阅读体验，支持基本的阅读调整和导航功能
```

<!--more-->

## 二 功能和布局

### 2.1 核心功能

```
1.EPUB 解析与加载：支持标准 EPUB 文件解析和显示
2.目录(TOC)浏览：展示章节列表，支持点击快速跳转
3.阅读设置(实时生效)：
 -字体大小（A- / A+）
 -文字颜色选择
 -背景颜色选择
 -夜间模式切换

4.章节切换：左右滑动翻页
5.适配性：响应式布局，适配手机/平板不同屏幕
```

### 2.2 用户界面布局

```
1.启动页：简洁界面 + “Start Reading” 按钮
2.阅读器主界面：
-顶部工具栏：应用名称、设置按钮、目录按钮
-中间内容区：显示 EPUB 文本（WebView 渲染）
-左侧抽屉：章节目录（Navigation Drawer）
-右侧抽屉：阅读设置面板（字体、颜色、主题等）
```

## 三 技术栈

### 3.1 技术列表

|   类别    |       技术选择       |                说明                 |
| :-------: | :------------------: | :---------------------------------: |
|   语言    |        Kotlin        |          现代、安全、简洁           |
|  UI 框架  |   Jetpack Compose    |     声明式、响应式、Material 3      |
| EPUB 渲染 | WebView + JavaScript |       加载解压后的 HTML 内容        |
| HTML 解析 |        Jsoup         |       提取目录结构、章节信息        |
|  基础库   |       AndroidX       | ViewModel、Lifecycle、Navigation 等 |
| 构建工具  | Gradle + Kotlin DSL  |          项目/模块构建脚本          |

### 3.2 项目目录结构

```
Android-epub-demo/
├── app/
│   ├── src/main/
│   │   ├── assets/
│   │   │   ├── epub/              # 内置 EPUB 示例文件
│   │   │   └── sample-epubs/      # 更多示例
│   │   ├── kotlin/com/pgzxc/epub/
│   │   │   ├── ui/theme/          # Compose 主题
│   │   │   ├── EpubParser.kt      # 目录解析
│   │   │   ├── EpubUnzipper.kt    # 文件解压
│   │   │   ├── MainActivity.kt    # 启动页
│   │   │   └── ReaderActivity.kt  # 阅读器核心
│   │   └── res/                   # 图标、布局等
│   ├── build.gradle.kts
├── build.gradle.kts               # 根 build
└── README.md
```

### 3.3 核心实现思路

```
1.EPUB 处理流程
-从 assets 复制示例 EPUB → 内部存储
-解压(EpubUnzipper)
-解析目录(EpubParser + Jsoup 提取 toc.ncx/nav.xhtml)
-WebView 加载章节 HTML 文件

2.阅读体验
-WebView 支持 JavaScript → 通过 JS 接口实现字体/颜色/背景实时修改
-Compose 状态管理 → 设置变更立即刷新 WebView 样式
-手势检测 → 左右滑动切换下一/上一章节

3.主题与模式
-Material3 主题系统（浅色/深色自动跟随系统）
-自定义背景/文字颜色 → 注入 style 到 WebView
```

## 四 快速上手

### 4.1 如何运行

```
1.克隆仓库
2.Android Studio 打开项目
3.同步 Gradle
4.运行到手机或模拟器(最低 API 25)
```

### 4.2 上手阅读

```
1.打开 App → 点击 Start Reading
2.自动加载内置示例 EPUB
3.顶部工具栏：
-目录图标 → 查看/跳转章节
-设置图标 → 调整字体、颜色、夜间模式

4.左右滑动 → 切换章节
```

### 4.3 技术亮点

```
-纯 Jetpack Compose 构建，UI 代码简洁、可维护
-模块化设计，解析/解压/渲染职责分离
-流畅动画 + 实时预览设置效果
-本地文件高效处理（无需网络）
```

### 4.4 未来可扩展方向

```
-支持外部存储导入 EPUB
-书签 & 阅读进度保存
-更多字体选择
-文本搜索
-高亮 / 批注功能
-替换 WebView 为更专业的引擎（如 Readium Mobile Kotlin）
```

## 五 图示

| ![][1] | ![][2] | ![][3] |
| ------ | ------ | ------ |
| ![][4] | ![][5] |        |




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-az-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-az-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-az-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-az-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-az-5.png