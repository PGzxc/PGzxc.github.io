---
title: CMake开发之——find_package使用(5.1)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: d6cf03fd
date: 2025-09-08 09:00:17
---
## 一 概述

```
本文介绍：CMake find_package() 的使用方法，
包括作用、模式、配置文件写法、示例以及常见坑
```

<!--more-->

## 二 find_package() 作用

```
在 CMake 中用于查找和加载外部依赖（库、包）。
查找成功后，会定义相应变量（如库路径、头文件路径）和目标（targets）。
方便跨平台和多构建系统统一管理依赖。
```

## 三 基本语法

```
1、语法
find_package(<PackageName> [version] [EXACT] [QUIET] [REQUIRED]
             [COMPONENTS components...]
             [OPTIONAL_COMPONENTS components...])

2、参数说明
 <PackageName>：包名（区分大小写）。
 [version]：要求的最低版本。
 EXACT：版本必须完全匹配。
 QUIET：静默模式，不输出信息。
 REQUIRED：如果没找到就报错并停止配置。
 COMPONENTS：指定需要的组件（如果包支持拆分
```

## 四 两种工作模式

### 4.1 Module 模式

```
1、工作模式
 CMake 在其 模块路径（CMAKE_MODULE_PATH）中查找 Find<PackageName>.cmake 文件。
 如果找到，就执行该文件，并返回相关变量。
 适合查找系统自带或自定义库
 
2、示例
find_package(OpenGL REQUIRED)

3、说明
CMake 会去找 FindOpenGL.cmake（系统内置模块）
```

### 4.2 Config 模式

```
1、工作模式
 查找 <PackageName>Config.cmake 或 <lower-case-package-name>-config.cmake 文件。
 一般由库自身提供（例如安装时生成的 CMake 配置文件）。
 适合查找用 CMake 构建和安装的第三方库。
 
2、示例
 find_package(MyLib CONFIG REQUIRED)

3、会查找
 <路径>/MyLibConfig.cmake
 <路径>/mylib-config.cmake
```

## 五 搜索路径

```
1、CMake 查找顺序（Config 模式）：
 用户指定路径（-DCMAKE_PREFIX_PATH、-DMyLib_DIR）
 系统安装路径（如 /usr/lib/cmake/MyLib）
 环境变量（如 CMAKE_PREFIX_PATH、PATH）
 默认安装路径（CMake 自身规则）
 
2、可以用
cmake -DMyLib_DIR=/path/to/mylib/cmake ..
```

## 六 返回结果

### 6.1 返回结果

```
find_package() 查找成功后，一般会：
 定义 导入目标（现代用法）
 定义 变量（传统用法）
```

### 6.2 示例(OpenCV)

```
1、定义变量
find_package(OpenCV REQUIRED)
target_link_libraries(my_app PRIVATE ${OpenCV_LIBS})
include_directories(${OpenCV_INCLUDE_DIRS})

2、现代 CMake 推荐
find_package(OpenCV REQUIRED)
target_link_libraries(my_app PRIVATE OpenCV::Core OpenCV::ImgProc)
```

## 七 自定义 Find 模块

### 7.1 自定义模块

```
如果 CMake 没有内置 FindXXX.cmake，可自己写
# FindFoo.cmake
find_path(FOO_INCLUDE_DIR foo.h)
find_library(FOO_LIBRARY NAMES foo)
mark_as_advanced(FOO_INCLUDE_DIR FOO_LIBRARY)

include(FindPackageHandleStandardArgs)
find_package_handle_standard_args(Foo REQUIRED_VARS FOO_LIBRARY FOO_INCLUDE_DIR)

if(FOO_FOUND)
    set(FOO_LIBRARIES ${FOO_LIBRARY})
    set(FOO_INCLUDE_DIRS ${FOO_INCLUDE_DIR})
endif()
```

### 7.2 使用模块

```
set(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")
find_package(Foo REQUIRED)
```

## 八 常见坑

```
忘记 CONFIG 关键字 → 会走 Module 模式而找不到。
find_package() 查找不到 → 需要正确设置 CMAKE_PREFIX_PATH 或 <PkgName>_DIR。
旧库没有导入目标，只能用变量 + include_directories()。
Windows 上有时要额外加 .lib 搜索路径。
```

## 九 示例

```
cmake_minimum_required(VERSION 3.15)
project(FindPkgExample)

# 查找 Boost（Module 模式）
find_package(Boost 1.65 REQUIRED COMPONENTS filesystem system)
add_executable(app main.cpp)
target_link_libraries(app PRIVATE Boost::filesystem Boost::system)

# 查找 fmt（Config 模式）
find_package(fmt CONFIG REQUIRED)
target_link_libraries(app PRIVATE fmt::fmt)
```

