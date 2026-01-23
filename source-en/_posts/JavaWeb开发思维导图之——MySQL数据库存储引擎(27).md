---
title: JavaWeb开发思维导图之——MySQL数据库存储引擎(27)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 39c32647
date: 2024-11-27 15:18:52
---
## 一 概述

* MySQL体系结构
* 介绍
* 操作
* 引擎选择

<!--more-->

## 二 内容详情

### 2.1  MySQL体系结构

1-客户端连接

* 支持接口，支持的客户端连接
* 例如C、java、php等语言连接mysql数据库

2-分层

* 第1层(网络连接层)
* 第2层(核心服务层)
* 第3层(存储引擎层)
* 第4层(系统文件层)

### 2.2 介绍

1-概念

* mysql使用不同机制(存储方式、索引)存取表文件，这些称为引擎
* oracle、sqlserver等只有一种存储引擎，mysql针对配置不同采取不同的引擎
* mysql常见的三种存储引擎: innoDB、MyISAM、Memory

2-3种引擎对比

*  myisam: 访问块，不支持事务和外键操作
*  innodb: 支持事务和外键，支持并发控制，占用空间大
*  memory: 内存存储，速度快，不安全。适合小量快速访问的数据

### 2.3 操作

1-查询

* 查询数据库支持的存储引擎：show engines;
* 查询某个数据库中所有数据表的存储引擎：show table status from 数据库名称(db4);
* 查询某个数据库中某个数据表的存储引擎：show table tatus from 数据库名称 where name='数据表名称';

2-创建指定

* 创建数据表，指定存储引擎：create table 表名(列名,数据类型,..)engine=引擎名称;

3-修改

* 修改数据表的存储引擎：alter table 表名 engine=引擎名称;

### 4-引擎选择

1-MyISAM

* 特点：不支持事务和外键操作、读取速度快，节约资源
* 使用场景：以查询操作为主，只有很少的更新和删除操作、对事务的完整性、并发性要求不是很高

2-InnoDB

* 特点：Mysql默认的存储引擎、支持事务和外键操作
* 使用场景：对事务的完整性有较高要求、并发条件下要求数据的一致性，读写频繁的操作

3-memory

* 特点：将所有数据保存在内存中、在需要快速定位记录和其他类似数据环境下，更快访问
* 使用场景：用于更新不太频繁的小表

## 三 思维导图

![javaweb-xmind-mysql-engine-11][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-engine-11.png