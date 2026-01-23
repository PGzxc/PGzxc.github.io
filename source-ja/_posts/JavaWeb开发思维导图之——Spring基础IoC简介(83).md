---
title: JavaWeb开发思维导图之——Spring基础IoC简介(83)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: a0c7f14f
date: 2025-03-18 08:40:16
---
## 一 概述

* 耦合与内聚
* Spring发展历程
* IoC简介
* IoC入门案例

<!--more-->

## 二 内容详情

### 2.1 耦合与内聚

* 1-耦合(coupling): 用于衡量软件中各模块之间的互联程度
* 2-内聚(Cohesion): 用于衡量软件中各个功能模块内部的功能联系
* 3-程序书写目标: 高内聚、低耦合

### 2.2 Spring发展历程

1-应用与资源耦合

* 应用程序(UserServiceImpl)通过new关联资源(UserDaoImpl)
* 通过new创建

2-工厂与资源耦合

* 应用程序(UserServiceImpl)通过工厂(UserDaoFactory)控制资源(UserDaoImpl)
* 工厂模式

3-应用程序通过spring控制资源

* Spring包含工厂(UserDaoactory)+配置(resource.xml)
* Spring通过反射读取配置文件创建资源
* 应用程序UserServiceImpl通过Spring控制资源(UserDaoImpl)

### 2.3 IoC简介

* 1-Inversion of Control缩写，控制反转
* 2-Spring反向控制应用程序所需要使用的外部资源
* 3-Spring控制的资源全部放置在Spring容器中，该容器称为IoC容器

## 三 思维导图

![javaweb-xmind-spring-ioc-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-ioc-2.png