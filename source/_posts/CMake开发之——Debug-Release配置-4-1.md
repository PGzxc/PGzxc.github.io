---
title: CMake开发之——Debug/Release配置(4.1)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: f2845185
date: 2025-08-29 07:55:24
---
## 一 概述

```
本文介绍：Debug/Release 配置管理，
包含默认行为、如何自定义设置、切换构建类型及常用示例
```

<!--more-->

## 二 多配置生成器 vs 单配置生成器

|  生成器类型  |         例子         |                      构建类型支持                      |
| :----------: | :------------------: | :----------------------------------------------------: |
| 多配置生成器 | Visual Studio, Xcode | 支持 Debug、Release 等多种构建配置，可同时存在不同配置 |
| 单配置生成器 |   Makefile, Ninja    |                一次构建只能指定一种配置                |

## 三 常见构建类型(CMAKE_BUILD_TYPE)

### 3.1 构建类型

```
单配置生成器通过 `CMAKE_BUILD_TYPE` 变量指定构建类型
```

### 3.2 常用类型有

|      类型      |          说明          |
| :------------: | :--------------------: |
|     Debug      | 包含调试信息，关闭优化 |
|    Release     |  优化代码，无调试信息  |
| RelWithDebInfo |   优化 + 带调试信息    |
|   MinSizeRel   |        优化大小        |

## 四 设置构建类型

### 4.1 命令行指定(单配置生成器)

```
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
```

### 4.2 CMakeLists.txt 中设置默认值

```
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release CACHE STRING "Build type" FORCE)
endif()
```

## 五 访问构建类型

```
message("Current build type: ${CMAKE_BUILD_TYPE}")
```

## 六 针对不同构建类型设置选项

```
set(CMAKE_CXX_FLAGS_DEBUG "-g -O0")
set(CMAKE_CXX_FLAGS_RELEASE "-O3")

add_executable(myapp main.cpp)

target_compile_options(myapp PRIVATE
    $<$<CONFIG:Debug>:-Wall>
    $<$<CONFIG:Release>:-O3>
)
```

## 七 多配置生成器中的构建类型

```
1、说明
多配置生成器（Visual Studio、Xcode）
允许同一项目生成多个配置（Debug、Release、RelWithDebInfo 等），构建时选择。

2、构建命令示例（VS）
cmake --build build --config Debug
cmake --build build --config Release
```

## 八 示例整合

```
cmake_minimum_required(VERSION 3.10)
project(MyProject)

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release CACHE STRING "Build type" FORCE)
endif()

message("Build type: ${CMAKE_BUILD_TYPE}")

add_executable(myapp main.cpp)

target_compile_definitions(myapp PRIVATE
    $<$<CONFIG:Debug>:DEBUG_BUILD>
    $<$<CONFIG:Release>:NDEBUG>
)
target_compile_options(myapp PRIVATE
    $<$<CONFIG:Debug>:-g -O0>
    $<$<CONFIG:Release>:-O3>
)
```

