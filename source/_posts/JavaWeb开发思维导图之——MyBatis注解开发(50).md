---
title: JavaWeb开发思维导图之——MyBatis注解开发(50)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 4305a51e
date: 2025-01-06 09:23:18
---
## 一 概述

* 介绍
* 常用注解
* 操作

<!--more-->

## 二 内容详情

### 2.1 介绍

* 映射配置文件操作
* 注解形式操作

### 2.2 常用注解

* @Select("查询SQL语句"): 执行查询操作注解
* @Insert("新增SQL语句"): 执行新增操作注解
* Update("修改SQL语句"): 执行修改操作注解
* @Delete("删除SQL语句"): 执行删除操作注解

### 2.3 操作

1-准备

* 表格(student)
* 项目：1-配置(jdbc.properties(数据库连接))、2-实体类(Student)

2-操作

* 注解查询:1-创建接口和查询方法、2-在核心配置文件中配置映射关系、3-编写测试类
* 注解新增：1-创建新增方法、2-编写测试类

3-注解修改

* 创建改方法
* 编写测试类

4-注解删除

* 创建删除方法
* 编写测试类

## 三 思维导图

![javaweb-xmind-mybatis-note-10][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-note-10.png