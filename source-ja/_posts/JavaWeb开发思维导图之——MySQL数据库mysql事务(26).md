---
title: JavaWeb开发思维导图之——MySQL数据库mysql事务(26)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: a9e74c85
date: 2024-11-26 09:13:28
---
## 一 概述

* 介绍
* 事务提交
* 四大特征
* 隔离级别

<!--more-->

## 二 内容详情

### 2.1 介绍

* 一条或多条SQL语句组成一个执行单元，这个单元要么同时成功要么同时失败
* 单元中的每条SQL语句都相互依赖，形成一个整体
* 如果某条SQL语句执行失败或出现错误，那么整个单元就会撤回到事务最初的状态
* 如果单元中所有的SQL语句都执行成功，则事务就顺利执行

### 2.2 事务提交

1-操作

* 开启事务:start transaction;
* 回滚事务: rollback;
* 提交事务:commit;

2-提交方式

* 自动提交(MySQL默认)
* 手动提交

### 2.3 四大特征

* 原子性：要么全部成功，要么全部失败
* 1致性：事务执行前后都必须处于一致性状态
* 隔离性：多个并发事务之间相互隔离
* 持久性：一旦提交，修改是永久性的

### 2.4 隔离级别

1-概念

* 各个客户端事务 之间是相互独立、不受影响的
* 多个事务操作同一批数据时，会产生问题，需设置不同隔离基本解决这些问题

2-引发问题

* 脏读
* 不可重复读
* 幻读

3-分类

* reac uncommitted(读未提交)
* read committed(读已提交)
* repeatable read(可重复读)
* serializable( 串行化)

## 三 思维导图

![javaweb-xmind-mysql-trans-10][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-trans-10.png