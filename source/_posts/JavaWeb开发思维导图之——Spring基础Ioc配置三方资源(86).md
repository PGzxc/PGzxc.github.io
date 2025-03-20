---
title: JavaWeb开发思维导图之——Spring基础Ioc配置三方资源(86)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 4d6a4fae
date: 2025-03-21 07:51:17
---
## 一 概述

* ApplicationContext
* 第三方资源配置

<!--more-->

## 二 内容详情

### 2.1 ApplicationContext

* 1-说明: 上下文对象的层级结构
* 2-几个主要层级: 1-ApplicationContext;2-BeanFactory;3-FileSystemXmlApplicationContext

### 2.2 第三方资源配置

* 1-三方示例:阿里云数据源方案Druid
* 2-资源配置: 如\<property name="driveClassName" value="com.mysql.jdbc.Driver"/>
* 3-使用配置资源(获取): ctx.getBean("dataSource")

## 三 思维导图

![javaweb-xmind-spring-druid-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-druid-5.png