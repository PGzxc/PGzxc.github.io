---
title: JavaWeb开发之——DQL-排序查询(14)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: 63b85cf6
date: 2022-10-20 17:07:37
---
## 一 概述

* 排序查询语法
* 排序查询示例

<!--more-->

## 二 排序查询语法

排序查询语法

```
select 字段列表 from 表名 order by 排序字段名1[排序方式1]...,排序字段名2[排序方式2]...
```

排序方式：

* ASC：升序排序(默认值)
* DESC：降序排序

注意：如果多个排序条件，当前面的条件值一样时，才会根据第二个条件进行排序

## 三 排序查询示例

### 3.1 查询学生信息，按照年龄升序排列

```
select * from stu order by age asc;
```

### 3.2 查询学生信息，按照数学成绩降序排列

```
select * from stu order by math desc;
```

### 3.3 查询学生信息，按照数学成绩降序排列，如果数学成绩一样，再按照英语成绩升序排列

```
select * from stu order by math desc,english asc;
```

