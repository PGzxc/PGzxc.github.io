---
title: JavaWeb开发思维导图之——Zookeeper之分布式锁(147)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: a3fa3767
date: 2025-05-31 09:24:31
---
## 一 概述

* 概念
* 分布式锁原理

<!--more-->

## 二 概念

### 2.1 相关概念

```
1-单机应用涉及并发时采用synchronized或lock解决
2-分布式集群，属于多jvm工作环境，跨jvm之间锁无法解决
3-跨机器的进程之间数据同步-分布式锁
```

### 2.2 分布式锁实现

```
1-基于缓存实现分布式锁(Redis、Memcache)
2-Zookeeper实现分布式锁(Curator)
3-数据库层面实现分布式锁(悲观锁、乐观锁)
```

## 三 分布式锁原理

### 3.1 模型说明

```
1-Zookeeper Server根节点下有/lock、/zk节点
2-/lock下有/lock/1、/lock/2、/lock/3叶子(顺序的)
3-客户端client1、client2、client3访问时临时创建上述/lock对应节点
4-访问结束后，删除临时节点,先创建的先删除
```

### 3.2 核心思想

```
当客户端要获取锁，则创建节点, 使用完锁，则删除该节点
```

### 3.3 原理

```
1-客户端获取锁时，在lock节点下创建临时顺序节点
2-客户端发现自己节点最小则获取到锁。使用完后删除该节点
3-客户端发现不是最小节点 ，注册监听器，监听删除事件
4-比自己小节点删除，收到通知获取锁，不是继续监听
```

## 四 思维导图

![javaweb-xmind-zookeeer-curator-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-zookeeer-curator-6.png