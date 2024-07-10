---
title: 运维开发之——Jira管理平台搭建
categories:
  - 运维
  - Jira
tags:
  - Jira
abbrlink: 1aa9da27
date: 2018-07-28 12:18:01
---
# 前言
项目开发中，为了便于问题缺陷跟踪和任务处理，需要使用BUG管理系统；本文介绍的就是Jira管理平台，跟踪管理即对问题的整个生命周期进行记录和管理；一个问题从创建到解决到关闭涉及到很多相关信息，包括是什么问题，谁发现的问题，谁处理了这个问题，如何处理的，相应的代码有什么改变等等，JIRA可以方便的记录这些信息，并且在问题的不同状态呈现在相应的责任人面前；      

JIRA具有很多优点，以下3点必须知道：    

1. 针对问题其默认定义了丰富的字段来记录问题的各种信息，包括Issue Type, Issue summary, Issue Description, priority, assignee, reporter, resolutions等等；   
2. 默认定义了工作流的一些状态: new, open, defer, pending, resolved, reopened, closed。 默认定义了一个简易的工作流, open-in progress-resolved-closed；   
3. 支持邮件通知，邮件通知可以同工作流中和工作流之外的事件关联；

本文下面将详细介绍CentOS7环境下Jira的搭建；        
   
<!--more-->

# 准备  
## 软件  
1. 操作系统 CentOS7  
2. JIRA版本 7.11.1
3. MySQL 5.7.22 
4. mysql-connector-java-5.1.46

## 数据
1. 服务器IP 192.168.174.130 
2. JIRA端口号 8080
3. JIRA数据库名称 jira
4. JIRA数据库用户名 orange
5. JIRA数据库密码 12345678

## 下载 
### 下载JIRA  
1. 打开[JIRA官网][1] 
2. 选择系统相应的JIRA软件(本文以Linux为例) 
![][2]  
### 下载MySQL 5.7.22  
MySQL5.7.22的下载与安装，上篇已经详细介绍过，此处不再叙述；  
### 下载mysql-connector-java-5.1.46   
1. 打开[mysql官网][3]
2. 依次打开Community->MySQL Connectors->Connector/j 
![][4]
3. 选择操作系统选择Platform Independent，按图中箭头下载软件 
![][5]  
4. 解压软件(将用到如图所示jar包)
![][6]
## 配置数据库
1. 用SSH连接到CentOS,并打开SSH Secure Shell  
![][7]  
2. 登录MySQL  
	
	输入指令：mysql -u root -p      

	![][8]  
3. 创建用户名和密码
	
	指令：	create user 'orange' identified by '12345678';    
	其中：orange是用户名，12345678是登录密码      

	![][9]  
4. 创建数据库   

	使用指令创建数据库  	CREATE DATABASE jira CHARACTER SET utf8 COLLATE utf8_bin;

	其中： jiradb是数据库名字    
	![][10]
5. 为数据库申请如下权限   

	使用如下指令申请权限	GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER,INDEX on jira.* TO 'orange' IDENTIFIED BY '12345678';

	其中：jira->是数据库名称   
	orange->数据库登录用户名    
	123456->数据库登录密码  

	![][11]  
6. 刷新生效 

	使用如下指令刷新特权： flush privileges;     

	![][12]  

# 安装  
1. 使用SSH将准备阶段下载的atlassian-jira-software-7.11.1-x64.bin上传到指令目录  

	![][13]  
2. 修改atlassian的文件权限  

	chmod 777 atlassian-jira-software-7.11.1-x64.bin   

	![][14]  
3. 执行安装指令 

	./atlassian-jira-software-7.11.1-x64.bin     

	![][15]  
4. 在需要输入的地方，按照提示输入 o、i、1并回车  

	![][16]  
	![][17]  
	![][18]  
5. 安装完成后，如图所示(服务已开启)  
![][19] 

6. 暂停jira服务  
	
	使用指令： service jira stop  
	![][20]  
7. 将准备阶段下载的mysql-connector-java-5.1.46放到/opt/atlassian/jira/lib目录下  
	![][21]
8. 开发8080端口 

	/sbin/iptables -I INPUT -p tcp --dport 8080 -j ACCEPT    
	/etc/rc.d/init.d/iptables save   

	![][22]

9. 重新开启jira服务

	service jira start  

	![][23]  

10. 输入192.168.174.130:8080并回车   
![][24]
11. 点击Language设置语言(本文以简体中文为例)   
![][25]  
12. 在两个选项中选择第二个(第一个为演示环境)   
![][26]  
13. 选择数据库(MySQL)，输入信息并检测连接   
![][27]  
14. 设置基本属性信息(标题，模式等)    
![][28]  
15. 设置licencekey    
![][29] 
16. 设置管理员账户   
![][30]  
17. 设置邮箱验证    
![][31]  
18. 完毕后进入面板
![][32]  









[1]: https://www.atlassian.com/software/jira/download
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-download.png
[3]: https://dev.mysql.com/downloads/connector/
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-mysql-connect-select.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-connector-j-download.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-mysql-connector-j-unzip.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-ssh-shell.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-mysql-login.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-mysql-create-user.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-create-database.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-database-grant.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-mysql-flush-privileges.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-move-position.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-chmod-atlassian.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-install-atlassian.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-install-1.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-install-i.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-install-y.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-install-finish.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-service-stop.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-mysql-connector-move.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-port-8080.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-service-start.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-setup.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-language.png
[26]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-guide-first.png
[27]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-test-connect.png
[28]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-guide-attribute.png
[29]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-guide-key.png
[30]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-admin.png
[31]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-emai-verify.png
[32]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jira-panel.png