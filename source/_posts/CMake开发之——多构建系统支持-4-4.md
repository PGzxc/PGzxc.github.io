---
title: CMake开发之——多构建系统支持(4.4)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 437baee2
date: 2025-09-07 10:07:40
---
## 一 概述

```
本文介绍：CMake 的多构建系统支持，适配不同平台、IDE 和构建工具
```

<!--more-->

## 二 什么是多构建系统支持？

```
1、CMake 支持多种 构建系统（生成器），如 Makefile、Ninja、Visual Studio、Xcode 等。
2、通过不同的生成器，CMake 能生成对应平台和 IDE 能识别的工程文件或构建脚本。
3、用户在运行 cmake 命令时选择生成器，实现跨平台灵活构建。
```

## 三 常用生成器

|   生成器名称    |               说明                |       典型平台        | 支持多配置 |
| :-------------: | :-------------------------------: | :-------------------: | :--------: |
| Unix Makefiles  |        生成 Makefile 文件         | Linux、macOS、Windows |     否     |
|      Ninja      |        生成 Ninja 构建文件        |        跨平台         |     否     |
|  Visual Studio  | 生成 Visual Studio 解决方案及项目 |        Windows        |     是     |
|      Xcode      |        生成 Xcode 工程文件        |         macOS         |     是     |
| NMake Makefiles |    生成 NMake 使用的 Makefile     |        Windows        |     否     |
| MinGW Makefiles |      生成 MinGW 的 Makefile       |        Windows        |     否     |

## 四 选择生成器

### 4.1 命令行指定生成器

```
cmake -S . -B build -G "Ninja"
cmake -S . -B build -G "Visual Studio 17 2022"
```

### 4.2 查看支持的生成器

```
cmake --help

或

cmake --help | grep Generator
```

## 五 多配置 vs 单配置生成器区别

|       特点       | 多配置生成器 (Visual Studio, Xcode) |    单配置生成器 (Makefile, Ninja)     |
| :--------------: | :---------------------------------: | :-----------------------------------: |
| 支持多个构建配置 |      是(Debug、Release 等共存)      |        否，构建时指定单一配置         |
|     配置切换     |           在 IDE 内部切换           | 需要重新生成或指定 `CMAKE_BUILD_TYPE` |
|   生成文件大小   |                较大                 |                 较小                  |

## 六 生成器示例及用法

### 6.1 Ninja

```
cmake -S . -B build -G Ninja
cmake --build build
```

### 6.2 Visual Studio 2022

```
cmake -S . -B build -G "Visual Studio 17 2022" -A x64
cmake --build build --config Release
```

## 七 CMake 多构建系统配合跨平台构建

```
可以在同一项目中支持不同平台（Windows、Linux、macOS）生成相应构建文件。

通过设置 CMAKE_GENERATOR 或 -G 参数，灵活切换。

支持多配置生成器时，利用 --config 参数快速切换 Debug/Release。
```

## 八  小结

|        关键点        |               说明               |
| :------------------: | :------------------------------: |
|    选择合适生成器    |      根据目标平台和需求选择      |
| 多配置生成器切换配置 | 在 IDE 内轻松切换 Debug/Release  |
| 单配置生成器切换配置 |   需重新运行 CMake 并指定配置    |
|      跨平台支持      | 同一 CMakeLists.txt 支持多生成器 |

