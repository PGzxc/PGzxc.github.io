---
title: Mac系统开发之——MongoDB安装
categories:
  - 系统
  - Mac
tags:
  - MongoDB
abbrlink: 81555b32
date: 2020-02-12 21:23:30
---
## 一 概述

本文介绍在Mac系统下使用安装包方式安装Mongodb和可视化工具。

<!--more-->

## 二 Mongodb安装和配置
* MongoDB 提供了 OSX 平台上 64 位的安装包，你可以在官网下载安装包。[下载地址][1]
![][11]

* 使用`shift+command+.`显示隐藏目录，并将解压后的文件移动到`/usr/local`目录下

  ![][12]
  
* 打开`/Users/(用户名)/.bash_profile`进行环境变量配置

  ```
  #mongodb
  MongoDB=/usr/local/mongodb-macos-x86_64-4.2.3
  export PATH=$MongoDB/bin:$PATH
  ```

* 在终端上输入`source ~/.bash_profile`事配置生效

* 在终端上继续输入`mongod -version`查看mongodb是否生效
![][13]

## 三 启动mongodb服务

### 3.1 失败现象

* 在终端中直接输入`mongod`启动服务，出现如下现象表示启动失败

  ```
  exception in initAndListen: NonExistentPath: Data directory /data/db not found., terminating
  ```

* 原因：安装MongoDB时并不会自动生成，需要我们手动创建

### 3.2 创建/data/db目录，并启动服务

* 终端切换到mongodb目录下，分别执行下面的指令

  ```
  mkdir -p data/db #创建data目录
  mongod --dbpath /data/db/ #通过--dbpath指定data目录
  ```

* 打开浏览器输入[localhost:27017][2]，会出现这样一行文字

  ```
  It looks like you are trying to access MongoDB over HTTP on the native driver port.
  ```

* 重新打开时输入`mongod'，如果已启动，会显示`address already in use`
![][15]

* 下次打开mongodb数据库时，指明data/db路径

  ```
  mongod --dbpath /usr/local/mongodb-macos-x86_64-4.2.3/data/db/
  ```

  

## 四 安装可视化工具(MongoDB Compass)

* MongoDB Compass [官网下载地址][3]
![][16]
* 安装MongoDB Compass
![][17]
* 打开后的效果如图所示
![][18]

## 五 参考
* [mac 安装和使用MongoDB][4]
* [Mac OSX 平台安装 MongoDB][5]
* [mongodb在mac sudo mkdir -p /data/db 时提示 Read-only file system][6]

[1]: https://www.mongodb.com/download-center#community
[2]:http://localhost:27017
[3]:https://www.mongodb.com/download-center/compass
[4]:https://www.jianshu.com/p/7241f7c83f4a
[5]:https://www.runoob.com/mongodb/mongodb-osx-install.html
[6]:https://www.cnblogs.com/HoverM/p/11897638.html


[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mongodb-service-download-page.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/monogo-upzip-mv-usr-local.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mongodb-terminal-version.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mongodb-mkdir-data-dbpath.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mongodb-mongod-in-use.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mongodb-compass-tools.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mongodb-compass-install.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mongodb-compass-open.png