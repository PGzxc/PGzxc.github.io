---
title: JavaWeb开发思维导图之——JDBC数据库连接池(37)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 911c7e85
date: 2024-12-16 09:18:50
---
## 一 概述

* 数据库连接背景
* 数据库连接池

<!--more-->

## 二 内容详情

### 2.1 数据库连接背景

* 数据库连接是一种关键的、有限的、昂贵的资源
* 对数据库连接的管理能影响整个应用的性能指标
* 针对这个问题，出现了数据库连接池

### 2.2 数据库连接池

* 数据库连接池负责分配、管理和释放数据库连接
* 允许应用程序重复使用一个现有的数据库连接，而不是再重建一个
* 这能提高对数据库操作的性能

## 三 思维导图

![javaweb-xmind-jdbc-chi-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-jdbc-chi-7.png