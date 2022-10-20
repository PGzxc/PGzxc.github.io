---
title: JavaWeb开发之——DQL-聚合函数(15)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: 5a428a2d
date: 2022-10-20 17:08:18
---
## 一 概述

* 聚合函数语法
* 聚合函数示例

<!--more-->

## 二 聚合函数语法

### 2.1 概念

将一列数据作为一个整体，进行纵向计算

### 2.2 聚合函数分类

|  No  |   函数名    |              功能              |
| :--: | :---------: | :----------------------------: |
|  1   | count(列名) | 统计数量(一般选用不为null的列) |
|  2   |  max(列名)  |             最大值             |
|  3   |  min(列名)  |             最小值             |
|  4   |  sum(列名)  |              求和              |
|  5   |  ave(列名)  |             平均值             |

### 2.3 聚合函数语法

```
select 聚合函数名(列名) from 表;
```

注意：null值不参与所有聚合函数运算

## 三 聚合函数示例

### 3.1 统计班级一共有多少个学生

```
select count(id) from stu;
select count(*) from stu;
```

注意：null值不参与所有聚合函数运算

### 3.2 查询数学成绩的最高分

```
select max(math) from stu;
```

### 3.3 查询数学成绩的最低分

```
select min(math) from stu;
```

### 3.4 查询数学成绩的总分

```
select sum(math) from stu;
```

### 3.5 查询数学成绩的平均分

```
select avg(math) from stu;
```

### 3.6 查询英语成绩的最低分

```
select min(english) from stu;
```

