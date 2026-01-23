---
title: Cmake自学之——变量(8)
categories:
  - 开发
  - T-构建
  - Cmake
  - 自学
tags:
  - Cmake
abbrlink: 29c90498
date: 2020-01-20 21:31:01
---
## 一 概述

本文主要介绍Cmake变量相关的知识点(目录)：  
* 变量介绍及使用
* 自带的变量
* 自定义变量，
* 清除设置的变量
* 总结

<!--more-->

## 二 什么是变量及变量的引用

### 2.1 什么是Cmake变量

* Cmake变量分为系统自变量和自定义变量
* 系统变量是Cmake中定义好，用于获取编译时信息(如项目代码位置等)
* 自定义变量，用于设置或获取用于自行定义的变量

### 2.2 [变量的引用方式][1]

* 在引用参数和非引用参数中使用，它的引用形式是`${<variable>}`
* 引用参数：引用的参数包含开始和结束双引号字符之间的内容(如“${variable}”)
* 非引用参数：未引用的参数不包含任何引用语法。它可能不包含任何空格、(、)、#、"或\，除非通过反斜杠转义

## 三 [Cmake自带变量][2]

### 3.1 提供信息变量(常用)

* 项目编译目录

  ```
  CMAKE_BINARY_DIR——项目根目录/cmake-build-debug
  CMAKE_CACHEFILE_DIR——项目根目录/cmake-build-debug
  CMAKE_CURRENT_BINARY_DIR——项目根目录/cmake-build-debug
  PROJECT_BINARY_DIR——项目根目录/cmake-build-debug*
  ```

* 项目根目录

  ```
  CMAKE_CURRENT_LIST_DIR——项目根目录
  CMAKE_CURRENT_SOURCE_DIR——项目根目录
  PROJECT_SOURCE_DIR——项目根目录
  CMAKE_SOURCE_DIR——项目根目录
  ```

* Cmake编译相关

  ```
  CMAKE_CURRENT_LIST_FILE——Cmake文件中的文件名
  CMAKE_CURRENT_LIST_LINE——Cmake文件中的行数
  ```
  
* Cmake使用示例(CMakeLists.txt)

  ```
  #binary_dir
  message(WARNING "${CMAKE_BINARY_DIR}")
  
  #cachefile
  message(WARNING "${CMAKE_CACHEFILE_DIR}")
  
  #current
  message(WARNING "${CMAKE_CURRENT_BINARY_DIR}")
  message(WARNING "${CMAKE_CURRENT_LIST_DIR}")
  message(WARNING "${CMAKE_CURRENT_LIST_FILE}")
  message(WARNING "${CMAKE_CURRENT_LIST_LINE}")
  message(WARNING "${CMAKE_CURRENT_SOURCE_DIR}")
  
  #project
  message(WARNING ${PROJECT_NAME})
  message(WARNING ${PROJECT_BINARY_DIR})
  message(WARNING ${PROJECT_SOURCE_DIR})
  
  #source
  message(WARNING ${CMAKE_SOURCE_DIR})
  ```

### 3.2 改变行为的变量(开关选项)(CMAKE_BUILD_TYP为例)

* CMAKE_BUILD_TYPE默认为Debug

* 通过set方法改变CMAKE_BUILD_TYPE的编译类型(如Release)

  ```
  message(WARNING ${CMAKE_BUILD_TYPE})
  if(“Debug” STREQUAL “${CMAKE_BUILD_TYPE}”)
      message(WARNING "Debug")
  else()
      message(WARNING "Release")
  endif ()
  set(CMAKE_BUILD_TYPE "Release")
  if(“Debug” STREQUAL “${CMAKE_BUILD_TYPE}”)
      message(WARNING "Debug")
  else()
      message(WARNING "Release")
  endif ()
  ```

* 通过CMAKE的编译类型，执行相应的方法

  ```
  CMake Warning at CMakeLists.txt:26 (message):
    Debug
  CMake Warning at CMakeLists.txt:28 (message):
    Debug
  CMake Warning at CMakeLists.txt:36 (message):
    Release
  ```
### 3.3 描述系统的变量

* 当前Cmake项目的编译环境(如Windows,ANDROID,APPLE)

  ```
  message(WARNING ${CMAKE_SYSTEM_NAME})
  message(WARNING ${CMAKE_SYSTEM_VERSION})
  set(CMAKE_SYSTEM_NAME  ANDROID)
  message(WARNING ${CMAKE_SYSTEM_NAME})
  ```

* 在windows Clion中执行上述方法输出信息

  ```
  CMake Warning at CMakeLists.txt:38 (message):
    Windows
  CMake Warning at CMakeLists.txt:39 (message):
    6.1.7601
  CMake Warning at CMakeLists.txt:41 (message):
    ANDROID
  ```

### 3.4 控制构建的变量

* 设置构建过程中的各个变量

  ```
  set(CMAKE_SYSTEM_NAME Android)
  set(CMAKE_SYSTEM_VERSION 21) # API level
  set(CMAKE_ANDROID_ARCH_ABI arm64-v8a)
  set(MinGW D:\\SoftWare\\Dev-Cpp\\MinGW64)
  set(CMAKE_ANDROID_NDK  D:\\SoftWare\\android-ndk-r15c)
  set(CMAKE_ANDROID_STL_TYPE gnustl_static)
  ```
### 3.5 [语言变量][3]

语言变量中的\<LANG\>是指：  

* C
* CXX(c++)
* Fortran
* CUDA

### 3.6 测试相关变量

* 全部以CTEST开头
* 与测试执行相关

### 3.7 CPack(包变量)

* 全部以CPack开头
* 与打包操作相关

### 3.8 扩展操作变量

* CACHE：缓存变量(参见set和unset方法)
* ENV：环境变量(参见set和unset方法)

### 3.9 内部变量

* 一些作为普通变量使用
* 有些无证可查的，一些不推荐使用

## 四  自定义变量

* 自定义变量是指通过set方法定义的变量
* 获取自定义变量的取值通过set方法中的变量名${variable}来获取

## 五 清除已经设置的变量

* 清除系统设置的或者用户自定义的变量值，通过unset方法来设置
* 在unset方法中，通过unset(variable)方法来清除已经设置或的变量名
* 或者通过set方法，在value值处，不设置值set(variable "")

## 六 总结

* 变量就是用于保存值的存储单元
* 使用 ${} 进行变量的引用

## 七 参考

* [Documentation>cmake-variables(7)][4]



[1]:https://cmake.org/cmake/help/v3.16/command/if.html
[2]:https://cmake.org/cmake/help/v3.16/manual/cmake-variables.7.html#variables-that-describe-the-system
[3]:https://cmake.org/cmake/help/v3.16/prop_tgt/LANG_COMPILER_LAUNCHER.html?highlight=cuda
[4]:https://cmake.org/cmake/help/v3.16/manual/cmake-variables.7.html