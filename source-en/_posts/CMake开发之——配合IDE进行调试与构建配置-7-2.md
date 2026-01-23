---
title: CMake开发之——配合IDE进行调试与构建配置(7.2)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: e0d6b551
date: 2025-11-05 09:48:37
---
## 一 概述

```
本文介绍：CMake 配合 CLion 和 Visual Studio 进行调试与构建配置
```

<!--more-->

## 二 调试与构建配置基础概念

```
1、构建配置(Build Configuration)
通常包括 Debug、Release、RelWithDebInfo 等，决定编译器优化等级和是否包含调试信息。

2、调试(Debugging)
需要编译生成带调试符号的程序（通常是 Debug 配置），方便断点、单步调试、变量查看。

3、CMake 构建类型
通过设置 CMAKE_BUILD_TYPE（单配置生成器如 Makefile、Ninja）
或多配置生成器（如 Visual Studio）里的配置来控制。
```

## 三 Lion 中调试与构建配置

### 3.1 选择构建类型

```
1、打开：File > Settings > Build, Execution, Deployment > CMake
2、在这里你会看到当前项目 CMake 配置项列表，默认有 Debug 和 Release 配置。
3、可以新增配置，例如 RelWithDebInfo，设置参数：

-DCMAKE_BUILD_TYPE=RelWithDebInfo
4、运行时可在右上角切换构建配置。
```

### 3.2 构建与运行

```
点击绿色 Run 按钮（或 Shift+F10）编译运行程序。
点击 Debug 按钮（Shift+F9）启动调试。
断点会被识别，支持单步执行、变量监视、调用堆栈查看
```

### 3.3 CMakeLists.txt 注意

```
1、确保添加调试符号，比如不覆盖默认 CMAKE_BUILD_TYPE=Debug 就默认有符号。
2、自定义编译选项：

set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -O0 -g")
3、如使用多个配置，确保所有配置都支持调试或优化选项。
```

## 四 Visual Studio 中调试与构建配置

### 4.1 配置 CMake 构建类型

```
Visual Studio 是多配置生成器，支持同时管理多个配置（Debug/Release）。

通过顶部菜单的 CMake 面板，选择 Debug 或 Release 配置。
```

### 4.2 编辑 `CMakeSettings.json`

```
1、项目根目录可放置此文件定义多种构建配置，比如：
[
  {
    "name": "x64-Debug",
    "generator": "Ninja",
    "configurationType": "Debug",
    "buildRoot": "${projectDir}\\out\\build\\${name}",
    "installRoot": "${projectDir}\\out\\install\\${name}",
    "cmakeCommandArgs": "-DCMAKE_BUILD_TYPE=Debug",
    "buildCommandArgs": "",
    "ctestCommandArgs": ""
  },
  {
    "name": "x64-Release",
    "generator": "Ninja",
    "configurationType": "Release",
    "buildRoot": "${projectDir}\\out\\build\\${name}",
    "installRoot": "${projectDir}\\out\\install\\${name}",
    "cmakeCommandArgs": "-DCMAKE_BUILD_TYPE=Release",
    "buildCommandArgs": "",
    "ctestCommandArgs": ""
  }
]

2、可自定义参数、编译器等
```

### 4.3 构建与调试

```
选择对应配置后，点击运行或调试按钮即可。
支持断点、单步、调用堆栈等调试功能。
Visual Studio 会自动调用对应构建系统。
```

## 五 常见注意事项

|        项目        |                             说明                             |
| :----------------: | :----------------------------------------------------------: |
|     Debug 构建     |        启用 `-g` 调试符号，关闭或减弱优化（如 `-O0`）        |
|    Release 构建    |              优化打开（如 `-O2`），去除调试符号              |
| 多配置与单配置区别 |      Visual Studio 支持多配置，Makefile/Ninja 是单配置       |
|      清理缓存      | 改变构建类型后最好清理缓存（CLion: `File > Invalidate Caches`） |
|      断点无效      |            检查是否为 Debug 配置，是否生成了符号             |

