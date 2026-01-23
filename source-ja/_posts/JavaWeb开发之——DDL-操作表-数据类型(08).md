---
title: JavaWeb开发之——DDL-操作表-数据类型(08)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: f350b576
date: 2022-09-14 23:51:50
---
## 一 概述

* MySQL数据类型
* 创建案例-设计学生表

<!--more-->

## 二 MySQL数据类型

### 2.1 MySQL支持类型

MySQL支持多种类型，可以分为三类

* 数值
* 日期
* 字符串

### 2.2 MySQL数据类型-分类

#### 数值类型

|   分类   |   数据类型   | 大小  |      描述      |
| :------: | :----------: | :---: | :------------: |
| 数值类型 |   TINYINT    | 1byte |    小整数值    |
| 数值类型 |   SMALLINT   | 2byte |    大整数值    |
| 数值类型 |  MEDIUMINT   | 3byte |    大整数值    |
| 数值类型 | INT或INTEGER | 4byte |    大整数值    |
| 数值类型 |    BIGINT    | 8byte |   极大整数值   |
| 数值类型 |    FLOAT     | 4byte | 单精度浮点数值 |
| 数值类型 |    DOUBLE    | 8byte | 双精度浮点数值 |
| 数值类型 |   DECIMAL    |       |     小数值     |

#### 日期和时间类型

|      分类      | 数据类型  | 大小 |           描述           |
| :------------: | :-------: | :--: | :----------------------: |
| 日期和时间类型 |   DATE    |  3   |          日期值          |
| 日期和时间类型 |   TIME    |  3   |     时间值或持续时间     |
| 日期和时间类型 |   YEAR    |  1   |          年份值          |
| 日期和时间类型 | DATETIME  |  8   |     混合日期和时间值     |
| 日期和时间类型 | TIMESTAMP |  4   | 混合日期和时间值，时间戳 |

#### 字符串类型

|    分类    |  数据类型  |        大小        |             描述              |
| :--------: | :--------: | :----------------: | :---------------------------: |
| 字符串类型 |    CHAR    |    0-255 bytes     |          定长字符串           |
| 字符串类型 |  VARCHAR   |   0-65535 bytes    |          变长字符串           |
| 字符串类型 |  TINYBLOB  |    0-255 bytes     | 不超过255个字符的二进制字符串 |
| 字符串类型 |  TINYTEXT  |    0-255 bytes     |         短文本字符串          |
| 字符串类型 |    BLOB    |   0-65535 bytes    |    二进制形式的长文本数据     |
| 字符串类型 |    TEXT    |   0-65535 bytes    |          长文本数据           |
| 字符串类型 | MEDIUMBLOB |  0-16777215 bytes  | 二进制形式的中等长度文本数据  |
| 字符串类型 | MEDIUMTEXT |  0-16777215 bytes  |       中等长度文本数据        |
| 字符串类型 |  LONGBLOG  | 0-4294967295 bytes |   二进制长度的极大文本数据    |
| 字符串类型 |  LONGTEXT  | 0-4294967295 bytes |         极大文本数据          |

### 2.3 说明

* double类型要指定精度，第一个是数值类型的总长度，第二个是小数点后保留的位数如:score double(5,2)
* 生日类型为date，如birthday date
* name char(10)：10个字符空间，存储性能高，浪费空间
* name varchar(10)：2个字符空间，存储性能低，节约空间

## 三  创建案例-设计学生表

### 3.1 需求

设计一张学生表，请注重**数据类型**、**长度的合理性**

1. 编号
2. 姓名，姓名最长不超过10个汉字
3. 性别，因为取值只有2种可能，因此最多一个汉字
4. 生日，取值为年月日
5. 入学成绩，小数点后保留2位
6. 邮件地址，最大长度不超过64
7. 家庭联系电话，不一定是手机号，可能会出现-等字符
8. 学生状态(用数字表示，正常、休学、毕业...)

### 3.2 创建表

```
mysql> create table tb_student(
    -> id int,
    -> name varchar(10),
    -> gender char(1),
    -> birthday date,
    -> score double(5,2),
    -> email varchar(64),
    -> tel varchar(15),
    -> status tinyint
    -> );
Query OK, 0 rows affected, 1 warning (0.03 sec)
```

### 3.3 查看表结构

```
mysql> desc tb_student;
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

