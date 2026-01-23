---
title: JavaWeb开发思维导图之——Spring注解之IoC底层核心原理(90)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: a2a9a61d
date: 2025-03-26 08:12:21
---
## 一 概述

* IoC核心接口
* bean加载过程解析
* bean初始化过程解析

<!--more-->

## 二 内容详情

### 2.1 IoC核心接口

#### 2.1.1 BeanFactory

```
1-作用: 提供bean的基本操作

2-bean的获取：
-1-按名称获取
-2-按类型获取

3-bean的操作
-1-是否存在
-2-是否单例
-3-类型获取
-4-类型检测(类型是否匹配)
-5-别名获取
```

#### 2.1.2 BeanFactory几个子类

1-HierachicalBeanFactory

```
1-作用: 提供bean分层结构，提出父子容器概念
3-操作:1-获取本地bean
```

2-AutowireCapableBeanFactory

```
1-作用: 提供bean自动封装功能

2-bean创建

3-自动封装
-1-装配方式
-2-前置动作
-3-后置动作
```

3-ListableBeanFactory

```
1-作用: 提供容器内部遍历搜索bean的功能

2-容器中bean的信息
-1-bean存在性
-2-bean的数量
-3-bean的类型

3-bean相关信息获取
-1-由类型获取bean的名称
-2-由注解获取bean的名称

4-bean信息获取
-1-bean的注解
-2-bean的定义名称
```

### 2.2 bean加载过程解析

#### 2.2.1 组件扫描器

1-说明: 

```
开发过程中，根据需要加载必要的bean，排除指定bean
```

2-设定组件扫描加载过滤器

```
1-名称: @ComponentScan
2-类型: 类注解
3-位置: 类定义上方
4-作用: 设置spring配置加载类扫描规范
5-示例:
-1-示例:@ComponentScan(value="com.example") excludeFilters=@ComponentScan.Filter(type=xxx,classes=xxx)
-2-参数:1-includeFilters: 设置包含性过滤器、2-excludeFilters: 设置排除性过滤器、3-type: 设置过滤器类型
-3-过滤策略：1-Annotation、2-Assignable_type、3-aspectj、4-regex、5-cutom
6-自定义组件过滤
-1-名称: TypeFilter
-2-类型: 接口
-3-位置: 自定义类型过滤器
-5-示例：public class MyTypeFilter implements TypeFilter{}
7-应用场景
-1-数据层接口测试环境
-2-业务层接口测试环境
-3-各种运行环境设置
```

#### 2.2.2 自定义导入器

1-导入器相关

```
1-bean只有通过配置才可以进入spring容器，被spring加载并控制
2-配置bean的方式
-1-xml文件中使用<bean />标签配置
-2-使用@Component及衍生注解配置
3-企业开发中，需要配置大量bean，需要高效配置bean的方式
```

2-自定义导入器

```
1-名称: ImportSelector
2-类型: 接口
3-位置: 自定义bean导入器
4-示例：
-public class MyImportSelector implements ImportSelector{}
-@Import(MyImportSelector.class) public class SpringConfig{}
```

3-自定义注册器

```
1-名称: ImportBeanDefinitionRegistrar
2-类型: 接口
3-作用: 自定义bean定义注册器
4-示例：public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar{}
```

### 2.3 bean初始化过程解析

1-初始化过程解析

```
1-BeanFactoryPostProcessor
-1-作用: 定义在bean工厂对象创建后, bean创建前动作, 对创建后业务处理
-2-运行时机: 用于对工厂进行处理, 仅运行一次

2-BeanPostPrcesso
-1-作用: 定义所有bean初始化前后进行的统一动作,  创建前+创建后
-2-运行时机: 当前操作伴随每个bean的创建过程，每次创建bean都运行

3-InitializingBean
-1-作用: 用于对bean进行创建前业务处理
-2-运行时机: 当前操作伴随每个bean的创建过程
```

2-FactoryBean

```
1-作用: 对单一的bean初始化过程封装，达到简化配置的目的
2-FactoryBean与BeanFactory区别
-1-FactoryBean: 封装单个bean的创建过程
2-BeanFactory: Spring容器顶层接口，定义了bean相关获取操作
```

## 三 思维导图

![javaweb-xmind-spring-inject-source-9][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-inject-source-9.png