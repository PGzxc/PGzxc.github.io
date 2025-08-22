---
title: CMake开发之——生成器表达式(3.4)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 8c62d0c1
date: 2025-08-22 08:22:17
---
## 一 概述

```
CMake 生成器表达式是 CMake 在生成构建系统阶段（而不是配置阶段）才会被求值的表达式，
通常用于根据构建配置、目标属性、平台等动态决定编译或链接选项
```

<!--more-->

## 二 基本语法

```
1、语法
 生成器表达式用 $<...> 包裹

2、示例
$<expression>

3、结果
它会在 生成（Generate）阶段 计算，而不是 cmake 配置时计算
```

## 三 常见类型

### 2.1 条件表达式

```
1、语法
$<IF:condition,true_string,false_string>

2、示例
target_compile_definitions(myapp PRIVATE
    $<IF:$<CONFIG:Debug>,DEBUG_MODE,RELEASE_MODE>
)

3、含义
 如果当前是 Debug 配置 → 定义 DEBUG_MODE
 否则 → 定义 RELEASE_MODE
```

### 2.2 比较判断

```
1、语法
$<CONFIG:Debug>     # 当前构建类型是 Debug 时返回 1，否则返回空
$<PLATFORM_ID:Linux> # 当前平台是 Linux 时返回 1
$<C_COMPILER_ID:GNU> # C 编译器是 GCC 时返回 1

2、示例
target_compile_definitions(myapp PRIVATE
    $<$<CONFIG:Debug>:ENABLE_LOGGING>
)

3、含义
只有在 Debug 构建时才定义 ENABLE_LOGGING
```

### 2.3  逻辑运算

```
1、语法
 $<AND:cond1,cond2>
 $<OR:cond1,cond2>
 $<NOT:cond>

2、示例
$<$<AND:$<CXX_COMPILER_ID:GNU>,$<CONFIG:Debug>>:USE_GCC_DEBUG_FLAGS>
```

### 2.4 路径与文件

```
1、语法
 $<TARGET_FILE:target>          # 可执行文件或库的完整路径
 $<TARGET_FILE_DIR:target>      # 目标文件所在目录
 $<TARGET_FILE_NAME:target>     # 文件名
 $<TARGET_PROPERTY:target,prop> # 获取目标属性

2、示例
add_custom_command(TARGET myapp POST_BUILD
    COMMAND echo "Binary is here: $<TARGET_FILE:myapp>"
)
```

### 2.5 列表与字符串

```
$<JOIN:list,sep>    # 用 sep 拼接列表
$<LOWER_CASE:string>
$<UPPER_CASE:string>
```

## 三 典型使用场景

### 3.1 按构建类型添加编译选项

```
target_compile_options(myapp PRIVATE
    $<$<CONFIG:Debug>:-g>
    $<$<CONFIG:Release>:-O3>
)
```

### 3.2 按平台链接库

```
target_link_libraries(myapp PRIVATE
    $<$<PLATFORM_ID:Linux>:pthread>
)
```

### 3.3 区分编译器

```
target_compile_definitions(myapp PRIVATE
    $<$<CXX_COMPILER_ID:MSVC>:USING_MSVC>
    $<$<CXX_COMPILER_ID:GNU>:USING_GCC>
)
```

## 四 使用注意

```
1、只能用于目标属性相关的命令（如 target_compile_options、target_link_libraries 等），
不能随便写在普通 set() 或 if() 中。

2、在 IDE（如 Visual Studio）中很有用，因为它可以让 Debug/Release 等不同配置共存。

3、不要在配置阶段想要得到它的值，因为它那时还没有被计算。
```

## 五 总结

|             表达式              |         作用         |
| :-----------------------------: | :------------------: |
|        $\<CONFIG:Debug>         | 构建类型是否为 Debug |
|      $\<PLATFORM_ID:Linux>      |   平台是否为 Linux   |
|     $\<CXX_COMPILER_ID:GNU>     | C++ 编译器是否是 GCC |
|     $\<TARGET_FILE:target>      |  目标文件的完整路径  |
| $\<TARGET_PROPERTY:target,prop> |     获取目标属性     |
|         $\<IF:cond,a,b>         |       条件选择       |
|   $\<AND:...>` / `$\<OR:...>    |       逻辑运算       |

