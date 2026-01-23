---
title: CMake开发之——条件判断(3.1)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 1976805d
date: 2025-08-20 08:26:37
---
## 一 概述

```
本文介绍CMake 的条件判断：if/else/elseif
```

<!--more-->

## 二 基本语法

### 2.1 语法

```
if(<condition>)
    # 条件为真时执行
elseif(<condition>)
    # 上一个条件不成立，这里成立时执行
else()
    # 前面都不成立时执行
endif()
```

### 2.2 说明

```
必须用 endif() 结束
elseif 可以有多个，else 可选
```

## 三 常见条件类型

### 3.1 变量判断

```
1、示例
set(MY_VAR ON)

if(MY_VAR)  # 变量为非空或 TRUE、ON、YES、Y 时为真
    message("MY_VAR is set")
endif()

2、说明
CMake 中 if(MY_VAR) 等价于 if("${MY_VAR}")
```

### 3.2 字符串比较

```
1、示例
set(MODE "Debug")

if(MODE STREQUAL "Debug")
    message("Debug mode")
elseif(MODE STREQUAL "Release")
    message("Release mode")
else()
    message("Other mode")
endif()

2、常用比较操作
 STREQUAL / STRGREATER / STRLESS
 大小写不敏感版本：STREQUAL_IGNORE_CASE 等（新版本支持）
```

### 3.3 数值比较

```
1、示例
set(VERSION_NUM 5)

if(VERSION_NUM GREATER 3)
    message("Version is greater than 3")
endif()

2、常用操作：
 EQUAL
 GREATER
 LESS
 GREATER_EQUAL
 LESS_EQUAL
```

### 3.4 逻辑运算

```
1、示例
if((A AND B) OR (NOT C))
    message("Condition met")
endif()

2、说明
 AND / OR / NOT
 条件可以用括号分组
```

### 3.5 文件/路径判断

```
if(EXISTS "/path/to/file.txt")
    message("File exists")
endif()

if(IS_DIRECTORY "/path/to/dir")
    message("This is a directory")
endif()
```

### 3.6 目标/命令存在性

```
if(TARGET MyLib)
    message("Target MyLib exists")
endif()

if(COMMAND my_custom_function)
    message("Command exists")
endif()
```

## 四 实战示例

```
cmake_minimum_required(VERSION 3.10)
project(IfDemo)

set(BUILD_MODE "Debug")
set(ENABLE_FEATURE ON)

if(BUILD_MODE STREQUAL "Debug" AND ENABLE_FEATURE)
    message("Building in Debug mode with feature enabled")
elseif(BUILD_MODE STREQUAL "Release")
    message("Building in Release mode")
else()
    message("Unknown build mode")
endif()
```

