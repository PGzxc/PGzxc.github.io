---
title: JavaWeb开发思维导图之——JDBC快速入门(31)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: a809cb1
date: 2024-12-07 09:30:54
---
## 一 概述

* jdbc概念
* jdbc本质
* jdbc快速入门

<!--more-->

## 二 内容详情

### 2.1  jdbc概念

* java DataBase Connection缩写，Java数据库连接
* 是一种用于执行SQL语句的Java API
* 可以为多种关系型数据库提供统一访问
* 它是由一组用于Java语言编写的类和接口组成

### 2.2 jdbc本质

* Java官方提供的一套规范(接口)
* 用于帮助开发人员快速实现不同关系型数据库的连接

### 2.3 jdbc快速入门

* 导入jar包
* 注册驱动：Class.forName("com.mysql.jdbc.Driver");
* 获取数据库连接：Connect con=DriverManager.getConnection("jdbc:mysql://192.168.59.129:3306/db2","root","root")
* 获取执行者对象：Statement stat=con.createStatement();
* 执行sql语句并返回结果：String sql="select * from user";、ResultSet rs=stat.executeQuery(sql);
* 处理结果：while(rs.next()){System.out.println(rs.getInt("id")+"\t"+rs.getString("name"))}
* 释放资源：con.close();、stat.close();

## 三 思维导图

![javaweb-xmind-jdbc-start-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jdbc-start-1.png