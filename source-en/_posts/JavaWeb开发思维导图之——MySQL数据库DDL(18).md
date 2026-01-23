---
title: JavaWeb开发思维导图之——MySQL数据库DDL(18)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c939b998
date: 2024-11-14 09:38:55
---
## 一 概述

* 数据库、数据表、数据的关系
* SQL介绍
* DDL(查询和创建数据库)
* DML(表增删改)

<!--more-->

## 二 内容详情

### 2.1  数据库、数据表、数据的关系

* 电脑—>数据库管理系统—>数据库(多个)—数据表(多)—>数据
* mysql服务器可以创建多个数据库
* 每个数据库可以包含多张数据表
* 每个数据表可以存储多条数据记录
* 客户端通过数据库管理系统操作数据库

### 2.2 SQL介绍

1-概念

* Structured Query Language缩写
* 结构化查询语言
* 定义了操作所有关系型数据库的一种规则

2-语法规则

*  SQL语句可以单行或多行书写，以分号结尾
* 使用空格和缩进来增强语句的可读性
* SQL语句不区分大小写，关键字建议使用大写
* 单行注释: --注释内容
* 多行注释: /\*注释内容\*/

3-SQL分类

*  DDL(Data Deffinition Language): 数据库定义语言。//用来操作数据库，表，列等
* DML(Data Manipulation Language): 数据库操作语言。用来对数据库中表的数据增删改
* DQL(Data Query Language): 数据查询语言。用来查询数据库中表的记录(数据)
* DCL(Data  Control Language): 数据库控制语言。用来定义数据库的访问权限和安全级别及创建用户

### 2.3 DDL(查询和创建数据库)

1-操作数据库(ddl)

* 查询: 1-show database; //查询所有数据库、2-show create database 数据库名; //查询数据库的创建语句
* 创建：1-create database 数据库名称;//创建数据库、2-create database if not exists 数据库名称; //创建数据库(判断，如果不存在则创建)、3-create database 数据库名称 character set 字符集名称; //创建数据库(指定字符集)
* 修改：alter database 数据库名称 character set 字符集名称; //修改数据库(字符集)
* 删除数据库：1-drop database 数据库名称; //删除数据库、1-drop database 数据库名称; //删除数据库
* 使用数据库：use 数据库名称;//使用数据库
* 查看数据库：select database();//查看当前使用的数据库

2-操作数据表(ddl)

* 查询: 1-show tables;//查询所有数据表、2-desc 表名;//查询表结构、3-show table status from 数据库名 like '表名';//查询表字符集(所有信息)
* 创建：create table 表名(列名 数据类型 约束,...);
* 修改: alter table 表名 rename to 新表名;//修改表名
* 删除: 1-drop table 表名;//删除数据表、2-drop table if exists 表名;删除数据表(判断存在则删除)

### 2.4 DML(表增删改)

1-新增

* insert into 表名(列名1,列名2,..) values(值1,值2,..) //指定列添加数据
* insert into 表名values(值1,值2,..);//给全部列添加数据
* insert into 表名(列名1,列名2,...) values (值1,值2,...),(值1,值2,...),..;//批量添加数据
* insert into 表名 values (值1,值2,...),(值1,值2,...),...;//批量添加数据

2-修改

update 表名 set 列名1=值1,列名2=值2,...[where 条件];//修改表中数据

3-删除

delete from 表名 [where 条件]; //删除表中数据

## 三 思维导图

![javaweb-xmind-mysql-ddl-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-ddl-2.png