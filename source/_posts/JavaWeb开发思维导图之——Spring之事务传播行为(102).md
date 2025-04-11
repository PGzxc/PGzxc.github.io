---
title: JavaWeb开发思维导图之——Spring之事务传播行为(102)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 132e3d1e
date: 2025-04-11 10:56:27
---
## 一 概述

* 两个对象
* 概念
* 事务传播行为
* 应用

<!--more-->

## 二 内容详情

### 2.1 两个对象

```
1-事务管理员 DataSourceTransactionManager
2-事务协调员 accountDao.inMoney(outMane,money)
```
### 2.2 概念

```
事务传播行为描述的是事务协调员对事务管理员所携带事务的处理态度
```

### 2.3 事务传播行为

```
1-传播属性: Required、Requires_new、Supports、Not_supported、Mandatory、Never、Nested
2-针对传播属性，事务管理员与协调员的行为
```

### 2.4 应用

```
1-场景1: 生成订单业务(失败回滚)
2-场景2: 生成订单业务(订单编号)
```

## 三 思维导图

![javaweb-xmind-spring-event-behavor-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-event-behavor-5.png