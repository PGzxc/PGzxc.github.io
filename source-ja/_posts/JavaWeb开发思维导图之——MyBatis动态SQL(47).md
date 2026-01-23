---
title: JavaWeb开发思维导图之——MyBatis动态SQL(47)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 12745d49
date: 2025-01-01 09:00:49
---
## 一 概述

* 动态SQL介绍
* 动态SQL标签
* SQL片段抽取

<!--more-->

## 二 内容详情

### 2.1 动态SQL介绍

* 多条件查询(sql无法满足-参数变化)
* SQL语句根据条件或者参数不同进行变化

### 2.2 动态SQL标签

1-语法

* \<where>:条件标签。如果由动态条件，则使用该标签代替
* \<if>:条件判断标签
* \<foreach>

2-示例

* where+if：elect * from student \<where>\<if test="id!=null">id=#{id}\</if>\</where>
* foreach：select * from student \<where>\<foreach collection="list" open="id in(" close=")" item="id" separator=",">#{id}\</foreach>\</where> 

### 2.3 SQL片段抽取

1-概念: 将一些重复SQL语句(select * from user)抽取，达到复用效果

2-抽取标签

* \<sql>
* \<include>

## 三 思维导图

![javaweb-xmind-mybatis-sql-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-sql-7.png