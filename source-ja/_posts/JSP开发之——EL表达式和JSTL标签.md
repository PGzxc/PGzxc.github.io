---
title: JSP开发之——EL表达式和JSTL标签
categories:
  - 开发
  - C-前端开发
  - JSP
tags:
  - EL表达式
  - JSTL标签
abbrlink: 34c3e234
date: 2018-09-16 10:25:55
---
# 前言
JSP全名为Java Server Pages，中文名叫java服务器页面，它使用JSP标签在HTML网页中插入Java代码。标签通常以<%开头以%>结束，也可以使用EL表达式向网页传值。本文将简单介绍下这两种语言的简单使用。


<!--more-->


# 概念
## EL表达式
### 概念
表达式语言（EL）是 JSP 2.0 引入的一种计算和输出 Java 对象的简单语音  
### EL 语言的作用
为了使JSP写起来更加简单。表达式语言的灵感来自于 ECMAScript 和 XPath 表达式语言，它提供了在 JSP 中简化表达式的方法。它是一种简单的语言，基于可用的命名空间（PageContext 属性）、嵌套属性和对集合、操作符（算术型、关系型和逻辑型）的访问符、映射到 Java 类中静态方法的可扩展函数以及一组隐式对象。
### 如何使用 EL 表达式 
首先我们要知道 EL 的内置对象有哪些----pageScope、requestScope、sessionScope、applicationScope，如果未指定scope，默认从 pageScope 到 applicationScope一次扩大范围查找属性名，也可以使用 xxxScope.属性名 直接指定在某个 scope 查找，  如：${ requestScope.name } 
## JSTL
### 概念
JSP 标准标记库（JSP Standard Tag Library，JSTL）是一个实现 Web 应用程序中常见的通用功能的定制标记库集，这些功能包括迭代和条件判断、数据管理格式化、XML 操作以及数据库访问。
### JSTL 表达式的作用
JSTL标签库的使用是为类弥补html表的不足，规范自定义标签的使用而诞生的。在告别modle1模式开发应用程序后，人们开始注重软件的分层设计，不希望在jsp页面中出现java逻辑代码，同时也由于自定义标签的开发难度较大和不利于技术标准化产生了自定义标签库
### JSTL 的使用

		<%  
            String userNo = request.getParameter("userNo");  
            String userName = request.getParameter("userName"); %> 