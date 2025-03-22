---
title: JavaWeb开发思维导图之——Spring注解之bean加载控制(88)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: e71ff1a5
date: 2025-03-23 07:41:16
---
## 一 概述

* 分类
* 依赖加载应用场景

<!--more-->

## 二 内容详情

### 2.1 分类

1-依赖加载DependsOn

```
1-名称: @DependsOn
2-类型: 类注解、方法注解
3-位置: bean定义的位置(类上或方法上)
4-作用: 控制bean加载顺序，使其在指定bean加载完毕后再加载
5-示例：@DependsOn("beanId") public class ClassName{}
6-说明：
-1-配置在方法上，使@DependsOn指定的bean优先于@Bean配置的bean进行加载
-2-配置在类上，使@DependsOn指定的bean优先于当前类中所有@Bean配置的bean进行加载
-3-配置在类上，使@DependsOn指定的bean优先于@Component等配置的bean进行加载
7-相关属性：value(默认): 设置当前bean所依赖的id
```

2-顺序加载Order

```
1-名称: @Order
2-类型: 配置类注解
3-位置: 配置类定义的位置(类上)
4-作用: 控制配置类的加载顺序
5-示例：@Order(1) public class SpringConfigClassName{}
```

3-延迟加载Lazy

```
1-名称: @Lazy
2-类型: 类注解、方法注解
3-位置: bean定义的位置(类上或方法上)
4-作用: 控制bean的加载时机，使其延迟加载
5-示例：@Lazy public class ClassName{}
```

### 2.2 依赖加载应用场景

1-@DependsOn

```
1-微信订阅号，发布消息和 订阅消息的bean加载顺序控制
2-双11活动期间，零点前结算策略是A，零点后计算策略是B
```

2-@Lazy

```
程序灾难出现后应对的应急预案是启动容器时的加载时机
```

3-Order

```
多个种类的配置出现后，优先加载系统级的，然后加载业务级的
```


## 三 思维导图

![javaweb-xmind-spring-inject-control-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-inject-control-7.png