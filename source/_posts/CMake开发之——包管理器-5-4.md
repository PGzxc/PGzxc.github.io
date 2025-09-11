---
title: CMake开发之——包管理器(5.4)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 1dd78492
date: 2025-09-11 08:41:39
---
## 一 概述

```
本文介绍：包管理器(Conan, vcpkg)集成
```

<!--more-->

## 二 为什么要用包管理器

```
自动下载依赖，避免手动安装库和配置路径。
统一管理多个项目的依赖版本。
跨平台支持（Windows / Linux / macOS）。
减少 find_package() 的痛苦（直接集成生成 CMake targets
```

## 三 Conan 集成

### 3.1 安装 Conan

```
pip install conan
或
brew install conan  # macOS
```

### 3.2 创建 `conanfile.txt`

```
[requires]
fmt/9.1.0
spdlog/1.12.0

[generators]
CMakeDeps
CMakeToolchain
```

### 3.3 配置 & 安装依赖

```
1、指令
 mkdir build && cd build
 conan install .. --build=missing

2、这会生成
 fmt-config.cmake 等 CMake 配置文件
 conan_toolchain.cmake 工具链文件
```

### 3.4 在 CMake 中使用

```
1、示例
cmake_minimum_required(VERSION 3.15)
project(ConanExample)

# 引入 Conan 工具链
include(${CMAKE_BINARY_DIR}/conan_toolchain.cmake OPTIONAL)

find_package(fmt REQUIRED)
find_package(spdlog REQUIRED)

add_executable(main main.cpp)
target_link_libraries(main PRIVATE fmt::fmt spdlog::spdlog)

2、说明
Conan 会安装库到本地缓存，不会污染系统目录
```

## 四 vcpkg 集成

### 4.1 安装 vcpkg

```
git clone https://github.com/microsoft/vcpkg.git
./vcpkg/bootstrap-vcpkg.sh   # Linux/macOS
vcpkg\bootstrap-vcpkg.bat    # Windows
```

### 4.2 安装库

```
./vcpkg install fmt spdlog
```

### 4.3 CMake 集成(两种方式)

1、方式 1：Toolchain 模式（推荐）

```
1、编译指令
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg.cmake

2、CMakeLists.txt 里直接用
find_package(fmt CONFIG REQUIRED)
find_package(spdlog CONFIG REQUIRED)

add_executable(main main.cpp)
target_link_libraries(main PRIVATE fmt::fmt spdlog::spdlog)
```

2、方式 2：Manifest 模式（项目依赖声明）

```
1、在项目根目录创建 vcpkg.json
{
  "name": "myproject",
  "version": "1.0.0",
  "dependencies": [
    "fmt",
    "spdlog"
  ]
}

2、这样 vcpkg 会在构建时自动安装依赖
```

## 五 Conan vs vcpkg 对比

|    特性    |            Conan             |              vcpkg              |
| :--------: | :--------------------------: | :-----------------------------: |
|   依赖源   |    官方 + 社区 + 自建仓库    |       官方仓库(微软维护)        |
|  平台支持  | Windows/Linux/macOS/交叉编译 | Windows/Linux/macOS(交叉编译弱) |
| 配置灵活性 |  高（profiles、自定义构建）  |       中（集中管理安装）        |
|  适合场景  |   商业项目、多平台交叉编译   |     Windows/跨平台简单项目      |
|  集成方式  | CMakeDeps + CMakeToolchain |  find_package(CONFIG REQUIRED)  |

## 六 总结集成流程

### 6.1 Conan

```
1. 写 conanfile.txt
2. conan install
3. include conan_toolchain.cmake
4. find_package()
```

### 6.2 vcpkg

```
1. 安装 vcpkg
2. 安装库 (install 或 vcpkg.json)
3. cmake 指定 toolchain
4. find_package()
```

## 七 CMake + Conan / vcpkg 集成工作流程对照图

### 7.1 流程图

```
         ┌────────────────────┐
         │    CMake 项目       │
         │ (CMakeLists.txt)    │
         └─────────┬──────────┘
                   │
        ┌──────────┴───────────────────────────────────────┐
        │                                                   │
        ▼                                                   ▼
┌─────────────────────┐                         ┌──────────────────────┐
│       Conan          │                         │       vcpkg          │
└─────────────────────┘                         └──────────────────────┘
       │                                               │
       │ conan install                                 │ vcpkg install / vcpkg.json
       ▼                                               ▼
┌─────────────────────────┐                 ┌────────────────────────────┐
│  下载依赖（本地缓存）   │                 │ 下载依赖（vcpkg 目录）      │
└───────────┬─────────────┘                 └───────────┬────────────────┘
            │                                           │
            ▼                                           ▼
  ┌──────────────────────────────┐          ┌──────────────────────────────┐
  │ 生成 CMakeDeps + Toolchain    │          │ 生成 vcpkg.cmake toolchain    │
  │ (xxx-config.cmake 等)         │          │ (支持 find_package CONFIG)    │
  └───────────┬──────────────────┘          └───────────┬──────────────────┘
              │                                           │
              ▼                                           ▼
   ┌────────────────────────────┐             ┌────────────────────────────┐
   │ include(toolchain.cmake)   │             │ -DCMAKE_TOOLCHAIN_FILE=...  │
   │ find_package(fmt ...)      │             │ find_package(fmt CONFIG ...)│
   └───────────┬────────────────┘             └───────────┬────────────────┘
               │                                            │
               ▼                                            ▼
       ┌───────────────────┐                      ┌───────────────────┐
       │ target_link_libraries│                    │ target_link_libraries│
       └───────────┬─────────┘                    └───────────┬─────────┘
                   ▼                                          ▼
             ┌──────────────────────────────────────────────────────┐
             │                编译 & 链接完成                         │
             └──────────────────────────────────────────────────────┘
```

### 7.2 图中流程说明

```
1、Conan
 用 conan install 下载依赖到本地缓存
 生成 CMake 依赖配置文件（xxx-config.cmake）+ 工具链
 在 CMakeLists.txt 中 include 工具链并 find_package
 链接依赖库

2、vcpkg
 用 vcpkg install 或 vcpkg.json 安装依赖到 vcpkg 目录
 生成 vcpkg.cmake 工具链文件
 在 CMake 配置时通过 -DCMAKE_TOOLCHAIN_FILE 引入
 直接 find_package 并链接依赖
```

