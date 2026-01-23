---
title: JavaWeb开发思维导图之——JavaWeb核心Listener监听器(15)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: a5a3e3fb
date: 2024-11-11 09:12:05
---
## 一 概述

* 介绍
* 8个监听器
* 监听器使用(示例)

<!--more-->

## 二 内容详情

### 2.1  介绍

1-观察者模式

* 事件源:出发事件的动作
* 事件: 触发的动作，封装了事件源
* 监听器: 当事件源触发事件后，可以完成功能

2-完成功能

* 对象创建
* 域对象中属性变化
* 会话相关内容监听 

3-监听器规范

* Servlet规范共计8个监听器
* 监听器以接口形式提供
* 具体功能需要自己实现

### 2.2 8个监听器

1-对象监听器

* ServletContextListener：监听ServletContext对象创建和销毁
* HttpSessionListener: 监听HttpSession对象的创建和销毁
* ServletRequestListener：监听ServletRequest对象的创建和销毁

2-对象属性变化监听器

* ServletContextAtributeListener：监听ServletContext应用域中属性变化
* HttpSessionAttributeListener：监听HttpSession会话域中属性变化
* ServletRequestAttributeListener：监听ServletRequest请求域中属性变化

3-会话相关感知型监听器

* HttpSessionBindingListener：用于感知对象和会话域绑定的监听器
* HttpSessionActivationListener：用于感知会话域中对象钝化和活化的监听器

### 2.3 监听器使用(示例)

1-对象监听-ServletContextListener

* 创建ServletContextListenerDemo implements ServletContextListener
* 实现方法:  contextInitialized(sce)//创建时、contextDestroyed(sce)//销毁时
* 监听：1-@WebListener(注解形式)、2-web.xml/listener标签(配置方式)

2-属性监听-ServletContextAttributeListener

* 创建ServletContextListenerDemo implements ServletContextListener
* 实现方法：1-attributeAdded(scae)//添加、2-attributeReplaced(scae)//替换、3-attributeRemoved(scae)//移除

3-监听

* @WebListener(注解形式)
* 2-web.xml/listener标签(配置方式)

## 三 思维导图

![javaweb-xmind-web-listener-15][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-listener-15.png