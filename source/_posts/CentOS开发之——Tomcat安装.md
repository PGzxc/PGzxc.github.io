---
title: CentOS开发之——Tomcat安装
categories:
  - 系统
  - CentOS
tags:
  - Tomcat
abbrlink: f5779c0a
date: 2018-08-12 12:32:42
---
# 前言
Tomcat是Apache 软件基金会（Apache Software Foundation）的Jakarta 项目中的一个核心项目，是一个免费的开放源代码的Web 应用服务器，属于轻量级应用服务器，在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试JSP 程序的首选。本文将介绍在UcentOS系统下安装Tomcat。  


<!--more-->

# 准备
## 软件
1. Centos
2. Tomcat-8.5.32
3. SSH

## 下载
Centos SSH 的安装与配置，前文已经讲过，本文主要讲述Tomcat的下载与使用。    

### Tomcat下载
1. 打开[Tomcat官网][1]
	![][2] 
2. 选择要下载的版本(本文以8.5.32为例)

	因为是Centos开发环境，顾选择后缀名为.tar.gz

	![][3]  

# 安装
1. 用SSH远程连接到CentOS 
	![][4]
2. 点击如图所示位置，打开SSH shell
	![][5]  
3. 将下载好的Tomcat拖放到指定目录下(本文放到：/usr/local/下)
	![][6] 
4. 在SSH shell 进入到/usr/local/目录下，执行解压指令
	
	cd /usr/local      
	tar -zxvf apache-tomcat-8.5.32.tar.gz 	  

	![][7]  
5. 开放Centos的对外访问的端口8080

	对应位置为：/etc/sysconfig/iptables    

	![][8]
6. 启动关闭Tomcat
	
	进入tomcat的bin下启动：./startup.sh	

	![][9]
7. 验证Tomcat是否启动成功
	
	打开本地网页，输入:[http://192.168.174.132:8080][10]，并回车         
	注：其中的ip换成自己本地ip地址

	![][11]
8. 关闭Tomcat

	进入tomcat的bin下关闭：./shutdown.sh  
 
	![][12]



[1]: https://tomcat.apache.org/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-guanfang.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-download.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-remote-conn.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-ssh-shell.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-download-move.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-unzip-tar.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-open-8080.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-startup.png
[10]: http://192.168.174.132:8080
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-internet-open.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-shutdown.png


