---
title: JavaWeb开发思维导图之——JavaWeb核心JSP(11)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: e28e1a13
date: 2024-11-05 08:17:40
---
## 一 概述

* jsp介绍
* jsp快速入门
* jsp语法
* jsp指令
* 使用细节
* MVC模型

<!--more-->

## 二 内容详情

### 2.1  jsp介绍

jsp介绍

* Java Server Pages缩写
* 是一种动态网页技术标准
* 部署在服务器上，处理客户端请求，并根据请求动态生成html,xml等web网页，并响应给服务器
* jsp是基于Java语言，它的本质就是Servlet

2-相关资源

* html(静态资源，无法添加动态资源)
* css(美化网页)
* javaScript(给网页添加动态效果)
* servlet(编写Java代码，实现后台功能处理)
* jsp(包含了显示页面技术，也具备Java代码功能)

### 2.2 jsp快速入门

1-jsp项目

* 创建一个web项目
* 在web目录下创建一个index.jsp文件
* 在文件中写一句话: 这是一个jsp文件
* 部署并启动项目
* 通过浏览器测试

2-jsp执行过程

* 客户端浏览器发起请求(http://localhost:8080/jsp/index.jsp)
* Tomcat服务器解析请求地址
* 通过地址找到具体应用(jsp_demo)
* 通过后面的index.jsp找到jsp文件
* index.jsp翻译jsp未见为index_jsp.java文件
* java文件编译为index_jsp.class文件
* java文件编译为index_jsp.class文件

### 2.3 jsp语法

* jsp注释：<%--注释内容--%>
* java代码块：<%java代码%>
* jsp表达式：<%=表达式%>
* jsp声明：<%!声明变量或方法%>

### 2.4 jsp指令

* page指令：<%@ page 属性名=属性值 .. %>
* include指令：<%@ include file=包含的页面 %>
* taglib指令：<%@ taglib uri=标签库地址 prefix=前缀名称 %> 

### 2.5 使用细节

1-9大隐式对象

* request
* response
* session
* application
* page
* config
* execption
* out
* pageContext

2-4大域对象

1. PageContext(页面域) 当前页面使用。范围小，很少使用
2. ServletRequest(请求域) //在1次请求或请求转发之用,再次转发域丢失
3. HttpSession(会话域) //多次请求数据共享使用,不同客户端不共享
4. ServletContext(应用域) //在整个应用之间实现数据共享,尽量少用

### 2.6 MVC模型

1-概念

* M(Model)模型，用于封装数据，封装数据模型
* View(View)视图。用于显示数据，动态资源用jsp，静态用html
* C(controller)控制器。用于处理请求和响应。例如Servlet

2-分层思想

1. 客户端发起请求到控制器(Servlet)
2. 控制器(Servlet)处理业务逻辑返回模型(javaBean)
3. 模型(javaBean)数据处理，保存到DB
4. DB处理后的数据，返回模型(javaBean)
5. 模型(javaBean)返回数据模型到控制器(Servlet)
6. 控制器(Servlet)选择视图展示模型(jsp/html)
7. 控制器响应结果给浏览器

## 三 思维导图

![javaweb-xmind-web-jsp-11][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-jsp-11.png