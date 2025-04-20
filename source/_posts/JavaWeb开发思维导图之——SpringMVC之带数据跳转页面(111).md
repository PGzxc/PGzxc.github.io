---
title: JavaWeb开发思维导图之——SpringMVC之带数据跳转页面(111)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: d318484b
date: 2025-04-20 08:42:43
---
## 一 概述

* 3种方式
* 携带数据页面跳转设定

<!--more-->

## 二 内容详情

### 2.1 3种方式

```
1-使用HttpServletRequest类型形参进行数据传递
 1-方法设置: request.setAttribute("name","zs")
 2-页面接收: ${name}
2-使用Model类型形参进行数据传递
 1-方法设置: model.addAttribute("book",book)
 2-页面接收: ${book.name}
3-使用ModelAndView类型形参进行数据传递,并将该对象返回调用者
 1-方法设置：modelAndView.addOject("book",book)
 2-页面接收: ${book.name}
 3-原理
  1-modelAndView.setViewName("page") = return "page"
  2-modelAndView.setViewName("redirect:page.jsp") = return "redirect:page.jsp"
```

### 2.2 携带数据页面跳转设定

```
1-String: 仅封装跳转页面的基本信息，底层由ModelAndView实现
2-Model: 仅封装数据
3-ModelAndView: 封装数据并封装视图，包含Model和View两个对象
```


## 三 思维导图

![javaweb-xmind-springmvc-level1-jump-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-jump-8.png