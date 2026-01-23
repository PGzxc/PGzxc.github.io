---
title: CentOS开发之——CentOS7下安装MySQL
categories:
  - 系统
  - CentOS
tags:
  - MySQL
abbrlink: aaf89be0
date: 2018-07-27 17:56:03
---
# 前言
上一篇文章介绍了CentOS7安装的相关知识，本文将介绍CentOS7下安装MySQL;   

MySQL是Web世界中使用最广泛的数据库服务器。SQLite的特点是轻量级、可嵌入，但不能承受高并发访问，适合桌面和移动应用。而MySQL是为服务器端设计的数据库，能承受高并发访问，同时占用的内存也远远大于SQLite。

此外，MySQL内部有多种数据库引擎，最常用的引擎是支持数据库事务的InnoDB。

<!--more-->

# 准备
## 软件
1. CentOS
2. MySQL Community Server

## 下载
### CentOS
CentOS的安装与使用，上篇文章已做介绍，此处不在叙述；

###  MySQL
1. 打开[MySQL官网][1]，，下载MySQL Community Server
![][2]  
2. MySQL Community Server下载列表中选择5.7  
![][3]
3. 设置版本、操作系统等信息，确定后点击下载
![][4]  
4. 下一步，进入下载界面
![][5] 
5. 在/usr/local/目录下新建文件夹mysql，并将下载文件复制到此目录下
![][6]  
![][7]  
# 安装
1. 使用windows下使用ssh远程连接到centOS，打开shell     
![][8] 
2. 进入到mysql目录下，执行解压指令
![][9] 
3. 删除原有的mariadb，不然mysql装不进去   
查询    
	rpm -qa | grep mysql    
    rpm -qa|grep mariadb	  
删除   
rpm -e --nodeps mariadb-libs    

![][10] 
![][11]

4. 安装顺序安装响应软件  

	rpm -ivh mysql-community-common-5.7.21-1.el7.x86_64.rpm  
	rpm -ivh mysql-community-libs-5.7.21-1.el7.x86_64.rpm   
	rpm -ivh mysql-community-devel-5.7.21-1.el7.x86_64.rpm   
	rpm -ivh mysql-community-libs-compat-5.7.21-1.el7.x86_64.rpm   
	rpm -ivh mysql-community-client-5.7.21-1.el7.x86_64.rpm   
	rpm -ivh mysql-community-server-5.7.21-1.el7.x86_64.rpm   


![][12]  
5. 如果需要安装net-tools和perl，请按要求安装  
	
	yum install net-tools    
	yum install perl    

![][13]  
![][14]
![][15] 
![][16] 

6. 使用systemctl命令启动和关闭mysql


	启动mysql服务:systemctl start mysqld.service  
	停止mysql服务:systemctl stop mysqld.service   
	重启mysql服务:systemctl restart mysqld.service  
	查看mysql服务当前状态:systemctl status mysqld.service    
	设置mysql服务开机自启动:systemctl enable mysqld.service     
	停止mysql服务开机自启动:systemctl disable mysqld.service    
	![][17]

7. mysql登录问题  
 使用指令：mysql -u root -p   
![][18]  

8. mysql安装目录 
centos7下，mysql安装目录 /var/lib/mysql   
![][19]  
9. 打开mysql生产的默认随机密码，登录mysql  
 
	centos7下mysql生成的随机密码在/var/log/mysqld.log文件中，输入for root@localhost查找密码  
![][20]

10. 修改默认密码   
	set global validate_password_policy=0;   
	set global validate_password_mixed_case_count=2;  
	ALTER USER USER() IDENTIFIED BY '123456';

	通过上述指令修改mysql密码 
	![][21]  


# 第三方工具连接数据库 
本文使用Navicat Premium检测数据库的连接情况    
1. 开启mysql的远程登录
	
	grant all privileges on *.* to 'root' @'%' identified by '123456';  
	flush privileges;  

2. 开放Linux的对外访问的端口3306

	
	/sbin/iptables -I INPUT -p tcp --dport 3306 -j ACCEPT  
	/etc/rc.d/init.d/iptables save ---将修改永久保存到防火墙中  

 若没有iptables，则 touch iptables 
	![][22]
 并修改文件的权限  chmod 777 iptables   
![][23] 
![][24]  

3. 使用navicat premium连接 
 ![][25]


[1]: https://dev.mysql.com/downloads/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-guanwang.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-community-5.7.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-community-server-select.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-download.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-new-file.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-download-move.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-ssh-remote.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-tar-xvf.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-rpm-qa.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-remove-mariadb.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-client.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-net-tools-warming.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-net-tools-install.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-perl-warming.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-install-perl.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-operator.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-login-denied.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-install-position.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-password-suiji.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-reset-password.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-touch-iptables.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-iptables-saved.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-grant.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-connect-success.png