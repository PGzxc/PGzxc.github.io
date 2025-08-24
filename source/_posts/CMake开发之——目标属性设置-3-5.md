---
title: CMake开发之——目标属性设置(3.5)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: b827e2a5
date: 2025-08-25 07:21:07
---
## 一 概述

```
本文介绍 CMake 的目标属性设置set_target_properties()，
包括作用、常用属性、示例和注意事项
```

<!--more-->

## 二 作用

```
1、作用
 set_target_properties() 用于批量设置一个或多个目标（Target）的属性，
 这些属性会影响编译、链接、安装等行为。

2、语法
 set_target_properties(<target1> <target2> ...
    PROPERTIES <prop1> <value1>
               <prop2> <value2>
               ...
 )

3、说明
 <target> 可以是可执行文件、静态库、动态库、接口库等
 <prop> 是目标属性名
 <value> 是属性值
```

## 三 常用属性

### 3.1 基本信息

1、说明

|      属性       |                    说明                    |
| :-------------: | :----------------------------------------: |
|   OUTPUT_NAME   |      生成文件的基础名(不含前缀、后缀)      |
|     PREFIX      | 目标文件前缀(默认 `lib`，Windows 通常为空) |
|     SUFFIX      |      目标文件后缀(如 `.exe`, `.dll`)       |
| LINKER_LANGUAGE |         指定链接器语言(C, CXX 等)          |

2、示例

```
set_target_properties(myapp PROPERTIES
    OUTPUT_NAME "CoolApp"
    SUFFIX ".bin"
)
```

### 3.2 编译与链接选项

1、说明

|           属性            |                          说明                          |
| :-----------------------: | :----------------------------------------------------: |
|    COMPILE_DEFINITIONS    | 定义宏（等价于 `add_definitions()`，但仅对该目标生效） |
|      COMPILE_OPTIONS      |                        编译选项                        |
|        LINK_FLAGS         |                       链接器选项                       |
| POSITION_INDEPENDENT_CODE |             生成位置无关代码（`ON`/`OFF`）             |

2、示例

```
set_target_properties(mylib PROPERTIES
    POSITION_INDEPENDENT_CODE ON
    COMPILE_OPTIONS "-Wall;-O2"
)
```

### 3.3 输出路径

1、说明

|            属性             |                         说明                          |
| :-------------------------: | :---------------------------------------------------: |
|  ARCHIVE_OUTPUT_DIRECTORY   |                    静态库输出路径                     |
|  LIBRARY_OUTPUT_DIRECTORY   |                    动态库输出路径                     |
|  RUNTIME_OUTPUT_DIRECTORY   |                  可执行文件输出路径                   |
| *OUTPUT_DIRECTORY*\<CONFIG> | 按构建类型设置（如 `RUNTIME_OUTPUT_DIRECTORY_DEBUG`） |

2、示例

```
set_target_properties(myapp PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin"
    ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib"
)
```

### 3.4 版本信息(库常用)

1、说明

|   属性    |             说明             |
| :-------: | :--------------------------: |
|  VERSION  |           库版本号           |
| SOVERSION | 兼容版本号（通常为主版本号） |

2、示例

```
set_target_properties(mylib PROPERTIES
    VERSION 1.2.3
    SOVERSION 1
)
```

3、在 Linux 下会生成

```
libmylib.so.1.2.3
libmylib.so.1 -> libmylib.so.1.2.3
libmylib.so -> libmylib.so.1
```

## 四 批量设置多个目标属性

```
set_target_properties(app1 app2 app3 PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin"
)
```

## 五 注意事项

```
1、set_target_properties() 会覆盖原值，不是追加。
2、如果要追加编译选项，可以用 target_compile_options() 更安全。
3、属性名区分大小写，但习惯用大写。
4、输出路径设置要注意不同平台差异（Windows .exe / Linux 无后缀）。
5、在 目标创建后 才能设置属性，否则会报错找不到目标。
```

## 六 综合示例

```
cmake_minimum_required(VERSION 3.10)
project(TargetPropertiesDemo)

add_library(mylib SHARED lib.cpp)

set_target_properties(mylib PROPERTIES
    OUTPUT_NAME "coollib"
    VERSION 1.0.0
    SOVERSION 1
    POSITION_INDEPENDENT_CODE ON
    LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/libs"
)

add_executable(myapp main.cpp)
set_target_properties(myapp PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin"
)
target_link_libraries(myapp PRIVATE mylib)
```

