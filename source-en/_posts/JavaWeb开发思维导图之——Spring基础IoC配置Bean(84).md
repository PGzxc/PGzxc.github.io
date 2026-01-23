---
title: JavaWeb开发思维导图之——Spring基础IoC配置Bean(84)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 479b5ca0
date: 2025-03-19 08:55:01
---
## 一 概述

* bean标签
* 属性
* 对象创建方式

<!--more-->

## 二 内容详情

### 2.1 bean标签

* 1-格式: \<beans>\<bean/>\</beans>
* 2-作用: 定义spring中的资源，受此标签定义的资源将受到spring控制

### 2.2 属性

1-基本属性(id,name,class)

* 示例: \<bean id="beanId" name="beanName1,beanName2" class="className">\</bean>
* 说明:1-id: bean的名称，通过id值获取bean;2-class: bean的类型;3-name: bean的名称，可以通过name值获取bean，用于多人配置时给bean起别名
* 注意事项(异常):No bean named 'xxx' available //bean标签name属性错误或不存在

2-scope属性

* 作用: 定义bean的作用范围
* 格式: \<bean scope="singleton" >\</bean>
* 取值：1-singleton；2-proptotype；3-request、session、application、websocket

3-生命周期属性 

* 作用: 定义bean对象在初始化或销毁时完成的工作
* 属性标签：1-init-method；2-destroy-method
* 格式: \<bean init-method="init" destroy-method="destroy">\</bean>
* 取值: bean对应类中对应的具体方法名

### 2.3 对象创建方式

* 1-实例工厂创建bean
* 2-静态工厂创建bean

## 三 思维导图

![javaweb-xmind-spring-bean-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-bean-3.png