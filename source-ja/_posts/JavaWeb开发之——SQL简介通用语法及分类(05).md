---
title: JavaWeb开发之——SQL简介&通用语法及分类(05)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: b9c7098
date: 2022-09-14 17:16:36
---
## 一 概述

* SQL简介
* SQL通用语法
* SQL分类

<!--more-->

## 二 SQL简介

* 英文：Structured Query Language，简称SQL
* 结构化查询语言，一门操作关系型数据库的编程语言
* 定义操作所有关系型数据库的统一标准
* 对于同一个需求，每一种数据库操作的方式可能会存在一些不一样的地方，我们称为”方言“

## 三 SQL通用语法

### 3.1 SQL语句可以单行或多行书写，以分号结尾

查询MySQL下有多少个数据库

```
show databases;
```

```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sakila             |
| sys                |
| world              |
+--------------------+
6 rows in set (0.03 sec)
```

### 3.2 MySQL数据库的SQL语句不区分大小写，关键字建议使用大写

```
show databases;
```

与

```
Show DataBases;
```

查询结果相同

### 3.3 注释

#### 说明

* 单行注释：`--` 注释内容或`#`注释内容(MySQL特有)
* 多行注释：`/*注释*/`

#### 示例

单行注释(--后有空格)

```
show databases;-- 查询所有数据库名称
```

```
show databases;#查询所有数据库名称
```

多行注释

```
show databases;/*查询所有数据库名称*/
```

## 四 SQL分类

### 4.1 概念

* DDL(Data Definition Language)数据库定义语言，用来定义数据库对象
* DML(Data Maniplation Language)数据库操作语言，用来对数据库表中的数据进行增删改
* DQL(Data Query Language)数据库查询语言，用来查询数据库中表的记录(数据)
* DCL(Data Control Language)数据库控制语言，用来定义数据库的访问权限和安全级别，及创建用户

### 4.2 分类说明

![][1]

说明：

* DDL：操作数据库，表等
* DML：对表中的数据进行增删改
* DQL：对表中的数据进行查询
* DCL：对数据库进行权限控制


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-05-mysql-category.png