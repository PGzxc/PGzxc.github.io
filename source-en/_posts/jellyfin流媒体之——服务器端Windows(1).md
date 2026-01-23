---
title: jellyfin流媒体之——服务器端Windows(1)
categories:
  - 开发
  - J-NAS
  - Jellyfin
tags:
  - Jellyfin
abbrlink: 6b8fa5b8
date: 2024-08-14 07:41:42
---
## 一 概述

* jellyfin介绍
* jellyfin软件下载及安装
* jellyfin配置
* jellyfin添加媒体
* jellyfin节目展示

<!--more-->

## 二 jellyfin介绍

* Jellyfin 是一个免费软件媒体系统，让您可以控制媒体的管理和流媒体播放
* 它是 Emby 和 Plex 的替代品

## 三 jellyfin软件下载

### 3.1 查看电脑cpu架构

打开cmd终端， 输入如下指令

```
echo %PROCESSOR_ARCHITECTURE%
```

显示结果

```
AMD64
```

终端图示

![][0]

### 3.2 软件下载

1-打开[jellyfin-windows](https://jellyfin.org/downloads/windows)，服务器->windows，下载Windows端应用

![][1]

2-根据电脑cpu选择相应软件下载

![][2]

3-点击开始下载

![][3]

### 3.2 软件安装

1-双击运行软件，设置service和Data位置

![][4]

2-右键`jellyfin`图标，选择`Open Jellyfin`打开Jellyfin

![][5]

## 四 jellyfin配置

### 4.1 安装向导

1-自动打开安装向导页面（显示语言）

```
http://localhost:8096/web/index.html#!/wizardstart.html
```

图示

![][6]

2-设置用户名和密码

![][7]

3-设置语言和国家

![][8]

4-设置完成后，重新登陆

![][9]

### 4.2 更改显示语言

1-登录后显示语言为英文(点击左上角图标)

![][10]

2-打开设置页面，选择`display`

![][11]

3-display language设置为`zh`

![][12]

4-保存后界面刷新界面

![][13]

## 五 jellyfin添加媒体

### 5.1 进入媒体界面

1-点击左上角的设置图标，展开后选择`控制台`

![][14]

2-打开服务器界面

![][15]

### 5.2 添加`节目(电视剧)`

1-点击左侧的`媒体库`，所在界面点击`添加媒体库`

![][16]

2-添加媒体窗口，选择内容类型和节目文件夹

![][17]

3-媒体库开始扫描，显示扫描进度

![][18]

## 六 jellyfin节目展示

切换到`媒体—>节目`查看扫描结果

![][19]




[0]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-cpu.png
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-download.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-download-version.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-download-start.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-install-config.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-open.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-install-welcome.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-install-userinfo.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-install-country.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-install-login.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-dispaly-en.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-dispaly-setting.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-dispaly-zh.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-dispaly-zh-view.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-add-console.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-add-main.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-add-media-view.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-add-media-content.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-add-media-scan.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-1-windows-add-tv-show.png