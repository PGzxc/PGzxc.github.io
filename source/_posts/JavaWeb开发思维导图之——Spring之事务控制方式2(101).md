---
title: JavaWeb开发思维导图之——Spring之事务控制方式2(101)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 7037f213
date: 2025-04-10 10:01:03
---
## 一 概述

* 声明注解方式
* 纯注解

<!--more-->

## 二 内容详情

### 2.1 声明注解方式

1-开启注解驱动

```
1-名称: tx:annotation-driven
2-类型: 标签
3-归属: beans标签
4-作用: 开启事务注解驱动，并指定对应的事务管理
5-范例：<tx:annotation-driven transaction-manager="txManager" />
```

2-配置事务属性(@Transactional)

```
1-名称:@Transactional
2-类型: 方法注解、类注解、接口注解
3-位置: 方法定义上方, 类定义上方, 接口定义上方
4-作用: 设置当前类/接口中所有方法或具体方法开启事务, 并指定相关事务属性
5-范例：@Transactional(readonly=false..)
```

### 2.2 纯注解

```
1-名称:@EnableTransactionManagement
2-类型:类注解
3-位置: Spring注解配置类上方
4-作用: 开启注解驱动，等同XML格式中的注解驱动
5-范例：
 -@EnableTransactionManagement public class SpringConfig{}
 -public class TransactionManagerConfig{ }
```


## 三 思维导图

![javaweb-xmind-spring-event-state-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-event-state-4.png