---
title: SMB之——启用SMB共享(Linux)-3
categories:
  - 开发
  - J-NAS
  - 自建服务
  - SMB
tags:
  - SMB
abbrlink: 4bafc842
date: 2025-08-24 07:42:02
---
## 一 概述

```
本文介绍：
 -Linux 系统也可以作为 SMB 服务器，提供文件共享。
 -你需要安装 Samba 软件包并配置
```

<!--more-->

## 二 在Linux系统上启动SMB共享

### 2.1 安装 Samba

```
sudo apt-get update
sudo apt-get install samba
```

### 2.2 配置共享文件夹

```
1、打开 Samba 配置文件 /etc/samba/smb.conf：
sudo nano /etc/samba/smb.conf

2、在文件底部添加以下内容，指定你希望共享的文件夹（如 /home/user/media）
[Media]
path = /home/user/media
browseable = yes
writable = yes
guest ok = yes
```

### 2.3 重启 Samba 服务

```
sudo service smbd restart
```

### 2.4 设置 Samba 用户(如果需要)

```
果需要使用用户名密码访问共享文件夹，可以创建 Samba 用户
sudo smbpasswd -a username
```



