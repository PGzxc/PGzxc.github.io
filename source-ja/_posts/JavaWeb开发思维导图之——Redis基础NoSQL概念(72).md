---
title: JavaWeb开发思维导图之——Redis基础NoSQL概念(72)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: d38ce90a
date: 2025-03-05 09:27:39
---
## 一 概述

* 企业常见问题
* NoSQL
* 解决方案

<!--more-->

## 二 内容详情

### 2.1 企业常见问题

1-应用场景

* 12306购票网站
* 淘宝双十一
* 京东618

2-问题现象

* 1-海量数据
* 2-高并发

3-原因-关系型数据库

* 1-性能瓶颈: 磁盘IO性能低下
* 2-性能扩展: 数据关系复杂，扩展性差，不便于大规模集群

4-解决思路(NoSQL)

* 1-降低磁盘IO次数，越低越好(内存存储)
* 2-去除数据间关系，越简单越好(不存关系，仅存储数据)

### 2.2 NoSQL

1-概念

* 即Not-Only SQL(泛指非关系型数据库)
* 作为关系型数据库的补充

2-作用

应对于海量用户和海量数据前提下的数据处理问题

3-特征

* 1-可扩容，可伸缩
* 2-大数据量下高性能
* 3-灵活的数据模型
* 4-高可用

4-常见NoSQL数据库

* 1-Redis
* 2-memcache
* 3-HBase
* 4-MongoDB

### 2.3 解决方案

* 1-商品基本信息：使用: MySQl
* 2-商品附加信息：使用MongoDB
* 3-图片信息：使用分布式文件系统
* 4-搜索关键字：使用: ES、Lucene、solr
* 5-热点信息：使用: Redis、memcache、tair

## 三 思维导图

![javaweb-ximind-redis-nosql-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ximind-redis-nosql-1.png