---
title: JavaWeb开发思维导图之——Redis基础Redis简介(73)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: ff42a132
date: 2025-03-06 08:24:02
---
## 一 概述

* Redis概念
* 特征
* 应用

<!--more-->

## 二 内容详情

### 2.1 Redis概念

* Remote Dictionary Server缩写
* 用C语言开发的一个开源高性能键值对(key-value)数据库

### 2.2 特征

* 1-数据间没有必然的关联关系
* 2-内部采用单线程机制进行工作
* 3-高性能
* 4-多数据类型支持
* 5-支持持久化，可进行数据灾难恢复

### 2.3 应用

* 1-为热点数据加速查询, 如热点商品、热点新闻、热点咨询、推广类等高访问量信息等
* 2-即时信息查询，如各位排行榜、各类网站访问统计、公交到站信息、在线人数信息(聊天室、网站)、设备信号等
* 3-时效性信息控制，如验证码控制、投票控制等
* 4-分布式数据共享，如分布式集群架构中的session分离
* 5-消息队列

## 三 思维导图

![javaweb-xmind-redis-brief-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-brief-2.png