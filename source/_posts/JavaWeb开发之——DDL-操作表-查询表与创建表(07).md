---
title: JavaWeb开发之——DDL-操作表-查询表与创建表(07)
abbrlink: 86a7481d
date: 2022-09-14 22:56:11
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
---
## 一 概述

* DDL-操作表(CRUD)
* 查询表
* 创建表

<!--more-->

## 二 DDL-操作表(CRUD)

* 创建(Create)
* 查询(Retrieve)
* 修改(Update)
* 删除(Delete)

## 三 查询表

### 3.1 概念

查询当前数据库下所有表名称

```
show tables;
```

查询表结构

```
desc 表名称;
```

### 3.2 查询表示例

#### 查询当前数据中所有的表

进入mysql数据库

```
use mysql;
```

查询mysql数据库中所有的表

```
mysql> show tables;
+------------------------------------------------------+
| Tables_in_mysql                                      |
+------------------------------------------------------+
| columns_priv                                         |
| component                                            |
| db                                                   |
| default_roles                                        |
| engine_cost                                          |
| func                                                 |
| time_zone                                            |
| time_zone_leap_second                                |
| time_zone_name                                       |
| time_zone_transition                                 |
| time_zone_transition_type                            |
| user                                                 |
+------------------------------------------------------+
37 rows in set (0.00 sec)
```

#### 查询func表的结构(desc func)

```
mysql> desc func;
+-------+------------------------------+------+-----+---------+-------+
| Field | Type                         | Null | Key | Default | Extra |
+-------+------------------------------+------+-----+---------+-------+
| name  | char(64)                     | NO   | PRI |         |       |
| ret   | tinyint                      | NO   |     | 0       |       |
| dl    | char(128)                    | NO   |     |         |       |
| type  | enum('function','aggregate') | NO   |     | NULL    |       |
+-------+------------------------------+------+-----+---------+-------+
4 rows in set (0.01 sec)
```

## 四 创建表

### 4.1 创建表

```
create table 表名(
		字段1 数据类型1,
		字段2 数据类型2，
		....
		字段n 数据类型n
);
```

注：最后一行末尾，不能加逗号

### 4.2 创建表示例

#### 表结构(tb_user)

tb_user

|  id  | username | password |
| :--: | :------: | :------: |
|      |          |          |
|      |          |          |

#### 创建表过程

使用哪个数据库创建表

```
use db1;
```

创建表

```
mysql> create table tb_user(
    -> id int,
    -> username varchar(20),
    -> password varchar(32)
    -> );
Query OK, 0 rows affected (0.03 sec)
```

注：括号内为字段的最大长度，如username的长度不超过20个字符

#### 查询刚创建的表

查询db1下所有的表(如下：数据库db1中只有一个tb_user表)

```
mysql> show tables;
+---------------+
| Tables_in_db1 |
+---------------+
| tb_user       |
+---------------+
1 row in set (0.00 sec)
```

查询tb_user表的结构

```
mysql> desc tb_user;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| id       | int         | YES  |     | NULL    |       |
| username | varchar(20) | YES  |     | NULL    |       |
| password | varchar(32) | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

