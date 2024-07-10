---
title: Windows应用之——IIS的搭建
categories:
  - 系统
  - Windows
tags:
  - IIS
abbrlink: 93e5ea10
date: 2018-08-12 16:34:07
---

# 一 前言
Internet Information Server（简称IIS）是Windows系统提供的一种服务，它包括WWW服务器、FTP服务器和SMTP服务器，是架设个人网站的首选。

Microsoft IIS 是允许在公共Intranet或Internet上发布信息的Web服务器。Internet Information Server通过使用超文本传输协议(HTTP)传输信息。还可配置Internet Information Server 以提供文件传输协议(FTP)和gopher服务。FTP服务允许用户从Web节点或到Web节点传送文件

本文将介绍Win10环境下IIS的搭建及发布Web服务。  

<!--more-->


# 二 安装
## 说明
Windows 系统默认是不开启IIS服务的，需要用户手动打开安装，下文将介绍如何打开Windows默认的IIS，安装IIS服务。  
## IIS安装
1. 点击Windows功能键，输入控制面板  
	![][1] 
2. 在控制面板，点击程序选项  
	![][2] 
3. 启用Windows功能  
	![][3] 
4. IIS默认是没有安装的  
	![][4] 
5. 选中并安装IIS   
	![][5] 
6. 点击确定后进行安装  
	![][6]

# 三 发布Web服务
1. 同上，输入管理工具，并打开      
	![][7]
2. 打开后的页面，如下图
	![][8]  
3. 打开IIS管理器
	![][9]
4. 选中“Default Web Site”，双击中间的“ASP”
	![][10]
5. 把“启用父路径”改为“True”，并单击应用
	![][11]  
6. ASP页面，单击右侧“高级设置”
	![][12]
7. 设置站点目录
	![][13] 
8. 站点下放置个人项目
	![][14]
9. 对ASP进行绑定设置
	![][15]
10. 设置绑定ip和端口号
	![][16]  
11. 点击ASP右侧的启动
	![][17]  
12. 在本地浏览器中输入第10步中设置的ip和端口访问
	![][18]  
13. 同理，添加站点
	![][19]  
14. 输入站点名称和其他信息
	![][20]  
15. 其他设置如上


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-control-board-open.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-application.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-open-windows-function.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-service-before.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-service-after.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-compont-download.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-manager-sourch.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-manager-tool-find.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-service-open.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-default-web-asp.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-asp-parent-true.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-asp-gaoji-set.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-web-local.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-web-index.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-asp-bind.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-edit-bind.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-start.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-inter-open.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-web-add.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/iis-web-add-new.png
