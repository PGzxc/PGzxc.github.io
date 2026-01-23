---
title: Cmake开发之——CMake与Make/Ninja/MSBuild的关系(1.3)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - 学习路线
abbrlink: 92e9c790
date: 2025-08-13 07:08:38
---
## 一 概述

```
本文简单系统梳理一下 CMake 与 Make / Ninja / MSBuild 的关系，
顺便解释它们在开发流程中的分工和协作原理
```

<!--more-->

## 二 核心概念对比

|  工具   |        类型        |                             作用                             |          主要使用场景          |
| :-----: | :----------------: | :----------------------------------------------------------: | :----------------------------: |
|  CMake  |   构建系统生成器   | 读取 `CMakeLists.txt` → 生成平台和编译器对应的构建文件（Makefile / build.ninja / .sln 等） |  跨平台项目构建、统一管理依赖  |
|  Make   | 构建工具（执行器） |           按 Makefile 中的规则执行编译、链接等任务           |     Linux / Unix 环境常用      |
|  Ninja  |   高性能构建工具   |       类似 Make，但速度更快、并行能力更强、语法更简单        | 大型项目、需要高并行构建的场景 |
| MSBuild | 构建工具（执行器） | 按 Visual Studio 解决方案（.sln）或项目文件（.vcxproj）进行构建 |  Windows / Visual Studio 工程  |

## 三 CMake 与构建工具的关系

### 3.1 一句话概括

```
CMake 只是“翻译官”，Make / Ninja / MSBuild 才是干活的工人
```

### 3.2 流程如下

```
CMakeLists.txt (你的构建规则)
          ↓  CMake 解析和配置
   ┌───────────────────────┐
   │   Makefile (给 Make)   │
   │   build.ninja (给 Ninja)│
   │   .sln / .vcxproj (给 MSBuild) │
   └───────────────────────┘
          ↓
构建工具执行：make / ninja / msbuild
          ↓
编译、链接，生成可执行文件 / 库文件
```

## 四 具体关系示例

### 4.1 CMake + Make

```
1、指令
 cmake -G "Unix Makefiles" ..
 make

2、说明
 cmake 生成 Makefile
 make 读取 Makefile 执行编译
```

### 4.2 CMake + Ninja

```
1、指令
 cmake -G "Ninja" ..
 ninja

2、说明
 cmake 生成 build.ninja
 ninja 按规则执行构建
 优点：速度快，适合 CI/CD、大型项目
```

### 4.3  CMake + MSBuild

```
1、指令
 cmake -G "Visual Studio 17 2022" ..
 cmake --build . --config Release
 
2、说明
 cmake 生成 .sln 和 .vcxproj
 cmake --build 内部会调用 msbuild
 或直接用 Visual Studio 打开 .sln
```

## 五 为什么 CMake 要配合这些工具？

```
CMake不直接编译：它的任务是生成能被目标构建工具理解的“脚本”。

跨平台：用一个 CMakeLists.txt 可以生成不同系统和 IDE 的构建文件。

解耦：你可以轻松切换构建工具，比如在 Linux 下用 Ninja，加速编译；在 Windows 下用 MSBuild。
```

## 六 对应类比

|          角色           |                         类比                         |
| :---------------------: | :--------------------------------------------------: |
|          CMake          | 建筑设计师 → 画出蓝图(Makefile / build.ninja / .sln) |
| Make / Ninja / MSBuild  |          建筑施工队 → 按蓝图实际施工(编译)           |
| 编译器 (gcc/clang/msvc) |       施工工具 → 实际“砌砖”（生成二进制文件）        |

## 七 `cmake --build` 的便利性

```
1、说明
-你不需要记住 make / ninja / msbuild 命令差异
-CMake 会自动调用当前生成器对应的构建工具

2、例如：cmake --build .
 -如果生成器是 Makefiles → 调用 make
 -如果是 Ninja → 调用 ninja
 -如果是 Visual Studio → 调用 msbuild
```

## 八 CMake 与 Make / Ninja / MSBuild 关系流程图

```
         ┌────────────────────────────────────────────┐
         │                CMake (生成器)               │
         │  读取 CMakeLists.txt，解析构建规则           │
         └────────────────────────────────────────────┘
                              │
                              ▼
              ┌─────────────────────────────────┐
              │  生成平台/工具对应的构建文件      │
              │  (根据 -G 指定的生成器)           │
              └─────────────────────────────────┘
       ┌────────────────────┬─────────────────────┬────────────────────┐
       ▼                    ▼                     ▼
┌──────────────┐     ┌──────────────┐       ┌──────────────────┐
│ Makefile     │     │ build.ninja  │       │ .sln / .vcxproj   │
│ (给 Make)    │     │ (给 Ninja)   │       │ (给 MSBuild / VS) │
└──────────────┘     └──────────────┘       └──────────────────┘
       │                    │                     │
       ▼                    ▼                     ▼
┌──────────────┐     ┌──────────────┐       ┌──────────────────┐
│ make         │     │ ninja        │       │ msbuild / VS IDE  │
│ (构建执行器) │     │ (构建执行器) │       │ (构建执行器)      │
└──────────────┘     └──────────────┘       └──────────────────┘
       │                    │                     │
       ▼                    ▼                     ▼
   调用编译器           调用编译器              调用编译器
 (gcc / clang /       (gcc / clang /           (MSVC / clang-cl)
   msvc 等)             msvc 等)               
       │                    │                     │
       ▼                    ▼                     ▼
  ┌───────────────────────────────────────────────────┐
  │             生成可执行文件 / 库文件等产物           │
  └───────────────────────────────────────────────────┘
```

