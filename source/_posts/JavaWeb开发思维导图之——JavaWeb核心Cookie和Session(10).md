---
title: JavaWeb开发思维导图之——JavaWeb核心Cookie和Session(10)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 37b909ce
date: 2024-11-04 09:48:19
---
## 一 概述

* Cookie
* Session

<!--more-->

## 二 内容详情

### 2.1  Cookie

1-会话

* 浏览器和服务器之间的多次请求和响应
* 会话过程中产生的数据，通过cookie和session保存

2-cookie

* cookie介绍:1-客户端会话管理技术、2-把要共享的数据保存到客户端、3-每次请求时，把会话信息带到服务器端，从而实现多次请求的数据共享
* 作用：保存客户端访问网站相关内容，保证每次访问时先从本地缓存获取，提高效率

3-使用细节

* 数量限制：1-每个网站最多只能有20个cookie，大小不超过4KB、1-每个网站最多只能有20个cookie，大小不超过4KB
* 名称限制: 只能包含ascci码表中的字母，数字字符、不能包含逗号、分号、空格，不能以$开头、不支持中文
* 存活时间限制：setMaxAge()、负整数: 当前会话有效，浏览器关闭则清除、0:立即清除、正整数: 以秒为单位设置存活时间
* 路径限制：取自第一次访问的资源路径前缀、默认路径: 取自第一次访问资源路径前缀。只要以这个开头都能访问、设置路径: setPath()方法设置指定路径

4-属性

* name(cookie名称)-必须
* value(cookie的值)-必须
* path(cookie的路径)
* domain(cookie的域名)
* maxAge(cookie的存活时间)
* version(cookie的版本号)
* comment(cookie的描述)

5-方法

* 常用方法：cookie(name,value)构造方法、属性对应的set和get方法-赋值和获取值
* 添加cookie(HttpServletResponse)：addCookie(cookie) //向客户端添加cookie
* 获取cookie(HttpServletRequest)：getCookies() //获取所有cookie

### 2.2 Session

1-HttpSession

* 介绍：服务器端会话管理技术、本质也是采用客户端会话管理技术、客户端保存一个特殊标识，共享数据保存到服务器的内存对象中、每次请求，会将特殊标识带到服务器端，根据这个标识找到对应内存空间，从而实现数据共享、是Servlet规范中四大域对象之一的会话域对象
* 作用：实现数据共享
* 四大域对象：ServletContext(应用域) //在整个应用之间实现数据共享、ServletRequeest(请求域) //在当前的请求或请求转发之间实现数据共享、HttpSession(会话域) //在当前会话范围之间实现数据共享

2-方法

* 常用方法：setAttribute(name,value) //设置共享数据、getAttribute(name) //获取共享数据、removeAttribute(name)//移除共享数据、getId()//获取唯一标识名称、Invalidate() //让session立即失效
* HttpSession获取：getSession()//获取HttpSession对象、getSession(create) //获取HttpSession对象，未获取到是否自动创建

3-使用细节

* 唯一标识查看：浏览器(jessionid)、服务器端(session.id)
* 浏览器禁用cookie：通过判断session为空弹窗提醒、手动拼接jessionid访问、访问时凭借jsessionid标识，通过encodeURL()方法重写
* 钝化：序列化。把长时间不用，还未过期的HttpSession进行序列化，写到磁盘上
* 活化：与钝化相反的状态

## 三 思维导图

![javaweb-xmind-web-cookie-10][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-cookie-10.png