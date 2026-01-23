---
title: JavaWeb开发思维导图之——JDBC事务(36)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: cb02a1c6
date: 2024-12-13 09:04:49
---
## 一 概述

* 管理事务功能类:Connection
* 演示(批量添加数据并在业务层处理事务)

<!--more-->

## 二 内容详情

### 2.1 管理事务功能类:Connection

* 开启事务: setAutoCommit(autoCommit);//参数为false,开启事务
* 提交事务: commit();
* 回滚事务: rollback();

### 2.2 演示(批量添加数据并在业务层处理事务)

* 在UserServiceImpl.java中处理事务
* 开启事务:con.setAutoCommit(false);
* 业务逻辑
* 处理成功，提交事务:con.commit();
* 处理失败，回滚:con.rollback();

## 三 思维导图

![java-xmind-jdbc-commit-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/java-xmind-jdbc-commit-6.png