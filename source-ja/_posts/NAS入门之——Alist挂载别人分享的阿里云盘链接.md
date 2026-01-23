---
title: NAS入门之——Alist挂载别人分享的阿里云盘链接
categories:
  - 开发
  - J-NAS
  - Alist
tags:
  - Alist
abbrlink: 5b0db800
date: 2023-03-23 20:23:29
---
## 一 概述

* 前言
* 准备工作
* 操作步骤

<!--more-->

## 二  前言

* 网友分享的资源可以使用Alist挂载
* 挂载后的阿里云盘资源，可以借助客户端播放器(如PotPlayer)进行播放
* 只可下载，无上传编辑等功能
* 播放速度受限，可能会出现卡顿

## 三 准备工作

### 3.1 阿里云盘账号及Alist环境

![][1]

### 3.2 阿里云盘资源

```
https://www.aliyundrive.com/s/d56oPmUMZEk
```

![][2]

## 四 操作步骤

### 4.1 登录到Alist管理后台

```
http://127.0.0.1:5244/
```

![][3]

### 4.2 进入Alist管理后，点击左侧的`存储`，右侧选择`添加`按钮

![][4]

### 4.3 添加—>驱动下拉列表中，选择`阿里云盘分享`

![][5]

### 4.4 挂载路径填写
![][6]

### 4.5 [点击此处][00]，获取Token令牌，并填写
![][7]

### 4.6 将获得令牌Token，填入刷新令牌位置
![][8]

### 4.7 将分享资源ID填入对应位置
![][9]

### 4.8 添加完成后，进入主页查看存储内容

![][10]

### 4.9 进入电脑本地，网络位置，查看添加的内容

![][11]

## 五 挂载资源播放

### 5.1 资源播放—直接用播放器打开
![][12]

### 5.2 播放说明

* 接口来自[github.com/yuantuo666/baiduwp-phpopen in new window](https://github.com/yuantuo666/baiduwp-php)项目，非官方api
* 挂载百度网盘分享链接，可供下载，无上传编辑等功能
* 不能突破速度限制，可能会有播放卡顿问题

## 六 参考

* [Alist—百度网盘分享链接](https://alist.nn.ci/zh/guide/drivers/baidu_share.html)
* [阿里云盘资源分享](https://wp.gxnas.com/11785.html)



[00]:https://alist.nn.ci/zh/guide/drivers/aliyundrive.html
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-account-info.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-share-content.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-manager-home.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-manager-storage-add.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-manager-storage-add-drive.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-manager-storage-add-path.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-account-token-get.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-account-token-set.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-account-shareid-set.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-share-finish-home.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-computer-disk-pan.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-alist-add-computer-res-play.png