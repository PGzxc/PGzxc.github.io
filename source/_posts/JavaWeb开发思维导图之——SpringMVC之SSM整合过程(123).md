---
title: JavaWeb开发思维导图之——SpringMVC之SSM整合过程(123)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 29d29e34
date: 2025-05-07 13:56:12
---
## 一 概述

* 项目基础结构搭建
* Spring整合MyBatis
* SpringMVC
* Spring整合SpringMVC
* 表现层业务封装<!--more-->
* 自定义异常

## 二 内容详情

### 2.1 项目基础结构搭建

```
1-创建项目，组织项目结构，创建包
2-创建表与实体类
 -数据库
  -用户表
  -学生表
 -实体类：User 
3-创建三层架构对应模块、接口与实现类，建立关联关系 
```

### 2.2 Spring整合MyBatis

```
1-导入坐标
 -spring环境
 -mybatis环境
 -mysql环境
 -spring整合jdbc
 -spring整合mybatis
 -druid连接池
 -分页插件
 -springmvc环境
 -jackson配置
 -junit单元测试
2-创建MyBatis映射文件(UserDao.xml)
3-创建Spring配置文件: 组件扫描
4-整合MyBatis到Spring环境中
 -SqlSessionFactoryBean
 -数据源(druid+jdbc.properties)
 -映射扫描
 -注解事务
 -分页插件
5-创建单元测试 
```

### 2.3 SpringMVC

```
1-web.xml加载SpringMVC
2-rest风格
3-数据封装为json数据
```

### 2.4 Spring整合SpringMVC

```
1-web.xml加载Spring环境(contextLoaderListener)
2-Controller调用Service(@Autowired private UserService userService)
```

### 2.5 表现层业务封装

```
1-封装过程
 1-前端接收表现层返回的数据种类
  -操作是否成功
  -单个数据
  -对象数据
  -集合数据
 2-返回数据格式设计
  -状态
  -数据
  -消息
 3-返回数据状态设计：根据业务不同设计不同状态码(404、500) 
 
2-封装结果
 1-类Result
 2-变量
  -private Integer code;//操作结果码
  -private Object data //操作数据结果
  -private String message//消息
```

### 2.6 自定义异常

```
1-设定自定义异常
 -说明: 封装程序执行过程中出现的问题，便于表现层进行统一的异常拦截并处理
 -示例
  -BusinessException
  -SystemException
 
2-返回消息兼容异常信息
 -class BusinessException extends RuntimeException
 -private Integer code;//错误编码
 -构造函数赋值 BusinessException(Integer code){}
 -抛出异常 -throw new BusinessException("查询出错",400)
 -注解
  - @ControllerAdvice public class ProjectExceptionAdvice{} //类标注
  -@ExceptionHandler(BusinesException.class) //方法注解
```

## 三 思维导图

![javaweb-xmind-springmvc-level3-ssm-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level3-ssm-2.png