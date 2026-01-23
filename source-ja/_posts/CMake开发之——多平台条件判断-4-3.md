---
title: CMake开发之——多平台条件判断(4.3)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 1313668d
date: 2025-09-06 09:12:14
---
## 一 概述

```
本文介绍：CMake 多平台条件判断，根据不同操作系统、架构、编译器等条件做出适配配置
```

<!--more-->

## 二 常用平台变量

|         变量名         |                           说明                           |
| :--------------------: | :------------------------------------------------------: |
|   CMAKE_SYSTEM_NAME    | 操作系统名称，如 `Linux`、`Windows`、`Darwin`（macOS）等 |
| CMAKE_HOST_SYSTEM_NAME |            主机系统名称（运行 cmake 的机器）             |
| CMAKE_SYSTEM_PROCESSOR |        处理器架构，如 `x86_64`、`arm`、`aarch64`         |
|         WIN32          |              是否 Windows(布尔，存在即为真)              |
|          UNIX          |        是否 UNIX-like 系统（包含 Linux/macOS 等）        |

## 三 应用

### 3.1 基本判断示例

```
if(WIN32)
    message("Compiling on Windows")
elseif(UNIX)
    message("Compiling on UNIX-like OS")
else()
    message("Other OS")
endif()
```

### 3.2 使用 `CMAKE_SYSTEM_NAME`

```
if(CMAKE_SYSTEM_NAME STREQUAL "Linux")
    message("Target platform is Linux")
elseif(CMAKE_SYSTEM_NAME STREQUAL "Darwin")
    message("Target platform is macOS")
elseif(CMAKE_SYSTEM_NAME STREQUAL "Windows")
    message("Target platform is Windows")
endif()
```

### 3.3 根据架构判断

```
if(CMAKE_SYSTEM_PROCESSOR MATCHES "arm" OR CMAKE_SYSTEM_PROCESSOR MATCHES "aarch64")
    message("Target is ARM architecture")
elseif(CMAKE_SYSTEM_PROCESSOR MATCHES "x86_64")
    message("Target is x86_64 architecture")
endif()
```

### 3.4 根据编译器判断

```
if(CMAKE_CXX_COMPILER_ID STREQUAL "GNU")
    message("Using GCC")
elseif(CMAKE_CXX_COMPILER_ID STREQUAL "Clang")
    message("Using Clang")
elseif(CMAKE_CXX_COMPILER_ID STREQUAL "MSVC")
    message("Using MSVC")
endif()
```

## 四 综合示例

```
if(WIN32)
    add_definitions(-DPLATFORM_WINDOWS)
elseif(APPLE)
    add_definitions(-DPLATFORM_MAC)
elseif(UNIX)
    add_definitions(-DPLATFORM_LINUX)
endif()

if(CMAKE_SYSTEM_PROCESSOR MATCHES "arm")
    message("Compiling for ARM")
else()
    message("Compiling for other architecture")
endif()
```

## 五 注意事项

```
WIN32 和 UNIX 是 CMake 内置的布尔变量，比较方便。
APPLE 用于检测 macOS / iOS。
推荐尽量使用 CMAKE_SYSTEM_NAME 和 CMAKE_SYSTEM_PROCESSOR 做精确判断。
结合生成器表达式 $<PLATFORM_ID:> 可实现更细粒度控制。
```

