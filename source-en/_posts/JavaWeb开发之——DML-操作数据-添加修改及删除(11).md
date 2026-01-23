---
title: JavaWeb开发之——DML-操作数据-添加修改及删除(11)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: d0efe062
date: 2022-09-16 11:18:08
---
## 一 概述

DML：对表中的数据进行增删改
* 添加(insert)
* 修改(update)
* 删除(delete)

<!--more-->

## 二  添加(insert)

### 2.1 概念

1-给指定的列添加数据

```
insert into 表名(列名1,列名2,...) values(值1,值2,...);
```

2-给全部列添加数据

```
insert into 表名 values(值1,值2,...);
```

3-批量添加数据

```
insert into 表名(列名1,列名2,...) values(值1,值2,...),(值1,值2,...),(值1,值2,...)..;
insert into 表名 values(值1,值2,...),(值1,值2,...),(值1,值2,...)..;
```

### 2.2 示例

查询表格数据

```
select * from tb_stu;
```

1-给tb_stu表格中，添加id和name字段添加一条数据

```
insert into tb_stu(id,name) values(1,'张三');
```

2-给tb_stu表格中，所有字段添加数据

```
insert into tb_stu(id,name,gender,birthday,score,email,tel,status) values(2,'李四','男','2000-01-01',88.88,'lisi@qq.com','12111111111',1);
```

3-给tb_stu表格中，所有字段添加数据(省略表格中默认字段)

```
insert into tb_stu values(3,'李四','男','2000-01-01',88.88,'lisi@qq.com','12111111111',1);
```

4-批量添加数据

```
insert into tb_stu values
(3,'李四','男','2000-01-01',88.88,'lisi@qq.com','12111111111',1),
(4,'李四','男','2000-01-01',88.88,'lisi@qq.com','12111111111',1),
(5,'李四','男','2000-01-01',88.88,'lisi@qq.com','12111111111',1);
```

## 三 修改(update)

### 3.1 概念

1-修改表数据

```
update 表名 set 列名1=值1,列名2=值2,...[where 条件];
```

注意：修改语句中如果不加条件，则将所有数据修改

### 3.2 示例

1-将姓名为张三的性别修改为女

```
update tb_stu set gender='女' where name='张三';
```

2-不加where条件限制，则修改所有

```
update tb_stu set gender='女';
```

## 四 删除(delete)

### 4.1 概念

1-删除数据

```
delete from 表名 [where 条件];
```

注意：删除语句中如果不加条件，则将所有数据都删除

### 4.2 示例

1-删除用户名为张三的记录

```
delete from tb_stu where name='张三';
```

2-删除所有记录

```
delete from tb_stu;
```

