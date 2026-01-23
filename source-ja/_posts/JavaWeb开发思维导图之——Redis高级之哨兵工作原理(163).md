---
title: JavaWeb开发思维导图之——Redis高级之哨兵工作原理(163)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c8628210
date: 2025-06-16 08:40:11
---
## 一 概述

* 主从切换
* 2个概念

<!--more-->

## 二 主从切换

### 2.1 概念

```
哨兵在进行知错能改切换过程中经历三个阶段
```

### 2.2 3个阶段

1-监控

```
1-模型
  1-哨兵sentinel给其他哨兵发ping消息
  2-哨兵给master发info消息
  3-哨兵给slave发info消息
2-作用: 用于同步各个节点的状态信息
3-信息
  1-获取各个sentinel哨兵的状态(是否在线)
  2-获取master的状态
  3-获取所有slave的状态
```

2-通知

```
1-哨兵sentinel给master、所有slave发送消息监控状态
2-sentinel接收到正常消息后，在sentinel群组散播消息
3-哨兵群接收消息，共享通信
```

3-故障转移

```
1-故障标记
  1-哨兵1发送指令到master,master没响应，被哨兵1标记flags:sri_s_down(主管下线)
  2-哨兵群组收到通知后，都向master发指令,均无响应,经投票master被标记flsg:sri_o-down(客观下线)
2-哨兵选举人
  1-哨兵群组发起投票选举人
  2-经过选举得到选举人(入sentinel1)
3-master选举
  1-哨兵选举人从其他slave中选举master
  2-选举策略
  3-优先原则
4-发送指令(sentinel)
  1-向新的master发送slaveof no one
  2-向其他slave发送slaveof新master Ip 端口
```

## 三 2个概念

```
4-主观下线: 被一个哨兵标记下线
5-客观下线: 经过哨兵多次选举，标记下线
```


## 四 思维导图

![javaweb-xmind-redis-hig-shaobing-source-13][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-shaobing-source-13.png