---
title: CMake开发之——函数与宏(3.3)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: cdd73064
date: 2025-08-21 07:15:34
---
## 一 概述

```
本文介绍CMake中的函数(function())与宏(macro())
```

<!--more-->

## 二 定义与调用

### 2.1 定义函数

```
1、定义与调用
function(print_info name age)
    message("Name: ${name}, Age: ${age}")
endfunction()

print_info("Alice" 20)

2、输出
Name: Alice, Age: 20
```

### 2.2  定义宏

```
1、定义与调用
macro(print_info name age)
    message("Name: ${name}, Age: ${age}")
endmacro()

print_info("Bob" 25)

2、输出
Name: Bob, Age: 25
```

## 三 参数处理

### 3.1 参数说明

```
ARGV：所有参数列表
ARGC：参数个数
ARGV0、ARGV1...：按索引访问参数
ARGN：未在形参列表中接收的剩余参数
```

### 3.2 示例

```
function(show_args arg1)
    message("Total args: ${ARGC}")
    message("All args: ${ARGV}")
    message("First arg: ${ARGV0}")
    message("Extra args: ${ARGN}")
endfunction()

show_args(apple banana cherry)
```

## 四 作用域区别

### 4.1 区别

|    特性    |              function()              |              macro()               |
| :--------: | :----------------------------------: | :--------------------------------: |
| 变量作用域 | **局部作用域**(默认不会影响外部变量) | **全局作用域**(会直接修改外部变量) |
|  参数处理  |        会先复制一份参数(安全)        |   直接替换文本(类似 C 预处理宏)    |
|  推荐程度  |              ✅ 推荐使用              |             ⚠️ 谨慎使用             |

### 4.2 示例

```
set(VALUE "outside")

function(func_change)
    set(VALUE "inside function")
endfunction()

macro(macro_change)
    set(VALUE "inside macro")
endmacro()

func_change()
message("After function: ${VALUE}")  # outside

macro_change()
message("After macro: ${VALUE}")     # inside macro
```

## 五 提前返回

### 5.1 说明

```
function() 中可用 return() 提前结束
macro() 中也可用，但要注意它会影响全局流程
```

### 5.2 示例

```
function(test_return)
    message("Before return")
    return()
    message("This will not print")
endfunction()
```

## 六 使用场景

```
1、function()：
 推荐大多数情况下使用
 封装逻辑、保持变量作用域隔离
 避免污染全局命名空间

2、macro()：
 少量使用
 适合需要直接操作调用者变量的情况
 例如全局设置编译选项、路径
```

## 七 综合示例

```
cmake_minimum_required(VERSION 3.10)
project(FunctionMacroDemo)

# 定义一个函数
function(add_prefix output_var prefix)
    set(result "")
    foreach(arg IN LISTS ARGN)
        list(APPEND result "${prefix}${arg}")
    endforeach()
    set(${output_var} "${result}" PARENT_SCOPE) # 返回值
endfunction()

# 定义一个宏
macro(add_prefix_macro output_var prefix)
    set(result "")
    foreach(arg IN LISTS ARGN)
        list(APPEND result "${prefix}${arg}")
    endforeach()
    set(${output_var} "${result}")
endmacro()

set(names Alice Bob)
add_prefix(new_names "Ms. " ${names})
message("Function result: ${new_names}") # Ms. Alice;Ms. Bob

add_prefix_macro(new_names_macro "Mr. " ${names})
message("Macro result: ${new_names_macro}") # Mr. Alice;Mr. Bob
```

