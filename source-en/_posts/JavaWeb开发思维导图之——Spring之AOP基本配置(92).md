---
title: JavaWeb开发思维导图之——Spring之AOP基本配置(92)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 9a947b7f
date: 2025-03-27 08:57:32
---
## 一 概述

* AspectJ
* AOP基本配置

<!--more-->

## 二 内容详情

### 2.1 AspectJ

```
1-Aspect(切面)用于描述切入点与通知间的关系，是AOP编程中的概念
2-Aspectj是基于java语言对Aspect的实现
```

### 2.2 AOP基本配置

1-aop:config

```
1-名称: aop:config
2-类型: 标签
3-归属: beans标签
4-作用: 设置AOP
5-示例：<beans><aop:config>..</aop:config></beans>
6-说明: 一个beans标签可以配置多个aop:config标签
```

2-aop:aspect

```
1-名称: aop:aspect
2-类型: 标签
3-归属: aop:config标签
4-作用: 设置具体的AOP通知对应的切入点
5-示例：<aop:config><aop:aspect ref="beanId"/></aop:aspect></aop:config>
6-说明: 一个aop:config标签中可以配置多个aop:asspect标签
7-基本属性: ref: 通知所在的bean的id
```

3-aop:ponitcut

```
1-名称: aop:pointcut
2-类型: 标签
3-归属: aop:config标签、aop:aspect标签
4-作用: 设置切入点
5-示例：<aop:config><aop:pointcut id="pointId" expression=""/></aop:config>
6-说明：
 -一个aop:config标签中可以配置多个aop:pointcut标签
 -且该标签可以配置在aop:aspect标签内
7-基本属性
 -id: 识别切入点的名称
 -expression: 切入点表达式
```

## 三 思维导图

![javaweb-xmind-spring-aop-config-11][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-aop-config-11.png