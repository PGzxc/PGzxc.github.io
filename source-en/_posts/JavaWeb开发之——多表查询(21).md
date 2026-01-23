---
title: JavaWeb开发之——多表查询(21)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: 55c7f867
date: 2022-11-26 17:40:19
---
## 一 概述

* 多表查询—简介
* 多表查询—内连接&外连接
* 多表查询—子查询

<!--more-->

## 二 多表查询—简介

### 2.1 概念

多表查询顾名思义就是从多张表中一次性的查询出我们想要的数据。

### 2.2 SQL数据准备

```
DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;
# 创建部门表
CREATE TABLE dept(
did INT PRIMARY KEY AUTO_INCREMENT,
dname VARCHAR(20)
);
# 创建员工表
CREATE TABLE emp (
id INT PRIMARY KEY AUTO_INCREMENT,
NAME VARCHAR(10),
gender CHAR(1), -- 性别
salary DOUBLE, -- 工资
join_date DATE, -- 入职日期
dep_id INT,
FOREIGN KEY (dep_id) REFERENCES dept(did) -- 外键，关联部门表(部门表的主键)
);
-- 添加部门数据
INSERT INTO dept (dNAME) VALUES ('研发部'),('市场部'),('财务部'),('销售部');
-- 添加员工数据
INSERT INTO emp(NAME,gender,salary,join_date,dep_id) VALUES
('孙悟空','男',7200,'2013-02-24',1),
('猪八戒','男',3600,'2010-12-02',2),
('唐僧','男',9000,'2008-08-08',2),
('白骨精','女',5000,'2015-10-07',3),
('蜘蛛精','女',4500,'2011-03-14',1),
('小白龙','男',2500,'2011-02-14',null);
```

### 2.3 多表查询

#### 多表查询-所有

查询语句

```
select * from emp,dept; -- 从emp和dept表中查询所有的字段数据
```

查询结果

![][1]
查询结果说明
从上面的结果我们看到有一些无效的数据，如 孙悟空 这个员工属于1号部门，但也同时关联的2、3、4号部门。所以我们要通过限制员工表中的 dep_id 字段的值和部门表 did 字段的值相等来消除这些无效的数据，

#### 多表查询-去除无效数据

查询语句

```
select * from emp,dept where emp.dep_id = dept.did;
```

查询结果
![][2]

查询结果说明

上面语句就是连接查询

### 2.4 多表查询-总结

#### 连接查询

图示：

![][3]
分类：

* 内连接：相当于查询AB交集数据
* 外连接查询：
  * 左外连接查询：相当于查询A表所有数据和交集部分数据
  * 右外连接查询：相当于查询B表所有数据和交集部分数据

#### 子查询

* 子查询和连接查询可相互转换

## 三 多表查询—内连接&外连接

### 3.1 内连接查询

#### 内连接语法

```
-- 隐式内连接
SELECT 字段列表 FROM 表1,表2… WHERE 条件;
-- 显示内连接
SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 条件;
```

内连接相当于查询AB交集数据

#### 案例-隐式内连接

隐式内连接-查询所有

```
select * from emp,dept where emp.dep_id = dept.did;
```

查询 emp的 name， gender，dept表的dname

```
select emp.name,emp.gender, dept.dname from emp,dept where emp.dep_id = dept.did;
```

给表指定别名

```
select t1.name,t1.gender, t2.dname from emp t1,dept t2 where t1.dep_id = t2.did;
```

#### 案例-显示内连接

语法

```
select * from emp inner join dept on emp.dep_id = dept.did;
-- 上面语句中的inner可以省略，可以书写为如下语句
select * from emp join dept on emp.dep_id = dept.did;
```

查询结果
![][4]


### 3.2 外连接查询

#### 外连接语法

```
-- 左外连接
SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件;
-- 右外连接
SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 条件;
```

说明：

* 左外连接：相当于查询A表所有数据和交集部分数据
* 右外连接：相当于查询B表所有数据和交集部分数据

#### 案例-查询emp表所有数据和对应的部门信息(左外连接)

查询语句

```
select * from emp left join dept on emp.dep_id = dept.did;
```

查询结果：

结果显示查询到了左表（emp）中所有的数据及两张表能关联的数据。

#### 案例-查询dept表所有数据和对应的员工信息（右外连接）

查询语句

```
select * from emp right join dept on emp.dep_id = dept.did;
```

查询结果

结果显示查询到了右表（dept）中所有的数据及两张表能关联的数据。

要查询出部门表中所有的数据，也可以通过左外连接实现，只需要将两个表的位置进行互换：

```
select * from dept left join emp on emp.dep_id = dept.did;
```

## 四 多表查询—子查询

### 4.1 概念

#### 子查询

查询中嵌套查询，称嵌套查询为子查询。

#### 子查询示例—需求：查询工资高于猪八戒的员工信息。

来实现这个需求，我们就可以通过二步实现，第一步：先查询出来 猪八戒的工资

```
select salary from emp where name = '猪八戒';
```

第二步：查询工资高于猪八戒的员工信息

```
select * from emp where salary > 3600;
```

第三步中的3600可以通过第一步的sql查询出来，所以将3600用第一步的sql语句进行替换

```
select * from emp where salary > (select salary from emp where name = '猪八戒');
```

这就是查询语句中嵌套查询语句。

### 4.2 子查询根据查询结果不同，作用不同
子查询语句结果是单行单列，子查询语句作为条件值，使用 = != > < 等进行条件判断

```
select 字段列表 from 表 where 字段名 =(子查询);
```

子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断

```
select 字段列表 from 表 where 字段名 in(子查询);
```

子查询语句结果是多行多列，子查询语句作为虚拟表

```
select 字段列表 from(子查询) where 条件;
```

### 4.3 案例

#### 查询 '财务部' 和 '市场部' 所有的员工信息

```
-- 查询 '财务部' 或者 '市场部' 所有的员工的部门did
select did from dept where dname = '财务部' or dname = '市场部';
select * from emp where dep_id in (select did from dept where dname = '财务部' or dname =
'市场部');
```

#### 查询入职日期是 '2011-11-11' 之后的员工信息和部门信息

```
-- 查询入职日期是 '2011-11-11' 之后的员工信息
select * from emp where join_date > '2011-11-11' ;
-- 将上面语句的结果作为虚拟表和dept表进行内连接查询
select * from (select * from emp where join_date > '2011-11-11' ) t1, dept where
t1.dep_id = dept.did;
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-21-sql-query-all.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-21-sql-query-relate.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-21-two-table-relate.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-21-sql-query-inner-join.png