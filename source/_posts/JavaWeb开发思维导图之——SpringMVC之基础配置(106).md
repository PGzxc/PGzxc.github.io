---
title: JavaWeb开发思维导图之——SpringMVC之基础配置(106)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: d9302a09
date: 2025-04-15 10:15:35
---
## 一 概述

* Controller加载控制
* 静态资源加载
* 中文乱码处理
* 注解驱动

<!--more-->

## 二 内容详情

### 2.1 Controller加载控制

1-说明

```
表现层bean标注通常设定为@Controller
包含设定为include-filter
排除设定为excludeFilters
```
2-示例

```
1-配置文件:<context:component-scan><context:include-filter type="" expression=""/>
2-代码注解: @ComponentScan(value="",excludeFilters=@ComponentScan.Filter)
```

3-bean加载控制说明

```
1-业务层与数据层bean加载由spring控制(参考spring加载方式)
2-表现层bean加载由SpringMVC单独控制
 -表现层处理器bean使用注解@Controller声明
 -bean加载控制使用包含性过滤器
 -过滤器类型通过注解进行过滤
 -过滤器的注解名称为Controller
```

### 2.2 静态资源加载

```
1-说明
 -核心控制器拦截的是所有请求，需要对静态资源请求进行放行
 -使用简化格式可以放行所有普通资源调用，无需11枚举
 
2-示例
 -<mvc:resources mapping="/img/**" locatin="/img/"/>//静态配置
 -<mvc:default-servlet-handler/>//简化格式
```

### 2.3 中文乱码处理

```
1-filter
 -filter-name: characterEncodingFilter
 -filter-class: CharacterEncodingFilter
 -init-param: UTF-8

2-filter-mapping
 -filter-name: characterEncodingFilter
 -url-pattern: /*
```

### 2.4 注解驱动

1-删除配置文件

```
1-web.xml
2-spring-mvc.xml
```

2-添加注解

```
1-自定义Servlet容器初始化配置类
 -说明: 加载SpringMVC核心配置类
 -代码: class ServletContainerInitConfig extend AbstractDispattcherServletInitializer{}
 -处理中文乱码: 在onStartup方法中完成，包括监听器注册、过滤器注册等
 
2-bean加载过滤
 -类文件: class SpringMvcConfiguration
 -注解配置：1-Configuration、2-ComponentScan
 -静态资源加载过滤：1-覆盖addResourceHandlers方法，具体资源设定、2-覆盖configureDefaultServletHandling方法，使用Servlet默认过滤规则
```

## 三 思维导图

![javaweb-xmind-springmvc-level1-config-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-config-3.png