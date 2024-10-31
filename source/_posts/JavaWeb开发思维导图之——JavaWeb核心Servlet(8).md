---
title: JavaWeb开发思维导图之——JavaWeb核心Servlet(8)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 32b2e20c
date: 2024-10-31 09:23:59
---
## 一 概述

* servlet
* servletConfig
* servletConfig
* 注解开发servlet

<!--more-->

## 二 内容详情

### 2.1  servlet

1-servlet介绍

* 运行在java服务器端的程序
* 接收和响应来自于客户端基于http协议的请求
* 要想实现Servlet功能，实现Servlet接口或继承实现类
* 核心方法: service()，任何客户端的请求都会经过该方法

2-servlet快速入门

* 流程
  - 创建web项目
  - 创建一个类继承GenericServlet
  - 重写service方法
  - 在web.xml中配置Servlet
  - 部署并启动项目
  - 通过浏览器测试
* 配置
  - src->创建ServiceDemo 继承GenericServicet(只需实现servic方法)
  - web.xml->配置servlet声明和servlet映射

3-servlet执行过程

* 客户端浏览器->发起请求->Tomcat服务器
* Tomcat服务器解析请求地址(URL)
* 通过解析地址找到对应应用servlet_demo1
* servlet_demo1找到应用的web.xml
* web.xml解析请求资源地址(URI)
* web.xml找到应用的资源ServletDemo01
* ServletDemo01执行service方法，响应给客户端浏览器

4-servlet关系视图

* Servlet(ServiceRequest,ServiceResponse): ServletConfig(servlet配置)、ServletContext(多个servlet共享资源)
* servlet(继承关系)：GenericServlet(抽象子类)、HttpServlet(抽象子类)

5-servlet实现方式

* 三种方式
  - 实现Serlet接口：实现所有的抽象方法、支持最大程度的自定义
  - 继承GenericServlet抽象类：必须重写service方法，其他可选、开发变得简单，但方式与Http协议无关
  - 继承HttpServlet：重写doGet和doPost方法、请求和响应都与http协议相关
* httpServlet实现
  - 执行过程：1-创建类继承HttpServlet、2-重写doGet和doPost方法、3-在web.xml中配置Servlet、4-部署并启动项目、5-通过浏览器测试
  - 配置：web.xml配置service声明和映射

6-servlet生命周期

* 概念：创建—>运行—>销毁、Servlet是单例的
* 生命周期：1-创建(init)、2-运行(doGet+doPost)、3-销毁(destory)

7-serlet线程安全

* 现象：模拟多用户登录查看Servlet线程是否安全、两个浏览器用户名不同，返回数据相同，出现混乱
* 解决办法：1-获取值(不会有问题)、2-赋值(考虑安全)

8-servlet映射方式

* 3种方式：1-具名方式、2-卡头+通配符、3-通配符+固定格式结尾
* 优先级：越具体优先级越高，越模糊优先级越低
* 多路径映射：/vip->9折，/vvip->5折，其他不打折

9-servlet创建时机

* 创建时机：1-第一次访问时创建、2-服务器加载时创建
* 如何修改：在\<servlet>标签，添加\<load-on-startup>标签、示例: \<load-on-startup>1\</load-on-startup>

10-默认servlet

* 默认servlet由服务器提供的。位于Tomcat/conf/web.xml
* 映射路径是\<url-pattern>\</url-pattern>
* 先去项目的web.xml中查找映射，没有则默认Servlet处理

### 2.2 servletConfig

1-ServletConfig介绍

* 是Servlet的配置参数对象
* 允许为每个Servlet提供初始化配置
* 作用：在Servlet初始化时，把一些配置信息传递给Servlet
* 生命周期和Servlet相同

2-配置方式

* 说明: 在\<servlet>/\<init-param>标签配置
* 示例：\<init-param>\<param-name>encoding\</param-name>\<param-value>utf-8\</param-value>\</init-param>

3-常用方法

* 方法：1-getInitParameter(name)//根据参数名称获取参数值、2-getInitParameterNames()//获取所有参数名称的枚举、3-getServletName() //获取Servlet的名称、4-getServletContext()//获取ServletContext对象
* 步骤：1-声明 private ServletConfig config;、2-init中初始化、3-doGet方法获取

### 2.3 servletContext

1-servletContext介绍

* 是应用上下文对象
* 每个应用中只有一个ServletContext对象
* 作用: 可以配置和获取应用的全局初始化参数，可以实现Servlet之间的数据共享
* 生命周期: 应用一加载则创建，停止则销毁

2-域对象

* 指对象的作用域；即作用范围
* 域对象可以实现数据的共享
* 不同作用范围的域对象，共享数据的能力不一样
* 在Servlet规范中，有4个域对象
* ServletContext是其一。也是web应用中最大的作用域；即application域，整个应用之间数据共享

3-配置方式

* 配置方式: \<web-app>/\<context-param>标签配置
* 示例：\<context-param>\<param-name>globalEncoding\</param-name>\</context-param>

4-常用方法

* getInitParameter(name) //根据名称获取全局配置的参数
* getContextPath() //获取当前应用的访问虚拟目录
* getRealPath(path)//根据虚拟目录获取应用部署的磁盘绝对路径

5-数据共享

* setAttribute(name,value) //向应用域对象中存储数据
* setAttribute(name) //通过名称获取应用域对象中的数据
* removeAttribute(name) //通过名称移除应用域对象中的数据

### 2.4 注解开发servlet

1-开发规范: 

* 2.5版本规范
* servlet3.0版本规范

2-自动注解开发步骤

* 创建一个Web项目
* 定义一个类，继承HttpServlet
* 重写doGet和doPost方法
* 在类上使用@WebServlet注解配置Servlet
* 部署并启动项目
* 通过浏览器测试

3-手动创建容器

* 1-定义一个类，继承HttpServlet
* 2-重写doGet和doPost方法
* 3-定义一个类，实现ServletContainerInitializer接口
* 4-在src目录下创建一个META-INF的包
* 5-在META-INF包下创建一个services的包
* 6-在services包下创建一个javax.servlet.ServletContainerInitializer的文件
* 7-文件中的内容为容器实现类的全类名
* 8-在容器实现类中的onStartup方法中完成注册Servlet
* 9-部署并启动项目
* 10-通过浏览器测试

## 三 思维导图

![javaweb-xmind-web-servlet-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-servlet-8.png