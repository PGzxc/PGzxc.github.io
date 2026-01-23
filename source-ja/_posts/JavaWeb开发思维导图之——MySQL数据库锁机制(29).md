---
title: JavaWeb开发思维导图之——MySQL数据库锁机制(29)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 26c1fb02
date: 2024-11-29 09:07:22
---
## 一 概述

* 概念
* 操作

<!--more-->

## 二 内容详情

### 2.1  概念

1-锁介绍

* 锁机制:数据库为了保证数据一致性，在共享资源并发访问时一种安全合计规范
* 锁机制类似于多线程中同步，作用就是保证数据一致性和安全性

2-分类

* 按操作分类：1-共享锁、2-排他锁
* 按粒度分类：1-表锁、2-行锁
* 按使用方式分类：1-悲观锁、2-乐观锁

3-存储引擎支持锁

* InnoDB：表锁/行锁
* MyISAM：表锁
* memory：表锁

### 2.2 操作

1-InnoDB共享锁

* 特点：数据可以被多个事务查询，不能修改

* 创建共享锁格式：select 语句 lock in share mode;
* 示例：select * from student where id=1 lock in share mode;

2-InnoDB排他锁

* 特点：加锁的数据，不能被其他事务加锁查询或修改
* 创建排他锁格式：select 语句 for update;
* 示例：select * from student wher id= for update;

3-MyISAM读锁

* 特点：所有连接只能查询数据，不能修改
* 读锁语法：1-加锁: lock table 表名 read;、2-解锁: unlock tables;
* 示例：lock table product read;

4-MyISAM写锁

* 特点：其他连接不能查询和修改数据、当期连接能查询和修改数据
* 写锁语法：1-加锁: lock table 表名 write;、2-解锁: unlock tables;
* 示例：lock table product write;

5-悲观锁和乐观锁

* 方式1:给数据表添加一列version
* 方式2:给数据表添加一列timestamp

## 三 思维导图

![javaweb-xmind-mysql-lock-13][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-lock-13.png