---
title: JavaWeb开发思维导图之——JavaWeb核心网络请求(9)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 1e47b276
date: 2024-11-01 08:58:30
---
## 一 概述

* 请求对象
* 响应对象

<!--more-->

## 二 内容详情

### 2.1  请求对象

1-请求对象

* ServletRequest
* HttpServletRequest

2-常用方法

* getContextPath() //获取虚拟目录名称
* getServletPath() //获取Servlet映射路径
* getRemoteAddr() //获取访问者ip地址
* getQueryString() //获取请求的消息数据
* getRequestURI()//获取统一资源标识符
* getRequestURL() //获取统一资源定位符

3-获取请求头

* getHeader(name) //根据请求头获取一个值
* getHeaders(name) //根据请求头获取多个值
* getHeaderNames()//获取所有请求头名称

4-获取请求参数

* getParameter(name) //根据名称获取数据
* getParameterValues(name) //根据名称获取所有数据
* getParameterNames()//获取所有名称
* getParameterMap()//获取所有参数的键值对

5-获取请求参数并封装成对象

* 手动封装方式
* 反射封装方式(ProertyDescriptor)
* 工具类封装方式(BeanUtils)

6-流对象获取请求信息

* getReader() //获取字符输入流+请求方式Post
* getInputStream() //获取字节输入流+请求方式Post

7-乱码问题

* Get方式：没有乱码问题。Tomcat 8版本后已经解决
* POST方式：有乱码问题、通过setCharacterEncoding()方法解决

8-请求域

* 在一次请求范围内进行共享数据、一般用于请求转发的多个资源中共享数据
* 共享数据方法：setAttribute(name,value) //向请求域对象中存储数据、setAttribute(name) //通过名称获取请求域对象中的数据、removeAttribute(name) //通过名称移除请求域对象中的数据

9-请求转发

* 概念：客户端的请求需要借助其他Servlet来实现
* 特点：1-浏览器地址栏不变、2-域对象中的数据不丢失、3-负责转发的Servlet转发前后响应正文会丢失、4-由转发的目的地来响应客户端
* 方法：getRequestDispatcher(name) //获取请求调度对象、forward()实现转发

10-请求包含

* 概念：可以合并其他Servlet中的功能一起响应给客户端
* 特点：1-浏览器地址栏不变、2-域对象中的数据不丢失、3-被包含的Servlet响应头会丢失

### 2.2 响应对象

1-响应对象

* ServletResponse
* HttpServletResponse

2-常见状态码

* 200(成功)
* 302(重定向)
* 304(请求资源未改变，使用缓存)
* 400(请求错误，常见于参数错误)
* 404(请求资源未找到)
* 405(请求方式不支持)
* 500(服务器错误)

3-响应消息

* 字节流响应消息：getOutputStream()//获取响应字节输出流对象、setContentType("text/html;charset=UTF-8") //告诉浏览器编码格式解决乱码问题
* 字符流响应消息：getWriter()//获取响应字符输出流对象、setContentType("text/html;charset=UTF-8")//解决乱码问题

4-响应图片

* 创建字节输入流对象，关联读取的图片路径
* 通过响应对象获取字节输出流对象
* 循环读取和写出图片

5-设置缓存时间

* 缓存：不经常变化数据，设置缓存时间，避免频繁请求服务器
* 方法：setDateHeader(name,time) //设置消息头添加缓存

6-定时刷新

* 过了指定时间后，页面自动跳转
* setHeader(name,value) //设置消息头定时刷新
* resp.setHeader("Refresh","3;URL=/response/login.html")

7-请求重定向

* 概念: 客户端的请求到达后，需要借助其他Servlet来实现
* 特点: 浏览器地址栏会发生改变、两次请求，请求域对象中不能共享数据、可以重定向到其他服务器
* 原理：设置响应码为302-resp.setStatus(302)、设置响应的资源路径(resp.setHeader("location","/response/responseDemo07"))
* 方法: sendRedirect(name)//设置重定向

8-文件下载

* 创建字节输入流，关联读取的文件
* 设置响应消息头支持的类型(resp.setHeader("Content-Type","application/octet-stream"))
* 设置响应消息头以下载方式打开资源(resp.setHeader("Content-Disposition","attachment;filename=1.jpg"))
* 通过响应对象获取字节输出流对象
* 循环读写
* 释放资源

## 三 思维导图

![javaweb-xmind-web-http-9][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-http-9.png