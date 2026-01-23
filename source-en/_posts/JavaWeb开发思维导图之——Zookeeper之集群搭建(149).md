---
title: JavaWeb开发思维导图之——Zookeeper之集群搭建(149)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 2acf55fd
date: 2025-06-02 08:50:42
---
## 一 概述

* 集群介绍
* 集群搭建
* 集群故障测试

<!--more-->

## 二 集群介绍

### 2.1 模型说明

```
1-Zookeeper集群有zk1..zk5共5台提供服务
2-根据策略，选择一台作为Leader，其他作为follwer
```

### 2.2 Leader选举

```
1-Serviceid(服务器id):服务器编号1,2,3，编号越大权重越大
2-Zxid(数据id): 值越大数据越新权重越大
3-选举过程中,某台选举超过半数，则此台就是Leader
```

## 三 集群搭建

```
在同一台电脑上部署3个zookeeper集群模拟3台服务器
```

## 四 集群故障测试

```
分别停用/启动3台zookeeper集群测试
```


## 五 思维导图

![javaweb-xmind-zookeeer-dajian-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-zookeeer-dajian-8.png