---
title: ArkTS开发之——环境搭建(1)
categories:
  - 开发
  - B-高级语言
  - ArkTS
tags:
  - ArkTS
abbrlink: d5b02e79
date: 2025-09-18 08:44:15
---
## 一 概述

```
本文介绍：
 - ArkTS开发环境
 - 涵盖工具安装、项目创建和调试流程
```

<!--more-->

## 二 前置条件

### 2.1 操作系统

```
-Windows 10/11 或 macOS（推荐 macOS 开发 iOS/多端）。
-Linux 也可，但官方支持有限。
```

### 2.2 硬件

```
-CPU ≥ 4 核，内存 ≥ 8GB（推荐 16GB）
-硬盘空间 ≥ 50GB（包含 SDK/模拟器）
```

### 2.3 网络

```
能访问鸿蒙官方源和 npm 镜像（建议使用国内镜像加速）
```

## 三 安装开发工具

### 3.1  IDE / 编辑器

```
1、推荐： DevEco Studio：
-地址：https://developer.harmonyos.com/cn/develop/deveco-studio/download
-类似 Android Studio，官方 IDE。
-支持 ArkTS 项目创建、模拟器调试。

2、可选： 
VS Code + ArkTS 插件（轻量开发）
```

### 3.2 Java 开发环境

```
DevEco Studio 依赖 JDK：

1、安装 JDK 11 或以上

2、配置环境变量：
JAVA_HOME=C:\Program Files\Java\jdk-11
PATH=%JAVA_HOME%\bin;%PATH%
```

### 3.3 Node.js & npm

```
ArkTS 构建工具依赖 Node.js：

1、推荐 Node.js 18.x 或 20.x

2、安装完成后检查：
node -v
npm -v
```

### 3.4 DevEco Studio 插件

```
打开 DevEco Studio → File > Settings > Plugins → 搜索安装 ArkTS 支持插件（如果未自带）
```

## 四 创建 ArkTS 项目

### 4.1 使用 DevEco Studio

```
1、打开 DevEco Studio → File > New > Project

2、选择 ArkTS 模板(可选模板：)
-JS/TS 应用
-Ability 模块（应用功能模块）
-小组件（Widget）

3、填写：
-Project Name
-Package Name
-Save Path

4、点击 Finish → DevEco Studio 自动生成项目结构
```

### 4.2 项目目录结构

```
1、结构
myArkApp/
 ├─ entry/
 │   └─ app.ts
 ├─ modules/
 │   └─ mainAbility/
 ├─ resources/
 │   ├─ layout/
 │   └─ values/
 ├─ node_modules/
 ├─ package.json
 └─ tsconfig.json
 
2、说明
-entry：应用入口
-modules：Ability 或模块
-resources：布局、样式、图片
-package.json：依赖管理
-tsconfig.json：ArkTS 编译配置
```

## 五 安装依赖与构建

```
1、打开项目根目录终端
npm install

2、编译项目：
npm run build
默认输出目录 build/（可在 manifest.json 配置修改）

3、运行模拟器
DevEco Studio → 点击 Run 按钮 → 选择模拟器或真机
支持 手机、平板、手表等鸿蒙设备
```

## 六 常用调试与命令

```
1、启动热更新
npm run start

2、打包发布
npm run pack

3、调试 ArkTS 代码
-DevEco Studio 自带断点调试
-可通过 console.log 打印信息
```

## 七 参考配置

### 7.1 tsconfig.json示例

```
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "sourceMap": true
  },
  "include": ["entry/**/*", "modules/**/*"]
}
```

### 7.2 package.json示例

```
{
  "name": "myArkApp",
  "version": "1.0.0",
  "scripts": {
    "build": "arktsc -p tsconfig.json",
    "start": "arktsc -w -p tsconfig.json",
    "pack": "node build/package.js"
  },
  "dependencies": {},
  "devDependencies": {
    "@ohos/arkts": "^3.2.0"
  }
}
```

## 八 拓展学习

```
1、官方文档：ArkTS教程：
https://developer.harmonyos.com/cn/docs/documentation/doc-guides/arkts-0000001050216733

2、官方示例
DevEco Studio → File > New > Project from Sample

3、面试常考
-ArkTS 特性：类型安全、模块化、跨端能力
-Ability 生命周期
-ArkTS 与 JS/TS 对比
```

