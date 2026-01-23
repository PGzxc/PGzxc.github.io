---
title: JavaWeb开发思维导图之——Redis高级之数据逐出算法(153)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: fff2ae0e
date: 2025-06-06 09:42:50
---
## 一 概述

* 新数据进入redis内存不足怎么办
* 影响数据淘汰相关配置
* 数据淘汰策略配置依据

<!--more-->

## 二 新数据进入redis内存不足怎么办

### 2.1 说明

```
1-Redis使用内存存储数据，在执行每一个命令前, 会调用freeMemoryifNeed()检测内存是否充足
2-内存不满足新加入数据的最低存储要求，redis临时删除一些数据为当前指令清理存储空间
3-清理数据的策略称为逐出算法
```

### 2.2 注意事项

```
1-逐出数据过程不是100%能够清理出足够可使用的内存空间
2-如果不成功则反复执行
3-所有数据执行完毕仍不能满足，出现OOM错误
```

## 三 影响数据淘汰相关配置

```
1-最大可用内存
2-每次选取待删除数据个数
3-对数据进行删除的选择策略: maxmemory-policy policy
4-数据淘汰策略
5-示例: maxmemory-policy volatile-lru
```

## 四 数据淘汰策略配置依据

```
使用info命令输出监控信息，查询缓存hit和miss的次数，根据业务需求调优redis配置
```

## 五 思维导图

![javaweb-xmind-redis-hig-expi-dataout-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-expi-dataout-3.png