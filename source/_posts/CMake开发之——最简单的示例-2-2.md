---
title: CMake开发之——最简单的示例(2.2)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 20456de0
date: 2025-08-15 08:12:52
---
## 一 概述

```
这是一个最简单的 CMake 示例——从零生成一个可执行文件
```

<!--more-->

## 二 最小示例

### 2.1 目录结构

```
MyProject/
│── CMakeLists.txt
└── main.cpp
```

### 2.2 源代码

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

4、说明
 cmake_minimum_required 确保 CMake 版本满足需求
 project 定义项目名
 add_executable 生成可执行文件
```

### 2.3 构建

```
cmake -S . -B build
cmake --build build
```

### 2.4 运行

```
./build/MyApp   # Linux/macOS
build\Debug\MyApp.exe  # Windows
```

