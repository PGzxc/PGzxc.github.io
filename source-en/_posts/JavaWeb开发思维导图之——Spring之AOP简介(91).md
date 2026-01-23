---
title: JavaWeb开发思维导图之——Spring之AOP简介(91)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 6d65cd1f
date: 2025-03-26 08:37:59
---
## 一 概述

* AOP概念
* AOP作用
* AOP优势
* 核心概念
* 开发过程及运行原理

<!--more-->

## 二 内容详情

### 2.1 AOP概念

```
Aspect Oriented Programming,面向切面编程
OOP(Object Oriented Programming), 面向对象编程
```

### 2.2 AOP作用

```
软件开发半自动化/全自动化
插拔式组件体系结构
```

### 2.3 AOP优势

```
提高代码的可复用性
业务代码编程更简洁
业务代码维护更高效
业务功能扩展更便捷
```

### 2.4 核心概念

```
1-连接点：方法
2-切入点: 挖掉共性功能的方法
3-通知: 共性功能
4-切面: 共性功能与挖的位置的对应关系
5-目标对象: 挖掉功能方法对应类产生的对象
6-织入: 挖掉功能回填的过程
7-代理: 功能回填通过代理实现
8-引入/引介: 对原始对象添加变量或方法
```

### 2.5 开发过程及运行原理

```
1-开发过程
-开发阶段(开发者): 制作通知和配置切入点
-运行阶段(AOP完成): 监控切入点，通过代理创建目标对象，功能织入并运行

2-原理(见开发阶段)
```


## 三 思维导图

![javaweb-xmind-spring-aop-10][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-aop-10.png