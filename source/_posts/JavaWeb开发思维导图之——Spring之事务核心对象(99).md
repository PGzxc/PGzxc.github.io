---
title: JavaWeb开发思维导图之——Spring之事务核心对象(99)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 2397a885
date: 2025-04-08 09:40:52
---
## 一 概述

* PlatformTransactionManager
* TransactionDefinition
* TransactionSatus

<!--more-->

## 二 内容详情

### 2.1 PlatformTransactionManager

```
1-概念: 平台事务管理器实现类
2-常用实现类
 -1-DataSourceTransactionManager: 适用于Spring JDBC或MyBatis
 -2-HibernateTransactionManager: 适用于Hibernate 3.0及以上版本
 -3-JpaTransactionManager: 适用于JPA
 -4-JdoTransactionManager: 适用于JDO
 -5-JtaTransactionManager: 适用于JTA
3-规范说明
 -1-JPA(Java Persistence API): JavaEE标准之一
 -2-JDO(Java Data Object): java对象持久化规范
 -3-JTA(Java Transaction API): JavaEE标准之一，允许程序执行分布式事务
4-事务基本操作
-1-获取事务: TransactionStatus getTransaction(TransactionDefiniton definition)
-2-提交事务: void commit(TransactionStatus satus)
-3-回滚事务: void rollback(TransactionStatus status)
```

### 2.2 TransactionDefinition

```
1-说明: 次接口定义了事务的基本信息
2-操作
 -1-获取事务定义名称: String getName()
 -2-获取事务的读写属性: boolean isReadOnly()
 -3-获取事务隔离级别: int getIsolationLevel()
 -4-获取事务超时时间: int getTimeout()
 -5-获取事务传播行为特征: int getPropagationBehavior()
```

### 2.3 TransactionSatus

```
1-说明: 次接口定义了事务在执行过程中某个时间点上的状态信息及对应的状态操作
2-操作
 -1-获取事务是否处于新开启事务状态: boolean isNewTransaction()
 -2-获取事务是否处于完成状态: boolean isCompleted()
 -3-获取事务是否处于回滚状态: boolean isRollbackOnly()
 -4-刷新事务状态: void flush()
 -5-获取事务是否具有回滚存储点: boolean hasSavepoint()
 -6-设置事务处于回滚状态: void setRollbackOnly()
```

## 三 思维导图

![javaweb-xmind-spring-event-core-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-event-core-2.png