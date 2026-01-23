---
title: JavaWeb开发思维导图之——MySQL数据库视图(22)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 2680b293
date: 2024-11-20 09:40:42
---
## 一 概述

* 介绍
* 作用
* 表
* 操作

<!--more-->

## 二 内容详情

### 2.1  介绍

* 是一种虚拟存在的数据表
* 这个虚拟表并不在数据库中实际存在

### 2.2 作用

* 将一些较为复杂的查询语句的结果，封装到虚拟表中，
* 后期有相同需求时，直接查询该虚拟表

### 2.3 表

* city(城市表,city.cid=country.id)
* country(国家表)
* city_country(虚拟表)

### 2.4 操作

1-视图创建

* 语法：create view 视图名称 [(列名列表)] as 查询语句;
* 示例：select c1.id,c1.name,c2.name from city c1,country c2 where  c1.cid=c2.id; //查询
* 位置：数据库(db5)/视图/city_country

2-查询视图语句

* 语法：select * from 视图名称;
* 示例：select * from city_country;//查询视图

3-视图修改

* 修改视图数据：update 视图名称 set 列名=值 where 条件;
* 修改视图结构：alter view 视图名称 (列名列表) as 查询语句;

4-删除视图

* 语法：drop view [if exists] 视图名称;
* 示例：drop view if exists city_country;

## 三 思维导图

![javaweb-xmind-mysql-view-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-view-6.png