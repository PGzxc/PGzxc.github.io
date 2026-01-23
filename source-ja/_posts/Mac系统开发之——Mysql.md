---
title: Mac系统开发之——Mysql
categories:
  - 系统
  - Mac
tags:
  - Mysql
abbrlink: e0027d6a
date: 2020-02-09 11:55:55
---
## 一 概述

本文介绍如何在Mac系统下安装及配置Mysql的相关操作，需要的系统及软件如下：  

* Mac系统
* Mysql

<!--more-->

## 二 软件的下载及安装(社区版)
### 2.1 下载
* [打开Mysql社区版下载页面][1]，选择操作系统和mysql版本，确认后点击下载
![][10]
### 2.2 安装

* 双击安装包，开始安装
  ![][11]

* 打开mysql安装引导程序
  ![][12]

* Configuration配置中选择密码加密方式(强密码和旧密码，本文选择弱密码方式)

  ```
  强密码方式：基于SHA256加密，混合密码，位数不少于8位,libmysqlclient8.0支持这种方式
  若密码方式：使用mysql 5.x 连接器或客户端时使用，混合密码，位数不少于8位
  ```

  ![][13]
* 设置弱加密的密码
![][14]
* 下一步，等待安装完成
![][15]

## 三 启动，停止和卸载mysql
* 打开系统偏好设置，找到Mysql图标，双击打开
![][16]

* 在实例选项开中(如下图)，启动，停止和卸载mysql 

  ![][17]
* 在配置选项卡中配置文件的目录
![][18]

## 四 终端操作mysql

### 4.1 检测mysql是否安装

* 打开终端，输入mysql，发现提示`commod not found`，那是因为我们没配置系统的环境变量
![][19]
### 4.2 mysql配置

* 进入当前用户目录

  `cd ~/`

* 创建.bash_profile文件(如果没有.bash_profile)

  `touch .bash_profile`

* 之前以上两步后的结果文件(使用command+shift+. 显示隐藏文件)
  ![][7]

* 打开.bash_profile文件对mysql进行配置
  `#mysql
Mysql_Home=/usr/local/mysql
export PATH=$Mysql_Home/bin:$PATH
export PATH=$Mysql_Home/support-files:$PATH
  `

* 打开终端，输入`mysql`查看是否生效
![][20]
### 4.3相关操作
* 使用终端登陆mysql

  ```
  mysql -u root -p
  ```
![][21]

* 使用终端设置新密码

  - 停止Mysql服务 `sudo /usr/local/mysql/support-files/mysql.server stop`(输入电脑密码)
  - 进入终端输入：`cd /usr/local/mysql/bin/`回车后
  - 登录管理员权限 sudo su回车后;
  - 输入以下命令来禁止mysql验证功能` ./mysqld_safe --skip-grant-tables &` 回车后mysql会自动重启
  - 输入命令` ./mysql`回车后，
  - 输入命令 `FLUSH PRIVILEGES; `回车后
  - 输入命令 `ALTER USER 'root'@'localhost' IDENTIFIED BY '你的新密码';`

	![][22]

* 服务的启动，停止和查看

  ```
  查看MySQL服务状态 sudo mysql.server status
  停止MySQL服务 sudo mysql.server stop
  重启MySQL服务 sudo mysql.server restart
  ```

  ![][23]

## 五 可视化界面
使用可视化软件，navicat   
![][24]

## 六 参考
* [MySQL for Mac 安装教程][2]
* [Mac安装MySQL][3]
* [mac下修改mysql的密码][4]


[1]:https://dev.mysql.com/downloads/mysql/
[2]:https://www.jianshu.com/p/199492627ccc
[3]:https://www.cnblogs.com/nickchen121/p/11145123.html
[4]:https://blog.csdn.net/pariese/article/details/77527813


[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-config-bash-profile.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-webpage-download.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-install-click-open.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-install-yindao.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-install-configuration.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-install-weak-password.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-install-finish.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-setting-open.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-config-start-stop-uninstall.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-setting-configuration.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-terminal-not-found.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-terminal-config.png
[21]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-terminal-login.png
[22]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-terminal-modify-password.png
[23]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-service-status-download-restart.png
[24]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mysql-navicat-premium.png