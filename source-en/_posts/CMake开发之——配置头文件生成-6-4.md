---
title: CMake开发之——配置头文件生成(6.4)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: b19247ca
date: 2025-10-31 09:15:05
---
## 一 概述

```
本文介绍：CMake 中配置头文件生成(configure_file)
```

<!--more-->

## 二 什么是configure_file？

```
configure_file() 是 CMake 提供的一个命令，
用于将一个模板文件（通常是配置文件或头文件）复制到构建目录，并在复制过程中替换其中的变量。

典型用途是根据 CMake 配置的变量生成对应的头文件，方便程序里引用配置参数
```

## 三 基本用法

### 3.1 定义

```
1、假设你有一个模板头文件 config.h.in，内容示例
#define PROJECT_NAME "@PROJECT_NAME@"
#define PROJECT_VERSION "@PROJECT_VERSION@"

2、在 CMakeLists.txt 中配置
set(PROJECT_NAME "MyProject")
set(PROJECT_VERSION "1.0.0")

configure_file(
    ${CMAKE_CURRENT_SOURCE_DIR}/config.h.in
    ${CMAKE_CURRENT_BINARY_DIR}/config.h
    @ONLY
)

3、说明
第一个参数是模板文件路径。
第二个参数是输出文件路径（通常在构建目录）。
@ONLY 表示只替换 @VAR@ 格式变量，不会替换 ${VAR}。
```

### 3.2 使用方式

```
1、在代码中包含生成的头文件：
#include "config.h"

2、需要确保编译器的头文件搜索路径包含 ${CMAKE_CURRENT_BINARY_DIR}，
通常在 CMakeLists.txt 里添加

include_directories(${CMAKE_CURRENT_BINARY_DIR})

3、或者（现代写法）
target_include_directories(myapp PRIVATE ${CMAKE_CURRENT_BINARY_DIR})
```

## 四 示例

### 4.1 源代码

1、`config.h.in` 模板文件

```
// config.h.in
#pragma once

#define PROJECT_NAME "@PROJECT_NAME@"
#define PROJECT_VERSION "@PROJECT_VERSION@"
```

2、`CMakeLists.txt` 文件

```
cmake_minimum_required(VERSION 3.10)
project(MyProject VERSION 1.0.0)

# 定义变量（也可以用 project 定义的变量）
set(PROJECT_NAME "MyProject")
set(PROJECT_VERSION "1.0.0")

# 生成配置头文件
configure_file(
    ${CMAKE_CURRENT_SOURCE_DIR}/config.h.in
    ${CMAKE_CURRENT_BINARY_DIR}/config.h
    @ONLY
)

# 添加可执行文件
add_executable(myapp main.cpp)

# 指定包含路径为构建目录（生成的 config.h 所在）
target_include_directories(myapp PRIVATE ${CMAKE_CURRENT_BINARY_DIR})
```

3、`main.cpp` 示例代码

```
#include <iostream>
#include "config.h"

int main() {
    std::cout << "Project Name: " << PROJECT_NAME << std::endl;
    std::cout << "Version: " << PROJECT_VERSION << std::endl;
    return 0;
}
```

### 4.2 构建和运行

```
mkdir build
cd build
cmake ..
cmake --build .
./myapp
```

### 4.3 运行结果

```
Project Name: MyProject
Version: 1.0.0
```

## 五 注意事项

```
模板文件里的变量必须用 @VAR@ 格式。
使用 @ONLY 可以避免误替换。
生成文件一般放在构建目录，避免污染源码目录。
配合版本号、路径等配置信息自动生成头文件，方便代码读取。
```

## 六 工作流程图

### 6.1 流程图

```
┌─────────────────────────────┐
│       CMake 配置阶段         │
│ - 读取 CMakeLists.txt        │
│ - 识别 configure_file 命令  │
└───────────────┬─────────────┘
                │
                ▼
┌─────────────────────────────┐
│   读取模板文件 config.h.in   │
│ - 包含占位符变量 @VAR@       │
└───────────────┬─────────────┘
                │
                ▼
┌─────────────────────────────┐
│ 替换模板中变量为当前值       │
│ - 如 @PROJECT_NAME@ → MyProject│
│ - 如 @PROJECT_VERSION@ → 1.0.0 │
└───────────────┬─────────────┘
                │
                ▼
┌─────────────────────────────┐
│ 生成配置头文件 config.h       │
│ - 输出到构建目录              │
└───────────────┬─────────────┘
                │
                ▼
┌─────────────────────────────┐
│ 编译阶段                    │
│ - 编译器查找包含目录         │
│ - 代码中包含 config.h        │
│ - 编译链接生成目标           │
└─────────────────────────────┘
```

### 6.2 简要说明

```
configure_file 在配置阶段执行，读取模板文件，替换变量，生成真正的配置头文件。
生成的文件放在构建目录，避免污染源码。
代码通过包含生成的头文件获得配置信息。
```

