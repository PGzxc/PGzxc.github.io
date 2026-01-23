---
title: CMake开发之——预编译头文件(6.6)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 9aee8329
date: 2025-11-02 09:06:25
---
## 一 什么是预编译头文件？

```
预编译头文件（PCH）是一种加速 C/C++ 编译过程的技术。
将不常改变的头文件预先编译成二进制形式，后续编译时直接复用，显著缩短编译时间。
```

<!--more-->

## 二 CMake 中的预编译头支持

```
1、支持版本
从 CMake 3.16 起，CMake 提供了官方支持预编译头的命令

2、语法
target_precompile_headers(<target> [SYSTEM] [INTERFACE|PUBLIC|PRIVATE] <headers>...)
```

## 三 使用示例

### 3.1 项目结构

```
project_root/
  ├── src/
  │     ├── main.cpp
  │     └── precompiled.h
  └── CMakeLists.txt
```

### 3.2 源代码

1、`precompiled.h` 示例

```
// precompiled.h
#include <iostream>
#include <vector>
#include <string>
// 这里放项目中常用且变化不大的头文件
```

2、`CMakeLists.txt` 示例

```
1、示例
cmake_minimum_required(VERSION 3.16)
project(MyApp)

add_executable(myapp src/main.cpp)

target_precompile_headers(myapp PRIVATE src/precompiled.h)

2、说明
-PRIVATE 表示只对目标本身生效。
-也可以用 PUBLIC 或 INTERFACE，根据需求调整作用域。
```

## 四 多个头文件预编译

```
target_precompile_headers(myapp PRIVATE
    src/precompiled.h
    src/other_header.h
)
```

## 五 兼容旧版本 CMake

```
如果你用的 CMake 版本 < 3.16，可以手动用第三方模块或脚本实现预编译头功能，
比较复杂，一般推荐升级 CMake。
```

## 六  注意事项

```
预编译头文件应包含大量项目公共头文件，且不常改动。
不同编译器对 PCH 的支持方式不同，CMake 会帮你自动处理。
使用预编译头后，编译时间通常能显著缩短。
```

