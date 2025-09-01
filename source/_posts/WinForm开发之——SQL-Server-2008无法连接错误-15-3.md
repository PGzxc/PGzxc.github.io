---
title: 'WinForm开发之——SQL Server 2008无法连接错误(15.3)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 7264436a
date: 2020-08-10 21:35:14
---
## 一 现象

打开Microsoft SQL Server Management Studio，连接服务器时，用户名和密码都正确，却显示连接服务器错误

```
error:40-无法打开到SQL Server的连接(Microsoft SQL Server,错误2)
```
<!--more-->
![][1]

## 二 解决办法

### 2.1 解决办法一

* 右键计算机——>管理，打开`计算机管理`，选择服务，找到`MSSQLSERVER`项

  ![][2]
  
* 双击`MSSQLSERVER`，设置启动类型为自动，并启动此选项

  ![][3]

### 2.2 解决办法二

* 在计算机程序中，找到` SQL Server配置管理器 `，双击打开

  ![][4]
  
* 找到SQL Server服务下的 SQL Server(MSSQLSERVEr)，将其启动

  ![][5]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-login-error.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-state-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-delegate-start-auto.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/sql-server-config-manager.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/sql-server-mssqlserver-start.png