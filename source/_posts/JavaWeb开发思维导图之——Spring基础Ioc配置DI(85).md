---
title: JavaWeb开发思维导图之——Spring基础Ioc配置DI(85)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: '55125e94'
date: 2025-03-20 09:03:02
---
## 一 概述

* 概念
* 注入方式
* 标签

<!--more-->

## 二 内容详情

### 2.1 概念

1-说明

* 1-Dependency Injection缩写，依赖注入
* 2-应用程序运行依赖的资源由Spring为其提供，资源进入应用程序的方式称为注入

2-Ioc与DI关系

* 1-关系: Ioc与DI是同一件事站在不同角度看待问题
* 2-IoC模式: 等待spring容器提供资源-DI
* 3-IoC容器: 主控权在spring手中-IoC

### 2.2 注入方式

1-set注入

* 1-作用: 使用set方法的形式为bean提供资源
* 2-格式: \<bean>\<property/>\</bean>
* 3-实例: 1-引用类型;2-普通类型
* 4-步骤: 1-封装中的set方法;2-bean中使用property标签注入属性;3-name表示注入的属性名;4-对象: 使用ref进行注入;5-其他: 使用value进行注入

2-构造器注入

* 1-作用: 使用构造器方法的形式为bean提供资源，兼容早期遗留系统升级工作
* 2-格式: \<bean>\<constructor-arg/>\</bean>
* 3-实例: \<bean id="userDao" class="xxx">\<constructor-arg value="123"/>\</bean>

3-集合注入

* 1-作用: 注入集合数据类型属性 
* 2-格式: \<property>\<list>\</list>\</property>

### 2.3 标签

* p命名空间
* SpEl
* properties文件
* import

## 三 思维导图

![javaweb-xmind-spring-di-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-di-4.png