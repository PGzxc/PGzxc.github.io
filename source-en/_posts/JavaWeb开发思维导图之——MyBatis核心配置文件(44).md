---
title: JavaWeb开发思维导图之——MyBatis核心配置文件(44)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 961cd313
date: 2024-12-27 09:01:57
---
## 一 概述

* 介绍
* 配置文件(MyBatisConfig.xml)
* properties标签使用
* 起别名

<!--more-->

## 二 内容详情

### 2.1 介绍

* 核心配置文件包含了MyBatis最核心的设置和属性信息
* 如数据库连接、事务、连接池等

### 2.2 配置文件(MyBatisConfig.xml)

* \<xml>//版本及编码
* \<configuration />//dtd约束
* \<configuration>核心根标签

### 2.3 properties标签使用

1-说明

* 将MyBatisConfig.xml中有关数据库连接配置信息写入配置文件(jdbc.properties)
* 从配置文件(jdbc.properties)读取数据库连接信息

2-配置

* jdbc.properties
* 导入配置

### 2.4 起别名

1-说明

* resultType和ParameterType指定类型全路径比较麻烦
* 起别名简化操作

2-语法

* \<typeAliases>: 为全类名起别名的父标签
* \<typeAlias>：说明:为全类名起别名的子标签
* \<package>: 为指定包下所有类起别名的子标签(别名就是类名)

3-操作

* MyBatisConfig.xml(配置)
* StudentMapper.xml(调用)

4-系统类型别名

* string->java.lang.String
* long->java.lang.Long
* int->java.lang.Integer
* double->java.lang.Double
* boolean->java.lang.Boolean

## 三 思维导图

![javaweb-xmind-mybatis-config-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-config-4.png