---
title: CMake开发之——ExternalProject_Add(5.3)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: '99359e18'
date: 2025-09-10 10:10:42
---
## 一 概述

```
ExternalProject_Add是 CMake 里一个非常实用的机制，
用于在构建过程中自动下载、配置、编译、安装外部项目（可以是源码或预编译包）
```

<!--more-->

## 二 使用基础

### 2.1 基本作用

```
1、ExternalProject_Add 是 ExternalProject 模块里的命令，用来：
 -自动拉取外部源码（支持 Git、SVN、URL 下载、已有目录）。
 -在你的构建过程中调用该外部项目的 独立构建系统(CMake、Make、MSBuild、Ninja、Autotools…)
 -支持跨平台构建外部依赖。
 -自动处理构建顺序(生成依赖关系)

2、它的好处
 -不需要手动预安装外部库。
 -源码自动下载 & 构建。
 -统一在 CMake 项目里管理第三方依赖
```

### 2.2 模块引入

```
include(ExternalProject)
```

### 2.3 基本用法

```
1、示例
ExternalProject_Add(
    mylib
    PREFIX ${CMAKE_BINARY_DIR}/_deps/mylib    # 外部项目的根路径
    GIT_REPOSITORY https://github.com/user/mylib.git
    GIT_TAG v1.0
    UPDATE_DISCONNECTED 1                     # 不自动更新
    CMAKE_ARGS -DCMAKE_INSTALL_PREFIX=<INSTALL_DIR>
               -DCMAKE_BUILD_TYPE=${CMAKE_BUILD_TYPE}
)


2、说明：
 PREFIX：外部项目的所有文件放在这里（源码、构建、安装目录）。
 <INSTALL_DIR>：占位符，表示安装路径。
 <SOURCE_DIR>、<BINARY_DIR> 等也是内置占位符。
```

## 三 常用关键参数

### 3.1 获取源码

```
GIT_REPOSITORY / GIT_TAG
URL（支持 zip/tar.gz/http/ftp）
DOWNLOAD_COMMAND（自定义下载命令）
SOURCE_DIR（已有源码目录，不下载）
```

### 3.2 配置阶段

```
CMAKE_ARGS：传递给外部项目 CMake 配置的参数
CONFIGURE_COMMAND：完全自定义配置命令
```

### 3.3 构建 & 安装

```
BUILD_COMMAND：构建命令（默认自动识别构建工具）
INSTALL_COMMAND：安装命令
BUILD_IN_SOURCE：是否在源码目录构建(默认 out-of-source)
```

### 3.4 依赖管理

```
add_dependencies(myapp mylib)  # 确保先构建 mylib
```

## 四 使用已安装库

```
1、说明
如果外部项目安装了库，可以用

2、示例
ExternalProject_Get_Property(mylib install_dir)
set(MYLIB_INCLUDE_DIR ${install_dir}/include)
set(MYLIB_LIB_DIR ${install_dir}/lib)

target_include_directories(myapp PRIVATE ${MYLIB_INCLUDE_DIR})
target_link_libraries(myapp PRIVATE ${MYLIB_LIB_DIR}/libmylib.a)
```

## 五 示例：下载 + 编译 fmt 库

```
cmake_minimum_required(VERSION 3.15)
project(ExternalExample)

include(ExternalProject)

ExternalProject_Add(
    fmt
    PREFIX ${CMAKE_BINARY_DIR}/_deps/fmt
    GIT_REPOSITORY https://github.com/fmtlib/fmt.git
    GIT_TAG 9.1.0
    UPDATE_DISCONNECTED 1
    CMAKE_ARGS
        -DCMAKE_INSTALL_PREFIX=<INSTALL_DIR>
        -DCMAKE_POSITION_INDEPENDENT_CODE=ON
        -DFMT_TEST=OFF
)

ExternalProject_Get_Property(fmt install_dir)

add_executable(main main.cpp)
target_include_directories(main PRIVATE ${install_dir}/include)
target_link_libraries(main PRIVATE ${install_dir}/lib/libfmt.a)

add_dependencies(main fmt)
```

## 六 注意事项

```
1、构建顺序
必须用 add_dependencies() 确保主项目等外部库编译完成。

2、缓存路径
外部项目会放在 PREFIX 下，CMake 重新配置时不会重复下载/构建。

3、交叉编译
需要手动在 CMAKE_ARGS 传递交叉编译工具链文件。

4、导入目标
ExternalProject_Add 本身不生成 CMake target，
需要自己用 target_link_libraries() 手动指定路径，或结合 find_package()。

5、比 FetchContent 慢
ExternalProject_Add 总是分离构建，不能直接在同一构建树内编译（除非特别配置），
相比之下 FetchContent 能更好地和你的工程融合。
```

## 七 工作流程图

### 7.1 流程图

```
                ┌───────────────────────┐
                │ CMake 主工程           │
                │ (CMakeLists.txt)       │
                └──────────┬────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │ include(ExternalProject)         │
        │ ExternalProject_Add(mylib ...)   │
        └─────────────────┬───────────────┘
                           │ 生成构建规则
                           ▼
        ┌─────────────────────────────────┐
        │ 外部项目构建流程                 │
        └─────────────────┬───────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
  ┌─────────────┐   ┌─────────────┐   ┌──────────────┐
  │ 下载阶段     │   │ 配置阶段     │   │ 构建阶段      │
  │ (Git/URL等)  │   │ (CMake/自定义)│   │ (make/ninja等)│
  └───────┬─────┘   └───────┬─────┘   └──────┬───────┘
          │                 │                │
          ▼                 ▼                ▼
      ┌────────────────────────────────────────┐
      │ 安装阶段  →  生成安装目录 <INSTALL_DIR> │
      └─────────────────┬──────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │ 主项目获取 install_dir            │
        │ target_include_directories()     │
        │ target_link_libraries()          │
        └─────────────────────────────────┘
```

### 7.2 流程解析

```
1、主工程配置阶段
 读取 CMakeLists.txt
 调用 ExternalProject_Add() 生成外部构建任务

2、外部项目构建阶段（独立生命周期）
 下载：支持 Git、SVN、URL、已有目录
 配置：执行外部项目自己的构建配置（可能是 CMake、Autotools…）
 构建：调用对应平台的构建工具（make、ninja、msbuild…）
 安装：把头文件、库等装到 <INSTALL_DIR>

3、主项目集成
 用 ExternalProject_Get_Property() 获取安装路径
 把 include & lib 路径加到主项目 target 中
 用 add_dependencies() 确保依赖顺序
```

