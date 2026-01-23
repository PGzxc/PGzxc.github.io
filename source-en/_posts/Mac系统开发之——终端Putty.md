---
title: Mac系统开发之——终端Putty
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: dab35efc
date: 2024-12-23 08:55:35
---
## 一 概述

* 下载并安装XQuartz
* 下载MacPorts
* 安装图形化界面Putty

<!--more-->

## 二 下载并安装XQuartz

### 2.1 下载地址

https://www.xquartz.org

### 2.2 安装XQuartz

安装完成后并未显示app

## 三 下载MacPorts

### 3.1 原因(port指令未找到)

```
sudo port install putty
Password:
sudo: port: command not found
```

### 3.2 下载MacPorts

https://www.macports.org/install.php

图示

![][1]

## 四 安装图形化界面Putty

### 4.1 执行安装指令

```
sudo port install putty
```

图示

![][2]

### 4.2 添加环境变量

```
#putty
export PATH= /opt/local/libexec/gnubin/:$PATH
```

### 4.3 执行指令

```
sudo port load dbus
sudo port select --set python python312
sudo port select --set python3 python312
```

### 4.4 执行如下指令添加到桌面

```
cp /opt/local/bin/putty ~/Desktop/PuTTY
```

### 4.5 双击打开Putty

![][3]

### 4.6 将桌面的Putty拖到应用程序

![][4]

## 五 使用Putty

输入ip+端口后回撤，输入用户名和密码，进行登陆

![][5]

## 六 参考

* [知乎—MacOS上安装PuTTY](https://zhuanlan.zhihu.com/p/605439318?utm_id=0)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-putty-macports-download-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-putty-install-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-putty-start-view-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-putty-progress-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-putty-login-5.png