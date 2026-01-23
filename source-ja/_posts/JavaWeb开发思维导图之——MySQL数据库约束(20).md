---
title: JavaWeb开发思维导图之——MySQL数据库约束(20)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 5a54b3d8
date: 2024-11-18 09:01:47
---
## 一 概述

* 外键约束
* 外键的级联更新和级联删除
* 约束

<!--more-->

## 二 内容详情

### 2.1  外键约束

1-为何要外键约束

* 表与表关联时，没有约束，无法保证数据的准确性
* 例如，用户表(user)和订单表(orderlist)，通过orderlist的uid关联user(id)
* 主表 (user)和从表(orderlist)

2-作用：让表与表之间产生关联关系，保证数据的准确性

3-操作

* 建表时添加外键约束：create table 表名(列名 数据类型 约束,...constraint 外键名 forein key (本表外键列名) references 主表名(主表主键列名));
* 删除外键约束：alert table 表名 drop foreign key 外键名;
* 建表后单独添加外键约束：alert table 表名 add constraint 外键名 foreign key (本表外键列名) references 主表名(主键列名);

### 2.2 外键的级联更新和级联删除

1-概念

* 级联更新：主表中的数据进行修改时，从表中关联的数据会随之修改
* 级联删除：主表中的数据删除时，从表中关联的数据也会随之删除

2-操作

* 添加级联更新：alter table 表名 add constraint 外键名 foreign key (本表外键列名) references 主表名(主键列名) on update cascade;

* 级联删除：alter table 表名 add constraint 外键名 foreign key(本表外键列名) references 主表名(主键列名) on delete cascade;
* 同时添加级联更新和级联删除：alter table 表名 add constraint 外键名 foreign key (本表外键列名) references 主表名(主键列名) on update cascade on delete cascade;

### 2.3 约束

1-介绍：对表中数据进行限定，保证数据的正确性、有效性、完整性

2-约束分类

* 主键约束
* 主键自增
* 唯一约束
* 非空约束
* 外键约束
* 外键级联更新
* 外键级联删除

## 三 思维导图

![javaweb-xmind-mysql-ys-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-ys-4.png