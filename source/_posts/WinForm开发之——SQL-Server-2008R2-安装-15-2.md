---
title: 'WinForm开发之——SQL Server 2008R2 安装(15.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 483c6ba2
date: 2020-08-10 21:32:34
---
## 一 概述

由于目前使用的电脑系统为windows 7 64位，官网提供的最新版本无法安装，故采用旧版本SQL Server进行安装，并演示以下内容

* 软件的下载
* 软件的安装
* 软件的使用

<!--more-->

## 二 软件下载

* 打开[Microsoft® SQL Server® 2008 R2 SP2][21]官网地址，查看版本列表
  ![][1]
  
* 点击下载，从下载列中选择系统应的文件进行下载

  ![][2]

## 三 软件安装

* 双击运行软件，弹出如图所示的安装界面
  ![][3]
  
* 选择`安装`选项卡对应的`全新安装或向现有安装添加功能`
  ![][4]
  
* 在安装许可条例中，选择接受条款协议，点击下一步

  ![][5]

* 安装程序支持文件
  ![][6]
  
* 在功能选择页面，选择安装的功能组件和功能(默认全部)和安装位置，确认后，点击下一步
   ![][7]
   
* 实例配置页面确认无需修改后，点击下一步

  ![][8]

* 服务器配置页面检查服务器名称和启动类型

   ![][9]
   
* 数据库引擎配置(身份验证选择混合模式)

   ```
   用户名：sa
   密码：root
   ```
   
   ![][10]

* Reporting Services配置，选择`安装本机模式默认配置`

   ![][11]
   
* 错误报告页面，根据需要选择是否发送错误报告

   ![][12]
   
* 显示安装进度

   ![][13]
   
* 安装过程可能需要10-20分钟左右，出现 如图界面，安装完成

   ![][14]

## 三 软件使用

* 在Windows启动栏中找到`SQL Server Management Studio`点击启动

  ![][15]
  
* 在弹出的`连接到服务器窗口`中，选择身份验证方式，输入用户名和密码，点击`连接`

  ![][16]

* 连接成功后的视图

  ![][17]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-2008-r2-webpage.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-x64-download.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-click-open.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-install-new.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-install-agree.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-installing-support.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-install-position.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-sql-config-default.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-start-config.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-database-password.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-reporting-service-config.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-error-report.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-install-progress.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-install-finished.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/sql-server-management-studio-open.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/sql-server-connect-server-username-password.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/sql-server-connected-success-view.png



[21]:https://www.microsoft.com/en-us/download/details.aspx?id=30438



