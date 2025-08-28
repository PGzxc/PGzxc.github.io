---
title: CMake开发之——配置文件与安装(3.6)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: a074694c
date: 2025-08-28 10:20:04
---
## 一 概述

```
本文介绍：CMake 配置文件（Config Files） 和 安装（install）
```

<!--more-->

## 二 配置文件

### 2.1 CMake 配置文件(Config Files)

配置文件常见有两种类型

|                           文件类型                           |                             作用                             | 生成阶段 |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :------: |
|                   **配置模板文件**(`*.in`)                   | 使用 `configure_file()` 根据变量生成实际配置文件<br>（如版本号、路径等） | 配置阶段 |
| **CMake 包配置文件**(`Config.cmake` / `ConfigVersion.cmake`) |               供其他项目 `find_package()` 使用               | 安装阶段 |

### 2.2 配置模板文件示例

```
1、config.h.in
#define PROJECT_NAME "@PROJECT_NAME@"
#define PROJECT_VERSION "@PROJECT_VERSION@"
#define INSTALL_PREFIX "@CMAKE_INSTALL_PREFIX@"

2、CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(MyApp VERSION 1.2.3)

configure_file(config.h.in config.h)

add_executable(myapp main.cpp)
target_include_directories(myapp PRIVATE
    ${CMAKE_BINARY_DIR} # config.h 会生成在这里
)

3、这样，config.h 会在配置阶段生成：
#define PROJECT_NAME "MyApp"
#define PROJECT_VERSION "1.2.3"
#define INSTALL_PREFIX "/usr/local"
```

## 三 安装(install)

### 3.1 说明

```
install() 命令用于将目标、头文件、库、配置文件等复制到系统或指定目录
```

### 3.2 安装操作

1、安装可执行文件或库

```
install(TARGETS myapp
    RUNTIME DESTINATION bin        # 可执行文件目录
    LIBRARY DESTINATION lib        # 动态库目录
    ARCHIVE DESTINATION lib/static # 静态库目录
)
```

2、安装头文件

```
install(FILES myheader.h DESTINATION include)
```

3、安装整个目录

```
install(DIRECTORY include/ DESTINATION include)
```

4、安装配置文件

```
install(FILES "${CMAKE_BINARY_DIR}/config.h" DESTINATION include)
```

## 四 结合配置文件和安装的完整例子

### 4.1 目录结构

```
MyProject/
│── CMakeLists.txt
│── config.h.in
│── main.cpp
```

### 4.2 源代码

1、config.h.in

```
#define PROJECT_NAME "@PROJECT_NAME@"
#define PROJECT_VERSION "@PROJECT_VERSION@"
```

2、main.cpp

```
#include <iostream>
#include "config.h"

int main() {
    std::cout << PROJECT_NAME << " v" << PROJECT_VERSION << std::endl;
}
```

3、CMakeLists.txt

```
cmake_minimum_required(VERSION 3.10)
project(MyApp VERSION 1.0.0)

# 配置文件
configure_file(config.h.in config.h)

add_executable(myapp main.cpp)
target_include_directories(myapp PRIVATE ${CMAKE_BINARY_DIR})

# 安装可执行文件
install(TARGETS myapp
    RUNTIME DESTINATION bin
)

# 安装生成的配置头文件
install(FILES "${CMAKE_BINARY_DIR}/config.h" DESTINATION include)
```

### 4.3 构建 & 安装

```
1、指令
cmake -S . -B build
cmake --build build
cmake --install build --prefix /tmp/myinstall

2、安装后目录
/tmp/myinstall/
├── bin/myapp
└── include/config.h
```

