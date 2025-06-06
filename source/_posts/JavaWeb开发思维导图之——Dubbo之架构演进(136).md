---
title: JavaWeb开发思维导图之——Dubbo之架构演进(136)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 301f14a8
date: 2025-05-20 08:51:27
---
## 一 概述

* 架构演进
* 架构技术选型

<!--more-->

## 二 架构演进

### 2.1 单体架构

```
1-架构模型: 一个app中包含ABCD四个模块
2-优点: 简单, 开发部署都很方便，小型项目首选
3-缺点
 1-项目启动慢
 2-可靠性差
 3-可伸缩性差
 4-扩展性和可维护性差
 5-性能低
```

### 2.2 垂直架构

```
1-架构模型
 1-将app拆分为ap1和app2，运行在2台服务器上
 2-app1包含ABE模块，app2包含CDE模块
 3-app1和app2共享DB
 
2-说明
 1-垂直架构是指单体架构中的多个模块拆分为多个独立的项目
 2-形成多个独立的单体架构
 
3-单体架构存在的问题
 1-项目启动慢
 2-可靠性差
 3-可伸缩性差
 4-扩展性和可维护性差
 5-性能低
 
4-垂直架构存在的问题:重复功能太多 
```

### 2.3 分布式架构

```
1-架构模型
 1-架构分为1个服务提供者E+2个服务消费者(app1+app2)
 2-服务提供者地址固定，服务消费者调用服务提供者(RPC)
 
2-说明
 1-分布式架构是指在垂直架构的基础上，将公共业务模块抽取出来
 2-此模块作为独立的服务，供其他调用者消费，以实现服务的共享和重用

3-RPC
 1-Remote Procedure Call远程过程调用
 2-有非常多的协议和技术都实现了RPC的过程
 3-比如: http rest风格，java RMI规范, webservice soap协议, hession等
 
4-垂直架构存在的问题: 重复功能太多
5-分布式架构存在问题: 服务提供方一旦变更，所有消费方都需要变更
```

### 2.4 SOA架构

```
1-架构模型：底部的DEF通过ESB总线对ABC提供服务
2-概念
 1-SOA
  1-Service-Oriented Architecture,面向服务的架构,是一个组件模型
  2-它将应用程序的不同功能单元(称为服务)进行拆分
  3-通过这些服务之间定义良好的接口和协议联系起来
  
 2-ESB
  1-Enterpaise Service Bus企业服务总线,服务中介
  2-主要是提供了一个服务于服务之间的交互
  3-ESB包含的功能如: 负载均衡，流量控制, 加密处理, 服务监控, 异常处理, 监控告急等
  
3-分布式架构存在的问题: 服务提供方一旦变更，所有消费方都需要变更  
```

### 2.5 微服务架构

```
1-架构模型
 1-每个模块A、B、C都对应一个DB
 2-client客户端通过网关访问ABC
 
2-说明
 1-微服务架构是在SOA上做的升华
 2-微服务架构=80%的SOA服务架构+100%的组件化架构+80%的领域建模

3-特点
 1-服务实现组件化
 2-服务之间交互一般使用rest api
 3-去中心化: 每个微服务都有自己私有的数据持久化业务数据
 4-自动化部署: 把应用拆分成一个个独立的单个服务, 方便自动化部署、测试、运维
```

## 三 架构技术选型

```
1-Dubbo是SOA时代的产物
2-SpringCloud是微服务时代的产物
```


## 四 思维导图

![javaweb-xmind-dubbo-ssu-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-dubbo-ssu-3.png