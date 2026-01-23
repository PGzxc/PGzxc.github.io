---
title: JavaWeb开发思维导图之——SpringMVC之无数据跳转页面(110)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: da1ce761
date: 2025-04-19 09:05:28
---
## 一 概述

* 响应方式
* 页面跳转设定
* 页面跳转方式
* 页面快捷设定
* 页面访问快捷设定缺省页面

<!--more-->

## 二 内容详情

### 2.1 响应方式

```
1-页面
 -html(页面)
 -jsp(页面+数据)
2-数据
 -JSON数据
 -XML数据
 -文本数据
3-文件
 -数据流
```

### 2.2 页面跳转设定

```
1-说明: 当处理器方法的返回值类型为String类型，即访问的页面
2-示例: @RequestMapping("/showPage") public String showPage(){return "page.jsp"}
```

### 2.3 页面跳转方式

```
1-转发(默认)
 1-forward
 2-示例: return "forward:pagesjp"
 
2-重定向
 1-redirect
 2-示例: return "redirect:pagesjp"
```

### 2.4 页面快捷设定

```
1-说明: 将路径前缀和文件类型后缀设置后，只填写文件名
2-页面简化配置
 1-bean: InternalResourceViewResolver
 2-配置参数
3-java端：public String showPage(){return "page"} 
```

### 2.5 页面访问快捷设定缺省页面

```
1-说明: 没有页面返回值，使用方法名页面
缺省-@RequestMapping("/showPage5") public void ShowPage5(){}
等价 @RequestMapping("/showPage5") public String showPage5(){return "showPage5"}
```

## 三 思维导图

![javaweb-xmind-springmvc-level1-jump-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-jump-7.png