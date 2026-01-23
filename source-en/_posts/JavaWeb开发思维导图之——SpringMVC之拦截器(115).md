---
title: JavaWeb开发思维导图之——SpringMVC之拦截器(115)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: ab694a25
date: 2025-04-24 09:49:17
---
## 一 概述

* 拦截器概念
* 自定义拦截器

<!--more-->

## 二 内容详情

### 2.1 拦截器概念

```
1-拦截器：Interceptor，是一种动态拦截方法调用的机制
2-作用
 -在指定的方法调用前后执行预先设定后的代码
 -阻止原始方法的执行
3-核心原理: AOP思想
4-拦截器链: 多个拦截器按照一定顺序，对原始被调用功能进行增强
5-拦截器VS过滤器 
 -归属不同: Filter属于Servlet技术，Interceptor属于SpringMVC技术
 -拦截内容不同: Filter对所有访问进行增强，Interceptor仅对SpringMVC的访问增强
6-拦截器的作用: 增强
```

### 2.2 自定义拦截器

```
1-拦截器开发
 -制作拦截器功能类(通知)
 -配置拦截器的执行位置(切入点)
2-自定义拦截器
 -实现HandlerInterceptor接口：1-preHhandle()、2-postHandle()、3-afterCompletion()
 -配置拦截器
  -配置执行位置:<mvc:mapping path="/showPage" />
  -配置拦截器执行类: <bean class="com.example..MyInterceptor"/>
3-拦截器执行流程 
 1-根据有无拦截器：1-无拦截器；2-有拦截器
 2-preHandle方法：1-return true；2-reture false
```

## 三 思维导图

![javaweb-xmind-springmvc-level2-interceptor-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level2-interceptor-2.png