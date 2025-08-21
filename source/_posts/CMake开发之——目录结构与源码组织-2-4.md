---
title: CMake开发之——目录结构与源码组织(2.4)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 7ca31dbe
date: 2025-08-19 10:30:50
---
## 一 概述

```
本文介绍CMake 项目的目录结构与源码组织，这样可以让项目既清晰又易于扩展
```

<!--more-->

## 二 目录结构与源码组织

### 2.1 最小项目结构(单文件)

1、目录结构

```
MyProject/
│── CMakeLists.txt
└── main.cpp
```

2、说明

```
适合 Demo、测试代码
缺点：扩展性差，不利于模块化
```

### 2.2 基础结构(源码与头文件分离)

1、目录结构

```
1、目录结构
MyProject/
│── CMakeLists.txt
│── src/
│   └── main.cpp
└── include/
    └── mylib.h
```

2、说明：

```
include/ 存放对外公开的头文件
src/ 存放源代码
```

3、CMake

```
cmake_minimum_required(VERSION 3.10)
project(MyProject)

include_directories(${PROJECT_SOURCE_DIR}/include)
add_executable(MyApp src/main.cpp)
```

### 2.3  模块化结构(多源文件 + 自定义库)

1、目录结构

```
MyProject/
│── CMakeLists.txt
│── include/
│   └── mylib.h
│── src/
│   ├── main.cpp
│   ├── mylib.cpp
│   └── CMakeLists.txt
```

2、顶层 `CMakeLists.txt`

```
cmake_minimum_required(VERSION 3.10)
project(MyProject)

add_subdirectory(src)  # 进入 src 子目录

add_executable(MyApp src/main.cpp)
target_link_libraries(MyApp PRIVATE MyLib)
```

3、src/CMakeLists.txt

```
add_library(MyLib mylib.cpp)
target_include_directories(MyLib PUBLIC ${PROJECT_SOURCE_DIR}/include)
```

### 2.4 大型项目结构(库 + 可执行文件 + 测试)

1、目录结构

```
MyProject/
│── CMakeLists.txt
│── include/              # 公共头文件
│── src/                  # 库源码
│   ├── CMakeLists.txt
│   ├── mylib.cpp
│   └── mylib_internal.cpp
│── app/                  # 可执行文件
│   ├── CMakeLists.txt
│   └── main.cpp
└── tests/                # 测试
    ├── CMakeLists.txt
    └── test_mylib.cpp
```

2、各个CMakeLists.txt

```
1、顶层 CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(MyProject)

add_subdirectory(src)
add_subdirectory(app)
add_subdirectory(tests)

2、src/CMakeLists.txt
add_library(MyLib mylib.cpp mylib_internal.cpp)
target_include_directories(MyLib PUBLIC ${PROJECT_SOURCE_DIR}/include)

3、app/CMakeLists.txt
add_executable(MyApp main.cpp)
target_link_libraries(MyApp PRIVATE MyLib)

4、tests/CMakeLists.txt
add_executable(MyLibTests test_mylib.cpp)
target_link_libraries(MyLibTests PRIVATE MyLib)
```

## 三 组织建议

```
1、头文件分层：
 include/：公共 API
 src/：私有实现

2、逻辑模块化：使用 add_subdirectory() 组织模块
3、避免全局 include_directories：用 target_include_directories() 代替
4、可选功能用缓存变量：方便开启/关闭模块
5、单独 tests 目录：方便集成 CI/CD 测试
```

