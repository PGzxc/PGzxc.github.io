---
title: JavaWeb开发思维导图之——SpringMVC之异常处理(118)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: f8c27479
date: 2025-04-28 10:24:52
---
## 一 概述

* 异常处理
* 注解异常分类管理
* 项目异常处理方案

<!--more-->

## 二 内容详情

### 2.1 异常处理

```
1-异常处理器
 -自定义类实现HandlerExceptionResolver
 -实现resolveException方法
2-异常分类管理:根据异常的种类不同, 进行分门别类的管理，返回不同的信息 
```

### 2.2 注解异常分类管理

```
1-@ControllerAdvice
 -名称: @ControllerAdvice
 -类型: 类注解
 -位置: 异常处理器类上方
 -作用: 设置当前类为异常处理器类
 -示例: @ControlerAdvice public class ExceptionAdvice{}
2-@ExceptionHandler
 -名称: @ExceptionHandler
 -类型: 方法注解
 -位置: 异常处理器类中针对指定异常进行处理的方法上方
 -作用: 设置指定异常的处理方式
 -示例: @ExceptionHandler(Exception.clas) public String doOtherException(ex){}
 
3-两种异常处理方式对比
 -注解处理器可以拦截到入参类型转换异常
 -非注解处理器无法拦截到入参类型转换异常
```

### 2.3 项目异常处理方案

```
1-异常分类
 -业务异常
  -规范的用户行为产生的异常
  -不规范的用户行为操作产生的异常
 -系统异常: 项目运行过程中可预计且无法避免的异常
 -其他异常: 编程人员未预期到的异常
 
2-异常处理方案
 1-业务异常: 发送对应消息传递给用户，提醒规范操作
 2-系统异常
  -发送固定消息传递给用户，安抚用户
  -发送特定消息给运维人员，提醒维护
  -记录日志
 3-其他异常
  -发送固定消息传递给用户，安抚用户
  -发送特定消息给编程人员，提醒维护
  -记录日志
 
3-自定义异常
 -异常定义格式: class BusinesEx extends RuntimeException{}
 -异常触发方式:throw new BussinesEx("用户名长度必须在2-4位之间")
 -通过自定义异常将所有异常现象进行分类管理，以统一的格式对外呈现异常消息
```

## 三 思维导图

![javaweb-xmind-springmvc-level2-exception-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level2-exception-5.png