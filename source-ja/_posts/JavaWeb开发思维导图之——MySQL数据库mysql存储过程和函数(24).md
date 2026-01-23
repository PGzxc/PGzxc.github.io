---
title: JavaWeb开发思维导图之——MySQL数据库mysql存储过程和函数(24)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: f9c30c2b
date: 2024-11-22 09:16:26
---
## 一 概述

* 概念
* 好处
* 存储过程和函数的区别
* 存储过程操作
* 存储函数

<!--more-->

## 二 内容详情

### 2.1 概念

* 是事先经过编译并存储在数据库中的一段SQL语句的集合

### 2.2 好处

* 提高代码的复用性
* 减少数据在数据库和应用服务器之间的传输，提高效率
* 减少代码层面的业务处理

### 2.3 存储过程和函数的区别

* 存储函数必须有返回值
* 存储过程可以没有返回值

### 2.4 存储过程操作

1-创建存储过程

```
--修改结束分隔符
delimiter $

--创建存储过程
create procedure 存储过程名称(参数列表)
begin 
	     sql语句列表;
end $

--修改结束分割符
delimiter;
```

2-调用存储过程

* 语法: call 存储过程名称(实际参数)
* 示例：call stu_group();

3-查看存储过程

* 语法：select * from mysql.proc where db='数据库名称';
* 示例：select * from mysql.proc where db='db6';

4-删除存储过程

* 语法：drop procedure [if exists] 存储过程名称;
* 示例：drop procedure if exists stu_group;

5-存储过程语法

* 变量：定义变量、变量赋值
* if语句：if 判断条件 then 执行语句
* 参数传递：create procedure 存储过程名称([in|out|inout]参数名 数据类型) begin end
* while循环：初始化语句;while 条件判断语句 do 循环体语句; 条件控制语句; end while;

### 2.5 存储函数

1-区别：存储函数必须有返回值

2-操作

* 创建存储函数：create function 函数名称(参数列表) returns 返回值类型 begin sql语句 return 结果; end$
* 调用存储函数：select 函数名称(实际参数);：
* 删除存储函数：drop function 函数名称;

3-查看：数据库/函数

## 三 思维导图

![javaweb-xmind-mysql-func-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-func-8.png