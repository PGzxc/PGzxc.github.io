---
title: Android开发之——Android.mk和Application.mk
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: fa93a2a1
date: 2025-08-16 13:06:43
---
## 一 概述

```
在 Android NDK 的 ndk-build 构建系统中，
Android.mk 和 Application.mk 是两个非常重要的配置文件。

虽然现在官方更推荐用 CMake，但很多老项目和第三方库(如 FFmpeg、老版本 OpenCV)依然用它们
```

<!--more-->

## 二 Android.mk — 模块构建脚本

### 2.1 作用

```
告诉 ndk-build：
 要编译哪些源文件
 生成什么类型的模块（动态库 .so / 静态库 .a / 可执行文件）
 模块之间的依赖关系
```

### 2.2 基本结构

```
# 当前目录路径
LOCAL_PATH := $(call my-dir)

# 清空变量，防止影响其他模块
include $(CLEAR_VARS)

# 模块名称（生成文件会是 libmylib.so）
LOCAL_MODULE := mylib

# 要编译的源文件
LOCAL_SRC_FILES := mylib.c utils.c

# 编译参数
LOCAL_CFLAGS := -DDEBUG

# 链接的系统库（例如 log 日志库）
LOCAL_LDLIBS := -llog

# 链接的其他动态库
LOCAL_SHARED_LIBRARIES := libshared

# 链接的静态库
LOCAL_STATIC_LIBRARIES := libstatic

# 指定生成动态库
include $(BUILD_SHARED_LIBRARY)

# 如果要生成静态库
# include $(BUILD_STATIC_LIBRARY)

# 如果要生成可执行文件
# include $(BUILD_EXECUTABLE)
```

### 2.3 常用变量

|         变量名         |           作用            |
| :--------------------: | :-----------------------: |
|      LOCAL_MODULE      | 模块名称(不带 `lib` 前缀) |
|    LOCAL_SRC_FILES     |        源文件列表         |
|      LOCAL_CFLAGS      |       C 编译器参数        |
|     LOCAL_CPPFLAGS     |      C++ 编译器参数       |
|      LOCAL_LDLIBS      |        链接系统库         |
| LOCAL_SHARED_LIBRARIES |       依赖的动态库        |
| LOCAL_STATIC_LIBRARIES |       依赖的静态库        |

## 三 Application.mk — 应用级全局构建配置

### 3.1 作用

```
定义全局编译规则，影响整个工程中所有模块的构建。
```

### 3.2 常用配置

```
# 目标 ABI（可多个）
APP_ABI := armeabi-v7a arm64-v8a x86 x86_64

# C++ 标准库类型
APP_STL := c++_static   # 或 c++_shared

# 编译模式
APP_OPTIM := release    # 或 debug

# 最低支持的 Android 平台版本
APP_PLATFORM := android-21

# C++ 编译选项
APP_CPPFLAGS := -std=c++17 -frtti -fexceptions
```

### 3.3 常用变量

|    变量名    |              作用               |
| :----------: | :-----------------------------: |
|   APP_ABI    |          目标 CPU 架构          |
| APP_PLATFORM |   最低支持的 Android API 版本   |
|   APP_STL    |         C++ 标准库选择          |
|  APP_OPTIM   | 编译优化级别(`release`/`debug`) |
| APP_CPPFLAGS |        全局 C++ 编译参数        |

## 四 构建流程示例

### 4.1 目录结构

```
project/
 ├── jni/
 │    ├── Android.mk
 │    ├── Application.mk
 │    ├── mylib.c
 │    └── utils.c
 └── obj/
```

### 4.2 运行构建命令

```
ndk-build NDK_PROJECT_PATH=. APP_BUILD_SCRIPT=./jni/Android.mk
```

### 4.3 执行后

```
中间文件 .o 存放在 obj/
最终生成的 .so 文件存放在 libs/<ABI>/
```

## 五 使用示例

### 5.1 Application.mk

```
APP_ABI := armeabi-v7a arm64-v8a
APP_PLATFORM := android-21
APP_STL := c++_static
APP_CPPFLAGS := -std=c++17 -frtti -fexceptions
```

### 5.2 Android.mk

```
LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)

LOCAL_MODULE := mylib
LOCAL_SRC_FILES := mylib.cpp utils.cpp
LOCAL_CFLAGS := -DDEBUG
LOCAL_LDLIBS := -llog

include $(BUILD_SHARED_LIBRARY)
```

## 六 适用场景

```
老项目维护（改成 CMake 成本太高）
第三方库集成（官方只提供 ndk-build 脚本）
快速 Demo 测试（配置简单，构建快）
```

## 七 官方文档

```
1、NDK—Build官方指南：
https://developer.android.google.cn/ndk/guides/ndk-build?hl=zh-cn

2、Android.mk官方语法
https://developer.android.google.cn/ndk/guides/android_mk?hl=zh-cn
```

