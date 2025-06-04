---
title: JavaWeb开发思维导图之——Redis高级之过期数据(151)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: e4ad0794
date: 2025-06-04 10:31:29
---
## 一 概述

* Redis中的数据特征
* 时效性数据的存储结构
* 数据删除策略
* 数据删除策略的目标

<!--more-->

## 二 Redis中的数据特征

### 2.1 概念

```
1-Redis是一种内存级数据库，所有数据均存放内存中
2-内存中的数据可以通过TTL指令获取其状态
```

### 2.2 数据状态

```
1-(XX): 具有时效性的数据
2-(-1): 永久有效的数据
3-(-2): 已经过期的数据或被删除的数据或未定义的数据
```

## 三 时效性数据的存储结构

### 3.1 Redis存储空间模型

```
1-数据区：name—>zs(ox0110-内存地址)
2-expires(过期失效)：ox0110-135954124(过期时间)
```

### 3.2 可选值

```
1-expire
2-expireat
3-pexpire
4-pexpireat
```

### 3.3 示例

```
setex expire key
```

## 四 数据删除策略

```
1-定时删除
2-惰性删除
3-定期删除
```

## 五 数据删除策略的目标

```
1-在内存占用与CPU占用之间寻找一种平衡
2-否则会造成redis性能下降甚至服务器宕机或内存泄露
```


## 六 思维导图

![javaweb-xmind-redis-hig-expi-data-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-expi-data-1.png