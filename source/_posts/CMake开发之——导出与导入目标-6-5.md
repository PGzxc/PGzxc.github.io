---
title: CMake开发之——导出与导入目标(6.5)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 72eff338
date: 2025-11-01 09:18:23
---
## 一 概述

```
本文介绍：目标导出(export)与导入(import)机制，理解如何将库和目标在不同项目或包之间复用
```

<!--more-->

## 二 概念

### 2.1 目标导出与导入的概念

```
导出(export)：将当前项目的构建目标信息(包括编译选项、链接库等)导出到一个文件中，供其他项目使用。

导入(import)：在另一个项目中通过导入文件，引用已导出的目标，实现复用。
```

### 2.2 为什么要导出/导入目标？

```
简化大型项目或多个项目间的依赖管理。
方便通过 find_package() 找到并使用某个库。
保持目标的编译属性一致。
```

## 三 基本用法示例

### 3.1 导出目标

```
1、假设你的库项目 MyLib
add_library(MyLib SHARED src/mylib.cpp)

# 安装库和头文件
install(TARGETS MyLib
    EXPORT MyLibTargets           # 导出目标到 MyLibTargets
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
    RUNTIME DESTINATION bin
    INCLUDES DESTINATION include
)

install(DIRECTORY include/ DESTINATION include)

# 导出 targets 到文件
install(EXPORT MyLibTargets
    FILE MyLibTargets.cmake
    NAMESPACE MyLib::
    DESTINATION lib/cmake/MyLib
)

# 生成配置文件方便 find_package 使用（简化示例）
include(CMakePackageConfigHelpers)
write_basic_package_version_file(
    "${CMAKE_CURRENT_BINARY_DIR}/MyLibConfigVersion.cmake"
    VERSION ${PROJECT_VERSION}
    COMPATIBILITY AnyNewerVersion
)

configure_package_config_file(
    "${CMAKE_CURRENT_SOURCE_DIR}/cmake/MyLibConfig.cmake.in"
    "${CMAKE_CURRENT_BINARY_DIR}/MyLibConfig.cmake"
    INSTALL_DESTINATION lib/cmake/MyLib
)

install(FILES
    "${CMAKE_CURRENT_BINARY_DIR}/MyLibConfig.cmake"
    "${CMAKE_CURRENT_BINARY_DIR}/MyLibConfigVersion.cmake"
    DESTINATION lib/cmake/MyLib
)

2、说明
 install(TARGETS ... EXPORT ...)：指定导出的目标集名称。
 install(EXPORT ...)：将目标集导出成 .cmake 文件。
 配置 MyLibConfig.cmake 文件，供 find_package 使用
```

### 3.2 导入目标(在另一个项目中使用)

```
1、示例
find_package(MyLib REQUIRED)

add_executable(MyApp src/main.cpp)
target_link_libraries(MyApp PRIVATE MyLib::MyLib)

2、说明
find_package 会找到导出的配置文件和目标。
通过 MyLib::MyLib 使用导入的目标。
```

## 四 直接导入导出目标示例(简单用法)

### 4.1 导出(ProjectA)

```
add_library(foo foo.cpp)

install(TARGETS foo
    EXPORT fooTargets
    DESTINATION lib
)

install(EXPORT fooTargets
    FILE fooTargets.cmake
    DESTINATION lib/cmake/foo
)
```

### 4.2 导入(ProjectB)

```
add_subdirectory(path/to/ProjectA)

# 或者导入导出文件
include(path/to/ProjectA/lib/cmake/foo/fooTargets.cmake)

add_executable(app main.cpp)
target_link_libraries(app PRIVATE foo)
```

## 五 总结

|                  操作                   |            说明            |
| :-------------------------------------: | :------------------------: |
|     install(TARGETS ... EXPORT ...)     |        导出构建目标        |
|           install(EXPORT ...)           | 导出目标集到 `.cmake` 文件 |
|             find_package()              |       查找导出目标集       |
| target_link_libraries(... MyLib::MyLib) |       使用导入的目标       |

## 六 目标导出与导入流程图

### 6.1 流程图

```
┌───────────────────────────────┐
│         项目 A (库项目)         │
│ ┌───────────────────────────┐ │
│ │ 1. 定义库目标 add_library() │ │
│ └───────────────┬───────────┘ │
│                 │             │
│ ┌───────────────▼───────────┐ │
│ │ 2. 安装库及头文件          │ │
│ │ install(TARGETS ... EXPORT)│ │
│ └───────────────┬───────────┘ │
│                 │             │
│ ┌───────────────▼───────────┐ │
│ │ 3. 导出目标集 install(EXPORT)││
│ └───────────────┬───────────┘ │
│                 │             │
│ ┌───────────────▼───────────┐ │
│ │ 4. 生成配置文件 MyLibConfig│ │
│ │    方便 find_package 使用  │ │
│ └───────────────────────────┘ │
└───────────────┬───────────────┘
                │
                │ 安装 / 共享 导出文件
                ▼
┌───────────────────────────────┐
│         项目 B (使用项目)       │
│ ┌───────────────────────────┐ │
│ │ 1. find_package(MyLib)     │ │
│ └───────────────┬───────────┘ │
│                 │             │
│ ┌───────────────▼───────────┐ │
│ │ 2. 引入导入目标 MyLib::MyLib││
│ │ target_link_libraries()    │ │
│ └───────────────┬───────────┘ │
│                 │             │
│ ┌───────────────▼───────────┐ │
│ │ 3. 编译链接应用程序         │ │
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

### 6.2 说明

```
项目 A 负责定义和导出库目标，并生成对应的配置文件。
项目 B 通过 find_package 找到导出文件，导入目标，链接使用。
这样保证库的属性和依赖能完整传递。
```

