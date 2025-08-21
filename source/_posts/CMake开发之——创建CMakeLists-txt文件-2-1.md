---
title: CMake开发之——创建CMakeLists.txt文件(2.1)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 212b5c8b
date: 2025-08-15 08:10:26
---
## 一 概述

```
这是CMakeLists.txt 创建与示例指南，
从最简单的版本到带依赖、安装规则的版本
```

<!--more-->

## 二 CMakeLists.txt 是什么

```
作用：告诉 CMake 你的项目如何构建（源文件、头文件、库、依赖等）。

位置：一般放在项目根目录（也可以在子目录中放，配合 add_subdirectory() 使用）。

文件名：必须是 CMakeLists.txt（大小写敏感，Linux 上尤其注意）
```

## 三 最小示例

### 3.1 目录结构

```
MyProject/
│── CMakeLists.txt
└── main.cpp
```

### 3.2 源代码

1、main.cpp

```
#include <iostream>
int main() {
    std::cout << "Hello CMake!" << std::endl;
    return 0;
}
```

2、CMakeLists.txt

```
# 1. 最低版本要求
cmake_minimum_required(VERSION 3.10)

# 2. 项目信息
project(MyProject VERSION 1.0 LANGUAGES CXX)

# 3. 添加可执行文件
add_executable(MyApp main.cpp)
```

### 3.3 构建

```
cmake -S . -B build
cmake --build build
```

### 3.4 运行

```
./build/MyApp   # Linux/macOS
build\Debug\MyApp.exe  # Windows
```

## 四 进阶版本(含编译选项)

```
cmake_minimum_required(VERSION 3.10)
project(MyProject VERSION 1.0 LANGUAGES CXX)

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_executable(MyApp main.cpp)

# 添加编译选项（跨平台示例）
if(MSVC)
    target_compile_options(MyApp PRIVATE /W4) # Windows MSVC
else()
    target_compile_options(MyApp PRIVATE -Wall -Wextra -pedantic) # GCC/Clang
endif()
```

## 五 带头文件目录 + 子目录(仅演示)

### 5.1 目录结构

```
MyProject/
│── CMakeLists.txt
│── include/
│   └── mylib.h
│── src/
│   ├── CMakeLists.txt
│   └── mylib.cpp
└── main.cpp
```

### 5.2 源代码

1、顶层 CMakeLists.txt

```
cmake_minimum_required(VERSION 3.10)
project(MyProject VERSION 1.0 LANGUAGES CXX)

# 添加 include 目录
include_directories(${PROJECT_SOURCE_DIR}/include)

# 添加子目录
add_subdirectory(src)

# 添加可执行文件并链接库
add_executable(MyApp main.cpp)
target_link_libraries(MyApp PRIVATE MyLib)
```

2、src/CMakeLists.txt

```
add_library(MyLib mylib.cpp)
```

## 六 带安装规则

### 6.1 CMakeLists.txt

```
cmake_minimum_required(VERSION 3.10)
project(MyProject VERSION 1.0 LANGUAGES CXX)

add_executable(MyApp main.cpp)

# 安装可执行文件
install(TARGETS MyApp DESTINATION bin)

# 安装头文件
install(FILES mylib.h DESTINATION include)
```

### 6.2 构建并安装

```
cmake -S . -B build
cmake --build build
cmake --install build --prefix /usr/local
```

