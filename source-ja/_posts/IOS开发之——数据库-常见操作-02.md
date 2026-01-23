---
title: IOS开发之——数据库-常见操作(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 数据库
abbrlink: de003cb5
date: 2022-04-22 15:47:31
---
## 一 概述

* SQL语句
* SQL表格操作
* SQL数据操作

<!--more-->

## 二 SQL语句

### 2.1 SQL语句

#### 什么是SQL

* SQL（structured query language）：结构化查询语言
* SQL是一种对关系型数据库中的数据进行定义和操作的语言
* SQL语言简洁，语法简单，好学好用

#### 什么是SQL语句

* 使用SQL语言编写出来的句子\代码，就是SQL语句
* 在程序运行过程中，要想操作（增删改查，CRUD）数据库中的数据，必须使用SQL语句

#### SQL语句的特点

* 不区分大小写（比如数据库认为user和UsEr是一样的）
* 每条语句都必须以分号 ; 结尾
* 数据库中不可以使用关键字来命名表、字段

#### SQL中的常用关键字

```
select、insert、update、delete、from、create、where、desc、order、by、group、table、alter、view、index等等
```

### 2.2 SQL语句的种类

#### 数据定义语句（DDL：Data Definition Language）

* 包括create和drop等操作
* 在数据库中创建新表或删除表（create table或 drop table）

#### 数据操作语句（DML：Data Manipulation Language

* 包括insert、update、delete等操作
* 上面的3种操作分别用于添加、修改、删除表中的数据

#### 数据查询语句（DQL：Data Query Language）

* 可以用于查询获得表中的数据
* 关键字select是DQL（也是所有SQL）用得最多的操作
* 其他DQL常用的关键字有where，order by，group by和having

## 三 SQL表格操作

本文介绍利用SQL语句创建表格和删除表格

### 3.1 创建表格

#### 格式

```
create table 表名 (字段名1 字段类型1, 字段名2 字段类型2, …) ;
create table if not exists 表名 (字段名1 字段类型1, 字段名2 字段类型2, …) ;
```

说明：

* 通过此方式创建表格，如果表格不存在则创建，存在则不再创建

* SQLite将数据划分为以下几种存储类型：integer : 整型值、real : 浮点值、text : 文本字符串、blob : 二进制数据（比如文件）

* 实际上SQLite是无类型的，建表时声明啥类型或者不声明类型都可以，也就意味着创表语句可以这么写

  ```
  create table t_student(name, age);
  ```

#### 示例

```
create table t_student (id integer, name text, age inetger, score real) ;
```

#### 操作过程

在表格或Queries上右键，选择`New Query`

![][1]

在文本框中输入示例语句

![][2]

点击run，执行表格创建语句，效果图如下(底部显示创建结果，Tables刷新后显示表格)

![][3]

### 3.2 删除表格

#### 格式

```
drop table 表名 ;
drop table if exists 表名 ;
```

#### 示例

```
drop table if EXISTS t_student;
```

#### 操作过程

同理，在`New Query`打开的窗口中，执行示例，删除表格

![][4]

## 四 SQL数据操作

本文介绍的数据操作有：插入数据(insert)、更新数据(update)、删除数据(delete)、查询语句(select)、条件语句(where)、起别名、计算记录数量(count)、排序(order by)、分页查询(limit)、字段属性约束(not null、unique、default)、主键约束(primary key)、外键约束(foreign key)、表连接查询(内连接、外连接)

### 4.1 插入数据(insert)

#### 格式

```
insert into 表名 (字段1, 字段2, …) values (字段1的值, 字段2的值, …) ;
```

#### 示例(字符串用单引号)

```
INSERT INTO t_student(id,name,age,score) VALUES(1,'李四',18,60.0);
多行
insert into t_student(id,name,age,score) VALUES
(1,'张三',18,60.0),
(2,'李四',19,61.0),
(3,'王五',20,62.0);
```

#### 操作过程

![][5]

### 4.2 更新数据(update)

#### 格式

```
update 表名 set 字段1 = 字段1的值, 字段2 = 字段2的值, … ; 
```

#### 示例(设置多个字段，用逗号连接)

```
update t_student set name='张三',age=20;
```

#### 操作过程

![][6]

### 4.3 删除表格(delete)

#### 格式

```
delete from 表名 ;
```

#### 示例(删除表格记录，不是表格本身)

```
delete from t_student;
```

#### 操作过程

![][7]

### 4.4 查询语句(select)

#### 格式

```
select 字段1, 字段2, … from 表名 ;
select * from 表名;   //  查询所有的字段
```

#### 示例

```
select name,age from t_student;
select * from t_student;
```

#### 操作过程

![][8]

### 4.5 条件语句(where)

如果只想更新或者删除某些固定的记录，那就必须在DML语句后加上一些条件

#### 条件语句的常见格式

```
where 字段 = 某个值 ;   // 不能用两个 =
where 字段 is 某个值 ;   // is 相当于 = 
where 字段 != 某个值 ; 
where 字段 is not 某个值 ;   // is not 相当于 != 
where 字段 > 某个值 ; 
where 字段1 = 某个值 and 字段2 > 某个值 ;  // and相当于C语言中的 &&
where 字段1 = 某个值 or 字段2 = 某个值 ;  //  or 相当于C语言中的 
```

#### 示例

```
将t_student表中年龄大于10 并且 姓名不等于jack的记录，年龄都改为 5
update t_student set age = 5 where age > 10 and name != ‘jack’ ;

删除t_student表中年龄小于等于10 或者 年龄大于30的记录
delete from t_student where age <= 10 or age > 30 ;

update t_student set score = age where name = ‘jack’ ;
将t_student表中名字等于jack的记录，score字段的值 都改为 age字段的值
```

#### 操作过程

![][9]

### 4.6 起别名

#### 格式

格式(字段和表都可以起别名)

```
select 字段1 别名 , 字段2 别名 , … from 表名 别名 ; 
select 字段1 别名, 字段2 as 别名, … from 表名 as 别名 ;
select 别名.字段1, 别名.字段2, … from 表名 别名 ;
```

#### 示例

```
select name myname, age myage from t_student ;
给name起个叫做myname的别名，给age起个叫做myage的别名

select s.name, s.age from t_student s ;
给t_student表起个别名叫做s，利用s来引用表中的字段
```

#### 操作过程

![][10]

### 4.7 计算记录数量(count)

#### 格式

```
select count (字段) from 表名 ;
select count ( * ) from 表名 ;
```

#### 示例

```
select count (age) from t_student ;
select count ( * ) from t_student where score >= 60;
```

#### 操作过程

![][11]

### 4.8 排序(order by)

#### 格式

```
查询出来的结果可以用order by进行排序
select * from t_student order by 字段 ;
select * from t_student order by age ;

默认是按照升序排序（由小到大），也可以变为降序（由大到小）
select * from t_student order by age desc ;  //降序
select * from t_student order by age asc ;   // 升序（默认）

也可以用多个字段进行排序
select * from t_student order by age asc, height desc ;
先按照年龄排序（升序），年龄相等就按照身高排序（降序）
```

#### 示例

```
select * from t_student order by score desc,age asc;
```

#### 操作过程

![][12]

### 4.9 分页查询(limit)

使用limit可以精确地控制查询结果的数量，比如每次只查询10条数据

#### 格式

```
select * from 表名 limit 数值1, 数值2 ;
```

#### 示例(跳过最前面4条语句，然后取8条记录)

```
select * from t_student limit 4, 8 ;
```

#### limit后面只有一个数值

```
select * from t_student limit 7 ;
相当于select * from t_student limit 0, 7 ;
表示取最前面的7条记录
```

### 4.10 字段属性约束(not null、unique、default)

#### 约束说明

建表时可以给特定的字段设置一些约束条件，常见的约束有

```
not null ：规定字段的值不能为null
unique ：规定字段的值必须唯一
default ：指定字段的默认值
```

#### 示例(name字段不能为null，并且唯一，age字段不能为null，并且默认为18)

```
create table if not exists t_student(id integer,name text not null unique,age integer not null default 18,score real);
```

#### 操作过程

![][13]

### 4.11 主键约束(primary key)

#### 什么是主键

* 主键（Primary Key，简称PK）用来唯一地标识某一条记录
* 例如t_student可以增加一个id字段作为主键，相当于人的身份证
* 主键可以是一个字段或多个字段

#### 主键的设计原则

* 主键应当是对用户没有意义的
* 永远也不要更新主键
* 主键不应包含动态变化的数据
* 主键应当由计算机自动生成

#### 示例

在创表的时候用primary key声明一个主键

```
create table if not exists t_student (id integer primary key autoincrement, name text, age integer,score real) ;
```
#### 操作过程

![][14]

### 4.12 外键约束(foreign key)

#### 外键说明

* 利用外键约束可以用来建立表与表之间的联系
* 外键的一般情况是：一张表的某个字段，引用着另一张表的主键字段

#### 外键操作

创建表t_class

![][15]

创建t_student的属性

![][16]

指定t_student的class外键(选中class后，点击Foreign Keys，设置Name(外键名),Referenced Table(关联表)，Referenced Fields(关联字段)、Local Fields(本表字段))

![][17]

给t_class设置记录

![][18]

t_student的class选项只有1,2,3

![][19]

#### t_student的DDL

```
CREATE TABLE "t_student" (
  "id" INTEGER NOT NULL,
  "name" TEXT,
  "class" integer,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_student_ref_class" FOREIGN KEY ("class") REFERENCES "t_class" ("id") DEFERRABLE INITIALLY DEFERRED
);
```

### 4.13 表连接查询(内连接、外连接)

#### 什么是表连接查询

需要联合多张表才能查到想要的数据

#### 表连接的类型

* 内连接：inner join 或者 join （显示的是左右表都有完整字段值的记录）
* 左外连接：left outer join （保证左表数据的完整性）

#### 示例

```
select s.name from t_student s, t_class c where s.id = c.id and c.name = '语文';
```

#### 操作

| t_student | t_class | 关联查询结果 |
| :-------: | :-----: | :----------: |
|  ![][20]  | ![][21] |   ![][22]    |




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-table-new-query.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-create-table.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-create-table-result.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-drop-table-result.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-insert-table.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-update-table.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-delete-table.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-select-table-result.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-where-table.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-othername-table-result.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-count-table-result.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-orderby-table.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-property-table.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-primary-key-table-result.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-forgain-table-class.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-forgain-table-student-property.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-query-forgain-table-student.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-forgain-table-class-values.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-forgain-table-student-values.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-join-table-class.png
[21]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-join-table-student.png
[22]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-02-join-table-result.png