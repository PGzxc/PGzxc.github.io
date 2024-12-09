---
title: JavaWeb开发思维导图之——JDBC功能类详解(32)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: '71464637'
date: 2024-12-09 09:23:33
---
## 一 概述

* DriverManager驱动管理对象
* Connection数据库连接对象
* Statement执行sql语句对象
* ResultSet结果集对象

<!--more-->

## 二 内容详情

### 2.1 DriverManager驱动管理对象

1-注册驱动

* 说明：注册驱动程序: static void regsterDriver(Driver driver)
* 注意事项: 1-不需要通过DriverManager调用静态方法registerDriver();2-mysql5之后可以省略注册驱动的步骤

2-获取数据库连接

* 获取数据库连接对象:Connection getConnection(url,user,password)
* 返回值: Connection 数据库连接对象
* 参数：1-url: 指定连接路径；2-user: 用户名；3-password: 密码

### 2.2 Connection数据库连接对象

* 获取执行者对象：1-获取普通执行者对象; 2-获取预编译执行者对象
* 管理事务：1-开启事务: setAutoCommit(autoCommit);2-提交事务: commit();3-回滚事务: rollback();
* 释放资源：void close();//立即将数据库连接对象释放

### 2.3 Statement执行sql语句对象

1-执行DML语句

* 语法:  int execcuteUpdate(sql)
* 返回值int: 返回值影响的行数
* 参数sql: 可以执行insert、update、delete语句

2-执行DQL语句

* 语法: ResultSet executeQuery(sql)
* 返回值ResultSet: 封装查询的结果
* 参数sql：可以执行select语句

3-释放资源：void close();//立即将执行者对象释放

### 2.4 ResultSet结果集对象

* 判断结果集中是否还有数据：next
* 获取结果集中的数据： XXX getXxx("列名")；
* 释放资源：void close();//立即结果集对象释放

## 三 思维导图

![javaweb-xmind-jdbc-class-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jdbc-class-2.png