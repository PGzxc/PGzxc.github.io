---
title: JavaWeb开发之——DDL-操作表-修改表和删除表(09)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: ef83848d
date: 2022-09-15 16:09:17
---
## 一  概述

* 表操作——删除表
* 表操作——修改表

<!--more-->

## 二 表操作——删除表

### 2.1 概念

1. 删除表

   ```
   drop table 表名;
   ```

2. 删除表时判断表是否存在

   ```
   drop table if exists 表名;
   ```

### 2.2 删除表-示例

#### 准备工作

登录mysql

```
mysql -uroot -padmin
```

查看数据库

```
show databases;
```

进入数据库db1

```
use db1;
```

查看表

```
mysql> show tables;
+---------------+
| Tables_in_db1 |
+---------------+
| tb_student    |
| tb_user       |
+---------------+
2 rows in set (0.01 sec)
```

#### 删除表-tb_user

删除表

```
mysql> drop table tb_user;
Query OK, 0 rows affected (0.06 sec)
```

删除表后(只省下tb_student)

```
mysql> show tables;
+---------------+
| Tables_in_db1 |
+---------------+
| tb_student    |
+---------------+
1 row in set (0.00 sec)
```

#### 删除表判断

```
mysql> drop table if exists tb_user;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

## 三 表操作——修改表

### 3.1 概念

1. 修改表名

   ```
   alter table 表名 rename to 新的表名;
   ```

2. 添加一列

   ```
   aler table 表名 add 列名 数据类型;
   ```

3. 修改数据类型

   ```
   aler table 表名 modify 列名 新的数据类型;
   ```

4. 修改列名和数据类型

   ```
   aler table 表名 change 列名 新列名 新数据类型;
   ```

5. 删除列

   ```
   aler table 表名 drop 列名;
   ```

### 3.2 修改表—示例

1. 修改表名(将tb_student修改为tb_stu)

   ```
   mysql> alter table tb_student rename to tb_stu;
   Query OK, 0 rows affected (0.04 sec)
   ```

   通过`show tables`查看修改后的表名
   
   ```
   mysql> show tables;
   +---------------+
   | Tables_in_db1 |
   +---------------+
   | tb_stu        |
   +---------------+
   1 row in set (0.00 sec)
   ```
   
2. 添加一列

   修改前查看表结构

   ```
   mysql> desc tb_stu;
   +----------+-------------+------+-----+---------+-------+
   | Field    | Type        | Null | Key | Default | Extra |
   +----------+-------------+------+-----+---------+-------+
   | id       | int         | YES  |     | NULL    |       |
   | name     | varchar(10) | YES  |     | NULL    |       |
   | gender   | char(1)     | YES  |     | NULL    |       |
   | birthday | date        | YES  |     | NULL    |       |
   | score    | double(5,2) | YES  |     | NULL    |       |
   | email    | varchar(64) | YES  |     | NULL    |       |
   | tel      | varchar(15) | YES  |     | NULL    |       |
   | status   | tinyint     | YES  |     | NULL    |       |
   +----------+-------------+------+-----+---------+-------+
   8 rows in set (0.01 sec)
   ```

   添加一列`address`

   ```
   mysql> alter table tb_stu add address varchar(50);
   Query OK, 0 rows affected (0.03 sec)
   Records: 0  Duplicates: 0  Warnings: 0
   ```

   通过`desc tb_stu`查看表结构

   ```
   mysql> desc tb_stu;
   +----------+-------------+------+-----+---------+-------+
   | Field    | Type        | Null | Key | Default | Extra |
   +----------+-------------+------+-----+---------+-------+
   | id       | int         | YES  |     | NULL    |       |
   | name     | varchar(10) | YES  |     | NULL    |       |
   | gender   | char(1)     | YES  |     | NULL    |       |
   | birthday | date        | YES  |     | NULL    |       |
   | score    | double(5,2) | YES  |     | NULL    |       |
   | email    | varchar(64) | YES  |     | NULL    |       |
   | tel      | varchar(15) | YES  |     | NULL    |       |
   | status   | tinyint     | YES  |     | NULL    |       |
   | address  | varchar(50) | YES  |     | NULL    |       |
   +----------+-------------+------+-----+---------+-------+
   9 rows in set (0.00 sec)
   ```

3. 修改数据类型-将address的类型由varchar修改为char

   ```
   mysql> alter table tb_stu modify address char(50);
   Query OK, 0 rows affected (0.05 sec)
   Records: 0  Duplicates: 0  Warnings: 0
   ```

   查看修改类型后的表结构

   ```
   mysql> desc tb_stu;
   +----------+-------------+------+-----+---------+-------+
   | Field    | Type        | Null | Key | Default | Extra |
   +----------+-------------+------+-----+---------+-------+
   | id       | int         | YES  |     | NULL    |       |
   | name     | varchar(10) | YES  |     | NULL    |       |
   | gender   | char(1)     | YES  |     | NULL    |       |
   | birthday | date        | YES  |     | NULL    |       |
   | score    | double(5,2) | YES  |     | NULL    |       |
   | email    | varchar(64) | YES  |     | NULL    |       |
   | tel      | varchar(15) | YES  |     | NULL    |       |
   | status   | tinyint     | YES  |     | NULL    |       |
   | address  | char(50)    | YES  |     | NULL    |       |
   +----------+-------------+------+-----+---------+-------+
   9 rows in set (0.00 sec)
   ```

4. 修改列名和数据类型—address列表为addr，类型修改为varchar

   ```
   mysql> alter table tb_stu change address addr varchar(30);
   Query OK, 0 rows affected (0.06 sec)
   Records: 0  Duplicates: 0  Warnings: 0
   ```

   查看修改后的表结构

   ```
   mysql> desc tb_stu;
   +----------+-------------+------+-----+---------+-------+
   | Field    | Type        | Null | Key | Default | Extra |
   +----------+-------------+------+-----+---------+-------+
   | id       | int         | YES  |     | NULL    |       |
   | name     | varchar(10) | YES  |     | NULL    |       |
   | gender   | char(1)     | YES  |     | NULL    |       |
   | birthday | date        | YES  |     | NULL    |       |
   | score    | double(5,2) | YES  |     | NULL    |       |
   | email    | varchar(64) | YES  |     | NULL    |       |
   | tel      | varchar(15) | YES  |     | NULL    |       |
   | status   | tinyint     | YES  |     | NULL    |       |
   | addr     | varchar(30) | YES  |     | NULL    |       |
   +----------+-------------+------+-----+---------+-------+
   9 rows in set (0.00 sec)
   ```

5. 删除列-删除addr列

   ```
   mysql> alter table tb_stu drop addr;
   Query OK, 0 rows affected (0.05 sec)
   Records: 0  Duplicates: 0  Warnings: 0
   ```

   删除列后的表结构

   ```
   mysql> desc tb_stu;
   +----------+-------------+------+-----+---------+-------+
   | Field    | Type        | Null | Key | Default | Extra |
   +----------+-------------+------+-----+---------+-------+
   | id       | int         | YES  |     | NULL    |       |
   | name     | varchar(10) | YES  |     | NULL    |       |
   | gender   | char(1)     | YES  |     | NULL    |       |
   | birthday | date        | YES  |     | NULL    |       |
   | score    | double(5,2) | YES  |     | NULL    |       |
   | email    | varchar(64) | YES  |     | NULL    |       |
   | tel      | varchar(15) | YES  |     | NULL    |       |
   | status   | tinyint     | YES  |     | NULL    |       |
   +----------+-------------+------+-----+---------+-------+
   8 rows in set (0.00 sec)
   ```

   



