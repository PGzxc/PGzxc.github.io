---
title: JavaWeb开发思维导图之——Dubbo之概述(137)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c307f00a
date: 2025-05-21 08:34:40
---
## 一 概述

* Dubbo概念
* 角色说明
* Dubbo架构

<!--more-->

## 二 Dubbo概念

```
1-Dubbo是阿里巴巴公司开源的一个高性能、轻量级的Java RPC框架
2-致力于提高高性能和透明化的RPC远程服务调用方案，以及SOA服务治理方案
3-官网: http://dubbo.apache.org
```

## 三 角色说明

```
1-Provider: 暴漏服务的服务提供方
2-Container: 服务运行容器
3-Consumer: 调用远程服务的服务消费方
4-Registry: 服务注册与发现的注册中心
5-Monitor: 统计服务的调用次数和调用时间的监控中心
```

## 四 Dubbo架构

```
1-Provider的服务运行在Container容器中并启动
2-服务启动后注册到Registry注册中心上(IP、端口、URL等),可供调用
3-Consumer消费者subscribe订阅并调用Registry中的服务
4-Registry有新的服务提供调用notify提醒Consumer
5-Consumer拿到路径后调用invoke调用Provider提供的服务
6-Monitor监控Consumer和Provider行为
```


## 五 思维导图

![javaweb-xmind-dubbo-explain-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-dubbo-explain-4.png