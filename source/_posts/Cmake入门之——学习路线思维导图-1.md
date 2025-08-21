---
title: Cmake入门之——学习路线思维导图(1)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: c95e3c61
date: 2025-08-12 11:55:37
---
## 一 概述

```
这是一份适合初学者到进阶的 CMake学习路线思维导图 的结构，方便你系统地掌握CMake
```

<!--more-->

## 二 CMake学习路线思维导图

### 2.1 CMake基础

```
1、什么是CMake
2、CMake工作原理
3、CMake与Make/ Ninja/ MSBuild的关系
4、CMake安装与环境配置
5、基本命令介绍（cmake、cmake --build、cmake --install等）
```

### 2.2 CMake项目入门

```
1、创建CMakeLists.txt文件
2、最简单的示例：生成可执行文件
3、变量与缓存变量
4、目录结构与源码组织
5、基本指令介绍
 project()
 add_executable()
 add_library()
 target_link_libraries()
 include_directories()
```

### 2.3 CMake进阶

```
1、条件判断（if, else, elseif）
2、循环（foreach, while）
3、函数与宏（function(), macro()）
4、生成器表达式
5、目标属性设置（set_target_properties）
6、配置文件与安装（install）
```

### 2.4 多平台、多构建类型支持

```
1、Debug/Release配置
2、交叉编译基础
3、多平台条件判断
4、多构建系统支持
```

### 2.5 外部依赖管理

```
1、find_package() 使用
2、自定义FindXXX模块
3、ExternalProject_Add
4、包管理器集成（Conan, vcpkg）
```

### 2.6 CMake高级特性

```
1、自定义命令和目标（add_custom_command, add_custom_target）
2、CTest测试框架
3、使用CPack打包
4、配置头文件生成（configure_file）
5、导出与导入目标（export, import）
6、预编译头文件支持
```

### 2.7 CMake与IDE集成

```
1、使用CLion、Visual Studio等IDE
2、调试与构建配置
3、多配置环境支持
```

### 2.8 实战项目案例

```
1、简单C++项目配置
2、多库多模块项目结构
3、使用Conan集成第三方库
4、交叉编译项目实例
5、测试和打包示例
```

