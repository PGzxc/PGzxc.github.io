---
title: JavaWeb开发思维导图之——JDBC开源数据库连接池(39)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c9bf0134
date: 2024-12-18 10:32:12
---
## 一 概述

* C3P0
* Druid(阿里)

<!--more-->

## 二 内容详情

### 2.1 C3P0

1-使用步骤

* 导入jar包(c3p0+mchange-comons-java)
* 导入配置文件到src目录下
* 创建C3P0连接池对象
* 获取数据库连接进行使用

2-注意事项

* C3P0的配置文件会自动加载
* 但是必须叫c3p0-config.xml或c3p0-config.properties

### 2.2 Druid(阿里)

1-使用步骤

* 导入jar包
* 编写配置文件，放在src目录下
* 通过properties集合加载配置文件
* 通过Druid连接池工厂类获取数据库连接池对象
* 获取数据库连接池进行使用

2-注意事项

* Druid不会自动加载配置文件，需要手动加载
* 文件名可以自定义

## 三 思维导图

![javaweb-xmind-jdbc-openchi-9.png][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jdbc-openchi-9.png