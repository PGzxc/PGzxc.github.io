---
title: NSSM服务器之——安装windows服务配置项
categories:
  - 开发
  - G-后端开发
  - NSSM
tags:
  - NSSM
abbrlink: bd17ded7
date: 2024-08-26 17:35:51
---
## 一 概述

* NSSM介绍
* NSSM常用指令
* NSSM应用示例

<!--more-->

## 二 NSSM介绍

### 2.1 NSSM介绍

* nssm（Non-Sucking Service Manager）是一个用于在Windows系统上管理服务的工具
* 它允许你将任何可执行文件转换为Windows服务，并提供了一些功能来管理这些服务

## 2.2 NSSM下载

官网下载地址：https://nssm.cc/download

### 2.3 下载后解压缩

![][1]

## 三 NSSM常用指令

```
nssm install servername //创建servername服务，弹出配置界面
nssm start servername //启动服务
nssm stop servername //暂停服务
nssm restart servername //重新启动服务
nssm remove servername //删除创建的servername服务
nssm edit servername//更改servername服务，弹出修改界面
nssm set servername 参数名 参数值 //设置服务参数值
sc delete servername//windows删除服务命令
```

## 四 NSSM应用示例(MetaTube)

### 4.1 创建NSSM服务

1-在nssm解压缩文件夹打开CMD终端，执行如下指令

```
nssm install nssm
```

图示

![][2]

2-指令执行后打开`NSSM serveice installer`窗口

Application配置项(指定要执行的程序，可以有参数)

```
metatube-server-windows-amd64-v3.exe -dsn metatube.db
或
-dsn metatube.db -port=8888 //指定端口
```

图示

![][3]

IO配置项(配置日志文件，非必填，事先创建好文件夹，OutPut和Error会指定同一个文件)

![][4]

Detail配置项(应用描述和启动类型设置)

![][5]

3-点击`Install service`后，服务安装完成

![][6]

计算机管理—>服务和应用程序—>服务下展示

![][7]

### 4.2 删除NSSM服务

删除指令(管理员模式下)

```
sc delete nssm
```

图示

![][8]

## 五 参考

* [CSDN-nssm使用说明](https://blog.csdn.net/wykqh/article/details/136887417)
* [CSDN-工具--nssm详解](https://blog.csdn.net/liyou123456789/article/details/123094277)
* [SegmentFault—如何利用NSSM创建Windows服务](https://segmentfault.com/a/1190000044719796)
* [博客园-NSSM安装windows服务配置项说明](https://www.cnblogs.com/xsj1989/p/18193418)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-service/nssm-unzip-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-service/nssm-install-servername-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-service/nssm-install-app-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-service/nssm-install-io-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-service/nssm-install-detail-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-service/nssm-install-finish-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-service/nssm-service-show-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-service/nssm-delete-service-8.png