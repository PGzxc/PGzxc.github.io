---
title: JavaWeb开发之——约束-外键约束(19)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: c3d92824
date: 2022-10-21 23:59:51
---
## 一 概述

* 外键约束概念
* 有无外键对比
* 无表创建外键
* 有表创建/删除外键

<!--more-->

## 二 外键约束概念

### 2.1 概念

外键用来让两个表的数据之间建立链接，保证数据的一致性和完整性

### 2.2 语法

1-添加约束

```
-- 创建表时添加外键约束
create table 表名(
	列名 数据类型,
	...
	[constraint][外键名称] foreign key(外键列名) feferences 主表(主表列名)

);
```

```
-- 建完表后添加外键约束
alert table 表名 add constraint 外键名称 foreign key(外键字段名称) references 主键名称(主表列名称);
```

2-删除约束

```
alert table 表名 drop foreign key 外键名称;
```

## 三  有无外键对比

### 3.1 表格

![][1]

### 3.2 有无外键对比

|    对比    | 有外键 | 无外键 |
| :--------: | :----: | :----: |
| 逆向表模型 | ![3][] | ![][2] |
|  删除数据  | ![][5] | ![][4] |

## 四 无表创建外键

### 4.1 无外键

```
-- 删除表
DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;


-- 部门表
CREATE TABLE dept(
	id int primary key auto_increment,
	dep_name varchar(20),
	addr varchar(20)
);
-- 员工表 
CREATE TABLE emp(
	id int primary key auto_increment,
	name varchar(20),
	age int,
	dep_id int		
);
-- 添加 2 个部门
insert into dept(dep_name,addr) values
('研发部','广州'),('销售部', '深圳');

-- 添加员工,dep_id 表示员工所在的部门
INSERT INTO emp (NAME, age, dep_id) VALUES 
('张三', 20, 1),
('李四', 20, 1),
('王五', 20, 1),
('赵六', 20, 2),
('孙七', 22, 2),
('周八', 18, 2);
```

### 4.2 有外键

```
-- 删除表
DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;


-- 部门表
CREATE TABLE dept(
	id int primary key auto_increment,
	dep_name varchar(20),
	addr varchar(20)
);
-- 员工表 
CREATE TABLE emp(
	id int primary key auto_increment,
	name varchar(20),
	age int,
	dep_id int,

	-- 添加外键 dep_id,关联 dept 表的id主键
	CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES dept(id)
		
);
-- 添加 2 个部门
insert into dept(dep_name,addr) values
('研发部','广州'),('销售部', '深圳');

-- 添加员工,dep_id 表示员工所在的部门
INSERT INTO emp (NAME, age, dep_id) VALUES 
('张三', 20, 1),
('李四', 20, 1),
('王五', 20, 1),
('赵六', 20, 2),
('孙七', 22, 2),
('周八', 18, 2);
```

## 五 有表创建/删除外键

### 5.1 删除外键

```
alter table emp drop FOREIGN key fk_emp_dept;
```

### 5.2 建完表后，添加外键

```
alter table emp add CONSTRAINT fk_emp_dept FOREIGN key(dep_id) REFERENCES dept(id);
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-19-foreign-key-tabs.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-19-foreign-model-none.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-19-foreign-model-has.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-19-foreign-delete-success.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-19-foreign-delete-fail.png