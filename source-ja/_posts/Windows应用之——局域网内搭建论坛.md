---
title: Windows应用之——局域网内搭建论坛
categories:
  - 系统
  - Windows
tags:
  - 论坛
abbrlink: '59e21807'
date: 2018-08-10 22:56:36
---

# 前言
论坛(Forums) 是在线商业服务中的团体组织。论坛可能运作着一个图书馆、一个聊天室，让人们进行实时的信息交流，甚至它还有一个分类的广告目录。因特网上的论坛，它将会吸引一些带有特殊兴趣的群体(资源分享、婚恋交友等)。版主对版块发起者和管理者严格实施真实身份信息备案、定期核验。   

本文主要介绍使用便捷开发工具快速搭建一个论坛，如果愿意，你可以发布到互联网上让给多的人参与进来。     

<!--more-->

# 安装
## 软件
### 软件清单
1. PHPnow-1.5.6
2. UCenter_1.6.0_SC_GBK
3. Discuz_7.2_SC_GBK

### 软件介绍
1. PHPnow：它是一款Apache+PHP+MySql的集成环境，就像傻瓜相机一样，方便新手在自己的电脑上创建一个WEB服务器环境。
2. Discuz: 论坛包
3. UCenter：用户中心，Dicuz安装和运行依赖程序。

### 软件下载
#### 下载PHPnow
打开[servkit.org][1]，下载绿色PHP套件   
![][2]
#### 下载UCenter
打开[UCenter][3]，在产品列中下载UCenter
![][4] 
 
#### 打开[UCenter][3]，在产品列中下载Discuz
![][5]

## 安装
1. 在本地电脑上新建LunTan目录(如：D:\LunTan)
![][6]  
2. 分别将三个文件解压
![][7] 
3. 解压后的三个文件目录
![phpunzip][8]   
![ucenter-unzip][9]  
![discusz-unzip][10]
4. 将PHPnow解压后的文件移动到LunTan目录下
![][11]  
5. 双击LunTan目录下的setup.bat运行
![][12]  
6. 选择Apache版本，输入推荐值20并回车
![][13]
7. 选择Mysql版本，输入推荐值50并回车
![][14] 
8. 是否初始化配置中，输入y并回车
![][15]  
9. 如果事先已安装Mysql，会出现如图所示，请结束掉mysqld.exe进程，输入2重试
![][16]
10. 你可能遇到出现apache-pn失败
![][17]  
11. 打开CMD,输入sc delete  apache_pn并回车(或者以管理员模式进入到LunTan目录，执行init)
![][18]
12. 正常启动后，设置Mysql密码
![][19]  
13. 继续可以看到默认页面，Mysql连接输入密码，测试是否正常
![][20] 
14. 将UCenter下的upload改名为UCenter并移动到LunTan\htdocs目录下
![][21]  
15. 将Discusz下upload中的内容全部复制到LunTan\htdocs下，并覆盖index.php文件
![][22] 
16. 在浏览器地址栏内输入：[http://127.0.0.1/Uncenter/install/][23]
![][24]  
17. 开始安装，下一步
![][25]
18. 在数据库页面输入密码和管理员信息
![][26] 
19. 数据库完成，进入用户中心
![][27]
20. 输入用户密码，以创建者方式登录
![][28]
21. 进入应用管理，添加新应用
![][29] 
22. 选择安装方式(选择推荐URL方式，domain改为127.0.0.1)  

	http://127.0.0.1/install/index.php
![][30]
23. 进入论坛安装向导
![][31]  
24. 安装向导，下一步
![][32]
25. 设置访问URL和站点名称
![][33] 
26. 设置站点数据库和管理员信息
![][34]
27. 跳过联系方式
![][35]
28. 如果不出问题，可能会出现如下错误
	Error:Table 'ucenter.uc_pms' doesn't exist    
	Errno:1146     
	SQL::SELECT count(*) FROM `ucenter`.uc_pms WHERE (related='0' AND     msgfromid>'0' OR msgfromid='0') AND msgtoid='0' AND folder='inbox' AND    new='1'
![][36]
29. 使用navicat连接到数据库
![][37]  
30. 打开ucenter的命令行窗口模式
![][38]   
   
31. 在ucenter中创建表信息  
	CREATE TABLE uc_pms (
	pmid int(10) unsigned NOT NULL auto_increment,
	msgfrom varchar(15) NOT NULL default '',
	msgfromid mediumint(8) unsigned NOT NULL default '0',
	msgtoid mediumint(8) unsigned NOT NULL default '0',
	folder enum('inbox','outbox') NOT NULL default 'inbox',
	new tinyint(1) NOT NULL default '0',
	subject varchar(75) NOT NULL default '',
	dateline int(10) unsigned NOT NULL default '0',
	message text NOT NULL,
	delstatus tinyint(1) unsigned NOT NULL default '0',
	related int(10) unsigned NOT NULL default '0',
	PRIMARY KEY(pmid),
	KEY msgtoid(msgtoid,folder,dateline),
	KEY msgfromid(msgfromid,folder,dateline),
	KEY related (related),
	KEY getnum (msgtoid,folder,delstatus)) TYPE=MyISAM;	
![][39] 
32. 查看新建表uc_pms信息
![][40]  
33. 输入：127.0.0.1，错误消失
![][41]  
34. 进入论坛主界面
![][42]


[1]: http://servkit.org/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/phpnow-download.png
[3]: http://www.comsenz.com/products/ucenter/
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ucenter-download.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discuz-download.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/LunTan-dir.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/forum-file-unzip.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/phpnow-unzip.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/uncenter-unzip.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discusz-unzip.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/luntan-php-move.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/luntan-php-setup.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/phpnow-apache.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/phpnow-mysql-select.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/phpnow-init-y.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-kill-mysqld.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/apache-pn-fail.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmd-delete-apache.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-root-password.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/phpnow-default-page.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ucenter-reload-move.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discusz-upload-move.png
[23]: http://127.0.0.1/Uncenter/install/
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ucenter-install-guide.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ucenter-install-next.png
[26]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ucenter-install-mysql.png
[27]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ucenter-mysql-finish.png
[28]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ucenter-login.png
[29]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ucenter-add-apply.png
[30]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ucenter-install-url.png
[31]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discuz-install.png
[32]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discusz-install-next.png
[33]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discuz-url-zhandian.png
[34]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discusz-mysql.png
[35]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discuz-email.png
[36]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discusz-fail.png
[37]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-navicate-conn.png
[38]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/navicat-ucenter-open.png
[39]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/navicate-ucenter-create.png
[40]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/navicat-uc-pms.png
[41]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/create-success-refresh.png
[42]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/discuz-main.png