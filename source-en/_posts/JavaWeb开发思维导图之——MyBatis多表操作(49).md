---
title: JavaWeb开发思维导图之——MyBatis多表操作(49)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: d9257879
date: 2025-01-03 09:38:18
---
## 一 概述

* 多表模型
* 操作
* 多表操作小结

<!--more-->

## 二 内容详情

### 2.1 多表模型

* 1对1：在任意一方建立外键，关联对方的主键
* 1对多: 在多的一方建立外键，关联少的一方主键
* 多对多: 借助中间表，中间表至少2个字段，分别关联两张表的主键

### 2.2 操作

1-1对1

* 模型: 人和身份证
* 准备：
  - 1-表(person+card(外键关联person))
  - 2-实体类(Card(包含Person)+Person)
  - 3-MyBatisConfig.xml(全局配置:数据库连接、log4j、别名等)
* 步骤：
  - 1-新建1对1操作配置文件: oneToOneMapper.xml
  - 2-引入到核心配置文件(MyBatisConfig.xml): \<mapper resource="one...xml"/>
  - 3-OneToOneMapper.java接口定义操作方法:selectAll
  - 4-oneToOneMapper.xml配置SQL语句
  - 5-编写测试类

2-1对多

* 模型: 班级和学生，一个班级有多个学生
* 准备
  - 1-表(班级(classes)+学生(student,cid外键))
  - 2-实体类(Classes(学生集合)+Student)
* 3-步骤
  - 1-新建1对多操作配置文件: oneToManyMapper.xml
  - 2-引入到核心配置文件(MyBatisConfig.xml): \<mapper resource="one...xml"/>
  - 3-OneToManyMapper.java接口定义操作方法:selectAll
  - 4-oneToManyMapper.xml配置SQL语句
  - 5-编写测试类

3-多对多

* 模型: 班级和课程，一个学生可以选择多门课程，一个课程可以被多个学生所选
* 2-准备
  - 1-表(课程(course)+学生(student)+中间表(stu_cr))
  - 2-实体类(Course+Student(多门课程))
* 3-步骤
  - 1-新建多对多操作配置文件: ManyToManyMapper.xml
  - 2-引入到核心配置文件(MyBatisConfig.xml): \<mapper resource="many...xml"/>
  - 3-ManyToManyMapper.java接口定义操作方法:selectAll
  - 4-ManyToManyMapper.xml配置SQL语句
  - 5-编写测试类

### 2.3 多表操作小结

* 多表模型分类：1对1, 1对多, 多对多
* \<resultMap>
* \<id>: 配置主键映射关系标签
* \<result>
* \<association>
* \<collection>

## 三 思维导图

![javaweb-xmind-mybatis-table-9][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-table-9.png