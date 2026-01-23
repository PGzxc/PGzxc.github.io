---
title: JavaWeb开发思维导图之——MySQL数据库多表操作(21)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: '793e5617'
date: 2024-11-19 10:47:17
---
## 一 概述

* 概念
* 分类
* 多表查询

<!--more-->

## 二 内容详情

### 2.1  概念

* 多张表
* 表与表之间由关联关系
* 关系通过外键约束实现

### 2.2 分类

1-1对1

* 使用场景: 人和身份证
* 建表原则: 在任意一个表建立外键，去关联另外一个表的主键
* 表: 1-人(person)、2-身份证(card)
* 示例：1-create table peson(id int primmary key auto_increment,name varchar(20));//person表

2-1对多

* 使用场景：1-用户和订单(1用户多订单)、2-商品分类和商品(1分类多商品)
* 建表原则：在多的一方建立外键约束，关联少的一方主键
* 表：1-用户表(user)、2-订单表(orderlist)
* 示例：create table orderlist(id int primary key auto_increment,number varchar(20),uid int, constraint ou_fk1 foreign key (uid) references user(id));//orderlist创建约束

3-多对多

* 使用场景：学生和课程
* 建表原则：需要借助第三张表，中间至少包含两个列、两个列作为中间表的外键，分别关联两张表的主键
* 表：1-学生表(stuent)、2-课程表(course)、3-中间表(stu_course)
* 示例：create table stu_course(id int primary key auto_increment,sid int, cid int, constraint sc_fk1 foreign key (sid) references student(id),constraint sc_fk2 foreign key (cid) references course(id));//中间表

### 2.3 多表查询

1-内连接查询

* 查询原理: 内连接查询的是两张表有交集的部分数据(有主外键关联的数据)
* 查询语法：1-显式内连接: select 列名 from 表名1 [inner] join 表名2 on 条件;、2-隐式内连接: select 列名 from 表名1,表名2 where 条件;
* 示例：查询用户姓名, 年龄。和订单编号: select u.name,u.age,o.number from user u inner join orderlist o on o.uid=u.id;

2-外连接查询

* 左外连接：查询语法: select 列名 from 表名1 left [outer] join 表名2 on 条件;
* 右外连接：查询语法: select 列名 from 表名1 right [outer] join 表名2 on 条件;

3-子查询

* 概念：查询语句中嵌套了查询语句，我们将嵌套的查询称为子查询
* 分类：1-结果是单行单列的、2-结果是多行单列的、3-结果是多行多列的

4-自关联查询

* 1-要求：查询所有员工的姓名极其上级的姓名, 没有上级的员工也要查询
* 3-示例：select e1.id,e1.name,e1.mgr,e2.id,e2.name from employee e1 left outer join employee e2 on e1.mgr=e2.id;

## 三 思维导图

![javaweb-ximd-mysql-table-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ximd-mysql-table-5.png