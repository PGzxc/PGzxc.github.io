---
title: JavaWeb开发思维导图之——Spring之事务回顾(98)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 1e3a8c1
date: 2025-04-04 11:37:22
---
## 一 概述

* 事务
* 事务特征(ACID)
* 事务隔离级别

<!--more-->

## 二 内容详情

### 2.1 事务

```
1-概念: 指数据库中多个操作合并在一起形成的操作序列
2-作用
 -1-操作前后状态一致
 2-并发访问相互隔离，互不干扰
```

### 2.2 事务特征(ACID)

```
1-原子性(Atomicity):不可分割的整体
2-一致性(Consistency): 前后数据的完整性必须一致
3-隔离性(Isolation): 多个并发事务相互隔离
4-持久性(Durability): 一旦提交，永久修改
```

### 2.3 事务隔离级别

1-脏读

```
1-现象: 允许读取未提交的信息
2-原因: Read uncommitted
3-解决方案: Read committed(表级读锁)
```

2-不可重复读

```
1-现象: 读取过程中单个数据发生了变化
2-解决方案: Repeatable read(行级写锁)
```

3-幻读

```
1-现象: 读取过程中数据条目发生了变化
2-解决方案: Serializable(表级写锁)
```

## 三 思维导图

![javaweb-xmind-spring-event-history-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-event-history-1.png