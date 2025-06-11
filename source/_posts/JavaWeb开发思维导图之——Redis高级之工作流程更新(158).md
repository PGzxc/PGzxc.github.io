---
title: JavaWeb开发思维导图之——Redis高级之工作流程更新(158)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: f7a851ae
date: 2025-06-11 08:00:21
---
## 一 概述

* 说明
* 流程

<!--more-->

## 二 说明

```
介绍数据同步+命令传播阶段工作流程
```

## 三 流程

### 3.1 master

```
1-包含
   1-runid
   2-offset
   3-复制缓冲区
2-过程
  1-全量复制
    2-执行bgsave生成rdb文件，记录当前的复制偏移量offset
    3-发送+fullresync runid offset, 通过socket发送rdb文件给slave, 期间接受客户端命令,offset发生变化
  2-部分复制
    6-接受命令,判断runid是否匹配, 判定offset是否在复制缓冲区中
    7-如果runid或offset有一个不满足, 执行全量复制
    7-如果runid或offset校验通过, offset与offset相同, 忽略
    7-如果runid或offset校验通过, offset与offset不相同, 发送+continue offset, 通过socket发送复制缓冲区中offset到offset的数据
```

### 3.2 slave

```
1-包含
  1-runid
  2-offset
2-过程
  1-全量复制
  2-部分复制
```

## 四 思维导图

![javaweb-xmind-redis-hig-work-update-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-work-update-8.png