---
title: JavaWeb开发思维导图之——SpringMVC之Restful(120)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: f48dae36
date: 2025-04-30 08:59:43
---
## 一 概述

* Rest开发入门
* Restful配置
* 简化配置

<!--more-->

## 二 内容详情

### 2.1 Rest开发入门

```
1-Rest
 -概念
  -Representational State Transfer缩写
  -一种网络资源的访问风格，定义了网络资源的访问方式
  -传统风格: http://localhost/user/get?id=1
  -Rest风格: http://localhost/user/1
 2-Restful是按照Rest风格访问网络资源
 3-优点
  -隐藏资源的访问行为，通过地址无法得知做的是何种操作
  -书写简化
  
2-Rest行为约定
 -GET(查询)： http://localhost/user/1 GET
 -POST(保存)： http://localhost/user POST
 -PUT(更新)： http://localhost/user PUT
 -DELETE(删除)： http://localhost/user DELETE

3-SpringMVC支持Restful:请求路径访问配置发生变化
```

### 2.2 Restful配置

```
1-注解
 -@RequestMapping
  -value配置路径
  -method配置请求方式
  -示例: @RequestMapping(value="/user/{id}",method=RequestMethod.POST)
 -@RestController：控制器是一个Rest风格控制器=@Controller+@ResposeBody 
 -@PathVariable: 从url上接收参数
 
2-配置
 -filter标签-HiddenHttpMethodFilter
 -filter-maping标签-DispatcherServle
 
3-页面
 -页面表单input 使用隐藏域请求提交，参数名固定为_method
 -示例: <input type="hidden" name="_method" value="PUT"/>
```

### 2.3 简化配置

```
1-示例
 -替换前：@RequestMapping(value="/user/{id}",method=RequestMethod.POST)
 -替换后: @DeleteMapping("{id}"
2-简化注解
 -GetMapping
 -PostMapping
 -PutMapping
 -DeleteMapping
```

## 三 思维导图

![javaweb-xmind-springmvc-level2-restful-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level2-restful-7.png