---
title: JavaWeb开发之——DQL-基础查询(12)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: 91a065b4
date: 2022-10-20 17:05:20
---
## 一 概述

DQL:Data QueryLanguage 数据查询语言，本文介绍如下内容：

* 查询多个字段
* 去除重复记录
* 起别名

<!--more-->

## 二 DQL查询语法介绍

### 2.1 查询语法

```
select
	字段列表
from 
	表名列表
where 
	条件列表
group by
	分组字段
having
	分组后条件
order by
	排序字段
limit
	分页限定
```

### 2.2 SQL语句准备

```
-- 删除stu表
drop table if exists stu;


-- 创建stu表
CREATE TABLE stu (
 id int, -- 编号
 name varchar(20), -- 姓名
 age int, -- 年龄
 sex varchar(5), -- 性别
 address varchar(100), -- 地址
 math double(5,2), -- 数学成绩
 english double(5,2), -- 英语成绩
 hire_date date -- 入学时间
);

-- 添加数据
INSERT INTO stu(id,NAME,age,sex,address,math,english,hire_date) 
VALUES 
(1,'马运',55,'男','杭州',66,78,'1995-09-01'),
(2,'马花疼',45,'女','深圳',98,87,'1998-09-01'),
(3,'马斯克',55,'男','香港',56,77,'1999-09-02'),
(4,'柳白',20,'女','湖南',76,65,'1997-09-05'),
(5,'柳青',20,'男','湖南',86,NULL,'1998-09-01'),
(6,'刘德花',57,'男','香港',99,99,'1998-09-01'),
(7,'张学右',22,'女','香港',99,99,'1998-09-01'),
(8,'德玛西亚',18,'男','南京',56,65,'1994-09-02');
```

### 2.3 执行SQL语句

* 在数据库(如db1)上右键“新建查询”
* 将上述SQL命令复杂到内容区域
* 点击运行

执行后的效果
![][1]

## 三 查询多个字段

### 3.1 使用说明

```
select 字段列表 from 表名;
select * from 表名;--查询所有数据
```

### 3.2 示例

#### 查询全部内容

查询语句

```
select * from stu;
```
查询结果
![][2]
说明：实际开发中，最好不适用“*”，无法明确查询结果

####  查询多个字段(姓名+年龄)

查询语句

```
select name,age from stu;
```

查询结果
![][3]

## 四 去除重复记录

### 4.1 使用说明

```
select distinct 字段列表 from 表名;
```

### 4.2 示例

####  查询地址信息(重复数据)

查询语句

```
select address from stu;
```

查询结果(有重复数据)
![][4]

#### 查询地址信息(去除重复数据-distinct)

查询语句

```
select distinct address from stu;
```

查询结果(去除重复数据)
![][5]

## 五 起别名

### 5.1 使用说明

```
as: as也可以省略
```

### 5.2 示例

####  查询姓名，数学成绩，英语成绩

查询语句

```
select name,math,english from stu;
```

查询结果
![][6]

#### 查询姓名，数学成绩，英语成绩(给列起别名)

查询语句

```
select name as 姓名,math as 数学成绩,english as 英语成绩 from stu;
```

查询结果
![][7]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-sql-12-create-stu.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-sql-12-sql-all.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-sql-12-sql-name-age.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-sql-12-sql-address.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-sql-12-sql-address-distin.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-sql-12-sql-math-englist.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-sql-12-sql-math-englist-as.png