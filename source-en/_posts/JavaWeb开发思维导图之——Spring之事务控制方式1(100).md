---
title: JavaWeb开发思维导图之——Spring之事务控制方式1(100)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: efb8b1fc
date: 2025-04-09 08:55:17
---
## 一 概述

* 编程式
* 声明式(XML)

<!--more-->

## 二 内容详情

### 2.1 编程式

```
1-创建事务管理器 DataSrouceTransactionManager
2-为事务管理器设置与数据层相同的数据源 dstm.setDataSource()
3-创建事务定义对象 new DefaultTransactionDefinition()
4-创建事务状态对象，用于控制事务执行 dstm.getTransaction(td)
5-提交事务 dstm.commit(ts)
```

### 2.2 声明式(XML)

1-通知配置

```
1-tx配置
 - 1-说明: tx配置事务专属通知类
 -2-配置：
  -1-最外层:<tx:advice id="txAdvice" transaction-manager="txManager">//包含attributes
  -2-属性层:<tx:attributes></tx:attributes>//包含method
  -3-method层: <tx:method name="*" read-only="false" />
2-advisor配置
 -1-说明: aop:advisor配置引用事务专属通知类
 -2-配置：
  -1-外层: <aop:config></aop:config>
  -2-<aop:pointcut id="pt" expression="execution(* *..*(..))"/>
  -3-<aop:advisor advice-ref="txAdvice" pointcut-ref="pt" />
```

2-aop:advice与aop:advisor区别

```
1-aop:advice配置的通知类可以是普通java对象
2-aop:advisor配置通知类必须实现接口
```

3-标签

```
1-tx:advice
 -1-名称: tx:advice
 -2-类型: 标签
 -3-归属: beans标签
 -4-作用: 专用于声明事务通知
 -5-格式：<beans><tx:advice id="" transaction-manager=""/></beans>
 -6-基本属性：1-id: 用于配置aop时指定通知器的id、2-transaction-manager: 指定事务管理器bean
 
2-tx:attributes
 -1-名称: tx:attributes
 -2-类型: 标签
 -3-归属: tx:advice标签
 -5-格式：<tx:advice id="" transaction-manager=""><tx:attributes/></tx:advice>
 6-基本属性:无
 
3-tx:method
 -1-名称: tx:method
 -2-类型: 标签
 -3-归属: tx:attribute标签
 -4-作用: 设置具体的事务属性
 -5-格式：<tx:attributes><tx:method name="get*" read-only="false"/></tx:attributes>
 -6-说明：通常事务属性会配置多个，包含1个读写的全事务属性，1个只读的查询类事务属性
 -7-属性：
  -1-name="*"//待添加事务的方法名表达式(支持*号通配符)
  -2-read-only="false" 设置事务的读写属性, true为只读，false为读写
  -3-timeout="-1" 设置事务超长时长，单位秒
  -4-isolation="default"设置事务隔离级别，枚举值
  -5-no-rolback-for="" 设置事务不会滚的异常，多个异常间使用,分割
  -6-rollback-for="" 设置事务中比回滚的异常，多个异常用,分割
  -7-propagation="required"设置事务的传播行为
```

4-声明式事务配置方式

```
1-设定事务管理器
2-专用事务通知器
3-AOP配置切面，使用通知器绑定切入点
```

## 三 思维导图

![javaweb-xmind-spring-event-state-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-event-state-3.png