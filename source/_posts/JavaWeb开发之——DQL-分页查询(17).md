---
title: JavaWeb开发之——DQL-分页查询(17)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: 114c3fd3
date: 2022-10-20 17:09:49
---
## 一 概述

* 分页查询语法
* 分页查询示例

<!--more-->

## 二 分页查询语法

### 2.1 分页查询语法

```
select 字段列表 from 表名 limit 起始索引,查询条目数;
```

备注：起始索引：从0开始

计算公式：起始索引=(当前页码-1)*(每页显示的条数)

tips:

* 分页查询limit是MySQL数据库的方言
* Oracle分页查询使用rownumber
* SQL Server分页查询使用top

## 三 分页查询示例

### 3.1 从0开始查询，查询3条数据

```
select * from stu limit 0,3;
```

### 3.2 每页显示3条数据，查询第1页数据

```
select * from stu limit 0,3;
```

### 3.3 每页显示3条数据，查询第2页数据

```
select * from stu limit 3,3;
```

### 3.4 每页显示3条数据，查询第2页数据

```
select * from stu limit 6,3;
```

