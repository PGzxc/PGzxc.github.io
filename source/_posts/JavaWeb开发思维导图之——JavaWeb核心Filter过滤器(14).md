---
title: JavaWeb开发思维导图之——JavaWeb核心Filter过滤器(14)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: f097703
date: 2024-11-08 08:53:40
---
## 一 概述

* 过滤器介绍
* Filter
* 使用
* 生命周期
* FilterConfig
* 5种拦截行为

<!--more-->

## 二 内容详情

### 2.1  过滤器介绍

* 请求到来时，首先由过滤器判断，再决定接下来操作
* 一般用于完成通用操作，例如:登陆验证、统一编码处理、敏感字符过滤等

### 2.2 Filter

1-Filter介绍：Filtter是一个接口。要实现过滤器功能，必须实现该接口

2-核心方法

* init(config) //初始化方法
* doFilter()//对请求资源和响应资源过滤
* destory() //销毁方法

3-配置方式

* 注解方式-@WebFilter("/*") //添加注解
* 配置声明和映射

4-FilterChain介绍

* 概念：是一个接口，代表过滤器链对象、由Servlet容器提供实现类对象，直接使用即可、过滤器可以定义多个，组成过滤器链
* 方法：doFilter() //放行方法

### 2.3 使用

1-目的：通过Filter过滤器解决多个资源写出中文乱码问题

2-步骤

* 创建一个Web项目
* 创建两个Servlet功能类，都向客户端写出中文数据
* 创建一个Filter过滤器实现类，重写doFilter核心方法
* 在方法内解决中文乱码，并放行
* 部署并启动项目
* 通过浏览器测试

3-示例(过滤器)

* class FilterDemo1 implements Filter //定义类继承Filter 
* @WebFilter("/*") //添加注解
* doFilter(){ filterChain.doFilter()} //处理乱码并放行

4-使用细节

* 配置方式：注解方式-@WebFilter("/*") //添加注解
* 多个过滤器使用顺序：web.xml中配置过滤器(filter-mapping)

### 2.4 生命周期

1-创建

* 应用加载实例化对象
* 执行init初始化方法

2-服务

* 提供服务的过程
* 执行doFilter方法

3-销毁

* 应用卸载或服务器停止时对象销毁
* 执行destory方法

### 2.5 FilterConfig

1-介绍

* 是一个接口，代表过滤器的配置对象
* 可以加载一些初始化参数

2-核心方法

* getFilterName() //获取过滤器名称
* getInitParamterNames() //根据key获取value
* getInitParameterNames() //获取所有参数的key
* getServletContext() //获取应用上下文

3-示例：String filterName = filterConfig.getFilterName();

### 2.6 5种拦截行为

1-说明

* 默认情况下，过滤器不参与过滤
* 若想使用，需要配置

2-过滤器配置

2-1-filter：\<async-supported>true\</async-supported>//开启异步支持

2-filter-mapping

* \<dispatcher>request\</dispatcher> //过滤请求，默认值
* \<dispatccer>error\</dispatccer> //全局错误页面
* \<dispatcher>forward\</dispatcher> //过滤转发
* \<dispatcher>include\</dispatcher> //过滤包含(只能动态不支持jsp include静态)
* \<dispatcher>anync\</dispatcher> //过滤异步

2-3-error-page(全局错误页面)

* exception-type(错误类型)
* location(jsp页面)

## 三 思维导图

![javaweb-xmind-web-filter-14][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-filter-14.png