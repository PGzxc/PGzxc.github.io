---
title: JavaWeb开发思维导图之——JDBC自定义(40)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 43ce441f
date: 2024-12-19 08:47:46
---
## 一 概述

* 框架背景
* 框架编写

<!--more-->

## 二 内容详情

### 2.1 框架背景

1-案例中的重复代码

* 完整流程:定义必要信息、获取数据库连接、释放资源
* 核心业务：只有一条sql语句
* 抽取jdbc模板，封装方法(update、query)，专门执行增删改查sql语句
* 重复操作，放到模板里，简化使用步骤

2-源信息

* DataBaseData
* ParamterMetaData
* ResultSetMetaData

### 2.2 框架编写

* 用于执行增删功能的update方法
* 执行查询功能的方法

## 三 思维导图

![javaweb-xmind-jdbc-define-10][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jdbc-define-10.png