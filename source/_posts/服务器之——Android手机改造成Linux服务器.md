---
title: 服务器之——Android手机改造成Linux服务器
categories:
  - 开发
  - G-后端开发
  - 服务器
tags:
  - Linux服务器
abbrlink: f3e25459
date: 2020-01-11 22:20:44
---
## 一 概述
本文主要介绍将Android手机改造成Linux服务器的可行性，但是改造后的Linux服务器性能可行性不大，个人建议还是使用云服务器，不建议购买新机root并进行改造，故本文使用MuMu模拟器演示  

<!--more-->

## 二 设备

* windows电脑
* android手机(已root)[本文使用MuMu模拟器]

## 三 软件

### 3.1 软件列表

* busybox       //  为改造完的linux系统添加指令

* linuxdeploy   //  将Android改造linux的软件
* ConnectBot   // linuxdeploy不带终端不能指令操作，需要ConnectBot链接

![][4]

### 3.2 软件下载

* busybox ：[Github下载地址][1]
* linuxdeploy :[Github下载地址][2]
* juicessh:[Juicessh官网][3]【需要翻墙，连接到Google play商店，可到豌豆荚下载】

## 四 操作过程

### 4.1 busybox 配置过程

* 打开busybox，配置busybox的安装路径与下面linuxdeploy的相同(默认/system/xbin)
![][5]

* 确认后，点击Install按钮(安装后ssl等显示已安装)

  ![][6]

* 使用文件管理器(ES文件管理器)查看/system/xbin目录下的文件
![][7]

### 4.2 linux deploy 配置过程

* 刚打开后的linux deploy如下图
![][8]

* 点击左上角的图标，打开左侧栏，点击设置，进入设置选项
![][9]

* 左侧栏—设置中，配置PATH目录(同busybox相同(/system/xbin))
![][10]
*  左侧栏—设置中，开启Telnet并配置端口号
![][11]

* 点击右上角图标进行其他选项配置
![][12]
* 配置用户名和用户密码
![][13]

* 开启ssh远程连接
![][14]

* 配置完成，确认无误后，执行安装
![][15]

* 安装完成后，如下图所示(<<depoly，且::configuring extra/ssh没有fail)
![][16]
* 点击启动按钮，启动Linux Deploy
![][17]

* linux deploy启动完成后，如下图所示

  ```
  ::Starting extra/ssh ...done
  <<<start
  ```

  ![][18]

### 4.3 JuiceSSH连接过程

* JuiceSSH第一次打开，如下图所示，点击+添加连接方式
![][19]

* 按照说明添加一个链接(类型可选：SSH/Mosh/本地设备/Telnet)
![][20]

* 添加后的链接列表如下
![][21]
* 使用本地链接后，查看的指令
![][22]

## 五 安装软件

### 5.1 下载并安装yum

* 下载yum

  ```
  wget http://yum.baseurl.org/download/3.2/yum-3.2.28.tar.gz
  ```

  ![][23]

* 解压yum文件

  ```
  tar xvf yum-3.2.28.tar.gz
  ```

* 进入到yum解压目录

  ```
  chmod 777 yum-3.2.28
  cd yum-3.2.28
  ```

  ![][24]

* 创建/etc/yum.conf

  ```
  touch /etc/yum.conf
  ```

  ![][25]



[1]:https://github.com/meefik/busybox/releases
[2]: https://github.com/meefik/linuxdeploy/releases
[3]:https://www.juicessh.com/
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/service-android-software-list.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/busy-install-path.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/busy-install-ssh-helper.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/busy-xbin-cmders.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-open.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-left-setting-open.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-path-add-xbin.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-telnet-port-23.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-main-seting.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-main-change-password.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-main-ssh-open.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-install-start.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-depoly-install-depoly-finish.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-start.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-deploy-start-finish.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/juicessh-first-open.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/juicessh-new-link.png
[21]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/juice-link-list.png
[22]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/juice-local-dir.png
[23]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/juicessh-download-yum.png
[24]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/juicessh-cd-yum.png
[25]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/juice-touch-ect-yumconf.png