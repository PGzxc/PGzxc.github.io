---
title: Windows应用之——WSL升级
categories:
  - 系统
  - Windows
tags:
  - WSL
abbrlink: 21c62b52
date: 2025-07-21 08:36:00
---
## 一 概述

* WSL介绍
* WSL两个版本
* WSL安装
* WSL常用命令
* WSL升级

<!--more-->

## 二 WSL介绍

```
WSL(Windows Subsystem for Linux，Windows子系统 for Linux)是微软开发的一项技术，
它允许用户在 Windows 操作系统上直接运行 Linux 环境，无需安装虚拟机或双系统。
这一功能极大地简化了开发者在 Windows 上进行 Linux 相关开发、测试或日常使用的流程。
```

输入框输入wsl后，打开内容如下图

![][1]

## 三 WSL两个版本

目前 WSL 有 **WSL 1** 和 **WSL 2** 两个版本，核心区别在于架构：

|   特性   |                        WSL 1                         |                        WSL 2                        |
| :------: | :--------------------------------------------------: | :-------------------------------------------------: |
|   架构   |  翻译层（将 Linux 系统调用转换为 Windows 系统调用）  | 基于轻量虚拟机（Hyper-V 技术），内置完整 Linux 内核 |
|   性能   | 对 Windows 文件系统访问快，但 Linux 本地文件性能一般 |   Linux 本地文件性能接近原生，支持完整的系统调用    |
|   网络   |                与 Windows 共享网络栈                 |         独立网络栈（类似虚拟机，但更轻量）          |
|  兼容性  |        部分 Linux 工具可能不兼容（如 Docker）        |       兼容性更强，支持 Docker、Kubernetes 等        |
| 启动速度 |                         极快                         |        较快（略慢于 WSL 1，但远快于虚拟机）         |

## 四 WSL安装

### 4.1 启用 WSL 功能

```
以管理员身份打开 PowerShell，运行以下命令启用所需组件

wsl --install
```

### 4.2 手动选择发行版(可选)

```
1、若需安装其他发行版，可先列出可用选项
wsl --list --online

2、再指定安装(如 Debian)
wsl --install -d Debian
```

### 4.3 启动与初始化

```
安装完成后，在开始菜单中打开对应的发行版(如Ubuntu)，
首次启动会初始化系统并要求设置用户名和密码(非Windows 账户，仅用于Linux内)
```

## 五 WSL常用命令

### 5.1 查看已安装的发行版及版本

```
wsl --list --verbose  # 或 wsl -l -v
```

### 5.2 切换默认版本(如设为 WSL 2)

```
wsl --set-default-version 2
```

### 5.3 启动 / 停止指定发行版

```
wsl -d Ubuntu  # 启动 Ubuntu
wsl --shutdown Ubuntu  # 停止 Ubuntu
```

## 六 WSL升级

### 6.1 执行指令时可能出现的错误

![][2]

### 6.2 使用升级指令

```
 wsl.exe --install 或 wsl.exe --update
```

### 6.3 使用WSL Linux内核更新包

```
https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package
```

## 七 参考

* [Microsoft——旧版 WSL 的手动安装步骤](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/win-wsl-open-view-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/win-wsl-terminal-error-2.png