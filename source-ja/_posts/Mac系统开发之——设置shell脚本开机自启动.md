---
title: Mac系统开发之——设置shell脚本开机自启动
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: da51ac67
date: 2020-03-23 15:40:14
---
## 一 概述

Windows下的脚本后缀名是.bat，Mac系统下的脚本文件后缀名是.sh，通过编写脚本设置开机启动时执行的操作或启动哪些程序，下面介绍Mac系统下如何编写shell脚本和添加开机启动

<!--more-->

## 二 编写shell脚本

* 选择脚本文件夹，并创建脚本文件

  ```
  1. cd /Users/zxc/Code/shell
  2. touch server.sh
  ```

* 根据需求，编写脚本文件(以启动mongodb和tomcat为例)

  ```
  # 启动mongodb
  mongod --dbpath /usr/local/mongodb-macos-x86_64-4.2.3/data/db/
  
  # 启动tomcat
  startup.sh
  ```

* 修改脚本文件的权限(输入密码)(重要)

  ```
  sudo chmod 777 server.sh
  ```

* 修改脚本文件的打开方式(依次打开：右键——>显示简介——>打开方式——>终端)
![][1]

## 三  开机启动，添加shell脚本

* 依次点击：系统偏好设置->用户与群组->登陆项
* 点击+号，将server.sh添加到登陆项，并勾选前面的隐藏选项卡，重新启动即可
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-open-way-terminal.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-open-user-group.png