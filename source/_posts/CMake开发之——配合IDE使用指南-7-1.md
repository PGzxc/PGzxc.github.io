---
title: CMake开发之——配合IDE使用指南(7.1)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: ed750177
date: 2025-11-03 08:41:56
---
## 一 概述

```
本文介绍：CMake 配合 CLion、Visual Studio 等 IDE 的开发流程和使用技巧
```

<!--more-->

## 二 什么是 CMake？

```
CMake是一个跨平台的开源构建系统，负责生成本地构建文件(如Makefile,Visual Studio解决方案等)。
它用 CMakeLists.txt 文件描述项目结构和构建规则。
IDE 会调用 CMake，自动识别项目配置，实现代码编写、调试、编译一体化。
```

## 三 CLion 和 CMake

### 3.1 CLion 特点

```
JetBrains 出品的 C++ IDE，原生支持 CMake。
打开项目时，直接加载 CMakeLists.txt，自动生成构建系统。
支持自动补全、代码导航、调试、运行等功能。
```

### 3.2 使用步骤

```
1、打开项目
 直接选择包含 CMakeLists.txt 的目录，CLion 自动识别并解析。

2、配置 CMake 选项
 在 File > Settings > Build, Execution, Deployment > CMake 
 中可以设置 CMake 生成的构建目录、编译类型（Debug/Release）等。
 
 也可传递额外的 CMake 变量。

3、构建和运行
 使用顶部工具栏的绿色运行按钮，CLion 会自动调用 CMake 构建。
 支持断点调试、单元测试集成。

4、修改 CMakeLists.txt 后刷新
 保存后，CLion 会自动重新加载并重新配置项目。
```

## 四 Visual Studio 和 CMake

### 4.1 Visual Studio 特点

```
从 VS 2017 开始，Visual Studio 原生支持 CMake 项目。
支持直接打开包含 CMakeLists.txt 的文件夹，无需创建传统的 .sln 解决方案。
```

### 4.2 使用步骤

```
1、打开文件夹
选择 File > Open > Folder，打开包含 CMakeLists.txt 的目录。

2、自动识别 CMake 项目
Visual Studio 会自动运行 CMake，生成内部的构建系统。

3、配置 CMake
通过 CMake 菜单可选择不同的配置（Debug/Release）。
可以编辑 CMakeSettings.json，配置多目标、多平台编译参数。

4、构建和调试
直接点击运行按钮，执行编译与调试。
支持断点调试、性能分析、静态分析等功能。

5、集成外部工具链
支持交叉编译工具链配置（通过 CMakeSettings.json 或 VS 内置选项）。
```

## 五 两者的异同点

|      特性       |              CLion               |            Visual Studio            |
| :-------------: | :------------------------------: | :---------------------------------: |
| 原生 CMake 支持 |     是，默认使用 CMake 构建      |       是，从 VS 2017 开始支持       |
|  项目打开方式   | 直接打开 CMakeLists.txt 所在目录 |  打开文件夹（包含 CMakeLists.txt）  |
|    配置管理     |  GUI 配置 CMake 参数及环境变量   |       CMakeSettings.json 配置       |
|    调试体验     |       优秀，集成 GDB/LLDB        |       优秀，集成 MSVC 调试器        |
|   跨平台支持    |   强，支持 Windows/Linux/macOS   | 主要针对 Windows，有限的 Linux 支持 |

## 六 常用技巧与建议

```
IDE 生成的构建目录不要纳入版本控制，避免混乱。
CMake 脚本写得清晰，模块化，方便 IDE 自动识别。
复杂项目可以使用 CMakePresets.json 管理多环境构建配置，CLion 和 VS 都支持。
利用 IDE 提供的 CMake GUI 配置面板，快速切换编译选项。
调试信息开启：确保 CMake 配置有 -DCMAKE_BUILD_TYPE=Debug 或等效选项
```

