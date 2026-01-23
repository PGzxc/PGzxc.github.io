---
title: JavaWeb开发思维导图之——Redis高级之Cluster集群(164)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: ccabcbcf
date: 2025-06-17 09:13:08
---
## 一 概述

* 集群简介
* Cluster集群结构设计
* Cluster集群结构搭建

<!--more-->

## 二 集群简介

### 2.1 集群结构

```
1-集群就是使用网络将若干计算机联通起来
2-并提供统一的管理方式，使其对外呈现单击的服务效果
```

### 2.2 集群作用

```
1-分散单台服务器的访问压力,实现负载均衡
2-分散单台服务器的存储压力，实现可扩展性
3-降低单台服务器宕机带来的业务灾难
```

## 三 Cluster集群结构设计

### 3.1 数据存储设计

```
1-通过算法，计算出key应该保存的位置
2-将所有的存储空间计划切割成16384份,每台主机保存一部分
3-将key按照计算出的结果放到对应的存储空间
```

### 3.2 存储空间

```
槽-增强可扩展性
```

### 3.3 集群内部通讯设计

```
1-各个数据相互通讯，保存各个库中槽的编号数据
2-一次命中，直接返回
3-一次未中, 告知具体位置(2次命中)
```

## 四 Cluster集群结构搭建

### 4.1 搭建方式

```
1-配置服务器(3主3从)
2-建立通信(Meet)
3-分槽(Slot)
4-搭建主从(master-slave)
```

### 4.2 Cluster节点操作命令

```
1-查看集群节点信息: cluster nodes
2-更改slave指向新的master: cluster replicate master-id
3-发现一个新节点, 新增master: cluster meet ip:port
4-忽略一个没有solt的节点: cluster forget server_id
5-手动故障转移: cluster failover
```

### 4.3 redis-cli命令

```
1-创建集群
2-添加master到当前集群中
3-添加slave
4-删除节点
5-重新分槽
6-重新分配槽
```

## 五 思维导图

![javaweb-xmind-redis-hig-cluster-qun-14][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-cluster-qun-14.png