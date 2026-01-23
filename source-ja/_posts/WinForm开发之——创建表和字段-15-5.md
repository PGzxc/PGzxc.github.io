---
title: 'WinForm开发之——创建表和字段(15.5)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: '88238754'
date: 2020-08-17 21:54:30
---
## 一  概述

本文介绍C#下创建表和字段，分以下两种情况：

* Microsoft SQL Server Management Studio(输入)
* Visual Studio 2019(命令行)

<!--more-->

## 二 表格创建要求

* 表名：userinfo
* 字段：id(int类型)、name(varchar(20))、password(varchar(20))

## 三  创建方式

### 3.1 Microsoft SQL Server Management Studio

* 登录到Management Studio后，右键数据库，新建test数据库

  ![][1]
  
* 在表上右键，选择新建表，分别填写列名，数据类型和是否允许Null值，保存时填写表名为userinfo

  ![][2]

### 3.2 Visual Studio 2019

* 通过服务器资源管理器，依次打开：数据库连接—>添加连接

  ```
  服务器名：.(本地的服务器)
  身份验证：SQL Server 身份验证
     用户名：su
     密码：root
  选择或输入数据库名称：test(列表中选择)   
  ```

  ![][3]

* 选择连接好的数据库，右键新建表

  ![][4]

* 在T-SQL中输入创建表格的指令，点击上方的更新

  ![][5]

* 在弹出的窗口中选择更新数据库

  ![][6]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-management-studio-create-test.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-management-studio-table-crate.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visula-studio-sql-connected.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio-create-table.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio-command-update.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-studio-update-script.png