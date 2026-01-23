---
title: JavaWeb开发思维导图之——MySQL数据库数据库备份和恢复(23)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: aa1cd41f
date: 2024-11-22 08:48:22
---
## 一 概述

* 命令行
* 图形化界面工具(SQLyog)

<!--more-->

## 二 内容详情

### 2.1  命令行

1-备份

* 登录到mysql服务器，输入: mysqldump -u root -p 数据库名称 > 文件保存路径
* 示例: mysqldump -u root -p db5 > /root/db5.sql

2-恢复

* 登录到mysql数据库(mysql -u root -p)
* 删除已备份的数据库(drop database db5;)
* 重新创建名称相同的数据库(create database db5;)
* 使用该数据库(use  db5;)
* 导入文件执行: source 备份文件全路径(source /root/db5.sql)
* 查看是否成功(show tables;)

### 2.2 图形化界面工具(SQLyog)

1-备份

* 要备份的数据库上右键->备份/导出->备份数据库转存到SQL
* SQL转存，选择导出到文件路径，并导出

2-恢复

* 删除db5数据库(drop database db5;)
* 创建db5数据库(create database db5)
* 在db5上右键->导入->在执行SQL脚本
* 弹窗，选择执行文件，并执行
* 在表上刷新，查看

## 三 思维导图

![javaweb-xmind-mysql-backup-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-backup-7.png