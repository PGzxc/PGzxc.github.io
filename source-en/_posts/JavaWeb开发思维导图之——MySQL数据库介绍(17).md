---
title: JavaWeb开发思维导图之——MySQL数据库介绍(17)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: e4ce6afc
date: 2024-11-13 08:56:43
---
## 一 概述

* 概念
* 分类
* 介绍
* MySQL安装(Linux)

<!--more-->

## 二 内容详情

### 2.1  概念

* 用于存储和管理数据的仓库
* 英文单词为DataBase，简称DB
* 存储空间很大，可以存放上亿条数据
* 同一操作数据库的方式——SQL

### 2.2 分类

* Oracle
* MySQL
* Microsoft SQL Server
* PostgreSQL
* MongoDB
* IBM Db2
* Elasticsearch
* Redis
* Microsoft Access
* Cassandra

### 2.3 介绍

* MySQL是最流行的关系型数据库管理系统
* 由瑞典MySQL AB公司开发，后被Oracle收购
* 关系型数据库是将数据保存在不同数据表中，提高访问速度和灵活性
* SQL语句是访问数据库最常用标准化语言(通用)
* 免费(6版本之前)

### 2.4 MySQL安装(Linux)

* 通过ssh工具(如secureCRT)连接Linux系统
* 上传mysql安装包
* 解压mysql安装包(tar -xvf my_xx.tar)
* 安装客户端(rpm -ivh mysql..)
* 安装服务端(rpm -ivh mysql..)
* 修改mysql默认字符集(vi /etc/my.cnf)
* 启动mysql服务(service mysqld start)
* 登录mysql(mysql -u root -p) //cat /var/log/mysqld.log//初始密码
* 修改mysql登录密码(set password=password('密码'))//设置密码验证
* 授予远程连接权限(grant all privileges on *.* to 'root' identified by 'password';)//刷新
* 关闭Linux系统防火墙(systemctl stop firewalld)
* 重启mysql服务(service mysql restart)
* 使用工具(如SQLYog)连接mysql

## 三 思维导图

![javaweb-xmind-mysql-explore-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-explore-1.png