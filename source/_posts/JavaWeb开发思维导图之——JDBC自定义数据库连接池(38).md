---
title: JavaWeb开发思维导图之——JDBC自定义数据库连接池(38)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: a0684af6
date: 2024-12-17 09:03:55
---
## 一 概述

* DataSource接口
* 自定义数据库连接池
* 自定义链接池测试
* 归还连接

<!--more-->

## 二 内容详情

### 2.1 DataSource接口

* javax.sql.DataSource接口: 数据源(数据库连接池)。Java官方提供的数据库连接池规范
* 如果想完成数据库连接池技术，就必须实现DataSource接口
* 核心功能: 获取数据库连接对象: Connection getConnection();

### 2.2 自定义数据库连接池

* 定义一个类,实现DataSource接口
* 定义一个容器，用于保存多个Connection连接对象
* 定义静态代码块，通过JDBC工具类获取10个连接保存到容器中
* 重写getConnection方法，从容器中获取一个连接并返回
* 定义getSize方法，用于获取容器的大小并返回

### 2.3 自定义链接池测试

1-步骤

* 创建连接池对象
* 通过连接池对象获取连接对象
* 查询学生表的全部信息
* 执行sql语句，接收结果集
* 处理结果集
* 释放资源

2-问题：执行后，连接池-1(没有归还)

### 2.4 归还连接

* 继承方式
* 装饰设计模式
* 适配器设计模式
* 动态代理方式

## 三 思维导图

![javaweb-xmind-jdbc-con-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jdbc-con-8.png