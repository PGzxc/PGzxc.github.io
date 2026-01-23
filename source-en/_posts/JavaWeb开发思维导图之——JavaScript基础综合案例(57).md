---
title: JavaWeb开发思维导图之——JavaScript基础综合案例(57)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 631d6ae6
date: 2025-02-16 09:32:36
---
## 一 概述

```
案例描述: 学生信息表
```

<!--more-->

## 二 内容详情

### 2.1 案例描述

* 学生信息表

### 2.2 操作

* 1-默认学生信息表，表格显示张三、李四两条数据
* 2-表格上方: 输入姓名、性别、年龄，添加按钮，把该条记录填入表中
* 3-点击表中用户右侧的删除按钮，删除该信息

### 2.3 注意事项

* 1-href：href="javascript:void(0)"//不刷新页面内容，不跳转、href="#"//不刷新页面内容，但刷新会默认信息
* 2-标签的值：let name = document.getElementById("name").value;
* 3-创建文本元素：let nameText=document.createTextNode(name);

## 三 思维导图

![javaweb-xmind-javascript-demo-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-javascript-demo-5.png