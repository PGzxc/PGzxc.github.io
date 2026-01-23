---
title: JavaWeb开发思维导图之——Spring之AOP注解开发(96)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 6f8e1440
date: 2025-04-02 09:40:13
---
## 一 概述

* 开发AOP步骤
* 注意事项
* 注解配置
* 执行顺序控制
* 注解驱动

<!--more-->

## 二 内容详情

### 2.1 开发AOP步骤

```
1-导入坐标(伴随spring-context坐标导入完成)
2-开启AOP注解支持
3-配置切面@Aspect
4-定义专用的切入点方法，并配置切入点@Pointcut
5-为通知方法配置通知类型及对应切入点@Before
```

### 2.2 注意事项

```
1-切入点是一个方法，无参无返回值无实际方法体内容，不能是抽象方法
2-切入点使用方法调用，后面的()不能省略
3-想引入其他类中定义切入点，使用"类名.方法名()"
```

### 2.3 注解配置

1-Aspect

```
1-名称: @Aspect
2-类型: 注解
3-位置: 类定义上方
4-作用: 设置当前类为切面类
5-格式：@Aspect public class AopAdvice{}
6-说明: 一个beans标签中可以配置多个aop:confg标签
```

2-Pointcut

```
1-名称: @Pointcut
2-类型: 注解
3-位置: 方法定义上方
4-作用: 使用当前方法名作为切入点引用名称
5-格式：@Pointcut("execution(* *(..))") public void pt{}
6-说明: 被修饰的方法忽略其业务功能，格式设定为无参无返回值的方法，方法体内空实现
```

3-After

```
1-名称: @After
2-类型: 注解
3-位置: 方法定义上方
4-作用: 标注当前方法作为后置通知
5-格式：@After("pt()") public void after{}
6-特殊参数: 无
```

### 2.4 执行顺序控制

1-xml与注解排序

```
1-xml与注解排序
2-注解: 不存在配置顺序概念，参考方法名字符串对应编码值顺序(字母排序)
```

2-注解排序规则

```
1-同一个通知类中，相同通知类型以方法名排序为准
2-不同通知类中，以类名排序为准
3-使用@Order注解通过变更bean的加载顺序改变通知的加载顺序
```

### 2.5 注解驱动(EnableAspectJAutoProxy)

```
1-名称: @EnableAspectJAutoProxy
2-类型: 注解
3-位置: Spring注解配置类定义上方
4-作用: 设置当前类开启AOP注解驱动的支持，加载AOP注解
5-格式:@EnableAspectJAutoProxy public class SpringConfig{}
```

## 三 思维导图

![javaweb-xmind-spring-aop-inject-15][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-aop-inject-15.png