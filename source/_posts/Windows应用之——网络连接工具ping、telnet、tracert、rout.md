---
title: Windows应用之——网络连接工具ping、telnet、tracert、rout
categories:
  - 系统
  - Windows
tags:
  - 网络工具
abbrlink: a1bbb5a2
date: 2019-12-26 21:32:58
---
## 一 概述

在使用windows，我们会用到windows提供了网络连接、判断、追踪根据工具。如下：  

* ping命令：可用于判断网络是否连通
* telnet命令：可用于判断服务器端的端口是否打开及远程登录
* tracert命令：用于确定 IP 数据报访问目标所经过的路径，来判断在哪个环节上出了问题
* *route*命令:查看路由表

<!--more-->

## 二 ping命令(ping ip地址或主机名)

* ping ip地址

	```
	ping 127.0.0.1
	```

* ping主机

  ```
  ping localhost
  ```
![][1]

## 三 telnet命令(telnet ip地址或主机名),可用于远程登录

* telnet ip:端口

  ```
  telnet 127.0.0.1:8080
  ```

* telnet 主机

	```
telnet baidu.com
	```

* telnet ip

	```
	telnet 47.94.146.68
	```
	![][2]
	
## 四 tracert命令

* tracert -?查看帮助

  ```
   tracert -?
  ```

* tracert -j ip 将ip解析成主机名

  ```
  tracert -j 127.0.0.1
  ```

  ![][3]

	```
	因为host中将ip做了映射
	```
	![][4]

## 五 route命令查看路由表
* route print打印路由表

  ```
  route print
  ```

  ![][5]

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-ping-ip-host.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-telnet-ip-port.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-tracert-cmd.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-host.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-route-print.png
