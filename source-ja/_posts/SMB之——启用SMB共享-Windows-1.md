---
title: SMB之——启用SMB共享(Windows)-1
categories:
  - 开发
  - J-NAS
  - 自建服务
  - SMB
tags:
  - SMB
abbrlink: daa9945b
date: 2025-08-23 10:21:02
---
## 一 概述

```
SMB(Server Message Block)是一种广泛使用的文件共享协议，
尤其适合在 Windows 系统环境中进行内网文件共享。

在内网播放音视频时，
 SMB 提供了一种简单、直接的方式来访问远程文件夹和共享文件，
 支持双向读写操作，配置和使用较为简单
```

<!--more-->

## 二 在 Windows 系统上启用 SMB 共享

### 2.1 启用 SMB 功能(如未启用)

1、说明

```
1、打开 控制面板 → 程序 → 启用或关闭 Windows 功能。

2、确保 "SMB 1.0/CIFS 文件共享支持" 和 “SMB Direct” 被勾选启用
（需要使用较新版本的 Windows，可以只启用 SMB 2/3）
```

2、图示

| 1-启用Windows | 2-勾选SMB |
| :-----------: | :-------: |
|    ![][1]     |  ![][2]   |

### 2.2 共享网络访问设置

1、说明

```
打开 “网络和共享中心”，设置 “所有网络” 下的文件和打印机共享功能为启用。
```

2、图示

| 1-找到高级网络设置 | 2-共享设置 |
| :----------------: | :--------: |
|       ![][3]       |   ![][4]   |

### 2.3 设置共享内容

```
1、创建共享文件夹：
 右击你想要共享的文件夹，选择 “属性”。
 转到 “共享” 标签页，点击 “高级共享”。
 勾选 “共享此文件夹”，可以设置共享名称和权限。

2、设置权限：
 在 “权限” 中，添加 Everyone（所有人）用户，确保 读取/写入 权限。
 点击 应用 和 确定 保存。
```

2、图示

| 1-共享文件夹 | 2-共享权限 |
| :----------: | :--------: |
|    ![][5]    |   ![][6]   |

## 三 访问SMB共享

### 3.1 在 Windows 上访问 SMB 共享

1、说明

```
1、打开资源管理器，在地址栏输入共享服务器的 IP 地址或计算机名：
 \\[Server_IP] 或 \\[Server_Name]
 例如：\\192.168.1.100 或 \\MyPC。

2、你应该能看到共享文件夹，点击并输入用户名和密码（如果设置了访问权限的话）即可访问共享的音视频文件
```

2、图示

| 1-输入地址 | 2-访问结果 |
| :--------: | :--------: |
|   ![][7]   |   ![][8]   |

### 3.2 在 macOS 上访问 SMB 共享

```
打开 Finder，点击菜单栏的 前往 → 连接服务器。
输入共享服务器的地址（例如 smb://192.168.1.100），然后点击 连接。
输入用户名和密码（如有设置），即可访问共享文件夹。
通过 VLC 等播放器打开音视频文件进行播放
```

### 3.3 在 Linux 上访问 SMB 共享

```
在 文件管理器 中，点击 “网络” 或直接在地址栏输入 smb://[Server_IP]，例如 smb://192.168.1.100。
如果需要密码，输入用户名和密码，即可访问共享文件夹。
通过 VLC 或其他播放器打开文件进行播放
```

### 3.4 在智能电视上访问 SMB 共享

```
1、许多智能电视都支持 SMB 协议，可以通过以下步骤访问 SMB 共享：
 进入电视的 文件浏览器 或 媒体播放器。
 找到 网络共享 或 SMB 网络 选项。
 输入 SMB 服务器的 IP 地址或计算机名，连接并输入访问权限（如有要求）。
 浏览共享文件夹，选择要播放的音视频文件。
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-1-win-open-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-1-win-select-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-1-win-net-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-1-win-netset-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-1-win-share-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-1-win-share-permi-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-1-win-visit-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-1-win-visit-dest-8.png