---
title: CMake开发之——配合IDE多配置环境支持(7.3)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 24f76cba
date: 2025-11-08 07:42:22
---
## 一 概述

```
本文介绍： Visual Studio、CLion 多配置环境支持
```

<!--more-->

## 二 什么是多配置环境？

```
多配置环境指一个构建目录内同时支持多个构建配置（例如 Debug、Release、RelWithDebInfo）

你可以在同一构建目录下方便地切换和构建不同配置版本，无需重新运行 CMake 生成构建系统。
```

## 三 单配置 vs 多配置

|            方面             |           单配置构建            |         多配置构建         |
| :-------------------------: | :-----------------------------: | :------------------------: |
|          构建目录           |     每个配置单独的构建目录      |  一个构建目录支持多个配置  |
|         典型生成器          |         Makefile、Ninja         |    Visual Studio、Xcode    |
|          切换配置           |       需要重新执行 CMake        |    直接切换配置即可构建    |
| 配置变量 `CMAKE_BUILD_TYPE` | 明确设置，如 `Debug`、`Release` | 不需要设置，构建时指定配置 |

## 四 CMake 如何识别是否多配置？

### 4.1 通过生成器类型判定

```
多配置生成器示例：Visual Studio、Xcode
单配置生成器示例：Ninja、Unix Makefiles
```

### 4.2 在 CMake 脚本中，可以用下面判断

```
if(CMAKE_CONFIGURATION_TYPES) 
    message("Multi-config generator")
else()
    message("Single-config generator")
endif()
```

## 五 多配置环境如何配置与使用？

### 5.1 Visual Studio 和 Xcode

```
1、说明
 默认就是多配置环境
 不需要设置 CMAKE_BUILD_TYPE，反而可能被忽略
 在 IDE 里选择配置（Debug/Release）即可构建对应版本

2、编译命令示例（命令行）
cmake --build . --config Debug
cmake --build . --config Release
```

### 5.2  单配置生成器

```
1、需要在调用 CMake 配置时指定
cmake -DCMAKE_BUILD_TYPE=Debug ..
cmake -DCMAKE_BUILD_TYPE=Release ..

2、每个配置需要单独的构建目录，切换配置时需要重新配置
```

## 六 在 CMake 脚本中针对多配置环境的写法示例

```
1、示例
if(CMAKE_CONFIGURATION_TYPES)
  # 多配置环境，不设置 CMAKE_BUILD_TYPE，构建时通过 --config 指定
  set(MY_BUILD_TYPE "") 
else()
  # 单配置环境，默认Debug
  if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Debug CACHE STRING "Build type" FORCE)
  endif()
  set(MY_BUILD_TYPE ${CMAKE_BUILD_TYPE})
endif()

message("Build type: ${MY_BUILD_TYPE}")

2、说明
这样可以兼容多种生成器
```

## 七 CLion 与多配置

```
CLion 默认使用单配置生成器（Ninja），所以它会在不同的构建目录切换不同的配置。
从 CLion 2021 版本起支持 CMakePresets.json，可管理多种配置。
通过预设你可以配置 Debug、Release，甚至交叉编译配置。
```

## 八 推荐实践

```
-多配置生成器（VS、Xcode）：不设置 CMAKE_BUILD_TYPE，通过 IDE 或命令行 --config 切换。
-单配置生成器（Ninja、Makefile）：每个配置使用独立构建目录，并设置 -DCMAKE_BUILD_TYPE。
-在项目中建议使用条件判断兼容两类生成器。
```

