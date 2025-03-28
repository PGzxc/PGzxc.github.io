---
title: JavaWeb开发思维导图之——Spring之AOP切入点表达式(93)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 61ed708d
date: 2025-03-28 08:59:22
---
## 一 概述

* 切入点表达式
* AOP基本配置

<!--more-->

## 二 内容详情

### 2.1 切入点表达式

#### 2.1.1 概念

```
切入点描述的是某个方法
```

#### 2.1.2 切入点表达式

1-概念

```
切入点表达式是一个快速匹配方法描述的通配格式，类似于正则表达式
```

2-格式

```
1-格式: 关键字 (访问修饰符 返回值 包名.类名.方法名 (参数) 异常名)

2-参数
 -1-关键字: 描述表达式的匹配模式
 -2-访问修饰符: 方法的访问控制权限修饰符
 -3-类名: 方法所在的类
 -4-异常: 方法定义中指定抛出的异常
```

3-示例

```
execution(public User com.example.service.UserService.findById(int))
```

4-切入点表达式(关键字)

```
1-execution: 匹配执行指定方法
2-args: 匹配带有指定参数类型的方法
3-within
4-target
5-@within
6-@target
7-@args
8-@annotation
bean
reference pointcut
```

5-通配符

```
1-*
 -1-说明: 单个独立的任意符号，可以独立出现，也可以作为前缀或后缀的匹配符出现
 -2-示例: execution (public * com.example.*.UserService.find*(*))
 
2-..
 -1-说明: 多个连续的任意符号，可以独立出现，常用于简化包名与参数的书写
 2-示例: execution (public User com..UserService.find(..))
 
3-+
 -1-说明: 专用于匹配子类类型
 -2-示例: execution (* *..*Service+.*(..))
```

6-逻辑运算符

```
1-&&: 连接两个切入点表达式，表示两个切入点表达式同时成立的匹配
2-||: 连接两个切入点表达式，表示两个切入点表达式成立任意一个的匹配
3-!: 连接单个切入点表达式，表示该切入点表达式不成立的匹配
```

7-范例

```
1-execution(* *(..))
2-execution(* *..*(..))
3-execution(* *..*.*(..))
```

### 2.2 三种切入点配置

1-三种配置

```
1-公共切入点 //aop-config标签下
2-局部切入点 //aop:aspect标签下
3-引用局部切入点 //
```

2-切入点配置经验

## 三 思维导图

![javaweb-xmind-spring-aop-exp-12][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-aop-exp-12.png