---
title: JavaWeb开发思维导图之——Redis高级之数据同步阶段(156)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: d855f70b
date: 2025-06-09 08:37:49
---
## 一 概述

* 说明
* 工作流程
* 相关问题说明

<!--more-->

## 二 说明

```
1-在slave初次连接master后，复制master中的所有数据到slave
2-将slave的数据库状态更新成master当前的数据库状态
```

## 三 工作流程

### 3.1 步骤

```
1-请求同步数据
2-创建RDB同步数据
3-恢复RDB同步数据
4-请求部分同步数据
5-恢复部分同步数据(至此,数据同步完成)
6-当前状态
  1-slave: 具有master端全部数据,包含rdb过程接收的数据
  2-master: 保存slave当前数据同步的位置
  3-总体: 之间完成了数据克隆
```

### 3.2 指令

```
1-全量复制阶段
  1-slave
    1-发送指令: psync2
    5-接收rdb, 清空数据, 执行rdb文件恢复过程
    6-发送命令告知rdb恢复已经完成
    8-接收信息, 执行bgrewriteaof, 恢复数据
  2-master
    2-执行bgsave
    3-第一个slave连接时创建命令缓冲区
    4-生成rdb文件, 通过socket发送给slave
    7-发送复制缓冲区信息
    
2-部分复制阶段
  1-slave
    6-发送命令告知rdb恢复已经完成
    8-接收信息, 执行bgrewriteaof, 恢复数据
    
  2-master:7-发送复制缓冲区信息  
```

## 四 相关问题说明

### 4.1 master说明

```
1-如果master数据量巨大，为避免阻塞,避开流量高峰期
2-合理设计复制缓冲区: repl-backlog-size ?mb
3-master占用内存建议50%~70%, 留下30%~50%执行bgsave命令和创建复制缓冲区
```

### 4.2 slave说明

```
1-复制期间建议关闭对外服务: slave-serve-stale-data yes|no
2-同步阶段,master主动向slave发送命令
3-多个slave同时请求同步,master发送的rdb文件增多,影响带宽,建议错开
4-slave过多时，建议调整拓扑结构，由一主多从结构变为树状结构, 中间节点即是master也是slave
```

## 五 思维导图

![javaweb-xmind-redis-hig-data-sync-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-data-sync-6.png