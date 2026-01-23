---
title: JavaWeb开发思维导图之——Spring之AOP通知配置(94)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 67271ecb
date: 2025-03-31 07:51:59
---
## 一 概述

* 5种通知配置
* 通知顺序

<!--more-->

## 二 内容详情

### 2.1 5种通知配置

#### 2.1.1 5种通知类型

1-前置通知

```
1-说明: 原始方法执行前执行, 如果抛出异常，阻止原始方法
2-应用: 数据校验
```

2-后置通知

```
1-说明: 原始方法执行后执行，无论是否抛异常，都将执行
2-应用: 现场清理
```

3-返回后通知

```
1-说明: 原始方法执行后返回结果。有异常无法执行
2-应用: 返回值相关数据处理
```

4-抛出异常后通知

```
1-说明: 原始方法抛异常执行，无异常不执行
2-应用: 异常信息处理
```

5-环绕通知

```
1-说明: 原始方法执行前后都有执行，可以阻止原始方法执行
2-应用: 可以做任何事情
```

#### 2.1.2  通知标签

1-aop:before

```
1-名称: aop:before
2-类型: 标签
3-归属: aop:before标签
4-作用: 设置前置通知
5-示例:<aop:before method="" pointcut="">
6-说明: 一个aop:aspect标签中可以配置多个aop:before标签
7-基本属性:
 -1-method: 在通知类中设置当前通知类别对应方法
 -2-pointcut:设置当前通知对应的切入点表达式，与pointcut-ref属性冲突
 -3-pointcut-ref: 设置当前通知对应的切入点id，与pointcut属性冲突
```

2-aop:after

```
1-名称: aop:after
2-类型: 标签
3-归属: aop:aspect标签
4-作用: 设置后置通知
5-示例:<aop:after method="" pointcut="">
6-说明: 一个aop:aspect标签中可以配置多个aop:after标签
7-基本属性:
 -1-method: 在通知类中设置当前通知类别对应方法
 -2-pointcut:设置当前通知对应的切入点表达式，与pointcut-ref属性冲突
 -3-pointcut-ref: 设置当前通知对应的切入点id，与pointcut属性冲突
```

3-aop:after-throwing

```
1-名称: after-throwing
2-类型: 标签
3-归属: aop:aspect标签
4-作用: 设置抛出异常后通知
5-示例:<aop:after-throwing method="" pointcut="">
6-说明: 一个aop:aspect标签中可以配置多个aop:after-throwing标签
7-基本属性:
 -1-method: 在通知类中设置当前通知类别对应方法
 -2-pointcut:设置当前通知对应的切入点表达式，与pointcut-ref属性冲突
 -3-pointcut-ref: 设置当前通知对应的切入点id，与pointcut属性冲突
```

4-aop:around

```
1-名称: after-around
2-类型: 标签
3-归属: aop:aspect标签
4-作用: 设置环绕通知
5-示例:<aop:around method="" pointcut="">
6-说明: 一个aop:aspect标签中可以配置多个aop:around标签
7-基本属性:
 -1-method: 在通知类中设置当前通知类别对应方法
 -2-pointcut:设置当前通知对应的切入点表达式，与pointcut-ref属性冲突
 -3-pointcut-ref: 设置当前通知对应的切入点id，与pointcut属性冲突
```

### 2.2 通知顺序

```
当同一个切入点配置多个通知时，通知存在先后顺序，该顺序以配置顺序为准
```

## 三 思维导图

![javaweb-xmind-spring-aop-notify-13][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-aop-notify-13.png