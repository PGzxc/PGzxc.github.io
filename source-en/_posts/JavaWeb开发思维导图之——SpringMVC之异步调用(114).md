---
title: JavaWeb开发思维导图之——SpringMVC之异步调用(114)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 5bd0a67c
date: 2025-04-23 09:23:32
---
## 一 概述

* 发送异步请求
* 异步请求响应
* 跨域访问

<!--more-->

## 二 内容详情

### 2.1 发送异步请求

```
1-@RequestBody
 -名称: @RequestBody
 -类型: 形参注解
 -位置: 处理器类中的方法形参前方
 -作用: 将异步提交数据组织成标准请求参数格式，并赋值给形参
 -示例: public String ajaxCntroller(@RequestBody String message){}
2-异步请求传参
 -普通数据
 -json数据(POJO+List)
```

### 2.2 异步请求响应

```
1-@ResponseBody
 -名称: @ResponseBody
 -类型: 方法注解、返回值注解
 -位置: 处理器类中的方法前方
 -作用: 将异步提交数据组织成标准请求参数格式，并赋值给形参
 -示例: @ResponseBody  public String ajaxRetrnString(){}
2-异步请求响应
 -说明: 根据返回值，封装成对应json对象
 -支持数据：1-字符串数据；2-json数据(POJO+List)
```

### 2.3 跨域访问

```
1-概念
 -当通过域名A下操作访问域名B下的资源时，称为跨域访问
 -跨域访问时，会出现无法访问的现象
 -协议、IP地址、端口、域名
2-跨域环境搭建
 -为当前主机添加备用域名
 -动态刷新DNS：1-命令: ipconfig /displaydns、2-命令: ipconfig /flushdns
3-@CrossOrigin
 -名称: @CrossOrigin
 -类型: 方法注解、类注解
 -位置: 处理器类中的方法上方或类上方
 -作用: 设置当前处理器方法/处理器类中所有方法支持跨域访问
 -示例: @CrossOrigin  public User ajaxRetrnJson(){}
```

## 三 思维导图

![javaweb-xmind-springmvc-level2-async-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level2-async-1.png