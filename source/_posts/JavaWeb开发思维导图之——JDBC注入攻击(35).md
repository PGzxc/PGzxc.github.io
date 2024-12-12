---
title: JavaWeb开发思维导图之——JDBC注入攻击(35)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 6ce7f79e
date: 2024-12-12 08:38:17
---
## 一 概述

* 概念
* sql注入攻击解决

<!--more-->

## 二 内容详情

### 2.1 概念

* 什么是SQL注入攻击？利用sql语句的漏洞来对系统进行攻击
* SQL注入攻击演示？1-输入数据库不存在用户名和密码无法登录；2-不存在用户名后拼接 or '1=1'，查询结果成立，登录成功；3-查询语句:select * from user where loginname='aaa' and password='bbb' or '1=1';
* SQL注入攻击的原理：1-按照正常道理来说，在密码输入的所有内容，都应认为是密码的组成部分；2-但是现在Statement对象在执行sql语句时，将密码的一部分内容当作查询条件来执行了

### 2.2 sql注入攻击解决

1-PreparedStatement预编译执行者对象

* 在执行sql语句之前，将sql语句进行提前编译。明确sql语句格式后不会变了。剩余的都是参数
* SQL语句中的参数使用?作为占位符

2-为?占位符赋值的方法

* Xxx: 数据类型
* 参数：1-参数1:?的位置编号(编号从1开始)、2-参数2: ?的实际参数
* 示例：String sql="delete from user where name=?";、pstm=conn.prepareStatement(sql);

3-执行SQL语句

* 执行insert、update、delete语句: int executeUpdate();
* 执行select语句: ResultSet executeQuery();

## 三 思维导图

![javaweb-xmind-jdbc-inject-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jdbc-inject-5.png