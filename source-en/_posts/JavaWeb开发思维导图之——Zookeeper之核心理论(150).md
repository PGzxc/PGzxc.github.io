---
title: JavaWeb开发思维导图之——Zookeeper之核心理论(150)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 89c22af5
date: 2025-06-03 09:21:07
---
## 一 概述

* Leader领导者
* Follower跟随者
* Observer观察者

<!--more-->

## 二 Leader领导者

```
1-处理事务请求(增删改)
2-集群内部各服务器的调度者
```

## 三 Follower跟随者

```
1-处理客户端非事务请求，转发事务给Leader服务器
2-参与Leader选举投票
```

## 四 Observer观察者

```
处理客户端非事务请求，转发事务请求给Leader服务器
```

## 五 思维导图

![javaweb-xmind-zookeeer-talk-9][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-zookeeer-talk-9.png