---
title: JavaWeb开发思维导图之——SpringMVC之请求映射(109)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 33e0a08f
date: 2025-04-18 08:11:44
---
## 一 概述

```
请求映射：@RequestMapping
```

<!--more-->

## 二 内容详情

### 2.1 @RequestMapping

```
1-名称: @RequestMapping
2-类型: 方法注解
3-位置: 处理器类中的方法定义上方
4-作用: 绑定请求地址与对应处理方法间的关系
5-示例: @RequestMapping("/requestURL1") public String requestURL1(){}
6-访问路径
 1-未设置
  -设置: @RequestMapping("/requestURL1") public String requestURL1(){}
  -请求-/requestURL1
  -访问: root路径下的页面
 2-设置
  -设置: 类UserController上方加@RequestMapping("/user")
  -请求-/requestURL2
  -访问: root路径下的user路径下的页面
7-常用属性
 -功能性参数：value="/requestURL3" //设定请求路径, 与path属性、value属性相同
 -校验性参数
  1-method=RequestMethod.GET //设定请求方式
  2-params="name" //设定请求参数条件
  3-headers="content-type=text/*" //设定请求消息头条件按
  4-consumes="text/*" //用于指定可以接收的请求正文类型-MIME类型
  5-producs="text/" //用于指定可以生成的响应正文类型-MIME类型
```


## 三 思维导图

![javaweb-xmind-springmvc-level1-map-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-map-6.png