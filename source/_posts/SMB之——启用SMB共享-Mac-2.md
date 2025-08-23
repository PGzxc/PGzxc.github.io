---
title: SMB之——启用SMB共享(Mac)-2
categories:
  - 开发
  - J-NAS
  - 自建服务
  - SMB
tags:
  - SMB
abbrlink: 8992dafd
date: 2025-08-24 07:40:09
---
## 一 概述

```
本文介绍：在Mac系统上启动SMB共享
```

<!--more-->

## 二 在Mac系统上启动SMB共享

### 2.1 打开共享

1、说明

```
点击屏幕左上角的 苹果菜单，选择 “系统偏好设置”。
在系统偏好设置中，点击 “共享”（Sharing）
```

2、图示

| 1-通用—>共享 | 2-共享文件夹 |
| :----------: | :----------: |
|    ![][1]    |    ![][2]    |

### 2.2 启用文件共享

1、说明

```
1、在左侧的服务列表中，勾选 “文件共享”。
这将启用 macOS 上的文件共享功能，你可以共享文件夹并通过网络访问它们

2、配置共享文件夹
 在 “共享” 面板的右侧，点击 “+” 按钮，选择你想共享的文件夹。
 你可以共享某个特定的文件夹（例如，存储音视频文件的文件夹）
```

2、图示

| 1-打开文件共享 | 2-添加共享文件 |
| :------------: | :------------: |
|     ![][3]     |     ![][4]     |

### 2.3 配置 SMB 共享选项

1、说明

```
1、在共享文件夹列表下方，点击 “选项...” 按钮，弹出 “文件共享选项” 窗口。

2、在 文件共享选项 中，勾选 “使用 SMB 来共享文件和文件夹”。
 此时，你可以选择启用 SMB 和 AFP（Apple 文件协议）共享。
 如果你只希望使用 SMB 协议，确保勾选 SMB 并关闭 AFP。

3、选择用户权限：
 在 共享文件夹 部分，你可以设置不同用户对共享文件夹的访问权限（例如，读取、写入权限）。
 选择要共享的文件夹后，你可以为每个用户设置权限，允许他们进行访问。
```

2、图示

| 1-用户权限 | 2-用户密码 |
| :--------: | :--------: |
|   ![][5]   |   ![][6]   |

## 三 访问SMB共享

### 3.1 在 Windows 上访问

```
1、打开 资源管理器，在地址栏输入 \\[Mac_IP_address]，例如：
\\192.168.1.xxx

你也可以输入 \\[Mac_Name]，例如：
\\MacBook-Pro


2、输入共享的用户名和密码（如果设置了访问权限），就能访问共享的文件夹
```

### 3.2 在 macOS 上访问

```
1、在 Finder 中，点击 前往 菜单，选择 连接服务器。

2、输入 smb://[Mac_IP_address]，例如：
smb://192.168.1.xxx

3、如果需要密码，输入用户名和密码，连接成功后即可访问共享的文件夹
```

### 3.3 在 Linux 上访问

```
1、打开 文件管理器，在地址栏输入：
smb://[Mac_IP_address]

2、输入用户名和密码（如有设置），连接后即可访问共享文件夹。
```

### 3.4 在智能电视/设备上访问

```
1、确保电视或设备支持 SMB 协议，并且在同一局域网内。

2、通过电视或设备的 文件浏览器 或 媒体播放器，
 选择 SMB 网络共享，
 输入你的 macOS 设备的 IP 地址或设备名称进行连接，
 访问共享的文件夹并播放音视频
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-2-mac-share-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-2-mac-share-folder-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-2-mac-share-open-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-2-mac-add-folder-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-2-mac-share-person-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/smb-2-mac-share-pass-6.png
