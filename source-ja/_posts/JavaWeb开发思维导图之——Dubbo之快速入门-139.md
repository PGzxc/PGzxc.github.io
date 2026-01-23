---
title: JavaWeb开发思维导图之——Dubbo之快速入门(139)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 6811a26
date: 2025-05-23 10:38:12
---
## 一 概述

* spring和springmvc整合
* 服务提供者改造
* 消费者改造
* 改造升级

<!--more-->

## 二 spring和springmvc整合

### 2.1实现步骤

```
1-创建服务提供者Provider模块
2-创建服务消费者Consumer模块
3-在服务提供者模块编写UserSerImpl提供服务
4-在服务消费者中的UserController远程调用UserServiceImpl提供的服务
5-分别启动两个服务，测试
```

### 2.2 项目代码

```
1-dubbo-service
 1-说明: 服务提供方，打包后是一个jar
 2-代码
  模块: UserService+UserServiceImple
  2-提供方法：sayHello()
    
2-dubbo-web
 1-说明: 服务消费方，打包后是个war, 依赖dubbo-service
 2-代码
  模块: UserController
  2-提供方法：根据UserService注入，调用其方法
```

## 三 服务提供者改造

### 3.1 改造对象

```
dubbo-service
```

### 3.2 改造内容

```
1-打包模式由jar修改为war-<packaging>war</packaging>
2-配置tomcat插件(作为war启动)-除端口修改外，其他同dubo-web
3-服务提供类(UserServiceImpl)
 1-修改前注解
  1-@Service,标明该service是一个bean
  2-将该类的对象创建出来，放到spring的IOC容器中
  3-bean的定义
 2-修改后注解 
  1-@Service注解，形式相同，但该注解是dubbo的
  2-将这个类提供的方法(服务)对外发布
  3-将访问的地址ip,端口, 路径注册到注册中心中
  
4-dubbo配置
 1-配置位置: applicationContext.xml
 2-配置内容
  1-配置项目名称: <dubbo:application name="dubbo-service"
  2-配置注册中心地址: <dubbo:registry address="zookeeper://192.168.149.135:2181"/>
  3-配置dubbo包扫描: <dubbo:annotation package="com.example.service.impl"/>
5-添加webapp/WEB-INF/web.xml
```

## 四 消费者改造

### 4.1 改造对象

```
dubbo-web
```

### 4.2 改造内容

```
1-删除pom中dependency添加dubbo-service依赖
2-添加UserService接口
3-Controller中，Service注解由@Autowired修改为@Reference远程注入
4-添加dubbo配置
```

### 4.3 说明@Reference作用

```
1-从zookeeper注册中心获取userservice的访问url
2-进行远程调用RPC
3-将结果封装为一个代理对象。给变量赋值
```

## 五 改造升级

### 5.1 模型说明

```
1-提取公共接口:UserService到模块中
2-service和web都调用公共接口
```

### 5.2 改造

```
1-dubbo-interface项目
 1-添加UserService接口
 2-项目打包方式为jarr
 
2-dubo-service项目
 1-删除UserService接口
 2-依赖添加dubbo-interface模块
 
3-dubo-web项目
 1-删除UserService接口
 2-依赖添加dubbo-interface模块
```


## 六 思维导图

![javaweb-xmind-dubbo-start-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-dubbo-start-6.png