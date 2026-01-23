---
title: JavaWeb开发思维导图之——MyBatis分页插件(48)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 4bfa6510
date: 2025-01-02 09:16:46
---
## 一 概述

* 分页插件介绍
* 分页插件使用
* PageInfo

<!--more-->

## 二 内容详情

### 2.1 分页插件介绍

1-分页

* 分页可以将多条结果分页显示
* 第一页没有上一页，最后一页没有下一页
* 每页显示多少条数

2-分页插件

* MyBatis默认不带分页功能
* 要实现分页，需要手写，成本高
* 借助三方分页助手PageHelper，让分页简单

### 2.2 分页插件使用

* 导入jar包：pagehelper.jar+jsqlparse.jar
* 在核心配置文件中集成分页助手插件：位置: MyBatisConfig.xml/plugins/plugin
* 在测试类中使用分页助手相关API实现分类

### 2.3 PageInfo

1-说明: 封装分页相关参数的功能类

2-核心方法

* 1-long getTotal()//获取总条数
* 2-int getPages()//获取总页数
* 3-int getPageNum()//获取当前页
* 4-int getPageSize()//获取每页显示条数
* 5-int getPrePage()//获取上一页
* 6-int getNextPage()//获取下一页
* 7-boolean isIsFIrstPage()//是否是第一页
* 8-boolean isIsLastPage()//是否是最后一页

## 三 思维导图

![javaweb-xmind-mybatis-pageinfo-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-pageinfo-8.png