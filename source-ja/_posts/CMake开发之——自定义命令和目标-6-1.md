---
title: CMake开发之——自定义命令和目标(6.1)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: '97235361'
date: 2025-09-12 08:44:07
---
## 一 概述

```
本文介绍： 
 -CMake 自定义命令(add_custom_command)
 -自定义目标(add_custom_target)
```

<!--more-->

## 二 自定义命令(add_custom_command)

### 2.1 作用

```
给已有的构建流程增加额外命令(比如生成文件、调用脚本等)
```

### 2.2 两种用法

1、生成文件

```
1、CMakeLists.txt
add_custom_command(
    OUTPUT generated.cpp
    COMMAND python ${CMAKE_SOURCE_DIR}/gen.py > generated.cpp
    DEPENDS ${CMAKE_SOURCE_DIR}/gen.py
    COMMENT "Generating source file"
)
add_executable(myapp main.cpp generated.cpp)

2、说明
 OUTPUT：指定生成的文件，必须在其他 target 中使用。
 DEPENDS：依赖的文件或 target，如果它们更新就重新执行。
 COMMAND：执行的命令，可以多个
```

2、构建后执行(POST_BUILD)

```
1、CMakeLists.txt
add_executable(myapp main.cpp)
add_custom_command(
    TARGET myapp
    POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy $<TARGET_FILE:myapp> ${CMAKE_BINARY_DIR}/bin/
    COMMENT "Copying myapp to bin directory"
)

2、TARGET ... POST_BUILD：在指定 target 构建完成后执行
```

## 三 自定义目标(add_custom_target)

### 3.1 作用

```
定义一个不生成二进制文件的目标，通常用来执行任务（如生成文档、打包）
```

### 3.2 示例

```
1、CMakeLists.txt
add_custom_target(run_tests
    COMMAND ctest --verbose
    DEPENDS myapp
    COMMENT "Running tests"
)

2、说明
 没有 OUTPUT，每次执行都会运行命令。
 可用 make run_tests（或 ninja run_tests）手动触发
```

## 四 区别对比

|           特性           |            add_custom_command             |  add_custom_target   |
| :----------------------: | :---------------------------------------: | :------------------: |
|    是否生成二进制文件    |                    否                     |          否          |
|     是否产生文件输出     |          **是**（可指定 OUTPUT）          |          否          |
| 是否可被其他 target 依赖 | 是（通过 DEPENDS 或直接引入 OUTPUT 文件） |    是（DEPENDS）     |
|       是否手动执行       |              否（依赖触发）               |   是（手动 make）    |
|         常见用途         |       生成源码、拷贝资源、调用脚本        | 打包、生成文档、清理 |

## 五 常用小技巧

### 5.1 组合使用

```
1、说明
用 add_custom_command 生成文件，再用 add_custom_target 包装成手动执行任务

2、示例
add_custom_command(
    OUTPUT generated.cpp
    COMMAND python gen.py > generated.cpp
    DEPENDS gen.py
)
add_custom_target(generate_code DEPENDS generated.cpp)
```

### 5.2 跨平台命令

```
1、用 ${CMAKE_COMMAND} -E 执行跨平台操作

2、示例
COMMAND ${CMAKE_COMMAND} -E copy file1.txt file2.txt
COMMAND ${CMAKE_COMMAND} -E remove file2.txt
```

### 5.3 避免不必要的重复执行

```
如果是文件生成，一定要用 OUTPUT + DEPENDS

如果只是任务，add_custom_target 是更合适的。
```

## 六 工作流程图

### 6.1 流程图

```
                     ┌───────────────────────┐
                     │      CMake 构建流程     │
                     └──────────┬────────────┘
                                │
                                ▼
                  ┌───────────────────────────────┐
                  │        add_custom_command      │
                  │ ┌───────────────────────────┐ │
                  │ │定义生成文件或构建后命令    │ │
                  │ └────────────┬──────────────┘ │
                  │              │                │
         ┌────────┴───┐    ┌─────▼─────┐      ┌───▼───────┐
         │ 依赖触发    │    │ 生成 OUTPUT│      │ POST_BUILD │
         │(DEPENDS/文件)│   │ 文件       │      │命令执行    │
         └─────────────┘    └───────────┘      └───────────┘
                │                    │                │
                ▼                    ▼                ▼
    ┌───────────────────┐   ┌───────────────────┐  ┌──────────────┐
    │ 如果 OUTPUT 被目标 │   │ 源码生成后可作为   │  │ 目标构建完成 │
    │ 依赖，则触发执行  │   │ 目标的输入文件     │  │ 后自动执行命令│
    └───────────────────┘   └───────────────────┘  └──────────────┘

                                ▲
                                │
                ┌───────────────┴───────────────┐
                │          add_custom_target     │
                │ ┌───────────────────────────┐ │
                │ │ 定义无文件生成的自定义任务  │ │
                │ │ 可手动调用或被其他目标依赖  │ │
                │ └────────────┬──────────────┘ │
                │              │                │
          ┌─────┴─────┐   ┌────▼─────┐      ┌───▼──────────┐
          │ 手动执行  │   │ 作为依赖 │      │ 运行命令     │
          │ (make xxx)│   │ 触发     │      │ (如测试、打包)│
          └───────────┘   └──────────┘      └─────────────┘
```

### 6.2 说明

```
add_custom_command 通常用于生成文件或目标构建后执行命令，执行由依赖关系自动触发。

add_custom_target 定义一个“虚拟”目标，没有产物文件，可被手动调用或作为其他目标的依赖执行。

两者可以组合用来实现复杂自定义构建逻辑。
```

