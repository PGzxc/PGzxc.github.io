---
title: Cmake开发之——CMake的工作原理(1.2)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 149ddc06
date: 2025-08-12 12:04:59
---
## 一 概述

```
CMake 的工作原理分为以下几个关键步骤和机制
```

<!--more-->

## 二 工作原理

### 2.1  输入阶段 — 读取配置文件(CMakeLists.txt)

```
1、CMakeLists.txt
CMake 以项目根目录下的 CMakeLists.txt 文件作为配置入口。

2、这个文件中用 CMake 脚本语言描述项目的构建规则，比如：
 -源码文件列表
 -编译选项
 -依赖库
 -目标产物（可执行文件、库文件等）
 -安装规则
```

### 2.2 生成构建系统

```
CMake 执行时，解析 CMakeLists.txt 和相关的模块文件，生成相应平台和编译器的构建脚本。

根据平台和生成器不同(如)：
 -Unix Makefiles
 -Ninja
 -Visual Studio 解决方案
 -Xcode 工程
 
CMake 生成对应的构建文件（Makefile、.sln、build.ninja等）。
```

### 2.3 配置阶段

```
1、配置过程中，CMake 会检查目标平台的环境信息，比如：
 -编译器类型和版本
 -支持的编译选项
 -是否存在某些库或头文件
 -系统变量（路径、环境变量等）

2、这个阶段会保存配置结果，通常写入 CMakeCache.txt 文件，方便后续快速重用。
```

### 2.4 构建阶段

```
-用户调用 cmake --build，
CMake 调用对应的底层构建工具(make、ninja、msbuild等)执行实际的编译、链接过程。

-构建过程根据生成的构建脚本去处理源码，生成目标文件和最终产物
```

### 2.5 安装和测试阶段(可选)

```
CMake 支持定义安装规则，调用 cmake --install 执行安装步骤。

也支持集成测试，运行 ctest 进行自动化测试。
```

## 三 总结图示

```
CMakeLists.txt (项目描述)
       ↓
  CMake 命令解析
       ↓
生成对应平台的构建文件（Makefile / Ninja / VS 工程）
       ↓
调用底层构建工具（make / ninja / msbuild）
       ↓
编译、链接 → 产物（exe、库、安装包）
```

## 四 补充说明

```
跨平台：CMake 通过抽象构建流程，屏蔽不同系统、编译器差异，实现一次编写，多平台生成构建文件。
可扩展性：支持自定义命令、自定义模块、第三方依赖管理（如 Conan 集成）。
缓存机制：CMakeCache.txt 用于保存配置，避免每次都重新检测环境。
```

