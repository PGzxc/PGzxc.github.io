---
title: JavaWeb开发思维导图之——JDBC工具类(34)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 869d2dcd
date: 2024-12-11 08:57:06
---
## 一 概述

* 为何抽取工具类
* 抽取工具类步骤

<!--more-->

## 二 内容详情

### 2.1 为何抽取工具类

* 为何抽取工具类
* 关闭资源重复

### 2.2 抽取工具类步骤

1-编写配置文件

* 位置:src目录下创建config.properties
* driverClass=com.mysql.jdbc.Driver
* url=jdbc:myql://localhost:3306/db14
* username=root
* password=root

2-编写jdbc工具类

* 私有构造方法
* 声明所需要的配置变量
* 提供静态代码块。读取配置文件的信息为变量赋值，注册驱动
* 提供获取数据库连接方法
* 提供释放资源的方法

## 三 思维导图

![javaweb-xmind-jdbc-tool-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jdbc-tool-4.png