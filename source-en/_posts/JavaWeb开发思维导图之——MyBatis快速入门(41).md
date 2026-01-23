---
title: JavaWeb开发思维导图之——MyBatis快速入门(41)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 6fdfde42
date: 2024-12-20 08:52:56
---
## 一 概述

* 框架介绍
* ORM介绍
* MyBatis介绍
* 快速入门

<!--more-->

## 二 内容详情

### 2.1 框架介绍

* 框架是一款半成品软件
* 基于这个半成品，定制个性化需求

### 2.2 ORM介绍

1-概念

* Object Relational Mapping缩写
* 对象关系映射
* 指的是持久化数据和实体对象的映射关系，为了解决面向对象与关系型数据库存在的互不匹配现象的技术

2-映射规则

* 数据表—>类
* 表字段—>类属性
* 表数据—>对象

### 2.3 MyBatis介绍

1-JDBC

* 原始JDBC操作问题
* 原始jdbc操作问题解决方案

2-MyBatis

* 基于Java的持久层框架，内部封装jdbc，开发者只需关注sql语句本身
* 通过xml或注解方式将Statement配置起来，通过java和Statement中SQL动态参数映射成最终SQL语句
* 采用ORM思想解决了实体和数据库映射问题，执行完SQL并将结果映射为Java对象
* MyBatis官网:https://blog.mybatis.org/

### 2.4 快速入门

* 数据准备
* 导入jar包
* 在src下创建映射文件
* 在src下创建核心配置文件
* 编写测试类完成相关API的使用
* 运行查看结果

## 三 思维导图

![javaweb-xmind-mybatis-start-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-start-1.png