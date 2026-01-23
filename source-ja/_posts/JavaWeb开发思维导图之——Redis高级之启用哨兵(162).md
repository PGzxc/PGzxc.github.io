---
title: JavaWeb开发思维导图之——Redis高级之启用哨兵(162)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: f1c90721
date: 2025-06-15 09:14:45
---
## 一 概述

* 配置哨兵启动哨兵
* 配置哨兵
* 主从切换过程

<!--more-->

## 二 配置哨兵启动哨兵

```
1-配置一拖二的主从结构
2-配置三个哨兵(配置相同,端口不同),参考sentinel.conf
3-启动哨兵: redis-sentinel filename
```

## 三 配置哨兵

```
1-设置哨兵监听的主从服务器信息
2-设置判定服务器宕机时长
3-设置故障切换的最大超时时长
4-设置主从切换后，同时进行数据同步的slave数量
```

## 四 主从切换过程

```
1-停掉master主
2-开始选举leader,生成新的master
3-所有slave连接到新的master上
4-之前master重启后作为slave连接到新master上
```

## 五 思维导图

![javaweb-xmind-redis-hig-shaobing-start-12][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-shaobing-start-12.png