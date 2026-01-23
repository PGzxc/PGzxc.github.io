---
title: JavaWeb开发思维导图之——MyBatis传统方式实现Dao层(45)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: fd4fdba8
date: 2024-12-30 09:08:00
---
## 一 概述

* 传统方式dao
* LOG4J

<!--more-->

## 二 内容详情

### 2.1 传统方式dao

1-环境介绍

* 分层思想：控制层(controller)、业务层(service)、持久层(dao)
* 调用流程: 控制层—>业务层—>持久层—>DB
* 项目：1-mapper(持久层)、2-service(业务层-调用mapper实现)、3-controller(调用service作为测试)

2-功能实现：controller(增删改查)

### 2.2 LOG4J

1-介绍

* 开发中，排查问题需要输出MyBits真正执行的SQL语句、参数、结果等信息
* 借助LOG4J功能可以实现上述信息的输出

2-步骤

* 导入jar包
* 修改核心配置文件
* 在src下编写LOG4J配置文件

## 三 思维导图

![javaweb-xmind-mybatis-dao-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-dao-5.png