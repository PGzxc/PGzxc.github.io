---
title: JavaWeb开发思维导图之——SpringMVC之Servlet相关接口(113)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 703c5bd7
date: 2025-04-22 09:15:53
---
## 一 概述

* 相关接口
* 注解式形参数据封装底层原理

<!--more-->

## 二 内容详情

### 2.1 相关接口

1-HttpServletRequest

```
1-说明: 请求获取
2-示例: request.setAttribute("name","zs")
```

2-HttpServletResponse

```
1-说明: 响应获取
2-示例:
```

3-HttpSesion

```
1-说明: 域获取
```

4-Head

```
1-说明: 头数据获取
2-@RequestHeader
 1-名称: @RequestHeader
 2-类型: 形参注解
 3-位置: 处理器类中的方法形参前方
 4-作用: 绑定请求头数据与对应处理方法形参间的关系
 5-示例: @RequestHeader("Acceept-Language") String head
```

5-Cookie

```
1-说明: Cookie数据获取
2-@CookieValue
 1-名称: @CookieValue
 2-类型: 形参注解
 3-位置: 处理器类中的方法形参前方
 4-作用: 绑定请求Cookie数据与对应处理方法形参间的关系
 5-示例: @CookieValue("JSESSIONID") String jsessionid
```

6-Session

```
1-说明: Session数据获取
2-@SessionAttribute
 1-名称: @SessionAttribute
 2-类型: 形参注解
 3-位置: 处理器类中的方法形参前方
 4-作用: 绑定请求Session数据与对应处理方法形参间的关系
 5-示例: @SessionAttribute("name") String name
3-@SessionAttributes
 1-名称: @SessionAttributes
 2-类型: 类注解
 3-位置: 处理器类上放
 4-作用: 声明放入session范围的变量名称，适用于Model类型数据传参
 5-示例
  1-类注解： @SessionAttributes(names={"name"})
  2-传参: model.addAttribute("name","Jock2")
```

### 2.2 注解式形参数据封装底层原理

```
1-数据的来源不同，对应的处理策略区分
 1-Head
 2-Cookie
 3-其他
2-SpringMVC使用策略模式进行处理分发
 1-顶层接口: HandlerMehodAgumentResoler
 2-实现类: 最终还是调用原始接口，对其封装
```


## 三 思维导图

![javaweb-xmind-springmvc-level1-servlet-10][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-servlet-10.png