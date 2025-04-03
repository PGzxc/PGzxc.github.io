---
title: JavaWeb开发思维导图之——Spring之AOP底层原理(97)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c49beb20
date: 2025-04-03 10:06:49
---
## 一 概述

* 静态代理
* 动态代理(Proxy)
* 动态代理(CGLIB)
* 织入形式

<!--more-->

## 二 内容详情

### 2.1 静态代理

```
即装饰模式
在不惊动原始设计的基础上，添加功能
```

### 2.2 动态代理(Proxy)

```
JDKProxy动态代理
针对对象做代理，要求原始对象有接口实现，对接口增强
```

### 2.3 动态代理(CGLIB)

1-CGLIB动态代理

```
Code Generation Library, Code生成类库
CGLIB动态代理不限定是否具有接口可以对任意操作增强
CGLIB动态代理无需原始被代理对象，动态创建出新的代理对象
```

2-代理模式切换

```
1-说明: spring可以通过配置形式控制使用的代理，默认是jdkproxy,通过配置修改为cglib
2-3种配置
 -1-xml配置-<aop:config proxy-target-class="false" />
 2-xml注解支持-<aop:aspectj-autoproxy proxy-target-class="false" />
 3-注解驱动: @EnableAspectJAutoProxy(proxyTargetClass=true)
```

### 2.4 织入形式

1-编译器 

```
1-对应文件: .java->.class
2-特点:
 -1-运行时速度快
 -2-灵活性差
 -3-编译即锁定
```

2-加载期

```
1-对应文件: .class->.class进入JVM
2-特点
 -1-运行时速度快
 2-灵活性中
 3-多次加载可变更实现
```

3-运行期

```
1-对应文件: .class进入JVM—>运行字节码
2-特点
 -1-运行时速度慢
 -2-灵活性强
 -3-每次运行均可改变实现
 
```

## 三 思维导图

![javaweb-xmind-spring-aop-source-16][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-aop-source-16.png