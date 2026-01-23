---
title: JavaWeb开发思维导图之——MyBatis接口代理方式实现Dao(46)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: b4b8bcd
date: 2024-12-31 09:32:51
---
## 一 概述

* 概念
* 代码实现
* 源码分析

<!--more-->

## 二 内容详情

### 2.1 概念

1-接口代理与传统对比

* 传统方式：既要写接口，也要写实现类
* MyBatis代理框架：帮我们省略编写Dao层接口实现类步骤、只需编写接口，实现由MyBatis框架通过动态代理实现

2-实现规则

* 映射配置文件中命名空间必须和Dao层接口全类名相同
* 配置文件中的增删改查标签的id属性必须和dao层接口的方法名相同
* 映射配置文件中的增删改查标签的parameterType属性必须和Dao层接口方法的参数相同
* 映射配置文件中的增删改查标签的resultType属性必须和Dao层接口方法的返回值相同

### 2.2 代码实现

* 删除mapper层接口的实现类
* 修改映射配置文件: StudentMapper.xml\<mapper namespace="com.xx.mapper.StudentMapper">
* 修改service层接口的实现类，采用接口代理方式实现

### 2.3 源码分析

* 动态代理对象如何生成
* 方法(增删改查)是如何执行的

## 三 思维导图

![javaweb-xmind-mybatis-interface-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-interface-6.png