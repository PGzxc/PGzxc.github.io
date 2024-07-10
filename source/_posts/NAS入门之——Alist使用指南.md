---
title: NAS入门之——Alist使用指南
categories:
  - 开发
  - J-NAS
  - Alist
tags:
  - Alist
abbrlink: e896f8aa
date: 2023-02-24 10:31:54
---
## 一 概述

Alist，可以将二十款网盘挂载本地的神器，还能搭建自己的网盘分享站。

* 软件下载
* 启动登录
* 挂载网盘
* 网盘挂载到本地
* 开机启动

<!--more-->

## 二 下载安装(Windows为例)

### 2.1 项目介绍

* 项目地址：https://github.com/alist-org/alist
* 下载地址：https://github.com/alist-org/alist/releases
* 文档地址：https://alist.nn.ci/zh/guide/install/manual.html
* 预览地址：https://al.nn.ci/

### 2.2 软件下载

在Releases页面的Assets下选择相应平台的资源文件，本文选择V3.11.0版本下的windows-arm64

![][1]

## 三 启动登录
### 3.1 软件安装

将软件解压到安装文件目录下

![][2]

进入CMD终端，输入如下指令

```
alist.exe server
```

![][3]

显示如下界面，表示软件启动完成

![][4]

在浏览器中输入如下内容，打开网页，并将用户名`admin`和密码填入

```
http://127.0.0.1:5244/
```

![][5]

点击底部的`管理`修改系统生成的临时密码

![][6]

### 3.2 重新设置密码

在密码输入页面，输入新密码，并保存，重新登录

![][7]

## 四 挂载网盘

刚创建的主页是没有内容的，显示如下

```
failed get storage: can't find storage with rawPath: /
```

### 4.1 百度网盘添加

点击AList管理左侧的`存储`选项

![][8]

点击`添加`按钮，显示如下图所示内容

![][9]

从驱动选择下拉框中选择`百度网盘`

![][10]

添加`百度网盘`的配置策略

```
挂载路径：/百度网盘
WebDAV策略：使用代理地址
提取文件就：提取到最前
下载接口：非官方
```

![][11]

点击[Alist文档—>添加存储—>百度网盘](https://alist.nn.ci/zh/guide/drivers/baidu.html)下的刷新令牌，获取登录token

![][12]

登录后token地址如下
![][13]

将`refresh token`，添加到添加百度网盘位置，确认后，点击`添加按钮`
![][14]

添加完成后，如图所示，状态显示work表示正常工作

![][15]

回到主页，查看`百度网盘`已经添加完成
![][16]

### 4.2 阿里云盘添加

同理，点击添加，配置如下`阿里云盘`添加策略

```
驱动：阿里云盘
挂载路径：/阿里云盘
WebDAV：本地代理
提取文件就：提取到最前
妙传：开启
```

![][17]

获取阿里云盘token：点击[Alist文档—>添加存储—>阿里云盘/分享](https://alist.nn.ci/zh/guide/drivers/aliyundrive.html)，刷新令牌下方的`获取Token`

![][18]

出现二维码后，使用阿里云盘App扫码

![][19]

扫码成功后，点击一下上方按钮，下方显示获取token

![][20]

将`Token`添加到添加`阿里云盘`对应位置，点击添加

![][21]

添加完成后，回到主页，网盘显示如下

![][22]

## 五 网盘挂载到本地

### 5.1 下载RaiDrive

打开https://www.raidrive.com.cn/地址，下载软件
![][23]

### 5.2 挂载本地网盘

打开RaiDrive，选择`添加`按钮

![][24]

RaiDrive配置信息如下

```
服务类型：NAS
虚拟驱动器：W
地址：http://127.0.0.1:5244
账户：admin(alist账户)
```

![][25]

添加完成后，打开如下图所示
![][26]

将RaiDrive添加到开启自动其
![][27]

## 六 开机启动Alist

### 6.1 将Alist添加到环境变量

将Alist添加到path环境变量(不用定位到Alist盘，直接执行cmd命令)
![][28]

### 6.2 下载启动脚本

在[Alist文档—>手动安装—>守护进程](https://alist.nn.ci/zh/guide/install/manual.html)，下载两个启动脚本

![][29]

### 6.3 添加到开机自启动

Win+R，在输入框中输入如下指令，打开开机自启动窗口

```
shell:startup
```

将启动快捷方式添加到开机自启动窗口

![][30]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-release-windows-download.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-unzip.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-cmd-start-server.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-cmd-start-success.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-website-login.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-rawpath-manager-click.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-resetpassword.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-storage-click.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-storage-add.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-add-baidu-select.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-storage-baidu-add-config.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-baidu-token-login.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-baidu-token-access.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-baidu-refressh-token-add.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-add-baidu-success.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-add-baidu-home-show.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-add-ali-select.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-add-ali-token-click.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-add-ali-scan.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-add-ali-token-success.png
[21]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-add-ali-refresh-token-add.png
[22]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-manager-add-home-show.png
[23]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-raidrive-download.png
[24]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-raidrive-add-select.png
[25]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-raidrive-config.png
[26]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-raidrive-add-success.png
[27]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-raidrive-start-auto.png
[28]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-raidrive-path-add.png
[29]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-raidrive-start-stop-vbs.png
[30]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/windows-nas-alist-raidrive-start-move-vbs.png