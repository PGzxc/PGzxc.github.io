---
title: WordPress站点之——博客搭建
categories:
  - 站点
  - WordPress
tags:
  - WordPress
abbrlink: cc7cba44
date: 2020-11-07 23:05:38
---
## 一 概述

WordPress是目前国内最为流行的 PHP 程序，基于 GPL 许可协议，功能、扩展性与灵活性强大。你几乎能用wordpress打造成任何类型的网站 ，本文介绍Windows系统下如何安装wordpress

* wordpress下载
* wordpress配置
* wordpress安装
* wordpress添加主题

<!--more-->

## 二 软件列表

* Mysql：Ver 8.0.22 for Win64 on x86_64
* Apache 服务器：Apache/2.4.46 (Win64)
* PHP版本：PHP 7.4.12 (cli) (built: Oct 27 2020 17:18:47) ( ZTS Visual C++ 2017 x64 )
* Wordpress：5.5.3

## 三 wordpress下载

### 3.1 官方网站

* [wordpress官方网站][21]
* [wordpress中文网][22]

### 3.2 打开官网后，点击获取wordpress

![][1]

### 3.3 在打开的网页下载安装包

![][2]

## 四 wordpress配置

### 4.1 将下载后的wordpress解压后，拖放到Apache24\htdocs目录下

![][3]

### 4.2 打开Navicate添加mysql数据库(数据库名wordpress)

![][4]

### 4.3 将wordpress中的wp-config-sample.php修改为wp-config.php并修改配置信息

```
define( 'DB_NAME', 'wordpress' );
/** MySQL database username */
define( 'DB_USER', 'root' );
/** MySQL database password */
define( 'DB_PASSWORD', 'root' );
/** MySQL hostname */
define( 'DB_HOST', 'localhost' );
/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );
/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
```

说明：

* DB_NAME：mysql数据库名
* DB_USER：MySQL数据库用户名
* DB_PASSWORD：MySQL数据库密码
* DB_HOST：主机地址

## 五 wordpress安装

### 5.1 启动apache服务器，在浏览器中输入下面的地址启动安装

```
http://localhost/wordpress/wp-admin/install.php
```

![][5]

### 5.2 配置网站信息

* 站点标题：设置站点的名称
* 用户名：登录wordpress的用户名
* 密码：登录wordpress的密码
* 确定密码：确认使用密码登录本网站
* 您的电子邮件：接收电子邮件的邮箱

![][6]

### 5.3 点击安装后，经过一段的安装显示安装结果

![][7]

### 5.4 输入配置站点的用户名和密码进行登录

![][8]

### 5.5 登录后，进入wordpress管理后台

![][9]

### 5.6 点击自定义站点，选择主题

![][10]

### 5.7 发布站点后，输入http://localhost/wordpress/浏览发布后的界面

![][11]

## 六 Wordpress添加主题

### 6.1 在WorPress.org主题列表中选择主题进行安装

![][12]

### 6.2 选择主题后保存并发布

![][13]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-web-get-wordpress.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-down-553.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-apache-htdocs-copy.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-mysql-navicate-database.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-wp-admin-install.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-sitepage-info-set.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-install-finish.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-user-login.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-main-site.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-choice-site-theme.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-mysite-preview.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-org-themes-choice.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wordpress/wordpress-new-theme-choice.png

[21]:https://wordpress.org/
[22]:https://cn.wordpress.org/

