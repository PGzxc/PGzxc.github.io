---
title: JavaWeb开发思维导图之——SpringMVC之入门案例制作(105)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 9f5944a0
date: 2025-04-14 08:58:25
---
## 一 概述

* 版本选择
* 开发环境及版本
* 入门案例制作
* 入门案例工作流程分析

<!--more-->

## 二 内容详情

### 2.1 版本选择

```
1-XML版
2-XML+注解版(主体)
3-纯注解版(变形)
```
### 2.2 开发环境及版本

```
1-基于Spring环境开发
2-SpringMVC版本与Spring版本同步-5.19
```

### 2.3 入门案例制作

```
1-导入坐标 //javax.servlet-api, jsp-api, spring-web，spring-webmvc
2-定义表现层业务处理器Controller，并配置成spring的bean(等同于Servlet) //组件扫描
3-web.xml中配置SpringMVC核心控制器,用于将请求转发到对应的具体业务处理器Controller中(等同于Servlet配置)
4-设定具体Controller的访问路径(等同于Servlet在web.xml中的配置)
5-设置返回页面 //return "success.jsp"
```

### 2.4 入门案例工作流程分析

1-服务器启动

```
1-加载web.xml中DispatcherServlet
2-读取spring-mvc.xml中的配置，加载所有com.example包中所有标记为bean的类
3-读取bean方法上标注@RequestMapping的内容
```

2-处理请求

```
1-DispatcherServlet配置拦截所有请求
2-使用请求路径与所有加载@RequestMapping的内容进行对比
3-执行对应的方法
4-根据方法的返回值在webapp目录中查找对应的页面并展示
```

## 三 思维导图

![javaweb-xmind-springmvc-level1-sample-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-sample-2.png