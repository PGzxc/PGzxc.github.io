---
title: 运维开发之——Confluence搭建
categories:
  - 运维
  - Confluence
tags:
  - Confluence
abbrlink: cddda75d
date: 2018-07-30 22:16:34
---
# 前言
Atlassian Confluence（简称Confluence）是一个专业的wiki程序。它是一个知识管理的工具，通过它可以实现团队成员之间的协作和知识共享。

Confluence使用简单，但它强大的编辑和站点管理特征能够帮助团队成员之间共享信息，文档协作，集体讨论。 目前，Confluence被用于广泛地用于项目团队，开发团队，市场销售团队。

<!--more-->

# 准备
## 软件  
1. 操作系统 CentOS7  
2. Confluence版本 6.10.1
3. MySQL 5.7.22 
4. mysql-connector-java-5.1.46

## 数据
1. 服务器IP 192.168.174.132
2. Confluence端口号 8090
3. Confluence数据库名称 confluence
4. Confluence数据库用户名 confluenceUser
5. Confluence数据库密码 12345678

## 下载 
### 下载Confluence
1. 打开[Confluence官网][1]  
![官网][2]

2. 选择系统相应的JIRA软件(本文以Linux为例) 
![confluence下载][3] 
### 下载MySQL 5.7.22  
MySQL5.7.22的下载与安装，上篇已经详细介绍过，此处不再叙述；  
### 下载mysql-connector-java-5.1.46   
1. 打开[mysql官网][4]
2. 依次打开Community->MySQL Connectors->Connector/j 
![][5]
3. 选择操作系统选择Platform Independent，按图中箭头下载软件 
![][6]  
4. 解压软件(将用到如图所示jar包)
![][7]
## 配置数据库
1. 用SSH连接到CentOS,并打开SSH Secure Shell  
![][8] 
2. 修改/etc/my.cnf中数据   
	![][9]	
	character-set-server=utf8	   
	collation-server=utf8_bin     
	default-storage-engine=INNODB     
	max_allowed_packet=256M	   	
	innodb_log_file_size=2GB     
	sql_mode = NO_AUTO_VALUE_ON_ZERO       
	transaction-isolation=READ-COMMITTED      
	binlog_format=row		  

3. 登录MySQL  
	
	输入指令：mysql -u root -p  
4. 创建数据库  

	CREATE DATABASE confluence CHARACTER SET utf8 COLLATE utf8_bin;     
  
	![][10]   
5. 创建用户名和密码  

	set global validate_password_policy=0;    
	set global validate_password_mixed_case_count=2;    
	create user 'confluenceUser' identified by '12345678';   

	![][11]    
6. 外部访问权限 

	GRANT ALL PRIVILEGES ON confluence.* TO 'confluenceUser' IDENTIFIED BY '12345678';     

	flush privileges;

	![][12]  

# 安装
1. 使用SSH将准备阶段下载的atlassian-confluence-6.10.1-x64.bin上传到指令目录  
![][13]  
2. 修改atlassian-confluence的文件权限 

	chmod +x atlassian-confluence-6.10.1-x64.bin     

	![][14] 
3. 安装atlassian-confluence

	./atlassian-confluence-6.10.1-x64.bin  

	![][15]

4. 在需要输入的地方，按提示，分别输入o,i,1,y并回车 
	![][16]

5. 安装完成后，停止service服务  

	service confluence stop  
	![][17]

6. 将准备阶段下载的mysql-connector-java-5.1.46放到/opt/atlassian/confluence/lib目录下  
  
	![][18]   
7. 关闭firewall服务 
	
	systemctl stop firewalld.service      
	systemctl disable firewalld.service  
	![][19]  
8. 安装iptables-services  

	yum install iptables-services   
	![][20]  

9. 对外开放端口
 ![][21]	
10. 重启service服务  

	service confluence start   

	![][22]

11. 浏览器输入：192.168.174.132:8090并回车  
	![][23]  
12. 设置语言，并选择安装方式

	![][24]  

13. 选择安装站点
![][25]
 
14. 设置安装插件
![][26]  
15. 选择使用Licence
![][27]  
16. 设置管理员信息
![][28]  
17. 安装完成后，如下图
![][29]  




[1]: https://www.atlassian.com/software/confluence
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-official-website.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-download.png
[4]: https://dev.mysql.com/downloads/connector/
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-mysql-connect-select.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-connector-j-download.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-mysql-connector-j-unzip.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-ssh.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-my-cfn.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-mysql-create-database.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-mysql-create-user.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-mysql-user-grant.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-move-centos.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-chmod-atlassian.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-install-atlassia.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-install-o.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-service-stop.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-mysql-connector-j-move.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-firewall-close.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluece-install-iptables.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluece-open-port.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-service-start.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-setup.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-language.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-content-shifan.png
[26]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-install-plugins.png
[27]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-install-licence.png
[28]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-config-sys-admin.png
[29]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/confluence-homepage.png