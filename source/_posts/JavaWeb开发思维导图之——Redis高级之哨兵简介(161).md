---
title: JavaWeb开发思维导图之——Redis高级之哨兵简介(161)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 84ab9054
date: 2025-06-14 08:45:51
---
## 一 概述

* 主机宕机
* 哨兵概念
* 哨兵作用

<!--more-->

## 二 主机宕机

### 2.1 宕机后操作

```
1-关闭master和所有slave
2-找一个slave作为master
3-修改其他slave的配置,连接新的主
4-启动新的master与slave
5-全量复制*N+部分复制*N
```

### 2.2 问题

```
1-关闭期间的数据服务谁来承接?
2-找一个主, 怎么找法？
3-修改配置后, 原始的主恢复了怎么办?
```

## 三 哨兵概念

```
1-哨兵(sentinel)是一个分布式系统, 用于对主从结构中的每台服务器进行监控
2-当出现故障时通过投票机制选择新的master并将所有slave连接到新的master
```

## 四 哨兵作用

### 4.1 监控

```
1-不断的检查master和slave是否正常运行
2-master存活检测、master与slave运行情况检测
```

### 4.2 通知(提醒)

```
当被监控的服务器出现问题时, 向其他(哨兵间, 客户端)发送通知
```

### 4.3 自动故障转移

```
1-断开master与slave连接, 选取一个slave作为master
2-将其他slave连接新的master, 并告知客户端新的服务器地址
```

### 4.4 注意

```
1-哨兵也是一台redis服务器,只是不提供数据相关服务
2-通常哨兵的数量配置为单数
```

## 五 思维导图

![javaweb-xmind-redis-hig-shaobing-exp-11][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-shaobing-exp-11.png