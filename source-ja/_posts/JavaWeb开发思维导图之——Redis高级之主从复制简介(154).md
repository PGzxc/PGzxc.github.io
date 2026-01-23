---
title: JavaWeb开发思维导图之——Redis高级之主从复制简介(154)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: ab98412
date: 2025-06-07 07:58:52
---
## 一 概述

* 高可用
* 主从复制的概念
* 主从复制的作用

<!--more-->

## 二 高可用

### 2.1 互联网"三高"架构

```
1-高并发
2-高性能
3-高可用
```

### 2.2 redis是否高可用

```
1-单击redis的风险与问题
 问题1: 机器故障
 问题2: 容量瓶颈
2-结论 
 1-为避免单点redis服务器故障，准备多台服务器互相连通
 2-将数据复制多个副本保存在不同服务器上连接在一起，并保证数据同步
 3-即使一台服务器宕机，其他服务器可继续工作提供服务，实现redis高可用，实现数据冗余备份
```

### 2.3 多台服务器连接方案

```
1-模型
 1-一台master服务器连接多台slave服务器
 2-slave服务器用于提供数据(读功能)
 3-master服务器用于同步slave服务器数据，并实现数据同步
2-概念
 1-提供数据方(master)
 2-接收数据方(slave)
 3-需要解决的问题: 数据同步(master的数据复制到slave中)
```

## 三 主从复制的概念

```
1-概念: 主从复制即将master中的数据即时、有效的复制到slave中
2-特征: 一个master可以拥有多个slave，一个slave只对应一个master
3-职责
  1-master
   1-写数据
   2-执行写操作, 将出现变化的数据自动同步到slave
   3-读数据(可忽略)
  2-slave
   1-读数据
   2-写数据(禁止)
```

## 四 主从复制的作用

```
1-读写分离: master写、slave读, 提高服务器的读写负载能力
2-负载均衡: 
3-故障恢复: 当master出现问题时, 由slave提供服务，实现快速的故障恢复
4-数据冗余: 实现数据热备份, 是持久化之外的一种数据冗余方式
5-高可用基石: 基于主从复制, 构建哨兵模式与集群, 实现redis的高可用方案
```




## 五 思维导图

![javaweb-xmind-redis-hig-data-copy-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-data-copy-4.png