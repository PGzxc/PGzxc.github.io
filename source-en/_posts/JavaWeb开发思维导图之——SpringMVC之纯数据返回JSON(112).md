---
title: JavaWeb开发思维导图之——SpringMVC之纯数据返回JSON(112)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: bbb1d870
date: 2025-04-21 08:57:18
---
## 一 概述

* 返回数据
* 返回JSON数据
* 使用SpringMVC注解驱动简化配置

<!--more-->

## 二 内容详情

### 2.1 返回数据

```
1-使用response对象完成数据返回-response.getWriter).print("message")
2-简化格式-@ResponseBody public String showData2(){return "message"}
```

### 2.2 返回JSON数据

```
1-基于response返回数据的简化格式
 1-定义ObjectMapper变量-om=new ObjectMapper()
 2-定义实体类变量:book=new Book()
 3-om将实体类转化: om.writeValueAsString(book)
 4-返回转换结果
2-使用SpringMVC提供的消息类型转换器将对象与集合数据自动转换为JSO数据
 1-方法中: @ResponseBody public Book showData4(){return book}
 2-手动添加信息类型转换器: MappingJackson2HttpMessageConverter
3-返回JSON数据(集合)-List<Book> 
```

### 2.3 使用SpringMVC注解驱动简化配置

```
1-文件配置
 1-<mvc:annotation-driven />
 2-bean(转换器)
2-注解驱动
 1-@Configuration
 2-@ComponentScan("com.example")
 3-EnableWebMVC
 4-public class SpringMvcConfigurration{}
```

## 三 思维导图

![javaweb-xmind-springmvc-level1-json-9][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-json-9.png