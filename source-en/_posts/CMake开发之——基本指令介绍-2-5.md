---
title: CMake开发之——基本指令介绍(2.5)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 3f64cac2
date: 2025-08-19 10:31:47
---
## 一 概述

```
本文介绍基本指令
 -project()
 -add_executable()
 -add_library()
 -target_link_libraries()
 -include_directories()
```

<!--more-->

## 二 指令介绍

### 2.1 project()

```
1、作用：定义项目名称和可选的版本、语言
2、示例
project(MyProject VERSION 1.0 LANGUAGES CXX C)

3、说明
 VERSION：项目版本
 LANGUAGES：指定使用的语言（C, CXX, Fortran...）

4、自动定义变量：
 PROJECT_NAME
 PROJECT_VERSION, PROJECT_VERSION_MAJOR, PROJECT_VERSION_MINOR 等
```

### 2.2 add_executable()

```
1、作用：生成可执行文件
2、示例
add_executable(MyApp main.cpp utils.cpp)
3、说明
 第一个参数：可执行文件名称
 后续参数：源文件列表

4、也可以使用相对路径或变量：
 add_executable(MyApp ${SRC_FILES})
```

### 2.3 add_library()

```
1、作用：生成库文件(静态/动态)
2、示例
# 静态库
add_library(MyLib STATIC mylib.cpp)

# 动态库
add_library(MyLib SHARED mylib.cpp)

# 无指定类型时，受 BUILD_SHARED_LIBS 控制
add_library(MyLib mylib.cpp)

3、说明
 静态库（STATIC）：.a / .lib
 动态库（SHARED）：.so / .dll
 模块库（MODULE）：插件式 .so / .dll（不自动链接
```

### 2.4 target_link_libraries()

```
1、作用：为目标（可执行文件/库）添加依赖的库
2、示例
target_link_libraries(MyApp PRIVATE MyLib)

3、作用域修饰符
 PRIVATE：依赖只对当前目标可见
 PUBLIC：依赖对当前目标和依赖它的目标可见
 INTERFACE：依赖只对依赖它的目标可见

4、示例
add_executable(MyApp main.cpp)
add_library(MyLib mylib.cpp)
target_link_libraries(MyApp PRIVATE MyLib)
```

### 2.5 include_directories()

```
1、作用：添加头文件搜索路径（全局作用）
2、示例
include_directories(${PROJECT_SOURCE_DIR}/include)

3、注意
现代 CMake 推荐使用 target_include_directories() 代替，作用范围更可控
target_include_directories(MyLib PUBLIC ${PROJECT_SOURCE_DIR}/include)
```

## 三 整体示例

### 3.1 目录结构

```
MyProject/
├── CMakeLists.txt
├── include/
│   └── mylib.h
└── src/
    ├── main.cpp
    └── mylib.cpp
```

### 3.2 CMakeLists.txt

```
cmake_minimum_required(VERSION 3.10)
project(MyProject VERSION 1.0 LANGUAGES CXX)

# 生成库
add_library(MyLib STATIC src/mylib.cpp)
target_include_directories(MyLib PUBLIC include)

# 生成可执行文件
add_executable(MyApp src/main.cpp)
target_link_libraries(MyApp PRIVATE MyLib)
```

