---
title: JavaWeb开发之——约束-概述及示例(18)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: 9e798da9
date: 2022-10-21 22:30:31
---
## 一 概述

* 约束概述和分类
* 约束示例

<!--more-->

## 二 约束概述和分类

### 2.1 约束的概念

* 约束是用于表中列上的规则，用于限制加入表的数据
* 约束的存在保证了数据库中数据的正确性、有效性和完整性

### 2.2 约束的分类

| 约束名称 |                             描述                             |   关键字    |
| :------: | :----------------------------------------------------------: | :---------: |
| 非空约束 |                 保证列中所有数据不能有null值                 |  not null   |
| 唯一约束 |                   保证列中所有数据各不相同                   |   unique    |
| 主键约束 |           主键是一行数据的唯一标识，要求非空且唯一           | primary key |
| 检查约束 |                   保证列中的值满足某一条件                   |    check    |
| 默认约束 |               保存数据时，未指定值则采用默认值               |   default   |
| 外键约束 | 外键用来让两个表的数据之间建立链接，保证数据的一致性和完整性 | foreign key |

Tips:MySQL不支持检查约束

## 三 约束示例-表格创建

### 3.1 根据需求，为表添加合适的约束

```
-- 员工表
create table emp(
id int, -- 员工id，主键且自增长
ename varchar(50), -- 员工姓名，非空并且唯一
joindate date, -- 入职日期，非空
salary double(7,2), -- 工资,非空
bonus double(7,2) -- 奖金，如果没有奖金默认为0

);
```

### 3.2 添加约束过程

#### 员工id，主键且自增长

```
id int, -- 员工id，主键且自增长
id int primary key auto_increment,-- 员工id，主键且自增长-修改后
```

#### 员工姓名，非空并且唯一

```
ename varchar(50), -- 员工姓名，非空并且唯一
ename varchar(50) not null unique,-- 员工姓名，非空并且唯一-修改后
```

####  入职日期，非空

```
ename varchar(50), -- 员工姓名，非空并且唯一
ename varchar(50) not null,-- 员工姓名，非空并且唯一-修改后
```

####  工资,非空

```
salary double(7,2), -- 工资,非空
salary double(7,2) not null,-- 工资,非空-修改后
```

####  奖金，如果没有奖金默认为0

```
bonus double(7,2) -- 奖金，如果没有奖金默认为0
bonus double(7,2) default 0,-- 奖金，如果没有奖金默认为0-修改后
```

### 3.3 修改后约束

```
drop table if exists emp;
-- 员工表
create table emp(
id int primary key auto_increment, -- 员工id，主键且自增长
ename varchar(50) not null unique, -- 员工姓名，非空并且唯一
joindate date not null, -- 入职日期，非空
salary double(7,2) not null , -- 工资,非空
bonus double(7,2) default 0 -- 奖金，如果没有奖金默认为0

);
```

## 四 约束示例

### 4.1 演示主键约束：非空且唯一

#### 非空演示

SQL指令

```
insert into emp(id,ename,joindate,salary,bonus) values(null,'张三','1999-11-11',8800,5000);
```

异常信息

```
1048 - Column 'id' cannot be null
```

#### 唯一演示

SQL指令

```
insert into emp(id,ename,joindate,salary,bonus) values(1,'张三','1999-11-11',8800,5000);

insert into emp(id,ename,joindate,salary,bonus) values(null,'张三','1999-11-11',8800,5000);

insert into emp(id,ename,joindate,salary,bonus) values(1,'张三','1999-11-11',8800,5000);
```

异常信息

```
1062 - Duplicate entry '1' for key 'emp.PRIMARY'
```

### 4.2 默认约束

SQL指令

```
insert into emp(ename,joindate,salary,bonus) values('李四','1999-11-01',8800,5000);
insert into emp(ename,joindate,salary) values('王五','1999-11-01',8800);
```

说明：bonus字段因为有default设置，默认为0.0
