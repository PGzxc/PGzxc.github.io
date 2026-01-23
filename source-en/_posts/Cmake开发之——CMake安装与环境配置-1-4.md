---
title: Cmake开发之——CMake安装与环境配置(1.4)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: 97ef1ea6
date: 2025-08-14 16:29:28
---
## 一 概述

```
这是一份 CMake 安装与环境配置 指南
 涵盖 Windows、macOS、Linux 三大平台，
 以及命令行和图形界面（CMake GUI）两种方式，
 并包含环境变量配置说明
```

<!--more-->

## 二 CMake 安装方式

### 2.1  Windows 安装 CMake

1、方式1：官网安装(推荐)

```
1、安装步骤
访问官网：https://cmake.org/download/
下载对应版本（cmake-X.Y.Z-windows-x86_64.msi）
安装时勾选 “Add CMake to the system PATH for all users”

2、验证
安装完成后，打开命令行输入：
cmake --version

如出现版本信息，则安装成功。
```

2、方式2：通过包管理工具(例如 Chocolatey)

```
1、确认已安装Chocolatey
https://chocolatey.org/

2、Chocolatey安装cmake
choco install cmake

注意需以管理员身份运行 PowerShell

或 scoop
scoop install cmake   # Scoop
```

### 2.2  macOS 安装 CMake

1、方式1：使用 Homebrew(推荐)

```
brew install cmake
```

2、方式二：手动下载安装包

```
-官网下载 .dmg 文件
-拖动到应用程序中即可使用
手动添加到 PATH（如果想用命令行）
sudo ln -s /Applications/CMake.app/Contents/bin/cmake /usr/local/bin/cmake
```

### 2.3 Linux 安装 CMake

1、 方式1：APT/YUM 包管理器安装(可能版本较旧)

```
1、Debian/Ubuntu
sudo apt update
sudo apt install cmake

2、CentOS/Fedora
sudo yum install cmake
```

2、 方式2：安装最新版 CMake(推荐)

```
1、步骤
 1、从官网下载 .tar.gz 源码包
 2、解压后进入目录：
 3、检查版本

2、执行
wget https://cmake.org/files/v3.30/cmake-3.30.2.tar.gz
tar -zxvf cmake-3.30.2.tar.gz
cd cmake-3.30.2
./bootstrap
make -j$(nproc)
sudo make install
```

### 2.4 Android安装CMake (Android Studio 用户(自动集成))

```
1、Android NDK 会自带 CMake，路径类似于：
~/Library/Android/sdk/cmake/

2、可在 Android Studio 设置 → SDK Tools 中手动勾选 CMake 安装
```


### 2.5 IOS安装CMake

iOS 开发者(用于构建原生模块)

```
可结合 Xcode + CMake 配合构建跨平台项目
macOS 上通过 brew install cmake 最方便
```

## 三 环境变量配置

如果安装时未勾选“添加到 PATH”，需要手动配置。

### 3.1 Windows

```
1、找到 CMake 安装路径（例如：C:\Program Files\CMake\bin）
2、打开 控制面板 → 系统与安全 → 系统 → 高级系统设置 → 环境变量
3、在“系统变量”中找到 Path，点击“编辑”，添加：C:\Program Files\CMake\bin
4、重新打开命令行输入：cmake --version
```

### 3.2 macOS / Linux

```
1、编辑 ~/.bashrc 或 ~/.zshrc：export PATH="/path/to/cmake/bin:$PATH"
2、刷新配置：source ~/.bashrc
3、验证：cmake --version
```

## 四 CMake GUI 使用

```
1、CMake GUI
 CMake 除了命令行还有图形界面版本（CMake GUI）

2、基本流程：
 Where is the source code: 选择源码路径
 Where to build the binaries: 选择构建输出路径（建议与源码分离，如 build/ 文件夹）
 点击 Configure → 选择编译器/生成器（如 Ninja、Visual Studio）
 点击 Generate → 生成构建系统
 用构建工具（make/ninja/msbuild）编译
```

## 五 安装后常用命令

```
cmake --version              # 查看版本
cmake -G "Ninja" ..          # 指定生成器
cmake -DCMAKE_BUILD_TYPE=Release ..  # 设置构建类型
cmake --build . --target install     # 构建并安装
```

## 六 总结

|  平台   |        安装方式         | 推荐 |
| :-----: | :---------------------: | :--: |
| Windows |    官网 MSI / choco     | ✅✅✅  |
|  Linux  |   官网源码 / APT/YUM    |  ✅✅  |
|  macOS  |     Homebrew / dmg      | ✅✅✅  |
| Android | Android Studio SDK 配套 | ✅✅✅  |
|   iOS   |        brew 安装        |  ✅✅  |

