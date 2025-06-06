---
title: JavaWeb开发思维导图之——Dubbo之大型互联网项目架构目标(134)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: fe59e53f
date: 2025-05-18 10:03:27
---
## 一 概述

* 传统项目和互联网项目
* 大型互联网项目架构目标
* 衡量网站的性能指标

<!--more-->

## 二 传统项目和互联网项目

### 2.1 传统项目

```
1-项目包含: OA、HR、CRM
2-人群: 企业员工
```

### 2.2 互联网项目

```
1-项目包含: 天猫、微信、百度
2-人群: 网民
3-特点
 1-用户多
 2-流量大,并发高
 3-海量数据
 4-易受攻击
 5-功能繁琐
 6-变更快
```

## 三 大型互联网项目架构目标

```
1-高性能:提供快速的访问体验
2-高可用: 网站服务一直可以正常访问
3-可伸缩: 通过硬件增加/减少,提高/减低处理能力
4-高可扩展:系统间耦合低，方便通过新增/移除方式，增加/减少新的功能/模块
5-安全性: 提供网站安全访问和数据加密，安全存储等策略
6-敏捷性: 随需应变，快速响应
```

## 四 衡量网站的性能指标

```
1-响应时间
2-并发数
3-吞吐量
QPS>=并发连接数>=TPS
```


## 五 思维导图

![javaweb-xmind-dubbo-struct-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-dubbo-struct-1.png