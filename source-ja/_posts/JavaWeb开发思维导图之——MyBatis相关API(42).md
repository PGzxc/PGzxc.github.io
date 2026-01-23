---
title: JavaWeb开发思维导图之——MyBatis相关API(42)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: a3a10261
date: 2024-12-25 09:14:56
---
## 一 概述

* Resources
* SqlSessionFactoryBuilder
* SqlSessionFactory
* SqlSession

<!--more-->

## 二 内容详情

### 2.1 Resources

* 加载资源工具类:org.apache.ibatis.io.Resources
* 核心放法:getResourceAsStream(fileName)//通过类加载器返回指定资源的字节输入流

### 2.2 SqlSessionFactoryBuilder

* 获取SqlSessionFactory工厂对象的功能类: org.apache.ibatis.session.SqlSessionFactoryBuilder
* 核心方法: build(is) //通过指定资源字节输入流获取SqlSession工厂对象核心方法: build(is) //通过指定资源字节输入流获取SqlSession工厂对象

### 2.3 SqlSessionFactory

1-说明

*  获取SqlSession构建者对象的工厂接口: org.apache.ibatis.session.SqlSessionFactory
* 指定事务的提交方式

核心方法

* openSession: 获取SqlSession构建者对象，并开启手动提交事务
* openSession(autoCommit);//获取SqlSession构建者对象，参数为true开启自动提交事务

### 2.4 SqlSession

1-说明

* 构建者对象接口: org.apache.ibatis.session.SqlSession;
* 用于执行SQL、管理事务、接口代理

2-核心方法

* List\<E> electList(statement,paramter);//执行查询语句,返回List集合
* T selectOne(statement,paramter);//查询语句，返回一个结果对象
* int insert(statement,paramter)//执行新增语句，返回影响行数
* int update(statement,paramter)//执行修改语句，返回影响行数
* int delete(statement,paramter)//执行删除语句，返回影响行数
* void commit();//提交事务
* void rollback();//回滚事务
* T getMapper(cls)//获取指定接口的代理实现类对象
* void close() //释放资源

## 三 思维导图

![javaweb-xmind-mybatis-api-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-api-2.png