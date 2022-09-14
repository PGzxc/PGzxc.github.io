---
title: JavaWeb开发之——DDL操作数据库(06)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: 25f4b6ce
date: 2022-09-14 22:16:33
---
## 一 概述

* DDL-数据库操作概念
* DDL-数据库操作示例

<!--more-->

## 二 DDL-数据库操作概念

DDL-数据库操作包含：查询、创建、删除、使用

### 2.1 查询

DDL查询数据库使用下面的指令

```
show databases;
```

### 2.2 创建

创建数据库

```
create database 数据库名称;
```

创建数据库(判断，如果不存在则创建)

```
create database if not exists 数据库名称;
```

### 2.3 删除

删除数据库

```
drop database 数据库名称;
```

删除数据库(判断，如果存在则删除)

```
drop database if exists 数据库名称;
```

### 2.4 使用数据库

查看当前使用的数据库

```
select database();
```

使用数据库

```
use 数据库名称;
```

## 三 DDL-数据库操作示例

终端CMD通过如下的指令，进入mysql

```
mysql -uroot -padmin
```

### 3.1  查询-数据库示例

```
show databases;
```

查询结果

```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| db1                |
| information_schema |
| mysql              |
| performance_schema |
| sakila             |
| sys                |
| world              |
+--------------------+
7 rows in set (0.01 sec)
```

### 3.2 创建-数据库示例

创建数据库db2

```
create database db2;
```

创建db2执行结果

```
mysql> create database db2;
Query OK, 1 row affected (0.01 sec)
```

创建数据库db2(判断，如果不存在则创建)

```
 create database if not exists db2;
```

### 3.3 删除-数据库示例

删除数据库db2

```
drop database db2;
```

删除db2执行结果

```
mysql> drop database db2;
Query OK, 0 rows affected (0.02 sec)
```

删除数据库db2(判断，如果存在则删除)

```
mysql> drop database if exists db2;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

### 3.4 使用数据库-示例

使用数据库db1

```
mysql> use db1;
Database changed
```

查看当前使用的数据库

```
mysql> select database();
+------------+
| database() |
+------------+
| db1        |
+------------+
1 row in set (0.00 sec)
```

