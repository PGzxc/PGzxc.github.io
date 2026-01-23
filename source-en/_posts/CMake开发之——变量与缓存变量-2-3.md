---
title: CMake开发之——变量与缓存变量(2.3)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 6dcd41b6
date: 2025-08-18 07:16:42
---
## 一 概述

```
本文介绍CMake 中的变量与缓存变量，能知道它们的作用范围、生命周期和常见用法
```

<!--more-->

## 二 普通变量(普通作用域变量)

### 2.1 定义与作用范围

```
1、设置
set(MY_VAR "hello")

2、说明
-只在当前作用域（当前 CMakeLists.txt 或函数）可见。
-子目录（add_subdirectory）会继承父目录的普通变量，
但如果子目录重新设置同名变量，会覆盖本地作用域的值，不影响父目录
```

### 2.2 示例

```
set(PROJECT_NAME "Demo")
message("Project name: ${PROJECT_NAME}")  # 输出 Project name: Demo
```

## 三 缓存变量(Cache Variables)

### 3.1 定义

```
1、设置
set(MY_VAR "hello" CACHE STRING "A cached variable")

2、说明
 存储在 CMakeCache.txt 文件中（位于构建目录）。
 适合保存跨 CMake 运行持久化的值。
 通常用来配置选项、路径、编译选项等。

3、可以在命令行用 -D 覆盖：
cmake -S . -B build -DMY_VAR="world"
```

### 3.2 常用类型

```
STRING：字符串
BOOL：布尔值（ON / OFF）
PATH：路径
FILEPATH：文件路径
INTERNAL：内部缓存，不显示给用户（调试用）
```

## 四 普通变量 vs 缓存变量 对比表

|   特性   |          普通变量          |                缓存变量                 |
| :------: | :------------------------: | :-------------------------------------: |
| 生命周期 | 仅当前 CMake 配置运行有效  |        跨多次 `cmake` 运行持久化        |
| 存储位置 |            内存            |          `CMakeCache.txt` 文件          |
| 作用范围 | 当前作用域(可继承到子目录) |        全局可见(所有目录可访问)         |
| 修改方式 |           set()            | `set(... CACHE ...)` 或 `-D` 命令行参数 |
| 常用用途 |   临时计算结果、局部变量   |    用户可配置选项、路径、编译参数等     |

## 五 常见命令

### 5.1 定义缓存变量

```
set(MY_PATH "/usr/local" CACHE PATH "Installation path")
```

### 5.2 修改缓存变量(即使已存在)

```
set(MY_PATH "/opt/custom" CACHE PATH "Installation path" FORCE)
```

### 5.3 删除缓存变量

```
cmake -U MY_PATH .

或直接删除 CMakeCache.txt
```

## 六 使用场景示例

### 6.1 编译选项开关

```
1、示例
option(ENABLE_FEATURE "Enable special feature" ON)

if(ENABLE_FEATURE)
    message("Feature enabled")
else()
    message("Feature disabled")
endif()


2、调用
cmake -S . -B build -DENABLE_FEATURE=OFF
```

### 6.2 安装路径

```
1、CMakeLists.txt中
set(INSTALL_PREFIX "/usr/local" CACHE PATH "Install directory")

2、指令
cmake -S . -B build -DINSTALL_PREFIX=/opt/app
```

