---
title: Cmake开发之——Cmake是什么(1.1)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 1c4ec3cd
date: 2025-08-12 12:00:33
---
## 一 概述

```
CMake 是一个跨平台构建系统生成工具，
它将你的源代码与构建逻辑解耦，简化并自动化整个构建流程
```

<!--more-->

## 二 CMake 是什么？

```
1、概念
CMake 是一个跨平台的自动化构建系统生成工具，主要用于控制软件的编译过程

2、它的核心作用是
通过平台无关的配置文件(CMakeLists.txt)生成平台相关的构建系统文件
(如 Makefile、Visual Studio 工程、Xcode 项目等)
```

## 三 为什么要用 CMake？

### 3.1 直接写 `Makefile` 或使用 IDE 工程文件来编译代码，会存在以下问题

|    问题    |                  描述                  |
| :--------: | :------------------------------------: |
| 可移植性差 |  不同平台、编译器都要写不同的构建脚本  |
|  难以维护  | 项目一旦变复杂，手写 Makefile 容易出错 |
|  重复劳动  |       多个项目共享的依赖不能复用       |

### 3.2 CMake 的优势

```
-支持 Linux、Windows、macOS、iOS、Android、嵌入式等多平台
-支持 GCC、Clang、MSVC、Ninja、Xcode 等构建工具
-易于构建大型项目（模块化、依赖管理）
-与 IDE 无关，但能生成 VS/Xcode 工程
-社区活跃，现代 C++ 推荐使用
```

