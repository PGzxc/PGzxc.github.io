---
title: JavaWeb开发之——DQL-分组查询(16)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: fd7a9363
date: 2022-10-20 17:09:10
---
## 一 概述

* 分组查询介绍
* 分组查询示例

<!--more-->

## 二 分组查询介绍

### 2.1 分组语法

```
select 字段列表 from 表名 [where 分组前条件限定] group by 分组字段名 [having 分组后条件过滤];
```

注意：分组之后，查询的字段为聚合函数和分组字段，查询其他字段无任何意义

where和having的区别：

* 执行时机不一样：where是分组之前进行限定，不满足where条件，则不参与分组，而having是分组之后对结果进行过滤
* 可判单的条件不一样：where不能对聚合函数进行判断，having可以

执行顺序：where>聚合函数>having

## 三 分组查询示例

### 3.1 查询男同学和女同学各自的数学平均分

```
select sex,avg(math) from stu group by sex;
```

### 3.2 查询男同学和女同学各自的数学平均分，以及各自人数

```
select sex,avg(math),count(*) from stu group by sex;
```

### 3.3 查询男同学和女同学各自的数学平均分，以及各自人数。要求：分数低于70分的不参与分组

```
select sex,avg(math),count(*) from stu where math >70 group by sex;
```

### 3.4 查询男同学和女同学各自的数学平均分，以及各自人数。要求：分数低于70分的不参与分组，分组之后人数大于2个的。

```
select sex,avg(math),count(*) from stu where math >70 group by sex having count(*)>2;
```

