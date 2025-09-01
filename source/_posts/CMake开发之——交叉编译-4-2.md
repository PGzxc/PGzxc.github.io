---
title: CMake开发之——交叉编译(4.2)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: fcf9cf6b
date: 2025-09-01 15:02:53
---
## 一 概述

```
本文介绍：CMake 交叉编译基础 的系统整理，包含原理、配置方法、工具链文件和示例。
```

<!--more-->

## 二 什么是交叉编译

```
交叉编译指在一种平台（如 x86 PC）上生成另一种平台（如 ARM 嵌入式设备）可执行代码的过程。

需要针对目标平台指定编译器、链接器、系统库等工具和路径。
```

## 三 CMake 交叉编译原理

```
CMake 通过工具链文件（Toolchain file）指定目标平台编译环境。

工具链文件中指定交叉编译器路径、系统根目录、编译器前缀等。

配置时指定工具链文件让 CMake 以目标平台视角解析项目。
```

## 四 工具链文件(Toolchain File)示例

```
1、假设交叉编译 ARM Linux，文件名 arm-toolchain.cmake：

2、CMakeList.txt
# 目标系统名称和处理器架构
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR arm)

# 交叉编译器路径
set(CMAKE_C_COMPILER /opt/gcc-arm/bin/arm-linux-gnueabihf-gcc)
set(CMAKE_CXX_COMPILER /opt/gcc-arm/bin/arm-linux-gnueabihf-g++)

# 目标系统根目录（交叉编译系统库）
set(CMAKE_SYSROOT /opt/gcc-arm/arm-linux-gnueabihf/sysroot)

# 指定搜索路径优先级
set(CMAKE_FIND_ROOT_PATH /opt/gcc-arm/arm-linux-gnueabihf/sysroot)

# 寻找程序时只在主机系统搜索
set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
# 寻找库和头文件时优先在交叉根目录找
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
```

## 五 配置并构建

```
cmake -S . -B build -DCMAKE_TOOLCHAIN_FILE=arm-toolchain.cmake
cmake --build build
```

## 六 注意事项

```
1、工具链文件中设置的变量必须符合目标平台环境。
2、交叉编译时，不能执行生成的二进制，所以不能使用运行时检测（如 try_run）等功能。
3、需要提前准备目标系统的头文件、库（sysroot）供编译器查找。
4、有时需要配置 CMAKE_FIND_ROOT_PATH 和相关搜索策略避免查错依赖。
5、不同平台、不同架构工具链文件配置有所不同
```

## 七 常用变量说明

|           变量名            |                   说明                   |
| :-------------------------: | :--------------------------------------: |
|      CMAKE_SYSTEM_NAME      | 目标系统名称，如 Linux、Windows、Android |
|   CMAKE_SYSTEM_PROCESSOR    |    目标架构，如 arm、aarch64、x86_64     |
|      CMAKE_C_COMPILER       |               C 编译器路径               |
|     CMAKE_CXX_COMPILER      |              C++ 编译器路径              |
|        CMAKE_SYSROOT        |      目标系统根目录（库、头文件根）      |
|    CMAKE_FIND_ROOT_PATH     |     搜索根路径，帮助定位目标平台资源     |
| CMAKE_FIND_ROOT_PATH_MODE_* |      控制搜索程序、库、头文件的策略      |

