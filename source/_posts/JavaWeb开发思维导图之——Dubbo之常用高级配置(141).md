---
title: JavaWeb开发思维导图之——Dubbo之常用高级配置(141)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: b255231b
date: 2025-05-25 09:26:14
---
## 一 概述

* 序列化
* 地址缓存
* 超时与重试
* 多版本
* 负载均衡
* 集群容错
* 服务降级

<!--more-->

## 二 序列化

```
定义pojo类时实现Serializable接口
```

## 三 地址缓存

```
1-注册中心挂了，服务是否可以正常访问
2-答案
 1-可以，因为dubbo服务消费者在第一次调用时，会将服务提供方地址缓存到本地，以后在调用则不会访问注册中心
 2-当服务提供者地址发生变化时，注册中心会通知服务消费者
```

## 四 超时与重试

### 4.1 超时

```
1-说明
 1-dubbo利用超时机制来解决这个问题，设置一个超时时间，这个时间段内，无法完成服务访问，则自动断开
 2-使用timeout属性配置超时时间，默认值1000，单位毫秒
 
2-超时设置
 1-服务端:
  1- @Service(timeout=3000)
  2-类注解，注解类UserServiceImpl
 2-消费端
  1- @Reference(timeout=3000)
  2-属性注解，注解对象userservice
```

### 4.2 重试

```
1-说明
 1-dubbo提供重试机制来避免类似问题发生
 2-通过retires属性设置重试次数，默认为2次
 
2-示例
 1-作用对象: 服务者(dubbo-service/UserServiceImpl)
 2-示例: @Service(timeout=3000,retries=2) //当前服务3秒超时，重试2次，一共3次
```

## 五 多版本

### 5.1 现象描述

```
1-消费者原来调用服务提供者v1.0
2-现在服务提供者升级到v2.0
3-服务提供者出现多个版本，从v1.0切换到v2.0
```

### 5.2 解决办法

```
1-灰度发布:当出现新功能时，会让一部分用户先使用新功能，用户反馈没问题时，再将所有用户迁移到新功能
2-dubbo中使用version属性来设置和调用同一个接口的不同版本
```

### 5.3 代码说明

```
1-服务端
 1-UserServiceImpl1，标注v1.0-@Service(version="v1.0")
 2-UserServiceImpl2，标注v2.0-@Service(version="v2.0")
 
2-消费端
 1-标注对象: userService
 2-示例: @Reference(version="v1.0") private UserService userservice;
```

## 六 负载均衡

### 6.1 模型说明

```
1-有3个服务提供者1,2,3,他们的权重比为:1:2:1
2-消费者调用3个服务提供者时如何选择
```

### 6.2 负载均衡策略(4种)

```
1-Random: 按权重随机，默认值。按权重设置随机概率
2-RoundRobin: 按权重轮询
3-LeastActive: 最少活跃调用数，相同活跃数的随机
4-ConsistentHash: 一致性Hash，相同参数的请求总是发到同一提供者
```

### 6.3 代码实现

```
1-服务提供者(dubbo-service权重)
 1-注解位置:UserServiceImpl
 2-参数: weight
 3-示例: @Service(weight=100)
 
2-消费者(dubbo-web均衡策略)
 1-位置:UserController/userservice
 2-参数: loadbalance
 3-示例: @Reference(loadbalance="random")
```

## 七 集群容错

### 7.1 模型说明

```
1-有3个服务提供者1,2,3
2-有一个服务消费者调用
3-当调用出错时，如何设置
```

### 7.2 集群容错模式

```
1-Failover Cluster
2-Failfast Cluster
3-Failsafe Cluster
4-Failback Cluster
5-Forking Cluster
6-Broadcast Cluster
```

## 八 服务降级

### 8.1 模型说明

```
1-服务提供广告服务、日志服务、支付服务
2-当内存或其他告急时，需要停掉一些服务进行降级
3-降级后，支付服务要保留，广告和日志服务降级
```

### 8.2 服务降级方式

```
1-mock=force: return null
2-mock=fail:return null
```


## 九 思维导图

![javaweb-xmind-dubbo-set-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-dubbo-set-8.png