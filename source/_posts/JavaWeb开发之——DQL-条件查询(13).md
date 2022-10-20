---
title: JavaWeb开发之——DQL-条件查询(13)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: bb45be1b
date: 2022-10-20 17:06:52
---
## 一 概述

* 条件查询语法
* 条件查询示例
* 模糊查询

<!--more-->

## 二 条件查询语法

### 2.1 条件查询语法

```
select 字段列表 from 表名 where 条件列表;
```

### 2.2 条件

|  No  |       符号       |                   功能                   |
| :--: | :--------------: | :--------------------------------------: |
|  1   |        >         |                   大于                   |
|  2   |        <         |                   小于                   |
|  3   |       \>=        |                 大于等于                 |
|  4   |        <=        |                 小于等于                 |
|  5   |        =         |                   等于                   |
|  6   |      <>或!=      |                  不等于                  |
|  7   | between...and... |          在某个范围之内(都包含)          |
|  8   |     in(...)      |                  多选1                   |
|  9   |    like占位符    | 模糊查询 `_`单个任意字符 `%`多个任意字符 |
|  10  |     is null      |                  是null                  |
|  11  |   is not null    |                 不是null                 |
|  12  |     and或&&      |                   并且                   |
|  13  |     or或\|\|     |                   或者                   |
|  14  |      not或!      |                 非，不是                 |

## 三 条件查询示例

### 3.1 查询年龄大于20岁的学院信息

```
select * from stu where age>20;
```

### 3.2 查询年龄大于等于20岁的学员信息

```
select * from stu where age>=20;
```

### 3.3 查询年龄大于等于20岁并且年龄小于等于30岁的学员信息

```
select * from stu where age>=20 && age<=30;
select * from stu where age>=20 and age<=30;
select * from stu where age between 20 and 30;
```

### 3.4 查询入学日期在'1998-09-01'到'1999-09-01'之间的学员信息

```
select * from stu where hire_date between '1998-09-01' and '1999-09-01';
```

### 3.5 查询年龄等于18岁的学员信息

```
select * from stu where age=18;
```

说明：是`=`不是`==`

### 3.6 查询年龄不等于18岁的学员信息

```
select * from stu where age!=18;
select * from stu where age <> 18;
```

### 3.7 查询年龄等于18岁或者年龄等于20岁或者年龄等于22岁的学员信息

```
select * from stu where age=18 or age=20 or age=22;
select * from stu where age in(18,20,22);
```

### 3.8 查询英语成绩为null的学员信息

```
select * from stu where english==null;--不可用
select * from stu where english is null;
select * from stu where english is not null;
```

说明：null值的比较不能使用=或!=。需要使用is is not

## 四 模糊查询

### 4.1 模糊查询说明

* 模糊查询使用`like`
* `_`通配符代表单个任意字符
* `%`通配符代表任意个数字符

### 4.2 模糊查询示例

#### 查询姓'马'的学员信息

```
select * from stu where name like '马%';
```

#### 查询第二个字是’花‘的学员信息

```
select * from stu where name like '_花%';
```

#### 查询名字中包含'德'的学员信息

```
select * from stu where name like '%德%';
```

