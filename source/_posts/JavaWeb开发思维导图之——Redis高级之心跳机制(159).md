---
title: JavaWeb开发思维导图之——Redis高级之心跳机制(159)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 6ca875a4
date: 2025-06-12 07:57:22
---
## 一 概述

* 心跳机制
* 注意事项

<!--more-->

## 二 心跳机制

```
1-进入命令传播阶段, master与slave间需要进行信息交换, 使用心跳机制进行维护, 实现双方连接保持在线
2-master心跳
  1-内部指令:ping
  2-周期: 由repl-ping-slave-period决定, 默认10秒
  3-作用: 判断slave是否在线
  4-查询: info replication, 获取slave最后一次连接时间间隔, lag项维持在0或1视为正常
3-slave心跳任务
  1-内部指令:replconf ack{offset}
  2-周期: 1秒
  3-作用
    1-汇报slave自己的复制偏移量,获取最新的数据变更指令
    2-判断master是否在线
```

## 三 注意事项

```
1-当slave多数掉线或延迟过高
2-slave数量由slave发送replconf ack命令做确认
3-slave延迟由slave发送replconf ack命令做确认
```


## 四 思维导图

![javaweb-xmind-redis-hig-heart-jump-9][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-heart-jump-9.png