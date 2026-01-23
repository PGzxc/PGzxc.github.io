---
title: CMake开发之——自定义FindXXX模块(5.2)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 7da81cfa
date: 2025-09-09 09:01:41
---
## 一 概述

```
本文介绍： 自定义FindXXX.cmake模块的编写方法和注意事项
```

<!--more-->

## 二 适用场景

```
依赖库不是用 CMake 构建的，没有自带 <PackageName>Config.cmake。
依赖库是系统库，但 CMake 没有提供内置的 Find<Package>.cmake。
想自定义查找逻辑（例如跨平台差异处理）。
```

## 三 基本命名规则

```
1、规则
文件命名：Find<PackageName>.cmake
放在你的项目目录的 cmake/ 或类似文件夹中。

2、在 CMakeLists.txt 中添加：
set(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")
find_package(Foo REQUIRED)

3、这样 CMake 会在 cmake/ 目录中优先查找
```

## 四 基本结构

```
# FindFoo.cmake

# 查找头文件路径
find_path(FOO_INCLUDE_DIR
    NAMES foo.h
    PATHS /usr/local/include /opt/foo/include
)

# 查找库文件
find_library(FOO_LIBRARY
    NAMES foo
    PATHS /usr/local/lib /opt/foo/lib
)

# 判断是否找到
include(FindPackageHandleStandardArgs)
find_package_handle_standard_args(Foo
    REQUIRED_VARS FOO_LIBRARY FOO_INCLUDE_DIR
    VERSION_VAR FOO_VERSION
)

# 设置变量（旧方式）
if(FOO_FOUND)
    set(FOO_LIBRARIES ${FOO_LIBRARY})
    set(FOO_INCLUDE_DIRS ${FOO_INCLUDE_DIR})
endif()

# 定义导入目标（现代方式）
if(FOO_FOUND AND NOT TARGET Foo::Foo)
    add_library(Foo::Foo UNKNOWN IMPORTED)
    set_target_properties(Foo::Foo PROPERTIES
        IMPORTED_LOCATION ${FOO_LIBRARY}
        INTERFACE_INCLUDE_DIRECTORIES ${FOO_INCLUDE_DIR}
    )
endif()
```

## 五 常用查找命令

```
find_path() → 查找头文件目录
find_library() → 查找库文件路径
find_program() → 查找可执行程序路径
find_file() → 查找任意文件
find_package_handle_standard_args() → 处理 REQUIRED / QUIET 参数，生成 <PkgName>_FOUND 变量
```

## 六 现代 CMake 建议

### 6.1 写法

```
1、以前的写法
include_directories(${FOO_INCLUDE_DIRS})
target_link_libraries(my_app PRIVATE ${FOO_LIBRARIES})

2、现代 CMake 推荐
find_package(Foo REQUIRED)
target_link_libraries(my_app PRIVATE Foo::Foo)
```

### 6.2 好处

```
自动处理头文件路径
依赖关系更清晰
方便 IDE 跳转
```

## 七 版本查找支持

```
1、如果库支持版本文件，可以
find_package_handle_standard_args(Foo
    REQUIRED_VARS FOO_LIBRARY FOO_INCLUDE_DIR
    VERSION_VAR FOO_VERSION
)

2、这样 find_package(Foo 1.2 REQUIRED) 就能自动验证版本
```

## 八 使用示例

### 8.1 项目结构

```
MyProject/
│── cmake/
│   └── FindFoo.cmake
│── CMakeLists.txt
└── main.cpp
```

### 8.2 CMakeLists.txt

```
cmake_minimum_required(VERSION 3.15)
project(TestFindFoo)

set(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")
find_package(Foo REQUIRED)

add_executable(main main.cpp)
target_link_libraries(main PRIVATE Foo::Foo)
```

## 九 常见坑

```
1、变量名不一致
模块中的变量要和包名保持一致（FOO_INCLUDE_DIR / FOO_LIBRARY / FOO_LIBRARIES）。

2、路径不全
如果不设置 PATHS 或 HINTS，CMake 可能找不到库。

3、跨平台问题
Windows 可能是 .lib，Linux 是 .so，macOS 是 .dylib，需要 find_library() 自动适配。

4、忽略导入目标
如果不用 add_library(... IMPORTED)，以后迁移到现代 CMake 会很麻烦。
```

