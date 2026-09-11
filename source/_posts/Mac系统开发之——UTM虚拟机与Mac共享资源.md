---
title: Mac系统开发之——UTM虚拟机与Mac共享资源
categories:
  - 系统
  - Mac
tags:
  - UTM
  - 虚拟机
  - 共享资源
abbrlink: '8655e57'
date: 2026-09-11 16:36:25
---
## 一 概述

```
本文介绍：
 -Mac电脑安装UTM
 -UTM安装Win虚拟机
 -Mac电脑与UTM中的虚拟机(Win)共享资源
```

<!--more-->

## 二 准备工作(安装UTM Guest Tools)

### 2.1 说明

```
必须安装 UTM Guest Tools(SPICE 客户机工具)，否则共享文件夹、剪贴板互通都无法工作
```

### 2.2 先在 Windows 虚拟机里安装 Guest Tools

```
1. 启动 Windows 虚拟机
2. Mac 顶部菜单栏：虚拟机 (Virtual Machine) → Install UTM Guest Tools
3. Windows 内会挂载一个虚拟光驱(UTM Guest Tools)
4. 打开此光驱，右键utm-guest-tools.exe，以管理员身份运行，一路下一步安装，完成后重启 Windows

安装成功后：自动支持双向剪贴板复制粘贴、分辨率自适应 + 文件共享。
```

### 2.3 配置 UTM 共享目录

```
1. 把 Windows 关机(不能是暂停，必须关机)
2. 在 UTM 选中 Windows 虚拟机 → 点「编辑」
3. 切换到 Sharing(共享)
   - 勾选：`Enable Clipboard Sharing`(剪贴板共享)
   - Directory Share Mode：选择 SPICE WebDAV(这个是关键，不要选旧模式)
   - 点 Browse，在 Mac 上选一个文件夹作为共享目录(路径不要中文、空格尽量少，例如 `~/UTM_Share`)
4. 保存，启动 Windows
```

## 三 共享方式

### 3.1 Windows 里面访问共享文件夹

```
正常情况：打开「此电脑」，会出现网络驱动器 Z:(或 Y: Spice Client)，点开就是 Mac 的共享文件夹。
```

### 3.2 USB 直通（适合大文件）

```
Mac 插上 U 盘，UTM 虚拟机窗口右上角 USB 图标，选中U盘，直接把 USB 设备交给 Windows 使用。
缺点：同一时间只能 Mac 或 Windows 其中一方访问 U 盘。
```

### 3.3 SMB 网络共享（虚拟机网络互通）

```
1. UTM 虚拟机设置 → Network，网络模式改为 Shared Network(共享网络)
2. Windows 内 `ipconfig` 查看虚拟机 IP
3. Mac 访达：前往 → 连接服务器，输入 `smb://Windows虚拟机IP`，登录 Windows 账号访问。

适合双向互相访问全盘，但配置麻烦，不推荐作为首选。
```

