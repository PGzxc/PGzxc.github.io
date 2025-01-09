---
title: JavaWeb开发思维导图之——MyBatis构建SQL语句(52)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 7a3d7fe8
date: 2025-01-08 08:51:12
---
## 一 概述

* SQL构建对象介绍
* SQL语句方法
* 操作

<!--more-->

## 二 内容详情

### 2.1 SQL构建对象介绍

* 注解开发时，SQL语句自己拼写，容易出错
* MyBatis提供了org.apache.ibatis.jdbc.SQL功能类，专门构建SQL语句

### 2.2 SQL语句方法

1-语法

* select(String...column)//根据字段拼接查询语句
* from(String..table)//根据表名拼接语句
* where(string...condition)//根据条件拼接语句
* insert_into(string table)//根据表名拼接新增语句
* values(String column,String values)根据字段和值拼接插数据语句
* update(String table)//根据表名拼接修改语句
* delete_from(String table)//根据表名拼接删除语句

2-示例：new SQL(){SELECT(*) FROM("stuent");}.toString()

### 2.3 操作

1-查询

* 介绍：定义功能并提供获取查询SQL语句的方法
* @SelectProvider：生成查询用的SQL语句注解
* 步骤：1-定义SQL操作类ReturnSql；2-定义查询你sql语句方法:getSelectAll；3-替换原来的@Select注解

2-新增

* 介绍：定义功能并提供获取新增SQL语句的方法
* @InsertProvider：生成新增用的SQL语句注解
* 步骤：1-定义SQL操作类ReturnSql；2-定义新增sql语句方法:getInsert(stu)；3-替换原来的@Select注解

3-修改

* 介绍：定义功能并提供获取修改SQL语句的方法
* @UpdateProvider：生成修改用的SQL语句注解
* 步骤：1-定义SQL操作类ReturnSql；2-定义修改sql语句方法:getUpdate(stu)；3-替换原来的@Select注解

4-删除

* 介绍：定义功能并提供获取删除SQL语句的方法
* @DeleteProvider：生成删除用的SQL语句注解
* 步骤：1-定义SQL操作类ReturnSql；2-定义删除sql语句方法:getDelete(id)；3-替换原来的@Select注解

## 三 思维导图

![javaweb-xmind-mybatis-tables-11][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-sql-12.png