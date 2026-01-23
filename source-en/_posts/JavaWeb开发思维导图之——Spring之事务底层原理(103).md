---
title: JavaWeb开发思维导图之——Spring之事务底层原理(103)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: d8b82beb
date: 2025-04-12 08:22:42
---
## 一 概述

* 模板对象
* 事务底层原理解析

<!--more-->

## 二 内容详情

### 2.1 模板对象

1-Spring模板对象

```
1-TransactionTemplate
2-JdbcTemplate
3-RedisTemplate
4-RabbitTemplate
5-JmsTemplate
6-HibernteTemplate
7-RestTemplate
```
2-常用模板对象

```
1-JdbcTemplate
 - 1-标准sql语句操作API
 -2-具名sql语句操作API
 
2-RedisTemplate
 -1-对象结构
  -1-客户端基本操作 //delete()
  -2-Operations(数据类型操作) //opsForValue()->string
  -3-Bound Operations(阻塞式)//boundValueOps->string
  -4-其他操作//slaveOf()
 -2-示例 
   -redisTemplate.opsForValue().set("account:id"+id,money)
   -Object money = redisTemplate.opsForValue().get("account:id:"+id)
```

### 2.2 事务底层原理解析

1-策略模式应用

```
1-概念: 使用不同策略对象实现不同行为方式，策略对象变化导致行为变化
2-示例分析: jdbcTemplate解析
```

2-装饰模式应用

```
1-JdbcTemplate
2-NamedParameterJdbcTemplate
```

## 三 思维导图

![javaweb-xmind-spring-event-source-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-event-source-6.png