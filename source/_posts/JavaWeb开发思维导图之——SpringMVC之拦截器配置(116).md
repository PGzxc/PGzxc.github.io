---
title: JavaWeb开发思维导图之——SpringMVC之拦截器配置(116)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 501bad3
date: 2025-04-25 08:59:14
---
## 一 概述

* 拦截器方法
* 拦截器配置

<!--more-->

## 二 内容详情

### 2.1 拦截器方法

```
1-preHandle
 -说明: 前置处理方法，原始方法之前运行
 -参数
  -request: 请求对象
  -response: 响应对象
  -handler: 被调用的处理器对象，是一个方法，对反射中的Method对象再包装
-返回值: 为false，被拦截的处理器将不执行  

2-postHandle
 -说明: 后置处理方法，原始方法之后运行, 如果原始方法被拦截，则不执行
 -参数
  -request: 请求对象
  -response: 响应对象
  -handler: 被调用的处理器对象，是一个方法，对反射中的Method对象再包装
  -modelAndView: 如果处理器执行完成具有返回结果，可以读取到对应数据与页面信息并进行调整
  
3-afterCompletion
 1-说明: 完成处理方法: 拦截器最后执行的方法，无论原始方法是否执行
 2-参数
  -request: 请求对象
  -response: 响应对象
  -handler: 被调用的处理器对象，是一个方法，对反射中的Method对象再包装
  -ex: 如果处理器执行过程中出现异常对象，可以针对异常情况进行单独处理
```

### 2.2 拦截器配置

```
1-mapping标签
 -说明：可以配置多个, 支持通配符*
 -通配符
  -*表示任意名称, /*仅表示根路径下任意名称，不再往下匹配目录
  -**表示当前路径极其子路径，/** 表示根路径及其子路径下任意名称
2-exclude-mapping标签: 用于剔除不符合要求的配置项，加速配置过程，支持通配符*
3-bean标签(ref标签): 只能配置一个
```

## 三 思维导图

![javaweb-xmind-springmvc-level2-interceptor-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level2-interceptor-3.png