---
title: Cmake开发之——基本命令介绍(1.5)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 1ce24c74
date: 2025-08-14 16:30:14
---
## 一 概述

```
这是CMake 基本命令介绍，
涵盖常用的构建流程命令（cmake、cmake --build、cmake --install 等），
并配上用法示例
```

<!--more-->

## 二 命令介绍

### 2.1 cmake —— 生成构建系统

1、概念

```
1、作用：
读取 CMakeLists.txt 并生成平台对应的构建文件（Makefile、build.ninja、.sln 等）

2、基本语法
cmake [选项] <源代码路径>

3、示例
# 创建 build 目录并生成 Ninja 构建文件
cmake -S . -B build -G "Ninja" -DCMAKE_BUILD_TYPE=Release
```

2、常用参数

|     参数      |                             作用                             |
| :-----------: | :----------------------------------------------------------: |
|  -G <生成器>  | 指定构建工具（如 "Unix Makefiles"、"Ninja"、"Visual Studio 17 2022"） |
| -B <构建目录> |         指定构建输出目录（推荐 out-of-source build）         |
| -S <源码目录> |                  指定源码目录（配合 `-B`）                   |
| -D<变量>=<值> |            传递 CMake 变量（如编译类型、选项等）             |

### 2.2 cmake --build —— 执行构建

1、概念

```
1、作用：
 调用生成器对应的构建工具（make / ninja / msbuild 等）执行编译。

2、基本语法
cmake --build <构建目录> [选项]

3、示例
# 编译 Debug 版本
cmake --build build --config Debug

# 编译 Release 版本，指定目标 mylib
cmake --build build --config Release --target mylib

```

2、常用参数

|      参数       |                             作用                             |
| :-------------: | :----------------------------------------------------------: |
| --target <目标> |   指定要构建的目标（target），如 `myapp`、`install`、`all`   |
| --config <配置> | 指定构建配置（`Debug`、`Release` 等，常用于多配置生成器如 Visual Studio） |
|   -j <并行数>   |    并行构建任务数（有的构建工具会自动使用所有 CPU 核心）     |

### 2.3 cmake --install —— 安装构建产物

1、概念

```
1、作用：
 将构建好的可执行文件、库、资源等安装到指定位置（由 install() 规则定义）。
2、基本语法
cmake --install <构建目录> [选项]
3、示例
# 安装到 /usr/local
cmake --install build --prefix /usr/local

# Windows + Visual Studio 安装 Release 版本
cmake --install build --config Release
```

2、常用参数

|      参数       |                        作用                        |
| :-------------: | :------------------------------------------------: |
| --prefix <路径> | 指定安装目录（默认由 `CMAKE_INSTALL_PREFIX` 决定） |
| --config <配置> |         指定构建配置（常用于多配置生成器）         |

### 2.4 cmake --version

```
1、指令
cmake --version

2、作用
查看 CMake 版本
```

### 2.5 cmake -L / cmake -LAH

```
1、指令
cmake -LAH build

2、查看缓存变量：
-L：列出缓存变量
-LAH：列出并显示帮助信息（包括高级变量）
```

### 2.6 cmake -E

```
1、说明
执行一些实用工具命令（文件操作、运行命令等），常用于自定义构建步骤：

2、指令
cmake -E copy src.txt dst.txt   # 复制文件
cmake -E make_directory build   # 创建目录
```

## 三 典型构建流程

```
# 1. 生成构建文件
cmake -S . -B build -G "Ninja" -DCMAKE_BUILD_TYPE=Release

# 2. 编译项目
cmake --build build

# 3. 安装产物
cmake --install build --prefix /usr/local
```

