---
title: JavaWeb开发思维导图之——Spring之AOP通知获取数据(95)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 2c9e3c91
date: 2025-04-01 09:59:20
---
## 一 概述

* 参数(5种通知)
* 返回值(2种通知)
* 异常(2种通知)

<!--more-->

## 二 内容详情

### 2.1 参数(5种通知)

```
1-设定切入点表达式为通知方法传递参数
2-获取参数数据方法
 -1-通知方法第一个参数JoinPoint，调用它的getArgs方法
 -2-所有通知均可获取参数
3-原始方法: public void save(int param1,int param2){}
4-AOP配置:<aop:pointcut expresion="execution(* *(..)) &amp;&amp; args(a,b)"/>
5-通知类:publi  void before(int a, int b){}
```

### 2.2 返回值(2种通知)

1-返回after-returning

```
1-设定返回变量名
2-原始方法: public int save(){return 100;}
3-AOP配置:<aop:after-returning method="afterReturning" returning="rect"/>
4-通知类:publi  void afterReturning(object rect){}
5-适用于返回后通知(after-returning)
```

2-返回around

```
1-在通知类的方法中调用原始方法获取返回值
2-原始方法: public int save(){return 100}
3-AOP配置:<aop:around method="around" />
4-通知类:public  Object around(ProceedigJoinPoint pjp){return ret;}
适用于环绕通知(around)
```

### 2.3 异常(2种通知)

```
1-设定异常对象变量名
2-原始方法: public int save(){int i=1/0;}
3-AOP配置:<aop:after-throwing method="afterThrowing" throwing="t" />
4-通知类:public  void afterThrowing(Throwabl t){}
适用于返回后通知(after-throwing)
```

## 三 思维导图

![javaweb-xmind-spring-data-14][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-data-14.png