---
title: JavaWeb开发思维导图之——Redis高级之主从复制常见问题(160)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 34258cb3
date: 2025-06-13 08:25:22
---
## 一 概述

* 频繁的全量复制1
* 频繁的全量复制2
* 频繁的网络中断1
* 频繁的网络中断2
* 数据不一致

<!--more-->

## 二 频繁的全量复制1

### 2.1 现象

```
1-伴随系统的运行，master的数据量会越来越大
2-一旦master重启, runid将会发生变化, 会导致全部slave的全量复制操作
```

### 2.2 内部优化调整方案

```
1-master内部创建master_replid变量,使用runid相同的策略生成,长度41位,并发送给所有slave
2-在master关闭时执行命令 shutdown save, 进行rdb持久化, 将runid与offset保存到rdb文件中
3-master重启后加载rdb文件,恢复数据
```

### 2.3 作用

```
本机保存上次runid, 重启后恢复该值, 使所有slave认为还是之前的master
```

## 三 频繁的全量复制2

```
1-问题现象: 网络环境不佳, 出现网络中断, slave不提供服务
2-问题原因: 复制缓冲区过小, 断网后slave的offset越界, 触发后全量复制
3-最终结果: slave反复进行全量复制
4-解决方案：修复复制缓冲区大小
5-建议设置
```

## 四 频繁的网络中断1

```
1-问题现象: master的cpu占用过高或slave频繁断开连接
2-问题原因：
  1-slave每1秒发送热replconf ack命令到master
  2-当slave接到了慢查询时(keys *, hgetall等), 会大量占用cpu性能
  3-master每1秒调用复制定时函数replicationCron(), 比对slave发现长时间没有进行响应
3-最终结果: master各种资源(输出缓冲区、带宽、连接等)被严重占用
4-解决方案
  1-通过设置河里的超时时间,确认是否释放slave
  2-repl-timeout seconds
  3-该参数定义了超时时间的阈值(默认60秒),超过该值,释放slave
```

## 五 频繁的网络中断2

### 5.1 问题现象: 

```
master与master连接断开
```

### 5.2 问题原因

```
1-master发送ping指令频度较低
2-master设定超时时间较短
3-ping指令在网络中存在丢包
```

### 5.3 解决方案

```
1-提高ping指令发送的频度
2-repl-ping-slave-period seconds
3-超时时间repl-time的时间至少是ping指令调度的5到10倍, 否则slave很容易判定超时
```

## 六 数据不一致

```
1-问题现象: 多个master获取相同数据不同步
2-问题原因：网络信息不同步,数据发送有延迟
3-解决方案
  1-优化主从间的网络环境, 通常放置在同一个机房部署
  2-监控主从节点延迟(通过offset)判断, 如果slave延迟过大
```


## 七 思维导图

![javaweb-xmind-redis-hig-copy-problem-10][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-copy-problem-10.png