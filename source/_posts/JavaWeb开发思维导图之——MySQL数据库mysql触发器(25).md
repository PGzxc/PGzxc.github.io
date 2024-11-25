---
title: JavaWeb开发思维导图之——MySQL数据库mysql触发器(25)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 3fb57c5f
date: 2024-11-25 09:50:41
---
## 一 概述

* 介绍
* 分类
* 操作

<!--more-->

## 二 内容详情

### 2.1 介绍

* 触发器是与表有关的数据库对象，在insert、update、delete之前或之后触发并执行触发器中定义的SQL语句
* 可以协助应用系统在数据库端确保数据的完整性、日志记录、数据校验等操作
* 使用别名new和old来引用触发器中发生变化的内容记录

### 2.2 分类

* insert型触发器
* update型触发器：
* delete型触发器

### 2.3 操作

1-语法

```
create trigger 触发器名称 before|after insert|update|delete on 表名 for each row begin 触发器功能 end $
```

2-分类

* insert触发器：insert into account values (null,'王五',2000);
* update触发器：update account set money=2000 where id=2;
* delete触发器：delete from account where id=3;
* 查看触发器：show trigers;
* 删除触发器：drop trigger 触发器名称;

## 三 思维导图

![javaweb-xmind-mysql-triger-9][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-triger-9.png