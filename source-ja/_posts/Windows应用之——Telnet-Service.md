---
title: Windows应用之——Telnet Service
categories:
  - 系统
  - Windows
tags:
  - Telnet Service
abbrlink: 9a92c8b
date: 2018-09-19 23:15:53
---
# 前言
telnet命令用于登录远程主机，对远程主机进行管理。telnet因为采用明文传送报文，安全性不好，很多Linux服务器都不开放telnet服务，而改用更安全的ssh方式了。但仍然有很多别的系统可能采用了telnet方式来提供远程登录，因此弄清楚telnet客户端的使用方式仍是很有必要的。

本文主要讲述Win10环境下的Telnet服务

<!--more-->

# Telnet
## Telnet客户端和Telnet服务端
### 开启Telnet服务
Windows包含有Telnet服务，默认情况下是没有启用状态。如何启动Telnet服务呢？   

依次打开：Windows——>设置——>应用和功能——>启用和关闭Windows功能——>开启Telnet服务    

![][1]  

### Telnet客户端和Telnet服务端
#### 简介
Telnet服务包含Telnet客户端和Telnet服务端。Telnet客户端用于发起Telnet请求连接的终端(可以是Windows或者Linux系统)；Telnet服务端是接受Telnet连接请求的终端(可以是Windows或者Linux系统)；Win7之后，Windows不在包含Telnet服务端。也就是只包含发起Telnet请求的客户端；

#### 分类
1. Win7环境下Telnet服务

	![][2]  
2. Win10环境下服务

	![][3]  
### Telnet服务安装
#### Telnet客户端安装(以Win10为例)
1. 选中Telnet客户端
	
	![][4] 
2. 点击确定后，开始安装

	![][5]

3. 打开CMD，输入Telnet

	![][6]
4. 输入telnet www.baidu.com 80，测试连接

	![][7]



### Telnet服务端安装(以Win10为例)
#### 简介
win10环境下Telnet服务端已被阉割，Telnet服务没有启动的情况下，我们是不能Telnet到Win10上的。 下面我们将借助第三方工具kts119c，将Linux连接到Win10上。   
#### 步骤

1. 打开[kts119c][8]官方，下载软件   

	![][9]
2. 双击运行软件安装，选择端口号(23)   

	![][10]
3. 运行Setup kpym Telnet/SSH Service，移动到registation_key   

	![][11]

4. 按Enter键，将软件安装完成后打开网页中的信息填入，按Enter退出     

	![][12]

5. 在Ubuntu下，打开CMD输入Telnet相应ip连接到Windows上   

	![][13] 



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-position.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-win7.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-win10.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-client-select.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-client-install.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-cmd.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-baidu.png
[8]: http://www.kpym.com/2/kpym/download.htm
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-kts119.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-kts-port-23.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-kts-setup.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-kts-regis.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/telnet-linux-win.png