---
title: JavaWeb开发思维导图之——MySQL数据库索引(28)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 69ad3817
date: 2024-11-28 09:27:15
---
## 一 概述

* 索引介绍
* 索引分类
* 索引操作
* 索引的原理

<!--more-->

## 二 内容详情

### 2.1  索引介绍

* 索引的本质是数据结构
* 帮助mysql高效获取数据的一种结构

### 2.2 索引分类

1-按功能分类

* 普通索引:最基本的索引，没有限制
* 唯一索引: 索引列的唯一索引，不允许有空值、在建表时有主键列同时 创建主键索引
* 主键索引：一种特殊的唯一索引，不允许有空值、在建表时有主键列同时创建主键索引
* 联合索引：将单列索引进行组合
* 外键索引：只有InnoDB引擎支持外键索引
* 全文索引：快速匹配全部文档的方式、innoDB支持，memory不支持

2-按结构分类

* bTree索引：mysql使用最频繁的一个索引、是InnoDB和myISAM存储引擎默认索引类型

* Hash索引：memory存储引擎默认支持的索引类型

### 2.3 索引操作

1-创建索引

* 语法：create [unique|fulltext]index 索引名称 [using 索引类型] on 表名(列名...);
* 示例：create index idx_name on studet(name);//name列普通索引

2-查看索引

* 语法：show index from 表名;
* 示例：show index from student;

3-添加索引

* 语法：普通索引: alter table 表名 add index 索引名称(列名);
* 示例：alter table student add unique idx_score(score);

4-删除索引

* 语法：drop index 索引名称 on 表名;
* 示例：drop index idx_score on student;

### 2.4 索引的原理

1-概念

* BTree索引是基于B+Tree数据结构
* B+Tree数据结构是BTree的变种

2-原理

* 磁盘存储：系统从磁盘读取数据到内存是以磁盘块(block)为基本单位的、位于同一磁盘块中的数据会被一次性读取出来、InnoDB中有页的概念，页是磁盘管理的最小单位。每页的大小为16KB、InnoDB将若个地址连接磁盘块，以此达到页的大小16KB,提高查询效率
* BTree：id+指针+数据、每个节点不仅包含Key值，还有数据、查询时，相关的磁盘块也会被读取、会增加查询数据时的磁盘IO次数
* B+Tree：非叶子节点只存储key值、所有数据存储在叶子节点上、所有叶子节点之间都有连接指针、好处: 提高查询速度、减少磁盘IO、树形结构小

## 三 思维导图

![javaweb-xmind-mysql-index-12][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-index-12.png