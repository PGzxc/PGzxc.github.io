---
title: JavaWeb开发思维导图之——Redis高级之缓存穿透(168)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: dc945029
date: 2025-06-21 08:42:45
---
## 一 概述

* 缓存穿透
* 数据库服务器崩溃
* 问题排查
* 问题分析
* 解决方案(术)

<!--more-->

## 二 缓存穿透

```
1-缓存击穿访问了不存在的数据, 跳过了合法数据的redis数据缓存阶段
2-每次访问数据库, 导致对数据库服务器造成压力
3-通常此类数据的出现量是一个较低的值,当出现此类情况以毒攻毒,并及时报警
4-应对策略应该在临时预防方案方面多做文章
5-无论是黑名单还是白名单,都是对整体系统的压力, 警报接触后尽快移除
```

## 三 数据库服务器崩溃

```
1-系统平稳运行过程中
2-应用服务器流量随时间增量较大
3-redis服务器命中率随时间逐步降低
4-redis内存平稳, 内存无压力
5-redis服务器cpu占用激增
6-数据库服务器压力激增
7-数据库崩溃
```

## 四 问题排查

```
1-redis中大面积出现未命中
2-出现非正常url访问
```

## 五 问题分析

```
1-获取的数据在数据库中也不存在, 数据库查询未得到对应数据
2-redis获取到null数据未进行持久化,直接返回
3-下次此类数据到达重复上述过程
4-出现黑客攻击服务器
```

## 六 解决方案(术)

```
1-缓存null
2-白名单策略
3-实时监控
4-key加密
```


## 七 思维导图

![javaweb-xmind-redis-hig-cache-fall-18][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-cache-fall-18.png