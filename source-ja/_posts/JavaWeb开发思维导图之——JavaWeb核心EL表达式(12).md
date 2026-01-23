---
title: JavaWeb开发思维导图之——JavaWeb核心EL表达式(12)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: cadbf7b3
date: 2024-11-06 09:11:42
---
## 一 概述

* 介绍
* 快速入门
* el表达式

<!--more-->

## 二 内容详情

### 2.1  介绍

1-概念

* Expression Language缩写
* 表达式语言
* 在jsp 2.0规范中加入的内容，也是servlet规范的一部分

2-作用

* 在jsp页面中获取数据
* 让jsp脱离Java代码块和jsp表达式

3-示例

* <% request.setAttribute("username","zs") %>//向请求域添加数据
* java代码块获取: <% out.println(reqest.getAttribute("username")); %>
* jsp表达式获取: <%= request.getAttribute("username") %>
* el表达式: ${username}

4-语法格式：${表达式内容}

### 2.2 快速入门

1-步骤

* 创建web项目
* 在web目录下创建el01.jsp
* 在文件中向域对象添加数据
* 使用三种方式获取域对象中的数据(java代码块、jsp表达式、el表达式)
* 部署并启动项目
* 通过浏览器测试

3-示例

* <% request.setAttribute("username","zs") %>//向请求域添加数据
* java代码块获取: <% out.println(reqest.getAttribute("username")); %>
* jsp表达式获取: <%= request.getAttribute("username") %>
* el表达式: ${username}

### 2.3 el表达式

1-获取数据

* 基本类型数据：1-设置数据: <% pageContext.setAttribute("num",10);%> 、2-获取数据: ${num} 
* 自定义对象数据：1-设置数据：<% Student stu = new Student("zs",23);pageContext.setAttribute("stu",stu);%>  2-获取数据:${stu.name}
* 数组类型数据：1-设置数据：<% String[] arr = {"hello","world"};pageContext.setAttribute("arr",arr);%>、2-获取数据:${arr[0]}
* List集合类型数据：1-设置数据：<% pageContext.setAttribute("list",list) %>、2-获取数据：${list}
* Map集合类型数据：1-设置数据：<% pageContext.setAttribute("map",map) %>、2-获取数据: ${map}

2-注意事项

* 没有空指针异常
* 没有索引越界异常
* 没有字符串的拼接

3-el表达式

3-1-关系运算符

* 等于(==或eq) 示例: ${5==5}或${5 eq 5}
* 不等于(!=或ne) 示例: {5!=5}或{5 ne 5}
* 小于(<或lt) 示例: ${3<5}或${3 lt 5}
* 大于(>或gt) 示例: ${3>5}或${3 gt 5}
* 小于等于(<=或le) 示例: ${3<=5}或${3 le 5}
* 大于等于(>=或ge) 示例: ${3>=5}或${3 ge 5}

3-2 逻辑运算符

* 并且(&&或and) 示例: ${A&&B}或${A and B}
* 或者(||或or) 示例:${A||B}或${A or B}
* 取反(!或not) 示例: ${!A}或 ${not A}

3-3-其他运算符

* empty：${empty str}
* 三元运算符：示例:${geneder=="man"? "checked":""}

3-4-使用细节

* 概念：1-能够获取四大域对象数据，根据名称从小到大在域中查找、2-获取jsp中8个隐式对象，并调用对象方法
* 4大域设置：<% pageContext.setAttribute("name":'zs'); %>、<% request.setAttribute("name":'zs'); %>、<% session.setAttribute("name":'zs'); %>、<% application.setAttribute("name":'zs'); %>
* 获取4大域对象：${name}
* 隐式对象获取：1-java:<%= request.getContextPath() %>、2-el表达式: ${pageContext.request.contextPath}

4-11个隐式对象

* pageContext: ${pageContext.request.contextPath}
* applicationScope //应用域对象数据
* sessionScope //会话域对象数据
* requestScope //请求域对象数据: ${requestScope.username}
* pageScope //页面域对象数据
* header //请求头数据:${header["connection"]}
* headerValues //请求头数据(多个):{headerValues["connection"]}
* param //请求参数:${param.name}
* paramValue //请求参数数据(多个):${paramValues.hobby[0]}
* initParam //全局配置参数:${initParam["pname"]}
* cookie // cookie对象:${cookie}

## 三 思维导图

![javaweb-xmind-web-el-12][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-el-12.png