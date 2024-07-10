---
title: JavaWeb开发之——数据库设计(20)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: e952cc19
date: 2022-11-24 09:55:33
---
## 一 概述

* 数据库设计-简介
* 数据库设计-多表关系实现
* 数据库设计-案例

<!--more-->

## 二 数据库设计-简介

### 2.1 软件的研发步骤

![][1]

### 2.2 数据库设计概念

* 数据库设计就是根据业务系统的具体需求，结合我们所选用的DBMS(Database Management System-数据库管理系统)，为这个业务系统构造出最优的数据存储模 型。
* 建立数据库中的<font color=red>表结构</font>以及<font color=red>表与表之间的关联关系</font>的过程。
* 有哪些表？表里有哪些字段？表和表之间有什么关系？

### 2.3 数据库设计的步骤

* 需求分析（数据是什么? 数据具有哪些属性? 数据与属性的特点是什么）
* 逻辑分析（通过ER(Entity/Relation)图对数据库进行逻辑建模，不需要考虑我们所选用的数据库管理系统）
* 物理设计（根据数据库自身的特点把逻辑设计转换为物理设计）
* 维护设计（1.对新的需求进行建表；2.表优化）

### 2.4 表关系

#### 一对一

* 如：用户 和 用户详情
* 一对一关系多用于表拆分，将一个实体中经常使用的字段放一张表，不经常使用的字段放另一张表，用于提升 查询性能

#### 一对多

* 如：部门 和 员工
* 一个部门对应多个员工，一个员工对应一个部门。

#### 多对多

* 如：商品 和 订单
* 一个商品对应多个订单，一个订单包含多个商品

## 三 数据库设计-多表关系实现

### 3.1 一对多表关系

#### 实现方式

<font color=red>在多的一方建立外键，指向少的一方的主键</font>

#### 案例分析

以`员工表`和`部门表`举例
![][2]

经过分析发现，员工表属于多的一方，而部门表属于少的一方，此时我们会在员工表中添加一列(dep_id)，指向于部门表的主键(id)
![][3]

####  建表语句

```
-- 删除表
DROP TABLE IF EXISTS tb_emp;
DROP TABLE IF EXISTS tb_dept;
-- 部门表
CREATE TABLE tb_dept(
id int primary key auto_increment,
dep_name varchar(20),
addr varchar(20)
);
-- 员工表
CREATE TABLE tb_emp(
id int primary key auto_increment,
name varchar(20),
age int,
dep_id int,
-- 添加外键 dep_id,关联 dept 表的id主键
CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES tb_dept(id)
);
```

查看表结构模型图
![][4]

### 3.2 多对多表关系

#### 实现方式

<font color=red>建立第三张中间表，中间表至少包含两个外键，分别关联两方主键</font>

#### 案例分析

以 `订单表` 和 `商品表` 举例
![][5]

经过分析发现，订单表和商品表都属于多的一方，此时需要创建一个中间表，在中间表中添加订单表的外键和商品表的 外键指向两张表的主键：
![][6]

#### 建表语句

```
-- 删除表
DROP TABLE IF EXISTS tb_order_goods;
DROP TABLE IF EXISTS tb_order;
DROP TABLE IF EXISTS tb_goods;
-- 订单表
CREATE TABLE tb_order(
id int primary key auto_increment,
payment double(10,2),
payment_type TINYINT,
status TINYINT
);
-- 商品表
CREATE TABLE tb_goods(
id int primary key auto_increment,
title varchar(100),
price double(10,2)
);
-- 订单商品中间表
CREATE TABLE tb_order_goods(
id int primary key auto_increment,
order_id int,
goods_id int,
count int
);
-- 建完表后，添加外键
alter table tb_order_goods add CONSTRAINT fk_order_id FOREIGN key(order_id) REFERENCES
tb_order(id);
alter table tb_order_goods add CONSTRAINT fk_goods_id FOREIGN key(goods_id) REFERENCES
tb_goods(id);
```

查看表结构模型图：
![][7]

### 3.3 1对1表关系

#### 实现方式

<font color=red>在任意一方加入外键，关联另一方主键，并且设置外键为唯一(UNIQUE)</font>

#### 案例分析

以`用户表` 举例
![][8]
而在真正使用过程中发现 id、photo、nickname、age、gender 字段比较常用，此时就可以将这张表查分成两张表。

![][9]

#### 建表语句

```
create table tb_user_desc (
id int primary key auto_increment,
city varchar(20),
edu varchar(10),
income int,
status char(2),
des varchar(100)
);
create table tb_user (
id int primary key auto_increment,
photo varchar(100),
nickname varchar(50),
age int,
gender char(1),
desc_id int unique,
-- 添加外键
CONSTRAINT fk_user_desc FOREIGN KEY(desc_id) REFERENCES tb_user_desc(id)
);
```
![][10]

## 四 数据库设计-案例

### 4.1 描述对象

![][11]

### 4.2 案例分析
![][12]
经过分析，我们分为 专辑表 曲目表 短评表 用户表 4张表

* 一个专辑可以有多个曲目，一个曲目只能属于某一张专辑，所以专辑表和曲目表的关系是<font color=red>一对多</font>。 
* 一个专辑可以被多个用户进行评论，一个用户可以对多个专辑进行评论，所以专辑表和用户表的关系是 <font color=red>多对多</font>。
*  一个用户可以发多个短评，一个短评只能是某一个人发的，所以用户表和短评表的关系是 <font color=red>一对多</font>。

![][13]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-software-design.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-one2one-table.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-one2one-table-relate.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-one2one-table-relate-model.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-more2more-tables.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-more2more-table-relate.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-more2more-table-model.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-one2one-table-relate.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-one2one-table-relates.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-one2one-table-model.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-sample-analysis.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-sample-analysis-result.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-20-sample-analysis-result-relate.png