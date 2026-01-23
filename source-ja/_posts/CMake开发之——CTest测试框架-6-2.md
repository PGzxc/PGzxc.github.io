---
title: CMake开发之——CTest测试框架(6.2)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: f416afbe
date: 2025-09-19 08:10:17
---
## 一 概述

```
本文介绍： 
 - CTest 测试框架 的系统介绍
 - 包括基本概念、集成方式、常用命令及示例
```

<!--more-->

## 二 什么是 CTest？

```
CTest 是 CMake 自带的测试驱动程序，用于执行和管理测试用例。
它负责调用测试程序，收集测试结果，支持多种报告格式。
适合单元测试、集成测试等多种测试场景。
```

## 三 步骤

### 3.1 如何启用测试支持？

```
在项目根 CMakeLists.txt 中添加
enable_testing()
```

### 3.2 添加测试用例

```
1、使用 add_test() 命令将测试程序注册给 CTest
add_executable(my_test test.cpp)
target_link_libraries(my_test PRIVATE mylib)

add_test(NAME MyTest COMMAND my_test)

2、说明
NAME：测试名字
COMMAND：执行测试的可执行文件和参数
```

## 四 常用 CTest 命令行

### 4.1 运行全部测试

```
ctest
```

### 4.2 运行测试并显示详细输出

```
ctest --verbose
```

### 4.3 运行指定测试

```
ctest -R MyTest
```

### 4.4 并行执行测试(加快执行速度)

```
ctest -j4
```

## 五 高级用法

### 5.1 设置测试环境变量

```
set_tests_properties(MyTest PROPERTIES
    ENVIRONMENT "VAR1=value1;VAR2=value2"
)
```

### 5.2 设定测试通过条件(超时、失败时重试等)

```
set_tests_properties(MyTest PROPERTIES
    TIMEOUT 30   # 30秒超时
)
```

### 5.3 使用测试驱动框架

```
可配合 GoogleTest、Catch2 等单元测试框架，执行其测试可执行文件。
通过 add_test() 调用这些框架的测试二进制即可
```

## 六 示例(GoogleTest集成)

```
1、说明
假设你用 GoogleTest 写了测试

2、示例
enable_testing()

add_subdirectory(googletest)   # 假设源码目录
add_executable(my_gtest test.cpp)
target_link_libraries(my_gtest gtest_main)

add_test(NAME MyGTest COMMAND my_gtest)
```

## 七 测试报告生成

```
1、说明
生成 XML 报告方便 CI 集成：

2、指令
ctest -T Test --output-junit test_results.xml
```

## 八 小结

|    关键点    |                说明                |
| :----------: | :--------------------------------: |
|   启用测试   |          enable_testing()          |
|   添加测试   | add_test(NAME \<name> COMMAND ...) |
|   运行测试   |           命令行 `ctest`           |
| 配置测试属性 |       set_tests_properties()       |
| 支持测试框架 |  GoogleTest、Catch2、Boost.Test等  |

## 九 测试流程图

### 9.1 流程图

```
┌─────────────────────────────┐
│        编写测试代码          │
│  (如使用 GoogleTest, Catch2) │
└───────────────┬─────────────┘
                │
                ▼
┌─────────────────────────────┐
│    CMakeLists.txt 配置       │
│ ┌─────────────────────────┐ │
│ │ enable_testing()         │ │
│ │ add_executable(test ...) │ │
│ │ target_link_libraries()  │ │
│ │ add_test(NAME cmd ...)   │ │
│ └───────────────┬─────────┘ │
└────────────────┬────────────┘
                 │
                 ▼
┌─────────────────────────────┐
│       CMake 编译项目         │
│ ┌─────────────────────────┐ │
│ │ 生成测试可执行文件       │ │
│ └───────────────┬─────────┘ │
└────────────────┬────────────┘
                 │
                 ▼
┌─────────────────────────────┐
│          执行测试            │
│ ┌─────────────────────────┐ │
│ │    使用命令行 ctest      │ │
│ │    (ctest, ctest -V)     │ │
│ └───────────────┬─────────┘ │
└────────────────┬────────────┘
                 │
                 ▼
┌─────────────────────────────┐
│        测试結果输出与报告     │
│ ┌─────────────────────────┐ │
│ │ 控制台输出测试详情       │ │
│ │ 生成 XML 报告（--output-junit）│ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### 9.2 流程要点

```
先写测试代码，使用任意支持的测试框架。
CMake 启用测试，添加测试 target 与 add_test()。
CMake 编译生成测试可执行文件。
用 ctest 命令行执行测试，支持多重参数。
可以生成 XML 报告，方便 CI 集成。
```

