---
title: JavaWeb开发思维导图之——MySQL数据库DQL(19)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 83391bf1
date: 2024-11-15 11:02:15
---
## 一 概述

* 查询语法
* DQL操作

<!--more-->

## 二 内容详情

### 2.1  查询语法

```
select 字段列表 from 表名列表 where 条件列表 group by 分组列表 having 分组后过滤条件 order by 排序 limit 分页
```

### 2.2 DQL操作

1-查询全部

* select * from 表名; //查询全部表数据
* select 列名1,列名2...from 表名;//查询指定字段的表数据
* select distinct 列名1,列名2,...from 表名;//去除重复查询 
* select 列名1运算符(+-*/)  列名2 from 表名;//计算列的值(四则运算) ifnull替换
* select 列名  as 别名 from 表名;//起别名查询,as 可省略

2-条件查询

* 查询条件分类：大于(>)、小于(<)等
* 条件查询语法：select  列名/列表 from 表名 where 条件;//
* 示例：select * from product where price between 4000 and 6000;查询4k~6k之间的商品

3-聚合函数查询

* 聚合函数：将一列数据作为一个整体，进行纵向计算
* 分类：count(列名) //统计数量(一般选不为null的列)、max(列名) 最大值、min(列名) 最小值、sum(列名) 求和、avg(列名) 平均值
* 查询语法：select 函数名(列名) from 表名 [where 条件];
* 示例：select max(price) from product;//获取最高商品价格

4-排序查询

* 语法：select 列名/列表(*) from 表名 [where 条件] order by 列名 排序方式,列名 排序方式,..;
* 说明：1-排序方式：asc-升序、desc-降序
* 示例：select * from product order by stock asc;//按照库存升序排列

5-分组查询

* 语法：select 列名/列表(*) from 表名 [where 条件] group by 分组列名 [having 分组后的条件过滤] [order by 排序列名 排序方式];
* 示例：select brand,sum(price) from product group by brand;//按照品牌分组，获取每组商品的总金额

6-分页查询

* 语法：select 列名 from 表名 [where 条件] [group by 分组列名] [having 分组后的条件过滤] [order by 排序列名 排序方式] [limit 当前页数,每页显示的条数];
* 注意事项：每页开始数：(当前页数-1)*每页显示条数
* 示例：select * from product limit 0,3;

## 三 思维导图

![javaweb-xmind-mysql-dql-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-dql-3.png