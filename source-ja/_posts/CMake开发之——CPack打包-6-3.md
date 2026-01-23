---
title: CMake开发之——CPack打包(6.3)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: fc277fc0
date: 2025-10-30 09:22:26
---
## 一 概述

```
本文介绍： CPack 打包工具的系统介绍，
包括基本概念、配置方法、常用打包格式和示例，帮助你快速上手 CMake 内置的打包功能
```

<!--more-->

## 二 什么是 CPack？

```
CPack 是 CMake 附带的跨平台打包工具。
它用于将编译出来的程序、资源等打包成安装包（Installer）、压缩包、RPM、DEB 等格式。
支持 Windows MSI、NSIS、macOS pkg、Linux DEB/RPM、TGZ、ZIP 等多种格式。
```

## 三 启用 CPack

```
1、在 CMakeLists.txt 文件中添加
include(CPack)

2、通常放在项目末尾
```

## 四 基本配置示例

```
set(CPACK_PACKAGE_NAME "MyApp")
set(CPACK_PACKAGE_VERSION "1.0.0")
set(CPACK_PACKAGE_VENDOR "MyCompany")
set(CPACK_PACKAGE_DESCRIPTION_SUMMARY "My application description")
set(CPACK_PACKAGE_CONTACT "support@mycompany.com")

# 安装目录（默认安装路径）
set(CPACK_PACKAGE_INSTALL_DIRECTORY "MyApp")

# 指定生成的安装包类型（Windows 可用 NSIS/MSI，Linux 可用 TGZ/DEB/RPM 等）
set(CPACK_GENERATOR "ZIP;TGZ")

include(CPack)
```

## 五 安装规则(安装目录结构)

```
1、说明
CPack 打包的是你通过 CMake 的 install() 指令定义好的内容，所以需要配合 install() 指令使用

2、示例
install(TARGETS myapp
        RUNTIME DESTINATION bin)

install(FILES README.md LICENSE
        DESTINATION share/doc/myapp)
```

## 六 常用打包格式

|  平台   |    格式示例    |           说明           |
| :-----: | :------------: | :----------------------: |
| Windows |   NSIS, MSI    |       常用安装程序       |
|  Linux  | DEB, RPM, TGZ  | Debian/RedHat 包，压缩包 |
|  macOS  | PKG, DragNDrop |     安装包或拖拽安装     |
| 跨平台  |    ZIP, TGZ    |        普通压缩包        |

## 七 执行打包命令

```
1、指令
cmake --build build --target package

或
make package

2、结果
会生成配置好的安装包
```

## 八 进阶示例(Windows NSIS 打包)

```
set(CPACK_GENERATOR "NSIS")
set(CPACK_NSIS_DISPLAY_NAME "MyApp Installer")
set(CPACK_NSIS_PACKAGE_NAME "MyApp")
set(CPACK_NSIS_CONTACT "support@mycompany.com")
set(CPACK_NSIS_URL_INFO_ABOUT "https://mycompany.com")

include(CPack)
```

## 九 小结

|           指令/变量            |             作用             |
| :----------------------------: | :--------------------------: |
|           install()            |  定义打包要包含的文件或目标  |
|         set(CPACK_XXX)         | 配置包名、版本、作者、格式等 |
|         include(CPack)         |          启用 CPack          |
| cmake --build --target package |          生成安装包          |

## 十 打包流程图

### 10.1 流程图

```
┌─────────────────────────────┐
│         编写 CMakeLists.txt   │
│  - 定义 install() 安装规则    │
│  - 配置 CPACK_* 变量          │
│  - include(CPack)             │
└───────────────┬─────────────┘
                │
                ▼
┌─────────────────────────────┐
│       使用 CMake 编译项目      │
│  - 生成构建文件               │
└───────────────┬─────────────┘
                │
                ▼
┌─────────────────────────────┐
│        执行打包命令           │
│  cmake --build . --target package │
│  或 make package             │
└───────────────┬─────────────┘
                │
                ▼
┌─────────────────────────────┐
│      CPack 根据配置生成安装包  │
│  - ZIP, TGZ, NSIS, MSI, DEB等│
│  - 包含 install() 指定内容    │
└───────────────┬─────────────┘
                │
                ▼
┌─────────────────────────────┐
│        生成安装包文件         │
│  - 位于构建目录              │
│  - 可直接分发使用            │
└─────────────────────────────┘
```

### 10.2 流程说明

```
编写 CMakeLists.txt：先定义好需要安装的文件和目标，配置好打包信息。
编译项目：CMake 生成构建系统。
执行打包命令：触发 CPack 执行打包流程。
CPack 生成安装包：根据配置和安装规则制作对应格式的安装包。
产物输出：安装包生成在构建目录下，方便后续分发。
```

